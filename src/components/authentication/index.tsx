import React from 'react';
import { usePath } from 'hookrouter';
import { Card, Container } from '@material-ui/core';
import Registration from './registration';
import Login from './login';
import Logout from './logout';
import ResetPassword from './resetpassword';
import ForgotPassword from './forgotpassword';
import EmailConfirmation from './emaillconfirmation';

import hero3 from '../../assets/images/hero-bg/hero-5.jpg';
import hero6 from '../../assets/images/hero-bg/hero-1.jpg';


const Layout = () => {
    const currentPath = usePath().replace("/", "");

    const findBg = (path: string) => {
        switch (path) {
            case "emailconfirmation":
                return hero6;
            case "forgotpassword":
                return hero6;
            case "login":
                return hero6;
            case "resetpassword":
                return hero3;
            case "registration":
                return hero3;
        }
    }

    const containerSize = () => {
        switch (currentPath) {
            case 'registration':
                return 'md';
            default:
                return 'sm';
        }
    }

    return (
        <>
            <div className="app-wrapper min-vh-100 bg-white">
                <div className="hero-wrapper w-100 bg-composed-wrapper bg-light-pure min-vh-100">
                    <div className="flex-grow-1 w-100 d-flex align-items-center">
                        <div
                            className="bg-composed-wrapper--image opacity-6"
                            style={{ backgroundImage: 'url(' + findBg(currentPath) + ')' }}
                        />
                        <div className="bg-composed-wrapper--bg bg-second opacity-7" />
                        <div className="bg-composed-wrapper--bg bg-premium-dark opacity-5" />
                        <div className="bg-composed-wrapper--content p-3 p-md-5">
                            <Container maxWidth={containerSize()}>
                                <Card className="rounded-sm modal-content p-3 bg-white-10">
                                    <Card className="rounded-sm shadow-none font-size-sm p-3 p-sm-0">
                                        {
                                            (currentPath === "emailconfirmation" && <EmailConfirmation />) ||
                                            (currentPath === "forgotpassword" && <ForgotPassword />) ||
                                            (currentPath === "login" && <Login />) ||
                                            (currentPath === "logout" && <Logout />) ||
                                            (currentPath === "registration" && <Registration />) ||
                                            (currentPath === "resetpassword" && <ResetPassword />)
                                        }

                                    </Card>
                                </Card>
                            </Container>
                        </div>
                    </div>
                    <div className="hero-footer w-100 pb-4">
                        <Container>
                            <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
                                <div className="text-center d-block mb-3 mb-md-0 text-white">
                                    Copyright © 2022 Babify, Inc. All rights reserved.
                                </div>
                                {/*<List
                                component="div"
                                className="nav-transparent text-nowrap d-flex justify-content-center">
                                <ListItem
                                    button
                                    className="text-white-50"
                                    href="#/"
                                    onClick={(e:any) => e.preventDefault()}>
                                    Privacy Policy
                                </ListItem>
                                <ListItem
                                    button
                                    className="text-white-50"
                                    href="#/"
                                    onClick={(e:any) => e.preventDefault()}>
                                    Terms of Service
                                </ListItem>
                                </List>*/}
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;