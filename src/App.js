import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import GetApi from './api/GetApi';
import RankingPage from './RankingPage';
import './App.css'; // 방금 수정한 CSS 파일을 임포트합니다.

function App() {
  const [name, setName] = useState("");

  function onSetName(name) {
    setName(name);
  }

  return (
    <div className="app-container">
      {/* 1. 헤더 (전적검색) */}
      <header className="app-header">
        <div className="header-title">전적검색</div>
        {/* SearchBar 컴포넌트를 헤더에 배치합니다. */}
        <SearchBar onSearch={onSetName} />
      </header>

      {/* 2. 메인 본문 (3단 레이아웃) */}
      <main className="app-body">
        
        {/* 2-1. 왼쪽 사이드바 (랭킹) */}
        <aside className="app-sidebar-left">
          {/* RankingPage 컴포넌트를 왼쪽에 배치합니다. */}
          <RankingPage />
        </aside>

        {/* 2-2. 중앙 컨텐츠 (전적) */}
        <section className="app-main-content">
          <h2>전적</h2>
          {/* GetApi 컴포넌트를 중앙에 배치합니다. */}
          <GetApi userTag={name} />
        </section>

        {/* 2-3. 오른쪽 사이드바 */}
        <aside className="app-sidebar-right">
          <h2></h2>
          {/* 이 부분은 나중에 원하는 컴포넌트로 채울 수 있습니다. */}
          <p>개발 중.</p>
        </aside>

      </main>
    </div>
  );
}

export default App;