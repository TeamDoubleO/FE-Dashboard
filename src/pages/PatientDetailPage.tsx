import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import Layout from '../components/layout/Layout.tsx';
import Background from '../components/background/Background.tsx';
import Breadcrumb from '../components/breadcrumb/Breadcrumb.tsx';
import DefaultTable from '../components/table/DefaultTable.tsx';

import './css/PatientDetailPage.css';

import { fetchPatientGuardians } from "../apis/patientApi.ts";

const breadCrumbInfo = {
    currentPage: "환자 정보",
    currentSidebarItem: "환자별 상세 조회"
};

const patientColumn = [
    { key: "patientId", label: "환자ID" },
    { key: "patientCode", label: "환자번호" },
    { key: "name", label: "환자명"},
    { key: "sex", label: "성별"},
    { key: "guardianCount", label: "보호자수"},
]

const areasColumns = [
    { key: "areaCode", label: "구역 ID" },
    { key: "areaName", label: "구역 명" },
]

const guardiansColumn = [
    { key: "guardianName", label: "보호자명" },
    { key: "guardianContact", label: "보호자 연락처"},
]

const PatientDetailPage = () => {
    const location = useLocation();
    const data = location.state;
    const patient = [data]; 
    const areasInfo = data?.areas || [];
    const [guardianList, setGuardianList] = useState([]);

    const loadData = async () => {
        try {
            if (data.patientId) {
                const guardianData = await fetchPatientGuardians(data.patientId);
                setGuardianList(guardianData);
            }
        } catch (err) {
            console.error("보호자 목록 불러오기 실패:", err);
        }
    };

    useEffect(() => {
        loadData();
    }, [data]);

    return (
    <>
        <Background />
        <Layout>
        <Breadcrumb 
            currentPage={breadCrumbInfo.currentPage}
            currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />

        <div className="patient-detail-container">
            <div className="patient-detail-title">환자별 상세 조회</div>
            <DefaultTable 
                tableTitles={patientColumn} 
                data={patient}
            />
            <br /><br />
            <div className="patient-detail-title">출입 구역</div>
            <DefaultTable 
                tableTitles={areasColumns} 
                data={areasInfo}
            />
            <br /><br />
            <div className="patient-detail-title">보호자 목록</div>
            <DefaultTable 
                tableTitles={guardiansColumn} 
                data={guardianList}
            />
        </div>
        </Layout>
    </>
    );
};

export default PatientDetailPage;