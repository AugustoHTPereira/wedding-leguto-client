import { useToast } from '@chakra-ui/react';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { DefaultToast } from '../Contracts/ToastContract';
import api from '../Services/API';

export interface SigninParams {
    code: string,
}

export interface IdentityContextType {
    id: number, 
    type: string,
    code: string,
    accessToken: string,
    name: string,
    isSignedIn: boolean,
    isLoading: boolean,

    signin: (params: SigninParams) => Promise<void>,
    signout: () => void
}

const INITIAL_CONTEXT = {} as IdentityContextType;

const IdentityContext = createContext<IdentityContextType>(INITIAL_CONTEXT);

const useIdentityContext = () => {
    const context = useContext(IdentityContext);
    return context;
}

export const IdentityContextProvider = ({ children }: PropsWithChildren) => {
    const [code, setCode] = useState<string>("");
    const [id, setId] = useState<number>(0);
    const [type, setType] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleSignin = async ({ code }: SigninParams) => {
        setIsLoading(true);
        try {
            const authResponse = await api.post("/guest/login", { code });
            if (authResponse.status != 200)
                return;

            const { 'access_token': token } = authResponse.data;
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            localStorage.setItem("leguto.identity.access_token", token);
            setAccessToken(token);
            setCode(code);
            
            const identityResponse = await api.get("/guest/" + code, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (identityResponse.status != 200)
                return;
    
            const {
                id, name, type,
            } = identityResponse.data;
    
            setName(name);
            setId(id);
            setType(type);
    
            localStorage.setItem("leguto.identity.data", JSON.stringify(identityResponse.data));
        } catch (error) {
            alert("Código inexistente")
        } finally {
            setIsLoading(false);
        }
    }

    const handleSignout = () => {
        localStorage.clear();
        setName("");
        setId(0);
        setType("");
        setAccessToken("");
        setIsSignedIn(false);
        setCode("")
    }

    useEffect(() => {
        setIsLoading(true);

        try {
            // const {
            //     "leguto.identity.data": data,
            //     "leguto.identity.access_token": accessToken,
            // } = parseCookies(undefined);

            const data = localStorage.getItem("leguto.identity.data");
            const accessToken = localStorage.getItem("leguto.identity.access_token");
            
            if(!!data && !!accessToken) {
                const { id, name, code, type } = JSON.parse(data);
                setIsSignedIn(true);
                setAccessToken(accessToken);
                setId(id);
                setName(name);
                setCode(code);
                setType(type);
            }
        } 
        finally {
            setIsLoading(false);
        }

    }, []);

    return (
        <IdentityContext.Provider value={{
            id,
            type,
            accessToken,
            code,
            name,
            isSignedIn,
            isLoading,
            signin: handleSignin,
            signout: handleSignout,
        }}>
            {children}
        </IdentityContext.Provider>
    )
}

export default useIdentityContext;