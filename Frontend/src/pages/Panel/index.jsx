import { useState, useEffect } from "react";
import "./styles.scss";
import { useSelector } from "react-redux";

const Index = () => {
    const name = useSelector((state) => state.user.name);
    const email = useSelector((state) => state.user.email);
    return (
        <>
            <h1>Panel Page</h1>
            <div>{name}</div>
            <div>{email}</div>
        </>
    );
};

export default Index;
