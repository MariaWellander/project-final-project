import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import originals from "reducers/originals";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import user from "reducers/user";
import { Button, Img } from "./GlobalStyles";
import logo from 'images/logo.png';

const Original = () => {
    const originalItems = useSelector((store) => store.originals.items);
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();

    useEffect( () => {
        if (!accessToken) {
            navigate("/login");
        }
    }, []);
    useEffect(() => {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("originals"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(originals.actions.setItems(data.response));
                    dispatch(originals.actions.setError(null));
                } else {
                    dispatch(originals.actions.setItems([]));
                    dispatch(originals.actions.setError(data.response));
                }
            })
    }, []);

    return (
        <>
            <header>
                <Img src={logo} alt="logo" />
                <Button>
                <Link to="/">Activity feed</Link>
                </Button>
                <Button>
                <Link to="/login" onClick={() => dispatch(user.actions.setAccessToken(null))}>Log out</Link>
                </Button>
            </header>
            <h2>
                This is Welly's boosting activities
                <br />
                - try them out!
            </h2>
            {originalItems.map((item) => {
                return <section key={item._id}>{item.message}</section>
            })}
        </>
    )
}

export default Original;