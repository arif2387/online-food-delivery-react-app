import React, { useState } from 'react';
import { SwipeableDrawer, Button, TextField, Box, Grid } from '@mui/material';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom';
import {Home as HomeIcon,
    WorkOutline as WorkOutlineIcon,
    LocationOnOutlined as LocationOnOutlinedIcon 
} from '@mui/icons-material';
import { useUser } from '../../context/authContext';
import { addAddress } from '../../firebase/firestoreServices'
import { LoadingButton } from '@mui/lab';
import { setUserAddress } from '../../feature/consumer/CartSlice';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../../feature/consumer/addAddressSlice'

const Wrapper = styled.div`
  margin-top: 5rem;
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

const AddAddress = ({ onClose }) => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useUser();
    const [address, setAddress] = useState('');
    const [doorFlatNo, setDoorFlatNo] = useState('');
    const [landmark, setLandmark] = useState('');
    const [addressType, setAddressType] = useState('');
    const [addressError, setaddressError] = useState(false);
    const [flatError, setFlatError] = useState(false);
    const [landmarkError, setLandmarkError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
        setaddressError(false);
    };

    const handleDoorFlatNoChange = (event) => {
        setDoorFlatNo(event.target.value);
        setFlatError(false);
    };

    const handleLandmarkChange = (event) => {
        setLandmark(event.target.value);
        setLandmarkError(false);
    };

    const handleSaveAddress = async() => {
        if (address.trim() == '') {
            setaddressError(true);
            return;
        }
        if (doorFlatNo.trim() == '') {
            setFlatError(true);
            return;
        }
        if (landmark.trim() == '') {
            setLandmarkError(true);
            return;
        }       
        try {
            setLoading(true);
            await addAddress({'userId':user.uid, address, doorFlatNo, landmark, addressType})
            const add={'userId':user.uid, address, doorFlatNo, landmark, addressType}
            dispatch(setUserAddress(add));
            setLoading(false)
            dispatch(toggleDrawer());
        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <>
            <Wrapper>
                <Container>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62217.306746757495!2d77.5882263250899!3d12.934586771972885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae151947c69de7%3A0xf2b320fefa7ffb8c!2sMountBlue%20Technologies%20Private%20Limited!5e0!3m2!1sen!2sin!4v1702287935689!5m2!1sen!2sin"
                        width={480}
                        height={350}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <Box>
                        <TextField
                            error={addressError}
                            id="outlined-basic"
                            sx={{ width: '100%', marginTop: '1rem' }}
                            label="Enter Address ..."
                            variant="outlined"
                            value={address}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            error={flatError}
                            id="outlined-basic"
                            sx={{ width: '100%', marginTop: '1rem' }}
                            label="Door/Flat No."
                            variant="outlined"
                            value={doorFlatNo}
                            onChange={handleDoorFlatNoChange}
                        />
                        <TextField
                            error={landmarkError}
                            id="outlined-basic"
                            sx={{ width: '100%', marginTop: '1rem' }}
                            label="Landmark"
                            variant="outlined"
                            value={landmark}
                            onChange={handleLandmarkChange}
                        />
                    </Box>
                    <Grid container spacing={1} sx={{ marginTop: '1rem', marginLeft: 0, border: '1px solid gray', height: '60px', width: '100%' }}>
                        <Grid onClick={() => setAddressType('home')} item xs={4} sx={{
                            borderRight: '1px solid grey', display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': {
                                background: '#68686b',
                                color: 'white',
                            },
                            backgroundColor:addressType == 'home' ? 'black': 'white',
                            color:addressType == 'home' ? 'white' : 'black',
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <HomeIcon />
                                <span>Home</span>
                            </Box>
                        </Grid>
                        <Grid onClick={() => setAddressType('work')} item xs={4} sx={{
                            borderRight: '1px solid grey', display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': {
                                background: '#68686b',
                                color: 'white',
                            },
                            backgroundColor:addressType == 'work' ? 'black': 'white',
                            color:addressType == 'work' ? 'white' : 'black',
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WorkOutlineIcon />
                                <span>Work</span>
                            </Box>
                        </Grid>
                        <Grid onClick={() => setAddressType('other')} item xs={4} sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': {
                                background: '#68686b',
                                color: 'white',
                            },
                            backgroundColor: addressType == 'other' ? 'black': 'white',
                            color: addressType == 'other' ? 'white' : 'black',
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOnOutlinedIcon />
                                <span>Other</span>
                            </Box>
                        </Grid>
                    </Grid>
                    <LoadingButton
                         disabled={loading}
                         loading={loading}
                        variant="contained"
                        sx={{ color: 'fff', backgroundColor: '#f68621', borderRadius: '0px', width: '100%', height: '4rem', fontSize: '1.5rem', fontWeight: '800', margin: '2rem 0' }}
                        onClick={handleSaveAddress}
                    >
                        Save Address & proceed
                    </LoadingButton>
                </Container>
            </Wrapper>
        </>
    );
};

const DrawerComponent = ({ anchor, isOpen, onClose, onOpen }) => {
    return (
        <SwipeableDrawer anchor={anchor} open={isOpen} onClose={onClose} onOpen={onOpen}>
            <AddAddress />
        </SwipeableDrawer>
    );
};

export default DrawerComponent;
