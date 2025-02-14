import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import MainBlock1 from './components/MainBlock1';
import MainBlock2 from './components/MainBlock2';
import FooterComponent from './components/FooterComponent';

const App = () => {

    return (
        <div>
            <HeaderComponent />
            <MainBlock1 />
            <MainBlock2 />
            <FooterComponent />
        </div>
    )
};

export default App;
