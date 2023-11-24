// import { useState } from "react"
import React, {useState} from 'react'
import '../Style/chat.css';
import Wrapper from './Wrapper';
const ChatWindow = () => {
  const [chats, addChats] = useState([{seq_id: 1, parent: 0, agent_locale: "en", customet_locale: "fr", text: "Hello !!", neutralized_text: 'Bonjour !!', isCustomer: true},{seq_id: 1, parent: 0, agent_locale: "en", customet_locale: "fr", text: "how can help you", neutralized_text: 'Somethinng in fr language', isCustomer: false}])
  return (
    <div>
    <div className='customer-Id'>Customer Id</div>
    <Wrapper >
    {chats.map(item => {
        return <>{item.isCustomer ? <div className='chat-layout customer-chat-layout'>
          <div>Customer Locale: {item.customet_locale}</div>
          <div>Customer Text: {item.text}</div>
          <div>Agent Locale: {item.agent_locale}</div>
          <div>neutralized Text: {item.neutralized_text}</div>
        </div> : <div className='agent-chat-layout chat-layout'>
        <div style={{display: 'block'}}>Agent Locale: {item.agent_locale}</div>
          <div>Agent Text: {item.text}</div>
          <div>Customer Locale: {item.customet_locale}</div>
          <div>neutralized Text: {item.neutralized_text}</div>
        </div>}</>
      })}
    </Wrapper>
    </div>
  )
}

export default ChatWindow;
