/* global bootstrap */
import React, { useEffect, useRef } from 'react';


function ModalWrapper({ id, title, children, show, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    const modalElement = modalRef.current;
    const bsModal = new window.bootstrap.Modal(modalElement);

    if (show) {
      bsModal.show();
    } else {
      bsModal.hide();
    }

    // Cleanup
    return () => {
      bsModal.hide();
    };
  }, [show]);

  return (
    <div
      className="modal fade"
      id={id}
      ref={modalRef}
      tabIndex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalWrapper;
