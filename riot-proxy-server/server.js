require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));

// .env에서 키를 가져옵니다. (apexlegendsapi.com 키)
const APEX_API_KEY = process.env.APEX_API_KEY;
const API_BASE_URL = 'https://api.mozambiquehe.re';

if (!APEX_API_KEY) {
  console.error('### 치명적 오류: APEX_API_KEY가 .env 파일에 없습니다.');
}

/**
 * 헬퍼 함수: 에러 처리
 */
const handleError = (error, res, context) => {
  console.error(`Apex API ${context} 요청 중 에러 발생:`, error.message);
  if (error.response) {
    console.error('API 응답 상태:', error.response.status);
    console.error('API 응답 데이터:', error.response.data);
    const errorMsg = error.response.data?.Error || error.response.data?.error || 'API 오류';
    res.status(error.response.status).json({ message: errorMsg });
  } else if (error.code === 'ECONNABORTED') {
    res.status(504).json({ message: 'API 응답이 지연되었습니다.' });
  } else {
    res.status(500).json({ message: `서버 내부 오류 (${context})` });
  }
};

// ------------------------------------------------------------------
// 엔드포인트 1: 플레이어 "전적 검색" (실제 API 사용)
// ------------------------------------------------------------------
app.get('/api/summoner/:userTag', async (req, res) => {
  const playerName = req.params.userTag;
  console.log(`Fetching Apex data for: ${playerName}`);

  // 무한 로딩 방지를 위해 &history=1 제거
  const statsUrl = `${API_BASE_URL}/bridge.php?player=${encodeURIComponent(playerName)}&platform=PC&auth=${APEX_API_KEY}&action=get_data`;
  
  try {
    const apiResponse = await axios.get(statsUrl, { timeout: 10000 }); // 10초 타임아웃

    if (apiResponse.data.Error || apiResponse.data.error) {
      return res.status(404).json({ message: apiResponse.data.Error || apiResponse.data.error });
    }

    res.json(apiResponse.data);

  } catch (error) {
     handleError(error, res, '전적 검색');
  }
});

// ------------------------------------------------------------------
// 엔드포인트 2: "Predator 랭킹 컷" (실제 API 사용)
// ------------------------------------------------------------------
app.get('/api/leaderboard', async (req, res) => {
  console.log('Fetching Apex Predator Rank data...');
  
  const rankUrl = `${API_BASE_URL}/predator.php?auth=${APEX_API_KEY}`;

  try {
    const apiResponse = await axios.get(rankUrl, { timeout: 10000 }); 

    if (apiResponse.data && apiResponse.data.RP && apiResponse.data.RP.PC) {
      res.json(apiResponse.data.RP.PC);
    } else {
      throw new Error('API 응답에서 PC 랭크 데이터를 찾을 수 없습니다.');
    }

  } catch (error) {
    handleError(error, res, '랭킹 (Predator 컷)');
  }
});

// ------------------------------------------------------------------
// 💡 엔드포인트 3: "킬 리더보드" (내 개인용 더미 API)
// ------------------------------------------------------------------
// 실제 API 대신 내가 서버에 저장한 데이터를 반환해주는 "가짜 API"입니다.
app.get('/api/kill-leaderboard', (req, res) => {
  console.log('Fetching Custom Kill Leaderboard data...');

  // 💡 내가 저장한 데이터 (요청하신 닉네임 목록)
  const myLeaderboardData = [
    { Rank: 1, Name: 'Dead', Value: 411155 },
    { Rank: 2, Name: '凪茄', Value: 384461 },
    { Rank: 3, Name: 'hzppie', Value: 379053 },
    { Rank: 4, Name: 'xoKaiz YT', Value: 368816 },
    { Rank: 5, Name: 'komiys', Value: 358163 },
    { Rank: 6, Name: 'AkesOnKick', Value: 332598 },
    { Rank: 7, Name: 'Upthrow', Value: 330411 },
    { Rank: 8, Name: 'ForgetDatKick', Value: 320396 },
    { Rank: 9, Name: 'vBuried', Value: 296363 },
    { Rank: 10, Name: 'imVashy on twitch', Value: 295098 },
    { Rank: 11, Name: 'Frailtey', Value: 290495 },
    { Rank: 12, Name: 'Frosty the Swoleman', Value: 287006 },
    { Rank: 13, Name: 'fearzypoo', Value: 287000 },
    { Rank: 14, Name: 'Tollis', Value: 270720 },
    { Rank: 15, Name: 'iMarshTV', Value: 259208 },
    { Rank: 16, Name: 'RevengefulYT', Value: 258837 },
    { Rank: 17, Name: 'tttvTitanStar01', Value: 250000 },
    { Rank: 18, Name: 'Aces Kunai', Value: 245000 },
    { Rank: 19, Name: 'Splugzy', Value: 240000 },
    { Rank: 20, Name: 'L-HerzBrennt', Value: 235000 },
  ];

  // 프론트엔드에게 이 데이터를 JSON으로 응답합니다.
  res.json(myLeaderboardData);
});


// 서버를 5000번 포트에서 실행합니다.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Apex 프록시 서버(mozambiquehe.re + Local API)가 ${PORT}번 포트에서 잘 작동되고 있습니다.`);
});