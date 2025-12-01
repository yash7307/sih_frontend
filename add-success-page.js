const fs = require('fs');

// Update App.js
let appContent = fs.readFileSync('src/App.js', 'utf8');

// Add SubmissionSuccess import after YouthForm
appContent = appContent.replace(
    'const YouthForm = lazy(() => import("./homepagecomponents/youthform/YouthForm"));',
    'const YouthForm = lazy(() => import("./homepagecomponents/youthform/YouthForm"));\nconst SubmissionSuccess = lazy(() => import("./homepagecomponents/SubmissionSuccess"));'
);

// Add to hideHeaderRoutes
appContent = appContent.replace(
    `'/youth-form',`,
    `'/youth-form',\n    '/submission-success',`
);

// Add route
appContent = appContent.replace(
    '<Route path="/youth-form" element={<YouthForm />} />',
    '<Route path="/youth-form" element={<YouthForm />} />\n            <Route path="/submission-success" element={<SubmissionSuccess />} />'
);

fs.writeFileSync('src/App.js', appContent);
console.log('✓ Updated App.js');

// Update YouthForm.jsx
let formContent = fs.readFileSync('src/homepagecomponents/youthform/YouthForm.jsx', 'utf8');

// Add useNavigate import
formContent = formContent.replace(
    'import React, { useEffect, useState } from "react";',
    'import React, { useEffect, useState } from "react";\nimport { useNavigate } from "react-router-dom";'
);

// Add navigate hook
formContent = formContent.replace(
    'export default function RegistrationForm() {',
    'export default function RegistrationForm() {\n  const navigate = useNavigate();'
);

// Replace alert with navigation
formContent = formContent.replace(
    'alert("Registration submitted successfully ✔");\n        localStorage.removeItem(STORAGE_KEY);',
    'localStorage.removeItem(STORAGE_KEY);\n        navigate("/submission-success");'
);

fs.writeFileSync('src/homepagecomponents/youthform/YouthForm.jsx', formContent);
console.log('✓ Updated YouthForm.jsx');

console.log('\n✅ Success page integration complete!');
