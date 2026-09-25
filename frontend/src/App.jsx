import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Home from './components/Pages/Home'
import Jobs from './components/Pages/Jobs'
import Browse from './components/Pages/Browse'
import Profile from './components/Pages/Profile'
import JobDescription from './components/Pages/JobDescription'
import Companies from './components/Admin/Companies'
import CompanyCreate from './components/Admin/CompanyCreate'
import CompanySetUp from './components/Admin/CompanySetUp'
import JobsAdmin from './components/Admin/JobsAdmin'
import JobCreate from './components/Admin/JobCreate'
import Applicants from './components/Admin/Applicants'
import ProtectedRoute from './components/Admin/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signUp",
    element: <SignUp />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },

  // admin
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute> <CompanySetUp /> </ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><JobsAdmin /> </ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute> <JobCreate /> </ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicatios",
    element: <ProtectedRoute> <Applicants /> </ProtectedRoute>
  }
])
function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
