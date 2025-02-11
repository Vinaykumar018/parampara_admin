import React, { useState, useEffect } from "react";

import GetTable from "../dashboard/GetTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 import { fetchPoojaData, deletePooja } from '../Services/poojaApiService';
 import axios from "axios";



import { CSpinner} from '@coreui/react'
import { useContext } from "react";
import { AppContext } from '../../context/AppContext';

import { useNavigate } from 'react-router-dom';
const BhajanMandal = () => {


  const {contextBhajanMandalData,setContextBhajanMandalData} = useContext(AppContext);
 
  const navigate = useNavigate();

  const navigateToAddPooja = () => {
    
    navigate('/add-bhajan-mandal');
  };
  const [poojaData, setPoojaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [poojaToDelete, setPoojaToDelete] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPoojaData();
        if (data.status === 1) {
          setPoojaData(data.data);
         setContextBhajanMandalData(data.data)
        } else {
          toast.error('Failed to fetch Pooja data');
        }
      } catch (error) {
        toast.error('Error fetching Pooja data');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleEdit = (id) => {
    console.log(contextBhajanMandalData)
    
    navigate(`/update-bhajan-mandal/${id}`);
  };

  const handleDelete = (id) => {
    setPoojaToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deletePooja(poojaToDelete);
      if (response.status === 1) {
        toast.success("Pooja deleted successfully!");
        setPoojaData(poojaData.filter((item) => item._id !== poojaToDelete));
        setContextPoojaData(poojaData.filter((item) => item._id !== poojaToDelete));
        setShowModal(false);
      } else {
        toast.error("Failed to delete Pooja.");
      }
    } catch (error) {
      toast.error("Error deleting Pooja. Please try again.");
      console.error("Error deleting Pooja:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const columns = [
    { name: "S No.", selector: (row, index) => index + 1, width: "80px" },
    // { name: "ID", selector: (row) => row._id, width: "100px" },
    { name: "Pooja Name", selector: (row) => row.pooja_name, width: "150px" },
    { name: "Category", selector: (row) => row.pooja_category, width: "100px" },
    { name: "Price (With Samagri)", selector: (row) => row.price_withSamagri, width: "100px" },
    { name: "Price (Without Samagri)", selector: (row) => row.price_withoutSamagri, width: "100px" },
    {
      name: "Image",
      selector: (row) =>
        row.pooja_image ? (
          <img
            src={`http://192.168.1.38:3000${row.pooja_image}`}
            alt={row.pooja_name}
            className="img-thumbnail"
            width={50}
          />
        ) : (
          "N/A"
        ),
      width: "100px",
    },
    { name: "Short Description", selector: (row) => row.short_discription, width: "200px" },
    { name: "Long Description", selector: (row) => row.long_discription, width: "400px" },
    { name: "Status", selector: (row) => row.status, width: "100px" },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            onClick={() => handleEdit(row._id)}
            className="btn btn-primary btn-sm me-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "150px",
    },
  ];
  
  

  return (
    <section>
      <div className="container ">
        {/* <PoojaForm /> */}
        <div className="card shadow-lg mb-4 border-0">
        <div class="card-header bg-dark text-white">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0">Bhajan List</h6>
            {/* <div>
              <a href="javascript:void(0)" className="btn btn-success text-light btn-sm">Add Pooja</a>
            </div> */}
              <div>
      <a
        href="javascript:void(0)"
        className="btn btn-warning text-dark btn-sm"
        onClick={navigateToAddPooja}
      >
       Add Bhajan Mandal
      </a>
    </div>
          </div> 
        </div>
        {loading ? (
        <div className="justify-content-center d-flex p-5"> 
            <CSpinner color="primary" />
          </div>
        ) : ( 
          <GetTable columns={columns} data={poojaData} />
        )}
        </div>
      </div>
      <ConfirmDeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <ToastContainer />
    </section>
  );
};

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px" }}>
        <div className="modal-content" style={{ fontFamily: "'Roboto', sans-serif", borderRadius: "12px" }}>
          <div className="modal-header">
            <h5 className="modal-title fw-bold" style={{ fontSize: "1.25rem" }}>Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center" style={{ fontSize: "1rem" }}>
            <p style={{ fontWeight: "500" }}>Are you sure you want to delete this Pooja?</p>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ fontWeight: "600" }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
              style={{ fontWeight: "600" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BhajanMandal;