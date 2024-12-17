import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAceptadaRechazada } from "../reducers/invitacionReducer";

export default function CardInvitacion() {
  const invitado = useSelector((state) => state.invitado.invitado);
  const dispatch = useDispatch();
  const name = invitado.name;
  const apellido = invitado.lastName;
  const modal = document.getElementById("modal");
  console.log(invitado);

  const handleClickAceptar = () => {
    dispatch(changeAceptadaRechazada("Accepted"));
    modal.classList.remove("hidden");

  };

  const handleClickRechazar = () => {
    dispatch(changeAceptadaRechazada("Declined"));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const url = "http://localhost:5001";
    try{
        axios.post(`${url},/api/invite-response/6760af3fa7805eb1a5c6f025 `, {
            allergies: 'Fred',
          })
    }catch(error){
        console.log(error);
    }
  };


  return (
    <>
      <div id="modal"className="fixed m-0 flex h-screen w-screen bg-black opacity-50 justify-center hidden">
        <form onSubmit={handleSubmit} className="bg-white h-52 flex flex-col p-10 mt-80">
          <label>Tiene alergias?</label>
          <input id="alergias"></input>
          <label>Lleva invitados</label>
          <select id="opciones" name="opciones">
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        <button type="button">Enviar</button>
        </form>
      </div>

      <div className="mt-10 flex h-4/6 max-w-7xl flex-col gap-5 rounded-xl bg-[#16392c] p-10 text-white shadow-2xl">
        <p className="text-2xl font-bold">
          🎄¡Estás invitado a nuestra Posada Navideña!🎄
        </p>
        <p className="text-xl">
          Estimado{" "}
          <span className="font-bold">
            {name} {apellido}{" "}
          </span>
        </p>
        <p>
          Nos encantaría contar con tu presencia en nuestra posada para celebrar
          juntos esta temporada tan especial. A continuación, los detalles del
          evento:
        </p>
        <p>📅Fecha: Viernes, 22 de diciembre de 2024</p>
        <p>⏰Hora: 7pm</p>
        <p>📍Lugar: Salón "Los Encinos", Av. Reforma #123, Ciudad de México</p>
        <p>👔Código de vestimenta: Festivo elegante</p>
        <p>
          ¡Prepárate para disfrutar de buena comida, música y muchas sorpresas!
          No olvides tu espíritu navideño y muchas ganas de divertirte.
        </p>
        <p className="font-bold">Por favor confirma tu asistencia: </p>
        <div className="mt-10 flex flex-row justify-center gap-6">
          <button
            className="rounded-xl bg-green-500 p-2 font-bold hover:bg-green-200"
            onClick={handleClickAceptar}
          >
            Aceptar invitacion
          </button>
          <button
            className="rounded-xl bg-red-500 p-2 hover:bg-red-200"
            onClick={handleClickRechazar}
          >
            Rechazar invitacion
          </button>
        </div>
      </div>
    </>
  );
}
