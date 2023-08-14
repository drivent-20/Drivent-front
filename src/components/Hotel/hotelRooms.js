import styled from 'styled-components';
import usePostBooking from '../../hooks/api/usePostBooking';
import usePutBooking from '../../hooks/api/usePutBooking';
import useGetBooking from '../../hooks/api/useGetBooking';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RoomsChoice({ hotel }) {
  const {
    postBooking,
    postBookingLoading
  } = usePostBooking();

  const {
    putBooking,
    putBookingLoading
  } = usePutBooking();

  const {
    booking,
    getBookingLoading
  } = useGetBooking();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');

  const isLoading = postBookingLoading || putBookingLoading || getBookingLoading;

  function handleRoomSubmit(e) {
    e.preventDefault();
    if (isLoading) return;
    const roomId = e.target['room'].value;

    let promise;

    if (isEdit) {
      promise = putBooking({ roomId }, booking.id);
    } else {
      promise = postBooking({ roomId });
    }

    promise
      .then(() => {
        toast('Reserva feita com sucesso!');
        navigate('/dashboard/hotel/confirmation');
      })
      .catch(() => toast('Não foi possível fazer sua reserva.'));
  }

  hotel.Rooms.sort(sortByRoomName);

  return (
    <FormWrapper onSubmit={handleRoomSubmit}>
      <RoomsTitle>Ótima pedida! Agora escolha seu quarto</RoomsTitle>
      <Room>
        {hotel.Rooms.map((room) => (
          <RoomChoices
            key={room.id}
            id={room.id}
            name={room.name}
            capacity={room.capacity}
            bookingLength={room.Booking.length}
          />
        ))}
      </Room>
      <HotelButton disabled={isLoading} type='submit'>RESERVAR QUARTO</HotelButton>
    </FormWrapper>
  );
}

function sortByRoomName(a, b) {
  return Number(a.name) - Number(b.name);
}

function RoomChoices({ id, name, capacity, bookingLength, isRequired = true }) {
  const isFull = bookingLength === capacity;

  return (
    <RoomChoicesContainer isFull={isFull}>
      {!isFull && <input value={id} type='radio' name='room' required={isRequired} />}
      <h1>{name}</h1>
      <RoomVacancies
        roomId={id}
        total={capacity}
        free={capacity - bookingLength}
      />
    </RoomChoicesContainer>
  );
}

function RoomVacancies({ roomId, total, free }) {
  return (
    <div>
      {[...Array(free)].map((_, idx) => (
        <div key={`${roomId}-${idx}-free`} className='free'>
          <ion-icon name="person-outline" />
          <ion-icon name="person" />
        </div>
      ))}
      {[...Array(total - free)].map((_, idx) => (
        <ion-icon key={`${roomId}-${idx}-reserved`} name="person" />
      ))}
    </div>
  );
}

const FormWrapper = styled.form`
  :valid {
    button {
      visibility: visible;
      pointer-events: all;
    }
  }
 `;

export const HotelButton = styled.button`
  visibility: hidden;
  pointer-events: none;
  height: 37px;
  border: 0;
  border-radius: 4px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  color: #000;
  text-align: center;
  font-size: 14px;
  padding: 0 16px;
  margin-bottom: 64px;

  :hover{
    filter: brightness(0.8);
  }

  cursor: pointer;
 `;

const RoomsTitle = styled.h2`
  font-size: 20px;
  color: #8e8e8e;
  margin: 0px 0 32px 0;
`;

const Room = styled.div`
  margin: 24px 0;
  max-height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RoomChoicesContainer = styled.label`
  input {
    position: absolute;
    visibility: hidden;
    height: 0;
    width: 0;
  }

  width: 190px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #CECECE;
  background-color: ${({ isFull }) => isFull ? '#CECECE' : '#FFF'};
  opacity: ${({ isFull }) => isFull ? 0.5 : 1};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  

  h1{
    color: #454545;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 700;
   }

  div{
    display: flex;
    ion-icon{
      width: 22px;
      height: 22px;
    }
  }

  .free {
    ion-icon[name="person"]{
      display: none;
    }
  }

  &:has(input){
    cursor: pointer;
  }
  
  &:has(input):hover {
    background-color: #d7d8d9;
  }

  &:has(input:checked){
    background-color: #FFEED2;
    
    .free:last-of-type { 
      ion-icon[name="person-outline"]{
        display: none;
      }

      ion-icon[name="person"]{
        display: block;
        color: #FF4791;
      }
    }
  }
`;
