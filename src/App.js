import React, { useState } from 'react';
import SearchBar from './components/SearchBar'; // 💡 검색창 다시 Import
import GetApi from './api/GetApi';
import RankingPage from './RankingPage';
import KillLeaderboard from './KillLeaderboard'; // 킬 리더보드 Import
import './App.css';

function App() {
  // 💡 검색어 상태 관리 로직 복구
  const [name, setName] = useState("");

  function onSetName(name) {
    setName(name);
  }

  return (
    <div className="app-container">
      {/* 1. 헤더 (전적검색) */}
      <header className="app-header">
        <div className="header-title">전적검색</div>
      </header>

      {/* 2. 메인 본문 (3단 레이아웃) */}
      <main className="app-body">
        
        {/* 2-1. 왼쪽 사이드바 (랭킹) */}
        <aside className="app-sidebar-left">
          <RankingPage />
        </aside>

        {/* 2-2. 중앙 컨텐츠 (검색창 + 전적) */}
        <section className="app-main-content">
          {/* 💡 검색창을 중앙 섹션 상단에 배치 */}
          <SearchBar onSearch={onSetName} />
          
          {/* 검색된 닉네임(name)을 GetApi에 전달 */}
          <GetApi userTag={name} />
        </section>

        {/* 2-3. 오른쪽 사이드바 (킬 리더보드) */}
        <aside className="app-sidebar-right">
          <KillLeaderboard />
        </aside>

      </main>
    </div>
  );
}

export default App;