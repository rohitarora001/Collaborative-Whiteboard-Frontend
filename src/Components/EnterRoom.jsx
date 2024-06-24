import React, { useState } from 'react'
import { Modal, Button } from 'antd';

const EnterRoom = ({ isOpen, setOpen, setName }) => {
    const [link, setLink] = useState('')
    function handleNavigate() {
        setOpen(false)
        window.location.href = link
    }
    return (
        <>
            <Modal
                title={
                    <div
                        style={{
                            width: '100%',
                        }}
                    >
                        Enter Room
                    </div>
                }
                open={isOpen}
                onCancel={() => setOpen(false)}
                footer={(_) => (
                    <>
                        <Button onClick={() => handleNavigate()} type="primary" style={{ background: "#22C55E" }} iconPosition={'end'}>
                            Enter
                        </Button>
                    </>
                )}
            >
                <div>
                    <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your room url</label>
                    <input type="url" name="url" id="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Your room url" onChange={(e) => setLink(e.target.value)} />
                </div>
            </Modal>
        </>
    );
}

export default EnterRoom