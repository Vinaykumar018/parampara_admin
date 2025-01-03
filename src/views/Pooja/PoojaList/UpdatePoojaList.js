import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from 'react-rte'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { UpdatePoojaCategory } from '../../Services/poojaApiService';
import { UpdatePoojaCategory } from '../../Services/poojaApiService';


const UpdatePoojaList = () => {
  const [isSamagriChecked, setIsSamagriChecked] = useState(false);
  const [formData, setFormData] = useState({
    pooja_name: "",
    pooja_category: "",
    pooja_Samegristatus: "0",
    price_withSamagri: "",
    price_withoutSamagri: "",
    pooja_image: null,
    short_discription: "",
    long_discription: RichTextEditor.createEmptyValue(),
    samagriName: "",
    samagriPrice: "",
    samagri_discription: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const [dynamicSamagriData, setDynamicSamagriData] = useState([{
    samagriName: '',
    samagriPrice: '',
    samagriDescription: ''
  }]);

  const handleDynamicFieldChange = (index, fieldName) => (e) => {
    const { value } = e.target;
    const updatedSamagriData = [...dynamicSamagriData];
    updatedSamagriData[index][fieldName] = value;
    setDynamicSamagriData(updatedSamagriData);
  };

  const addMoreFields = () => {
    setDynamicSamagriData([
      ...dynamicSamagriData,
      { samagriName: '', samagriPrice: '', samagriDescription: '' }
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setFormData((prevData) => ({ ...prevData, pooja_image: file }));
    } else {
      toast.error('Invalid file type. Please select an image.');
    }
  };

  const handleEditorChange = (value, fieldName) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "long_discription" || key === "short_discription") {
        data.append(key, formData[key].toString("html"));
      } else {
        data.append(key, formData[key]);
      }
    });

    if (isSamagriChecked) {
      // Convert dynamicSamagriData to JSON string and append it
      data.append('samagriData', JSON.stringify(dynamicSamagriData));
    }

    // Log the FormData for debugging
    for (let pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      const response = await UpdatePoojaCategory(formData.id, data);
      if (response.status === 1) {
        toast.success('Pooja updated successfully');
        setFormData({
          pooja_name: "",
          pooja_category: "",
          pooja_Samegristatus: "0",
          price_withSamagri: "",
          price_withoutSamagri: "",
          pooja_image: null,
          short_discription: "",
          long_discription: RichTextEditor.createEmptyValue(),
          samagriName: "",
          samagriPrice: "",
          samagri_discription: "",
        });
        setDynamicSamagriData([{ samagriName: '', samagriPrice: '', samagriDescription: '' }]); // Reset dynamic fields
        setImagePreview(null);
      }
    } catch (error) {
      toast.error("Failed to update Pooja. Please try again.");
      console.error("Error updating Pooja:", error);
    }
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
 setIsSamagriChecked(checked);
    setFormData((prevData) => ({
      ...prevData,
      pooja_Samegristatus: checked ? "1" : "0"
    }));
  };

  return (
    <div className="card-body bg-light">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-lg mb-4 border-0">
            <div className="card-header text-left bg-dark text-white">
              <h6 className="text-Capitalize">Update Pooja</h6>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Pooja Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pooja Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pooja_name"
                      placeholder="Enter Pooja Name"
                      value={formData.pooja_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Pooja Category */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pooja Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pooja_category"
                      placeholder="Enter Pooja Category"
                      value={formData.pooja_category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Price With Samagri */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price (With Samagri)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price_withSamagri"
                      placeholder="Enter Price With Samagri"
                      value={formData.price_withSamagri}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Price Without Samagri */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price (Without Samagri)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price_withoutSamagri"
                      placeholder="Enter Price Without Samagri"
                      value={formData.price_withoutSamagri}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Pooja Image */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pooja Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-fluid"
                        style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }}
                      />
                    </div>
                  )}

                  {/* Short Description */}
                  <div className="col-md-8 mb-3">
                    <label className="form-label">Short Description</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Enter Short Description"
                      name="short_discription"
                      value={formData.short_discription}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Long Description */}
                  <div className="mb-3">
                    <label className="form-label">Long Description</label>
                    <RichTextEditor
                      editorStyle={{
                        minHeight: "120px",
                        backgroundColor: "#f4f4f4",
                        border: "1px solid #ccc",
                        color: "#333",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                      value={formData.long_discription}
                      onChange={(value) => handleEditorChange(value, "long_discription")}
                    />
                  </div>

                  {/* Samagri Status */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Samagri Status</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isSamagriChecked}
                        onChange={ handleCheckboxChange}
                      />
                      <label className="form-check-label">Is Samagri Included?</label>
                    </div>
                  </div>

                  {/* Dynamic Samagri Fields */}
                  {isSamagriChecked && dynamicSamagriData.map((field, index) => (
                    <div key={index} className="mb-3 row">
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Samagri Name"
                          value={field.samagriName}
                          onChange={handleDynamicFieldChange(index, 'samagriName')}
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Price"
                          value={field.samagriPrice}
                          onChange={handleDynamicFieldChange(index, 'samagriPrice')}
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          value={field.samagriDescription}
                          onChange={handleDynamicFieldChange(index, 'samagriDescription')}
                        />
                      </div>
                    </div>
                  ))}
                  
                  {/* Add More Samagri Fields */}
                  {isSamagriChecked && (
                    <div className="col-12 mb-3">
                      <button type="button" className="btn btn-primary" onClick={addMoreFields}>
                        Add More Fields
                      </button>
                    </div>
                  )}

                  <div className="text-end mb-3">
                    <button type="submit" className="me-2 btn btn-dark btn-sm">Update Pooja</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdatePoojaList;