"use client"

import React from 'react';
import { logout } from '@/store/feature/user/userSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const logoutHandler = () => {
        dispatch(logout());
        router.push('/');
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <div style={{ width: '30%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h2>Statistics</h2>
                    <p>Some statistics here...</p>
                </div>
                <div style={{ width: '30%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h2>Recent Orders</h2>
                    <p>List of recent orders...</p>
                </div>
                <div style={{ width: '30%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h2>Loogut here</h2>
                    <button className='cursor-pointer transition border border-red-200 rounded-md px-4 py-2 text-white bg-red-500 hover:bg-red-400' onClick={logoutHandler}>logout</button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;