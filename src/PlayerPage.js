// RankingPage.js (실제 랭킹 API 연동)
import React, { useState, useEffect } from 'react';
import RankingList from './RankingList'; // 👈 랭킹 목록 UI
import axios from 'axios'; // 👈 axios 임포트
import './RankingPage.css';

// ❌ 가상 데이터(mockRankingData) 삭제

export default function RankingPage() {
  const [rankings, setRankings] = useState([]); // 랭킹 데이터
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. 컴포넌트 마운트 시 "전체 랭킹" 데이터를 백엔드에서 로드
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        //  server.js에 새로 만든 /api/leaderboard 엔드포인트 호출
        const response = await axios.get('http://localhost:5000/api/leaderboard');
        setRankings(response.data); 
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []); 


  if (isLoading) {
    return <div className="loading-message">랭킹 데이터를 불러오는 중...</div>;
  }
  
  if (error) {
    return <div className="loading-message">🚨 랭킹 로드 실패: {error.message}</div>;
  }

  return (
    <>
      <RankingList rankings={rankings} />
    </>
  );
}