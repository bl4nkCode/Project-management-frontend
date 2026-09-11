# Task & Project Manager — Frontend

React frontend for a full-stack Task & Project Manager app, built with Vite, TailwindCSS, and Axios. Connects to a Laravel API backend for authentication and data.

Built as a practice project to strengthen React fundamentals and full-stack integration, paired with a Laravel + Sanctum backend.

## Features

- 🔐 Login & registration flows connected to a Laravel Sanctum API
- 📁 Create, update, delete, and complete projects & tasks
- 🔍 Search, filtering, and pagination for tasks
- 📅 Task status and deadline tracking
- 🎨 Styled with TailwindCSS

## Tech Stack

- **Framework:** React (Vite)
- **Styling:** TailwindCSS
- **HTTP client:** Axios
- **Backend:** [Laravel API](https://github.com/bl4nkCode/Project-management-backend) with Sanctum auth

## Getting Started

### Prerequisites
- Node.js & npm
- The [backend API](https://github.com/bl4nkCode/Project-management-backend) running locally (e.g. via Laragon)

### Setup

```bash
git clone https://github.com/bl4nkCode/Project-management-frontend.git
cd Project-management-frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173` by default and expects the Laravel API to be running (check your Axios base URL / `.env` config).

## Related Repo

Backend (Laravel + Sanctum): [Project-management-backend](https://github.com/bl4nkCode/Project-management-backend)

## Status

Practice project — actively developed locally.
