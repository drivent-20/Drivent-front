import api from './api';

export async function getTicketTypes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getTicket(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
export async function reserveTicket(ticketTypeId, token) {
  const obj = { ticketTypeId };
  const response = await api.post('/tickets', obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

