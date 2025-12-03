// riot-proxy-server/dummyData.js

// 1. 킬 리더보드 (고정 데이터)
const killLeaderboard = [
  { Rank: 1, Name: 'ImperialHal', Value: 59320 },
  { Rank: 2, Name: 'Aceu', Value: 48500 },
  { Rank: 3, Name: 'iitzTimmy', Value: 45200 },
  { Rank: 4, Name: 'Sweetdreams', Value: 42100 },
  { Rank: 5, Name: 'Selly', Value: 39800 },
  { Rank: 6, Name: 'Genburten', Value: 38500 },
  { Rank: 7, Name: 'HisWattson', Value: 36200 },
  { Rank: 8, Name: 'Zer0', Value: 35400 },
  { Rank: 9, Name: 'Ras', Value: 34800 },
  { Rank: 10, Name: 'Mande', Value: 33500 },
  { Rank: 11, Name: 'ShivFPS', Value: 32100 },
  { Rank: 12, Name: 'Verhulst', Value: 31500 },
  { Rank: 13, Name: 'Reps', Value: 30200 },
  { Rank: 14, Name: 'Faide', Value: 29800 },
  { Rank: 15, Name: 'Stormen', Value: 28400 },
  { Rank: 16, Name: 'Taxi2g', Value: 27500 },
  { Rank: 17, Name: 'NICKMERCS', Value: 26200 },
  { Rank: 18, Name: 'Snip3down', Value: 25800 },
  { Rank: 19, Name: 'Albralelie', Value: 24500 },
  { Rank: 20, Name: 'Daltoosh', Value: 23000 },
];

// 2. 경기 내역 데이터
const getTrackerUrl = (name) => `https://trackercdn.com/cdn/apex.tracker.gg/legends/${name}-tile.png`;

const matchHistory = [
  {
    "방금 전": [
       { legend: '호라이즌', legendIcon: getTrackerUrl('horizon'), gameType: '랭크', map: '올림푸스', gameDuration: 1150, kills: 14, damage: 3800, assists: 5, knockdowns: 12, rp: 250, wins: 1 },
       { legend: '레이스', legendIcon: getTrackerUrl('wraith'), gameType: '랭크', map: '올림푸스', gameDuration: 1200, kills: 8, damage: 2100, assists: 7, knockdowns: 5, rp: 180, wins: 1 },
       { legend: '패스파인더', legendIcon: getTrackerUrl('pathfinder'), gameType: '랭크', map: '올림푸스', gameDuration: 1020, kills: 6, damage: 1800, assists: 4, knockdowns: 5, rp: 85, wins: 0 }
    ],
    "2시간 전": [
       { legend: '호라이즌', legendIcon: getTrackerUrl('horizon'), gameType: '랭크', map: '스톰 포인트', gameDuration: 950, kills: 9, damage: 2400, assists: 2, knockdowns: 8, rp: 120, wins: 0 },
       { legend: '방갈로르', legendIcon: getTrackerUrl('bangalore'), gameType: '랭크', map: '스톰 포인트', gameDuration: 800, kills: 4, damage: 1200, assists: 1, knockdowns: 3, rp: 45, wins: 0 },
       { legend: '레이스', legendIcon: getTrackerUrl('wraith'), gameType: '랭크', map: '스톰 포인트', gameDuration: 1250, kills: 11, damage: 3100, assists: 7, knockdowns: 10, rp: 210, wins: 1 },
       { legend: '호라이즌', legendIcon: getTrackerUrl('horizon'), gameType: '랭크', map: '스톰 포인트', gameDuration: 1300, kills: 13, damage: 3300, assists: 4, knockdowns: 11, rp: 230, wins: 1 }
    ]
  },
  {
    "오늘": [
       { legend: '미라지', legendIcon: getTrackerUrl('mirage'), gameType: '배틀 로얄', map: '킹스 캐니언', gameDuration: 120, kills: 0, damage: 50, assists: 0, knockdowns: 0, rp: 0, wins: 0 },
       { legend: '코스틱', legendIcon: getTrackerUrl('caustic'), gameType: '배틀 로얄', map: '킹스 캐니언', gameDuration: 300, kills: 1, damage: 250, assists: 1, knockdowns: 1, rp: 0, wins: 0 },
       { legend: '옥테인', legendIcon: getTrackerUrl('octane'), gameType: '팀 데스매치', map: '해비타트', gameDuration: 600, kills: 12, damage: 2100, assists: 5, knockdowns: 0, rp: 0, wins: 1 },
       { legend: '퓨즈', legendIcon: getTrackerUrl('fuse'), gameType: '배틀 로얄', map: '킹스 캐니언', gameDuration: 1100, kills: 6, damage: 1800, assists: 3, knockdowns: 5, rp: 0, wins: 1 }
    ],
    "어제": [
       { legend: '왓슨', legendIcon: getTrackerUrl('wattson'), gameType: '컨트롤', map: '생산 야드', gameDuration: 900, kills: 5, damage: 1200, assists: 2, knockdowns: 0, rp: 0, wins: 0 },
       { legend: '크립토', legendIcon: getTrackerUrl('crypto'), gameType: '배틀 로얄', map: '브로큰 문', gameDuration: 950, kills: 0, damage: 120, assists: 4, knockdowns: 0, rp: 0, wins: 0 }
    ]
  },
  {
    "오늘": [
      { legend: '라이프라인', legendIcon: getTrackerUrl('lifeline'), gameType: '랭크', map: '올림푸스', gameDuration: 1250, kills: 2, damage: 1100, assists: 8, knockdowns: 2, rp: 110, wins: 1 },
      { legend: '뉴캐슬', legendIcon: getTrackerUrl('newcastle'), gameType: '랭크', map: '올림푸스', gameDuration: 1100, kills: 1, damage: 800, assists: 12, knockdowns: 1, rp: 135, wins: 1 }
    ]
  }
];

