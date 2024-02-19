import React, { useEffect, useState } from 'react'
import './ChatContainer.css'
import Logout from '../Logout/Logout'
import ChatInput from '../ChatInput/ChatInput'
import Message from '../Message/Message'
import { getMsgRoute, sendMsgRoute } from '../../helper/helper'

const ChatContainer = ({ currentChat, currentUser }) => {
    const [messages, setMessages] = useState([])
    const handleSendMsg = async (msg) => {
        if (currentChat && currentUser) {

            let senderData = {
                from: currentUser.id,
                to: currentChat.id,
                message: msg
            }
            await sendMsgRoute(senderData)
        }
    }
    useEffect(() => {
        if (currentChat && currentUser) {
            async function fetchInfo() {

                // if (currentChat && currentUser) {
                let senderInfo = {
                    from: currentUser.id,
                    to: currentChat.id
                }
                const messageRoutes = await getMsgRoute(senderInfo)
                return messageRoutes
                // }
            }
            return () => {
                fetchInfo().then((response) => {
                    setMessages(response.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }, [currentChat])
    return (
        <>
            {
                currentChat && (
                    <div className='chat-message-container'>
                        <div className='chat-header'>
                            <div className='user-details'>
                                <div className='avatar'>
                                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
                                </div>
                                <div className='username'>
                                    <h3>{currentChat.username}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        {/* <Message /> */}
                        <div className='chat-messages'>

                            {
                                messages.map((message) => {
                                    return (
                                        <div>
                                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                                <div className='content'>
                                                    <p>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }



                        </div>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </div>
                )
            }
        </>
    )
}

export default ChatContainer