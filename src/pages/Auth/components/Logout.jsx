// // src/components/Logout.jsx
// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../../context/Context";

// const Logout = () => {
//   const [, setAuthState] = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       // Call the logout endpoint
//       await axios.post(
//         "http://127.0.0.1:8000/api/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         }
//       );
//       // Remove the auth token
//       localStorage.removeItem("authToken");
//       // Update the auth state
//       setAuthState({ isAuthenticated: false });
//       // Navigate to login page
//       navigate("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//       // Handle the error appropriately
//     }
//   };

//   return <button onClick={handleLogout}>Logout</button>;
// };

// export default Logout;
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/Context";

const Logout = () => {
  const [, setAuthState] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      // Clear the local storage completely
      localStorage.clear();
      // Update the auth state
      setAuthState({ isAuthenticated: false });
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle the error appropriately
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
};

export default Logout;
