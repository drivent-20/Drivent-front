import styled from 'styled-components';

export default function HotelsChoice({ hotel, setSelectedHotel }) {
  const roomTypesMap = {
    'S': 'Single',
    'D': 'Double',
    'T': 'Triple',
    'SD': 'Simple e Double',
    'ST': 'Simple e Triple',
    'DT': 'Double e Triple',
    'SDT': 'Simple, Double e Triple'    
  };
  
  return (
    <Hotel>
      <HotelTitle>Escolha de hotel e quarto</HotelTitle>
      <HotelContent>
        <HotelMessage>Primeiro, escolha seu hotel</HotelMessage>
        <HotelChoices>
          {console.log('hoteis: ', hotel)}
          {hotel.map((e) => 
            <Choice key={e} onClick={() => setSelectedHotel(e)}>
              <img src={e.image} alt={e.name}/>
              <ChoiceTitle>{e.name}</ChoiceTitle>
              <ChoiceOption>
                <h1>Tipos de acomodação:</h1>
                <h2>{roomTypesMap[e.roomsType] || 'Não informado'}</h2>
              </ChoiceOption>
              <ChoiceOption>
                <h1>Vagas disponíveis:</h1>
                <h2>{e.availableRooms}</h2>
              </ChoiceOption>
            </Choice>
          )}
        </HotelChoices>
      </HotelContent>
    </Hotel>
  );
}

const Hotel = styled.div`
  max-height: 100%;
  font-family: 'Roboto', sans-serif;
`;

const HotelTitle = styled.h1`
  font-size: 34px;
  font-weight: 400;
  margin-bottom: 20px;
`;

const HotelContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 19px;
  margin-bottom: 20px;
`;

const HotelMessage = styled.text`
  max-width: 250px;
  text-align: left;
  font-size: 20px;
  line-height: 23px;
  font-weight: 400;
  color: #8E8E8E;
`;

const HotelChoices = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Choice = styled.div`
  height: 264px;
  width: 196px;
  background-color: #EBEBEB;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
  cursor: pointer;
  img{
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
`;

const ChoiceTitle = styled.h1`
  color: #343434;
  font-size: 20px;
  font-weight: 400;
`;

const ChoiceOption = styled.h1`
  gap: 2px;
  display: flex;
  flex-direction: column;
  h1{
    max-height: 14px;
    color: #3C3C3C;
    font-size: 12px;
    font-weight: 700;
  }
  h2{
    max-height: 14px;
    color: #3C3C3C;
    font-size: 12px;
    font-weight: 400;
  }
`;
