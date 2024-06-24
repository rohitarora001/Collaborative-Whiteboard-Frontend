import React, { useState } from 'react'
import { Modal, Button } from 'antd';
import axios from '../axios'

const CreateRoomModal = ({ isOpen, setOpen }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState('');
    const [roomId, setRoomId] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        const response = await axios.post('/create-room', { roomName: name })
        setRoomId(response.data._id)
        setLoading(false);
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.href}room?id=${roomId}`).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        });
    };
    const handleClose = () => {
        setRoomId(false)
        setCopied(false)
        setLoading(false)
        setOpen(false)
        setName('')
    }
    return (
        <>
            <Modal
                title={
                    !roomId ?
                        <div
                            style={{
                                width: '100%',
                            }}
                        >
                            Create room
                        </div> : <div
                            style={{
                                width: '100%',
                            }}
                        >
                            Copy room url
                        </div>
                }
                open={isOpen}
                onCancel={() => handleClose()}
                footer={(_) => (
                    <>
                        {!roomId ? (
                            !loading ?
                                <Button disabled={!name} onClick={() => handleCreate()} type="primary" style={{ background: "#22C55E" }} iconPosition={'end'}>
                                    Create room
                                </Button> :
                                <Button type="primary" style={{ background: "#22C55E" }} loading iconPosition={'end'}>
                                    Creating room
                                </Button>
                        ) : (
                            <div className="rounded-lg flex items-center gap-3">
                                <span className="font-small gap-2">{`${window.location.href}room?id=${roomId}`}</span>
                                <button
                                    onClick={handleCopy}
                                    className={`px-4 py-1 rounded text-white ${copied ? 'bg-green-500' : 'bg-blue-500'}`}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        )
                        }
                    </>
                )}
            >
                {!roomId &&
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room name</label>
                        <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Room name" onChange={(e) => setName(e.target.value)} />
                    </div>
                }
            </Modal>
        </>
    );
}

export default CreateRoomModal