import React from 'react';
import Modal from './Modal';

const ModalRechazar = ({ onClose, onConfirm }) => {
  return (
    <Modal
      title="Muchas gracias por responder"
      onClose={onClose}
      onSubmit={onConfirm}
      submitText="Ir a Mesa de Regalos"
      cancelText="Cancelar"
    >
      <p>Estamos muy agradecidos por tu sinceridad al responder, esperamos verte pronto</p>
    </Modal>
  );
};

export default ModalRechazar;
