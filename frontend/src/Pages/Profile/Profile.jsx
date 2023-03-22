import './profile.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateUser } from '../../Redux/apiCalls';
import Alert from '../../components/Alert/Alert';
import axios from 'axios';

const SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://notes-app-n5dd.onrender.com/uploads/' : 'http://localhost:5000/uploads/'

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [picMessage, setPicMessage] = useState(null)
    const [message, setMessage] = useState('');
    const [active, setActive] = useState(true);

    const dispatch = useDispatch()

    const { userLogin } = useSelector(state => state.user)
    const { userInfo, loading, error } = userLogin;

    const userUpdate = useSelector(state => state.user)

    const { success} = userUpdate;

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPic(userInfo.pic)

    }, [userInfo])

    const user = { name, email, pic }

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            setMessage("Passwords do not match")
        } else if (password && password.length <= 4) {
            setMessage("Password should be greater than 4")
        } else {
            updateUser(userInfo, user, dispatch)
        }

        setTimeout(() => {
            setActive(false)
        }, 3000)

        clearTimeout(setActive(true))
    }

    const postDetails = async (pics) => {
        setPicMessage(null);

        console.log('pics', pics)
        if(pics && (pics.type === 'image/jpeg' || pics.type === 'image/png')) {
            const data = new FormData();
            data.append("file", pics)

            const response = await axios.post('/api/upload', data)
            console.log('Response', response)
            setPic(response.data.filename)

        } else {
            return setPicMessage("Please Select an Image")
        }
    }

  return (
    <div className="login">
            
            <h1>Update User</h1>
            {loading && <h1>Loading...</h1>}
            {error && active && <Alert type="error" message={error} />}
            {message && active && <Alert type="error" message={message}/>}
            {success && <Alert type="success" message="Profile updated successfully."/>}
            
            <div className='profile'>
                <form onSubmit = {handleUpdateUser}>
                    <div className="group">
                        <label htmlFor='name'>Username</label>
                        <input 
                            type="text" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}    
                        />
                    </div>
                    <div className="group">
                        <label htmlFor='email'>Email:</label>
                        <input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="group">
                        <label htmlFor='password'>Password:</label>
                        <input 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="group">
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    {picMessage && <Alert type="error" message={picMessage}/>}
                    <div className="group">
                        <label htmlFor='pic'>Profile Pic:</label>
                        <input type="file" onChange={(e) => postDetails(e.target.files[0])}/>
                    </div>
                    <button>Update</button>
                </form>
                <div>
                    <img src={SERVER_URL + userInfo.pic} onError={e => e.target.src = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt={userInfo.name} />
                    <p>Profile Image</p>
                </div>
            </div>

        </div>
  )
}

export default Profile