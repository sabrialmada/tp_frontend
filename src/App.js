import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useParams} from 'react-router-dom';
import Home from './pages/Home';
import NewWorkspace from './pages/NewWorkspace';
import Workspace from './pages/Workspace';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

const RedirectToGeneralChannel = () =>{
  const { workspace_name } = useParams();
  return <Navigate to={`/workspace/${workspace_name}/general`} replace />;
};

const App = () =>{
  const [workspaces, setWorkspaces] = useState([]);
  const [user, setUser] = useState(null);
  
  const addWorkspace = (workspaceName, channelName) =>{
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser) return;
  
    const userWorkspacesKey = `workspaces_${loggedInUser}`;
    const userWorkspaces = JSON.parse(localStorage.getItem(userWorkspacesKey)) || [];
  
    const newWorkspace ={
      id: userWorkspaces.length + 1,
      name: workspaceName,
      channels: ['general'],
    };
    if(channelName.trim() && channelName !== 'general'){
      newWorkspace.channels.push(channelName.trim());
    }
  
    const updatedWorkspaces = [...userWorkspaces, newWorkspace];
    localStorage.setItem(userWorkspacesKey, JSON.stringify(updatedWorkspaces));
    setWorkspaces(updatedWorkspaces);
  };

  const addChannelToWorkspace = (workspaceId, channelName) =>{
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser) return;
  
    const userWorkspacesKey = `workspaces_${loggedInUser}`;
    const userWorkspaces = JSON.parse(localStorage.getItem(userWorkspacesKey)) || [];
  
    const updatedWorkspaces = userWorkspaces.map(workspace =>
      workspace.id === workspaceId
        ? {...workspace, channels: [...workspace.channels, channelName]}
        : workspace
    );
  
    localStorage.setItem(userWorkspacesKey, JSON.stringify(updatedWorkspaces));
    setWorkspaces(updatedWorkspaces);
  };
  
  useEffect(() =>{
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(loggedInUser){
        setUser({email: loggedInUser});

        const userWorkspacesKey = `workspaces_${loggedInUser}`;
        const userWorkspaces = JSON.parse(localStorage.getItem(userWorkspacesKey)) || [];
        
        console.log('Loaded workspaces on login:', userWorkspaces);
        
        setWorkspaces(userWorkspaces);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Home workspaces={workspaces} user={user} setUser={setUser} setWorkspaces={setWorkspaces} />} 
        />
        <Route 
          path="/workspace/new" 
          element={<NewWorkspace addWorkspace={addWorkspace} />} 
        />
        <Route 
          path="/workspace/:workspace_name" 
          element={<RedirectToGeneralChannel />} 
        />
        <Route 
          path="/workspace/:workspace_name/:channel_name" 
          element={<Workspace workspaces={workspaces} addChannel={addChannelToWorkspace} />} 
        />
        <Route 
          path="/login" 
          element={<Login setUser={setUser} setWorkspaces={setWorkspaces} />} 
        />
        <Route 
          path="/register" 
          element={<Register setUser={setUser} setWorkspaces={setWorkspaces} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
