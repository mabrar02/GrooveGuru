import React, { useEffect, useState } from "react"
import useAuth from "../components/useAuth"

const Home = ({code}) => {

    const [displayName, setDisplayName] = useState();
    const accessToken = useAuth(code)
    

    useEffect(() => {
        console.log(accessToken);
        fetch(`http://localhost:5000/profile/info?token=${accessToken}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(!data.error){
                setDisplayName(data.display_name);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, [accessToken]);

    return (
        <div className="home">
            <h1>Display Name: {displayName}</h1>
        </div>


    )
}

export default Home;