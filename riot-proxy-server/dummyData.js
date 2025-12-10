// riot-proxy-server/dummyData.js

// 1. 킬 리더보드
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

// 3. 랭크 변동 내역
const getRatingHistory = (playerName) => {
  const data = [];
  const leaderboardIndex = killLeaderboard.findIndex(
    (p) => p.Name.toLowerCase() === (playerName || '').toLowerCase()
  );
  const isFamous = leaderboardIndex !== -1;

  let currentScore;
  if (isFamous) {
    const baseScore = 70000 - (leaderboardIndex * 2000);
    currentScore = baseScore + Math.floor(Math.random() * 4000) - 2000;
  } else {
    currentScore = Math.floor(Math.random() * 3000) + 2000;
  }

  const startDate = new Date('2025-11-20T00:00:00');
  const endDate = new Date('2025-12-02T23:59:59');
  const startTs = startDate.getTime();
  const endTs = endDate.getTime();

  const numberOfPoints = 30;
  const randomDates = [];

  for (let i = 0; i < numberOfPoints; i++) {
    const randomTs = Math.floor(Math.random() * (endTs - startTs + 1)) + startTs;
    randomDates.push(new Date(randomTs));
  }

  randomDates.sort((a, b) => a - b);

  randomDates.forEach((date) => {
    let change;
    if (isFamous) {
      change = Math.floor(Math.random() * 450) - 150; 
    } else {
      change = Math.floor(Math.random() * 150) - 50;
    }
    
    currentScore += change;
    if (currentScore < 0) currentScore = 0;

    let rankName = 'Rookie 4';
    let rankIcon = 'rookie4';

    if (currentScore >= 15000) { rankName = 'Master'; rankIcon = 'master'; }
    else if (currentScore >= 11400) { rankName = 'Diamond 4'; rankIcon = 'diamond4'; }
    else if (currentScore >= 8200) { rankName = 'Platinum 4'; rankIcon = 'platinum4'; }
    else if (currentScore >= 5400) { rankName = 'Gold 4'; rankIcon = 'gold4'; }
    else if (currentScore >= 3000) { rankName = 'Silver 4'; rankIcon = 'silver4'; }
    else if (currentScore >= 1000) { rankName = 'Bronze 4'; rankIcon = 'bronze4'; }
    
    if (isFamous && currentScore > 25000) {
        rankName = `Predator #${leaderboardIndex + 1}`;
        rankIcon = 'predator';
    }

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

// 💡 4. [NEW] AI 대체 분석을 위한 더미 데이터 생성 함수 (다양한 시나리오)
const getMockAnalysis = (rankScore = 0) => {
    // 랭크 점수에 따른 기본 능력치 보정 (고수일수록 차트가 꽉 참)
    const isHighRank = rankScore > 10000;
    const baseScore = isHighRank ? 75 : 50;
    const s = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // 🎯 [다양한 피드백 시나리오 10가지]
    const scenarios = [
      {
        weakness: "위치 선정 및 링 운영",
        solution: "피지컬은 좋지만 링 밖에서 싸우다 죽는 경우가 많습니다. 2라운드부터는 조사 비컨을 활용해 다음 링 위치를 확인하고, 미리 유리한 고지대나 건물을 선점하는 '자리 잡기' 플레이를 연습하세요."
      },
      {
        weakness: "순간적인 포커싱(Focusing)",
        solution: "팀원과 같은 적을 때리는 빈도가 낮습니다. 교전 시 '누구를 쏠지' 핑으로 찍고, 팀원이 사격 중인 적을 같이 공격하여 순식간에 눕히는 '1.5선 플레이'를 지향하면 3:3 승률이 크게 오릅니다."
      },
      {
        weakness: "투척 무기 활용 부족",
        solution: "총기 실력에 비해 투척물(수류탄, 아크스타) 활용이 아쉽습니다. 엄폐물 뒤의 적을 끌어내거나 진입로를 차단할 때 투척물을 적극적으로 사용하세요. 가방에 항상 투척 무기 1~2개는 챙기는 습관이 필요합니다."
      },
      {
        weakness: "파밍 속도 및 인벤토리 관리",
        solution: "파밍에 너무 많은 시간을 쏟고 있습니다. 초반 파밍은 1분 내로 끝내고 교전 소리가 나는 곳으로 합류하세요. 데스박스 파밍 시에는 아머 스왑을 최우선으로 하고, 필요한 부착물만 빠르게 챙기는 연습이 필요합니다."
      },
      {
        weakness: "근거리 힙파이어(비조준 사격)",
        solution: "근접 교전에서 조준(ADS)을 하느라 무빙이 느려져 피격을 많이 당합니다. 10m 이내 교전에서는 조준하지 않고 쏘는 '힙파이어'와 함께 좌우 무빙(레레 무빙)을 섞어주는 것이 생존율을 높이는 지름길입니다."
      },
      {
        weakness: "진입 타이밍과 각 벌리기",
        solution: "팀원과 너무 뭉쳐 있거나, 혼자 너무 깊게 들어가는 경향이 있습니다. 팀원이 정면에서 어그로를 끌 때 측면으로 돌아 '각을 벌리는(Flanking)' 플레이를 시도해보세요. 교차 사격 구도가 만들어지면 쉽게 이길 수 있습니다."
      },
      {
        weakness: "궁극기 활용 소극적",
        solution: "궁극기를 너무 아끼는 경향이 있습니다. 교전이 시작되면 바로 궁극기를 사용하여 유리한 고지를 점하거나 변수를 만드세요. 특히 호라이즌, 방갈로르 같은 레전드는 선궁 필승입니다."
      },
      {
        weakness: "엄폐물 활용 (Peeking)",
        solution: "개활지에서 몸을 다 드러내고 쏘는 습관이 있습니다. 항상 벽이나 바위 등 엄폐물을 끼고 쏘는 '피킹' 플레이를 생활화하세요. 전체 체력의 40% 이상 피해를 입으면 즉시 엄폐 후 회복하는 판단이 필요합니다."
      },
      {
        weakness: "백업 및 커버 속도",
        solution: "팀원이 교전 중일 때 합류가 한 박자 늦습니다. 미니맵을 수시로 확인하고 팀원과의 거리를 50m 이내로 유지하세요. 팀원이 눕기 전에 도착해서 같이 쏴주는 것이 최고의 서포팅입니다."
      },
      {
        weakness: "멘탈 관리 및 연패 끊기",
        solution: "연패 시 공격성이 지나치게 높아져 무리한 진입을 반복하고 있습니다. 2연패 이상 했다면 잠시 사격 훈련장에서 손을 풀거나 일반 게임으로 템포를 조절하는 등 멘탈 리셋이 필요한 시점입니다."
      }
    ];

    // 랜덤으로 하나 뽑기
    const randomFeedback = scenarios[Math.floor(Math.random() * scenarios.length)];

    return {
        radarChart: [
            { subject: "에임", A: s(baseScore + 5, 95), fullMark: 100 },
            { subject: "생존", A: s(baseScore - 5, 90), fullMark: 100 },
            { subject: "적극성", A: s(baseScore, 95), fullMark: 100 },
            { subject: "팀워크", A: s(baseScore - 10, 85), fullMark: 100 },
            { subject: "일관성", A: s(baseScore - 5, 90), fullMark: 100 }
        ],
        weakness: randomFeedback.weakness,
        solution: randomFeedback.solution
    };
};

module.exports = { killLeaderboard, matchHistory, getRatingHistory, getMockAnalysis };