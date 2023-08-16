import styled from 'styled-components';
import dayjs from 'dayjs';

export default function DaysButtons({ day, onButtonClick }) {  
  const handleClick = () => {
    const isoDate = dayjs(day, 'dddd, DD/MM').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    onButtonClick(isoDate);
  };
  return (
    <ActivityContent>
      <Button onClick={handleClick}>{day}</Button>
    </ActivityContent>
  );
}

const ActivityContent = styled.div`
  display: flex;
  height: 100%;
  gap:10px;
`;

const Button = styled.button`
  max-width: 131px;
  height: 37px;
  border-radius: 4px;
  background: #e0e0e0;
  border:none;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);

  color: #000;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
