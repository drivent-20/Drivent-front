import styled from 'styled-components';
import 'react-credit-cards/es/styles-compiled.css';
import PaymentForm from './paymentForm';
import useGetPayment from '../../hooks/api/useGetPayment';
import { useEffect, useState } from 'react';
import ConfirmPayment from './confirmedPayment';

export default function CardForm({ tickets }) {
  const { getPayment } = useGetPayment();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async() => {
      try {
        const paymentData = await getPayment(tickets.id);
        setPayment(paymentData);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };

    fetchPaymentData();
  }, [getPayment, tickets.id]);

  return (
    <PaymentContent>
      <PaymentMessage>Ingresso escolhido</PaymentMessage>
      <TicketType>
        <p>{tickets.TicketType.name}</p>
        <span>
          {(tickets.TicketType.price / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
          })}
        </span>
      </TicketType>
      <PaymentMessage>Pagamento</PaymentMessage>
      {payment ? <ConfirmPayment /> : <PaymentForm tickets={tickets} getPayment={getPayment} setPayment={setPayment}/>}
    </PaymentContent>
  );
}

const PaymentContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;

const PaymentMessage = styled.text`
  font-size: 20px;
  line-height: 23.44px;
  font-weight: 400;
  color: #8e8e8e;
`;

const TicketType = styled.div`
  max-width: 290px;
  height: 108px;
  border-radius: 20px;
  background-color: #ffeed2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  p {
    color: #454545;
    font-size: 16px;
  }
  span {
    color: #898989;
    font-size: 14px;
  }
`;
