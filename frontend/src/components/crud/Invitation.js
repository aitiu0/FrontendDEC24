import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectAllPosts } from "../../reducers/useGuestReducer";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Invitation = () => {
  const resetData = {
    alergia: "",
    invitado: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [accept, setAceept] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const loading = useSelector((state) => state.guest.loading);
  const error = useSelector((state) => state.guest.error);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleReject = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmPurchase = () => {
    setIsModalOpen(false);
  };

  const acceptInvitation = () => {
    setAceept(true);
  };

  const submit = (data) => {
    console.log(data);
    reset(resetData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">Invitation</h1>
      <div className="max-w-sm w-full overflow-hidden rounded-lg bg-white shadow-lg">
        <img
          className="h-48 w-full object-cover rounded-t-lg"
          src="https://tse3.mm.bing.net/th?id=OIP.-Eha2UrhgOs1GM6_JRVMHQHaHx&pid=Api"
          alt="Product"
        />
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            HI {posts.name} {posts.lastName}
          </h3>
          <h3 className="text-lg text-gray-600 mb-4">
            Estás invitado a unirte a mi fiesta
          </h3>
          <h3 className="text-lg text-gray-600 mb-6">Fecha: 16-12-2024</h3>

          <div className="flex justify-evenly">
            <button
              onClick={handleReject}
              className="rounded bg-red-700 py-2 px-6 text-white font-semibold hover:bg-red-800 transition"
            >
              Rechazar
            </button>

            <button
              onClick={acceptInvitation}
              className="rounded bg-blue-500 py-2 px-6 text-white font-semibold hover:bg-blue-700 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>

      {accept && (
        <form
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-6"
          onSubmit={handleSubmit(submit)}
        >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Por favor, llena este formulario
          </h3>
          <input
            className={`w-full h-12 px-4 mb-4 border rounded-md text-xl bg-gray-100 ${
              errors.alergia ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Alergias?"
            {...register("alergias")}
          />
          {errors.alergia && (
            <p className="text-red-500 text-sm">{errors.alergia.message}</p>
          )}

          <input
            className={`w-full h-12 px-4 mb-4 border rounded-md text-xl bg-gray-100 ${
              errors.invitado ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Invitado?"
            {...register("invitado")}
          />
          {errors.invitado && (
            <p className="text-red-500 text-sm">{errors.invitado.message}</p>
          )}

          <Link
          to={`/products`}
            type="submit"
            className="w-full h-12 text-center bg-blue-600 text-black font-bold rounded-md hover:bg-slate-700 transition"
          >
            Submit
          </Link>
        </form>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              ¿Quieres comprar un regalo de todos modos?
            </h2>
            <div className="flex justify-evenly">
              <Link
                to={`/products`}
                onClick={handleConfirmPurchase}
                className="rounded bg-green-500 py-2 px-6 text-white font-semibold hover:bg-green-600 transition"
              >
                Sí
              </Link>
              <button
                onClick={handleCloseModal}
                className="rounded bg-gray-500 py-2 px-6 text-white font-semibold hover:bg-gray-600 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invitation;
