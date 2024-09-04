
export const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8081/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        

        localStorage.setItem('token', data.reqRes.token);
        return data; 
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  