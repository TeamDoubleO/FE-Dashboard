import axiosWithAuthorization from '../contexts/axiosWithAuthorization';

// 건물 정보 타입
export interface Building {
  buildingId: number;
  buildingName: string;
  buildingCode: string;
}

// 구역 정보 타입
export interface Area {
  areaId: number;
  areaName: string;
  areaCode: string;
}

interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  timestamp: string;
}

// 전체 건물 목록 조회
export const fetchBuildings = async (): Promise<Building[]> => {
  console.log('fetchBuildings 호출');
  const res = await axiosWithAuthorization.get<ApiResponse<Building[]>>('/hospitals/buildings');
  return res.data.data;
};

// 건물 ID 기반 구역 목록 조회
export const fetchAreas = async (buildingId: number): Promise<Area[]> => {
  console.log('fetchAreas 호출:', buildingId);
  const res = await axiosWithAuthorization.get<ApiResponse<Area[]>>(
    `/hospitals/${buildingId}/areas`
  );
  return res.data.data;
};
