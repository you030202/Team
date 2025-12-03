// src/api/GetApi.js
import React, { useState } from 'react';
import axios from 'axios';
import PlayerDetails from '../PlayerDetails'; 
import '../RankingPage.css'; 

export default function GetApi() { 
  const [playerTag, setPlayerTag] = useState(''); 
  const [playerData, setPlayerData] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [ratingHistory, setRatingHistory] = useState(null); // 💡 상태 선언 확인
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [activeTab, setActiveTab] = useState('stats'); 

  const fetchPlayerData = async () => {
    if (!playerTag.trim()) {
      setError('플레이어 닉네임을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPlayerData(null);
    setMatchData(null);
    setRatingHistory(null); // 초기화
    setActiveTab('stats');

    try {
      // 💡 [중요] 3번째 API 호출(history)이 반드시 포함되어야 함
      const [playerRes, matchRes, historyRes] = await Promise.allSettled([
        axios.get(`http://localhost:5000/api/summoner/${playerTag}`),
        axios.get(`http://localhost:5000/api/matches/${playerTag}`),
        axios.get(`http://localhost:5000/api/history/${playerTag}`) // 이 줄 확인!
      ]);

      if (playerRes.status === 'fulfilled') {
        setPlayerData(playerRes.value.data);
      } else {
        throw new Error(playerRes.reason.response?.data?.message || '플레이어를 찾을 수 없습니다.');
      }

      if (matchRes.status === 'fulfilled') setMatchData(matchRes.value.data);
      
      // 💡 [중요] 받아온 데이터를 상태에 저장
      if (historyRes.status === 'fulfilled') {
        console.log("History Data Loaded:", historyRes.value.data); // 디버깅용 로그
        setRatingHistory(historyRes.value.data);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="get-api-container">
      <form onSubmit={(e) => { e.preventDefault(); fetchPlayerData(); }} className="search-form">
        <input
          type="text"
          value={playerTag}
          onChange={(e) => setPlayerTag(e.target.value)}
          placeholder="Apex 닉네임을 입력하세요 (예: ImperialHal)"
          className="search-input"
        />
        <button type="submit" className="search-button">검색</button>
      </form>

      {playerData && !isLoading && !error && (
        <div className="tabs-navigation">
          <button className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>📊 통계</button>
          <button className={`tab-button ${activeTab === 'matchHistory' ? 'active' : ''}`} onClick={() => setActiveTab('matchHistory')}>📅 경기 내역</button>
          <button className={`tab-button ${activeTab === 'progression' ? 'active' : ''}`} onClick={() => setActiveTab('progression')}>📈 진행</button>
        </div>
      )}

      {isLoading && <p className="loading-message">로딩 중...</p>}
      {error && <p className="loading-message" style={{ color: '#e94560' }}>{error}</p>}

      {playerData && !isLoading && !error && (
        <PlayerDetails 
          playerData={playerData} 
          matchData={matchData} 
          ratingHistory={ratingHistory} // 💡 props 전달 확인
          activeTab={activeTab} 
        />
      )}
    </div>
  );
}