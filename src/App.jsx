import "./App.css";
import { Route, Routes } from "react-router-dom";
import Collection from "./components/Collection";
import Discover from "./components/Discover";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NewArrival from "./components/NewArrival";
import VideoHome from "./components/VideoHome";
import ContactForm from "./pages/Contact";
import ShopPage from "./pages/Shop"; // Assuming you have a ShopPage component
import ProductInfo from "./pages/ProductInfo"; // Assuming you have a ProductInfo component
import Cart from "./pages/Cart";

// Admin Routes
import AdminDashboard from "./admin/AdminDashboard";
import Overview from "./admin/component/Overview";
import CreateCategory from "./admin/component/CreateCategory";
import CreateCollection from "./admin/component/CreateCollection";
import CreateCategoryProduct from "./admin/component/CreateCategoryProduct";
import CreateCollectionProduct from "./admin/component/CreateCollectionProduct";
import AllOrders from "./admin/component/AllOrders";
import VideoUpload from "./admin/component/VideoUpload";
import About from "./pages/About";
import CategoryProducts from "./components/CategoryProducts ";
import CollectionProducts from "./components/CollectionProducts ";
import Carrer from "./pages/Carrer";
import Shipping from "./pages/Shipping";
import Refund from "./pages/Refund";
import Faq from "./pages/Faq";
import AdminMedia from "./admin/component/AdminMedia";
import Size from "./pages/Size";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserOrder from "./pages/UserOrder";
import UserProfile from "./pages/UserProfile";

import whatsappLogo from "./assets/what.png";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <>
                <NewArrival />
                <Discover />
                <Collection />
                {/* <VideoHome /> */}
                <Footer />
              </>
            }
          />
          {/* <Route path="/user-orders" element={<UserOrder />} /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="orders" element={<AllOrders />} />
          {/* Shop Page Route */}
          <Route path="/shop" element={<ShopPage />} />

          {/* Product Info Page Route */}
          <Route path="/product/:id" element={<ProductInfo />} />

          {/* Contact Page Route */}
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:id" element={<CategoryProducts />} />
          <Route path="/carrer" element={<Carrer />} />
          <Route path="/shipping-policy" element={<Shipping />} />
          <Route path="/refund-policy" element={<Refund />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/size" element={<Size />} />
          <Route path="/collection/:id" element={<CollectionProducts />} />
          <Route path="/users/:userId/" element={<UserOrder />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="overview" element={<Overview />} />
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="create-collection" element={<CreateCollection />} />
            <Route
              path="create-category-product"
              element={<CreateCategoryProduct />}
            />
            <Route
              path="create-collection-product"
              element={<CreateCollectionProduct />}
            />
            <Route path="all-orders" element={<AllOrders />} />
            <Route path="video-upload" element={<VideoUpload />} />
            <Route path="orders" element={<AllOrders />} />
            <Route path="media" element={<AdminMedia />} />
          </Route>
        </Routes>
      </div>
      <div className="fixed bottom-3 right-3 p-3 z-50">
        {" "}
        {/* Adjust z-index and padding as needed */}
        <a
          href="https://wa.me/917015290569?text=Hello%20How%20can%20I%20help%20you?"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <img src={whatsappLogo} width="110" alt="WhatsApp Logo" />{" "}
          {/* Increased image width */}
          {/* <span className="text-lg font-medium">Hello, how can I help you?</span> */}
        </a>
      </div>
    </>
  );
}

export default App;
