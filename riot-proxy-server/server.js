require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 💡 1. getMockAnalysis 함수 추가 임포트
const { killLeaderboard, matchHistory, getRatingHistory, getMockAnalysis } = require('./dummyData');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const APEX_API_KEY = process.env.APEX_API_KEY;
const API_BASE_URL = 'https://api.mozambiquehe.re';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 💡 [진단] 사용 가능한 모델 확인
async function checkAvailableModels() {
  if (!GEMINI_API_KEY) return;
  try {
    console.log("🔄 모델 목록 조회 중...");
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
    );
    const models = response.data.models.map(m => m.name.replace('models/', ''));
    console.log(`✅ 사용 가능 모델: ${models.length}개`);
  } catch (error) {
    console.error("❌ 모델 목록 조회 실패 (API 키 확인 필요)");
  }
}
checkAvailableModels();

let genAI = null;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
} else {
  console.warn("⚠️ 경고: GEMINI_API_KEY가 설정되지 않았습니다.");
}

// 💡 분석 결과 캐시 (메모리 저장)
const analysisCache = new Map();

// 1. 전적 검색
app.get('/api/summoner/:userTag', async (req, res) => {
  const playerName = req.params.userTag;
  console.log(`Fetching Apex data for: ${playerName}`);
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

// 2. 랭킹 컷
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

// 3. 킬 리더보드
app.get('/api/kill-leaderboard', (req, res) => {
  res.json(killLeaderboard);
});

// 4. 경기 내역
app.get('/api/matches/:userTag', (req, res) => {
  const randomIndex = Math.floor(Math.random() * matchHistory.length);
  res.json(matchHistory[randomIndex]);
});

// 5. 랭크 변동 내역
app.get('/api/history/:userTag', (req, res) => {
  const userTag = req.params.userTag;
  const randomHistory = getRatingHistory(userTag);
  res.json(randomHistory);
});

// 💡 6. Gemini AI 분석 (무중단 모드 + 더미 데이터 연동)
app.post('/api/ai-analysis', async (req, res) => {
  const { global, matchData } = req.body;
  const playerName = global?.name || "Unknown";
  const currentRP = global?.rank?.rankScore || 0;

  console.log(`🤖 Gemini 분석 요청: ${playerName}`);

  // 1️⃣ 캐시 확인
  if (analysisCache.has(playerName)) {
    const cachedEntry = analysisCache.get(playerName);
    if (Date.now() - cachedEntry.timestamp < 600000) { 
        console.log("✅ [Cache Hit] 저장된 결과를 반환합니다.");
        return res.json(cachedEntry.data);
    } else {
        analysisCache.delete(playerName);
    }
  }


  if (!genAI) {
    return res.json(getMockAnalysis(currentRP));
  }

  try {
    // 사용 가능한 모델 중 하나 (여기서는 lite)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `
      Analyze this Apex Legends player. Return ONLY JSON.
      Stats: Rank ${global?.rank?.rankName} (${global?.rank?.rankScore} RP), Level ${global?.level}.
      Matches: ${JSON.stringify(matchData || {}).substring(0, 500)}.
      
      Output JSON format:
      {
        "radarChart": [
          {"subject": "에임", "A": 80, "fullMark": 100},
          {"subject": "생존", "A": 70, "fullMark": 100},
          {"subject": "적극성", "A": 60, "fullMark": 100},
          {"subject": "팀워크", "A": 50, "fullMark": 100},
          {"subject": "일관성", "A": 90, "fullMark": 100}
        ],
        "weakness": "string (Korean)",
        "solution": "string (Korean)"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStr = text.replace(/```json|```/g, "").trim();
    const analysisResult = JSON.parse(jsonStr);

    analysisCache.set(playerName, { data: analysisResult, timestamp: Date.now() });
    console.log("✅ 분석 완료 (API 호출 성공)");
    res.json(analysisResult);

  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    
 
    console.log("⚠️ 에러 발생! ");
    const mockData = getMockAnalysis(currentRP);
    
    analysisCache.set(playerName, { data: mockData, timestamp: Date.now() });
    res.json(mockData);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Apex 프록시 서버가 ${PORT}번 포트에서 잘 작동되고 있습니다.`);
});