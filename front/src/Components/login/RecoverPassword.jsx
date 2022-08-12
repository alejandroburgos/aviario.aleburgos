import React, { useState, useEffect } from "react";
import people2  from "./../../assets/images/stock-photos/people-1.jpg";
import {
    Grid,
    Button,
    TextField,
    InputAdornment,
    Dialog
} from "@material-ui/core";

import { constants } from "../../Constants";
import { LockOutlined, VerifiedUserOutlined } from "@material-ui/icons";

export const RecoverPassword = (props) => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
    //   compare password and password2
        if(password !== password2){
            setError('Las contraseñas no coinciden')
        }else{
            setError('')
        }
    }, [password, password2])
    
    const recover = async () => {
        const response = await fetch(`${constants.urlLocal}recover`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user,
            password: password,
            newPassword: password2,
          }),
        });
        const json = await response.json();
    
        try {
          if (response.ok) {
            setError("");
            // set token to localStorage
            props.toggle()
          } else {
            setError(JSON.stringify(json.message));
          }
        } catch (error) {
          console.log("error", error);
          setError(error);
        }
      };

    return (
        <>
            <div className="d-flex align-items-center justify-content-center flex-wrap">

                <Dialog scroll="body" maxWidth="sm" open={props.modal} onClose={props.toggle} classes={{ paper: 'w-100 rounded shadow-sm-dark border-0 bg-white' }}>
                    <div className="hero-wrapper bg-composed-wrapper bg-primary h-100 rounded-top">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                            <div className="bg-composed-wrapper--image rounded-top opacity-3" style={{backgroundImage: 'url(' + people2 + ')'}}/>
                            <div className="bg-composed-wrapper--content text-center pt-5">
                                <div className="text-white">
                                    <h1 className="display-3 my-3 font-weight-bold">
                                        Recuerda tu contraseña
                                    </h1>
                                    <p className="font-size-lg mb-0 px-4 text-white-50">
                                        No te preocupes que nunca puedo saber tu contraseña porque está encriptada
                                    </p>
                                </div>
                                <div className="shape-container-top-1" style={{margin: 0}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill="var(--white)" fillOpacity="1" d="M0,32L48,69.3C96,107,192,181,288,186.7C384,192,480,128,576,106.7C672,85,768,107,864,112C960,117,1056,107,1152,101.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white d-flex justify-content-center align-items-center flex-column rounded pt-4 pt-lg-0" style={{marginTop: '-80px'}}>
                        <Grid item lg={10} xl={9} className="z-over py-5 mx-auto">
                            <div className="px-2 py-3 py-lg-5">
                                <div>
                                    <label className="font-weight-bold mb-2">Usuario</label>
                                    <TextField fullWidth
                                               variant="outlined"
                                               id="textfield-email"
                                               placeholder="Nombre de usuario"
                                               onChange={(e) => setUser(e.target.value)}
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <VerifiedUserOutlined />
                                                       </InputAdornment>
                                                   ),
                                               }}
                                    />
                                    <TextField fullWidth
                                               variant="outlined"
                                               id="textfield-password"
                                               className="mt-2"
                                               type={'password'}
                                               placeholder="nueva contraseña"
                                               onChange={(e) => setPassword(e.target.value)}
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <LockOutlined />
                                                       </InputAdornment>
                                                   ),
                                               }}
                                    />
                                    <TextField fullWidth
                                               variant="outlined"
                                               id="textfield-password"
                                               className="mt-2"
                                               type={'password'}
                                               placeholder="repite contraseña"
                                               onChange={(e) => setPassword2(e.target.value)}
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <LockOutlined />
                                                       </InputAdornment>
                                                   ),
                                               }}
                                    />
                                </div>
                                <div className="text-center mt-4 text-danger">
                                    {error}
                                </div>
                                <div className="text-center">
                                    <Button fullWidth className="text-uppercase font-weight-bold font-size-sm mt-4 btn-primary"
                                    onClick={recover}>Recuperar</Button>
                                </div>
                            </div>
                        </Grid>
                    </div>
                </Dialog>
            </div>
        </>
    );
}
