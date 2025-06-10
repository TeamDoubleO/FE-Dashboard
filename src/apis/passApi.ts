import axiosWithAuthorization from "../contexts/axiosWithAuthorization";

// 출입 내역 조회
export const fetchEntryPassLog = async (page: number) => {
    try {
        const res = await axiosWithAuthorization.get(`/pass-logs/enter?page=${page}`);
        console.log("---> 출입 내역 조회:", res.data);
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

// 출입증 신청 요청 목록 조회
export const fetchPassPending = async (page: number) => {
    try {
        const res = await axiosWithAuthorization.get(`/admin-passes/pending?page=${page}`);
        console.log("출입증 신청 요청 목록 조회:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("출입증 신청 요청 목록 조회 오류:", error); 
        throw error;
    }
};

// 보호자 신청 승인/거절
export const reviewPass = async (passId: number, issuanceStatus: "ISSUED" | "REJECTED") => {
    try {
        const res = await axiosWithAuthorization.post(`/admin-passes/approve`, {
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


