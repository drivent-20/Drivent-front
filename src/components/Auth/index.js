import styled from 'styled-components';
import { imgErrorFallback } from '../../utils/img.utils';
import LogoDrivent from '../../assets/images/drivent_logo.png';
import Container from '../Container';

export const StyledContainer = styled(Container)`
  font-size: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-top: 10px;
`;

export const Label = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const EventImage = ({
  src,
  fallbackSrc = LogoDrivent,
  alt = 'Event Logo',
  width = '60px',
  ...rest
}) => {
  return (
    <img
      onError={(e) => imgErrorFallback(e, fallbackSrc)}
      src={src}
      alt={alt}
      width={width}
      {...rest}
    />
  );
};
