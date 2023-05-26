// LIBRARIES
import React, { useRef } from "react";

// COMPONENTS
import useOnClickOutside from "~/components/hooks/useOnClickOutside";

// TYPES
type modalProps = {
  children: React.ReactNode;
  id: string;
  isModalOpen: boolean;
  toggleIsModalOpen: () => void;
};

const Modal = ({
  children,
  id,
  isModalOpen,
  toggleIsModalOpen,
}: modalProps) => {
  // HANDLE CLICK OUTSIDE OF MODAL TO CLOSE
  const modalRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = () => {
    if (isModalOpen) toggleIsModalOpen();
  };
  useOnClickOutside(modalRef, () => handleClickOutside());

  // RETURN
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => toggleIsModalOpen()}
      />
      <div className="modal w-full flex-col items-center justify-center">
        <div className="modal-box relative p-7" ref={modalRef}>
          <label
            htmlFor={id}
            className="btn-sm btn-circle btn absolute right-2 top-2 hover:bg-error"
          >
            ✕
          </label>

          <div className="p-2" />
          {children}
        </div>
      </div>
    </>
  );
};
export default Modal;
