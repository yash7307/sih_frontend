import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

// Header and Footer (always loaded)
import PMHeader from "./homepagecomponents/header/pm-header";
import FooterSection from "./homepagecomponents/pm-footer";

// Lazy load components for better performance
const HeroSection = lazy(() => import("./homepagecomponents/hero-section"));
const DashboardSection = lazy(() => import("./homepagecomponents/dashboard-section"));
const EligibilitySection = lazy(() => import("./homepagecomponents/eligibility-section"));
const BenefitsSection = lazy(() => import('./homepagecomponents/benefits-section'));
const SectorsSection = lazy(() => import('./homepagecomponents/sector-section'));
const EventsGallery = lazy(() => import('./homepagecomponents/events-gallery'));
const PartnersSection = lazy(() => import('./homepagecomponents/partner-section'));
const YouthRegistration = lazy(() => import("./homepagecomponents/YouthRegistration"));
const YouthForm = lazy(() => import("./homepagecomponents/youthform/YouthForm"));
const SubmissionSuccess = lazy(() => import("./homepagecomponents/SubmissionSuccess"));
const Login = lazy(() => import("./homepagecomponents/Login"));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      <p className="mt-4 text-gray-600 text-lg font-semibold">Loading...</p>
    </div>
  </div>
);

// Home page component
const HomePage = () => (
  <>
    <HeroSection />
    <DashboardSection />
    <EligibilitySection />
    <BenefitsSection />
    <SectorsSection />
    <EventsGallery />
    <PartnersSection />
    <FooterSection />
  </>
);

// Layout wrapper component
const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  // Routes where header should be hidden
  const hideHeaderRoutes = [
    '/youth-registration',
    '/youth-form',
    '/submission-success',
    '/login',
    '/mobile-verification',
    '/otp-verification',
    '/resume-upload'
  ];

  // Check if current route should hide header
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <PMHeader />}
      {children}
    </>
  );
};

function App() {
  return (
    <div className="app-container">
      <LayoutWrapper>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Redirect root to home */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Home page route */}
            <Route path="/home" element={<HomePage />} />

            {/* Registration and auth routes (without header) */}
            <Route path="/youth-registration" element={<YouthRegistration />} />
            <Route path="/youth-form" element={<YouthForm />} />
            <Route path="/submission-success" element={<SubmissionSuccess />} />
            <Route path="/login" element={<Login />} />

            {/* 404 Not Found route */}
            <Route path="*" element={
              <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
                <div className="text-center p-8">
                  <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                  <a
                    href="/home"
                    className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Go to Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </Suspense>
      </LayoutWrapper>
    </div>
  );
}

export default App;