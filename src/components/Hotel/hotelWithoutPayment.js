import styled from 'styled-components';

export default function HotelWithoutPayment({ errorStatus }) {
  return (
    <Hotel>
      <HotelTitle>Escolha de hotel e quarto</HotelTitle>
      <HotelContent>
        {errorStatus === 409 ?
          <HotelMessage2>
            Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades
          </HotelMessage2> :
          <HotelMessage>
            Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
          </HotelMessage>
        }
      </HotelContent>
    </Hotel>
  );
}

const Hotel = styled.div`
  height: 100%;
  font-family: 'Roboto', sans-serif;
`;

const HotelTitle = styled.h1`
  font-size: 34px;
  font-weight: 400;
  /* margin-bottom: 20px; */
`;

const HotelContent = styled.div`
  display: flex;
  margin-top: 250px;
  /* align-items: center; */
  justify-content: center;
  height: 100%;
`;

const HotelMessage = styled.p`
  max-width: 411px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: #8E8E8E;
`;

const HotelMessage2 = styled.p`
  max-width: 465px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: #8E8E8E;
`;
