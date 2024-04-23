import config from '~/config';
import LayoutOnly from '~/layouts/LayoutOnly/LayoutOnly';
import Cart from '~/pages/Cart';
import Checkout from '~/pages/Checkout';

// Layouts

// Pages
import Home from '~/pages/Home';
import ProductDetail from '~/pages/ProductDetail';
import Products from '~/pages/Products';
import Shop from '~/pages/Shop';






// Public routes
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.shop, component: Shop },
    { path: config.routes.products, component: Products },
    { path: config.routes.productdetail, component: ProductDetail},
    { path: config.routes.cart, component: Cart},
    { path: config.routes.checkout, component: Checkout }
   

];

// Private routes
export const privateRoutes = [
    
];
