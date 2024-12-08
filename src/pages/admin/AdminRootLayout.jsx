import { Outlet } from "react-router-dom";
import AdminNavbar from './AdminNavBar.jsx'

export default function AdminRootLayout() {
  return (
    <>
      <AdminNavbar /> 
      <Outlet />
    </>
  )
}
