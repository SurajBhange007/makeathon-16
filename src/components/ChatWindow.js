// import { useState } from "react"
import React, {useEffect, useRef, useState} from 'react'
import '../Style/chat.css';
import Wrapper from './Wrapper';
const ChatWindow = () => {
  const [chats, addChats] = useState([{seq_id: 1, parent: 0, agent_locale: "en", customet_locale: "fr", text: "Hello !!", neutralized_text: 'Bonjour !!', isCustomer: true, sentiment: 'NEGATIVE'},
  {seq_id: 1, parent: 0, agent_locale: "en", customet_locale: "fr", text: "how can help you", neutralized_text: '1 Somethinng in fr language', isCustomer: false, sentiment: 'POSITIVE'},{seq_id: 1, parent: 0, agent_locale: "en", customet_locale: "fr", text: "Hello !!", neutralized_text: '1 Bonjour !!', isCustomer: true, sentiment: 'NEGATIVE'},
  {seq_id: 1, parent: 0, agent_locale: "en", customet_locale: "fr", text: "how can help you", neutralized_text: '2 Somethinng in fr language', isCustomer: false, sentiment: 'NEUTRAL'},{seq_id: 1, parent: 0, agent_locale: "en", customet_locale: "fr", text: "Hello !!", neutralized_text: '2 Bonjour !!', isCustomer: true, sentiment: 'NEGATIVE'},
  {seq_id: 1, parent: 0, agent_locale: "en", customet_locale: "fr", text: "how can help you", neutralized_text: '3 Somethinng in fr language 3 Somethinng in fr language 3 Somethinng in fr language 3 Somethinng in fr language', isCustomer: false, sentiment: 'POSITIVE'},{seq_id: 1, parent: 0, agent_locale: "en", customet_locale: "fr", text: "Hello !!", neutralized_text: '3 Bonjour !!', isCustomer: true, sentiment: 'NEGATIVE'},
  {seq_id: 1, parent: 0, agent_locale: "en", customet_locale: "fr", text: "how can help you", neutralized_text: '4 Somethinng in fr language', isCustomer: false, sentiment: 'NEUTRAL'}])
  
  const [newChats, setNewChats] = useState([]);
  const [isWaitingforcustomerRes, SetisWaitingforcustomerRes] = useState(0);
  const [isProcessing, setisProcessing] = useState(false)
  // const ref = useRef(null)
  const ref = useRef(null)
      useEffect(() => {
        if (ref.current) {
          ref.current.scrollTop = ref.current.scrollHeight;
          console.log(ref.current.scrollHeight);
        }
          // if (newChats?.length) {
          //   ref.current?.scrollIntoView({
          //     behavior: "smooth",
          //     block: "start",
          //   });
          // }
        }, [newChats]);
  // useEffect(() => {
  //   // setTimeout(() => {
  //     const homeElemnt = document.getElementById('home');
  //     const chatElemnt = document.getElementById('wrapper');
  //     console.log(homeElemnt.clientHeight);
  //     if (chatElemnt && homeElemnt) chatElemnt.style.maxHeight = homeElemnt.clientHeight - 200 + 'px';
  //   // }, 300);
  // })
  useEffect(() => {
      if (isWaitingforcustomerRes === 8) {
        // clearInterval(TimerId)
        return;
      } 
      const TimerId = setInterval(() => {
        SetisWaitingforcustomerRes((isWaitingforcustomerRes) => isWaitingforcustomerRes + 1)
        setNewChats(chats.slice(0, isWaitingforcustomerRes))
    }, 2000)
    return () => {
        clearInterval(TimerId)
    }
  }, [isWaitingforcustomerRes])

  return (
    <div >
    <div className='customer-Id'>Shubham kondekar</div>
    <div ref={ref} style={{height: '70vh', overflow: 'auto', paddingTop: '20px', paddingBottom: '40px'}}>{newChats.map((item, idx) => {
        return <div index={idx}>{item?.isCustomer ? <div className={`chat-layout customer-chat-layout ${item?.sentiment === 'NEGATIVE' ? 'negative-responce' : item?.sentiment === 'POSITIVE' ? 'positive-responce' : ''}`}>
          <div>Customer Locale: {item?.customet_locale}</div>
          <div>Customer Text: {item?.text}</div>
          <div>Agent Locale: {item?.agent_locale}</div>
          <div>neutralized Text: {item?.neutralized_text}</div>
        </div> : <div className={`agent-chat-layout chat-layout ${item?.sentiment === 'NEGATIVE' ? 'negative-responce' : item?.sentiment === 'POSITIVE' ? 'positive-responce' : ''}`}>
        <div >Agent Locale: {item?.agent_locale}</div>
          <div>Agent Text: {item?.text}</div>
          <div>Customer Locale: {item?.customet_locale}</div>
          <div>neutralized Text: {item?.neutralized_text}</div>
        </div>}</div>
      })}</div>
       <div>
    </div>
    {newChats?.length % 2 === 0 && <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} > Processsing <div className='animation-name'>...</div> </div>}
    <></>
    </div>
  )
}

export default ChatWindow;
