import React, { useState } from 'react';
// Recharts 컴포넌트 임포트
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// 이미지 URL 헬퍼
const getTrackerUrl = (name) => `https://trackercdn.com/cdn/apex.tracker.gg/legends/${name}-tile.png`;

// 레전드 아이콘 매핑
const LEGEND_ICONS = {
  '블러드하운드': getTrackerUrl('bloodhound'),
  '지브롤터': getTrackerUrl('gibraltar'),
  '라이프라인': getTrackerUrl('lifeline'),
  '패스파인더': getTrackerUrl('pathfinder'),
  '레이스': getTrackerUrl('wraith'),
  '방갈로르': getTrackerUrl('bangalore'),
  '뱅갈로르': getTrackerUrl('bangalore'),
  '코스틱': getTrackerUrl('caustic'),
  '미라지': getTrackerUrl('mirage'),
  '옥테인': getTrackerUrl('octane'),
  '왓슨': getTrackerUrl('wattson'),
  '크립토': getTrackerUrl('crypto'),
  '레버넌트': getTrackerUrl('revenant'),
  '로바': getTrackerUrl('loba'),
  '램파트': getTrackerUrl('rampart'),
  '호라이즌': getTrackerUrl('horizon'),
  '퓨즈': getTrackerUrl('fuse'),
  '발키리': getTrackerUrl('valkyrie'),
  '시어': getTrackerUrl('seer'),
  '애쉬': getTrackerUrl('ash'),
  '매드 매기': getTrackerUrl('mad-maggie'),
  '매드매기': getTrackerUrl('mad-maggie'),
  '뉴캐슬': getTrackerUrl('newcastle'),
  '밴티지': getTrackerUrl('vantage'),
  '카탈리스트': getTrackerUrl('catalyst'),
  '발리스틱': getTrackerUrl('ballistic'),
  '콘딧': getTrackerUrl('conduit'),
  '알터': getTrackerUrl('alter'),
  // 영어 이름
  'Bloodhound': getTrackerUrl('bloodhound'),
  'Gibraltar': getTrackerUrl('gibraltar'),
  'Lifeline': getTrackerUrl('lifeline'),
  'Pathfinder': getTrackerUrl('pathfinder'),
  'Wraith': getTrackerUrl('wraith'),
  'Bangalore': getTrackerUrl('bangalore'),
  'Caustic': getTrackerUrl('caustic'),
  'Mirage': getTrackerUrl('mirage'),
  'Octane': getTrackerUrl('octane'),
  'Wattson': getTrackerUrl('wattson'),
  'Crypto': getTrackerUrl('crypto'),
  'Revenant': getTrackerUrl('revenant'),
  'Loba': getTrackerUrl('loba'),
  'Rampart': getTrackerUrl('rampart'),
  'Horizon': getTrackerUrl('horizon'),
  'Fuse': getTrackerUrl('fuse'),
  'Valkyrie': getTrackerUrl('valkyrie'),
  'Seer': getTrackerUrl('seer'),
  'Ash': getTrackerUrl('ash'),
  'Mad Maggie': getTrackerUrl('mad-maggie'),
  'MadMaggie': getTrackerUrl('mad-maggie'),
  'Newcastle': getTrackerUrl('newcastle'),
  'Vantage': getTrackerUrl('vantage'),
  'Catalyst': getTrackerUrl('catalyst'),
  'Ballistic': getTrackerUrl('ballistic'),
  'Conduit': getTrackerUrl('conduit'),
  'Alter': getTrackerUrl('alter'),
};

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
  if (LEGEND_ICONS[legendName]) return LEGEND_ICONS[legendName];
  const lowerName = legendName.toLowerCase();
  const foundKey = Object.keys(LEGEND_ICONS).find(key => key.toLowerCase() === lowerName);
  if (foundKey) return LEGEND_ICONS[foundKey];
  const slug = lowerName.replace(/\s+/g, '-');
  return `https://trackercdn.com/cdn/apex.tracker.gg/legends/${slug}-tile.png`;
}

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/50?text=IMG'; 
};

// 커스텀 툴팁
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{
        backgroundColor: '#16213e',
        border: '1px solid #00B4D8',
        padding: '10px',
        borderRadius: '5px',
        color: '#fff'
      }}>
        <p className="label" style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
        <p className="intro" style={{ margin: 0, color: '#00B4D8' }}>
          {`RP: ${payload[0].value.toLocaleString()}`}
        </p>
      </div>
    );
  }
  return null;
};

