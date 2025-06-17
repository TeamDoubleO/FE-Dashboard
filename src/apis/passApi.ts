import axiosWithAuthorization from "../contexts/axiosWithAuthorization";

// 출입 내역 조회
export const fetchEntryPassLog = async (page: number, keyword: string = "") => {
    try {
        const res = await axiosWithAuthorization.get(`/pass-logs/enter?page=${page}`, {
            params: {
                page,
                ...(keyword ? { keyword } : {}),
            },
        });
        console.log("출입 내역 조회:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("출입 내역 조회 오류:", error); 
        throw error;
    }
};

// 출입증 발급 내역 조회
export const fetchIssuedPassLog = async (page: number, keyword: string = "") => {
    try {
        const res = await axiosWithAuthorization.get(`/pass-logs/issued?page=${page}`, {
            params: {
                page,
                ...(keyword ? { keyword } : {}),
            },
        });
        console.log("출입증 발급 내역 조회:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("출입증 발급 내역 조회 오류:", error); 
        throw error;
    }
};

// 출입증 신청 요청 목록 조회
export const fetchPassPending = async (page: number) => {
    try {
        const res = await axiosWithAuthorization.get(`/passes/pending?page=${page}`);
        console.log("출입증 신청 요청 목록 조회:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("출입증 신청 요청 목록 조회 오류:", error); 
        throw error;
    }
};

// 보호자 신청 승인/거절
export const reviewPass = async (passId: number, issuanceStatus: "PROCESSING" | "REJECTED") => {
    try {
        const res = await axiosWithAuthorization.post(`/passes/approve`, {
            passId,
            issuanceStatus,
        });
        console.log("보호자 신청 승인/거절:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("보호자 신청 승인/거절 오류:", error); 
        throw error;
    }
};

// 출입 로그 health-check
export const checkPassLogHealthCheck = async () => {
    try {
        const res = await axiosWithAuthorization.get(`/pass-logs/health`);
        console.log("출입 로그 health-check:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("출입 로그 health-check 오류:", error); 
        throw error;
    }
};


