import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    
    props.onSearch(searchTerm);
    console.log(`검색어: ${searchTerm}`);
  };

  return (
    <div className="search-widget">
      <form className="search-bar-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="PUBG 닉네임을 입력하세요..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          검색
        </button>
      </form>
    </div>
  );
}