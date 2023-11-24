import React, { useState } from 'react'
import Modal from './Modal'
import { Form } from './Form'

export default function SignUpPage() {
  const [isModalOpen, toggleModal] = useState(true)
  const onClose = () => {
      toggleModal(!isModalOpen)
  }
  return (
    <Modal open={isModalOpen} onClose={onClose} title='Sign Up'>
        <Form isLogin={false} />
    </Modal>
  )
}
