

import React, { useEffect, useState } from "react";
import axios from "axios";
import { updatePanditDetails } from "../Services/panditApiService"; // Ensure this API function is working
import { toast } from "react-toastify"; // If you're using toast for success or error messages

const EditPandit = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
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

  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     const storedEmail = sessionStorage.getItem("storedEmail");
  //     if (!storedEmail) {
  //       console.error("No email found in sessionStorage");
  //       return;
  //     }

  //     try {
  //       const data = await fetchPanditDetails(storedEmail, import.meta.env.VITE_TOKEN); // Ensure this is working
  //       setProfileData(data); // Update state with fetched data
  //       console.log("Fetched Pandit Details:", data);
  //     } catch (error) {
  //       console.error("Error fetching Pandit details:", error.message);
  //     }
  //   };

  //   fetchDetails();
  // }, []);

  useEffect(() => {
    if (profileData) {
      setFormData({
        username: profileData.username || "",
        email: profileData.email || "",
        password: profileData.password || "",
        phone: profileData.phone || "",
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
      const data = await updatePanditDetails(formData, image, aadharImage); // Call the API service function
      toast.success("Pandit details updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update Pandit details."
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
   <form onSubmit={handleSubmit} className="edit-pandit-form mt-4 space-y-6 max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
   <h1 class="text-base font-bold sm:text-2xl">Add Details</h1>
      {/* Step 1 */}
      {currentStep === 1 && (
        <div className="">
          

          {/* Username and Email */}
          <div className="border px-3 ">
          <div className="flex py-2 flex-auto items-center justify-center px-4 mb-1 border-b-2  text-center border-gray-500">
            <div className="text-base text-slate-600 px-2 font-semibold sm:text-lg border-gray-500">Personal Details</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2 mt-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
  <div>
    <label className="block text-sm font-medium text-gray-700">Password</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Phone</label>
    <input
      type="text"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6  py-2">
  <div>
    <label className="block text-sm font-medium text-gray-700">Bio</label>
    <textarea
      name="bio"
      value={formData.bio}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    ></textarea>
  </div>
  <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6  py-2">
  <div>
    <label className="block text-sm font-medium text-gray-700">DOB</label>
    <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div>
  <label className="block text-sm font-medium text-gray-700">Pooja Category</label>
              <select
                name="Pooja_Category"
                value={formData.Pooja_Category}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a Pooja Category</option>
                <option value="Satyanarayan_Pooja">Satyanarayan_Pooja</option>
                <option value="SunderKand">SunderKand</option>
                <option value="Navdurga_Pooja">Navdurga_Pooja</option>
                <option value="Ganesh_Sthapna">Ganesh_Sthapna</option>
                <option value="Mundan">Mundan</option>
              </select>
              </div>
  
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>
    <label className="block text-sm font-medium text-gray-700">Skills</label>
    <input
      type="text"
      name="skills"
      value={formData.skills}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Pancard No.</label>
    <input
      type="text"
      name="pancard_no"
      value={formData.pancard_no}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Degree</label>
    <input
      type="text"
      name="degree"
      value={formData.degree}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6  py-2">
  <div>
    <label className="block text-sm font-medium text-gray-700">Image</label>
    <input
      type="file"
      name="image"
      onChange={handleFileChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    {image && (
              <div className="mt-3">
                <img
                  src={
                    image instanceof File
                      ? URL.createObjectURL(image)
                      : ""
                  }
                  alt="Preview"
                  style={{ width: "80%", maxHeight: "100px", objectFit: "cover" }}
                />
              </div>
            )}
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Aadhar Image</label>
    <input
      type="file"
      name="aadhar_image"
      onChange={handleFileChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

{aadharImage && (
              <div className="mt-3">
                <img
                  src={
                    aadharImage instanceof File
                      ? URL.createObjectURL(aadharImage)
                      : ""
                  }
                  alt="Preview"
                  style={{ width: "80%", maxHeight: "100px", objectFit: "cover" }}
                />
              </div>
            )}
  </div>
</div></div>

        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (



        <div className="border px-3 pb-3">
           <div className="flex py-2 flex-auto items-center justify-center px-4 mb-1 border-b-2  text-center border-gray-500">
            <div className="text-base text-slate-600 px-2 font-semibold sm:text-lg border-gray-500">Address Details</div>
          </div>

          
          {/* Password and Phone */}
         

          {/* Address and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6  py-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
       <label class="block text-sm font-medium text-gray-700">Pincode</label>
       <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {currentStep === 3 && (
        <div className="border px-3">
        <div className="flex py-2 flex-auto items-center justify-center px-4 mb-1 border-b-2  text-center border-gray-500">
         <div className="text-base text-slate-600 px-2 font-semibold sm:text-lg border-gray-500">Address Details</div>
       </div>
          {/* City, State, and Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">

          <div>
    <label className="block text-sm font-medium text-gray-700">Bank Account Name</label>
    <input
      type="text"
      name="acc_holder_name"
      value={formData.acc_holder_name}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Bank Account No.</label>
    <input
      type="text"
      name="bank_ac_no"
      value={formData.bank_ac_no}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
    <input
      type="text"
      name="ifsc_code"
      value={formData.ifsc_code}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
    <input
      type="text"
      name="bank_name"
      value={formData.bank_name}
      onChange={handleChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
</div>

<div className="mt-6">
  <label className="block text-sm font-medium text-gray-700">Account Type</label>
  <select
    name="type"
    value={formData.type}
    onChange={handleChange}
    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="" disabled>Select Account Type</option>
    <option value="savings">Savings Account</option>
    <option value="current">Current Account</option>
    <option value="fixed">Fixed Deposit Account</option>
    <option value="recurring">Recurring Deposit Account</option>
  </select>
</div>



          {/* Submit button */}
          <button
            type="submit"
            className="w-full mb-3 bg-indigo-600 text-white py-2 rounded-md mt-6 hover:bg-indigo-700"
          >
            Update Pandit
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
          >
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button
            type="button"
            onClick={handleNext}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md"
          >
            Next
          </button>
        )}
      </div>
    </form>

  </>
  );
};

export default EditPandit;
