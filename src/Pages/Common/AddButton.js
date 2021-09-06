// import {faPlus} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import React, {useState} from "react";
// import {Button, Modal} from "react-bootstrap";
// import {useSelector} from "react-redux";
// import Search from "../Search/Search";
// import LoadingImage from "../../assets/loading.jpeg";

// function AddButton({topTen}) {
//   const releaseInfo = useSelector((state) => state.releases.search);

//   const [open, setOpen] = useState(false);

//   //modal functions

//   function openModal() {
//     setOpen(true);
//   }

//   function closeModal() {
//     setOpen(false);
//   }

//   return releaseInfo.length > 0 ? (
//     <>
//       <Button onClick={openModal} variant="outline-success" size="sm">
//         <FontAwesomeIcon icon={faPlus} />
//       </Button>

//       <Modal show={open} onHide={closeModal} animation={false}>
//         <Modal.Body>
//           <div className="searchResultsContainer">
//             <Search topTen={topTen} />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   ) : (
//     <>
//       <Button onClick={openModal} variant="outline-success" size="sm">
//         <FontAwesomeIcon icon={faPlus} />
//       </Button>

//       <Modal show={open} onHide={closeModal} animation={false}>
//         <Modal.Body>
//           <div className="searchResultsContainer">
//             <div className="loadingContainer">
//               <img src={LoadingImage} alt="loading" />
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default AddButton;
