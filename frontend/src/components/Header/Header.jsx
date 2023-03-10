import './header.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Redux/apiCalls';

const Header = ({ setSearch }) => {
    const SERVER_URL = 'https://notes-app-n5dd.onrender.com/uploads/'
    const dispatch = useDispatch();

    const { userLogin } = useSelector(state => state.user);

    const { userInfo } = userLogin;

    const handleLogout = () => {
        logoutUser(dispatch);
    }

    useEffect(() => {}, [userInfo])

    return (
        <div className="header">
            <div>
                <Link to="/" className="link">Notes App</Link>
            </div>
            <div className="headerRight">
                <div className="headerRightLinks">
                {userInfo && 
                    <>
                    <Link to="/notes" className="link">All Notes</Link>
                    <Link to="/createnote" className="link">New Note</Link>
                    <div style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</div>  
                    <Link to="/profile" className="link">
                        {
                            <img src={SERVER_URL + userInfo.pic} onError={e => e.target.src = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt={userInfo.name} />
                        }
                    </Link>
                    </>
                }
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Search" 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
};

export default Header;
