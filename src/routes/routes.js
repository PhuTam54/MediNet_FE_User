import config from '~/config';
import LayoutOnly from '~/layouts/LayoutOnly/LayoutOnly';
import Cart from '~/pages/Cart';
import Checkout from '~/pages/Checkout';
import EmailThankyou from '~/pages/EmailThankyou';

// Layouts

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import ProductDetail from '~/pages/ProductDetail';
import MyOrder from '~/pages/MyOrder';
import Products from '~/pages/Products';
import Shop from '~/pages/Shop';
import SignUp from '~/pages/Signup';
import Thankyou from '~/pages/Thankyou';
import Profile from '~/pages/Profile';
import Courses from '~/pages/Courses';
import CoursesDetail from '~/pages/CoursesDetail';
import MyCourses from '~/pages/MyCourses';


// Public routes
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.shop, component: Shop },
    { path: config.routes.products, component: Products },
    { path: config.routes.productdetail, component: ProductDetail},
    { path: config.routes.emailthankyou, component: EmailThankyou,layout: LayoutOnly },
    { path: config.routes.login, component: Login, layout: LayoutOnly},
    { path: config.routes.signup, component: SignUp, layout: LayoutOnly},
];

// Private routes
export const privateRoutes = [
    { path: config.routes.cart, component: Cart },
    { path: config.routes.checkout, component: Checkout},
    { path: config.routes.courses, component: Courses},
    { path: config.routes.mycourses, component: MyCourses},
    { path: config.routes.thankyou, component: Thankyou },
    { path: config.routes.profile, component: Profile},
    { path: config.routes.coursesdetail, component: CoursesDetail},
    { path: config.routes.myOrder, component: MyOrder},
];
