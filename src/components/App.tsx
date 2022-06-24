import { HashRouter, Routes, Route } from "react-router-dom";
import Detail from "../routes/Detail";
import Home from "../routes/Home";

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/:id" element={<Detail />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
