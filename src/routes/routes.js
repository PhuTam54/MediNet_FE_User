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
import Products from '~/pages/Products';
import Shop from '~/pages/Shop';
import SignUp from '~/pages/Signup';
import Thankyou from '~/pages/Thankyou';






// Public routes
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.shop, component: Shop },
    { path: config.routes.products, component: Products },
    { path: config.routes.productdetail, component: ProductDetail},
    { path: config.routes.cart, component: Cart},
    { path: config.routes.checkout, component: Checkout },
    { path: config.routes.thankyou, component: Thankyou },
    { path: config.routes.emailthankyou, component: EmailThankyou,layout: LayoutOnly },

    { path: config.routes.login, component: Login, layout: LayoutOnly},
    { path: config.routes.signup, component: SignUp, layout: LayoutOnly}


   

];

// Private routes
export const privateRoutes = [
    
];
