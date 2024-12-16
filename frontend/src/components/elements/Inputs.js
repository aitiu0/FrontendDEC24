import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Upload from "../../assets/admin/upload.svg";
import Modal from "../Modal";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export const CheckBox = (props) => {
  const [check, setCheck] = useState(props.checked); // Local state for checkbox
  const input = useRef();

  // Sync check state with props.checked
  useEffect(() => {
    setCheck(props.checked);
  }, [props.checked]);

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <span className="font-medium">{props.title}:</span>
      <input
        type="checkbox"
        className="hidden" // Ensure it's fully hidden
        name={props.name}
        value={props.value}
        ref={input}
        defaultChecked={props.checked}
        onChange={(e) => {
          setCheck(e.target.checked);
          props.setValue(e); // Notify parent about the change
        }}
      />
      <div
        className={`flex h-5 w-10 cursor-pointer items-center rounded-full p-1 transition-all duration-300 ${
          check ? "justify-end bg-blue-500" : "justify-start bg-gray-400"
        }`}
        onClick={() => input.current.click()} // Trigger the hidden checkbox click
      >
        <div className="h-3 w-3 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export const HiddenBox = (props) => {
  const [check, setCheck] = useState(props.checked);
  const input = useRef();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">{props.title}:</span>
        <input
          type="checkbox"
          hidden={true}
          name={props.name}
          value={props.value}
          defaultChecked={props.checked}
          onChange={(e) => {
            setCheck(e.target.checked);
            props.setValue(e);
          }}
          ref={input}
        />
        <div
          className={`flex h-5  w-10 cursor-pointer items-center rounded-full p-1 transition-all duration-300 ${
            check
              ? "bg-palette-primary justify-end "
              : "justify-start bg-gray-400"
          }`}
          onClick={() => input.current.click()}
        >
          <div className="h-3 w-3 rounded-full bg-white"></div>
        </div>
      </div>
      {check && props.children}
    </div>
  );
};

