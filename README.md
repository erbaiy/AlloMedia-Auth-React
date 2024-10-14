# AlloMedia Frontend Authentication

![AlloMedia Logo](https://via.placeholder.com/150x150.png?text=AlloMedia)

## 📋 Overview

This repository contains the **Frontend Authentication** for the **AlloMedia** food delivery application. The frontend handles user registration, login, JWT token management, role-based access control, and protected routes. It interfaces with the backend API for user authentication and ensures a secure and smooth user experience across all user roles (Client, Delivery Person, and Restaurant Manager).

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Technologies](#-technologies)
3. [Getting Started](#-getting-started)
4. [Frontend Flow](#-frontend-flow)
5. [JWT Implementation](#-jwt-implementation)
6. [Testing](#-testing)
7. [Security Measures](#-security-measures)
8. [Error Handling](#-error-handling)

---

## 🚀 Features

- **User Registration**: New users can register by providing their name, email, password, and role (Client, Delivery Person).
- **Email Verification**: After registration, users must verify their email address.
- **Secure Login**: Users can log in securely using their email and password.
- **Two-Factor Authentication (2FA)**: Users verify their account by entering an OTP sent to their email.
- **JWT Authentication**: Upon successful login, a JWT token is received and stored for session management.
- **Protected Routes**: Certain pages are protected and can only be accessed by authenticated users with a valid JWT token.
- **Logout**: Users can log out, which clears the JWT token and redirects them to the login page.

---

## 💻 Technologies

- **React**: For building the user interface.
- **React Router**: For managing routes and navigation.
- **Axios**: For making API calls to the backend.
- **JWT**: JSON Web Tokens for authentication and authorization.
- **Context API**: For managing global state (e.g., authentication status).
- **localStorage**: For securely storing JWT tokens in the browser.
- **CSS/Tailwind/shadcn**: For styling the frontend.
- **React Hook Form**: For managing forms efficiently.
- **Toastify**: For displaying success/error notifications.

---

## 🏁 Getting Started

To get the frontend authentication system up and running on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/erbaiy/AlloMedia-Auth-React/tree/develop
```

### 2. Install Dependencies

```bash
cd AlloMedia-Auth-React
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_JWT_SECRET=your_jwt_secret
REACT_APP_FRONTEND_URL=http://localhost:5173
```

### 4. Start the Development Server

```bash
npm run dev
```

The frontend will now be running at `http://localhost:5173`.

---

## 🔄 Frontend Flow

1. **User Registration** (`/register`)
   - Users fill in their details and select a role.
   - Data is sent to the backend to create a new user.
   - A verification email is sent to the user.

2. **Email Verification**
   - User clicks on the verification link in their email.
   - Email is verified in the backend.

3. **User Login** (`/auth`)
   - Users enter their email and password.
   - Backend sends OTP to the user's email.

4. **OTP Verification** (`/auth/verify-otp`)
   - Users enter the OTP received via email.
   - On success, a JWT token is stored in localStorage.
   - Users are redirected to their role-specific dashboard.

5. **Protected Routes**
   - Certain routes require authentication.
   - JWT token is required in the Authorization header.

---

## 🔑 JWT Implementation

### Storing the Token

```javascript
localStorage.setItem('token', response.data.token);
```

### Sending JWT in API Requests

```javascript
axios.get('/api/dashboard', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
```

### Token Expiry
When the JWT expires it refresh and generate a new refresh token. If the refresh token is expired, the user is logged out and redirected to the login page.

---

## 🧪 Testing

- **Unit Tests**: Use Jest for testing React components, register forms

To run tests:

```bash
npm test
```

---

## 🛡️ Security Measures

- **Token Storage**: JWT tokens are stored securely in localStorage.
- **XSS Protection**: Inputs are sanitized and httpOnly cookies are used when storing tokens in cookies.
- **CSRF Protection**: SameSite cookie attributes are used to prevent Cross-Site Request Forgery (CSRF).
- **Input Validation**: User inputs are properly validated to prevent injection attacks.
- **Two-Factor Authentication**: OTP verification adds an extra layer of security.

---

## ❗ Error Handling

The application handles various errors and displays appropriate messages:

- Invalid Login Credentials (401): "Invalid email or password."
- JWT Expiry (401): "Session expired. Please log in again."
- Unauthorized Access (403): "You do not have permission to access this resource."
- General Errors (500): Generic error message.

Example of handling errors in API requests:

```javascript
axios.post('/api/auth/login', { email, password })
  .then(response => {
    // Handle success
  })
  .catch(error => {
    setError(error.response.data.message || 'An error occurred');
  });
```

---

## 📝 Conclusion

The Frontend Authentication for AlloMedia ensures secure access to the application based on user roles. By utilizing JWT, React, and Axios, the frontend integrates seamlessly with the backend API while maintaining high security with token management and protected routes. The inclusion of role-specific features for Clients, Delivery Persons, and Restaurant Managers makes this a comprehensive solution for the food delivery application.

---

## 👥 Authors

* **Youness ERBAI** - *Initial work* - [erbaiy](https://github.com/erbaiy)

---

## 🙏 Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration