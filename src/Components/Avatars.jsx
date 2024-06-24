import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const getRandomColor = () => {
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const Avatars = ({ avatarStrings }) => {
    return (
        <div>
            <Avatar.Group
                max={{
                    count: 2,
                    style: {
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                    },
                }}
            >
                {avatarStrings.map((avatarString, index) => (
                    <Tooltip key={index} title={avatarString} placement="top">
                        <Avatar
                            style={{
                                backgroundColor: getRandomColor(),
                            }}
                            icon={<UserOutlined />}
                        >
                            {avatarString.charAt(0).toUpperCase()}
                        </Avatar>
                    </Tooltip>
                ))}
            </Avatar.Group>
        </div>
    );
};

export default Avatars;
