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
import AdminDashboard from './admin/AdminDashboard';
import Overview from './admin/component/Overview';
import CreateCategory from './admin/component/CreateCategory';
import CreateCollection from './admin/component/CreateCollection';
import CreateCategoryProduct from './admin/component/CreateCategoryProduct';
import CreateCollectionProduct from "./admin/component/CreateCollectionProduct";
import AllOrders from './admin/component/AllOrders';
import VideoUpload from './admin/component/VideoUpload';
import About from "./pages/About";
import CategoryProducts from "./components/CategoryProducts ";
import CollectionProducts from "./components/CollectionProducts ";

function App() {
  return (
    <>
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
              <VideoHome />
              <Footer />
            </>
          }
        />
        {/* Shop Page Route */}
        <Route path="/shop" element={<ShopPage />} />

        {/* Product Info Page Route */}
        <Route path="/product/:id" element={<ProductInfo />} />

        {/* Contact Page Route */}
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/collection/:id" element={<CollectionProducts />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-collection" element={<CreateCollection />} />
          <Route path="create-category-product" element={<CreateCategoryProduct />} />
          <Route path ="create-collection-product" element={<CreateCollectionProduct />} />
          <Route path="all-orders" element={<AllOrders />} />
          <Route path="video-upload" element={<VideoUpload />} />
          <Route path="all-orders" element={<AllOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
