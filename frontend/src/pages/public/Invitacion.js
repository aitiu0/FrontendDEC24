import React, { useState, useEffect } from "react";
import wallpaperBoda from "../../assets/wallpaperBoda.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInvitado } from "../../actions/invitadoActions";
import axios from "axios";
import { Modal } from "antd";

const Invitacion = () => {
  const { idInvitado } = useParams();
  const dispatch = useDispatch();
  const invitado = useSelector((state) => state.invitaciones.invitado);

  const [accept, setAccept] = useState("");
  const [plusOne, setPlusOne] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()

  const handleModalOpen = (respuesta) => {
    setAccept(respuesta);
    if (respuesta === "Y") {
      setIsModalOpen(true); 
    } else {
      handleResponse(respuesta, "", ""); 
    }
  };

  const handleModalSubmit = () => {
    handleResponse(accept, plusOne, allergies);
    setIsModalOpen(false);
  };

  

  const handleResponse = async (respuesta, plusOneValue, allergiesValue) => {
    console.log("Datos enviados al servidor:", {
      accept: respuesta,
      plusOne: plusOneValue,
      allergies: allergiesValue,
    });
  
    try {
      const response = await axios.post(
        `http://localhost:5001/api/users/invite-response/${idInvitado}`,
        {
          accept: respuesta,
          plusOne: plusOneValue,
          allergies: allergiesValue,
        }
      );
  
      console.log("Respuesta del servidor:", response);
  
      if (response.status === 200) {
        navigate(`/mesaderegalos/${idInvitado}`)
      } else {
        alert("Hubo un problema al enviar tu respuesta.");
      }
    } catch (err) {
      console.error("Error al enviar la respuesta:", err);
      alert("Ocurrió un error. Inténtalo de nuevo.");
    }
  };
  

  useEffect(() => {
    dispatch(getInvitado(idInvitado));
  }, [dispatch, idInvitado]);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${wallpaperBoda})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="rounded-lg border border-gray-200 bg-white bg-opacity-90 p-10 text-center shadow-lg lg:w-[700px]">
        <div>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-wide text-gray-800">
            Querido {invitado.name} {invitado.lastName}
          </h1>
          <p className="mb-6 text-lg italic leading-relaxed text-gray-600">
            Nos sentimos honrados de invitarte a compartir con nosotros este día
            tan especial, donde celebraremos nuestra unión y amor.
          </p>
        </div>

        <h1 className="mb-4 font-serif text-4xl tracking-wide text-gray-800">
          Adgla & Carlos
        </h1>
        <p className="mb-8 text-lg italic text-gray-600">
          "El amor une nuestras almas, y queremos compartir este momento
          especial contigo."
        </p>
        <div className="mb-8 border-t border-gray-300 py-6">
          <p className="text-xl text-gray-700">
            📅 <span className="font-medium">24 de diciembre de 2024</span>
          </p>
          <p className="text-xl text-gray-700">
            🕒 <span className="font-medium">5:00 PM</span>
          </p>
          <p className="text-xl text-gray-700">
            📍 <span className="font-medium">Hacienda Los Álamos</span>
          </p>
        </div>

        {/* Botones de aceptar/rechazar */}
        <button
          onClick={() => handleModalOpen("Y")}
          className="inline-block rounded-lg bg-gray-800 py-3 px-6 text-lg font-semibold text-white shadow-md transition hover:bg-gray-700"
        >
          Aceptar Invitación
        </button>

        <button
          onClick={() => handleModalOpen("N")}
          className="ml-4 inline-block rounded-lg bg-gray-700 py-3 px-6 text-lg font-semibold text-white shadow-md transition hover:bg-gray-700"
        >
          Rechazar Invitación
        </button>

        {/* Modal para detalles adicionales */}
        <Modal
          title="Detalles de la Invitación"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={handleModalSubmit}
        >
          <div className="mt-4">
            <label className="text-sm text-gray-700">¿Vas con acompañante?</label>
            <select
              value={plusOne}
              onChange={(e) => setPlusOne(e.target.value)}
              className="mt-2 rounded border p-2"
            >
              <option value="">Seleccionar</option>
              <option value="Y">Sí</option>
              <option value="N">No</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="text-sm text-gray-700">
              ¿Tienes alergias? (opcional)
            </label>
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="mt-2 rounded border p-2"
              placeholder="Escribe tus alergias aquí"
            />
          </div>
        </Modal>

        <p className="mt-6 text-sm text-gray-500">
          ¡Gracias por ser parte de nuestro día especial!
        </p>
      </div>
    </div>
  );
};

export default Invitacion;
