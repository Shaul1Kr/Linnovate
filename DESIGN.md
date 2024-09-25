# Design Document for URL Shortener Project

## 1. Introduction

This document outlines the architecture, design choices, and key components of the URL Shortener Project. The application allows users to shorten long URLs, redirect to the original URLs, and provides analytics on the usage of the shortened URLs.

## 2. Architecture Overview

The application follows a client-server architecture with the following components:

- **Frontend**: A React application that provides the user interface for URL shortening and analytics.
- **Backend**: A Node.js/Express application that handles API requests, processes URL shortening, and interacts with the database.
- **Database**: A PostgreSQL database managed via Prisma ORM for storing URLs and analytics data.
- **Containerization**: Docker is used to containerize the application, ensuring consistent environments across development and production.

### 2.1. Component Diagram

```
+------------------+          +---------------------+
|                  |          |                     |
|    Frontend      | <------> |        Backend      |
|  (React/Vite)    |          | (Node.js/Express)  |
|                  |          |                     |
+------------------+          +---------------------+
                                   |
                                   |
                                   v
                         +---------------------+
                         |                     |
                         |      Database       |
                         |   (PostgreSQL)      |
                         |                     |
                         +---------------------+
```

## 3. Technologies Used

- **Frontend**:

  - **React**: For building the user interface.
  - **TypeScript**: For type safety and better developer experience.
  - **Vite**: As the build tool for fast development and hot module replacement.
  - **Material UI (MUI)**: For styling and UI components.

- **Backend**:

  - **Node.js**: For building the server.
  - **Express**: As the web framework for handling HTTP requests.
  - **Prisma**: For database management and ORM.
  - **Jest**: For unit and integration testing.

- **Database**:

  - **PostgreSQL**: A relational database to store URLs and analytics.

- **Containerization**:
  - **Docker**: For containerizing the application components.

## 4. Data Flow

1. **User Interaction**: Users enter a long URL in the frontend and submit it for shortening.
2. **API Request**: The frontend sends a POST request to the backend API to create a shortened URL.
3. **URL Processing**:
   - The backend processes the request by encoding the original URL into a short URL format.
   - It saves the original URL and the short URL to the database using Prisma.
4. **Analytics**:
   - When a shortened URL is accessed, the backend retrieves the original URL from the database and increments the access count.
   - The backend can also provide analytics data on URL usage through specific API endpoints.
5. **Response**: The backend responds to the frontend with the shortened URL or analytics data.

## 5. Design Choices

### 5.1. URL Encoding/Decoding

- **Base62 Encoding**: The application uses a Base62 encoding algorithm to convert numerical IDs to short string representations. This allows for a compact and user-friendly URL format.

### 5.2. API Design

- **RESTful API**: The backend exposes a RESTful API that allows for easy interaction with the application. Endpoints are designed to handle CRUD operations for URLs and provide analytics.

### 5.3. Database Schema

- The database schema is designed to include the following key tables:
  - **URLs**: To store original URLs, shortened URLs, total accesses, and timestamps.
  - **Analytics**: To track usage statistics for each shortened URL.

### 5.4. Error Handling

- The application includes error handling at both the API and database levels to ensure that users receive appropriate feedback for invalid URLs or database connection issues.

## 6. Conclusion

This design document outlines the architecture and key decisions made during the development of the URL Shortener project. The design choices aim to provide a robust, user-friendly, and maintainable application. Future improvements may include additional features like user authentication, custom shortened URLs, and enhanced analytics.
