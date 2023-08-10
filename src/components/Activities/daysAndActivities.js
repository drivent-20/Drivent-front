import styled from 'styled-components';
import DaysButtons from './daysButtons';

export default function DaysAndActivities() {
  return (
    <Activity>
      <ActivityTitle>Escolha de atividades</ActivityTitle>
      <ActivityContent>
        <ActivityMessage>Primeiro, filtre pelo dia do evento:</ActivityMessage>
        <DaysButtons />
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
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;

const ActivityMessage = styled.p`
  margin-top: 30px;
  margin-bottom: 15px;
  max-width: 300px;
  text-align: center;
  font-size: 20px;
  line-height: 23.44px;
  font-weight: 400;
  color: #8e8e8e;
`;
