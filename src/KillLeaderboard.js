import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 💡 다시 axios가 필요합니다.
import './KillLeaderboard.css'; 

export default function KillLeaderboard() {
  // 1. 데이터를 저장할 state
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. 컴포넌트가 켜질 때 API를 호출 (useEffect)
  useEffect(() => {
    const fetchKillLeaderboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/kill-leaderboard');
        setPlayers(response.data); // 받아온 데이터를 state에 저장
      } catch (err) {
        setError('리더보드를 불러오지 못했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKillLeaderboard();
  }, []); 

  return (
    <div className="kill-leaderboard-container">
      <h2>커리어 킬 리더보드 (PC)</h2>
      
      {isLoading && <p className="loading-message">리더보드 로딩 중...</p>}
      
      {error && <p className="loading-message" style={{ color: '#e94560' }}>{error}</p>}

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
            {players.map((player) => (
              <tr key={player.Rank}>
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