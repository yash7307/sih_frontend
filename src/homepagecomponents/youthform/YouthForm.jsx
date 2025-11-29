// src/homepagecomponents/registration/RegistrationForm.jsx
import React, { useEffect, useState } from "react";
import ProgressBar from "./progressBar";
import Step1Personal from "./Step1Personal";
import Step2Address from "./Step2Address";
import Step3Education from "./Step3Education"
import Step4Skills from "./step4skills"
import Step5docu from "./Step5docu"
import Step6Review from "./Step6review";

const STORAGE_KEY = "youth_reg_v3";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    // Personal
    fullname: "",
    fatherName: "",
    dob: "",
    gender: "",
    category: "",
    email: "",
    mobile: "",
    alternativeMobile: "",
    differentlyAbled: "No",
    // Permanent address
    permHouse: "",
    permLine1: "",
    permLine2: "",
    permState: "",
    permDistrict: "",
    permBlock: "",
    permVillage: "",
    permPincode: "",
    // Correspondence (current)
    corrSame: true,
    corrHouse: "",
    corrLine1: "",
    corrLine2: "",
    corrState: "",
    corrDistrict: "",
    corrBlock: "",
    corrVillage: "",
    corrPincode: ""
  });

  // load saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.form) setForm(parsed.form);
        if (parsed.step) setStep(parsed.step);
      }
    } catch (e) {
      console.warn("Failed to load saved form:", e);
    }
  }, []);

  // autosave
  useEffect(() => {
    setSaving(true);
    const t = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, form }));
      setSaving(false);
    }, 450);
    return () => clearTimeout(t);
  }, [form, step]);

  // when corrSame toggles ON, copy perm -> corr
  useEffect(() => {
    if (form.corrSame) {
      setForm((prev) => ({
        ...prev,
        corrHouse: prev.permHouse,
        corrLine1: prev.permLine1,
        corrLine2: prev.permLine2,
        corrState: prev.permState,
        corrDistrict: prev.permDistrict,
        corrBlock: prev.permBlock,
        corrVillage: prev.permVillage,
        corrPincode: prev.permPincode
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.corrSame,
    form.permHouse,
    form.permLine1,
    form.permLine2,
    form.permState,
    form.permDistrict,
    form.permBlock,
    form.permVillage,
    form.permPincode
  ]);

  const update = (patch) => setForm((p) => ({ ...p, ...patch }));

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  // final submit example
  const handleSubmit = async () => {
    // Basic validation before submit (you can add more)
    if (!form.fullname || !form.mobile) {
      alert("Please fill required personal fields before submitting.");
      return;
    }

    try {
      const formData = new FormData();

      // 1. Append simple fields
      Object.keys(form).forEach(key => {
        if (typeof form[key] !== 'object' && key !== 'educationList' && key !== 'experienceList' && key !== 'skills' && key !== 'documents') {
          formData.append(key, form[key]);
        }
      });

      // 2. Append complex arrays (JSON stringify)
      // Handle educationList - extract files first
      const eduList = (form.educationList || []).map(edu => {
        if (edu.certificate instanceof File) {
          formData.append('certificates', edu.certificate);
          return { ...edu, certificate: { type: 'file_upload' } }; // Placeholder
        }
        return edu;
      });
      formData.append('educationList', JSON.stringify(eduList));

      formData.append('experienceList', JSON.stringify(form.experienceList || []));
      formData.append('skills', JSON.stringify(form.skills || []));

      // 3. Append Documents (Aadhar & Photo)
      if (form.documents?.aadhar instanceof File) {
        formData.append('aadhar', form.documents.aadhar);
      }
      if (form.documents?.photo instanceof File) {
        formData.append('photo', form.documents.photo);
      }
      // Append metadata for documents if needed, or just rely on files
      // We can send the rest of documents object as JSON if it contains other info
      // But for now, we only have files there.

      const res = await fetch("https://sih-backend-4.onrender.com/api/youth/register", {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" }, // Browser sets this automatically with boundary
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registration submitted successfully ✔");
        localStorage.removeItem(STORAGE_KEY);
        // reset or navigate as needed
      } else {
        alert("Submit failed: " + (data.error || JSON.stringify(data)));
      }
    } catch (err) {
      console.error(err);
      alert("Network error: " + err.message);
    }
  };

  // decorative background (use your uploaded screenshot path)
  const bgStyle = {
    backgroundImage: 'url("/mnt/data/Screenshot 2025-11-22 013044.png")',
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <div className="min-h-screen p-6" style={bgStyle}>
      <div className="max-w-6xl mx-auto bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Youth Registration</h2>
            <div className="text-sm text-gray-600">
              <span className="mr-3">Step {step} of 2</span>
              <span>{saving ? "Saving..." : "Saved"}</span>
            </div>
          </div>

          <div className="mt-4">
            <ProgressBar step={step} total={6} />
          </div>

          <div className="mt-6">
            {step === 1 && (
              <Step1Personal data={form} update={update} next={next} />
            )}
            {step === 2 && (
              <Step2Address
                data={form}
                update={update}
                back={back}
                next={next}
              />
            )}
            {step === 3 && (
              <Step3Education
                data={form}
                update={update}
                back={back}
                next={next}
              />
            )}
            {step === 4 && (
              <Step4Skills
                data={form}
                update={update}
                back={back}
                next={next}
              />
            )}
            {step === 5 && (
              <Step5docu
                data={form}
                update={update}
                back={back}
                next={next}
              />
            )}
            {step === 6 && (
              <Step6Review
                data={form}
                update={update}
                back={back}
                submit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
