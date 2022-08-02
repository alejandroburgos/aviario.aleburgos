import React, { useState, useEffect } from "react";

import {
    Grid,
    Button,
    TextField,
    InputAdornment,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router";
import { Header } from "../header/Header";

export const Login = () => {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState()
    const [prueba, setPrueba] = useState("aaaaaaa")
    // useNavigate
    const navigate = useNavigate();

    // useEffect( ()  => {
    //     // fetch get user for params
    //     const getUser = async () => {
    //         const response = await fetch(`http://localhost:3001/api/user/${user}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Origin": "*"
    //             },
    //         })
    //         try {
    //             const json = await response.json();
    //             if(json.ok){
    //                 setDataUser(json)
    //             }else{
    //                 setDataUser(null)
    //             }
    //         } catch (error) {
    //             console.log("error", error);
    //         }
    //     }
    //     getUser()
    // }, [user])
    
        const login = async () => {
            setPrueba("ILLOOOOOOOOOOOOOOOOO")
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user,
                    password: password,
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6InNhd2VyIn0sImV4cCI6MTY1OTIyMDYzMiwiaWF0IjoxNjU5MjIwMDMyfQ.8L9FfWEBSHkgus7wid0Eqp3BPivi-xdr-CaM3gTma1s',
                }),
            })
            const json = await response.json()

            try {
                if(response.ok){
                    // set token to localStorage
                    localStorage.setItem("token", JSON.stringify(json));
                    navigate("/contador", { state: { user: json } });
                }else{
                    setError(response.statusText + " " + response.status + " " + JSON.stringify(json))
                }
            } catch (error) {
                console.log("error", error);
                setError(error)
            }

        
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
                                                    onClick={login}
                                                >
                                                    Sign in
                                                </Button>
                                        {error ? <div className="text-center text-black-50 mt-3 text-danger">{error} {prueba}</div> : <div className="text-danger">SIN ERRORES , {prueba}</div>}
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
