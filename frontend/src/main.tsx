import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import UserSetup from './pages/UserSetup';
import { ProtectedRoute } from './components/ProtectedRoute';
import './index.css';
import BlogPostPage from './components/BlogPostPage';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute>
                <BlogPostPage />
              </ProtectedRoute>
            }
          />
          <Route path="/user-setup" element={<UserSetup />} />
          <Route path="/author-dashboard" element={<div>Author Dashboard</div>} />
          <Route path="/reader-dashboard" element={<div>Reader Dashboard</div>} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
