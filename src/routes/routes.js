import config from '~/config';
import LayoutOnly from '~/layouts/LayoutOnly/LayoutOnly';

// Layouts

// Pages
import Home from '~/pages/Home';
import MovieCheckout from '~/pages/MovieCheckout';
import MovieDetail1 from '~/pages/MovieDetail1';
import MovieDetail2 from '~/pages/MovieDetail2';
import MovieFood from '~/pages/MovieFood';
import MovieGird from '~/pages/MovieGird';
import MovieList from '~/pages/MovieList';
import MovieSeat from '~/pages/MovieSeat';
import MovieTicket from '~/pages/MovieTicket';
import ShopDetail from '~/pages/ShopDetail';
import Shops from '~/pages/Shops';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import MyOrder from '~/pages/MyOrder';
import Thanks from '~/pages/Thanks';

// Public routes
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.moviegird, component: MovieGird },
    { path: config.routes.movielist, component: MovieList },
    { path: config.routes.moviedetail1, component: MovieDetail1 },
    { path: config.routes.moviedetail2, component: MovieDetail2 },
    { path: config.routes.shops, component: Shops },
    { path: config.routes.shopdetail, component: ShopDetail },
    { path: config.routes.signin, component: SignIn, layout: LayoutOnly },
    { path: config.routes.signup, component: SignUp, layout: LayoutOnly },
];

// Private routes
export const privateRoutes = [
    { path: config.routes.movieticket, component: MovieTicket },
    { path: config.routes.movieseat, component: MovieSeat },
    { path: config.routes.moviecheckout, component: MovieCheckout },
    { path: config.routes.moviefood, component: MovieFood },
    { path: config.routes.myorder, component: MyOrder },
    { path: config.routes.thanks, component: Thanks },
];
