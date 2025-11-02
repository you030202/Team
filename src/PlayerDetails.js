// PlayerDetails.js (실제 PUBG 데이터 연동)
import React from 'react';

// GetApi로부터 playerData를 props로 받음
export default function PlayerDetails({ playerData }) {
  // playerData가 없거나 (검색 전) stats가 없으면 (데이터 오류) UI를 그리지 않음
  if (!playerData || !playerData.stats) {
    return (
      <div className="player-details-container placeholder">
        <p>플레이어를 검색하세요.</p>
      </div>
    );
  }

  // server.js에서 보내준 데이터 파싱
  const { name, stats } = playerData;
  const { kda, wins, top10s, roundsPlayed, damageDealt, kills } = stats;

  return (
    <div className="player-details-container">
      <h2>'{name}' 플레이어 정보 (평생 스쿼드 FPP)</h2>
      <div className="player-summary">
        <div className="player-avatar">
          <img src={`https://api.dicebear.com/8.x/bottts/svg?seed=${name}`} alt="Player Avatar" />
        </div>
        <div className="player-info">
          <h3>{name}</h3>
          <p>총 {roundsPlayed} 라운드</p>
        </div>
      </div>
      <div className="player-stats">
        <div className="stat-item">
          <span className="label">K/D/A</span>
          <span className="value">{kda ? kda.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="label">총 킬</span>
          <span className="value">{kills}</span>
        </div>
        <div className="stat-item">
          <span className="label">총 데미지</span>
          <span className="value">{damageDealt ? damageDealt.toFixed(0) : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="label">승리 (Top 1)</span>
          <span className="value">{wins}</span>
        </div>
        <div className="stat-item">
          <span className="label">Top 10</span>
          <span className="value">{top10s}</span>
        </div>
      </div>
    </div>
  );
}