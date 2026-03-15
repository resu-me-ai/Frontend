import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import {
  HomePage,
  SignUpPage,
  SignInPage,
  DashboardPage,
  JobDescriptionPage,
  Step1,
  Step2,
  Step3,
  Step4,
} from '@/pages';
import { UploadResumePage } from '@/pages/UploadResumePage';
import { AnalysisInProgressPage } from '@/pages/AnalysisInProgressPage';
import { AnalysisScorePage } from '@/pages/AnalysisScorePage';
import { ContextCollectionPage } from '@/pages/ContextCollectionPage';
import { EnhancementReviewPage } from '@/pages/EnhancementReviewPage';
import { GeneratingPage } from '@/pages/GeneratingPage';
import { ResumeCustomizationPage } from '@/pages/ResumeCustomizationPage';
import { PricingPage } from '@/pages/PricingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* Protected Home Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-description"
          element={
            <ProtectedRoute>
              <JobDescriptionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-resume"
          element={
            <ProtectedRoute>
              <UploadResumePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analyzing"
          element={
            <ProtectedRoute>
              <AnalysisInProgressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis-score"
          element={
            <ProtectedRoute>
              <AnalysisScorePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis-score/:analysisId"
          element={
            <ProtectedRoute>
              <AnalysisScorePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/context-collection/:sessionId"
          element={
            <ProtectedRoute>
              <ContextCollectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generating/:sessionId"
          element={
            <ProtectedRoute>
              <GeneratingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enhancement-review/:sessionId"
          element={
            <ProtectedRoute>
              <EnhancementReviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customize/:sessionId"
          element={
            <ProtectedRoute>
              <ResumeCustomizationPage />
            </ProtectedRoute>
          }
        />

        {/* Onboarding Routes */}
        <Route
          path="/onboarding/step/1"
          element={
            <ProtectedRoute>
              <Step1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/step/2"
          element={
            <ProtectedRoute>
              <Step2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/step/3"
          element={
            <ProtectedRoute>
              <Step3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/step/4"
          element={
            <ProtectedRoute>
              <Step4 />
            </ProtectedRoute>
          }
        />

        {/* Redirect /onboarding to step 1 */}
        <Route path="/onboarding" element={<Navigate to="/onboarding/step/1" replace />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
