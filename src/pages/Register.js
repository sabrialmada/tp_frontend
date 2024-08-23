import React, {useState} from 'react';
import Form from '../components/Form';
import Header from '../components/Header';  
import {useNavigate} from 'react-router-dom';

const Register = ({setUser, user}) =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fields =[
    { id: 'email', label: 'Email', type: 'email', value: email, onChange: (e) => setEmail(e.target.value), required: true },
    { id: 'password', label: 'Password', type: 'password', value: password, onChange: (e) => setPassword(e.target.value), required: true },
  ];  

  const handleRegister = (e) =>{
    e.preventDefault();
    const userCredentials = {
      email: email,
      password: btoa(password),
    };
  
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
  
    existingUsers[email] = userCredentials;
    
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    setUser({ email });
    localStorage.setItem('loggedInUser', email);
    navigate('/');
  };

  const handleCancel = () =>{
    navigate('/');
  };

  return(
    <div className="register-container">
      <Header user={user} setUser={setUser} /> 
      <Form
        title="Register"
        fields={fields}
        onSubmit={handleRegister}
        onCancel={handleCancel}
        submitLabel="Register"
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default Register;
