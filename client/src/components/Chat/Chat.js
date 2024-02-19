import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { allUsersRoute, decodeUserToken } from '../../helper/helper';
import Contacts from '../Contacts/Contacts';
import Welcome from '../Welcome/Welcome';
import ChatContainer from '../ChatContainer/ChatContainer';
const Chat = () => {
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        }
        async function fetchData() {
            const user = await decodeUserToken()
            const allUser = await allUsersRoute(user.userId)
            return allUser

        }

        return (() => {
            fetchData().then((response) => {

                setCurrentUser(response.data.loginusers)
                setContacts(response.data.users)
                setIsLoaded(true)
            }).catch((err) => {
                toast.error(err)
            })

        })

    }, [])
    useEffect(() => {
        if (currentUser) {
            if (!currentUser.isAvatarImageSet) {
                navigate('/setAvatar')
            }
        }
    }, [currentUser])
    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }
    return (
        <>
            <div className='chat-container'>
                <div className='chat-container-content'>
                    <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                    {isLoaded && currentChat === undefined ? <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} />}


                </div>

            </div>
        </>
    )
}

export default Chat