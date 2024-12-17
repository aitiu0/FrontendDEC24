import React, { useState } from 'react';
import Modal from './Modal';

const ModalAceptar = ({ onClose, onSubmit, allowPlusOne }) => {
  const [formData, setFormData] = useState({
    allergies: '',
    plusOne: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal
      title="Confirma tu asistencia"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Confirmar y Continuar"
      cancelText="Cancelar"
    >
      {allowPlusOne && (
        <div className="mb-4">
          <label className="block mb-2">¿Asistirás con pareja?</label>
          <input
            type="checkbox"
            name="plusOne"
            checked={formData.plusOne}
            onChange={handleChange}
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2">Alergias</label>
        <input
          type="text"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 w-full"
          placeholder="Escribe aquí..."
        />
      </div>
    </Modal>
  );
};

export default ModalAceptar;
