// src/homepagecomponents/registration/steps/Step5Review.jsx
import React from "react";
import { ArrowLeft, CheckCircle, Pencil } from "lucide-react";

export default function Step5Review({ data, back, onSubmit, goTo }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <CheckCircle className="text-green-600" /> Review & Submit
      </h3>

      <div className="space-y-8">

        {/* ---------------------- PERSONAL DETAILS ---------------------- */}
        <div className="p-5 bg-gray-50 rounded-xl shadow-inner">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-gray-700">Personal Details</h4>
            <button className="text-blue-600 hover:underline" onClick={() => goTo(1)}>
              <Pencil size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <p><b>Name:</b> {data.fullname}</p>
            <p><b>Father Name:</b> {data.fathername}</p>
            <p><b>Date of Birth:</b> {data.dob}</p>
            <p><b>Gender:</b> {data.gender}</p>
            <p><b>Email:</b> {data.email}</p>
            <p><b>Mobile:</b> {data.mobile}</p>
            {data.alternativeMobile && (
              <p><b>Alternate Mobile:</b> {data.alternativeMobile}</p>
            )}
          </div>
        </div>

        {/* ---------------------- ADDRESS ---------------------- */}
        <div className="p-5 bg-gray-50 rounded-xl shadow-inner">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-gray-700">Address Details</h4>
            <button className="text-blue-600 hover:underline" onClick={() => goTo(2)}>
              <Pencil size={18} />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <p>
              <b>Permanent Address:</b>  
              {data.permAddress}, {data.permDistrict}, {data.permState} - {data.permPincode}
            </p>

            <p>
              <b>Correspondence Address:</b>  
              {data.corrAddress}, {data.corrDistrict}, {data.corrState} - {data.corrPincode}
            </p>
          </div>
        </div>

        {/* ---------------------- EDUCATION ---------------------- */}
        <div className="p-5 bg-gray-50 rounded-xl shadow-inner">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-gray-700">Education Details</h4>
            <button className="text-blue-600 hover:underline" onClick={() => goTo(3)}>
              <Pencil size={18} />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <p><b>Qualification:</b> {data.qualification}</p>
            <p><b>University / College:</b> {data.university}</p>
            <p><b>Passing Year:</b> {data.passingYear}</p>
            <p><b>Grade:</b> {data.grade}</p>
          </div>
        </div>

        {/* ---------------------- DOCUMENTS ---------------------- */}
        <div className="p-5 bg-gray-50 rounded-xl shadow-inner">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-gray-700">Documents</h4>
            <button className="text-blue-600 hover:underline" onClick={() => goTo(4)}>
              <Pencil size={18} />
            </button>
          </div>

          <ul className="mt-3 space-y-2 text-gray-700">
            <li><b>Aadhar:</b> {data.documents?.aadhar?.name || "Not Uploaded"}</li>
            <li><b>Photo:</b> {data.documents?.photo?.name || "Not Uploaded"}</li>
          </ul>

          {/* EXPERIENCE LIST */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Work Experience</h4>

            {data.experienceList?.length > 0 ? (
              data.experienceList.map((exp, i) => (
                <div key={i} className="border p-4 rounded-xl bg-white shadow-sm mb-3">
                  <p><b>Company:</b> {exp.company}</p>
                  <p><b>Role:</b> {exp.role}</p>
                  <p><b>Duration:</b> {exp.duration}</p>
                  <p><b>Description:</b> {exp.description || "—"}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No experience added</p>
            )}
          </div>
        </div>
      </div>

      {/* ---------------------- ACTION BUTTONS ---------------------- */}
      <div className="flex justify-between mt-8">
        <button
          onClick={back}
          className="bg-gray-300 px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <button
          onClick={onSubmit}
          className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700"
        >
          Submit ✓
        </button>
      </div>

    </div>
  );
}
