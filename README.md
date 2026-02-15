# Whack-a-Mole 🔨

A simple, modular Whack-a-Mole game built for speed and clarity.

## Features

- **Simple & Clean UI**: Intuitive interface with clear visual feedback
- **Modular Architecture**: Well-organized code with separation of concerns
- **Fast Performance**: Optimized for smooth gameplay
- **Score Tracking**: Real-time scoring with high score persistence
- **Responsive Design**: Works on desktop and mobile devices
- **30-Second Rounds**: Quick, engaging gameplay sessions

## How to Play

1. Open `index.html` in your web browser
2. Click the "Start Game" button
3. Moles will randomly appear from holes
4. Click on the moles before they disappear to score points
5. Try to get the highest score in 30 seconds!

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

Works in all modern browsers that support ES6+ JavaScript features.
