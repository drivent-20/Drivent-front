import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';

export default function GitHubButton({ variant='contained', children, ...props }) {
  function gitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const CLIENT_ID = '1b6177e2973d4f7bf679';

    const params = new URLSearchParams({
      response_type: 'code',
      scope: 'user',
      client_id: CLIENT_ID,
      redirect_uri: 'http://localhost:3000/sign-in'
    });

    const authURL = `${GITHUB_URL}?${params.toString()}`;
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
