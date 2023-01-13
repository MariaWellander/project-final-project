import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import activities from "reducers/activities";
import user from "reducers/user";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";

const Main = () => {
    const [formData, setFormData] = useState({});
    const activityItems = useSelector((store) => store.activities.items);
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

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
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
        dispatch(activities.actions.addItem(data.response));
        } else {
        console.log(data.response);
        }
        })
        setFormData({});
        }        

    return (
        <>
            <form onSubmit={onFormSubmit}>
            <h3>
            How do you boost your well-being?
            <br />
            Share it with the Welly community!
            </h3>
            <input type="text" name="textArea" onChange={handleFormChange} value={formData.textArea || ''} placeholder="Type your secret here..." />
            <button type="submit">Send secret!</button>
            </form>
            <button>
            <Link to="/original">Go to the original activities</Link>
            </button>
            <button>
            <Link to="/login" onClick={() => dispatch(user.actions.setAccessToken(null))}>Log out</Link>
            </button>
            {activityItems.map((item) => {
                return <section key={item._id}>{item.message}</section>
            })}
        </>
    )
}

export default Main;