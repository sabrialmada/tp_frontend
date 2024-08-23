import React, {useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import './Workspace.css';

const createUrlFriendlyName = (name) =>{
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const Workspace = ({workspaces, addChannel}) =>{
  const {workspace_name, channel_name} = useParams();
  const navigate = useNavigate();
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const workspace = workspaces.find(
    (ws) => createUrlFriendlyName(ws.name) === workspace_name
  );

  if(!workspace){
    return <div>Workspace not found</div>;
  }

  const handleCreateChannel = () =>{
    if(newChannelName.trim() !== ''){
      addChannel(workspace.id, newChannelName.trim());
      setNewChannelName('');
      setIsCreatingChannel(false);
      navigate(`/workspace/${workspace_name}/${createUrlFriendlyName(newChannelName.trim())}`);
    }
  };

  const handleCancelCreateChannel = () =>{
    setNewChannelName('');
    setIsCreatingChannel(false);
  };

  const selectedChannel = channel_name || 'general';

  return(
    <div className="workspace-container">
      <header>
        <h1>{workspace.name}</h1>
        <button
          className="dropdown-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <i className="bi bi-list"></i>
        </button>
        <button className="exit-button" onClick={() => navigate('/')}>
          Exit
        </button>
      </header>

      {showDropdown && (
        <div className="dropdown-channels">
          <h2>Channels</h2>
          <ul className="channels-list">
            {workspace.channels.map((channel, index) => (
              <li
                key={index}
                className={`channel ${
                  selectedChannel === createUrlFriendlyName(channel)
                    ? 'active'
                    : ''
                }`}
              >
                <Link
                  to={`/workspace/${workspace_name}/${createUrlFriendlyName(
                    channel
                  )}`}
                >
                  #{channel}
                </Link>
              </li>
            ))}
          </ul>
          {isCreatingChannel ? (
            <div className="create-channel-form">
              <input
                type="text"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                placeholder="New Channel Name"
              />
              <div className="channel-buttons">
                <button className="check-button" onClick={handleCreateChannel}>
                  <i className="bi bi-check"></i>
                </button>
                <button
                  className="cancel-button"
                  onClick={handleCancelCreateChannel}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            </div>
          ) : (
            <button
              className="create-channel-button"
              onClick={() => setIsCreatingChannel(true)}
            >
              Create Channel
            </button>
          )}
        </div>
      )}

      <section>
        <div className="sidebar">
          <h2>Channels</h2>
          <ul className="channels-list">
            {workspace.channels.map((channel, index) => (
              <li
                key={index}
                className={`channel ${
                  selectedChannel === createUrlFriendlyName(channel)
                    ? 'active'
                    : ''
                }`}
              >
                <Link
                  to={`/workspace/${workspace_name}/${createUrlFriendlyName(
                    channel
                  )}`}
                >
                  #{channel}
                </Link>
              </li>
            ))}
          </ul>
          {isCreatingChannel ? (
            <div className="create-channel-form">
              <input
                type="text"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                placeholder="New Channel Name"
              />
              <div className="channel-buttons">
                <button className="check-button" onClick={handleCreateChannel}>
                  <i className="bi bi-check"></i>
                </button>
                <button
                  className="cancel-button"
                  onClick={handleCancelCreateChannel}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            </div>
          ) : (
            <button
              className="create-channel-button"
              onClick={() => setIsCreatingChannel(true)}
            >
              Create Channel
            </button>
          )}
        </div>
        <div className="chat-section">
          <div className="chat-messages">
            <h2>Chat - #{selectedChannel}</h2>
          </div>
          <div className="chat-input">
            <input
              type="text"
              className="input"
              placeholder="Type a message..."
            />
            <button className="send-button">Send</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workspace;
