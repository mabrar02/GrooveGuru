import React from "react"
import useAuth from "../components/useAuth"

const Home = ({code}) => {

    const accessToken = useAuth(code)
    return (
        <div className="home">
            <h1>{code}</h1>
        </div>


    )
}

export default Home;