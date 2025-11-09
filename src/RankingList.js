import React from 'react';
import './RankingPage.css'; 

// 💡 props로 isLoading과 error를 추가로 받음
export default function RankingList({ rankings, isLoading, error }) {
  
  // 1. 로딩 상태일 때
  if (isLoading) {
    return (
      <div className="ranking-list-container">
        <h2>Apex Predator 랭크 (PC)</h2>
        <p className="loading-message">랭킹 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 2. 💡 에러 상태일 때 (이 부분이 추가됨)
  if (error) {
    // API가 보낸 오류 메시지를 표시
    const errorMsg = error.response?.data?.Error || error.message;
    return (
      <div className="ranking-list-container">
        <h2>Apex Predator 랭크 (PC)</h2>
        <p className="loading-message" style={{ color: '#e94560' }}>
          랭킹 로드 실패: {errorMsg}
        </p>
      </div>
    );
  }

  // 3. 데이터가 비어있을 때 (정상이나 컷 정보가 없음)
  if (!rankings || rankings.val === undefined) {
    return (
      <div className="ranking-list-container">
        <h2>Apex Predator 랭크 (PC)</h2>
        <p className="loading-message">랭킹 데이터가 없습니다.</p>
      </div>
    );
  }

  // 4. 성공 상태일 때
  return (
    <div className="ranking-list-container">
      <h2>Apex Predator 랭크 (PC)</h2>
      
      <div className="predator-rank-info">
        <div className="predator-rank-header">
          현재 Predator 컷
        </div>
        <div className="predator-rank-lp">
          {rankings.val.toLocaleString()} LP
        </div>
        <div className="predator-rank-total">
          (상위 {rankings.totalMastersAndPreds.toLocaleString()} 명)
        </div>
        <p className="update-time">
          기준: {new Date(rankings.updateTimestamp * 1000).toLocaleString('ko-KR')}
        </p>
      </div>
    </div>
  );
}