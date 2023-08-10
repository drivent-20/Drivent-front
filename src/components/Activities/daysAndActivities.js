import styled from 'styled-components';
import DaysButtons from './daysButtons';
import useGetActivity from '../../hooks/api/useGetActivities';
import dayjs from 'dayjs';
import { generateAndFormatDates } from '../../hooks/formatDates';
import { useState } from 'react';
import { useEffect } from 'react';

export default function DaysAndActivities() {
  const [days, setDays] = useState();
  const { activity } = useGetActivity();

  useEffect(() => {
    if (activity) {
      const startDates = activity.map((act) => act.startsAt);
      const endDates = activity.map((act) => act.endsAt);
      const formattedEndDates = generateAndFormatDates(startDates, endDates);
      const uniqueDates = [...new Set(formattedEndDates.flat())];
      setDays(uniqueDates);
    }
  }, [activity]);
  return (
    <Activity>
      <ActivityTitle>Escolha de atividades</ActivityTitle>
      <ActivityContent>
        <ActivityMessage>Primeiro, filtre pelo dia do evento:</ActivityMessage>
        <ButtonContent>
          {days ? days.map((d) => (
            <DaysButtons day={d}/>
          )) : ''}
        </ButtonContent>
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

const ButtonContent = styled.div`
  display: flex;
  gap:15px;
`;
