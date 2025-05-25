import { AxiosError } from "axios";
import axiosWithAuthorization from "../contexts/axiosWithAuthorization";

// 출입 신청 정책 조회
export const fetchAccessPolicy = async () => {
  try {
    const res = await axiosWithAuthorization.get(`/hospitals/policies`);
    console.log("출입 신청 정책 조회:", res.data);
    return res.data.data;
  } catch (error) {
    console.log("출입 신청 정책 조회 오류:", error);
    throw error;
  }
};

// 출입 신청 정책 수정
interface AccessPolicyUpdatePayload {
  reserveDayOffset: number;
  cutoffTime: string;
  maxGuardianNum: number;
}

export const updateAccessPolicy = async (payload: AccessPolicyUpdatePayload) => {
  try {
    const res = await axiosWithAuthorization.patch(`/hospitals/policies`, payload);
    console.log("출입 신청 정책 수정:", res.data);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError<{ data?: { message?: string } }>;
    const message = err.response?.data?.data?.message ?? "출입 신청 정책을 수정할 수 없습니다.";
    throw new Error(message);
  }
};
