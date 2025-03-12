import { UserModel } from "../../../model/userModel";

export const register = async (userData: UserModel) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.error);
      throw new Error(errorData.error);
    }

    return await response.json();
  } catch (error) {
    console.error("Error setting user:", error);
    throw error;
  }
};


