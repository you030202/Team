import React from 'react';

// 💡 [핵심 수정] 한글 레전드 이름 -> 공식 API 영어 이미지 URL 매핑
const LEGEND_ICONS = {
  '블러드하운드': 'https://api.mozambiquehe.re/assets/icons/legend/Bloodhound.png',
  '지브롤터': 'https://api.mozambiquehe.re/assets/icons/legend/Gibraltar.png',
  '라이프라인': 'https://api.mozambiquehe.re/assets/icons/legend/Lifeline.png',
  '패스파인더': 'https://api.mozambiquehe.re/assets/icons/legend/Pathfinder.png',
  '레이스': 'https://api.mozambiquehe.re/assets/icons/legend/Wraith.png',
  '방갈로르': 'https://api.mozambiquehe.re/assets/icons/legend/Bangalore.png',
  '코스틱': 'https://api.mozambiquehe.re/assets/icons/legend/Caustic.png',
  '미라지': 'https://api.mozambiquehe.re/assets/icons/legend/Mirage.png',
  '옥테인': 'https://api.mozambiquehe.re/assets/icons/legend/Octane.png',
  '왓슨': 'https://api.mozambiquehe.re/assets/icons/legend/Wattson.png',
  '크립토': 'https://api.mozambiquehe.re/assets/icons/legend/Crypto.png',
  '레버넌트': 'https://api.mozambiquehe.re/assets/icons/legend/Revenant.png',
  '로바': 'https://api.mozambiquehe.re/assets/icons/legend/Loba.png',
  '램파트': 'https://api.mozambiquehe.re/assets/icons/legend/Rampart.png',
  '호라이즌': 'https://api.mozambiquehe.re/assets/icons/legend/Horizon.png',
  '퓨즈': 'https://api.mozambiquehe.re/assets/icons/legend/Fuse.png',
  '발키리': 'https://api.mozambiquehe.re/assets/icons/legend/Valkyrie.png',
  '시어': 'https://api.mozambiquehe.re/assets/icons/legend/Seer.png',
  '애쉬': 'https://api.mozambiquehe.re/assets/icons/legend/Ash.png',
  '매드 매기': 'https://api.mozambiquehe.re/assets/icons/legend/Mad%20Maggie.png',
  '뉴캐슬': 'https://api.mozambiquehe.re/assets/icons/legend/Newcastle.png',
  '밴티지': 'https://api.mozambiquehe.re/assets/icons/legend/Vantage.png',
  '카탈리스트': 'https://api.mozambiquehe.re/assets/icons/legend/Catalyst.png',
  '발리스틱': 'https://api.mozambiquehe.re/assets/icons/legend/Ballistic.png',
  '콘딧': 'https://api.mozambiquehe.re/assets/icons/legend/Conduit.png',
  '알터': 'https://api.mozambiquehe.re/assets/icons/legend/Alter.png',
  // 영어 이름이 들어올 경우를 대비한 매핑 (선택)
  'Wraith': 'https://api.mozambiquehe.re/assets/icons/legend/Wraith.png',
  'Octane': 'https://api.mozambiquehe.re/assets/icons/legend/Octane.png',
};

// 헬퍼 함수: 스탯 이름 한글 번역
function translateStatName(apiName) {
  const translations = {
    'Kills': '킬', 'BR Kills': '배틀로얄 킬', 'Damage': '데미지', 'BR Damage': '배틀로얄 데미지',
    'Wins': '승리', 'BR Wins': '배틀로얄 승리', 'Headshots': '헤드샷', 'BR Headshots': '배틀로얄 헤드샷',
    'Grapple: Travel distance': '그래플 이동 거리', 'Times placed top 3': 'Top 3',
    'matches_played': '플레이한 게임 수', 'gameDuration': '게임 시간',
  };
  return translations[apiName] || apiName;
}

function formatDuration(seconds) {
  const sec = Number(seconds) || 0;
  if (sec === 0) return 'N/A';
  const minutes = Math.floor(sec / 60);
  const remainingSeconds = sec % 60;
  return `${minutes}분 ${remainingSeconds}초`;
}

function getLegendIconUrl(legendName) {
  if (!legendName) return 'https://via.placeholder.com/50?text=?';
  
  // 1. 매핑된 URL이 있으면 사용 (한글 이름 처리)
  if (LEGEND_ICONS[legendName]) {
    return LEGEND_ICONS[legendName];
  }

  // 2. 없으면 기본 영어 이름 규칙 시도 (fallback)
  return `https://api.mozambiquehe.re/assets/icons/legend/${encodeURIComponent(legendName)}.png`;
}

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/50?text=?'; 
};

