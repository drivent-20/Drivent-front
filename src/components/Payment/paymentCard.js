import { useState } from 'react';
import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import usePostPayment from '../../hooks/api/usePostPayment';
import { toast } from 'react-toastify';
import { getCreditCardNameByNumber } from 'creditcard.js';

export default function CardForm({ tickets }) {
  const { postPayment, postPaymentLoading } = usePostPayment();

  // eslint-disable-next-line no-console
  console.log(tickets);

  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: '',
  });

  const enviaAqui = async(e) => {
    e.preventDefault();
    delete cardInfo.focused;

    const issuer = getCreditCardNameByNumber(cardInfo.number);
    // eslint-disable-next-line no-console
    console.log(issuer);
    if (issuer === 'Credit card is invalid!') {
      return toast('Número de cartão inválido!');
    }
    const newData = {
      ticketId: tickets.id,
      cardData: {
        issuer: issuer,
        number: cardInfo.number,
        name: cardInfo.name,
        expirationDate: cardInfo.expiry,
        cvv: cardInfo.cvc,
      },
    };

    // eslint-disable-next-line no-console
    console.log('newData', newData);

    try {
      await postPayment(newData);
      toast('Pagamento feito com sucesso!');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      toast('Não foi possível fazer o pagamento.');
    }
  };

  const handleInputFocus = (e) => {
    setCardInfo({ ...cardInfo, focused: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const maxLength = name === 'cvc' ? 3 : undefined;
    const limitedValue = maxLength ? value.slice(0, maxLength) : value;
    setCardInfo({ ...cardInfo, [name]: limitedValue });
  };

  return (
    <PaymentContent>
      <PaymentMessage>Ingresso escolhido</PaymentMessage>
      <TicketType>
        <p>{tickets.TicketType.name}</p>
        <span>
          {(tickets.TicketType.price / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
          })}
        </span>
      </TicketType>
      <PaymentMessage>Pagamento</PaymentMessage>
      <PaymentContainer>
        <PaymentForm onSubmit={enviaAqui}>
          <InputAndCardContainer>
            <Cards
              number={cardInfo.number}
              name={cardInfo.name}
              expiry={cardInfo.expiry}
              cvc={cardInfo.cvc}
              focused={cardInfo.focused}
            />
            <InputsContainer>
              <input
                name="number"
                type="text"
                maxLength={16}
                placeholder="Card Number"
                value={cardInfo.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <p>E.g.: 49...,51...,36...,37...</p>
              <input
                name="name"
                placeHolder="Name"
                type="text"
                value={cardInfo.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <FormCVCAndExpiryDate>
                <input
                  name="expiry"
                  placeHolder="Valid Thru"
                  type="text"
                  maxLength="4"
                  mask="99/99"
                  value={cardInfo.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  name="cvc"
                  placeHolder="CVC"
                  type="text"
                  value={cardInfo.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </FormCVCAndExpiryDate>
            </InputsContainer>
          </InputAndCardContainer>
          <Button type="submit" disabled={handleInputChange}>
            Finalizar pagamento
          </Button>
        </PaymentForm>
      </PaymentContainer>
    </PaymentContent>
  );
}

const PaymentContainer = styled.div`
  display: flex;
  max-width: 400px;
  gap: 15px;
  font-family: 'Roboto', sans-serif;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    max-width: 290px;
    height: 45px;
    padding: 18.5px 14px;
    border: 1px solid #bbb;
    border-radius: 2px;
  }
  p {
    font-size: 12px;
    color: #808080;
  }
`;

const InputAndCardContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormCVCAndExpiryDate = styled.div`
  display: flex;
  gap: 10px;
  input:last-child {
    max-width: 80px;
  }
`;

const PaymentContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;

const PaymentMessage = styled.text`
  font-size: 20px;
  line-height: 23.44px;
  font-weight: 400;
  color: #8e8e8e;
`;

const TicketType = styled.div`
  max-width: 290px;
  height: 108px;
  border-radius: 20px;
  background-color: #ffeed2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  p {
    color: #454545;
    font-size: 16px;
  }
  span {
    color: #898989;
    font-size: 14px;
  }
`;

const Button = styled.button`
  max-width: 182px;
  height: 37px;
  border: 0;
  border-radius: 4px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);

  color: #000;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
