import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import activities from "reducers/activities";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
const Main = () => {
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

    return (
        <>
            <Link to="/login">GO TO LOGIN</Link>
            <h2>This is the main component</h2>
            {activityItems.map((item) => {
                return <p key={item._id}>{item.message}</p>
            })}
        </>
    )
}

export default Main;