export default function PlayerDetails({ playerData, matchData, ratingHistory, activeTab }) { 
  if (!playerData || !playerData.global) {
    return <p className="loading-message">플레이어 정보를 불러오는 중...</p>;
  }

  const { global, legends } = playerData; 

  // 1. 플레이어 헤더
  const renderPlayerHeader = () => (
    <div className="player-details-card">
      <div className="player-header-section">
        <img
          src={global.rank?.rankImg ?? 'https://via.placeholder.com/120?text=Unranked'}
          alt={global.rank?.rankName || 'Unranked'}
          className="rank-icon-large"
          onError={handleImageError}
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
    </div>
  );

  // 2. '통계' 탭
  const renderStatsTab = () => {
    if (!legends || !legends.all) {
      return (
        <>
          {renderPlayerHeader()}
          <p className="loading-message">플레이어의 레전드 통계가 비공개(트래커 없음) 상태입니다.</p>
        </>
      );
    }
    const allLegends = Object.values(legends.all);
    allLegends.sort((a, b) => {
      const killsA = a.data?.find(stat => stat.name.includes('Kills'))?.value || 0;
      const killsB = b.data?.find(stat => stat.name.includes('Kills'))?.value || 0;
      return killsB - killsA;
    });

    return (
      <>
        {renderPlayerHeader()}
        <div className="legend-stats-section">
          <h3>레전드 통계</h3>
          <div className="legend-list">
            {allLegends.map((legend) => {
              const hasData = legend.data && legend.data.length > 0;
              if (!hasData) return null; 

              return (
                <div key={legend.LegendName} className="legend-card">
                  <img 
                    src={getLegendIconUrl(legend.LegendName)}
                    alt={legend.LegendName} 
                    className="legend-card-image" 
                    onError={handleImageError}
                  />
                  <div className="legend-card-stats">
                    <span className="legend-name">{legend.LegendName}</span>
                    <div className="legend-stats-grid">
                      {legend.data.map((stat) => (
                        <div key={stat.name} className="legend-stat-item">
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
      </>
    );
  };

  // 3. '경기 내역' 탭
  const renderMatchHistoryTab = () => {
    if (!matchData || Object.keys(matchData).length === 0) {
      return (
        <>
          {renderPlayerHeader()}
          <p className="loading-message">최근 경기 내역이 없습니다.</p>
        </>
      );
    }

    const sortedDateLabels = Object.keys(matchData);

    return (
      <>
        {renderPlayerHeader()}
        <div className="match-history-section">
          <h3>최근 경기 내역</h3>
          
          {sortedDateLabels.map((dateLabel) => (
            <div key={dateLabel} className="match-group">
              <h4 className="match-date-label">{dateLabel}</h4>
              
              <div className="match-list-opgg">
                {matchData[dateLabel].map((match, index) => {
                  const isWin = match.wins > 0; 
                  const cardClass = isWin ? 'opgg-card win' : 'opgg-card lose';
                  const rpText = (match.rp || 0) > 0 ? `+${match.rp}` : `${match.rp || 0}`;

                  return (
                    <div key={index} className={cardClass}>
                      <div className="opgg-info">
                        <span className={`result-text ${isWin ? 'win-text' : ''}`}>
                          {isWin ? '승리' : (match.rp ? `${rpText} RP` : 'Top 20')}
                        </span>
                        <span className="game-mode">{match.gameType}</span>
                        {match.map && <span className="game-map">{match.map}</span>}
                        <span className="game-time">{formatDuration(match.gameDuration)}</span>
                      </div>

                      <div className="opgg-champion">
                        <div className="champion-icon-wrapper">
                           <img 
                            // 💡 한글 이름('레이스')으로 정확한 URL('Wraith.png')을 찾음
                            src={getLegendIconUrl(match.legend)} 
                            alt={match.legend} 
                            className="champion-icon"
                            onError={handleImageError} 
                          />
                          {isWin && <div className="mvp-badge">MVP</div>}
                        </div>
                        <span className="champion-name">{match.legend}</span>
                      </div>

                      <div className="opgg-stats">
                        <div className="kda-box">
                          <div className="kda-numbers">
                            <span className="kills">{match.kills}</span>
                            <span className="separator">/</span>
                            <span className="assists">{match.assists || 0}</span>
                            <span className="separator">/</span>
                            <span className="knockdowns">{match.knockdowns || 0}</span>
                          </div>
                          <span className="kda-label">킬 / 어시 / 기절</span>
                        </div>
                        <div className="damage-box">
                          <span className="damage-val">{match.damage.toLocaleString()}</span>
                          <span className="damage-label">데미지</span>
                        </div>
                      </div>
                      
                      <div className="opgg-arrow">
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  // 4. 진행 탭 (그래프 + 리스트) - recharts 필요
  const renderProgressionTab = () => {
    if (!ratingHistory) return <p className="loading-message">데이터가 없습니다.</p>;
    // Recharts를 아직 import하지 않았다면 리스트만 보여줍니다.
    // (이전 답변의 전체 코드를 참고하여 Recharts 부분도 추가 가능)
    
    return (
       <>
        {renderPlayerHeader()}
        <div className="rating-history-section">
            <h3>Rating History</h3>
            <div className="rating-list">
            <div className="rating-header-row">
                <span>Date</span>
                <span>Rating</span>
                <span>Gain</span>
            </div>
            {ratingHistory.map((item, idx) => (
                <div key={idx} className="rating-row">
                <span className="r-date">{item.date}</span>
                <div className="r-rating">
                    <img src={item.icon} alt="rank" className="r-rank-icon" onError={handleImageError}/>
                    <div className="r-rating-text">
                    <span className="r-name">{item.rankName}</span>
                    <span className="r-rp">{item.rankScore.toLocaleString()} RP</span>
                    </div>
                </div>
                <span className={`r-gain ${item.change >= 0 ? 'positive' : 'negative'}`}>
                    {item.change > 0 ? '+' : ''}{item.change.toLocaleString()}
                </span>
                </div>
            ))}
            </div>
        </div>
       </>
    );
  };

  if (activeTab === 'stats') return renderStatsTab();
  if (activeTab === 'matchHistory') return renderMatchHistoryTab();
  if (activeTab === 'progression') return renderProgressionTab();
  
  return renderStatsTab();
}