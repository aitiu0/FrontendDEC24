import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateGuest } from "../../../../actions/guestActions";
import { getLoginData } from "../../../../actions/userActions";

import { Input, CheckBox } from "../../../../components/elements/Inputs";

import Alert from "../../../../components/alerts/Alert";
import { GUEST_ADMIN_CREATE_RESET } from "../../../../constants/guestConstants";
import { Button, Typography } from "@material-tailwind/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function GuestCreate() {
  const [guest, setGuest] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    tradename: "",
    allowPlusOne: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const adminGuestCreate = useSelector((state) => state.adminGuestCreate);
  const {
    loading: loadingCreateGuest,
    error: errorCreateGuest,
    message: messageCreateGuest,
  } = adminGuestCreate;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setGuest((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handlePhoneChange = (value) => {
    setGuest((prevState) => ({ ...prevState, phone: value }));
  };

  const submitHandler = () => {
    dispatch(adminCreateGuest(guest));
  };

  const redirect = "/login";
  useEffect(() => {
    if (messageCreateGuest) {
      dispatch({ type: GUEST_ADMIN_CREATE_RESET });
      navigate("/admin/invitados");
    }
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate(redirect);
    }
  }, [userInfo, messageCreateGuest]);

  return (
    <div className="bg-slate-50 p-4">
      <h2 className="text-palette-primary text-xl font-bold">
        Agregar Invitado
      </h2>
      <form
        className="mt-3 grid gap-6 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <div className="flex flex-col gap-3">
          <Typography className="text-lg font-semibold  hover:text-gray-800">
            Datos Generales
          </Typography>
          <Input
            title="Nombre"
            name="name"
            type="text"
            required={true}
            value={guest.name}
            setValue={handleChange}
          />
          <Input
            title="Apellido"
            name="lastName"
            type="text"
            required={true}
            value={guest.lastName}
            setValue={handleChange}
          />
          <Input
            title="Correo Electrónico"
            name="email"
            type="email"
            required={true}
            value={guest.email}
            setValue={handleChange}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <PhoneInput
              country="ar"
              value={guest.phone}
              onChange={handlePhoneChange}
              inputStyle={{ width: "100%" }}
            />
          </div>
          <Input
            title="Alias"
            name="tradename"
            type="text"
            required={true}
            value={guest.tradename}
            setValue={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Typography className="text-lg font-semibold hover:text-gray-800">
            Datos de la invitación
          </Typography>
          <CheckBox
            title="Permitir un acompañante"
            name="allowPlusOne"
            type="checkbox"
            required={true}
            value={guest.allowPlusOne}
            setValue={handleCheckboxChange}
          />
        </div>

        <div className="col-span-full">
          <div className="col-span-full mt-3 flex justify-center text-center">
            {errorCreateGuest && (
              <Alert title="Información incompleta" text={errorCreateGuest} />
            )}
          </div>
          <div className="col-span-full flex justify-center text-center">
            <Button
              type="onSubmit"
              className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
              fullWidth
            >
              {loadingCreateGuest && (
                <img
                  src="/assets/loader.svg"
                  className="my-auto mr-3 h-6 w-6"
                />
              )}
              {loadingCreateGuest ? "Creando..." : "Crear"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default GuestCreate;
