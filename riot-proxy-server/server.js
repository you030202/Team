require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// 💡 1. 통합된 더미 데이터 파일 불러오기
const { killLeaderboard, matchHistory } = require('./dummyData');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));

const APEX_API_KEY = process.env.APEX_API_KEY;
const API_BASE_URL = 'https://api.mozambiquehe.re';

if (!APEX_API_KEY) {
  console.error('### 치명적 오류: APEX_API_KEY가 .env 파일에 없습니다.');
}

// ------------------------------------------------------------------
// 엔드포인트 1: 플레이어 "전적 검색" (실제 API 사용)
// ------------------------------------------------------------------
app.get('/api/summoner/:userTag', async (req, res) => {
  const playerName = req.params.userTag;
  console.log(`Fetching Apex data for: ${playerName}`);

  // 무한 로딩 방지를 위해 &history=1 제거 상태 유지
  const statsUrl = `${API_BASE_URL}/bridge.php?player=${encodeURIComponent(playerName)}&platform=PC&auth=${APEX_API_KEY}&action=get_data`;
  
  try {
    const apiResponse = await axios.get(statsUrl, { timeout: 10000 });

    if (apiResponse.data.Error || apiResponse.data.error) {
      return res.status(404).json({ message: apiResponse.data.Error || apiResponse.data.error });
    }
    res.json(apiResponse.data);

  } catch (error) {
    console.error('Apex API Error:', error.message);
    res.status(500).json({ message: '서버 내부 오류' });
  }
});

// ------------------------------------------------------------------
// 엔드포인트 2: "Predator 랭킹 컷" (실제 API 사용)
// ------------------------------------------------------------------
app.get('/api/leaderboard', async (req, res) => {
  const rankUrl = `${API_BASE_URL}/predator.php?auth=${APEX_API_KEY}`;

  try {
    const apiResponse = await axios.get(rankUrl, { timeout: 10000 }); 
    if (apiResponse.data && apiResponse.data.RP && apiResponse.data.RP.PC) {
      res.json(apiResponse.data.RP.PC);
    } else {
      throw new Error('API 응답 오류');
    }
  } catch (error) {
    console.error('Apex Rank Error:', error.message);
    res.status(500).json({ message: '서버 내부 오류' });
  }
});

// ------------------------------------------------------------------
// 💡 엔드포인트 3: "킬 리더보드" (더미 데이터 사용)
// ------------------------------------------------------------------
app.get('/api/kill-leaderboard', (req, res) => {
  console.log('Fetching Dummy Kill Leaderboard...');
  // dummyData.js에서 가져온 killLeaderboard 반환
  res.json(killLeaderboard);
});

// ------------------------------------------------------------------
// 💡 엔드포인트 4: "경기 내역" (더미 데이터 랜덤 사용)
// ------------------------------------------------------------------
app.get('/api/matches/:userTag', (req, res) => {
  console.log(`Fetching Dummy Match History for: ${req.params.userTag}`);
  
  // dummyData.js에서 가져온 matchHistory 중 하나를 랜덤 선택
  const randomIndex = Math.floor(Math.random() * matchHistory.length);
  res.json(matchHistory[randomIndex]);
});

// 5. 랭크 변동 내역 (더미)
app.get('/api/history/:userTag', (req, res) => {
  console.log(`Fetching Dummy Rating History for: ${req.params.userTag}`);
  res.json(ratingHistory);
});

// 서버를 5000번 포트에서 실행합니다.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Apex 프록시 서버가 ${PORT}번 포트에서 잘 작동되고 있습니다.`);
});