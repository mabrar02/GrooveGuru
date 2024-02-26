import React, { useEffect, useState } from 'react'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/auth/login?code=${code}`, {})
        .then((res) => res.json())
        .then((data) => {
            if(!data.error){
                console.log('update variables');
                setAccessToken(data.access_token);
                setRefreshToken(data.refresh_token);
                setExpiresIn(data.expires_in);
            }
            window.history.pushState({}, null, "/");
        })
        .catch(() => {
            window.location  = "/";
        });
    }, [code]);

    useEffect(() => {
        console.log("expires in " + expiresIn + "\nrefresh: " + refreshToken);
        if(!refreshToken || !expiresIn) return;
        const interval = setInterval(() => {
            fetch(`http://localhost:5000/auth/refresh?refresh_token=${refreshToken}`, {})
            .then((res) => res.json())
            .then((data) => {
                if(!data.error){
                    console.log('update variables');
                    setAccessToken(data.access_token);
                    setExpiresIn(data.expires_in);
                }
            })
            .catch(() => {
                window.location  = "/";
            });
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken
}
