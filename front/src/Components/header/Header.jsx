import React, { useState, useEffect } from "react";

import logo from "../../assets/images/react.svg";

import { List, ListItem, Menu, Button, Collapse, MenuItem } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import {useLocation, useNavigate} from "react-router-dom";

import clsx from "clsx";

export const Header = () => {
    // get current location
    const location = useLocation();
    const navigate = useNavigate();
    // get token from localStorage
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        setUserData(location.state.user);
    }, [location])
    


    //sing out 
    const singOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        if(userData){
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [collapse, setCollapse] = useState(false);
    const toggle = () => setCollapse(!collapse);

    return (
        <>
            <div className="header-nav-wrapper header-nav-wrapper-lg rounded navbar-light">
                <div className="app-nav-logo flex-grow-0 app-nav-logo--dark mr-3">
                    <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        title="Bamburgh React Admin Dashboard with Material-UI PRO"
                        className="app-nav-logo"
                    >
                        <div className="app-nav-logo--icon rounded-circle">
                            <img
                                alt="Bamburgh React Admin Dashboard with Material-UI PRO"
                                src={logo}
                            />
                        </div>
                        <div className="app-nav-logo--text">
                            <span>General</span>

                            <b>bamburgh</b>
                        </div>
                    </a>
                </div>
                <div className="header-nav-menu flex-grow-0 ml-auto d-none d-lg-block">
                    <ul className="d-flex justify-content-center">
                        <li>
                            <a
                                className="font-size-sm text-uppercase font-weight-bold rounded-pill"
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                            >
                                Pages
                            </a>
                        </li>
                        <li>
                            <a
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="rounded-pill font-size-sm text-uppercase font-weight-bold"
                            >
                                Landings
                                <span className="opacity-5 dropdown-arrow">
                                    {/* <FontAwesomeIcon icon={['fas', 'angle-down']}/> */}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="header-nav-actions ml-auto ml-xl-4 flex-grow-0">
                    <span className="d-none d-lg-block">
                        <Button aria-controls="simple-menu" className="btn-outline-primary m-2" variant="contained" aria-haspopup="true" onClick={handleClick}>
                                {userData ? userData.user : "Login"}
                        </Button>
                        <Menu
                            id="simple-menu2"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            classes={{ list: 'p-0' }}

                        >
                            <div className="p-3">
                            <MenuItem className="pr-5 px-3 text-dark" onClick={handleClose}>Profile</MenuItem>
                            <MenuItem className="pr-5 px-3 text-dark" onClick={handleClose}>My account</MenuItem>
                            <MenuItem className="pr-5 px-3 text-danger" onClick={singOut}>Logout</MenuItem>
                            </div>
                        </Menu>
                    </span>
                    <span className="d-block d-lg-none">
                        <button
                            onClick={toggle}
                            className={clsx("navbar-toggler hamburger hamburger--elastic", {
                                "is-active": collapse,
                            })}
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner" />
                            </span>
                        </button>
                    </span>
                </div>
                <div className="d-flex d-lg-none">
                    <Collapse
                        in={collapse}
                        className="nav-collapsed-wrapper bg-second shadow-xxl navbar-collapse"
                    >
                        <div className="nav-inner-wrapper">
                            <Button
                                onClick={toggle}
                                className="btn-danger btn-icon d-40 shadow-sm hover-scale-lg btn-animated-icon-sm nav-toggle-inner-btn p-0"
                            >
                                <span className="btn-wrapper--icon">
                                    {/* <FontAwesomeIcon icon={['fas', 'times']}/> */}
                                </span>
                            </Button>

                            <List
                                component="div"
                                className="nav-pills nav-transparent nav-lg flex-column p-3"
                            >
                                <ListItem
                                    component="a"
                                    button
                                    href="#/"
                                    onClick={(e) => e.preventDefault()}
                                    className="px-4 d-flex align-items-center text-white-50"
                                >
                                    <span>Courses</span>
                                    {/* <FontAwesomeIcon icon={['fas', 'angle-right']} className="opacity-6 ml-auto"/> */}
                                </ListItem>
                            </List>
                        </div>
                    </Collapse>
                </div>
            </div>
            <div
                className={clsx("collapse-page-trigger", { "is-active": collapse })}
                onClick={toggle}
            />
        </>
    );
};
