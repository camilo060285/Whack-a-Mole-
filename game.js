/**
 * Whack-a-Mole Game
 * A modular implementation with clear separation of concerns
 */

// Game Configuration Module
const GameConfig = {
    GAME_DURATION: 30000, // 30 seconds in milliseconds
    MIN_MOLE_TIME: 500,   // Minimum time mole stays up (ms)
    MAX_MOLE_TIME: 1500,  // Maximum time mole stays up (ms)
    MIN_SPAWN_DELAY: 400, // Minimum delay between spawns (ms)
    MAX_SPAWN_DELAY: 1000, // Maximum delay between spawns (ms)
    WHACKED_DISPLAY_TIME: 200 // Time to show whacked mole before hiding (ms)
};

// Game State Module
const GameState = {
    score: 0,
    timeLeft: GameConfig.GAME_DURATION / 1000,
    isPlaying: false,
    highScore: 0,
    activeTimeouts: [],
    
    init() {
        this.loadHighScore();
    },
    
    reset() {
        this.score = 0;
        this.timeLeft = GameConfig.GAME_DURATION / 1000;
        this.isPlaying = false;
        this.clearAllTimeouts();
    },
    
    incrementScore() {
        this.score++;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
        }
    },
    
    addTimeout(timeoutId) {
        this.activeTimeouts.push(timeoutId);
    },
    
    clearAllTimeouts() {
        this.activeTimeouts.forEach(id => clearTimeout(id));
        this.activeTimeouts = [];
    },
    
    saveHighScore() {
        localStorage.setItem('whackamole-highscore', this.highScore);
    },
    
    loadHighScore() {
        const saved = localStorage.getItem('whackamole-highscore');
        this.highScore = saved ? parseInt(saved) : 0;
    }
};

// UI Module
const UI = {
    elements: {
        score: document.getElementById('score'),
        time: document.getElementById('time'),
        highScore: document.getElementById('high-score'),
        startBtn: document.getElementById('start-btn'),
        resetBtn: document.getElementById('reset-btn'),
        gameOver: document.getElementById('game-over'),
        finalScore: document.getElementById('final-score'),
        playAgainBtn: document.getElementById('play-again-btn'),
        holes: document.querySelectorAll('.hole'),
        moles: document.querySelectorAll('.mole')
    },
    
    updateScore() {
        this.elements.score.textContent = GameState.score;
    },
    
    updateTime() {
        this.elements.time.textContent = GameState.timeLeft;
    },
    
    updateHighScore() {
        this.elements.highScore.textContent = GameState.highScore;
    },
    
    showGameOver() {
        this.elements.finalScore.textContent = GameState.score;
        this.elements.gameOver.classList.remove('hidden');
    },
    
    hideGameOver() {
        this.elements.gameOver.classList.add('hidden');
    },
    
    setStartButtonState(disabled) {
        this.elements.startBtn.disabled = disabled;
    },
    
    hideAllMoles() {
        this.elements.moles.forEach(mole => {
            mole.classList.remove('up', 'whacked');
        });
    }
};

// Mole Controller Module
const MoleController = {
    showMole(hole, mole) {
        if (!GameState.isPlaying) return;
        
        mole.classList.remove('whacked');
        mole.classList.add('up');
        
        const duration = this.getRandomTime(
            GameConfig.MIN_MOLE_TIME,
            GameConfig.MAX_MOLE_TIME
        );
        
        const timeoutId = setTimeout(() => {
            this.hideMole(mole);
            this.scheduleNextMole();
        }, duration);
        
        GameState.addTimeout(timeoutId);
    },
    
    hideMole(mole) {
        mole.classList.remove('up');
    },
    
    scheduleNextMole() {
        if (!GameState.isPlaying) return;
        
        const delay = this.getRandomTime(
            GameConfig.MIN_SPAWN_DELAY,
            GameConfig.MAX_SPAWN_DELAY
        );
        
        const timeoutId = setTimeout(() => {
            const randomHole = this.getRandomHole();
            const mole = randomHole.querySelector('.mole');
            
            // Only show if not already up
            if (!mole.classList.contains('up')) {
                this.showMole(randomHole, mole);
            } else {
                this.scheduleNextMole();
            }
        }, delay);
        
        GameState.addTimeout(timeoutId);
    },
    
    getRandomHole() {
        const holes = Array.from(UI.elements.holes);
        const index = Math.floor(Math.random() * holes.length);
        return holes[index];
    },
    
    getRandomTime(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

// Input Handler Module
const InputHandler = {
    init() {
        this.setupMoleClickHandlers();
        this.setupButtonHandlers();
    },
    
    setupMoleClickHandlers() {
        UI.elements.holes.forEach(hole => {
            hole.addEventListener('click', (e) => {
                this.handleMoleClick(hole);
            });
        });
    },
    
    setupButtonHandlers() {
        UI.elements.startBtn.addEventListener('click', () => {
            Game.start();
        });
        
        UI.elements.resetBtn.addEventListener('click', () => {
            Game.reset();
        });
        
        UI.elements.playAgainBtn.addEventListener('click', () => {
            UI.hideGameOver();
            Game.start();
        });
    },
    
    handleMoleClick(hole) {
        if (!GameState.isPlaying) return;
        
        const mole = hole.querySelector('.mole');
        
        if (mole.classList.contains('up') && !mole.classList.contains('whacked')) {
            mole.classList.add('whacked');
            GameState.incrementScore();
            UI.updateScore();
            
            // Hide mole after brief delay
            setTimeout(() => {
                mole.classList.remove('up', 'whacked');
            }, GameConfig.WHACKED_DISPLAY_TIME);
        }
    }
};

// Timer Module
const Timer = {
    intervalId: null,
    
    start() {
        this.intervalId = setInterval(() => {
            GameState.timeLeft--;
            UI.updateTime();
            
            if (GameState.timeLeft <= 0) {
                this.stop();
                Game.end();
            }
        }, 1000);
    },
    
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
};

// Main Game Controller
const Game = {
    init() {
        GameState.init();
        InputHandler.init();
        UI.updateHighScore();
    },
    
    start() {
        GameState.reset();
        GameState.isPlaying = true;
        UI.hideGameOver();
        UI.hideAllMoles();
        UI.updateScore();
        UI.updateTime();
        UI.setStartButtonState(true);
        
        Timer.start();
        MoleController.scheduleNextMole();
        // Schedule second concurrent sequence to increase difficulty with multiple active moles
        MoleController.scheduleNextMole();
    },
    
    end() {
        GameState.isPlaying = false;
        GameState.clearAllTimeouts();
        Timer.stop();
        UI.hideAllMoles();
        UI.setStartButtonState(false);
        UI.updateHighScore();
        UI.showGameOver();
    },
    
    reset() {
        GameState.isPlaying = false;
        GameState.clearAllTimeouts();
        Timer.stop();
        GameState.reset();
        UI.hideGameOver();
        UI.hideAllMoles();
        UI.updateScore();
        UI.updateTime();
        UI.setStartButtonState(false);
    }
};

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
