import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({show, 
                            handleClose, 
                            confirmText, 
                            deleteAndClose,
                            confirmBtnText}) => {

  return (
    <>
      <Modal show={show} onHide={handleClose} 
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>Are you sure you want to {confirmText}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteAndClose}>
            {confirmBtnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationModal