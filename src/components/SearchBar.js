import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    props.onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        // [수정] 플레이스홀더 텍스트 변경
        placeholder="Apex 레전드 닉네임(Origin ID)을 입력하세요..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}

export default SearchBar;