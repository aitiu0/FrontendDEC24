import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoaded, updateEventDetails } from "../../redux/invitationSlice";
import casaLogo from "../../assets/fall.jpg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const InvitationScreen = () => {
    const dispatch = useAppDispatch();
    const {
        isLoaded,
        eventName,
        eventDate,
        eventTime,
        guessName,
        guessLastName,
        guessResponse,
        guessAccept,
        guessAllergies,
        guessPlusOne,
    } = useAppSelector((state) => state.invitation);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        allergies: "",
        plusOne: "N",
    });
    const { idInvitado } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/users/${idInvitado}`)
            .then((response) => {
                dispatch(updateEventDetails({ guessName: response.data.name }));
                dispatch(
                    updateEventDetails({
                        guessLastName: response.data.lastName,
                    })
                );
            })
            .catch((error) => {
                console.error("Error al hacer la petición GET:", error);
            });
        dispatch(setLoaded(true));
    }, [dispatch]);

    const handleReject = () => {
        dispatch(
            updateEventDetails({
                guessAccept: "N",
                guessPlusOne: "N",
                guessAllergies: "",
            })
        );

        axios
            .post(
                `http://localhost:5001/api/users/invite-response/${idInvitado}`,
                {
                    accept: guessAccept,
                    plusOne: guessPlusOne,
                    allergies: guessAllergies,
                }
            )
            .then((response) => {
                console.log("Datos enviados correctamente");
            })
            .catch((error) => {
                console.error("Error al enviar los datos", error);
            });
    };

    const handleAccept = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = () => {
        dispatch(
            updateEventDetails({
                guessAccept: "Y",
                guessPlusOne: formData.plusOne,
                guessAllergies: formData.allergies,
            })
        );
        setIsModalOpen(false);

        axios
            .post(
                `http://localhost:5001/api/users/invite-response/${idInvitado}`,
                {
                    accept: "Y",
                    plusOne: formData.plusOne,
                    allergies: formData.allergies,
                }
            )
            .then((response) => {
                console.log("Datos enviados correctamente");
                navigate(`/mesaderegalos/${idInvitado}`);
            })
            .catch((error) => {
                console.error("Error al enviar los datos", error);
            });
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white w-full max-w-2xl aspect-[3/4] p-4 rounded-lg shadow-2xl"
            >
                <div className="h-1/2 z-10 bg-gradient-to-r from-green-600 to-blue-600 relative">
                    <motion.img
                        src={casaLogo}
                        alt="Luxury Property"
                        className="w-full h-full rounded-lg object-cover mx-auto mix-blend-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded ? 1 : 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    />
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <h1 className="text-white text-5xl font-bold tracking-wider text-center px-4">
                            OPEN HOUSE
                        </h1>
                    </motion.div>
                </div>
                <div className="h-max bg-white p-8 flex flex-col justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-serif text-gray-800 mb-4">
                            {eventName}
                        </h2>
                        <p className="text-gray-600">
                            Le invitamos cordialmente a experimentar la
                            elegancia y el lujo en nuestro exclusivo evento Open
                            House.
                        </p>
                        <motion.img
                            src={casaLogo}
                            alt="Luxury Property"
                            className="w-7/12 h-64 object-center shadow-lg shadow-black m-4 rounded-lg object-cover mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isLoaded ? 1 : 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded ? 1 : 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="border-t border-gray-200 pt-6 flex flex-col justify-around items-center"
                    >
                        <div>
                            <p className="text-gray-900 font-bold">
                                {guessName} {guessLastName}
                            </p>
                            <p className="text-gray-800 font-semibold">
                                {eventDate}
                            </p>
                            <p className="text-gray-600">{eventTime}</p>
                            <p className="text-black">
                                Código de vestimenta: elegante y sofisticado,
                                con traje o vestido formal apropiado para un
                                evento de lujo
                            </p>
                        </div>
                        <div className="flex items-center gap-x-4 m-4">
                            <button
                                className="bg-black text-white px-6 py-2 shadow-md shadow-black border border-black rounded hover:bg-white hover:text-black transition ease-in-out duration-500"
                                onClick={handleReject}
                            >
                                Rechazar invitacion
                            </button>
                            <button
                                className="bg-black text-white px-6 py-2 shadow-md shadow-black border border-black rounded hover:bg-white hover:text-black transition ease-in-out duration-500"
                                onClick={handleAccept}
                            >
                                Aceptar invitacion
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
                        <h3 className="text-xl font-semibold mb-4">
                            Confirmar Asistencia
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Alergias
                            </label>
                            <textarea
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-semibold mb-2">
                                ¿Asistirá con acompañante?
                            </label>
                            <select
                                name="plusOne"
                                value={formData.plusOne}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="N">No</option>
                                <option value="Y">Sí</option>
                            </select>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-green-500 text-white px-6 py-2 rounded-md ml-4 shadow-md shadow-black hover:bg-green-600 transition ease-in-out duration-500"
                                onClick={handleSubmit}
                            >
                                Enviar
                            </button>
                            <button
                                className="bg-red-500 text-white px-6 py-2 rounded-md ml-4 shadow-md shadow-black hover:bg-red-600 transition ease-in-out duration-500"
                                onClick={handleModalClose}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvitationScreen;
