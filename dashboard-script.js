// Dashboard Script
let userWallet = 1000;
let gameHistory = [];

// Load user data on page load
window.addEventListener('load', function() {
    loadUserData();
    updateWallet();
    loadHistory();
    loadProfile();
});

// Load user data from localStorage
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userRegistration'));
    if (userData) {
        userWallet = userData.points || 1000;
    }
}

// Update wallet display
function updateWallet() {
    document.getElementById('walletAmount').textContent = userWallet;
}

// Start game
function startGame(gameName) {
    const gameFile = `games/${gameName}.html`;
    const modal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');
    
    gameFrame.src = gameFile;
    modal.classList.add('show');
}

// Close game
function closeGame() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('show');
    updateWallet();
    loadHistory();
}

// Show tab
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Add game result to history
function addToHistory(gameName, result, points) {
    const historyItem = {
        game: gameName,
        result: result,
        points: points,
        timestamp: new Date().toLocaleTimeString()
    };
    
    gameHistory.unshift(historyItem);
    
    // Keep only last 50 records
    if (gameHistory.length > 50) {
        gameHistory.pop();
    }
    
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

// Load history
function loadHistory() {
    const saved = localStorage.getItem('gameHistory');
    gameHistory = saved ? JSON.parse(saved) : [];
    
    const historyList = document.getElementById('historyList');
    
    if (gameHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No game history yet</p>';
        return;
    }
    
    historyList.innerHTML = gameHistory.map((item, index) => `
        <div class="history-item">
            <div>
                <div class="history-game">${item.game}</div>
                <div class="history-result">${item.result}</div>
            </div>
            <div style="text-align: right;">
                <div class="history-points ${item.points > 0 ? 'history-win' : 'history-loss'}">
                    ${item.points > 0 ? '+' : ''}${item.points}
                </div>
                <div style="font-size: 11px; color: #999; margin-top: 3px;">${item.timestamp}</div>
            </div>
        </div>
    `).join('');
}

// Load profile
function loadProfile() {
    const userData = JSON.parse(localStorage.getItem('userRegistration'));
    
    if (userData) {
        document.getElementById('profilePhone').textContent = userData.phone || '+91-XXXXXXXXXX';
        document.getElementById('profileBalance').textContent = userWallet;
    }
    
    // Calculate stats
    let totalGames = gameHistory.length;
    let totalWins = gameHistory.filter(h => h.points > 0).length;
    let winRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    document.getElementById('profileGames').textContent = totalGames;
    document.getElementById('profileWins').textContent = totalWins;
    document.getElementById('profileWinRate').textContent = winRate + '%';
    document.getElementById('profileDate').textContent = new Date().toLocaleDateString();
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Update wallet from game
window.updateWalletFromGame = function(points) {
    userWallet += points;
    let userData = JSON.parse(localStorage.getItem('userRegistration'));
    userData.points = userWallet;
    localStorage.setItem('userRegistration', JSON.stringify(userData));
    updateWallet();
}