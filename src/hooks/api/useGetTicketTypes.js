import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useGetTicketTypes() {
  const token = useToken();

  const {
    data: ticketTypes,
    loading: getTicketTypesLoading,
    error: getTicketTypesError,
    act: getTicketTypes,
  } = useAsync(() => ticketApi.getTicketTypes(token));

  return {
    ticketTypes,
    getTicketTypesLoading,
    getTicketTypesError,
    getTicketTypes,
  };
}
