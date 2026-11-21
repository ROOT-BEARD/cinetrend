import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuDrawer from "./componets/MenuDrawer";
import SearchPage from "./pages/SearchPage";
import Dashboard from "./pages/Dashboard";
import AuthenticationPage from "./pages/AuthenticationPage";
import AdminDashboard from "./pages/AdminDashboard";

export default function App(){
  return(
    <BrowserRouter>
        {/* the drawer for navigation */}
        <MenuDrawer/>
        {/* Routes to all the pages */}
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/search_page' element={<SearchPage/>}/>
            <Route path='/authentication_page' element={<AuthenticationPage/>}/>
            <Route path='/admin_dashboard' element={<AdminDashboard/>}/>
        </Routes>
    </BrowserRouter>
  );
}