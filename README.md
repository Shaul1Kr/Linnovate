# URL Shortener Project

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
   - [Docker Setup](#docker-setup)
5. [Running the Application](#running-the-application)
6. [Running Tests](#running-tests)
7. [API Endpoints](#api-endpoints)
8. [Troubleshooting](#troubleshooting)
9. [Contributing](#contributing)

---

## Introduction

This project is a **URL Shortener** service. It allows users to generate short links for long URLs and track visits to those links. The application is built with **React**, **Node.js**, and **PostgreSQL**, using **Prisma ORM** for database management. It also includes analytics for tracking URL usage and interaction, along with a proxy configuration to manage API requests from the frontend.

## Features

- Shorten long URLs.
- Redirect from short URLs to original URLs.
- Analytics to track the number of clicks on shortened URLs.
- RESTful API endpoints for URL management.
- Dockerized for easy deployment.

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Material UI (MUI)
- **Backend**: Node.js, Express, Prisma, TypeScript
- **Database**: PostgreSQL
- **Testing**: Jest, Supertest
- **Containerization**: Docker, Docker Compose

## Setup and Installation

### Docker Setup

To run the application using Docker, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Shaul1Kr/Linnovate.git
   cd Linnovate
   ```

2. **Build and run the containers**:

   ```bash
   docker compose -f "Linnovate\docker-compose.yml" up -d --build
   ```

   This will start the PostgreSQL database, backend, and frontend services. The Docker setup will handle database migration and ensure the database is created before the application tries to connect to it.

3. **Access the application**:
   - Backend: `http://localhost:3000`
   - Frontend: `http://localhost:5173`

## Running the Application Locally (Optional)

If you need to run the backend or frontend locally without Docker (not recommended due to potential database issues):

### Backend

1. **Navigate to the server directory**:

   ```bash
   cd server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Ensure your database is running** and **the database is created**, then run the backend:
   ```bash
   npm run dev
   ```

### Frontend

1. **Navigate to the client directory**:

   ```bash
   cd ../client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the frontend**:
   ```bash
   npm run dev
   ```

## Running Tests

The project contains both unit and integration tests for the URL Shortener functionality.

1. **Run tests**:

   ```bash
   npm run test
   ```

This will run the Jest test suite, verifying both the backend's URL shortening functionality and the API's integration points.

## API Endpoints

### POST `/api/shorten`

- **Description**: Creates a shortened URL.
- **Request Body**:
  ```json
  {
    "originalUrl": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
    "shortUrl": "http://localhost:3000/abc123"
  }
  ```

### GET `/api/:shortUrl`

- **Description**: Redirects to the original URL based on the short URL.
- **Response**: HTTP redirect to the original URL.

### GET `/api/analytics/:shortUrl`

- **Description**: Retrieves analytics (clicks, usage data) for a shortened URL.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "longUrl": "https://example.com",
      "totalAccesses": 1,
      "lastAccessed": "2024-09-25T09:02:52.179Z"
    }
  ]
  ```

## Troubleshooting

- **Prisma connection issues**: If you're getting a `PrismaClientInitializationError`, make sure your database is running. The best approach is to use Docker, which will manage the database lifecycle for you.
- **Port conflicts**: If the app fails to start due to ports being taken, ensure that no other services are running on `3000` or `5173`.
