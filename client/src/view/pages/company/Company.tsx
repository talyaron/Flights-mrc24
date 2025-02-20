import React from 'react'
import { Outlet } from 'react-router';

const Company = () => {
  return (
    <div>
        <h1>Company</h1>
        <Outlet />
    </div>
  )
}

export default Company