import About from "../pages/aboutPage/about"
import SettingTabs from "../pages/settingPage"
import Register from "../pages/authPage/Register"
import Login from "../pages/authPage/Login";
import AddProduct from "../pages/addProducts";
import AllProducts from "../pages/allProduct";
import EditProduct from "../components/ EditProduct";
import HomeTabs from "../pages/homePage";
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
