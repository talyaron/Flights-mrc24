//read cookieName from server
const cookieName = 'user-flight';

export const checkToken = () => {
      //check user token cookie if it is expired or not 
      const checkToken = document.cookie.split('; ').find(row => row.startsWith(cookieName));
      const tokenParts = checkToken ? checkToken.split('=') : document.cookie.split(cookieName+'=');
      if (checkToken) {
        const tokenParts = checkToken.split('=');
        const tokenValue = tokenParts[1];
        return true;
      }
      return false;
}

