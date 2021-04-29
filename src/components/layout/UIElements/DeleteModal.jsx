/* Inspiration from https://react-bootstrap.github.io/components/modal/  */

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import WarningIcon from "@material-ui/icons/Warning";
import { red } from "@material-ui/core/colors";
import PropTypes from "prop-types";

const DeleteModal = ({ show, handleClose, confirmDeleteHandler }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <WarningIcon style={{ color: red[600] }} fontSize="large" /> Delete
            Boat
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this boat?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteHandler}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  confirmDeleteHandler: PropTypes.func.isRequired,
};

export default DeleteModal;
