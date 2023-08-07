import styled from 'styled-components';

export default function RoomsChoice({ selectedHotel }) {
  let cor = false;
  return (
    <Room>
      {selectedHotel.Rooms.map((e) => 
        <RoomChoices key={e.id} cor={e.Booking.length === e.capacity ? true : false}>
          <h1>{e.name}</h1>
          <div>
            {[...Array(e.capacity - e.Booking.length)].map((_, index) => (
              <ion-icon name="person-outline"></ion-icon>
            ))}
            {[...Array(e.Booking.length)].map((_, index) => (
              <ion-icon name="person"></ion-icon>
            ))}
          </div>
        </RoomChoices>
      )}
    </Room>
  );
}
const Room = styled.div`
  margin-top: 20px;
  max-height: 100%;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RoomChoices = styled.div`
  width: 190px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #CECECE;
  background-color: ${(props) => (props.cor === true ? '#CECECE' : 'white')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  h1{
    color: #454545;
    text-align: center;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 700;
    margin-left: 16px;
  }
  div{
    margin-right: 16px;
    ion-icon{
    width: 22px;
    height: 22px;
    color: ${(props) => (props.cor === true ? '#8C8C8C' : null)};
    }
  }
`;