// 페이지네이션 컴포넌트
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '20px' }}>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          style={{
            padding: '8px 12px',
            backgroundColor: currentPage === number ? '#00B4D8' : '#1e252f',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: currentPage === number ? 'bold' : 'normal'
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default function PlayerDetails({ playerData, matchData, ratingHistory, activeTab }) { 
  // 페이지네이션 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 10개씩 표시

  if (!playerData || !playerData.global) {
    return <p className="loading-message">플레이어 정보를 불러오는 중...</p>;
  }

  const { global, legends } = playerData; 

  // 💡 [핵심 수정] 랭크 정보를 ratingHistory의 최신 데이터(첫 번째 항목)로 덮어쓰기
  // ratingHistory가 있으면 그것을 우선 사용, 없으면 기존 API 데이터 사용
  const latestHistory = (ratingHistory && ratingHistory.length > 0) ? ratingHistory[0] : null;

  // 표시할 랭크 정보 결정
  const displayRankName = latestHistory 
    ? latestHistory.rankName // 더미 데이터엔 "Bronze 4" 처럼 합쳐져 있음
    : `${global.rank?.rankName ?? 'Unranked'} ${global.rank?.rankDiv ?? ''}`;

  const displayRankScore = latestHistory 
    ? latestHistory.rankScore 
    : (global.rank?.rankScore ?? 0);

  const displayRankImg = latestHistory 
    ? latestHistory.icon 
    : (global.rank?.rankImg ?? 'https://via.placeholder.com/120?text=Unranked');

  const renderPlayerHeader = () => (
    <div className="player-details-card">
      <div className="player-header-section">
        <img
          src={displayRankImg}
          alt={displayRankName}
          className="rank-icon-large"
          onError={handleImageError}
        />
        <div className="player-info-text">
          <h1>{global.name || '플레이어 이름 없음'}</h1>
          <p className="player-level">레벨: <span>{global.level || 0}</span></p>
          <p className="player-rank">
            현재 랭크: <span>{displayRankName} ({displayRankScore.toLocaleString()} LP)</span>
          </p>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );

  const renderStatsTab = () => {
    if (!legends || !legends.all) {
      return (
        <>
          {renderPlayerHeader()}
          <p className="loading-message">플레이어의 레전드 통계가 비공개(트래커 없음) 상태입니다.</p>
        </>
      );
    }
    const allLegends = Object.entries(legends.all).map(([key, value]) => ({
      ...value,
      LegendName: value.LegendName || key 
    }));
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
              if (!legend.data) return null; // 데이터 보호

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
                  const championImageUrl = getLegendIconUrl(match.legend);

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
                           <img src={championImageUrl} alt={match.legend} className="champion-icon" onError={handleImageError} />
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
                      <div className="opgg-arrow"><i className="fas fa-chevron-right"></i></div>
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

  // 4. 진행 탭 (그래프 + 페이지네이션 리스트)
  const renderProgressionTab = () => {
    if (!ratingHistory || ratingHistory.length === 0) return <p className="loading-message">데이터가 없습니다.</p>;
    
    // 서버에서 이미 내림차순(최신순)으로 옴
    const sortedHistory = [...ratingHistory]; 

    // 그래프용 데이터: 과거->최신
    const graphData = [...ratingHistory].reverse();

    // 페이지네이션 로직
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedHistory.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
       <>
        {renderPlayerHeader()}
        <div className="rating-history-section">
            <h3>Rating History</h3>
            
            {/* 📈 그래프 영역 (시간 순서: 좌 -> 우) */}
            <div className="chart-container" style={{ width: '100%', height: 300, marginBottom: '30px' }}>
              <ResponsiveContainer>
                <LineChart data={graphData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3441" />
                  <XAxis dataKey="date" stroke="#888" tick={{fontSize: 12}} />
                  <YAxis stroke="#888" tick={{fontSize: 12}} domain={['auto', 'auto']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="rankScore" 
                    stroke="#00B4D8" /* Sky Blue */
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#00B4D8', strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 📋 리스트 영역 (최신 날짜 상단) */}
            <div className="rating-list">
              <div className="rating-header-row">
                  <span>Date</span>
                  <span>Rating</span>
                  <span>Gain</span>
              </div>
              {currentItems.map((item, idx) => (
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

            {/* 페이지네이션 버튼 */}
            <Pagination 
              itemsPerPage={itemsPerPage} 
              totalItems={ratingHistory.length} 
              paginate={paginate} 
              currentPage={currentPage}
            />
        </div>
       </>
    );
  };

  if (activeTab === 'stats') return renderStatsTab();
  if (activeTab === 'matchHistory') return renderMatchHistoryTab();
  if (activeTab === 'progression') return renderProgressionTab();
  
  return renderStatsTab();
}