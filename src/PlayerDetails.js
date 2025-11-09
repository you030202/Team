import React from 'react';

/**
 * 💡 [추가] API가 제공하는 스탯 이름을 한글로 번역하는 헬퍼 함수
 * (예: "BR Kills" -> "킬")
 */
function translateStatName(apiName) {
  const translations = {
    'Kills': '킬',
    'BR Kills': '킬',
    'Damage': '데미지',
    'BR Damage': '데미지',
    'Wins': '승리',
    'BR Wins': '승리',
    'Headshots': '헤드샷',
    'BR Headshots': '헤드샷',
    'Grapple: Travel distance': '이동 거리', // 패스파인더 예시
    'Times placed top 3': 'Top 3',
    // 필요한 스탯이 있다면 여기에 계속 추가할 수 있습니다.
  };
  
  // 'BR Kills' -> '배틀로얄 킬'이 됨
  // 'Kills' -> '킬'이 됨
  // 'Unknown Stat' -> 'Unknown Stat' (번역이 없으면 원본 이름 사용)
  return translations[apiName] || apiName;
}

export default function PlayerDetails({ playerData }) {
  // 데이터가 없거나, global 또는 legends 객체가 없는 경우
  if (!playerData || !playerData.global || !playerData.legends) {
    return <p className="loading-message">플레이어 정보를 불러오는 중...</p>;
  }

  const { global, legends } = playerData;

  // API가 legends.all을 반환하지 않는 경우(트래커 정보가 전혀 없음)
  if (!legends.all) {
    return (
      <div className="player-details-card">
        {/* --- 1. 플레이어 헤더 섹션 (유지) --- */}
        <div className="player-header-section">
          <img
            src={global.rank?.rankImg ?? 'https://via.placeholder.com/120?text=Unranked'}
            alt={global.rank?.rankName || 'Unranked'}
            className="rank-icon-large"
          />
          <div className="player-info-text">
            <h1>{global.name || '플레이어 이름 없음'}</h1>
            <p className="player-level">레벨: <span>{global.level || 0}</span></p>
            <p className="player-rank">
              현재 랭크: <span>{global.rank?.rankName ?? 'Unranked'} {global.rank?.rankDiv ?? ''} ({(global.rank?.rankScore ?? 0).toLocaleString()} LP)</span>
            </p>
          </div>
        </div>
        <div className="divider"></div>
        <p className="loading-message">플레이어의 레전드 통계가 비공개(트래커 없음) 상태입니다.</p>
      </div>
    );
  }

  // legends.all은 객체이므로 배열로 변환
  const allLegends = Object.values(legends.all);
  
  // 킬 수 기준으로 레전드 정렬
  allLegends.sort((a, b) => {
    // 💡 'Kills' 또는 'BR Kills'를 찾아 정렬 기준으로 삼음
    const killsA = a.data?.find(stat => stat.name.includes('Kills'))?.value || 0;
    const killsB = b.data?.find(stat => stat.name.includes('Kills'))?.value || 0;
    return killsB - killsA;
  });

  return (
    <div className="player-details-card">
      {/* --- 1. 플레이어 헤더 섹션 (유지) --- */}
      <div className="player-header-section">
        <img
          src={global.rank?.rankImg ?? 'https://via.placeholder.com/120?text=Unranked'}
          alt={global.rank?.rankName || 'Unranked'}
          className="rank-icon-large"
        />
        <div className="player-info-text">
          <h1>{global.name || '플레이어 이름 없음'}</h1>
          <p className="player-level">레벨: <span>{global.level || 0}</span></p>
          <p className="player-rank">
            현재 랭크: <span>{global.rank?.rankName ?? 'Unranked'} {global.rank?.rankDiv ?? ''} ({(global.rank?.rankScore ?? 0).toLocaleString()} LP)</span>
          </p>
        </div>
      </div>

      <div className="divider"></div>

      {/* 💡 --- 2. 레전드 통계 섹션 (캡처 사진 스타일로 변경) --- 💡 */}
      <div className="legend-stats-section">
        <h3>통계</h3>
        <div className="legend-list">
          {allLegends.map((legend) => {
            // 킬이 있거나(0 이상), 다른 데이터라도 1개 이상 있는 레전드만 표시
            const hasData = legend.data && legend.data.length > 0;

            if (!hasData) {
              return null; // 데이터가 아예 없는 레전드는 숨김
            }

            return (
              <div key={legend.LegendName} className="legend-card">
                {/* 1. 왼쪽: 큰 레전드 아이콘 */}
                <img 
                  src={legend.ImgAssets?.icon} 
                  alt={legend.LegendName} 
                  className="legend-card-image" 
                />
                
                {/* 2. 오른쪽: 레전드 이름 + 통계 그리드 */}
                <div className="legend-card-stats">
                  <span className="legend-name">{legend.LegendName}</span>
                  
                  <div className="legend-stats-grid">
                    {/* API가 주는 모든 통계를 동적으로 렌더링 */}
                    {legend.data.map((stat) => (
                      <div key={stat.name} className="legend-stat-item">
                        {/* 💡 한글 번역 함수 사용 */}
                        <span className="stat-label">{translateStatName(stat.name)}</span>
                        <span className="stat-value">{stat.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}