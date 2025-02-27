export const decodeJWT = (token) => {
    try {
      if (!token) {
        console.error("No token provided");
        return null;
      }
  
      const base64Url = token.split(".")[1]; // Extract the payload part
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
  