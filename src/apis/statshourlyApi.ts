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
