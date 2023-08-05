import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePostPayment() {
  const token = useToken();

  const {
    data: payment,
    loading: postPaymentLoading,
    error: postPaymentError,
    act: postPayment,
  } = useAsync((data) => paymentApi.postPayment(data, token));

  return {
    payment,
    postPaymentLoading,
    postPaymentError,
    postPayment,
  };
}
