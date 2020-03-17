import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import MobileContent from "./components/Content/MobileContent";
import MobileHeader from "./components/Header/MobileHeader";
import MobileFooter from './components/Footer/MobileFooter'
import device from 'device'

function App() {

    const myDevice = device(navigator.userAgent);

    if (myDevice.is('desktop')) {
        return (
            <div className="App">
                <Header/>
                <Content myDevice = {myDevice}/>
                <Footer/>
            </div>
        );
    }

    if(myDevice.is('tv') || myDevice.is('tablet') || myDevice.is('phone')){
        return (
            <div className="App">
                <MobileHeader/>
                <MobileContent/>
                <MobileFooter/>
            </div>
        );
    }else {
        return <h1>Не поддерживаемое устройство!</h1>
    }
}

export default App;
