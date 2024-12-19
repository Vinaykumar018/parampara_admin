

import React, { useEffect, useState } from "react";
import axios from "axios";
import { createPandit } from "../Services/panditApiService"; // Ensure this API function is working
import { toast } from "react-toastify"; // If you're using toast for success or error messages

const AddPandit = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
   mobile: "",
    address: "",
    gender: "male",
    city: "",
    state: "",
    country: "",
    dob: "",
    pincode: "",
    skills: "",
    account_type: "normal",
    pancard_no: "",
    degree: "",
    bank_ac_no: "",
    ifsc_code: "",
    acc_holder_name: "",
    bank_name: "",
    bio: "",
    type: "",
    register_id: "",
    booking_status: "active",
    fcm_tokken: "",
  });

  const [profileData, setProfileData] = useState(null);

  

  useEffect(() => {
    if (profileData) {
      setFormData({
        username: profileData.username || "",
        email: profileData.email || "",
        password: profileData.password || "",
        mobile: profileData.mobile || "",
        address: profileData.address || "",
        gender: profileData.gender || "male",
        city: profileData.city || "",
        state: profileData.state || "",
        country: profileData.country || "",
        dob: profileData.dob || "",
        Pooja_Category: profileData.Pooja_Category || "",
        pincode: profileData.pincode || "",
        skills: profileData.skills || "",
        account_type: profileData.account_type || "normal",
        pancard_no: profileData.pancard_no || "",
        degree: profileData.degree || "",
        bank_ac_no: profileData.bank_ac_no || "",
        ifsc_code: profileData.ifsc_code || "",
        acc_holder_name: profileData.acc_holder_name || "",
        bank_name: profileData.bank_name || "",
        bio: profileData.bio || "",
        type: profileData.type || "",
        register_id: profileData.register_id || "",
        booking_status: profileData.booking_status || "active",
        fcm_tokken: profileData.fcm_tokken || "",
      });
    }
  }, [profileData]);

  const [image, setImage] = useState(null);
  const [aadharImage, setAadharImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "image") setImage(files[0]);
    if (name === "aadhar_image") setAadharImage(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profileData)
    

    try {
      const data = await createPandit(formData);
      console.log(data)// Call the API service function
      toast.success("Pandit details created successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create Pandit details."
      );
    }
  };
  const [currentStep, setCurrentStep] = useState(1);


  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  return (
    <>
    <div className="card-body bg-light">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-lg mb-4 border-0">
            <div className="card-header text-left bg-dark text-white">
              <h6 className="text-Capitalize">Add Pandit</h6>
            </div>
     <div className="card-body bg-light">
   <form onSubmit={handleSubmit} >

     
        <div className="">
          

          {/* Username and Email */}
          <div className="border px-3">
  <div className="flex py-2 flex-auto items-center justify-center px-4 mb-1 border-b-2 text-center border-gray-500">
  
  </div>
  <div className="row">
    {/* Username */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Email */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>

    {/* Password */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Phone */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Phone</label>
      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Bio */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Bio</label>
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        className="form-control"
      ></textarea>
    </div>

    {/* Gender */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Gender</label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="form-select"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>

    {/* DOB */}
    <div className="col-md-6 mb-3">
      <label className="form-label">DOB</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Pooja Category */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Pooja Category</label>
      <select
        name="Pooja_Category"
        value={formData.Pooja_Category}
        onChange={handleChange}
        className="form-select"
      >
        <option value="">Select a Pooja Category</option>
        <option value="Satyanarayan_Pooja">Satyanarayan_Pooja</option>
        <option value="SunderKand">SunderKand</option>
        <option value="Navdurga_Pooja">Navdurga_Pooja</option>
        <option value="Ganesh_Sthapna">Ganesh_Sthapna</option>
        <option value="Mundan">Mundan</option>
      </select>
    </div>

    {/* Skills */}
    <div className="col-md-4 mb-3">
      <label className="form-label">Skills</label>
      <input
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Pancard No. */}
    <div className="col-md-4 mb-3">
      <label className="form-label">Pancard No.</label>
      <input
        type="text"
        name="pancard_no"
        value={formData.pancard_no}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Degree */}
    <div className="col-md-4 mb-3">
      <label className="form-label">Degree</label>
      <input
        type="text"
        name="degree"
        value={formData.degree}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Image */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Image</label>
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="form-control"
      />
      {image && (
        <div className="mt-2">
          <img
            src={image instanceof File ? URL.createObjectURL(image) : ""}
            alt="Preview"
            style={{ width: "80%", maxHeight: "100px", objectFit: "cover" }}
          />
        </div>
      )}
    </div>

    {/* Aadhar Image */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Aadhar Image</label>
      <input
        type="file"
        name="aadhar_image"
        onChange={handleFileChange}
        className="form-control"
      />
      {aadharImage && (
        <div className="mt-2">
          <img
            src={aadharImage instanceof File ? URL.createObjectURL(aadharImage) : ""}
            alt="Preview"
            style={{ width: "80%", maxHeight: "100px", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  </div>

    
     




 

  <div className="row">
    {/* Address */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Pincode */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Pincode</label>
      <input
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  </div>

  <div className="row">
    {/* City */}
    <div className="col-md-4 mb-3">
      <label className="form-label">City</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* State */}
    <div className="col-md-4 mb-3">
      <label className="form-label">State</label>
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Country */}
    <div className="col-md-4 mb-3">
      <label className="form-label">Country</label>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  </div>

    

      {/* Step 3 */}
      
    
  

  {/* Bank Account Fields */}
  <div className="row mt-5">
    {/* Bank Account Name */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Bank Account Name</label>
      <input
        type="text"
        name="acc_holder_name"
        value={formData.acc_holder_name}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Bank Account No. */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Bank Account No.</label>
      <input
        type="text"
        name="bank_ac_no"
        value={formData.bank_ac_no}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* IFSC Code */}
    <div className="col-md-6 mb-3">
      <label className="form-label">IFSC Code</label>
      <input
        type="text"
        name="ifsc_code"
        value={formData.ifsc_code}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Bank Name */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Bank Name</label>
      <input
        type="text"
        name="bank_name"
        value={formData.bank_name}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  </div>

  {/* Account Type */}
  <div className="mt-6">
    <label className="form-label">Account Type</label>
    <select
      name="type"
      value={formData.type}
      onChange={handleChange}
      className="form-select"
    >
      <option value="" disabled>Select Account Type</option>
      <option value="savings">Savings Account</option>
      <option value="current">Current Account</option>
      <option value="fixed">Fixed Deposit Account</option>
      <option value="recurring">Recurring Deposit Account</option>
    </select>
  </div>

  {/* Submit button */}
  <div className="text-end mb-3 mt-4">
                <button type="submit" className="me-2 btn btn-dark btn-sm">Add Pandit</button>
                  </div>

     

      {/* Navigation Buttons */}
      </div>
</div>
    </form>
    </div>
              </div>
            </div>
          </div>
        
        </div>

  </>
  );
};

export default AddPandit;
