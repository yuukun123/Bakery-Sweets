import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CartDrawer from "./components/ui/CartDrawer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Receipt from "./pages/Receipt";
import Pay from "./pages/Pay";
import About from "./pages/About";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <CartDrawer />
      <div className="Home_main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
