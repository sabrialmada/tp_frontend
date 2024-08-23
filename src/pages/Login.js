import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from '../components/Form';
import Header from '../components/Header';  

const Login = ({setUser, setWorkspaces, user}) =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
    const storedUser = existingUsers[email];

    if(storedUser && storedUser.password === btoa(password)){
        setUser({ email });
        localStorage.setItem('loggedInUser', email);

        const userWorkspacesKey = `workspaces_${email}`;
        const userWorkspaces = JSON.parse(localStorage.getItem(userWorkspacesKey)) || [];
        
        console.log('Workspaces loaded for user:', userWorkspaces);
        
        setWorkspaces(userWorkspaces);

        navigate('/');
    }else{
        alert("Invalid email or password");
    }
};

  const handleBack = () =>{
    navigate('/');
  };

  const fields =[
    {id: 'email', label: 'Email', type: 'email', value: email, onChange: (e) => setEmail(e.target.value), required: true},
    {id: 'password', label: 'Password', type: 'password', value: password, onChange: (e) => setPassword(e.target.value), required: true},
  ];

  return(
    <div className="new-workspace-container">
      <Header user={user} setUser={setUser} /> 
      <Form
        title="Login"
        fields={fields}
        onSubmit={handleSubmit}
        onCancel={handleBack}
        submitLabel="Login"
        cancelLabel="Back"
      />
    </div>
  );
};

export default Login;
