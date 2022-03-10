import "./homePage.css";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector } from "react-redux";


const Homepage = () => {
    const { userLogin } = useSelector(state => state.user);

    const { userInfo } = userLogin;
    
    // const userInfo = localStorage.getItem('userInfo')
    // console.log('userInfo', userInfo)

    // useEffect(() => {
    //     const userInfo = localStorage.getItem('userInfo')
    //     console.log(userInfo)
    //     if (userInfo) {
    //         window.location.replace('/notes')
    //     }
    // }, [userInfo])
    
    return (
        <div className="homePage">
            <div className="mainPage">
                <div className="mainPageContainer">
                    <h1>Welcome {userInfo && userInfo.name}</h1>
                    <p>Begin Writing your notes...</p>

                    {!userInfo ? 
                        <div className="homePageButtons">
                            <Link className="link" to = "/login">Login</Link>
                            <Link className="link" to = "/register">Signup</Link>
                        </div>
                        :
                        <div className="homePageButtons">
                            <Link className="link" to = "/createnote">Create Note</Link>
                        </div>
                    
                    }
                </div>
            </div>
        </div>
    )
}

export default Homepage
