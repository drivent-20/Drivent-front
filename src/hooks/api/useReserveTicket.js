import * as ticketApi from '../../services/ticketApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useReserveTicket() {
  const token = useToken();

  const {
    data: reserveTicket,
    loading: reserveTicketLoading,
    error: reserveTicketError,
    act: reserveTicketFunction,
  } = useAsync((ticketTypeId) => ticketApi.reserveTicket(ticketTypeId, token), false);

  return { reserveTicket, reserveTicketLoading, reserveTicketError, reserveTicketFunction };
};
