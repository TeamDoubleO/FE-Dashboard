import { AxiosError } from "axios";
import axiosWithAuthorization from "../contexts/axiosWithAuthorization";

export interface StatsHourlyItem {
  hour: number;
  total: number;
  timestamp: string;
}

// 시간대별 출입 통계 조회 API
export const fetchStatsHourly = async (): Promise<StatsHourlyItem[]> => {
  try {
    console.log("[DEBUG] GET 요청 시작: /pass-logs/hourly");

    const res = await axiosWithAuthorization.get(
      `/pass-logs/hourly`,
      { withCredentials: true }
    );

    console.log("[DEBUG] 응답 데이터:", res.data);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ data?: { message?: string } }>;
    const message = err.response?.data?.data?.message ?? "시간대별 출입 통계를 불러올 수 없습니다.";
    console.error("[ERROR] 시간대별 출입 통계 요청 실패:", message);
    throw new Error(message);
  }
};

export interface StatsDailyItem {
  date: string;
  total: number;
}

// 일별 출입 통계 조회 API
export const fetchStatsDaily = async (): Promise<StatsDailyItem[]> => {
  try {
    console.log("[DEBUG] GET 요청 시작: /pass-logs/period/daily");

    const res = await axiosWithAuthorization.get(
      `/pass-logs/period/daily`,
      { withCredentials: true }
    );

    console.log("[DEBUG] 응답 데이터:", res.data);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ data?: { message?: string } }>;
    const message = err.response?.data?.data?.message ?? "일별 출입 통계를 불러올 수 없습니다.";
    console.error("[ERROR] 일별 출입 통계 요청 실패:", message);
    throw new Error(message);
  }
};

export interface StatsWeeklyItem {
  startDate: string;
  endDate: string;
  entered: number;
}

// 주별 출입 통계 조회 API
export const fetchStatsWeekly = async (): Promise<StatsWeeklyItem[]> => {
  try {
    console.log("[DEBUG] GET 요청 시작: /pass-logs/period/weekly");

    const res = await axiosWithAuthorization.get(
      `/pass-logs/period/weekly`,
      { withCredentials: true }
    );

    console.log("[DEBUG] 응답 데이터:", res.data);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ data?: { message?: string } }>;
    const message = err.response?.data?.data?.message ?? "주별 출입 통계를 불러올 수 없습니다.";
    console.error("[ERROR] 주별 출입 통계 요청 실패:", message);
    throw new Error(message);
  }
};

export interface StatsMonthlyItem {
  year: number;
  month: number;
  total: number;
}

// 월별 출입 통계 조회 API
export const fetchStatsMonthly = async (): Promise<StatsMonthlyItem[]> => {
  try {
    console.log("[DEBUG] GET 요청 시작: /pass-logs/period/monthly");

    const res = await axiosWithAuthorization.get(
      `/pass-logs/period/monthly`,
      { withCredentials: true }
    );

    console.log("[DEBUG] 응답 데이터:", res.data);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ data?: { message?: string } }>;
    const message = err.response?.data?.data?.message ?? "월별 출입 통계를 불러올 수 없습니다.";
    console.error("[ERROR] 월별 출입 통계 요청 실패:", message);
    throw new Error(message);
  }
};

export interface StatsDailyByCategoryItem {
  date: string;
  day: string;
  category: 'PATIENT' | 'GUARDIAN' | string;
  total: number;
}

// 요일별 출입 통계 조회 API
export const fetchStatsDailyByCategory = async (): Promise<StatsDailyByCategoryItem[]> => {
  try {
    console.log("[DEBUG] GET 요청 시작: /pass-logs/category");

    const res = await axiosWithAuthorization.get(
      `/pass-logs/category`,
      { withCredentials: true }
    );

    console.log("[DEBUG] 응답 데이터:", res.data);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ data?: { message?: string } }>;
    const message = err.response?.data?.data?.message ?? "요일별 출입 통계를 불러올 수 없습니다.";
    console.error("[ERROR] 요일별 출입 통계 요청 실패:", message);
    throw new Error(message);
  }
};

export interface StatsDailyByBuildingItem {
  date: string;
  day: string;
  buildingName: string;
  total: number;
}

// 건물별 출입 통계 조회 API
export const fetchStatsDailyByBuilding = async (): Promise<StatsDailyByBuildingItem[]> => {
  try {
    console.log("[DEBUG] GET 요청 시작: /pass-logs/building");

    const res = await axiosWithAuthorization.get(
      `/pass-logs/building`,
      { withCredentials: true }
    );

    console.log("[DEBUG] 응답 데이터:", res.data);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ data?: { message?: string } }>;
    const message = err.response?.data?.data?.message ?? "건물별 출입 통계를 불러올 수 없습니다.";
    console.error("[ERROR] 건물별 출입 통계 요청 실패:", message);
    throw new Error(message);
  }
};

//요약
export interface DashboardSummaryItem {
  category: 'PATIENT' | 'GUARDIAN';
  entered: number;
  exited: number;
  remaining: number;
}

export const fetchDashboardSummary = async (): Promise<DashboardSummaryItem[]> => {
  try {
    console.log("[DEBUG] GET 요청 시작: /pass-logs/dashboard-summary");

    const res = await axiosWithAuthorization.get(
      `/pass-logs/dashboard-summary`,
      { withCredentials: true }
    );

    console.log("[DEBUG] 응답 데이터:", res.data);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ data?: { message?: string } }>;
    const message = err.response?.data?.data?.message ?? "대시보드 요약 정보를 불러올 수 없습니다.";
    console.error("[ERROR] 대시보드 요약 요청 실패:", message);
    throw new Error(message);
  }
};
