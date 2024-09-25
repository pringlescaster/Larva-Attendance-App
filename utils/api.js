// utils/api.js

export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    // Set default headers and include the token if available
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }
  
    return response.json();
  };
  