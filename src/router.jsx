import {createBrowserRouter} from "react-router-dom";

// Componets
import GuestLayout from "./assets/components/GuestLayout";
import DefaultLayout from "./assets/components/DefaultLayout";

// Views
import Home from "./assets/views/Home";
import NotFound from "./assets/views/NotFound";
import BaybayinTees from "./assets/views/BaybayinTees";
import Faqs from "./assets/views/Faqs";
import ContactUs from "./assets/views/ContactUs";
import LookBook from "./assets/views/LookBook";
import Testimonial from "./assets/views/Testimonial";
import EmailVerificationPage from "./assets/views/EmailVerificationPage";
import UpdatePasswordPage from "./assets/views/UpdatePasswordPage";

const router = createBrowserRouter([
    {
        path:'/',
        element: <GuestLayout />,
        children:[
            {
                path: '/react-hgtr/',
                element: <Home />
            },
            {
                path: '/react-hgtr/baybayin-tees',
                element: <BaybayinTees />
            },
            {
                path: '/react-hgtr/testimonial',
                element: <Testimonial />
            },
            {
                path: '/react-hgtr/look-book',
                element: <LookBook />
            },
            {
                path: '/react-hgtr/contact-us',
                element: <ContactUs />
            },
            {
                path: '/react-hgtr/faqs',
                element: <Faqs />
            },
        ]
    },
    {
        path: '/react-hgtr/email-verification',
        element: <EmailVerificationPage />
    },
    {
        path: '/react-hgtr/update-password',
        element: <UpdatePasswordPage />
    },
    {
        path:'/react-hgtr/admin',
        element: <DefaultLayout />
    },
    {
        path: '*',
        element: <NotFound />
    },
])

export default router; 