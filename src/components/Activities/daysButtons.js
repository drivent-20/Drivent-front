import styled from 'styled-components';

export default function DaysButtons({ day }) {
  return (
    <ActivityContent>
      <Button>{day}</Button>
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
