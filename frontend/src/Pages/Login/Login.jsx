import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/Alert/Alert';
import { loginUser } from '../../Redux/apiCalls';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useNavigate();

    const { userLogin } = useSelector((state) => state.user)
    console.log('UserLogin', userLogin)
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history("/notes")
        }
    },[userInfo, history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        loginUser({email, password}, dispatch)
    }
  return (
        <div className="login">
            {error && <Alert type='error' message={error}/>}
            {loading && <h1>Loading...</h1>}
            <h1>Login</h1>
            <form onSubmit = {handleSubmit}>
                <div className="group">
                    <label htmlFor='email'>Email:</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="group">
                    <label htmlFor='password'>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button>Login</button>
                <Link className='forgotPassword' to="/forgot-password">Forgot Password</Link>
            </form>
        </div>
    );
};

export default Login;
