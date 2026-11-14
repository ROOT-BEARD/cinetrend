import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuDrawer from "./MenuDrawer";
import SearchPage from "./pages/SearchPage";
import Dashboard from "./pages/Dashboard";
import AuthenticationPage from "./pages/AuthenticationPage";

export default function App(){
  return(
    <BrowserRouter>
      <MenuDrawer/>
      <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/search_page' element={<SearchPage/>}/>
          <Route path='/authentication_page' element={<AuthenticationPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}