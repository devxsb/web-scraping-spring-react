import './App.css';
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import {useSelector} from "react-redux";

function App() {
    const currentUser = useSelector(state => state.authSlice.currentUser)
    return (
        <div className="App">
            <Routes>
                <Route path='*' element={<Home/>}/>
                <Route path='/product/:name' element={<ProductDetails/>}/>
                {!currentUser && <Route path='/login' element={<Login/>}/>}
            </Routes>
        </div>
    );
}

export default App;
