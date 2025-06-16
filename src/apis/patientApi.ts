import axiosWithAuthorization from "../contexts/axiosWithAuthorization";

// 환자 목록 전체 조회
export const fetchPatientList = async (page: number, keyword: string = "") => {
    try {
        const res = await axiosWithAuthorization.get(`/patients/paged?page=${page}`, {
            params: {
                page,
                ...(keyword ? { keyword } : {}),
            },
        });
        console.log("환자 목록 전체 조회:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("환자 목록 전체 조회 오류:", error); 
        throw error;
    }
};

// 환자 개별 상세 조회
export const fetchPatientDetail = async (patientId: number) => {
    try {
        const res = await axiosWithAuthorization.get(`/patients/${patientId}`);
        console.log("환자 개별 상세 조회:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("환자 개별 상세 조회 오류:", error); 
        throw error;
    }
};

// 환자별 보호자 조회
export const fetchPatientGuardians = async (patientId: number) => {
    try {
        const res = await axiosWithAuthorization.get(`/patients/${patientId}/guardians`);
        console.log("환자별 보호자 조회:", res.data);
        return res.data.data;
    } catch (error) {
        console.log("환자별 보호자 조회 오류:", error); 
        throw error;
    }
};