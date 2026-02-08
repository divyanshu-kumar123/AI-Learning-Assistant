import React from 'react'
import { Outlet } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';

const ProtectedRoute = () => {
    const isLoading = false;
    const isAuthenticated = true;

    if(isLoading){
        return (
            <div className=''>
                <p>Loading...</p>
            </div>
        )
    }
  return isAuthenticated ? (
    <AppLayout>
        <Outlet />
    </AppLayout>
  ) : (
    <Navigate to = '/login' replace />
  );
}

export default ProtectedRoute