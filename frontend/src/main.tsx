import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import { ProtectedRoute } from './components/ProtectedRoute';
import './index.css';
import BlogPostPage from './components/BlogPostPage';
import { UserForm } from './components/UserForm.tsx';

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
      path="/user-form"
      element={
        <ProtectedRoute>
          <UserForm />
        </ProtectedRoute>
    }
  />


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
</Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
