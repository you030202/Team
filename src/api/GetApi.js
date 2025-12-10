import React, { useState } from 'react';
import axios from 'axios';
import PlayerDetails from '../PlayerDetails'; 
import '../RankingPage.css'; 

export default function GetApi() { 
  const [playerTag, setPlayerTag] = useState(''); 
  const [playerData, setPlayerData] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [ratingHistory, setRatingHistory] = useState(null); 
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
    setRatingHistory(null);
    setActiveTab('stats'); 

    try {
      const [playerRes, matchRes, historyRes] = await Promise.allSettled([
        axios.get(`http://localhost:5000/api/summoner/${playerTag}`),
        axios.get(`http://localhost:5000/api/matches/${playerTag}`),
        axios.get(`http://localhost:5000/api/history/${playerTag}`)
      ]);

      if (playerRes.status === 'fulfilled') {
        setPlayerData(playerRes.value.data);
      } else {
        throw new Error(playerRes.reason.response?.data?.message || '플레이어를 찾을 수 없습니다.');
      }

      if (matchRes.status === 'fulfilled') setMatchData(matchRes.value.data);
      if (historyRes.status === 'fulfilled') setRatingHistory(historyRes.value.data);

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
          {/* 💡 [필수] 이 버튼이 있어야 탭이 보입니다! */}
          <button className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>🤖 분석</button>
        </div>
      )}

      {isLoading && <p className="loading-message">로딩 중...</p>}
      {error && <p className="loading-message" style={{ color: '#e94560' }}>{error}</p>}

      {playerData && !isLoading && !error && (
        <PlayerDetails 
          playerData={playerData} 
          matchData={matchData} 
          ratingHistory={ratingHistory} 
          activeTab={activeTab} 
        />
      )}
    </div>
  );
}