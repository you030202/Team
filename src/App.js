import React from 'react';
import GetApi from './api/GetApi'; 
import RankingPage from './RankingPage';
import KillLeaderboard from './KillLeaderboard';
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      {/* 헤더 */}
      <header className="app-header">
        <div className="header-title">전적검색</div>
      </header>

      {/* 메인 컨텐츠 (3단 레이아웃) */}
      <main className="app-body">
        
        {/* 왼쪽: 랭킹 */}
        <aside className="app-sidebar-left">
          <RankingPage />
        </aside>

        {/* 중앙: 검색 및 전적 (GetApi가 모두 담당) */}
        <section className="app-main-content">
          <GetApi />
        </section>

        {/* 오른쪽: 킬 리더보드 */}
        <aside className="app-sidebar-right">
          <KillLeaderboard />
        </aside>

      </main>
    </div>
  );
}

export default App;