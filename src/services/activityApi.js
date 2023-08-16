import api from './api';
import dayjs from 'dayjs';

export async function getActivityDays(token) {
  const response = await api.get('/activity', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
export async function getActivitiesOfTheDay( dateFilter, token ) {  
  const response = await api.get(`/activity/${dateFilter}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
