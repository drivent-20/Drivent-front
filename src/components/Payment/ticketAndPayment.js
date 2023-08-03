import styled from 'styled-components';
import { useState } from 'react';

import useGetTicketTypes from '../../hooks/api/useGetTicketTypes';
import useGetTickets from '../../hooks/api/useGetTickets';
import CardForm from './paymentCard';

export default function TicketAndPayment() {
  const { ticketTypes } = useGetTicketTypes();
  const [ticketChosen, setTicketChosen] = useState('none');
  const { tickets } = useGetTickets();

  function formatCurrency(number) {
    const formattedNumber = (number / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formattedNumber;
  }

  return (
    <Payment>
      <PaymentTitle>Ingresso e pagamento</PaymentTitle>
      {!tickets ? (
        <PaymentContent>
          <PaymentMessage>Primeiro, escolha a sua modalidade de ingresso</PaymentMessage>
          <TicketTypeContainer>
            <InPersonTicket ticketChosen={ticketChosen} onClick={() => setTicketChosen('presencial')}>
              <TicketTitle>Presencial</TicketTitle>
              <Price>
                {ticketTypes
                  ? formatCurrency(ticketTypes.find((t) => t.isRemote === false && t.includesHotel === false).price)
                  : 0}
              </Price>
            </InPersonTicket>
            <OnlineTicket ticketChosen={ticketChosen} onClick={() => setTicketChosen('online')}>
              <TicketTitle>Online</TicketTitle>
              <Price>{ticketTypes ? formatCurrency(ticketTypes.find((t) => t.isRemote === true).price) : 0}</Price>
            </OnlineTicket>
          </TicketTypeContainer>
        </PaymentContent>
      ) : (
        <CardForm tickets={tickets} />
      )}
    </Payment>
  );
}

const Payment = styled.div`
  height: 100%;
  font-family: 'Roboto', sans-serif;
`;

const PaymentTitle = styled.h1`
  font-size: 34px;
  font-weight: 400;
  margin-bottom: 20px;
`;

const PaymentContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
`;

const PaymentMessage = styled.p`
  margin-top: 10px;
  margin-bottom: 15px;
  max-width: 500px;
  text-align: center;
  font-size: 20px;
  line-height: 23.44px;
  font-weight: 400;
  color: #8e8e8e;
`;

const TicketTypeContainer = styled.div`
  display: flex;
  column-gap: 20px;
  font-weight: 400;
`;

const InPersonTicket = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  width: 145px;
  height: 145px;
  border-radius: 20px;
  background-color: #ffeed2;
  background-color: ${(props) => (props.ticketChosen === 'presencial' ? '#ffeed2' : 'white')};
  border: ${(props) => (props.ticketChosen === 'presencial' ? 'none' : '1px solid #cecece')};
  cursor: pointer;
`;

const OnlineTicket = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  width: 145px;
  height: 145px;
  border-radius: 20px;
  background-color: ${(props) => (props.ticketChosen === 'online' ? '#ffeed2' : 'white')};
  border: ${(props) => (props.ticketChosen === 'online' ? 'none' : '1px solid #cecece')};
  cursor: pointer;
`;

const TicketTitle = styled.p`
  font-size: 16px;
  color: #454545;
`;

const Price = styled.p`
  font-size: 14px;
  color: #898989;
`;
