import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useGetTickets() {
  const token = useToken();

  const {
    data: tickets,
    loading: getTicketsLoading,
    error: getTicketError,
    act: getTickets,
  } = useAsync(() => ticketApi.getTicket(token));

  return {
    tickets,
    getTicketsLoading,
    getTicketError,
    getTickets,
  };
}
