import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from '../../components/Alert/Alert';
import './verification.css';
import axios from 'axios';

const inputs = Array(4).fill('')
let newInputIndex = 0   

const isObjecctValid = (obj) => {
    return Object.values(obj).every(val => val.trim())
}

const Verification = ({  }) => {
    const input = useRef();
    const [OTP, setOTP] = useState({0: '', 1: '', 2: '', 3: ''});
    const [nextInputIndex, setNextInputIndex] = useState(0)
    const [userId, setUserId] = useState(null)
    const [message, setMessage] = useState('')
    const { userRegister } = useSelector(state => state.user)

    const handleChangeText = (text, index) => {
        const newOTP = {...OTP}
        newOTP[index] = text
        setOTP(newOTP)

        const lastInputIndex = inputs.length - 1;

        if (!text) {
            newInputIndex = index === 0 ? 0 : index - 1;
        } else {
            newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
        }

        setNextInputIndex(newInputIndex)
    }

    const navigate = useNavigate();

    const { userLogin } = useSelector((state) => state.user)

    const { loading, error, userInfo } = userLogin;

  console.log('userId', userId)

    useEffect(() => {
        if (userInfo) {
            navigate("/notes")
        }
        if (userRegister) {
            setUserId(userRegister._id)
        }
        input.current.focus()
    },[userInfo, navigate, nextInputIndex])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isObjecctValid(OTP)) {
            let val = '';

            Object.values(OTP).forEach(v => {
                val += v;
            })

            console.log('val', val)

            try {
                const { data } = await axios.post('/api/users/verify-email', {otp: val, userId})
                
                data && window.location.replace('/login')
            } catch (error) {
                if(error?.response?.data) {
                    const { data } = error.response
                    setMessage(data.errorMessage)
                    setTimeout(() => {
                        setMessage(null)    
                    }, 3000);
                }
                console.log(error)
            }
        }



        
    }

  return (
        <div className="login">
            {message && <Alert type='error' message={message}/>}
            {loading && <h1>Loading...</h1>}
            <h3 className='verify-text'>Please verify your email. PIN has been sent to your email.</h3>
            <form onSubmit = {handleSubmit}>
                <div className="otpInputs">
                    {inputs.map((inp, index) => (
                        <div key={index}> 
                            <input 
                                value={OTP[index]}
                                className='otpInp' 
                                type='text' placeholder='0' 
                                onChange={(text) => handleChangeText(text.target.value, index)}
                                ref={nextInputIndex === index ? input : null}
                                
                            />
                        </div>
                    ))}

                </div>
                <button style={button}>Verify</button>
            </form>
        </div>
    );
};

export default Verification;

const button = {
    width: '10rem',
    margin: '4rem 0 0 42.5%'
}