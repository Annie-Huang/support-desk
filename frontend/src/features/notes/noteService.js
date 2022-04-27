import axios from 'axios';

const API_URL = '/api/tickets';

// Get user tickets
const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // C:\react\support-desk\frontend\node_modules\axios\index.d.ts
  const response = await axios.get(API_URL, config);

  return response.data;
};

const noteService = { getNotes };

export default noteService;
