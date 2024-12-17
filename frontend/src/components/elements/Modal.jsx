import React from 'react';

const Modal = ({ title, children, onClose, onSubmit, submitText, cancelText }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-2">
          {onClose && (
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              {cancelText || 'Cancelar'}
            </button>
          )}
          {onSubmit && (
            <button
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={onSubmit}
            >
              {submitText || 'Confirmar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
