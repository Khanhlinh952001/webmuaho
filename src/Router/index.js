import Home from "../pages/HomePage/home"
import About from "../pages/AboutPage/about"
import Setting from "../pages/SettingPage"
import Register from "../pages/AuthPage/Register"
import Login from "../pages/AuthPage/Login";
import AddProduct from "../pages/AddProducts";
import AllProducts from "../pages/AllProduct";

const publicRouter = [
    { path: "/", component: Login, layout: null },
    { path: "/register", component: Register, layout: null }

]

const privateRouter = [
    { path: "/home", component: Home },
    { path: "/about", component: About },
    { path: "/setting", component: Setting},
    { path: "/addProducts", component: AddProduct},
    { path: "/allProducts", component: AllProducts}

]



export { publicRouter, privateRouter }
