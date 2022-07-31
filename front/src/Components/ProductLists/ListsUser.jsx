import React, { useState, useEffect } from "react";
import {
    ChatOutlined,
    StarsOutlined,
    StarsTwoTone,
    StarTwoTone,
    Star,
} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";

export const ListsUser = ({ wallapopProducts, index }) => {
    const [loading, setLoading] = useState(true);
    const [userLists, setUserLists] = useState();
    const [ratingValue, setRatingValue] = useState()
    useEffect(() => {
        const url = `https://api.wallapop.com/api/v3/users/436el2pkvkzd`;
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setUserLists(json);
                setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        };
        setInterval(() => { }, 30000);
        fetchData();


    }, [wallapopProducts]);

    useEffect(() => {
        // setUserLists({[userLists.rating[index].value]: userLists.rating[index].value});
        // console.log(userLists);

    }, [])



    // console.log(userLists);
    return (
        <div>
            <div className="d-flex align-items-center justify-content-center flex-wrap">
                {/* <Rating name="size-small" defaultValue={userLists && userLists.ratings[index].value} size="small" /> */}
            </div>
        </div>
    );
};
