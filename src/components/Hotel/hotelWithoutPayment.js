import styled from 'styled-components';

export default function HotelWithoutPayment() {
  return (
    <Hotel>
      <HotelTitle>Escolha de hotel e quarto</HotelTitle>
      <HotelContent>
        <HotelMessage>Você precisa ter confirmado pagamento antes
            de fazer a escolha de hospedagem</HotelMessage>
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
  margin-bottom: 20px;
`;

const HotelContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const HotelMessage = styled.text`
  max-width: 388px;
  text-align: center;
  font-size: 20px;
  line-height: 23.44px;
  font-weight: 400;
  color: #8E8E8E;
`;
