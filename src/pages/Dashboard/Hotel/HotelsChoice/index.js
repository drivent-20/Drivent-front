import styled from 'styled-components';
import RoomsChoice from '../../../../components/Hotel/hotelRooms';
import { useState } from 'react';
import useHotel from '../../../../hooks/api/useHotel';
import HotelWithoutPayment from '../../../../components/Hotel/hotelWithoutPayment';
import { HotelContainer } from '..';

export default function HotelsChoice() {
  const { hotel: hotels, hotelError } = useHotel();
  const [selectedHotelIdx, setSelectedHotelIdx] = useState(null);
  const selectedHotel = selectedHotelIdx !== null ? hotels?.at(selectedHotelIdx) : null;

  if (hotelError) {
    return <HotelWithoutPayment
      errorStatus={hotelError}
    />;
  }

  return (
    <HotelContainer>
      <Hotel>
        <HotelTitle>Escolha de hotel e quarto</HotelTitle>
        <HotelMessage>Primeiro, escolha seu hotel</HotelMessage>
        <HotelChoices>
          {hotels?.map((hotel, idx) =>
            <HotelChoice
              key={hotel.id}
              idx={idx}
              hotel={hotel}
              setSelectedHotelIdx={setSelectedHotelIdx}
            >
              <ChoiceOption>
                <h2>Tipos de acomodação:</h2>
                <h3>{roomTypesMap[hotel.roomsType] || 'Não informado'}</h3>
              </ChoiceOption>
              <ChoiceOption>
                <h2>Vagas disponíveis:</h2>
                <h3>{hotel.availableRooms}</h3>
              </ChoiceOption>
            </HotelChoice>
          )}
        </HotelChoices>
        {selectedHotel && <RoomsChoice hotel={selectedHotel} />}
      </Hotel>
    </HotelContainer>
  );
}

export function HotelChoice({ idx, hotel, setSelectedHotelIdx, readOnly = false, checked, children }) {
  return (
    <Choice onClick={() => setSelectedHotelIdx && setSelectedHotelIdx(idx)}>
      <input readOnly={readOnly} checked={checked} name='hotelChoice' type='radio' />
      <img src={hotel.image} alt={hotel.name} />
      <ChoiceTitle>{hotel.name}</ChoiceTitle>
      {children}
    </Choice>
  );
}

export const roomTypesMap = {
  'S': 'Single',
  'D': 'Double',
  'T': 'Triple',
  'SD': 'Simple e Double',
  'ST': 'Simple e Triple',
  'DT': 'Double e Triple',
  'SDT': 'Simple, Double e Triple'
};

export const Hotel = styled.div`
  max-height: 100%;
  font-family: 'Roboto', sans-serif;
`;

export const HotelTitle = styled.h1`
  font-size: 34px;
  margin-bottom: 16px;
`;

export const HotelMessage = styled.p`
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin-bottom: 24px;
`;

export const HotelChoices = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-content: start;
  flex-wrap: wrap;
  gap: 16px;
 
  &:has(input:checked){
    label:not(:has(input:checked)){
      opacity: 0.4;
    }
  }
`;

export const Choice = styled.label`
  input {
    height: 0;
    width: 0;
    visibility: hidden;
    position: absolute;
  }

  position: relative;
  width: 196px;
  height: fit-content;
  background-color: #EBEBEB;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  padding: 15px;
  gap: 16px;
  cursor: pointer;

  img{
    width: 100%;
    height: 109px;
    border-radius: 5px;
    object-fit: cover;
  }

  &:hover {
    background-color: #d7d8d9;
  }

  &:has(input:checked) {
    background-color: #FFEED2;
  }
`;

export const ChoiceTitle = styled.h1`
  color: #343434;
  font-size: 20px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ChoiceOption = styled.div`
  gap: 2px;
  display: flex;
  flex-direction: column;
  h2{
    color: #3C3C3C;
    font-size: 12px;
    font-weight: 700;
  }
  h3{
    color: #3C3C3C;
    font-size: 12px;
    font-weight: 400;
  }
`;