export const Input = ({
  title,
  type,
  name,
  required,
  placeholder,
  classInput,
  classDiv,
  classSpan,
  min,
  max,
  step,
  value,
  setValue,
  disabled = false,
}) => {
  return (
    <div className={"flex flex-col gap-2 " + classDiv}>
      <span className={"flex font-medium " + classSpan}>{title}:</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={setValue}
        disabled={disabled}
        className={
          "focus:border-palette-primary rounded-md border-2 p-2 outline-none" +
          classInput
        }
      />
    </div>
  );
};
export const ComboBox = ({
  title,
  data,
  selected,
  selectedSubField,
  setFilter,
  setSelect,
  setAction,
  createOptionModal = false,
  createOptionLink = false,
  childrenModal,
  classSpan,
  small,
}) => {
  const [viewData, setViewData] = useState(data ? data : []);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const closeModal = () => {
    setViewModal(false);
  };

  useEffect(() => {
    setFilter !== undefined && setFilter(search);
    var newData = [];
    if (selectedSubField) {
      newData =
        selected.length > 0
          ? data.filter(
              (dat) =>
                !selected.some((sel) => sel[selectedSubField]._id === dat._id)
            )
          : data;
    } else {
      newData =
        selected.length > 0
          ? data.filter((dat) => !selected.some((sel) => sel._id === dat._id))
          : data;
    }
    if (search.length > 0) {
      newData = newData.filter(
        (element) =>
          element.name?.toLowerCase().includes(search.toLowerCase()) ||
          element.orderId?.toLowerCase().includes(search.toLowerCase()) ||
          element.skuTrep?.toLowerCase().includes(search.toLowerCase()) ||
          element.eanUpc?.toLowerCase().includes(search.toLowerCase())
      );

      setViewData(newData);
    } else if (search === "") {
      if (selectedSubField) {
        setViewData(
          selected.length > 0
            ? data.filter(
                (dat) =>
                  !selected.some((sel) => sel[selectedSubField]._id === dat._id)
              )
            : data
        );
      } else {
        setViewData(
          selected.length > 0
            ? data.filter((dat) => !selected.some((sel) => sel._id === dat._id))
            : data
        );
      }
    }
    if (data.length === selected.length) {
      setShow(false);
    }
    if (search) {
      setShow(true);
    }
  }, [search, data, setFilter, update, show]);

  function selectHandle(element) {
    setSelect !== undefined && setSelect(element.name);
    setSearch("");
    setAction(element);
    setUpdate(!update);
  }

  return [
    <div className="flex flex-col gap-2" key={0}>
      <div className="flex items-center justify-between">
        <span className={"font-medium " + classSpan}>{title}:</span>
        {createOptionModal ? (
          <button
            onClick={() => setViewModal(true)}
            type="button"
            className="px-3 py-1 text-sm font-semibold hover:rounded-full hover:bg-blue-gray-700 hover:text-white"
          >
            {createOptionModal}
          </button>
        ) : (
          createOptionLink && (
            <Link to={createOptionLink.url} className="text-sm font-semibold">
              {createOptionLink.title}
            </Link>
          )
        )}
      </div>
      {createOptionModal && viewModal && childrenModal && (
        <Modal
          closeAction={() => setViewModal(false)}
          title={createOptionModal}
        >
          {childrenModal}
        </Modal>
      )}
      <div className="relative">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          onClick={function () {
            if (show) {
              setSearch("");
              setShow(false);
            } else {
              setShow(true);
            }
          }}
          value={search}
          className="w-full rounded-md border-2 p-2 outline-none"
        />
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center pl-3">
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${
              show ? "rotate-180" : "text-gray-500"
            }`}
          />
        </div>
        {show && (
          <div
            className={`absolute z-20 mt-1 w-full overflow-y-scroll rounded-md bg-white p-2 shadow ${
              small ? "max-h-[20vh]" : "max-h-[70vh]"
            }`}
          >
            {viewData.map((element, key) => (
              <button
                className="hover:bg-palette-ext flex w-full items-center gap-2 rounded-md p-1"
                type="button"
                onClick={() => selectHandle(element)}
                key={key}
              >
                {(element.logo || element.images?.length > 0) && (
                  <img
                    src={
                      element.logo
                        ? element.logo.url
                        : element.images?.length > 0
                        ? element.images[0]?.url
                        : ""
                    }
                    alt={element.name}
                    className="h-5 w-5 scale-100 transform rounded-full object-cover"
                  />
                )}
                <span className="text-xs md:text-sm 2xl:text-base">
                  {element.name ? element.name : element.orderId}
                </span>
                {element.eanUpc && (
                  <span className="text-xs text-blue-700 md:text-sm 2xl:text-base">
                    {element.eanUpc}
                  </span>
                )}
                {element.skuTrep && (
                  <span className="text-xs text-orange-700 md:text-sm 2xl:text-base">
                    {element.skuTrep}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
  ];
};
export const Textarea = ({
  title,
  type,
  name,
  required,
  placeholder,
  classInput,
  classDiv,
  classSpan,
  min,
  max,
  value,
  setValue,
}) => {
  return (
    <div className={"flex flex-col gap-2 " + classDiv}>
      <span className={"font-medium " + classSpan}>{title}:</span>
      <textarea
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        value={value}
        onChange={setValue}
        className={
          "focus:border-palette-primary rounded-md border-2 p-2 outline-none" +
          classInput
        }
      ></textarea>
    </div>
  );
};

export const InputSelect = ({
  children,
  title,
  type,
  name,
  required,
  placeholder,
  classInput,
  classDiv,
  classSpan,
  createOptionModal = false,
  createOptionLink = false,
  childrenModal,
  value,
  setValue,
}) => {
  const [viewModal, setViewModal] = useState(false);
  const closeModal = () => {
    setViewModal(false);
  };

  return (
    <div className={"flex flex-col gap-2 " + classDiv}>
      <div className="flex items-center justify-between">
        <span className={"flex font-medium  " + classSpan}>{title}:</span>
        {createOptionModal ? (
          <button
            onClick={() => setViewModal(true)}
            type="button"
            className="px-3 py-1 text-sm font-semibold hover:rounded-full hover:bg-blue-gray-700 hover:text-white"
          >
            {createOptionModal}
          </button>
        ) : (
          createOptionLink && (
            <Link to={createOptionLink.url} className="text-sm font-semibold">
              {createOptionLink.title}
            </Link>
          )
        )}
      </div>

      {createOptionModal && viewModal && childrenModal && (
        <Modal
          closeAction={() => setViewModal(false)}
          title={createOptionModal}
        >
          {childrenModal}
        </Modal>
      )}

      <select
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        defaultValue={""}
        className={
          "focus:border-palette-primary rounded-md border-2 p-2 outline-none" +
          classInput
        }
      >
        {children}
      </select>
    </div>
  );
};

export const InputFile = (props) => {
  const [fileValue, setFileValue] = useState(null);
  const inputReference = useRef();
  const buttonRef = useRef();

  const DragStart = () =>
    (buttonRef.current.textContent = "Soltar para guardar");
  const DragLeave = () => (buttonRef.current.textContent = "Subir elemento");
  const DropFile = () => (buttonRef.current.textContent = "Subir elemento");

  return (
    <div className="group mx-4 mb-4 flex h-full flex-col gap-2">
      <span className="block font-medium">{props.title}:</span>
      <div className="aspect-square relative flex h-full ">
        <input
          type="file"
          hidden={fileValue !== null}
          className="aspect-square absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
          id="imageSubmit"
          name={props.name}
          ref={inputReference}
          onChange={(e) => {
            setFileValue(e.target.files[0]);
            props.setValue(e.target.files[0]);
          }}
          required={props.required}
        />
        {fileValue !== null ? (
          <>
            <button
              onClick={() => {
                setFileValue(null);
                props.setValue(null);
              }}
              type="button"
              className="aspect-square absolute top-1  right-1 z-10 rounded-sm bg-red-300 py-1 px-2 text-lg text-white drop-shadow-lg hover:bg-red-500"
            >
              X
            </button>
            {fileValue.type.includes("image") ? (
              <img
                src={URL.createObjectURL(fileValue)}
                alt="preview"
                className="aspect-square w-full object-contain"
              />
            ) : (
              <iframe
                title="PREVIEW"
                src={URL.createObjectURL(fileValue)}
                className="aspect-square w-full"
              />
            )}
          </>
        ) : (
          <div
            className="aspect-square flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-500 group-hover:border-black"
            draggable
            onDragStart={DragStart}
            onDrop={DropFile}
            onDragLeave={DragLeave}
          >
            <img src={Upload} className="w-2/4" alt="upload icon" />
            <p
              className="rounded-sm p-2 px-4 text-black"
              type="button"
              ref={buttonRef}
              onClick={() => {
                inputReference.current.click();
              }}
            >
              Click o Arrasta
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const InputIdBox = ({ data, fields, title, name }) => {
  const [viewData, setViewData] = useState(data);
  const [isSelect, setIsSelected] = useState(false);
  const input = useRef();

  function search(text) {
    if (text.length !== 0 && !isSelect) {
      let newData = data;
      if (text.length > 0) {
        newData = newData.filter((element) => {
          let res = false;

          fields.forEach((field) => {
            if (element[field]?.toLowerCase().includes(text.toLowerCase())) {
              res = true;
            }
          });
          return res;
        });
      }

      setViewData(newData);
    }
  }

  return (
    <div className="relative flex w-full flex-col">
      <span className={"font-medium"}>{title}:</span>
      <div className="relative flex items-center justify-end">
        <input
          type="text"
          onChange={(e) => search(e.target.value)}
          className="w-full rounded-md border-2 p-2 outline-none "
          ref={input}
          name={name}
          readOnly={isSelect}
        />
        {isSelect && (
          <button
            onClick={() => setIsSelected(false)}
            className="absolute place-content-end self-end p-2 text-xl "
          >
            X
          </button>
        )}
      </div>

      {input.current?.value.length > 1 && !isSelect && (
        <div className="absolute top-full z-20 mt-1 w-full rounded-md border-2 bg-white p-2 shadow">
          {viewData.map((element, key) => (
            <button
              className="hover:bg-palette-ext flex w-full items-center gap-2 rounded-md p-1"
              type="button"
              onClick={() => {
                input.current.value = element.id;
                setIsSelected(true);
              }}
              key={element.id}
            >
              <span className="text-sm font-bold text-gray-600">
                {element.id}
              </span>
              <img
                src={element.img}
                alt={element.nombre}
                className="h-5 w-5 "
              />

              <span>{element.nombre}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
