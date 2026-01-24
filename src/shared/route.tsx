import * as React from 'react';
import {useRoutes, setPath} from 'hookrouter';
import Home from '../components/home';
import Game from '../components/game';
import NoPageFound from './nopagefound';
import Autthenticaton from '../components/authentication';
import Dashboard from '../components/dashboard';
import Basic from '../components/randoms/basic';

const unauthenticatedRoutes = {
    '/': () => <Home/>,
    '/login': () => <Autthenticaton/>,
    '/logout': () => <Autthenticaton />,
    '/registration': () => <Autthenticaton />,
    '/resetpassword': () => <Autthenticaton />,
    '/forgotpassword': () => <Autthenticaton />,
    '/emailconfirmation': () => <Autthenticaton />,
    '/basic': () => <Basic />
}

export const UnauthenticatedRoutes = () => {
    const routePages = useRoutes(unauthenticatedRoutes);
    return (routePages || <NoPageFound/>);
}

const authenticatedRoutes = {
    '/': () => <Dashboard/>,
    '/game': () => <Game />
}

export const AuthenticatedRoutes = () => {
    const routePages = useRoutes(authenticatedRoutes);
    setPath(window.location.pathname);
    return (routePages || <NoPageFound/>);
}