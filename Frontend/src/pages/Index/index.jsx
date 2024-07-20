import { useState, useEffect, createRef } from "react";
import "./styles.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { setData } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ButtonStyle = {
        width: "250px",
        height: "50px",
    }
    const TextStyle = {
        width: "250px",
        height: "50px",
    }

    const NAMEFIELD = createRef();
    const EMAILFIELD = createRef();

    const saveName = () => {
        const name = NAMEFIELD.current.value;
        const email = EMAILFIELD.current.value;
        dispatch(setData({ name: name, email: email }));
        navigate("/panel");

    }
    return (
        <main id="index">
            <h1>Introduction</h1>
            <TextField inputRef={NAMEFIELD} style={TextStyle} id="outlined-basic" label="Enter Your Name" variant="outlined" />
            <TextField inputRef={EMAILFIELD} style={TextStyle} id="outlined-basic" label="Enter Your Email" variant="outlined" />
            <Button style={ButtonStyle} onClick={saveName} variant="contained" color="primary">Submit</Button>
        </main>
    );
};

export default Index;
