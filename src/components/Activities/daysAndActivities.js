import styled from 'styled-components';
import DaysButtons from './daysButtons';
import useGetActivity from '../../hooks/api/useGetActivities';
import { Typography } from '@material-ui/core';
import { BsBoxArrowInRight, BsXCircle, BsCheckCircle } from 'react-icons/bs';
import dayjs from 'dayjs';
import { generateAndFormatDates } from '../../hooks/formatDates';
import { useState } from 'react';
import { useEffect } from 'react';
import useGetActivitiesDay from '../../hooks/api/useGetActivitiesDay';
import { toast } from 'react-toastify';
import React from 'react';

export default function DaysAndActivities() {
  const [days, setDays] = useState();
  const [enableActivities, setEnablesActivities] = useState(false);
  const [activitiesByDay, setActivitiesByDay] = useState({});
  const [shedule, setShedule] = useState(false);
  const { activity } = useGetActivity();
  const { getActivityDay } = useGetActivitiesDay();

  useEffect(() => {
    if (activity) {
      const startDates = activity.map((act) => act.startsAt);
      const endDates = activity.map((act) => act.endsAt);
      const formattedEndDates = generateAndFormatDates(startDates, endDates);
      const uniqueDates = [...new Set(formattedEndDates.flat())];
      setDays(uniqueDates);
    }
  }, [activity]);

  const handleButtonClick = async(isoDate) => {
    const dateFilter = isoDate.substring(0, 11);
    try {
      const result = await getActivityDay(dateFilter);
      // Agrupar as atividades por localId
      const activitiesByLocal = {};
      result.forEach(activity => {
        const { localId } = activity;
        if (!activitiesByLocal[localId]) {
          activitiesByLocal[localId] = [];
        }
        activitiesByLocal[localId].push(activity);
      });

      setActivitiesByDay(activitiesByLocal);
      setEnablesActivities(true);
    } catch (error) {
      toast('Não foi possível filtrar os dias de evento');
    }
  };

  // Função para mapear o localId para o nome do local
  const getLocalName = (localId) => {
    switch (localId) {
    case '1':
      return 'Auditório Principal';
    case '2':
      return 'Auditório Lateral';
    case '3':
      return 'Sala de Workshop';
    default:
      return 'Local Desconhecido';
    }
  };

  const handleIconClick = (localId, activityIndex) => {
    setActivitiesByDay(prevActivitiesByDay => {
      const updatedActivitiesByDay = { ...prevActivitiesByDay };
      updatedActivitiesByDay[localId][activityIndex].shedule = true;
      return updatedActivitiesByDay;
    });
  };
  return (
    <Activity>
      <ActivityTitle>Escolha de atividades</ActivityTitle>
      <ActivityContent>
        <ActivityMessage>Primeiro, filtre pelo dia do evento:</ActivityMessage>
        <ButtonContent>
          {days ? days.map((d) => (
            <DaysButtons key={d} day={d} selected={enableActivities} onButtonClick={handleButtonClick} />
          )) : ''}
        </ButtonContent>
      </ActivityContent>

      {enableActivities ? (
        <Teste>
          {Object.keys(activitiesByDay).map(localId => (
            <React.Fragment key={localId}>
              <Activities>
                <Local>{getLocalName(localId)}</Local>
                {activitiesByDay[localId].map((activity, activityIndex) => (
                  <Container key={activityIndex} subscribed={activity.shedule} duration={activity.duration} >
                    <Texts>
                      <ActivityName>{activity.name}</ActivityName>
                      <ActivitySchedule>
                        {dayjs(activity.startsAt).format('HH:mm')}-{dayjs(activity.endsAt).format('HH:mm')}
                      </ActivitySchedule>
                    </Texts>
                    <Line />
                    <ActivityStatus capacity={activity.capacity}>
                      <ActivityIcon onClick={() => handleIconClick(localId, activityIndex)}>
                        {activity.capacity > 0 ? (activity.shedule ? <BsCheckCircle /> : <BsBoxArrowInRight />) : <BsXCircle />}
                      </ActivityIcon>
                      <ActivityCapacity>{activity.capacity > 0 ? (activity.shedule ? 'Inscrito' : activity.capacity + ' Vagas') : 'Esgotado'}</ActivityCapacity>
                    </ActivityStatus>
                  </Container>
                ))}
              </Activities>
            </React.Fragment>
          ))}
        </Teste>
      ) : ''}
    </Activity>
  );
}
const Teste = styled.div`
display: flex;
`;
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
const Local = styled.div`
display: flex;
justify-content: space-around;
margin-top: 30px;
margin-bottom: 30px;
color:#7B7B7B;
;
`;
const Activities = styled.div`

`;
const Container = styled.div`
  display: flex;
  background: ${props => (
    props.subscribed
      ? '#D0FFDB'
      : (props.capacity > 0 ? '#F1F1F1' : '#EFEFEF')
  )};
  width: 265px;
  height: ${props => (props.duration === 1 ? '79px' : `${79 * props.duration}px`)};
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 8px;
  position: relative;
  margin-right: 30px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => (
    props.subscribed
      ? '#D0FFDB'
      : (props.capacity > 0 ? '#EFEFEF' : '#EFEFEF')
  )};
  }
`;
const Texts = styled.div`
`;
const ActivityName = styled.p`
font-weight:700;
font-size: 12px;
`;
const ActivitySchedule = styled.p`
margin-top: 5px;
font-weight:400;
font-size: 12px;
`;
const ActivityStatus = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: absolute;
right: 10px;
top: 25px;
color:${(props) => ((props.capacity > 0) ? '#078632' : 'red')};

`;
const ActivityIcon = styled.p`

`;
const ActivityCapacity = styled.p`
font-weight:400;
font-size: 9px;

`;
const Line = styled.div`
width: 1px;
height: 60px;
background-color: #CFCFCF;
position: absolute;
right: 60px;
`;

