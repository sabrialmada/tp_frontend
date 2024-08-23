import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from '../components/Form';

const NewWorkspace = ({addWorkspace}) =>{
    const [workspaceName, setWorkspaceName] = useState('');
    const [channelName, setChannelName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
            if(workspaceName.trim()){
                addWorkspace(workspaceName, channelName);
                navigate(`/workspace/${workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/general`);
            }
        };

    const handleCancel = () =>{
        navigate('/');
    };

    const fields =[
        {id: 'workspaceName', label: 'Workspace Name', value: workspaceName, onChange: (e) => setWorkspaceName(e.target.value), required: true},
        {id: 'channelName', label: 'Additional Channel Name (optional)', value: channelName, onChange: (e) => setChannelName(e.target.value)},
    ];

    return(
        <Form
            title="Add New Workspace"
            fields={fields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Create Workspace"
            cancelLabel="Cancel"
        />
    );
};

export default NewWorkspace;
