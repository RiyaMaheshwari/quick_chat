import React, { useState } from 'react'
import UsersList from '../components/usersList'
import ChatContaner from '../components/chatContaner'
import RightPanel from '../components/rightPanel'

const Home = () => {
    const [selectedUser, setSelectedUser] = useState(false);
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
        <div className={`backdrop-blur-3xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
            <UsersList selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <ChatContaner selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <RightPanel selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        </div>

    </div>
  )
}

export default Home