// 💡 3. [핵심 수정] 리더보드 순위에 따른 차등 점수 부여
const getRatingHistory = (playerName) => {
  const data = [];
  
  // 1. 리더보드에서 플레이어 찾기 (대소문자 무시)
  const leaderboardIndex = killLeaderboard.findIndex(
    (p) => p.Name.toLowerCase() === (playerName || '').toLowerCase()
  );
  
  const isFamous = leaderboardIndex !== -1;

  // 2. 초기 점수 설정
  let currentScore;
  if (isFamous) {
    // 💡 순위가 높을수록 점수가 높게 설정됨 (Rank 1 = Index 0)
    // 1위(ImperialHal) ~ 20위(Daltoosh) 사이 점수 차등
    // 예: 1위 = 70,000점 시작, 20위 = 32,000점 시작 (2000점씩 차감)
    const baseScore = 70000 - (leaderboardIndex * 2000);
    // 약간의 랜덤성 추가 (+- 2000)
    currentScore = baseScore + Math.floor(Math.random() * 4000) - 2000;
  } else {
    // 일반인: 2,000 ~ 5,000점 (실버~골드)
    currentScore = Math.floor(Math.random() * 3000) + 2000;
  }

  // 3. 랜덤 날짜 생성 범위 설정 (2025-11-20 ~ 2025-12-02)
  const startDate = new Date('2025-11-20T00:00:00');
  const endDate = new Date('2025-12-02T23:59:59');
  const startTs = startDate.getTime();
  const endTs = endDate.getTime();

  // 30개의 데이터 포인트
  const numberOfPoints = 30;
  const randomDates = [];

  for (let i = 0; i < numberOfPoints; i++) {
    const randomTs = Math.floor(Math.random() * (endTs - startTs + 1)) + startTs;
    randomDates.push(new Date(randomTs));
  }

  // 날짜 오름차순 정렬
  randomDates.sort((a, b) => a - b);

  // 데이터 생성
  randomDates.forEach((date) => {
    // 4. 점수 변동폭 (유명인은 더 치열하게 등락)
    let change;
    if (isFamous) {
      // 프레데터급 등락폭: -150 ~ +300
      change = Math.floor(Math.random() * 450) - 150; 
    } else {
      // 일반인 등락폭: -50 ~ +100
      change = Math.floor(Math.random() * 150) - 50;
    }
    
    currentScore += change;
    if (currentScore < 0) currentScore = 0;

    // 5. 랭크 아이콘 매핑
    let rankName = 'Rookie 4';
    let rankIcon = 'rookie4';

    if (currentScore >= 15000) { rankName = 'Master'; rankIcon = 'master'; }
    else if (currentScore >= 11400) { rankName = 'Diamond 4'; rankIcon = 'diamond4'; }
    else if (currentScore >= 8200) { rankName = 'Platinum 4'; rankIcon = 'platinum4'; }
    else if (currentScore >= 5400) { rankName = 'Gold 4'; rankIcon = 'gold4'; }
    else if (currentScore >= 3000) { rankName = 'Silver 4'; rankIcon = 'silver4'; }
    else if (currentScore >= 1000) { rankName = 'Bronze 4'; rankIcon = 'bronze4'; }
    
    // 만약 점수가 매우 높으면(상위권) 'Predator' (아이콘은 마스터와 동일하거나 별도 처리)
    if (isFamous && currentScore > 25000) {
        rankName = `Predator #${leaderboardIndex + 1}`;
        rankIcon = 'predator'; // apex tracker cdn에 predator 아이콘이 있다면 사용
    }

    // 날짜 포맷: YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    data.push({
      date: dateStr,
      rankName: rankName,
      rankScore: currentScore,
      change: change,
      icon: `https://trackercdn.com/cdn/apex.tracker.gg/ranks/${rankIcon}.png`
    });
  });

  return data.reverse();
};

module.exports = { killLeaderboard, matchHistory, getRatingHistory };