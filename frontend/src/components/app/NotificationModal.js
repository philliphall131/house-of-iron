import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({showNotifyModal, handleCloseNotify, notifyText}) => {

  return (
    <>
      <Modal show={showNotifyModal} onHide={handleCloseNotify} 
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>{notifyText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNotify}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationModal