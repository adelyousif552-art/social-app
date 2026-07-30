import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./Pages/Home/Home"
import Signup from "./Pages/Signup/Signup"
import Login from "./Pages/Login/Login"
import Profile from "./Pages/Profile/Profile"
import Postdetails from "./Pages/Postdetails/Postdetails"
import Notfound from "./Pages/Notfound/Notfound"
import { Bounce, ToastContainer } from "react-toastify"
import Authprovider from "./Context/Auth.context"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import AuthRoute from "./components/AuthRoute/AuthRoute"
import Bookmarks from "./Pages/Bookmarks/Bookmarks"



function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    },
     {
      path:'/signup',
      element:<AuthRoute>
        <Signup/>
      </AuthRoute>
    },
     {
      path:'/login',
      element:<AuthRoute>
        <Login/>
      </AuthRoute>
    },
     {
      path:'/:id/profile',
      element:<ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
    },
     {
      path:'/post/:id',
      element:<ProtectedRoute>
        <Postdetails/>
      </ProtectedRoute>
    }, 
    {
      path:'/bookmark',
      element:<ProtectedRoute>
        <Bookmarks/>
      </ProtectedRoute>
    }, 
    
    {
      path:'*',
      element:<Notfound/>
    }
  ])
  
  return <>
 <Authprovider>

   <RouterProvider router={router}>


  </RouterProvider>
  <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>
 </Authprovider>
  
  
  
  </>
}

export default App
