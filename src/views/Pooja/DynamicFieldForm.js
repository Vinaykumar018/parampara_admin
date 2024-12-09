

// import React, { useState } from "react";
// import RichTextEditor from "react-rte";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { createPooja } from '../Services/poojaApiService'; // Ensure this import path is correct
// import { useNavigate } from "react-router-dom";

// const PoojaForm = () => {
//   const [isSamagriChecked, setIsSamagriChecked] = useState(false);
//   const [formData, setFormData] = useState({
//     pooja_name: "",
//     pooja_category: "",
//     pooja_Samegristatus: "0",
//     price_withSamagri: "",
//     price_withoutSamagri: "",
//     pooja_image: null,
//     short_discription: "",
//     long_discription: RichTextEditor.createEmptyValue(),
//     samagriName: "",
//     samagriPrice: "",
//     samagri_discription: "",
//     samagridynamicFields: [] // Array to hold dynamic input fields data
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const navigate = useNavigate();

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle image file selection and preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//     setFormData((prevData) => ({ ...prevData, pooja_image: file }));
//   };

//   // Handle rich text editor changes
//   const handleEditorChange = (value, fieldName) => {
//     setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
//   };

//   // Function to add a new dynamic field with proper initialization
// // Function to add a new dynamic field with an incremented name
// const addDynamicField = () => {
//   const nextFieldIndex = formData.samagridynamicFields.length + 1;
//   setFormData((prevData) => ({
//     ...prevData,
//     samagridynamicFields: [
//       ...prevData.samagridynamicFields,
//       { [`samagri${nextFieldIndex}`]: "" }, // Only one input field per click
//     ],
//   }));
// };

// // Function to handle changes in the input field
// const handleDynamicFieldChange = (index, value) => {
//   const newFields = [...formData.samagridynamicFields];
//   newFields[index][`samagri${index + 1}`] = value;
//   setFormData((prevData) => ({
//     ...prevData,
//     samagridynamicFields: newFields,
//   }));
// };



//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "long_discription" || key === "short_discription") {
//         data.append(key, formData[key].toString("html"));
//       } else {
//         data.append(key, formData[key]);
//       }
//     });
   

//     try {
//       await createPooja(data);
//       toast.success("Pooja created successfully!");
//       setFormData({
//         pooja_name: "",
//         pooja_category: "",
//         pooja_Samegristatus: "0",
//         price_withSamagri: "",
//         price_withoutSamagri: "",
//         pooja_image: null,
//         short_discription: "",
//         long_discription: RichTextEditor.createEmptyValue(),
//         samagriName: "",
//         samagriPrice: "",
//         samagri_discription: "",
//         samagridynamicFields: []
//       });
//       setImagePreview(null);
//     } catch (error) {
//       toast.error("Failed to create Pooja. Please try again.");
//       console.error("Error creating Pooja:", error);
//     }
//   };

//   // Handle checkbox change for samagri status
//   const handleCheckboxChange = (e) => {
//     const checked = e.target.checked;
//     setIsSamagriChecked(checked);
//     setFormData((prevData) => ({
//       ...prevData,
//       pooja_Samegristatus: checked ? "1" : "0"
//     }));
//   };

//   return (
//     <div className="card-body bg-light">
//       <div className="row justify-content-center">
//         <div className="col-12">
//           <div className="card shadow-lg mb-4 border-0">
//             <div className="card-header text-left bg-dark text-white">
//               <h6 className="text-Capitalize">Add New Pooja</h6>
//             </div>
//             <div className="card-body bg-light">
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   {/* Pooja Name */}
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Pooja Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="pooja_name"
//                       placeholder="Enter Pooja Name"
//                       value={formData.pooja_name}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   {/* Pooja Category */}
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Pooja Category</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="pooja_category"
//                       placeholder="Enter Pooja Category"
//                       value={formData.pooja_category}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   {/* Price With Samagri */}
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Price (With Samagri)</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="price_withSamagri"
//                       placeholder="Enter Price With Samagri"
//                       value={formData.price_withSamagri}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   {/* Price Without Samagri */}
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Price (Without Samagri)</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="price_withoutSamagri"
//                       placeholder="Enter Price Without Samagri"
//                       value={formData.price_withoutSamagri}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   {/* Pooja Image */}
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Pooja Image</label>
//                     <input
//                       type="file"
//                       className="form-control"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       required
//                     />
//                   </div>

//                   {/* Image Preview */}
//                   {imagePreview && (
//                     <div className="mb-3">
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="img-fluid"
//                         style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }}
//                       />
//                     </div>
//                   )}

//                   {/* Short Description */}
//                   <div className="col-md-8 mb-3">
//                     <label className="form-label">Short Description</label>
//                     <textarea
//                       className="form-control"
//                       rows="2"
//                       placeholder="Enter Short Description"
//                       name="short_discription"
//                       value={formData.short_discription}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   {/* Long Description */}
//                   <div className="mb-3">
//                     <label className="form-label">Long Description</label>
//                     <RichTextEditor
//                       editorStyle={{
//                         minHeight: "120px",
//                         backgroundColor: "#f4f4f4",
//                         border: "1px solid #ccc",
//                         color: "#333",
//                         padding: "10px",
//                         cursor: "pointer",
//                       }}
//                       value={formData.long_discription}
//                       onChange={(value) => handleEditorChange(value, "long_discription")}
//                     />
//                   </div>

//                   {/* Samagri Status */}
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Samagri Status</label>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         id="pooja_Samegristatus"
//                         checked={isSamagriChecked}
//                         onChange={handleCheckboxChange}
//                       />
//                       <label className="form-check-label" htmlFor="pooja_Samegristatus">
//                         Include Samagri
//                       </label>
//                     </div>
//                   </div>

//                   {/* Conditionally Render Samagri Fields */}
//                   {isSamagriChecked && (
//                     <>
//                       <div className="row">
//                         <div className="col-md-6 mb-3">
//                           <label className="form-label">Samagri Name</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="samagriName"
//                             placeholder="Enter Samagri Name"
//                             value={formData.samagriName}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>

//                         <div className="col-md-6 mb-3">
//                           <label className="form-label">Samagri Price</label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="samagriPrice"
//                             placeholder="Enter Samagri Price"
//                             value={formData.samagriPrice}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>

//                         <div className="col-md-12 mb-3">
//                           <label className="form-label">Samagri Description</label>
//                           <textarea
//                             className="form-control"
//                             rows="3"
//                             placeholder="Enter Samagri Description"
//                             name="samagri_discription"
//                             value={formData.samagri_discription}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       {/* Add More Fields Button */}
                   

//                       {/* Render Dynamic Samagri Fields */}
//                       {/* Render Dynamic Samagri Fields */}
//                       {formData.samagridynamicFields.map((field, index) => {
//         const fieldName = `samagri${index + 1}`; // Dynamic field name

//         return (
//           <div key={index} className="mb-3">
//             <label className="form-label">Samagri {index + 1} - Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder={`Enter Samagri ${index + 1} Name`}
//               value={field[fieldName]}
//               onChange={(e) => handleDynamicFieldChange(index, e.target.value)}
//             />
//           </div>
//         );
//       })}

// <button
//                         type="button"
//                         className="btn btn-outline-primary mb-3"
//                         onClick={addDynamicField}
//                       >
//                         Add More Fields
//                       </button>

//                     </>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <div className="text-end">
//   <button type="submit" className="me-2 btn btn-dark btn-sm">Add Pooja</button>
//   </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default PoojaForm;


