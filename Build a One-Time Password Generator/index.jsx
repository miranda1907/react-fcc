const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {

  const [otp, setOtp] = useState('');
  const [time, setTime] = useState(0);

  const timeRef = useRef(null);

  const handleClick = () => {
    const newOtp = Math.floor(Math.random() * 899999) + 100000; 
    setOtp(newOtp);
    setTime(5); 
  }

  useEffect(()=>{
    if (time <= 0) {
      clearInterval(timeRef.current);
      timeRef.current = null;
      return;
    }

    if (!timeRef.current) {
      timeRef.current = setInterval(() => {
        setTime((previous) => previous - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timeRef.current);
      timeRef.current= null;
    }
  }, [time]);

  
  return <div className="container">

  <h1 id="otp-title">OTP Generator</h1>

  <h2 id="otp-display">{otp ? otp : "Click 'Generate OTP' to get a code"}</h2>

  <button onClick={handleClick} id="generate-otp-button" disabled={time > 0}>Generate OTP</button>

    <p id="otp-timer" aria-live="polite">
  {
    otp ? time > 0 ? `Expires in: ${time} seconds` : 'OTP expired. Click the button to generate a new OTP.' : '' 
  }
  </p>
  
  </div>
};
