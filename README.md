# MERN Authentication Backend

This is a backend authentication system built using the **MERN** stack (MongoDB, Express, React, Node.js). It provides essential user authentication functionalities, including user registration, login, password hashing, JWT authentication, email verification, and password reset.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [How to Use](#how-to-use)
- [Future Improvements](#future-improvements)
- [License](#license)

## Project Overview

This backend provides a secure authentication mechanism for any MERN stack application. It handles user registrations, authenticates users via JWT tokens, verifies user email via OTP, and allows users to reset their passwords. This system can be used as a starting point or as a complete authentication solution for your applications.

## Features

- **User Registration**: Allows users to register with their name, email, and password. Passwords are securely hashed using `bcryptjs`.
- **User Login**: Users can log in using their email and password. A JWT token is issued upon successful login for authentication in subsequent requests.
- **JWT Authentication**: Protects sensitive routes with JWT tokens that are validated using middleware.
- **Email Verification**: Sends a One-Time Password (OTP) to the user's email for verification upon registration.
- **Password Reset**: Provides a password reset feature where users can request a password reset and update their password securely.
- **Protected Routes**: Some routes are protected and require users to be authenticated with a valid JWT token.

## Tech Stack

- **Backend**:  
  - **Node.js** with **Express.js** for the RESTful API.
  - **MongoDB** for database management (stores user information, OTP, etc.).
  - **JWT (JSON Web Tokens)** for stateless authentication.
  - **bcryptjs** for password hashing and security.
  - **Nodemailer** for sending emails (OTP for verification and password reset).

- **Frontend (if included)**:  
  - **React.js** (if part of the repository, otherwise it can be a separate project).

- **Security**:  
  - Passwords are hashed using `bcryptjs` before storing them in the database.
  - JWT tokens are used to authenticate API requests.
  - Sensitive information such as the `.env` file is ignored by Git and kept out of version control.

## Installation

Follow these steps to set up the backend authentication system on your local machine:

### Prerequisites

- **Node.js** and **npm** (or **Yarn**) installed on your system.
- A **MongoDB** database. You can either use a local MongoDB server or a cloud-based database like **MongoDB Atlas**.
- An **email account** (e.g., Gmail, SendGrid) for sending verification and reset emails.

### Steps to Install

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/mern-auth-backend.git
   cd mern-auth-backend
