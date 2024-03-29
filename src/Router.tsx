import React, { PropsWithChildren, useEffect } from 'react';
import { Navigate, RouterProvider, Routes } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import useIdentityContext from './Contexts/IdentityContext';
import AutomaticLogin from './Pages/AutomaticLogin';
import Fototeca from './Pages/Fototeca';
import GiftDetail from './Pages/GiftDetail';
import GiftList from './Pages/GiftList';
import GroomsmenManual from './Pages/GroomsmenManual';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Privacy from './Pages/Privacy';
import Help from './Pages/Help';
import History from './Pages/History';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { isLoading, isSignedIn } = useIdentityContext();
    return isLoading ? (
        <div>
            Aguarde
        </div>
    ) : (
        !isSignedIn ? (
            <Navigate to='/' />
        ) : (
            <>
                {children}
            </>
        )
    )
}

const routes = createBrowserRouter([
    { path: "/", element: <Home />, },
    { path: "/:id", element: <AutomaticLogin />, },
    { path: "/gifts", element: <GiftList /> },
    { path: "/gifts/:id", element: <GiftDetail /> },
    // { path: "/manual", element: <ProtectedRoute children={<GroomsmenManual />} /> },
    // { path: "/fototeca", element: <ProtectedRoute children={<Fototeca />} /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/help", element: <Help /> },
    { path: "/history", element: <History /> },
    { path: "/not-found", element: <NotFound /> },
    { path: "*", element: <NotFound /> },
]);

const Router = () => {
    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}

export default Router;
