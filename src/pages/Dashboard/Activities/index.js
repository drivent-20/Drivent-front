import DaysAndActivities from '../../../components/Activities/daysAndActivities';
import IsRemote from '../../../components/Activities/isRemote';
import NoPayment from '../../../components/Activities/noPayment';
import useGetTickets from '../../../hooks/api/useGetTickets';

export default function Activities() {
  const { tickets } = useGetTickets();
  const paidTickets = tickets?.status === 'PAID';
  const isRemote = tickets?.TicketType.isRemote === true;
  return (!paidTickets ? <NoPayment /> : isRemote ? <IsRemote /> : <DaysAndActivities />);
}
