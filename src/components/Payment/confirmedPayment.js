import styled from 'styled-components';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export default function ConfirmPayment() {
  return (
    <Container>
      <BsFillCheckCircleFill size={44} color="#36B853" />
      <TextContainer>
        <span>Pagamento confirmado!</span>
        <p>Prossiga para escolha de hospedagem e atividades</p>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:2px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #454545;
  span {
    font-weight: 700;
    font-style: bold;
}
  p {
    font-weight: 400;
  }
`;
