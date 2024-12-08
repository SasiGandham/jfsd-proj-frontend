import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Loginpage,{ action as loginAction } from './pages/LoginPage.jsx'
import RootLayout from './pages/RootLayout.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import UserDashBoard from './pages/user/UserDashBoard.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUp1,{ action as emailOtpAction } from './pages/SignUp/SignUp1.jsx';
import SignUp2,{ action as emailOtpVerifyAction } from './pages/SignUp/SignUp2.jsx';
import SignUp3,{ action as sendUserDetailsAction } from './pages/SignUp/SignUp3.jsx'
import UserRootLayout from './pages/user/UserRootLayout.jsx'
import AdminRootLayout from './pages/admin/AdminRootLayout.jsx';
import PoliticianRootLayout from './pages/politician/PoliticianRootLayout.jsx';
import AdminAddRemovePage from './pages/admin/AdminAddRemovePage.jsx'
import AddPolitician,{ action as addPoliticianAction } from './pages/admin/AddPolitician.jsx'
import AdminFeedPage from './pages/admin/AdminFeedPage.jsx'
import AddPost from './pages/user/AddPost.jsx'
import SendApplication from './pages/user/SendApplication.jsx'
import PolitciansApplications from './pages/politician/PolitciansApplications.jsx'
import PoliticianFeed from './pages/politician/PoliticianFeed.jsx'
import UserDetails from './pages/user/UserDetails.jsx'
import RemovePolitician from './pages/admin/RemovePolitician.jsx'
import RemoveUser from './pages/admin/RemoveUser.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path:'',element:<HomePage />},
      {path:'login',element: <Loginpage />, action: loginAction},
      {path:'signup',element:<SignUp />} ,
      {path:'signup/1',element:<SignUp1 />, action: emailOtpAction} ,
      {path:'signup/2',element:<SignUp2 />, action: emailOtpVerifyAction} ,
      {path:'signup/3',element:<SignUp3 />, action: sendUserDetailsAction} ,
  ]
  },
  {
    path : '/user',
    element: <UserRootLayout />,
    children: [
      {index: true,element:<UserDashBoard />},
      {path: '/user/addPost',element: <AddPost />},
      {path: '/user/sendApplication', element: <SendApplication />},
      {path: '/user/userDetails', element: <UserDetails />}
    ]
  },
  {
    path: '/admin',
    element: <AdminRootLayout />,
    children: [
      { index: true, element: <AdminFeedPage /> },
      { path: 'add', element: <AdminAddRemovePage /> }, 
      { path: 'addPolitician', element: <AddPolitician />,action: addPoliticianAction },
      { path: '/admin/removePolitician',element: <RemovePolitician /> },
      { path: '/admin/removeUser', element: <RemoveUser /> }
    ],
  },  
  {
    path : '/politician',
    element: <PoliticianRootLayout />,
    children: [
      {index: true,element:<PoliticianFeed />},
      {path: '/politician/applications',element: <PolitciansApplications />}
      
    ]
  }
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;
