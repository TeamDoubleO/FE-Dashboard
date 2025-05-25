import axiosWithAuthorization from "../contexts/axiosWithAuthorization";

// 출입 내역 조회
export const fetchEntryPassLog = async (page: number) => {
    try {
        const res = await axiosWithAuthorization.get(`/pass-logs/enter?page=${page}`);
        console.log("출입 내역 조회:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("출입 내역 조회 오류:", error); 
        throw error;
    }
};

// 출입증 발급 내역 조회
export const fetchIssuedPassLog = async (page: number) => {
    try {
        const res = await axiosWithAuthorization.get(`/pass-logs/issued?page=${page}`);
        console.log("출입증 발급 내역 조회:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("출입증 발급 내역 조회 오류:", error); 
        throw error;
    }
};