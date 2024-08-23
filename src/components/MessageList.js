import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map(message => (
                <p key={message.id}>{message.title}</p>
            ))}
        </div>
    );
};

export default MessageList;
