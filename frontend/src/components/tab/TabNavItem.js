import { useState } from "react";
import { ConfirmationModal } from "../components";

const TabNavItem = ({ id, title, activeTab, setActiveTab, removeTab }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setActiveTab(id);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const deleteAndClose = () => {
    removeTab()
    handleCloseModal()
  }
  
 return (
    <li 
      className={`tab-nav-item`}
    >
      { id == 'tab1' ?
        <div 
          className={`tab-nav-title ${activeTab === id ? "active" : ""}`}
          onClick={handleClick}
        >
          { title }
        </div> :
        <>
          <div 
            className={`tab-nav-title ${activeTab === id ? "active" : ""}`}
            onClick={handleClick}
          >
              { title }
          </div>
          <div className="tab-nav-rm" onClick={handleShowModal}>
            <div className="tab-nav-rm-line"> </div>
          </div>
        </>
      }
      <ConfirmationModal 
        show={showModal} 
        handleClose={handleCloseModal}
        confirmText={"delete this section"}
        confirmBtnText={"Delete"}
        deleteAndClose={deleteAndClose}
      />
    </li>
  );
}

export default TabNavItem