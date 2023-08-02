import useEnrollment from '../../../hooks/api/useEnrollment';

import NoEnrollment from '../../../components/Payment/noEnrollment';
import TicketAndPayment from '../../../components/Payment/ticketAndPayment';

export default function Payment() {
  const { enrollment } = useEnrollment();
  if (!enrollment) {
    return <NoEnrollment />;
  } else {
    return <TicketAndPayment />;
  }
}
