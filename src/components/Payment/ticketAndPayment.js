import styled from 'styled-components';
import { useState, useCallback } from 'react';
import useReserveTicket from '../../hooks/api/useReserveTicket';
import useGetTicketTypes from '../../hooks/api/useGetTicketTypes';
import useGetTickets from '../../hooks/api/useGetTickets';
import CardForm from './paymentCard';
import { toast } from 'react-toastify';
export default function TicketAndPayment() {
  const { ticketTypes } = useGetTicketTypes();
  const [ticketChosen, setTicketChosen] = useState('none');
  const { tickets } = useGetTickets();
  const [includesHotel, setIncludesHotel] = useState();  
  const [enableHotel, setEnableHotel] = useState(false);
  const [enableTheTotal, setEnableTheTotal] = useState(false);
  const { reserveTicketFunction, reserveTicketLoading } = useReserveTicket();

  const submit = useCallback(async() => {  
    let numeroId;
  
    if (ticketChosen === 'Presencial' && includesHotel === 'com Hotel') {
      numeroId = 1;
    } else if (ticketChosen === 'Presencial' && includesHotel === 'sem Hotel') {
      numeroId = 2;
    } else {
      numeroId = 3;
    }
    try {
      await reserveTicketFunction(numeroId);
      toast('Reserva de ticket feita!');
      console.log(ticketTypes);
      console.log(ticketChosen);
      console.log(includesHotel);
    } catch (error) {
      toast('Não foi possível realizar a reserva do ticket!');
      console.log(ticketTypes);
      console.log(ticketChosen);
      console.log(includesHotel);
    }
  });

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
            <InPersonTicket ticketChosen={ticketChosen} onClick={() => {
              setTicketChosen('Presencial');
              setEnableHotel(true);
            }}>
              <TicketTitle>Presencial</TicketTitle>
              <Price>{ticketTypes ? formatCurrency(ticketTypes.find((t) => t.isRemote === false && t.includesHotel === false).price) : 0}
              </Price>
            </InPersonTicket>
            <OnlineTicket ticketChosen={ticketChosen} onClick={() => {
              setTicketChosen('Online');
              setEnableTheTotal(true);
            }}>
              <TicketTitle>Online</TicketTitle>
              <Price>{ticketTypes ? formatCurrency(ticketTypes.find((t) => t.isRemote === true).price) : 0}</Price>
            </OnlineTicket>
          </TicketTypeContainer>
          {enableHotel ? (
            <>
              <PaymentMessage>Ótimo!Agora escolha sua modalidade de hospedagem</PaymentMessage>
              <TicketTypeContainer>
                <OnlineTicket2 includesHotel={includesHotel} onClick={() => {
                  setIncludesHotel('sem Hotel');
                  setEnableTheTotal(true);
                }}>
                  <TicketTitle>Sem Hotel</TicketTitle>
                  <Price>{ticketTypes ? '+ ' + formatCurrency(ticketTypes.find((t) => t.includesHotel === true).price - 25000) : 0}</Price>
                </OnlineTicket2>
                <InPersonTicket2 hotel includesHotel={includesHotel} onClick={() => {
                  setIncludesHotel('com Hotel');
                  setEnableTheTotal(true);
                }}>
                  <TicketTitle>Com Hotel</TicketTitle>
                  <Price>
                    {ticketTypes
                      ? '+ ' + formatCurrency(ticketTypes.find((t) => t.isRemote === false && t.includesHotel === true).price - 15000)
                      : 0}
                  </Price>
                </InPersonTicket2>
              </TicketTypeContainer>
            </>
          ) : ''}
          {enableTheTotal ? (
            <>
              <TotalMessage>
                Fechado! O total ficou em <strong>{formatCurrency(
                  ticketChosen === 'Online'
                    ? ticketTypes.find((t) => t.isRemote === true).price
                    : includesHotel === 'sem Hotel'
                      ? ticketTypes.find((t) => t.isRemote === false && t.includesHotel === false).price 
                      : ticketTypes.find((t) => t.isRemote === false && t.includesHotel === true).price 
                )}</strong>. Agora é só confirmar
              </TotalMessage>
              <Reserve type="submit" disabled={reserveTicketLoading} onClick={submit}>Reservar Ingresso</Reserve>
            </>
          ) : ''}
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
const TotalMessage = styled.p`
  margin-top: 10px;
  margin-bottom: 15px;
  max-width: 500px;
  text-align: star;
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
  background-color: ${(props) => (props.ticketChosen === 'Presencial' ? '#ffeed2' : 'white')};
  border: ${(props) => (props.ticketChosen === 'Presencial' ? 'none' : '1px solid #cecece')};
  cursor: pointer;
`;

const InPersonTicket2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  width: 145px;
  height: 145px;
  border-radius: 20px;
  background-color: #ffeed2;
  background-color: ${(props) => (props.includesHotel === 'com Hotel' ? '#ffeed2' : 'white')};
  border: ${(props) => (props.includesHotel === 'com Hotel' ? 'none' : '1px solid #cecece')};
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
  background-color: ${(props) => (props.ticketChosen === 'Online' ? '#ffeed2' : 'white')};
  border: ${(props) => (props.ticketChosen === 'Online' ? 'none' : '1px solid #cecece')};
  cursor: pointer;
`;

const OnlineTicket2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  width: 145px;
  height: 145px;
  border-radius: 20px;
  background-color: ${(props) => (props.includesHotel === 'sem Hotel' ? '#ffeed2' : 'white')};
  border: ${(props) => (props.includesHotel === 'sem Hotel' ? 'none' : '1px solid #cecece')};
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
const Reserve = styled.button`
max-width: 182px;
  height: 37px;
  border: 0;
  border-radius: 4px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  color: #000;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
