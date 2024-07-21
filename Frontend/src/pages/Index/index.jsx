import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import './styles.scss';

const Index = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ButtonStyle = {
        width: "140px",
        zIndex: 1,
        height: "40px",
        color: "white",
        borderColor: "white",
        '&:hover': {
            color: "black",
            backgroundColor: "white",
        },
    };

    return (
        <>
            <div className="main-container">
                <div className="container">
                    <div className="background-image"></div>
                    <div className="content">
                        <div id="welcome-card">
                            <h1 id="welcome-card-header">Welcome</h1>
                            <p id="welcome-card-text">
                                In the heart of the bustling city, where neon lights dance on the rain-slicked streets
                            </p>
                            <Button variant="outlined" style={ButtonStyle} onClick={() => navigate('/panel')}>
                                Go to Panel
                            </Button>
                        </div>
                        <h1 id="specsources">SpecSources</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
