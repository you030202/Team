require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));

const PUBG_API_KEY = process.env.PUBG_API_KEY;
const API_BASE_URL = 'https://api.pubg.com/shards/steam';


const API_HEADERS = {
  'Authorization': `Bearer ${PUBG_API_KEY}`,
  'Accept': 'application/vnd.api+json',
};

if (!PUBG_API_KEY) {
  console.error('### 치명적 오류: PUBG_API_KEY가 .env 파일에 없습니다.');
}

// ------------------------------------------------------------------
// 엔드포인트 1: 플레이어 "검색" (GetApi.js가 사용)
// 닉네임으로 -> ID 조회 -> ID로 스탯 조회 (2단계)
// ------------------------------------------------------------------
app.get('/api/summoner/:userTag', async (req, res) => {
  const playerName = req.params.userTag;
  console.log(`Fetching PUBG data for: ${playerName}`);

  try {
    // 1단계: 닉네임으로 플레이어 ID 조회
    const playerResponse = await axios.get(
      `${API_BASE_URL}/players?filter[playerNames]=${encodeURIComponent(playerName)}`,
      { headers: API_HEADERS }
    );

    if (!playerResponse.data.data || playerResponse.data.data.length === 0) {
      return res.status(404).json({ message: '플레이어를 찾을 수 없습니다.' });
    }

    const player = playerResponse.data.data[0];
    const accountId = player.id;

    // 2단계: 플레이어 ID로 "평생(lifetime)" 통계 조회
    const statsResponse = await axios.get(
      `${API_BASE_URL}/players/${accountId}/seasons/lifetime`,
      { headers: API_HEADERS }
    );

    // 3단계: 플레이어 기본 정보 + 통계 정보를 합쳐서 React 앱에 전송
    const combinedData = {
      id: player.id,
      name: player.attributes.name,
      stats: statsResponse.data.data.attributes.gameModeStats['squad-fpp'] // 스쿼드-FPP 통계 예시
    };

    res.json(combinedData);

  } catch (error) {
    console.error('PUBG API 요청 중 에러 발생:', error.message);
    if (error.response) {
      console.error('PUBG API 응답 상태:', error.response.status);
      console.error('PUBG API 응답 데이터:', error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: '서버 내부 오류' });
    }
  }
});

// ------------------------------------------------------------------
// 엔드포인트 2: "랭킹" 리더보드 (RankingPage.js가 사용)
// ------------------------------------------------------------------
app.get('/api/leaderboard', async (req, res) => {
  console.log('Fetching PUBG Leaderboard data...');
  try {
    // 스쿼드 FPP 리더보드 상위 100명
    const leaderboardResponse = await axios.get(
      `${API_BASE_URL}/leaderboards/squad-fpp?page[number]=0`,
      { headers: API_HEADERS }
    );

    const players = leaderboardResponse.data.included.filter(item => item.type === 'player');
    
    const combinedRankings = leaderboardResponse.data.data.attributes.rankedPlayers.map(rank => {
      const playerData = players.find(p => p.id === rank.id);
      return {
        id: rank.id,
        rank: rank.attributes.rank,
        name: playerData.attributes.name,
        kda: rank.attributes.kda,
        damage: rank.attributes.damage,
        wins: rank.attributes.wins
      };
    });

    res.json(combinedRankings);

  } catch (error) {
    console.error('PUBG 리더보드 요청 중 에러 발생:', error.message);
    if (error.response) {
      console.error('PUBG API 응답 상태:', error.response.status);
      console.error('PUBG API 응답 데이터:', error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: '서버 내부 오류' });
    }
  }
});


// 서버를 5000번 포트에서 실행합니다.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ PUBG 프록시 서버가 ${PORT}번 포트에서 잘 작동되고 있습니다.`);
});