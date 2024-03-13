import About from "../pages/AboutPage/about"
import SettingTabs from "../pages/SettingPage"
import Register from "../pages/AuthPage/Register"
import Login from "../pages/AuthPage/Login";
import AddProduct from "../pages/AddProducts";
import AllProducts from "../pages/AllProduct";
import EditProduct from "../Components/ EditProduct";
import HomeTabs from "../pages/HomePage/index.js"
const publicRouter = [
    { path: "/", component: Login, layout: null },
    { path: "/register", component: Register, layout: null }

]

const privateRouter = [
    { path: "/", component: HomeTabs },
    { path: "/about", component: About },
    { path: "/setting", component: SettingTabs},
    { path: "/addProducts", component: AddProduct},
    { path: "/allProducts", component: AllProducts},
    { path: "/edit/:productId", component: EditProduct},
    // {path:'/detail/:productId' ,component: Detail}
]



export { publicRouter, privateRouter }
