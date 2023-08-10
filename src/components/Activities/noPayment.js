import styled from 'styled-components';

export default function NoPayment() {
  return (
    <Activity>
      <ActivityTitle>Escolha de atividades</ActivityTitle>
      <ActivityContent>
        <ActivityMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</ActivityMessage>
      </ActivityContent>
    </Activity>
  );
}

const Activity = styled.div`
  height: 100%;
  font-family: 'Roboto', sans-serif;
`;

const ActivityTitle = styled.h1`
  font-size: 34px;
  font-weight: 400;
`;

const ActivityContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ActivityMessage = styled.p`
  max-width: 411px;
  text-align: center;
  font-size: 20px;
  line-height: 23.44px;
  font-weight: 400;
  color: #8E8E8E;
  margin-bottom:60px;
`;
