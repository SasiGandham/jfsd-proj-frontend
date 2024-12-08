import { Outlet } from "react-router-dom";
import PoliticianNavBar from "./PoliticianNavBar";

export default function PoliticianRootLayout() {
  return (
    <>
      <PoliticianNavBar />  
      <Outlet />
    </>
  )
}



