import IsRemote from '../../../components/Activities/isRemote';
import NoPayment from '../../../components/Activities/noPayment';
import useGetTickets from '../../../hooks/api/useGetTickets';

export default function Activities() {
  const { tickets } = useGetTickets();
  console.log(tickets);
  const paidTickets = tickets?.status === 'PAID';
  const isRemote = tickets?.TicketType.isRemote === true;
  console.log(isRemote);
  return (!paidTickets ? <NoPayment /> : isRemote ? <IsRemote /> : 'pago');
}
