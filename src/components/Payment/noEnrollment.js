import styled from 'styled-components';

export default function NoEnrollment() {
  return (
    <Payment>
      <PaymentTitle>Ingresso e pagamento</PaymentTitle>
      <PaymentContent>
        <PaymentMessage>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</PaymentMessage>
      </PaymentContent>
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
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const PaymentMessage = styled.text`
  max-width: 388px;
  text-align: center;
  font-size: 20px;
  line-height: 23.44px;
  font-weight: 400;
  color: #8E8E8E;
`;
