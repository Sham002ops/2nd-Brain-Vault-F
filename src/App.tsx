
import { Dashboard } from "./pages/Dashboard"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import YoutubePage from "./pages/YoutubePage"
import { SharePage } from "./pages/SharePage"
import ContentPage from "./pages/ContentPage"
import { useState } from "react"
import LandingPage from "./pages/landingPage"


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const isLoggedIn = localStorage.getItem("loggedIn");
     
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn == "true" ? <Dashboard searchQuery={searchQuery} setSearchQuery={setSearchQuery} />: <LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/landing" element={<LandingPage/>}/>
        <Route path="/dashboard" element={<Dashboard searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}/>
        <Route path="/dashboard/share/:shareLink" element={<SharePage/>}/>
        <Route path="/content/youtube" element={<ContentPage searchQuery={searchQuery} setSearchQuery={setSearchQuery}  type="youtube" />} />
        <Route path="/content/twitter" element={<ContentPage searchQuery={searchQuery} setSearchQuery={setSearchQuery}  type="twitter" />} />
        <Route path="/content/instagram" element={<ContentPage searchQuery={searchQuery} setSearchQuery={setSearchQuery}  type="instagram" />} />
        <Route path="/content/facebook" element={<ContentPage searchQuery={searchQuery} setSearchQuery={setSearchQuery}  type="facebook" />} />
        <Route path="/content/pinterest" element={<ContentPage searchQuery={searchQuery} setSearchQuery={setSearchQuery}  type="pinterest" />} />
        <Route path="/content/doc" element={<ContentPage searchQuery={searchQuery} setSearchQuery={setSearchQuery}  type="doc" />} />
      </Routes>
  
  </BrowserRouter>
}

export default App
