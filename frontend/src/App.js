import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroVideo from './components/HeroVideo';
import BrideGallery from './components/IndianBride'
import './App.css'; // Tailwind configuration should be here
import TextComponent from './components/Text-1';
import ImageComponent from './components/ImageComponent';
import VideoComponent from './components/VideoComponent';
import TextComponentTwo from './components/Text-2';
import ImageLayout from './components/ImageLayout';
import SingleVideo from './components/SingleVideo';
import Footer from './components/Footer';
import TextComponentThree from './components/Text-3';
import WhatsNewPage from './components/WhatsNewPage';  
import HighJewelryComponent from './components/HighJewelryComponent';
import LoginPage from './components/login'; // Ensure this matches the filename
import SignupPage from './components/signup'; // Change to PascalCase
import Catalogue from './components/Catalogue';
import './index.css'; // Tailwind configuration should be here
import EveryDay from './components/Everyday';
import HeroVideoTwo from './components/HeroVideoTwo';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Navbar />
                            <Hero />
                            <TextComponent />
                            <HeroVideo />
                            <HeroVideoTwo/>
                            <ImageComponent />
                            <VideoComponent />
                            <TextComponentTwo />
                            <ImageLayout />
                            <SingleVideo />
                            <TextComponentThree />
                            <Footer />
                        </>
                    } />
                    <Route path="/whatsnew" element={
                        <>
                            <Navbar />
                            <WhatsNewPage />
                            <Footer />
                        </>
                    } />
                    <Route path="/HighJewelryComponent" element={
                        <>
                            {/* <Navbar />
                            <HighJewelryComponent />
                            <Footer /> */}
                        </>
                    } />
                    <Route path="/catalogue" element={
                        <>
                            {/* <Navbar />
                            <Catalogue />
                            <Footer /> */}
                        </>
                    } />
                    <Route path="/everyday" element={
                        <>
                            {/* <Navbar />
                            <EveryDay />
                            <Footer /> */}
                        </>
                    } />
                      <Route path="/IndianBride" element={
                        <>
                            {/* <Navbar />
                            <BrideGallery />
                            <Footer /> */}
                        </>
                    } />
                    {/* <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
