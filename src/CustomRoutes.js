import {LoginLayout, StaticPageLayout, DefaultLayout} from './layouts';
import {Login, Home, About} from './pages';

const CustomRoutes = [  
  
  {
    'path'      : '/login', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : LoginLayout, 
    'component' : Login
  },
  {
    'path'      : '/about', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : About
  },
  {
    'path'      : '/',
    'secure'    : false,
    'exact'     : true, 
    layout      : DefaultLayout, 
    component   : Home
  }
];

export default CustomRoutes;