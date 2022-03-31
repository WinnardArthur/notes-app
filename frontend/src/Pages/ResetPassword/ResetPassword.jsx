import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import './resetPassword.css';
import queryString from 'query-string';
import axios from 'axios';

const baseUrl = '/api/users'

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalidUser, setInvalidUser] = useState('');
    const [message, setMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null)

    const location = useLocation()

    const {token, id} = queryString.parse(location.search)

    const verifyToken = async () => {
        try {
            const { data } = await axios(`${baseUrl}/verify-token?token=${token}&id=${id}`)

        } catch (error) {
            if(error?.response?.data) {
                const {data} = error.response;
                if(!data.success) return setInvalidUser(data.message)
                return console.log(error.response.data);
            }
            console.log(error)
        }
    }


    useEffect(() => {
        verifyToken();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
            setTimeout(() => {
                setMessage(null)
            }, 3000);
        }
        
        try {
            const { data } = await axios.post(`${baseUrl}/reset-password?token=${token}&id=${id}`, { password })

            if (data.success) {
                setSuccessMessage(data.message)
                setTimeout(() => {
                    window.location.replace('/login')
                }, 5000);
            }
        } catch (error) {
            if(error?.response?.data) {
                const {data} = error.response;
                if(!data.success) return setMessage(data.message)
                return console.log(error.response.data);
            }
            console.log(error)
        }

    }

    if(invalidUser) return (
        <div>
            <Alert type='error' message={invalidUser}/>
        </div>
    )

  return (
        <div className="login">
            {message && <Alert type="error" message={message}/> }
            {successMessage && <Alert type="success" message={successMessage}/> }
            {/* {loading && <h1>Loading...</h1>} */}
            <h1>Reset Password</h1>
            <form onSubmit = {handleSubmit}>
                <div className="group">
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="group">
                    <label>Confirm Password</label>
                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <button>Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
