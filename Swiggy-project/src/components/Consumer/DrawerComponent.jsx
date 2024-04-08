import React, { useState } from 'react';
import { SwipeableDrawer, Button } from '@mui/material';
import styled from 'styled-components';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  margin-top: 10rem;
  margin-left: 2rem;
  left: auto;
  right: 0px;
  transform: translate(0%, 0px);
`;

const Container = styled.div`
  padding-left: 2.5rem;
  padding-right: 7rem;
  width: 30rem;
`;

const Image = styled.img`
  width: 100px;
  height: 105px;
`;

const LoginLink = styled.span`
  color: #f68621;
  cursor: pointer;
  text-decoration: underline;
`;

const LoginComponent = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const auth = getAuth(app);
    const navigate = useNavigate();

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const handleLogin = async () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate('/');
            }).catch((error) => {
                console.log(error)
            });
    };


    return (
        <Wrapper>
            <div>
                <Container>
                    <div style={{ height: '130px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: '500', marginBottom: '1rem' }}>
                                {isSignUp ? 'Sign Up' : 'Login'}
                            </div>
                            <span>
                                or{' '}
                                <LoginLink onClick={toggleSignUp}>
                                    {isSignUp ? 'Login' : 'Create an account'}
                                </LoginLink>
                            </span>
                        </div>
                        <Image
                            imageUrl="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                            alt="img renderer"
                            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                        />
                    </div>
                    <Button
                        variant="contained"
                        sx={{ color: 'fff', backgroundColor: '#f68621', borderRadius: '0px', width: '100%', height: '4rem', fontSize: '1.5rem', fontWeight: '800', margin: '2rem 0' }}
                        onClick={handleLogin}
                    >
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </Button>
                    <div>
                        By clicking on {isSignUp ? 'Sign Up' : 'Login'}, I accept the{' '}
                        <LoginLink href="#">Terms & Conditions</LoginLink> & <LoginLink href="#"> Privacy Policy</LoginLink>
                    </div>
                </Container>
            </div>
        </Wrapper>
    );
};

const DrawerComponent = ({ anchor, isOpen, onClose, onOpen }) => {
    return (
        <SwipeableDrawer anchor={anchor} open={isOpen} onClose={onClose} onOpen={onOpen}>
            <LoginComponent />
        </SwipeableDrawer>
    );
};

export default DrawerComponent;
