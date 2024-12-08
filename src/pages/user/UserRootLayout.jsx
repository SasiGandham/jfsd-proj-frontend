import { Outlet } from "react-router-dom";
import UserNavBar from "./UserNavBar";


export default function UserRootLayout() {
  return (
    <>
      <UserNavBar />
      <main>
      <Outlet />
      </main>
    </>
  )
}
