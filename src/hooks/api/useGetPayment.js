import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useGetPayment() {
  const token = useToken();

  const {
    data: payment,
    loading: getPaymentLoading,
    error: getPaymentError,
    act: getPayment,
  } = useAsync((data) => paymentApi.getPayment(data, token));

  return {
    payment,
    getPaymentLoading,
    getPaymentError,
    getPayment,
  };
}
