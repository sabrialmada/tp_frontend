import React from 'react';
import {Link, useNavigate} from 'react-router-dom'; 
import './Home.css';
import Header from '../components/Header';

const createUrlFriendlyName = (name) =>{
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const Home = ({workspaces, user, setUser, setWorkspaces}) =>{
  const navigate = useNavigate();

  const handleWorkspaceClick = (workspaceName) =>{
    if(!user){
      alert("You must be logged in to open or create a workspace");
      navigate('/login');
    }else{
      navigate(`/workspace/${createUrlFriendlyName(workspaceName)}`);
    }
  };

  const handleCreateWorkspaceClick = (e) =>{
    if(!user){
      e.preventDefault();
      alert("You must be logged in to create a workspace");
      navigate('/login');
    }
  };

  return(
    <div className="home-container">
      <Header user={user} setUser={setUser} setWorkspaces={setWorkspaces} />
      <div className="content">
        <h1>Welcome to CONNEX</h1>
        <div className="workspaces">
          <h2>Workspaces</h2>
          {workspaces.map((workspace) =>(
            <div
              className="workspace-item"
              key={workspace.id}
              onClick={() => handleWorkspaceClick(workspace.name)}
            >
              <span>{workspace.name}</span>
              <button className="open-button">
                Open
              </button>
            </div>
          ))}
          <Link
            to="/workspace/new"
            className="create-workspace-button"
            onClick={handleCreateWorkspaceClick}
          >
            Create Workspace
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
