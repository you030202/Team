// GetApi.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerDetails from '../PlayerDetails'; 

export default function GetApi(props) {
  const { userTag } = props;
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userTag) {
      setPlayerData(null);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = `http://localhost:5000/api/summoner/${userTag}`;
        const response = await axios.get(url);
        setPlayerData(response.data); //  server.js가 보내준 "통합 데이터"
      } catch (err) {
        setError(err);
        setPlayerData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userTag]);

  if (!userTag) {
    return <div>검색어를 입력하고 검색 버튼을 눌러주세요.</div>;
  }
  
  if (isLoading) return <div>⏳ 로딩 중...</div>;
  
  if (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return <div>🚨 에러: {error.response.data.message}</div>;
    }
    return <div>🚨 에러 발생: {error.message}</div>;
  }

  //  검색 결과가 있으면, JSON 대신 PlayerDetails 컴포넌트를 렌더링
  return (
    <div>
      {playerData && (
        <PlayerDetails playerData={playerData} />
      )}
    </div>
  );
}