import React from 'react';
import { useState,useEffect } from 'react';
import GetTable from '../dashboard/GetTable';
import { deletePandit, fetchPanditDetails } from '../Services/panditApiService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSpinner} from '@coreui/react'
import { useNavigate } from 'react-router-dom';

const PanditPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [panditData, setPanditData] = useState([]);const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try {
            const data = await fetchPanditDetails();
            if (data.status === 1) {
              setPanditData(data.data);
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
      console.log(panditData)



const usersData = [
    { name: "Shivanshu", phone: "1234567890", email: "batham.shivanshu31@gmail.com" },
    { name: "Chandni", phone: "9644554331", email: "chandniverma4478557@gmail.com" },
    { name: "Chandni", phone: "6388482208", email: "chandniverma4478557@gmail.com" },
    { name: "Rachit Tripathi", phone: "8601599299", email: "rachit.tripathi.75@gmail.com" },
    { name: "Vinay Kumar", phone: "9336713280", email: "kumarvinay15381@gmail.com" },
  ];

  // Table columns
  const userColumns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Email", selector: (row) => row.email },
  ];
  const handleDelete = async(id) => {
    console.log(id)
    try {
          const response = await deletePandit(id);
          if (response.status === 1) {
            toast.success("Pandit deleted successfully!");
            setPanditData(panditData.filter((item) => item._id !== id));
            
          } else {
            toast.error("Failed to delete Pooja.");
          }
        } catch (error) {
          toast.error("Error deleting Pooja. Please try again.");
          console.error("Error deleting Pooja:", error);
        }
      };

// const handleEdit = async(id) => {
       
//         try {
//               const response = await deletePandit(id);
//               if (response.status === 1) {
//                 toast.success("Pandit deleted successfully!");
//                 setPanditData(panditData.filter((item) => item._id !== id));
                
//               } else {
//                 toast.error("Failed to delete Pooja.");
//               }
//             } catch (error) {
//               toast.error("Error deleting Pooja. Please try again.");
//               console.error("Error deleting Pooja:", error);
//             }
//           };


const navigate = useNavigate(); // Initialize useNavigate

// Handle Edit - Navigate to the edit page with the ID in params
const handleEdit = (id, row,rowImg,rowAdharImg) => {

 
  navigate(`/edit-pandit/${id}`, { state: { row,rowImg,rowAdharImg } }); // Pass row data as state
};
 

  const navigateToAddPandit = () => {
    
    navigate('/pandit/add-pandit');
  };


  const columns = [
    { name: "S No.", selector: (row, index) => index + 1 },
    { name: "Username", selector: (row) => row.username },
    { name: "Email", selector: (row) => row.email },
    { name: "Mobile", selector: (row) => row.mobile },
    { name: "Status", selector: (row) => row.status },
    { name: "Experience", selector: (row) => row.experience },
    { name: "Approved", selector: (row) => (row.approved ? "Yes" : "No") },
    { name: "Created At", selector: (row) => new Date(row.created_at).toLocaleString() },
    { name: "Updated At", selector: (row) => new Date(row.update_at).toLocaleString() },
    { name: "City", selector: (row) => row.city },
    { name: "Country", selector: (row) => row.country },
    { name: "Bank Account", selector: (row) => row.bank_ac_no },
    { name: "Bio", selector: (row) => row.bio },
    { name: "Gender", selector: (row) => row.gender },
    { name: "Skills", selector: (row) => row.skills },
    { name: "Account Type", selector: (row) => row.account_type },
    {
      name: "Image",
      selector: (row) =>
        row.image ? (
          <>
          {console.log(`http://localhost:3003${row.image}`)}
          <img
            src={`http://localhost:3003${row.image}`}
            alt={row.username}
            width={50}
            height={50}
          />
          </>
        ) : (
          "N/A"
        ),
    },
    {
      name: "Aadhar Image",
      selector: (row) =>
        row.aadhar_image ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${row.aadhar_image}`}
            alt="Aadhar"
            width={50}
            height={50}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            onClick={() =>
              handleEdit(
                row._id,row,row.image,row.aadhar_image)
            }
            className="btn btn-primary btn-sm me-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger btn-sm text-white"
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  
  

return (
  <section>
  <ToastContainer />
 <div className="row justify-content-center">
   <div className="col-12">
     <div className="card shadow-lg mb-4 border-0">
       <div className="card-header bg-dark text-white py-2">
         <div className="d-flex align-items-center justify-content-between">
           <h6 className="mb-0">Pandit List</h6>
           <a
        href="javascript:void(0)"
        className="btn btn-warning text-dark btn-sm"
        onClick={navigateToAddPandit}
      >
        Add Pandit
      </a>
         </div>
       </div>
       {loading ? (
         <div className="justify-content-center d-flex p-5">
           <CSpinner color="primary" />
         </div>
       ) : (
         <GetTable data={panditData} columns={columns} title="Pandit List" />
       )}
     </div>
   </div>
 
 
 </div>
</section>

);
};



export default PanditPage;


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
            <p style={{ fontWeight: "500" }}>Are you sure you want to delete this Pooja Category?</p>
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
              className="btn btn-danger text-white"
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