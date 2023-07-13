import {createBrowserRouter} from "react-router-dom";

// Componets
import GuestLayout from "./assets/components/GuestLayout";

// Views
import Home from "./assets/views/Home";
import NotFound from "./assets/views/NotFound";
import BaybayinTees from "./assets/views/BaybayinTees";
import DefaultLayout from "./assets/components/DefaultLayout";
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
                path: '/baybayin-tees',
                element: <BaybayinTees />
            },
            {
                path: '/testimonial',
                element: <Testimonial />
            },
            {
                path: '/look-book',
                element: <LookBook />
            },
            {
                path: '/contact-us',
                element: <ContactUs />
            },
            {
                path: '/faqs',
                element: <Faqs />
            },
        ]
    },
    {
        path: '/email-verification',
        element: <EmailVerificationPage />
    },
    {
        path: '/update-password',
        element: <UpdatePasswordPage />
    },
    {
        path:'/admin',
        element: <DefaultLayout />
    },
    {
        path: '*',
        element: <NotFound />
    },
])

export default router; 