# Whack-a-Mole 🔨

A simple, modular Whack-a-Mole game built for speed and clarity.

## 🚀 Quick Start - Play Now!

### Option 1: Double-Click to Play (Easiest)
1. **Download or clone this repository**
2. **Navigate to the folder** containing the files
3. **Double-click `index.html`** - it will open in your default web browser
4. **Click "Start Game"** and start whacking moles!

### Option 2: Using a Local Web Server
```bash
# Navigate to the game directory
cd /path/to/Whack-a-Mole

# Start a simple web server (choose one):
python3 -m http.server 8080        # Python 3
python -m SimpleHTTPServer 8080    # Python 2
npx serve                           # Node.js

# Open http://localhost:8080 in your browser
```

### Option 3: GitHub Pages (Coming Soon)
If this repository has GitHub Pages enabled, you can play directly at:
`https://camilo060285.github.io/Whack-a-Mole-/`

> **Note**: The game runs entirely in your browser - no installation or build process required!

## Features

- **Simple & Clean UI**: Intuitive interface with clear visual feedback
- **Modular Architecture**: Well-organized code with separation of concerns
- **Fast Performance**: Optimized for smooth gameplay
- **Score Tracking**: Real-time scoring with high score persistence
- **Responsive Design**: Works on desktop and mobile devices
- **30-Second Rounds**: Quick, engaging gameplay sessions

## How to Play

### Game Rules
1. **Start the game** by clicking the "Start Game" button
2. **Watch for moles** - they will randomly pop up from the 9 holes
3. **Click on the moles** as quickly as possible before they disappear
4. **Score points** - each successful hit adds 1 point to your score
5. **Beat the clock** - you have 30 seconds to get the highest score possible!
6. **Track your progress** - your high score is automatically saved

### Controls
- **Start Game Button**: Begin a new 30-second round
- **Reset Button**: Clear the current game and reset the timer
- **Play Again Button**: Appears after game over to start a new round

### Tips for High Scores
- 🎯 React quickly - moles only stay up for 0.5-1.5 seconds
- 👀 Watch all holes - moles can appear anywhere
- 🖱️ Click accurately on the mole circles
- 🏆 Your high score persists across browser sessions

## Code Architecture

The game follows a modular design pattern with clear separation of concerns:

- **GameConfig**: Configuration constants for game parameters
- **GameState**: Manages game state (score, time, playing status)
- **UI**: Handles all DOM updates and visual elements
- **MoleController**: Controls mole appearance and timing logic
- **InputHandler**: Manages user interactions (clicks, buttons)
- **Timer**: Handles countdown timer functionality
- **Game**: Main controller that orchestrates all modules

## Technical Details

- Pure HTML, CSS, and vanilla JavaScript
- No external dependencies
- LocalStorage for high score persistence
- CSS animations for smooth mole movements
- Event-driven architecture for responsive gameplay

## Browser Compatibility

Works in all modern browsers that support ES6+ JavaScript features:
- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Safari
- ✅ Microsoft Edge
- ✅ Opera

## Troubleshooting

### Game doesn't load or shows errors
- Make sure all files (`index.html`, `styles.css`, `game.js`) are in the same directory
- Try opening in a different browser
- Check browser console (F12) for error messages

### Moles don't appear when clicking Start Game
- Refresh the page (F5 or Ctrl+R)
- Make sure JavaScript is enabled in your browser
- Clear browser cache and reload

### High score doesn't save
- Some browsers block LocalStorage when opening files directly (file://)
- Use Option 2 (local web server) instead, or enable LocalStorage in browser settings

### Need help?
Open an issue on GitHub with a description of your problem and browser version.

