import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AuthForm from './AuthForm';

export default function AuthModal({text}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} variant='primary'>{text}</Button>

      <Modal show={show} onHide={handleClose} fullscreen='sm-down' className='bg-transparent' centered>
        <AuthForm tipo='signup'/>
      </Modal>
    </>
  );
}