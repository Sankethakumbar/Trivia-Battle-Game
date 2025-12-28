# 🎮 Two-Player Trivia Battle Game

A browser-based **two-player trivia game** built using **HTML and JavaScript**, powered by **The Trivia API**.  
Players compete across multiple rounds, answering trivia questions of increasing difficulty to determine the final winner.

---

## 📌 Features

- 👥 Two-player setup with name validation
- 🔁 Multi-round gameplay
- 📚 Category-based trivia questions
- 🚫 Categories cannot repeat across rounds
- 🎯 Difficulty-based scoring:
  - Easy → 10 points  
  - Medium → 15 points  
  - Hard → 20 points
- 🔄 Turn-based question flow
- 🧮 Live score tracking
- 🏆 Final winner or draw declaration

---

## 🖥️ Game Flow

### Screen 1: Player Setup
- Enter Player 1 and Player 2 names
- Names must be non-empty and unique

---

### Screen 2: Category Selection
- Displays the current round number
- Players jointly select a trivia category
- Categories used in previous rounds are removed

---

### Screen 3: Question Gameplay
- 6 questions per round:
  1. Easy – Player 1  
  2. Easy – Player 2  
  3. Medium – Player 1  
  4. Medium – Player 2  
  5. Hard – Player 1  
  6. Hard – Player 2  
- Four shuffled multiple-choice options
- Instant feedback for correct and wrong answers
- Scores updated immediately

---

### Screen 4: Round Summary
- Options:
  - **Next Round** (disabled if no categories remain)
  - **End Game**

---

### Screen 5: Final Result
- Displays final scores of both players
- Declares winner or draw

---

## 🔗 Trivia API Integration

This project uses **The Trivia API (v2)** to fetch real-time trivia questions.

### API Details
- **API Name:** The Trivia API  
- **Version:** v2  
- **Documentation:** https://the-trivia-api.com/docs/v2/  

No API key is required for basic usage.

---

### 📡 How the API is Used

For each round, the game fetches:
- 2 Easy questions
- 2 Medium questions
- 2 Hard questions

Based on the selected category.

Example API request:
https://the-trivia-api.com/api/questions?categories=science&difficulty=easy&limit=2




