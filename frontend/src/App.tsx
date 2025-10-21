import React, {useState} from "react";
import react from "react";
import MainPage from "./pages/MainPage";
import AppRouter from "./components/AppRouter";
import NavbarMain from "./components/NavbarMain";
import Card from "./components/Card";




const App: React.FC = () => {
    return (
        <div>
            <AppRouter />;

        </div>
    );
};

export default App;