import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import './register.css';
import { registerUser } from '../../Redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Register = ({setUserId}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [message, setMessage] = useState(null)
    const [picMessage, setPicMessage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const RegisterUser  = useSelector((state) => state.user) 
    const { loading, userRegister, error } = RegisterUser;
    const { userInfo } = useSelector((state) => state.user.userLogin)


    const postDetails = async (pics) => {
        if (
            pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            ) {
                return setPicMessage("Please Select an Image")
            }
            setPicMessage(null);

            if (pics && (pics.type === 'image/jpeg' || pics.type === 'image/png')) {
                const data = new FormData();
                data.append("file", pics);

                try {
                    const response = await axios.post("/api/upload", data)
                    setPic(response.data.filename)
                } catch (err) {
                    console.log(err)
                }

            } else {
                return setPicMessage("Please Select an Image");
            }
    }
    
    useEffect(() => {
        if (userInfo) {
            navigate('/login')
        }
        // if (userRegister) {
        //     setUserId(userRegister._id)
        // }
        
    }, [navigate, userInfo, userRegister])


    const handleRegister = async (e) => {
        e.preventDefault()

        let user = {name, email, password, pic}

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
            // TESTING.......
            setTimeout(() => {
                setMessage(null)
            }, 3000);
        } else if (password.length <=4 ) {
            setMessage('Password length must be greater than 4')
            setTimeout(() => {
                setMessage(null)
            }, 3000);
        } 
        else {
            registerUser(user, dispatch, navigate)
        }
    }
    
  return (
        <div className="login">

            {error && <Alert type="error" message={error}/>}
            {message && <Alert type="error" message={message}/> }
            {loading && <h1>Loading...</h1>}
            
            <h1>Register</h1>
            <form onSubmit = {handleRegister}>
                <div className="group">
                    <label htmlFor='name'>Username</label>
                    <input type="text" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="group">
                    <label htmlFor='email'>Email:</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="group">
                    <label htmlFor='password'>Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="group">
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>

                {picMessage && <Alert type="error" message={picMessage}/>}
                <div className="group">
                    <label htmlFor='pic'>Profile Pic: <b>(optional)</b></label>
                    <input type="file" onChange={(e) => postDetails(e.target.files[0])}/>
                </div>
                <button>Sign up</button>
            </form>
        </div>
    );
};

export default Register;
