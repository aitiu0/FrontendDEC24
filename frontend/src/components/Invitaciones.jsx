import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, } from 'react-router-dom';
import { fetchUserById } from '../features/users/userSlice';
import ModalRechazar from './elements/ModalRechazar';
import ModalAceptar from './elements/ModalAceptar';
import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';

const Invitaciones = () => {
  const dispatch = useDispatch();
  const { idInvitado } = useParams();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  useEffect(() => {
    if (idInvitado) {
      dispatch(fetchUserById(idInvitado));
    }
  }, [dispatch, idInvitado]);

  const handleAccept = async (formData) => {
    try {
      window.location.href = '/mesaderegalos';
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la información.');
    }
  };

  return (
    <div className="flex items-center justify-center py-5">
      <Card className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.creativefabrica.com/wp-content/uploads/2023/04/21/PHOTOGRAPHY-PROM-BACKGROUND-67806862-1.png')",
          }}
        >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12">
          {loading && <p>Cargando...</p>}
          {error && <p>Error: {error}</p>}
          {userInfo && (
            <div>
              <Typography variant="h2" color="white" className="mb-6 font-medium">
                <p className="font-bold">{`${userInfo.name} ${userInfo.lastName}`}</p>
                <p>Estas invitado a nuestra boda</p>
                <p>Día: 30 de Noviembre</p>
                <p>Hora: 8pm</p>
                <p>Dresscode: Formal</p>
              </Typography>

              <div className="flex justify-center gap-4 mt-4">
                <Button color="red" onClick={() => setShowRejectModal(true)}>
                  Rechazar
                </Button>
                <Button color="green" onClick={() => setShowAcceptModal(true)}>
                  Aceptar
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {showRejectModal && (
        <ModalRechazar
          onClose={() => setShowRejectModal(false)}
          onConfirm={() => {
            setShowRejectModal(false);
            window.location.href = '/mesa-de-regalos';
          }}
        />
      )}

      {showAcceptModal && (
        <ModalAceptar
          allowPlusOne={userInfo?.allowPlusOne}
          onClose={() => setShowAcceptModal(false)}
          onSubmit={handleAccept}
        />
      )}
    </div>
  );
};

export default Invitaciones;
