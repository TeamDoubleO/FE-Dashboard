import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import Layout from '../components/layout/Layout.tsx';
import Background from '../components/background/Background.tsx';
import Breadcrumb_ from '../components/breadcrumb/Breadcrumb_.tsx';
import DefaultTable from '../components/table/DefaultTable.tsx';
import Loading from "../components/loading/Loading.tsx";

import './css/PatientDetailPage.css';

import { fetchPatientGuardians } from "../apis/patientApi.ts";

const breadCrumbInfo = {
    currentPage: "환자 정보",
    firstSidebarItem: "환자 전체 목록 조회",
    secondSidebarItem: "환자별 보호자 목록 조회",
};

const patientColumn = [
    { key: "patientId", label: "환자ID" },
    { key: "patientCode", label: "환자번호" },
    { key: "name", label: "환자명"},
    { key: "sex", label: "성별"},
    { key: "guardianCount", label: "보호자수"},
]

const guardiansColumn = [
    { key: "guardianName", label: "보호자명" },
    { key: "guardianContact", label: "보호자 연락처"},
]

const PatientDetailPage = () => {
    const location = useLocation();
    const data = location.state;
    const patient = [data]; 
    const [guardianList, setGuardianList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    const loadData = async () => {
        setIsLoading(true);
        try {
            if (data.patientId) {
                const guardianData = await fetchPatientGuardians(data.patientId);
                setGuardianList(guardianData);
            }
        } catch (err) {
            console.error("보호자 목록 불러오기 실패:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [data]);

    return (
    <>
        <Background />
        <Layout>
        <Breadcrumb_ 
            currentPage={breadCrumbInfo.currentPage}
            firstSidebarItem={breadCrumbInfo.firstSidebarItem}
            secondSidebarItem={breadCrumbInfo.secondSidebarItem}
        />
        {isLoading ? (
        <div className="dashboard-pass-loading-overlay">
            <Loading />
            <div className="dashboard-pass-loading-text">환자별 보호자 목록을 불러오는 중입니다...</div>
        </div>
        ) : (
        <div className="patient-detail-container">
            <div className="patient-detail-title">환자별 보호자 목록 조회</div>
            <DefaultTable 
                tableTitles={patientColumn} 
                data={patient}
            />
            <br /><br />
            <div className="patient-detail-title">보호자 목록</div>
            <DefaultTable 
                tableTitles={guardiansColumn} 
                data={guardianList}
            />
        </div>
        )}
        </Layout>
    </>
    );
};

export default PatientDetailPage;