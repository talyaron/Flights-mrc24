export const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      console.log('data', data);  
      return  data;
    } catch (error) {
      console.error("Error setting user:", error);
      throw error;
    }
  };