import { useState } from 'react';
import usePostPayment from '../../hooks/api/usePostPayment';
import { toast } from 'react-toastify';
import { getCreditCardNameByNumber } from 'creditcard.js';
import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default function PaymentForm({ tickets, getPayment, setPayment }) {
  const { postPayment, postPaymentLoading } = usePostPayment();

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

    try {
      await postPayment(newData);
      toast('Pagamento feito com sucesso!');
      // const payment = await getPayment(tickets.id);
      setPayment(true);
    } catch (err) {
      toast('Não foi possível fazer o pagamento.');
      console.log('erro', err);
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
    <PaymentContainer>
      <PaymentForms onSubmit={enviaAqui}>
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
        <Button type="submit" disabled={postPaymentLoading}>
          Finalizar pagamento
        </Button>
      </PaymentForms>
    </PaymentContainer>
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

const PaymentForms = styled.form`
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
