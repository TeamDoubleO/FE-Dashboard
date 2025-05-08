import { AxiosError } from "axios";
import axiosWithAuthorization from "../contexts/axiosWithAuthorization";

// 관리자 본인 정보 조회
export const fetchAdminData = async () => {
    try {
        const res = await axiosWithAuthorization.get(`/admins/me`);
        console.log("관리자 본인 정보 조회:", res.data);
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ data?: { message?: string } }>;
        const message = err.response?.data?.data?.message ?? "관리자 본인 정보를 조회할 수 없습니다.";
        throw new Error(message);
    }
};
