import { AxiosError } from "axios";
import axiosWithAuthorization from "../contexts/axiosWithAuthorization";

// 관리자 본인 정보 조회
export const fetchAdminData = async () => {
    try {
        const res = await axiosWithAuthorization.get(`/admins/me`);
        console.log("관리자 본인 정보 조회:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("관리 본인 정보 조회 오류:", error); 
        throw error;
    }
};

// 관리자 비밀번호 변경
interface PasswordUpdatePayload {
    passwordOriginal: string;
    passwordNew: string;
}

export const updateAdminPassword = async (payload: PasswordUpdatePayload) => {
    try {
        const res = await axiosWithAuthorization.patch(`/admins/me/password`, payload);
        console.log("관리자 비밀번호 변경:", res.data);
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ data?: { message?: string } }>;
        const message = err.response?.data?.data?.message ?? "관리자 비밀번호를 변경할 수 없습니다.";
        throw new Error(message);
    }
}
