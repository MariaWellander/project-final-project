import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import activities from "reducers/activities";
import user from "reducers/user";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import { Button, Img, MainInput, MainH2, MainSection } from "./GlobalStyles";
import logo from 'images/logo.png';

const Main = () => {
    const [formData, setFormData] = useState({});
    const [updated, setUpdated] = useState(false);
    const activityItems = useSelector((store) => store.activities.items);
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();
    const username = useSelector((store) => store.user.username);

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
        fetch(API_URL("activities"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(activities.actions.setItems(data.response));
                    dispatch(activities.actions.setError(null));
                } else {
                    dispatch(activities.actions.setItems([]));
                    dispatch(activities.actions.setError(data.response));
                }
            })
    }, []);

    useEffect(() => {
        if (updated) {
            setUpdated(false);
        }
    }, [updated])    

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            },
            body: JSON.stringify({ message: formData.textArea })
        }
        fetch(API_URL("activities"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    const newActivityItems = [...activityItems, data.response];
                    dispatch(activities.actions.setItems(newActivityItems));
                    setUpdated(true);
                } else {
                    console.log(data.response);
                }
            })
        setFormData({});
    }        

    return (
        <>
            <header>
                <Img src={logo} alt="logo" />
                <Button>
                <Link to="/original">Welly's activities</Link>
                </Button>
                <Button>
                <Link to="/login" onClick={() => dispatch(user.actions.setAccessToken(null))}>Log out</Link>
                </Button>
            </header>
            <form onSubmit={onFormSubmit}>
            <MainH2>Well hello, {username}!</MainH2>
            <h3>
            How do you boost your well-being?
            <br />
            Share it with the Welly community!
            </h3>
            <MainInput type="text" name="textArea" onChange={handleFormChange} value={formData.textArea || ''} placeholder="Type your activity here..." />
            <Button type="submit">Share it!</Button>
            </form>
            {activityItems.map((item) => {
                return <MainSection key={item._id}>{item.message}</MainSection>
            })}
        </>
    )
}

export default Main;