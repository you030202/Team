import React from 'react';

export default function RankingList({ rankings }) {

  return (
    <div className="ranking-list-container">
      <h2>PUBG 리더보드 (스쿼드 FPP)</h2>
      <ul>
        {rankings.map((player) => (
          <li key={player.id}>
            <span className="rank">{player.rank}</span>
            <span className="name">{player.name}</span>
            <span className="lp">KDA: {player.kda.toFixed(2)}</span>
            <span className="lp">승: {player.wins}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}