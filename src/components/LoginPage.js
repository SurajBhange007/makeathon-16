import React, { useState } from 'react'
import Modal from './Modal'
import { Form } from './Form'

export default function LoginPage() {
    const [isModalOpen, toggleModal] = useState(true)
    const onClose = () => {
        toggleModal(!isModalOpen)
    }
  return (
    <>
    <Modal open={isModalOpen} onClose={onClose} title='Login'>
        <Form isLogin={true} />
    </Modal>
  </>)
}

