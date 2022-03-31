import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import axios from 'axios';

const baseUrl = '/api/users';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const location = useLocation()


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const { data } = await axios.post(`${baseUrl}/forgot-password`, { email })

            if (data.success) {
                setSuccessMessage(data.message)

                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000);
            }
        } catch (error) {
            if(error?.response?.data) {
                const {data} = error.response;
                if(!data.success) setMessage(data.message)
                setTimeout(() => {
                    setMessage(null)
                }, 5000);
            }
            console.log(error)
        }

    }

  return (
        <div className="login">
            {message && <Alert type="error" message={message}/> }
            {successMessage && <Alert type="success" message={successMessage}/> }
            {/* {loading && <h1>Loading...</h1>} */}
            <h1>Provide your email</h1>
            <form onSubmit = {handleSubmit}>
                <div className="group">
                    <label>Email</label>
                    <input
                        type="email" 
                        placeholder="example@gmail.com" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button>Send Link</button>
            </form>
            <Link to="/register" style={styles}>Sign Up</Link>
            <Link to="/login" style={styles}>Log in</Link>
        </div>
    );
};

export default ForgotPassword;


const styles = {
    textDecoration: 'none',
    color: 'black',
    fontWeight: 600,
    marginRight: '5rem',
    marginTop: '1.5rem',
    display: 'inline-block',
    fontSize: '1.2rem'
}