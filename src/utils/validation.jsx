// src/utils/validation.js

// Function to validate the registration form
export const validateRegister = (username, email, password, role) => {
    const errors = {};
  
    // Validate username
    if (!username || username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters long.";
    }
  
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
  
    // Validate password
    // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || password.length < 6) {
      errors.password =
        "Password must be at least 8 characters long, including an uppercase letter, a lowercase letter, a number, and a special character.";
    }
  
    // Validate role
    if (!role || (role !== "Livreur" && role !== "Client" && role !== "Manager")) {
      errors.role = "Please select a valid role .";
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
  