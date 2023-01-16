import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import user from 'reducers/user';
import { Button, Img, Input, Label, LoginHeader, LoginH2, Form, RadioButton, RadioLabel, RadioContainer } from './GlobalStyles';
import logo from 'images/logo.png';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);
    useEffect( () => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken])

    const onFormSubmit =(event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, password: password })
        }
        fetch(API_URL(mode), options)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    batch(() => {
                        dispatch(user.actions.setUsername(data.response.username));
                        dispatch(user.actions.setUserId(data.response.id));
                        dispatch(user.actions.setAccessToken(data.response.accessToken));
                        dispatch(user.actions.setError(null));
                    });
                } else {
                    batch (() => {
                        dispatch(user.actions.setUsername(null));
                        dispatch(user.actions.setUserId(null));
                        dispatch(user.actions.setAccessToken(null));
                        dispatch(user.actions.setError(data.response));
                    });
                }
            })
    }
    return (
        <>
        <LoginHeader>
            <Img src={logo} alt="logo" />
            <h1>Welly</h1>
        </LoginHeader>
        <LoginH2>Boost your well-being!</LoginH2>
        <RadioContainer>
            <RadioLabel htmlFor="register">Register</RadioLabel>
            <RadioButton
            type="radio"
            id="register"
            checked={mode === "register"}
            onChange={() =>setMode("register")}/>
            <RadioLabel htmlFor="login">Login</RadioLabel>
            <RadioButton
            type="radio"
            id="login"
            checked={mode === "login"}
            onChange={() =>setMode("login")}/>
        </RadioContainer>
        <Form onSubmit={onFormSubmit}>
            <Label htmlFor="username">Username:</Label>
            <Input
                type="text"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}/>
            <Label htmlFor="password">Password:</Label>
            <Input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}/>
            <Button type="submit">Submit</Button>
        </Form>
    </>
    );
}

export default Login;