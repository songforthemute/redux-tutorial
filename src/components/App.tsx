import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Detail from "../routes/Detail";
import Home from "../routes/Home";

const App = () => {
    return (
        <HashRouter>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Detail />} />
        </HashRouter>
    );
};

export default App;
