import React, { useState, useEffect } from "react";

import {
    Grid,
    Button,
    TextField,
    InputAdornment,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import { useNavigate } from "react-router";

export const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const token = localStorage.getItem("token");
    // useNavigate
    const navigate = useNavigate();

    // post to login
    const login = () => {
        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: user,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.ok){
                    // fetch get user for params
                    fetch(`http://localhost:3001/user/${user}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": data.token,
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if(data.ok){
                                localStorage.setItem("token", data.token);
                                localStorage.setItem("user", data.user);
                                navigate("/");
                            }
                        }
                    )
                }
                
            });
    };
    
    const [checked1, setChecked1] = useState(true);

    const handleChange1 = (event) => {
        setChecked1(event.target.checked);
    };

    return (
        <>
            <div className="app-wrapper bg-white min-vh-100">
                <div className="app-main min-vh-100">
                    <div className="app-content p-0">
                        <div className="app-content--inner d-flex align-items-center">
                            <div className="flex-grow-1 w-100 d-flex align-items-center">
                                <div className="bg-composed-wrapper--content py-5">
                                    <Grid item md={10} lg={8} xl={4} className="mx-auto">
                                        <div className="text-center">
                                            <h1 className="display-4 mb-1 font-weight-bold">Login</h1>
                                            <p className="font-size-lg mb-0 text-black-50">
                                                Fill in the fields below to login to your account
                                            </p>
                                        </div>
                                        <div className="text-center py-4 rounded bg-secondary my-4">
                                            <Button
                                                className="m-2 btn-pill px-4 font-weight-bold btn-google"
                                                size="small"
                                            >
                                                <span className="btn-wrapper--icon">
                                                    {/* <FontAwesomeIcon icon={["fab", "google"]} /> */}
                                                </span>
                                                <span className="btn-wrapper--label">
                                                    Login with Google
                                                </span>
                                            </Button>
                                            <Button
                                                className="m-2 btn-pill px-4 font-weight-bold btn-facebook"
                                                size="small"
                                            >
                                                <span className="btn-wrapper--icon">
                                                    {/* <FontAwesomeIcon icon={["fab", "facebook"]} /> */}
                                                </span>
                                                <span className="btn-wrapper--label">
                                                    Login with Facebook
                                                </span>
                                            </Button>
                                        </div>
                                        <div className="text-center text-black-50 mb-4">
                                            or sign in with credentials
                                        </div>
                                        <div>
                                            <div className="mb-4">
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    id="textfield-email"
                                                    label="Email address"
                                                    onChange={(e) => setUser(e.target.value)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                {/* <MailOutlineTwoToneIcon /> */}
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    id="textfield-password"
                                                    label="Password"
                                                    type="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                {/* <LockTwoToneIcon /> */}
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center font-size-md">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={checked1}
                                                            onChange={handleChange1}
                                                            value="checked1"
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Remember me"
                                                />
                                                <div>
                                                    <a
                                                        href="#/"
                                                        onClick={(e) => e.preventDefault()}
                                                        className="text-first"
                                                    >
                                                        Recover password
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="text-center py-4">
                                                <Button
                                                    className="btn-second font-weight-bold w-50 my-2"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        login();
                                                    }}
                                                >
                                                    Sign in
                                                </Button>
                                            </div>
                                            <div className="text-center text-black-50 mt-3">
                                                Don't have an account?{" "}
                                                <a
                                                    href="#/"
                                                    onClick={(e) => e.preventDefault()}
                                                    className="text-first"
                                                >
                                                    Sign up
                                                </a>
                                            </div>
                                        </div>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
