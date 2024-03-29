import axios from 'axios';

const API_URL = '/api/tickets';

// Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

// Get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // C:\react\support-desk\frontend\node_modules\axios\index.d.ts
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // C:\react\support-desk\frontend\node_modules\axios\index.d.ts
  // Very annoying Brad didn't make this consistent on ticket vs tickets:
  // for frontend url, it got http://localhost:3000/ticket/6265f3b59614e3e80dd035b7
  // for backend api, it got  http://localhost:5000/api/tickets/6265f3b59614e3e80dd035b7
  const response = await axios.get(`${API_URL}/${ticketId}`, config);

  return response.data;
};

// Close ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/${ticketId}`,
    { status: 'closed' },
    config
  );

  return response.data;
};

const ticketService = { createTicket, getTickets, getTicket, closeTicket };

export default ticketService;
