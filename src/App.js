
import React, { useState } from 'react'; 
import SearchBar from './components/SearchBar';
import GetApi from './api/GetApi';
import RankingPage from './RankingPage';
import './App.css';

function App() {
  const [name, setName] = useState("");

  function onSetName(name) {
    setName(name);
  }



  return (
    <div className="App">
      <main>
        <SearchBar onSearch={onSetName} />
        <GetApi userTag={name} />
        <div className="content-area">
          <RankingPage userTag={name} />
        </div>
      </main>
    </div>
  );
}

export default App;