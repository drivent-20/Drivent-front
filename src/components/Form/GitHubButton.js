import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';

export default function GitHubButton({ variant='contained', children, ...props }) {
  function gitHub() {
    const params = new URLSearchParams({
      response_type: 'code',
      scope: 'user',
      client_id: `${process.env.REACT_APP_CLIENT_ID}`,
      redirect_uri: `${process.env.REACT_APP_REDIRECT_URL}`,
    });
    const authURL = `${process.env.REACT_APP_GITHUB_URL}?${params.toString()}`;
    window.location.href = authURL;
  }

  return (
    <StyledMuiButton onClick={gitHub} variant={variant} {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiButton)`
  margin-top: 0px !important;
  background-color: grey !important;
  cursor: pointer !important;
`;
