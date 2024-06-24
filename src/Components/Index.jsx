import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateRoomModal from './CreateRoomModal'
import EnterRoom from './EnterRoom'
const Index = () => {
    const [modalOpen , setModalOpen] = useState(false)
    const [enterRoomModalOpen , setEnterRoomModalOpen] = useState(false)
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <div className='flex gap-2'>
                <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setModalOpen(true)}>Create Room</button>
                <Link className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setEnterRoomModalOpen(true)}>Enter Room</Link>
                <CreateRoomModal isOpen={modalOpen} setOpen={setModalOpen} />
                <EnterRoom isOpen={enterRoomModalOpen} setOpen={setEnterRoomModalOpen} />
            </div>
        </div>
    )
}

export default Index