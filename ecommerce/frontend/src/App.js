import './App.css';
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='*' element={<Home/>}/>
                <Route path='/product/:name' element={<ProductDetails/>}/>
            </Routes>
        </div>
    );
}

export default App;
