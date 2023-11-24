// helper.jsx
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const fetchUserInfo = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await fetch(
      `${BASE_URL}/api/prescriptions/user/${userId}`
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

// This function gets called when a user selects a file to upload
async function handleFileUpload(event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${BASE_URL}/api/prescriptions/upload-file`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("File uploaded, URL:", result.fileUrl);
    return { fileUrl: result.fileUrl, fileKey: result.fileKey };
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
}

const deletePrescriptionFile = async (fileKey) => {
  try {
    const response = await fetch(`${BASE_URL}/api/prescriptions/delete-file`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileKey }),
    });

    if (!response.ok) {
      console.log("HTTP error! status: ", response.status);
      throw new Error(`HTTP error! status: ${response.status.message}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export { fetchUserInfo, handleFileUpload, deletePrescriptionFile };