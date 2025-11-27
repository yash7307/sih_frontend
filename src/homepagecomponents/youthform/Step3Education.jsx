// src/homepagecomponents/registration/steps/Step3Education.jsx
import React, { useState } from "react";
import { Trash2 } from "lucide-react";

export default function Step3Education({ data, update, next, back }) {
  const [entry, setEntry] = useState({
    qualification: "",
    course: "",
    stream: "",
    board: "",
    institute: "",
    passingYear: "",
    marksType: "",
    score: "",
    certificate: null
  });

  // LOCAL ENTRY CHANGE
  const onLocalChange = (e) => {
    const { name, value, files } = e.target;
    setEntry((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const addEntry = () => {
    if (
      !entry.qualification ||
      !entry.course ||
      !entry.board ||
      !entry.institute ||
      !entry.passingYear ||
      !entry.marksType ||
      !entry.score
    ) {
      alert("Please fill all required fields before saving.");
      return;
    }

    const newList = [...(data.educationList || []), entry];
    update({ educationList: newList });

    // Clear local form
    setEntry({
      qualification: "",
      course: "",
      stream: "",
      board: "",
      institute: "",
      passingYear: "",
      marksType: "",
      score: "",
      certificate: null
    });

    alert("Qualification added ✔");
  };

  const deleteEntry = (idx) => {
    const newList = data.educationList.filter((_, i) => i !== idx);
    update({ educationList: newList });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-6">Education Details</h3>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Qualification Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1">Qualification *</label>
          <select
            name="qualification"
            value={entry.qualification}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">Select qualification</option>
            <option>10th</option>
            <option>12th</option>
            <option>Diploma</option>
            <option>Graduation</option>
            <option>Post Graduation</option>
          </select>
        </div>

        {/* Course */}
        <div>
          <label className="block text-sm font-semibold mb-1">Course *</label>
          <select
            name="course"
            value={entry.course}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">Select course</option>
            <option>All Subjects</option>
            <option>Science</option>
            <option>Commerce</option>
            <option>Arts</option>
            <option>Computer Science</option>
            <option>Engineering</option>
          </select>
        </div>

        {/* Stream */}
        <div>
          <label className="block text-sm font-semibold mb-1">Stream / Specialization</label>
          <select
            name="stream"
            value={entry.stream}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">Select stream</option>
            <option>NA</option>
            <option>PCM</option>
            <option>PCB</option>
            <option>Maths</option>
            <option>Computer Science</option>
          </select>
        </div>

        {/* Board / University */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Name of Board / University *
          </label>
          <input
            name="board"
            value={entry.board}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
            placeholder="Enter Name of Board"
          />
        </div>

        {/* Institute */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Name of Institute *
          </label>
          <input
            name="institute"
            value={entry.institute}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
            placeholder="Enter name of institute"
          />
        </div>

        {/* Year of Passing */}
        <div>
          <label className="block text-sm font-semibold mb-1">Year of Passing *</label>
          <select
            name="passingYear"
            value={entry.passingYear}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">Select year</option>
            {Array.from({ length: 30 }, (_, i) => 2025 - i).map((yr) => (
              <option key={yr}>{yr}</option>
            ))}
          </select>
        </div>

        {/* Marks Obtained */}
        <div>
          <label className="block text-sm font-semibold mb-1">Marks Obtained *</label>
          <select
            name="marksType"
            value={entry.marksType}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          >
            <option value="">Select score type</option>
            <option>Percentage</option>
            <option>CGPA</option>
            <option>Grade</option>
          </select>
        </div>

        {/* CGPA / Score */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            CGPA / Grade / Percentage *
          </label>
          <input
            name="score"
            value={entry.score}
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
            placeholder="Enter score"
          />
        </div>

        {/* Certificate Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">Upload Certificate *</label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            name="certificate"
            onChange={onLocalChange}
            className="p-3 w-full border rounded-lg"
          />
          <p className="text-xs text-gray-500 mt-1">
            Note: Only PDF or image allowed, upto 7MB
          </p>
        </div>
      </div>

      {/* Save + Add More */}
      <div className="flex justify-end mt-6">
        <button
          onClick={addEntry}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Save / Add More
        </button>
      </div>

      {/* LIST OF ADDED QUALIFICATIONS */}
      {data.educationList?.length > 0 && (
        <div className="mt-8">
          {data.educationList.map((q, index) => (
            <div key={index} className="p-4 border rounded-xl mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">QUALIFICATION {index + 1}</h4>
                <button
                  onClick={() => deleteEntry(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <p><strong>Qualification:</strong> {q.qualification}</p>
                <p><strong>Course:</strong> {q.course}</p>
                <p><strong>Stream:</strong> {q.stream || "NA"}</p>
                <p><strong>Board / University:</strong> {q.board}</p>
                <p><strong>Institute:</strong> {q.institute}</p>
                <p><strong>Year of Passing:</strong> {q.passingYear}</p>
                <p><strong>Marks Type:</strong> {q.marksType}</p>
                <p><strong>Score:</strong> {q.score}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BACK & NEXT */}
      <div className="flex justify-between mt-6">
        <button onClick={back} className="px-6 py-3 bg-gray-200 rounded-lg">
          ← Back
        </button>

        <button
          onClick={next}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Save & Next →
        </button>
      </div>
    </div>
  );
}
