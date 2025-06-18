import { AxiosError } from 'axios';
import axiosWithAuthorization from '../contexts/axiosWithAuthorization';

// 전체 건물 목록 조회 API
export interface Building {
  buildingId: number;
  buildingName: string;
  buildingCode: string;
}

export const fetchBuildings = async (): Promise<Building[]> => {
  console.log('fetchBuildings 호출');
  const res = await axiosWithAuthorization.get<ApiResponse<Building[]>>('/hospitals/buildings');
  return res.data.data;
};

// 건물 ID 기반 구역 목록 조회 API
export interface Area {
  areaId: number;
  areaName: string;
  areaCode: string;
}

export const fetchAreas = async (buildingId: number): Promise<Area[]> => {
  console.log('fetchAreas 호출:', buildingId);
  const res = await axiosWithAuthorization.get<ApiResponse<Area[]>>(`/hospitals/${buildingId}/areas`);
  return res.data.data;
};

// 조건부 출입 통계 조회 API
export type UserCategory = 'PATIENT' | 'GUARDIAN' | 'VISITOR';

export interface StatsByFilterItem {
  date: string;
  areaCode: string;
  areaName: string;
  passCount: number;
}

export interface StatsByFilterParams {
  categories: UserCategory[];
  startDate?: string;
  endDate?: string;
  period?: 7 | 14 | 28;
  areaCodes: string[];
}

export const fetchStatsByFilter = async (
  rawParams: StatsByFilterParams
): Promise<StatsByFilterItem[]> => {
  try {
    console.log('[DEBUG] POST 요청 시작: /pass-logs/mock/search');

    const filteredParams: StatsByFilterParams = {
      ...rawParams,
      categories: rawParams.categories.filter((c): c is UserCategory => !!c),
      areaCodes: rawParams.areaCodes.filter((code): code is string => !!code),
    };

    if (rawParams.startDate && rawParams.endDate) {
      filteredParams.startDate = rawParams.startDate;
      filteredParams.endDate = rawParams.endDate;
      delete filteredParams.period;
    } else if (rawParams.period) {
      filteredParams.period = rawParams.period;
      delete filteredParams.startDate;
      delete filteredParams.endDate;
    } else {
      throw new Error('날짜 정보가 유효하지 않음');
    }

    const res = await axiosWithAuthorization.post<ApiResponse<StatsByFilterItem[]>>(
      '/pass-logs/mock/search',
      filteredParams,
      {
        withCredentials: true,
      }
    );

    console.log('[DEBUG] 응답 데이터:', res.data);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ data?: { message?: string } }>;
    const message = err.response?.data?.data?.message ?? '출입 통계를 불러올 수 없습니다.';
    console.error('[ERROR] 출입 통계 요청 실패:', message);
    throw new Error(message);
  }
};

// 사용자 유형 문자열을 UserCategory로 변환
export const convertUserTypesToCategories = (types: string[]): UserCategory[] => {
  const map: Record<string, UserCategory> = {
    '환자': 'PATIENT',
    '보호자': 'GUARDIAN',
    '방문객': 'VISITOR',
  };
  return types.map((t) => map[t]).filter((v): v is UserCategory => !!v);
};

// 시간대별 출입 통계 조회 API
export interface StatsHourlyItem {
  hour: number;
  total: number;
  timestamp: string;
}

export const fetchStatsHourly = async (): Promise<StatsHourlyItem[]> => {
  try {
    console.log('[DEBUG] GET 요청 시작: /pass-logs/hourly-issuance');

    const res = await axiosWithAuthorization.get<ApiResponse<StatsHourlyItem[]>>(
      '/pass-logs/hourly-issuance',
      {
        withCredentials: true,
      }
    );

    console.log('[DEBUG] 시간대별 응답 데이터:', res.data);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ data?: { message?: string } }>;
    const message = err.response?.data?.data?.message ?? '시간대별 출입 통계를 불러올 수 없습니다.';
    console.error('[ERROR] 시간대별 출입 통계 요청 실패:', message);
    throw new Error(message);
  }
};

// 공통 응답
interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  timestamp: string;
}
