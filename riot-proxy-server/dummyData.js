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

// 2. 경기 내역 (풍부한 데이터)
const matchHistory = [
  // [시나리오 1] 랭크 포식자
  {
    "방금 전": [
       { legend: '호라이즌', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Horizon.png', gameType: '랭크', map: '올림푸스', gameDuration: 1150, kills: 14, damage: 3800, assists: 5, knockdowns: 12, rp: 250, wins: 1 },
       { legend: '레이스', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Wraith.png', gameType: '랭크', map: '올림푸스', gameDuration: 1200, kills: 8, damage: 2100, assists: 7, knockdowns: 5, rp: 180, wins: 1 },
       { legend: '패스파인더', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Pathfinder.png', gameType: '랭크', map: '올림푸스', gameDuration: 1020, kills: 6, damage: 1800, assists: 4, knockdowns: 5, rp: 85, wins: 0 }
    ],
    "2시간 전": [
       { legend: '호라이즌', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Horizon.png', gameType: '랭크', map: '스톰 포인트', gameDuration: 950, kills: 9, damage: 2400, assists: 2, knockdowns: 8, rp: 120, wins: 0 },
       { legend: '방갈로르', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Bangalore.png', gameType: '랭크', map: '스톰 포인트', gameDuration: 800, kills: 4, damage: 1200, assists: 1, knockdowns: 3, rp: 45, wins: 0 },
       { legend: '레이스', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Wraith.png', gameType: '랭크', map: '스톰 포인트', gameDuration: 1250, kills: 11, damage: 3100, assists: 7, knockdowns: 10, rp: 210, wins: 1 },
       { legend: '호라이즌', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Horizon.png', gameType: '랭크', map: '스톰 포인트', gameDuration: 1300, kills: 13, damage: 3300, assists: 4, knockdowns: 11, rp: 230, wins: 1 }
    ],
    "어제": [
       { legend: '블러드하운드', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Bloodhound.png', gameType: '랭크', map: '세상의 끝', gameDuration: 1300, kills: 5, damage: 1600, assists: 8, knockdowns: 4, rp: 150, wins: 1 },
       { legend: '패스파인더', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Pathfinder.png', gameType: '랭크', map: '세상의 끝', gameDuration: 1100, kills: 7, damage: 1900, assists: 3, knockdowns: 6, rp: 175, wins: 1 },
       { legend: '호라이즌', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Horizon.png', gameType: '랭크', map: '세상의 끝', gameDuration: 900, kills: 2, damage: 800, assists: 1, knockdowns: 2, rp: -15, wins: 0 },
       { legend: '호라이즌', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Horizon.png', gameType: '랭크', map: '세상의 끝', gameDuration: 1400, kills: 16, damage: 4200, assists: 2, knockdowns: 14, rp: 350, wins: 1 }
    ],
    "2일 전": [
       { legend: '레이스', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Wraith.png', gameType: '랭크', map: '브로큰 문', gameDuration: 1250, kills: 10, damage: 2800, assists: 5, knockdowns: 8, rp: 190, wins: 1 },
       { legend: '레이스', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Wraith.png', gameType: '랭크', map: '브로큰 문', gameDuration: 1200, kills: 8, damage: 2500, assists: 3, knockdowns: 7, rp: 160, wins: 1 }
    ]
  },
  
  // [시나리오 2] 즐겜 유저
  {
    "오늘": [
       { legend: '미라지', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Mirage.png', gameType: '배틀 로얄', map: '킹스 캐니언', gameDuration: 120, kills: 0, damage: 50, assists: 0, knockdowns: 0, rp: 0, wins: 0 },
       { legend: '코스틱', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Caustic.png', gameType: '배틀 로얄', map: '킹스 캐니언', gameDuration: 300, kills: 1, damage: 250, assists: 1, knockdowns: 1, rp: 0, wins: 0 },
       { legend: '옥테인', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Octane.png', gameType: '팀 데스매치', map: '해비타트', gameDuration: 600, kills: 12, damage: 2100, assists: 5, knockdowns: 0, rp: 0, wins: 1 },
       { legend: '퓨즈', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Fuse.png', gameType: '배틀 로얄', map: '킹스 캐니언', gameDuration: 1100, kills: 6, damage: 1800, assists: 3, knockdowns: 5, rp: 0, wins: 1 },
       { legend: '미라지', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Mirage.png', gameType: '배틀 로얄', map: '킹스 캐니언', gameDuration: 500, kills: 2, damage: 400, assists: 1, knockdowns: 2, rp: 0, wins: 0 }
    ],
    "어제": [
       { legend: '왓슨', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Wattson.png', gameType: '컨트롤', map: '생산 야드', gameDuration: 900, kills: 5, damage: 1200, assists: 2, knockdowns: 0, rp: 0, wins: 0 },
       { legend: '크립토', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Crypto.png', gameType: '배틀 로얄', map: '브로큰 문', gameDuration: 950, kills: 0, damage: 120, assists: 4, knockdowns: 0, rp: 0, wins: 0 },
       { legend: '패스파인더', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Pathfinder.png', gameType: '건 런', map: '스컬 타운', gameDuration: 450, kills: 8, damage: 1500, assists: 2, knockdowns: 0, rp: 0, wins: 1 },
       { legend: '매드 매기', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Mad%20Maggie.png', gameType: '배틀 로얄', map: '브로큰 문', gameDuration: 200, kills: 0, damage: 0, assists: 0, knockdowns: 0, rp: 0, wins: 0 }
    ],
    "3일 전": [
       { legend: '발리스틱', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Ballistic.png', gameType: '배틀 로얄', map: '올림푸스', gameDuration: 1300, kills: 4, damage: 1400, assists: 6, knockdowns: 3, rp: 0, wins: 1 },
       { legend: '애쉬', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Ash.png', gameType: '배틀 로얄', map: '올림푸스', gameDuration: 800, kills: 2, damage: 600, assists: 1, knockdowns: 2, rp: 0, wins: 0 }
    ]
  },

  // [시나리오 3] 서포터형 플레이어
  {
    "4시간 전": [
      { legend: '뉴캐슬', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Newcastle.png', gameType: '랭크', map: '올림푸스', gameDuration: 1100, kills: 1, damage: 800, assists: 12, knockdowns: 1, rp: 135, wins: 1 },
      { legend: '라이프라인', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Lifeline.png', gameType: '랭크', map: '올림푸스', gameDuration: 1250, kills: 2, damage: 1100, assists: 8, knockdowns: 2, rp: 110, wins: 1 },
      { legend: '라이프라인', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Lifeline.png', gameType: '랭크', map: '올림푸스', gameDuration: 1000, kills: 0, damage: 500, assists: 5, knockdowns: 0, rp: 45, wins: 0 }
    ],
    "6시간 전": [
      { legend: '콘딧', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Conduit.png', gameType: '랭크', map: '올림푸스', gameDuration: 850, kills: 3, damage: 1200, assists: 6, knockdowns: 2, rp: 65, wins: 0 },
      { legend: '지브롤터', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Gibraltar.png', gameType: '랭크', map: '올림푸스', gameDuration: 700, kills: 0, damage: 400, assists: 3, knockdowns: 0, rp: -25, wins: 0 },
      { legend: '로바', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Loba.png', gameType: '랭크', map: '올림푸스', gameDuration: 1300, kills: 1, damage: 900, assists: 4, knockdowns: 1, rp: 80, wins: 0 }
    ],
    "어제": [
      { legend: '로바', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Loba.png', gameType: '배틀 로얄', map: '세상의 끝', gameDuration: 900, kills: 2, damage: 600, assists: 4, knockdowns: 1, rp: 0, wins: 0 },
      { legend: '미라지', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Mirage.png', gameType: '배틀 로얄', map: '세상의 끝', gameDuration: 1100, kills: 3, damage: 800, assists: 7, knockdowns: 2, rp: 0, wins: 1 },
      { legend: '뉴캐슬', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Newcastle.png', gameType: '배틀 로얄', map: '세상의 끝', gameDuration: 600, kills: 0, damage: 200, assists: 1, knockdowns: 0, rp: 0, wins: 0 }
    ],
    "3일 전": [
        { legend: '라이프라인', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Lifeline.png', gameType: '랭크', map: '스톰 포인트', gameDuration: 1400, kills: 1, damage: 700, assists: 10, knockdowns: 1, rp: 150, wins: 1 }
    ]
  },

  // [시나리오 4] 연패의 늪
  {
    "방금 전": [
      { legend: '레이스', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Wraith.png', gameType: '랭크', map: '올림푸스', gameDuration: 120, kills: 0, damage: 50, assists: 0, knockdowns: 0, rp: -50, wins: 0 },
      { legend: '레이스', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Wraith.png', gameType: '랭크', map: '올림푸스', gameDuration: 90, kills: 0, damage: 0, assists: 0, knockdowns: 0, rp: -50, wins: 0 },
      { legend: '패스파인더', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Pathfinder.png', gameType: '랭크', map: '올림푸스', gameDuration: 300, kills: 1, damage: 150, assists: 0, knockdowns: 1, rp: -35, wins: 0 },
      { legend: '옥테인', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Octane.png', gameType: '랭크', map: '올림푸스', gameDuration: 200, kills: 0, damage: 80, assists: 0, knockdowns: 0, rp: -40, wins: 0 }
    ],
    "1시간 전": [
      { legend: '옥테인', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Octane.png', gameType: '배틀 로얄', map: '킹스 캐니언', gameDuration: 600, kills: 2, damage: 400, assists: 0, knockdowns: 2, rp: 0, wins: 0 },
      { legend: '레이스', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Wraith.png', gameType: '배틀 로얄', map: '킹스 캐니언', gameDuration: 150, kills: 0, damage: 0, assists: 0, knockdowns: 0, rp: 0, wins: 0 },
      { legend: '방갈로르', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Bangalore.png', gameType: '배틀 로얄', map: '킹스 캐니언', gameDuration: 400, kills: 1, damage: 200, assists: 0, knockdowns: 1, rp: 0, wins: 0 }
    ],
    "어제": [
        { legend: '호라이즌', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Horizon.png', gameType: '랭크', map: '세상의 끝', gameDuration: 800, kills: 3, damage: 900, assists: 1, knockdowns: 2, rp: 10, wins: 0 },
        { legend: '호라이즌', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Horizon.png', gameType: '랭크', map: '세상의 끝', gameDuration: 100, kills: 0, damage: 0, assists: 0, knockdowns: 0, rp: -60, wins: 0 }
    ]
  },

  // [시나리오 5] 저격수 & 존버
  {
    "오늘": [
      { legend: '밴티지', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Vantage.png', gameType: '배틀 로얄', map: '스톰 포인트', gameDuration: 1300, kills: 6, damage: 2500, assists: 2, knockdowns: 5, rp: 0, wins: 1 },
      { legend: '램파트', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Rampart.png', gameType: '랭크', map: '스톰 포인트', gameDuration: 1100, kills: 2, damage: 1800, assists: 5, knockdowns: 2, rp: 90, wins: 0 },
      { legend: '카탈리스트', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Catalyst.png', gameType: '랭크', map: '스톰 포인트', gameDuration: 1250, kills: 1, damage: 600, assists: 2, knockdowns: 1, rp: 65, wins: 0 }
    ],
    "어제": [
      { legend: '왓슨', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Wattson.png', gameType: '랭크', map: '스톰 포인트', gameDuration: 1400, kills: 1, damage: 500, assists: 1, knockdowns: 0, rp: 110, wins: 1 },
      { legend: '코스틱', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Caustic.png', gameType: '랭크', map: '스톰 포인트', gameDuration: 1350, kills: 0, damage: 200, assists: 3, knockdowns: 0, rp: 55, wins: 0 },
      { legend: '램파트', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Rampart.png', gameType: '랭크', map: '스톰 포인트', gameDuration: 1200, kills: 3, damage: 1500, assists: 2, knockdowns: 2, rp: 85, wins: 0 }
    ],
    "2일 전": [
        { legend: '밴티지', legendIcon: 'https://api.mozambiquehe.re/assets/icons/legend/Vantage.png', gameType: '배틀 로얄', map: '브로큰 문', gameDuration: 1100, kills: 4, damage: 1600, assists: 1, knockdowns: 3, rp: 0, wins: 0 }
    ]
  }
];

// 3. 랭크 변동 내역 (Rating History - 차트용 데이터)
const ratingHistory = [
  { date: '1년 전', rankName: 'Rookie 4', rankScore: 71, change: 70, icon: 'https://api.mozambiquehe.re/assets/icons/ranks/rookie4.png' },
  { date: '6월 28일', rankName: 'Bronze 4', rankScore: 1000, change: -999, icon: 'https://api.mozambiquehe.re/assets/icons/ranks/bronze4.png' },
  { date: '5월 15일', rankName: 'Bronze 2', rankScore: 2000, change: -1000, icon: 'https://api.mozambiquehe.re/assets/icons/ranks/bronze2.png' },
  { date: '4월 15일', rankName: 'Silver 4', rankScore: 3000, change: -3733, icon: 'https://api.mozambiquehe.re/assets/icons/ranks/silver4.png' },
  { date: '11월 11일', rankName: 'Silver 1', rankScore: 5733, change: 5732, icon: 'https://api.mozambiquehe.re/assets/icons/ranks/silver1.png' },
  { date: '11월 09일', rankName: 'Gold 4', rankScore: 7200, change: -9079, icon: 'https://api.mozambiquehe.re/assets/icons/ranks/gold4.png' },
  { date: '10월 09일', rankName: 'Platinum 4', rankScore: 9080, change: -157, icon: 'https://api.mozambiquehe.re/assets/icons/ranks/platinum4.png' },
  { date: '10월 09일', rankName: 'Platinum 3', rankScore: 9237, change: 511, icon: 'https://api.mozambiquehe.re/assets/icons/ranks/platinum3.png' },
  { date: '8월 18일', rankName: 'Diamond 4', rankScore: 11400, change: 2163, icon: 'https://api.mozambiquehe.re/assets/icons/ranks/diamond4.png' },
  { date: '현재', rankName: 'Master', rankScore: 15000, change: 3600, icon: 'https://api.mozambiquehe.re/assets/icons/ranks/master.png' },
];

module.exports = { killLeaderboard, matchHistory, ratingHistory };