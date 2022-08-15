import {LoginLayout, StaticPageLayout, DefaultLayout} from './layouts';
import {Login, About, Home, ADStudio, ADTrainer,MyProfile,MyCourse, CourseDetails, SearchResult, TeacherLanding, ContactUs, ADStudent, StudentProfile, MyCart, StudentProfileView, MyBlog} from './pages';


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
    'path'      : '/my-course', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : MyCourse
  },
  {
    'path'      : '/my-blog', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : MyBlog
  },
  {
    'path'      : '/trainers/:slug', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : TeacherLanding
  },
  {
    'path'      : '/trainers/:slug/:page', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : TeacherLanding
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
    'path'      : '/my-cart', 
    'secure'    : false,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : MyCart
  },
  {
    'path'      : '/student/my-profile', 
    'secure'    : true,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : StudentProfileView
  },
  {
    'path'      : '/student/my-profile/edit', 
    'secure'    : true,    
    'exact'     : true,
    'layout'    : StaticPageLayout, 
    'component' : StudentProfile
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