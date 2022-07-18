import {LoginLayout, StaticPageLayout, DefaultLayout} from './layouts';
import {Login, About, Home, ADStudio, ADTrainer,MyProfile,MyCourse, CourseDetails, SearchResult, TeacherProfile, TeacherService, TeacherKnowledge, TeacherLibrary} from './pages';

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
    'path'      : '/ad-studio', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : ADStudio
  },
  {
    'path'      : '/ad-trainer', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : ADTrainer
  },
  {
    'path'      : '/my-profile', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : MyProfile
  },
  {
    'path'      : '/view-profile', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : TeacherProfile
  },
  {
    'path'      : '/trainer-service', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : TeacherService
  },
  {
    'path'      : '/trainer-knowledge', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : TeacherKnowledge
  },
  {
    'path'      : '/trainer-library', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : TeacherLibrary
  },
  {
    'path'      : '/my-course', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : MyCourse
  },
  {
    'path'      : '/courses/:slug', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : CourseDetails
  },
  {
    'path'      : '/search-results', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : DefaultLayout, 
    'component' : SearchResult
  },
  {
    'path'      : '/',
    'secure'    : false,
    'exact'     : true, 
    'layout'    : DefaultLayout,
    'component' : Home
    
  }
];

export default CustomRoutes;