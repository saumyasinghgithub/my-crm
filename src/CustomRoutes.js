import {LoginLayout, DefaultLayout} from './layouts';
import {Login, Home} from './pages';

const CustomRoutes = [  
  
  {
    'path'      : '/login', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : LoginLayout, 
    'component' : Login
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