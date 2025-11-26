import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './KillLeaderboard.css'; 

export default function KillLeaderboard() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKillLeaderboard = async () => {
      try {
        // 💡 백엔드의 더미 API 호출
        const response = await axios.get('http://localhost:5000/api/kill-leaderboard');
        setPlayers(response.data);
      } catch (err) {
        setError('리더보드 로드 실패');
      } finally {
        setIsLoading(false);
      }
    };
    fetchKillLeaderboard();
  }, []); 

  return (
    <div className="kill-leaderboard-container">
      <h2>커리어 킬 리더보드 (PC)</h2>
      
      {isLoading && <p className="loading-message">로딩 중...</p>}
      {error && <p className="loading-message" style={{color: 'red'}}>{error}</p>}

      {!isLoading && !error && (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>플레이어 이름</th>
              <th>커리어 킬</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td className="rank-cell">{player.Rank}</td>
                <td className="player-cell">{player.Name}</td>
                <td className="value-cell">{player.Value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}