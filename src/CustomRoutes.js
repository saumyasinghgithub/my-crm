import {LoginLayout, StaticPageLayout, DefaultLayout} from './layouts';
import {Login, About, Home, ADStudio, ADTrainer,MyProfile,MyCourse, CourseDetails, SearchResult, TeacherProfile, TeacherService, TeacherKnowledge, TeacherLibrary, CourseList, ContactUs, ADStudent} from './pages';


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
    'path'      : '/trainers/:slug', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : TeacherProfile
  },
  {
    'path'      : '/trainers/:slug/service', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : TeacherService
  },
  {
    'path'      : '/trainers/:slug/knowledge', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : TeacherKnowledge
  },
  {
    'path'      : '/trainers/:slug/library', 
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
    'path'      : '/course-list', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : CourseList
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
    
  },
   {
    'path'      : '/ad-student', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : ADStudent
  },
  {
    'path'      : '/contact-us', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : ContactUs
  }
];

export default CustomRoutes;