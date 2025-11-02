// RankingPage.js (실제 랭킹 API 연동)
import React, { useState, useEffect } from 'react';
import RankingList from './RankingList';
import axios from 'axios'; // 👈 axios 임포트
import './RankingPage.css';

export default function RankingPage() {
  const [rankings, setRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. 컴포넌트 마운트 시 "전체 랭킹" 데이터를 백엔드에서 로드
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // ✅ server.js에 새로 만든 /api/leaderboard 엔드포인트 호출
        const response = await axios.get('http://localhost:5000/api/leaderboard');
        setRankings(response.data); // ✅ 실제 랭킹 데이터로 state 설정
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []); // [] 비어있으므로 한 번만 실행됨

  //  userTag를 받아 검색하는 useEffect 삭제 (그 기능은 GetApi.js로 이동됨)

  if (isLoading) {
    return <div className="loading-message">랭킹 데이터를 불러오는 중...</div>;
  }
  
  if (error) {
    return <div className="loading-message"> 랭킹 로드 실패: {error.message}</div>;
  }

  return (
    <>
      <RankingList rankings={rankings} />
    </>
  );
}