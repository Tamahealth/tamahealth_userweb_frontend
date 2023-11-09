// helper.jsx
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchUserInfo = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await fetch(
      `http://localhost:3001/api/prescriptions/user/${userId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log("User data:", data);
    return data;
  } catch (error) {
    console.error("Could not fetch user data:", error);
    throw error;
  }
};

export { fetchUserInfo };
