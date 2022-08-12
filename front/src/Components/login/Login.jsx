import React, { useState, useEffect } from "react";
import hero6 from "./../../assets/images/hero-bg/hero-2.jpg";

import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Container,
  Card,
  List,
  ListItem,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router";
import { constants } from "../../Constants";
import { BubbleChart, HearingOutlined, Lock, Mail, VerifiedUser } from "@material-ui/icons";
import { RecoverPassword } from "./RecoverPassword";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [dataUser, setDataUser] = useState();
  const [error, setError] = useState();

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  // useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    // fetch get user for params
    const getUser = async () => {
      const response = await fetch(`${constants.urlLocal}user/${user.toLowerCase()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      try {
        const json = await response.json();
        if (json.ok) {
          setDataUser(json);
        } else {
          setDataUser(null);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getUser();
  }, [user]);

  const login = async () => {
    const response = await fetch(`${constants.urlLocal}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.toLowerCase(),
        password: password,
        token: dataUser.token,
      }),
    });
    const json = await response.json();

    try {
      if (response.ok) {
        setError("");
        // set token to localStorage
        localStorage.setItem("token", JSON.stringify(json));
        navigate("/crianza-de-pajaros", { state: { user: json } });
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
      <div className="app-wrapper min-vh-100 bg-white">
        <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100">
          <div className="flex-grow-1 w-50 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image opacity-6"
              style={{ backgroundImage: "url(" + hero6 + ")" }}
            />
            <div className="bg-composed-wrapper--bg bg-second opacity-7" />
            <div className="bg-composed-wrapper--content p-3 p-md-5">
              <Container>
                <Card className="rounded-sm modal-content p-3 bg-white-10">
                  <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                    <Grid container spacing={0}>
                      <Grid
                        item
                        lg={12}
                        className="d-flex align-items-center justify-content-center flex-column"
                      >
                        <div className="divider-v divider-v-lg d-none d-lg-block" />
                        <div className="text-center mt-4">
                          <h1 className="font-size-xxl mb-1 font-weight-bold">
                            Inicia sesión
                          </h1>
                          <p className="mb-0 text-black-50">
                            Inicia sesión con tu cuenta
                          </p>
                        </div>
                        <div className="py-4">
                          <div>
                            <div className="mb-4">
                              <TextField
                                fullWidth
                                variant="outlined"
                                id="textfield-email"
                                label="Usuario"
                                onChange={(e) => setUser(e.target.value)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Mail />
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
                                label="Contraseña"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Lock />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                              <div>
                                <a
                                  className="text-first"
                                  href="#/"
                                  onClick={(e) => toggle2()}
                                >
                                  No me acuerdo de mi contraseña 😐
                                </a>
                              </div>
                              <RecoverPassword toggle={toggle2} modal={modal2} />
                            </div>
                            <div className="text-center py-4">
                              <Button className="btn-second font-weight-bold w-50 my-2" onClick={login}>
                                Entrar
                              </Button>
                            </div>
                            {/* <div className="text-center text-black-50 mt-3">
                              Don't have an account?{" "}
                              <a
                                className="text-first"
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                              >
                                Sign up
                              </a>
                            </div> */}
                          </div>
                        </div>
                      </Grid>
                      {/* <Grid
                        item
                        lg={6}
                        className="d-flex align-items-center justify-content-center flex-column bg-secondary"
                      >
                        <div className="p-3">
                          <div className="p-4">
                            <div className="d-block d-xl-flex">
                              <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                <HearingOutlined
                                  className="font-size-xl text-first"
                                />
                              </div>
                              <div className="pl-0 pl-xl-3">
                                <div className="text-black font-weight-bold font-size-lg mb-1">
                                  Widgets
                                </div>
                                <p className="mb-0 text-black-50">
                                  You can build unlimited layout styles using
                                  any of the 500+ included components and
                                  elements. Powerful, unique template built for
                                  React and Material-UI.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="d-block d-xl-flex">
                              <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                <BubbleChart
                                  icon={["far", "lightbulb"]}
                                  className="font-size-xl text-first"
                                />
                              </div>
                              <div className="pl-0 pl-xl-3">
                                <div className="text-black font-weight-bold font-size-lg mb-1">
                                  Components
                                </div>
                                <p className="mb-0 text-black-50">
                                  View any of the 5+ live previews we&#39;ve set
                                  up to learn why this dashboard template is the
                                  last one you&#39;ll ever need!
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="d-block d-xl-flex">
                              <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                <VerifiedUser
                                  icon={["far", "user"]}
                                  className="font-size-xl text-first"
                                />
                              </div>
                              <div className="pl-0 pl-xl-3">
                                <div className="text-black font-weight-bold font-size-lg mb-1">
                                  Elements
                                </div>
                                <p className="mb-0 text-black-50">
                                  You can build unlimited layout styles using
                                  any of the 500+ included components and
                                  elements. Powerful, unique template built for
                                  React and Material-UI.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid> */}
                    </Grid>
                  </Card>
                </Card>
              </Container>
            </div>
          </div>
          <div className="hero-footer w-100 pb-4">
            <Container>
              <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
                <div className="text-center d-block mb-3 mb-md-0 text-white">
                  Copyright &copy; 2022 - Sawer
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};
