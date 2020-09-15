import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import AppLayout from "../layout/AppLayout";


const indexRoutes = [
    {path: "/sign-in", component: SignIn},
    {path: "/sign-up", component: SignUp},
    {path: "/", component: AppLayout}
];

export default indexRoutes;