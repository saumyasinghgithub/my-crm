import Layout from "./layouts";
import Page from "./pages";
import Utils from "./Utils";

const CustomRoutes = [
 /*{
    path: "/login",
    secure: false,
    exact: true,
    layout: Layout.DefaultLayout,
    component: Page.Home,
  },*/
  {
    path: "/login",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.LoginPage,
  },
  {
    path: "/about-us",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.About,
  },
  {
    path: "/ad-studio",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.ADStudio,
  },
  {
    path: "/ad-trainer",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.ADTrainer,
  },

  {
    path: "/my-profile",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.MyProfile,
  },
  {
    path: "/my-profile/*",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.MyProfile,
  },
  {
    path: "/my-course",
    secure: true,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.MyCourse,
  },
  {
    path: "/manage-coupons",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.ManageCoupons,
  },

  {
    path: "/my-student",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.MyStudent,
  },
  {
    path: "/my-blog",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.MyBlog,
  },
  {
    path: "professional-profile/:page",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.TeacherLanding,
  },
  {
    path: "/professional-profile",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    //component: Page.LandingPage,
    component: Page.TeacherLanding,
  },
  {
    path: "/trainers/:slug/:blogs/:slug",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.BlogDetails,
  },
  {
    path: "/trainers/:slug",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    /*component: Page.TeacherLanding,*/
    component: Page.LandingPage,
  },
  {
    path: "/courses/:slug",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.CourseDetails,
  },
  {
    path: "/search-results",
    secure: false,
    exact: true,
    layout: Layout.DefaultLayout,
    component: Page.SearchResult,
  },
  {
    path: "/help-for-student",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.ADStudent,
  },
  {
    path: "/payment/success/:id",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.PaymentSuccess,
  },
  {
    path: "/my-cart",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.MyCart,
  },
  {
    path: "/student/my-profile",
    secure: true,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.StudentProfileView,
  },
  {
    path: "/my-order",
    secure: true,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.MyOrder,
  },
  {
    path: "/my-corporate-groups",
    secure: true,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.MyCorporateGroup,
  },
  {
    path: "/my-corporate-groups/:cgid",
    secure: true,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.CorporateGroupDetail,
  },
  {
    path: "/my-sales",
    secure: true,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.MySales,
  },
  {
    path: "/student/my-profile/edit",
    secure: true,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.StudentProfile,
  },
  {
    path: "/contact-us",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.ContactUs,
  },
  {
    path: "/cookie-policy",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.CookiePolicy,
  },
  {
    path: "/privacy-policy",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.PrivacyPolicy,
  },
  {
    path: "/resetpass/:token",
    secure: false,
    exact: true,
    layout: Utils.isLoggedIn() ? Layout.DefaultLayout : Layout.StaticPageLayout,
    component: Utils.isLoggedIn() ? Page.Home : Page.ResetPassword,
  },
  {
    path: "/chgpwd",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.ChangePassword,
  },
  {
    path: "/term-conditions",
    secure: false,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.TermConditions,
  },
  {
    path: "/preferred-trainers",
    secure: true,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.PreferredTrainers,
  },
  {
    path: "/preferred-courses",
    secure: true,
    exact: true,
    layout: Layout.StaticPageLayout,
    component: Page.PreferredCourses,
  },
  {
    path: "/readls",
    secure: false,
    exact: true,
    layout: Layout.DefaultLayout,
    component: Page.ReadLocalStorage,
  },
  {
    path: "/:page",
    secure: false,
    exact: true,
    layout: Layout.DefaultLayout,
    component: Page.Home,
  },
  {
    path: "/",
    secure: false,
    exact: true,
    layout: Layout.DefaultLayout,
    component: Page.Home,
  },
  {
    path: "*",
    secure: false,
    exact: true,
    layout: Layout.DefaultLayout,
    component: Page.Home,
  },
];

export default CustomRoutes;
