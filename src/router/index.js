import { createRouter, createWebHistory } from "vue-router";
import StepperContent from "@/greenhouse/components/stepper-contents.component.vue";
import Login from "@/public/pages/login.component.vue";
import PageNotFound from "@/public/pages/page-not-found.component.vue";
import Dashboard from "@/greenhouse/pages/dashboard.component.vue";
import HarvestingInProgress from "@/greenhouse/pages/crops-in-progress.component.vue";
import Signup from "@/public/pages/signup.component.vue";
import PasswordReset from "@/public/pages/password-reset.component.vue";
import SitePolicy from "@/public/pages/site-policy.component.vue";
import userProfile from "@/profiles/pages/user-profile.component.vue";
import statisticalReports from "@/greenhouse/pages/statistical-reports.vue";
import CropHistoryComponent from "@/greenhouse/pages/crop-archive.component.vue";
import CompanyProfile from "@/profiles/pages/company-profile.component.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:notFound",
            component: PageNotFound,
        },
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/signup",
            component: Signup,
        },
        {
            path: "/password-reset",
            component: PasswordReset,
        },
        {
            path: "/site-policy",
            component: SitePolicy,
        },
        {
            path: "/dashboard",
            component: Dashboard,
        },
        {
            path: "/process-log",
            component: HarvestingInProgress,
        },
        {
            path: "/crop-history",
            component: CropHistoryComponent,
        },
        {
            path: "/stepper/:crop_id/:phase",
            name: "stepper",
            component: StepperContent,
        },
        {
            path: "/profile",
            component: userProfile
        },
        {
            path: "/company",
            component: CompanyProfile,
        },
        {
            path: "/statistical-reports",
            component: statisticalReports
        }
    ],
});

export default router;
