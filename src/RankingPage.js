import React, { useState, useEffect } from 'react';
import RankingList from './RankingList';
import axios from 'axios';
import './RankingPage.css';

export default function RankingPage() {
  const [rankings, setRankings] = useState(null); // 💡 초기값을 []에서 null로 변경
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard');
        setRankings(response.data);
      } catch (err) {
        setError(err); // 💡 오류 상태 저장
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []); 

  // 💡 isLoading, error, rankings 상태를 모두 RankingList로 전달
  return (
    <>
      <RankingList rankings={rankings} isLoading={isLoading} error={error} />
    </>
  );
}