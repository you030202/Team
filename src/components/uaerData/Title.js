import './style/title.css'
function Title() {
     return (
    <div class="profile-card">
        <div class="icon-section">
            
        </div>

        <div class="info-section">
            <h2 class="player-name">PLAYERNAME</h2>

            <p class="player-title">Player Title</p>

            <div class="endorsement-icon"></div>
            
            <div class="platform-buttons">
                <button class="platform-btn active">
                    <i class="fas fa-desktop"></i> PC
                </button>
                <button class="platform-btn">
                    <i class="fas fa-gamepad"></i> 콘솔
                </button>
            </div>
        </div>
    </div>
  );
        
}