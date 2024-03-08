import React from "react";
import Page from "@jumbo/shared/Page";
import NotFound from "app/pages/NotFound";
import Login from "app/pages/Auth/Login";
import EmailVerify from "app/pages/Auth/EmailVerify";
import UserProfile from "app/pages/Auth/Profile";
import EditProfile from "app/pages/Auth/EditProfile";
import ChangePassword from "app/pages/Auth/ChangePassword";
import AuthMiddleware from "./Middleware/auth";
import { memberRoute } from "./Member";
import ResetPassword from "app/pages/Auth/OtpVerify";
import AddGuestByLink from "app/pages/AddByLink/AddGuest";
import ListGuest from "app/pages/Dashboard/List";
import AddGuest from "app/pages/Dashboard/AddGuest";
import EditGuest from "app/pages/Dashboard/EditGuest";

/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [
  {
    path: "*",
    element: <Page component={NotFound} layout="solo-page" />,
  },
  
];

const routesForAuthenticatedOnly = [
  {
    middleware: [
      {
        element: AuthMiddleware,
        fallbackPath: "/login",
      },
    ],
    routes: [
      // {
      //   path: "/",
      //   element: <Page component={Dashboard} layout={"vertical-default"} />,
      // },
      {
        path: "/profile",
        element: <Page component={UserProfile} layout={"vertical-default"} />,
      },
      {
        path: "/profile/edit",
        element: <Page component={EditProfile} layout={"vertical-default"} />,
      },
      {
        path: "/profile/changePassword",
        element: <Page component={ChangePassword} layout={"vertical-default"} />,
      },
      {
        path: `/`,
        element: <Page component={ListGuest} layout={"vertical-default"} />,
        // permission: "view",
      },
      {
        path: `/add`,
        element: <Page component={AddGuest} layout={"vertical-default"} />,
        // permission: "add",
      },
      {
        path: `/edit/:id`,
        element: <Page component={EditGuest} layout={"vertical-default"} />,
        // permission: "edit",
      },
    ],
  },
  // ...memberRoute,
];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
  {
    path: "/login",
    element: <Page component={Login} layout="solo-page" />,
  },
 
  {
    path: "/email-verify",
    element: <Page component={EmailVerify} layout="solo-page" />,
  },
  {
    path: "/reset-password",
    element: <Page component={ResetPassword} layout="solo-page" />,
  },
  {
    path: "/register",
    element: <Page component={AddGuestByLink} fallbackPath="/register" layout="solo-page" />,
  },
];

const routes = [...routesForPublic, ...routesForAuthenticatedOnly, ...routesForNotAuthenticatedOnly];

export { routes as default, routesForPublic, routesForNotAuthenticatedOnly, routesForAuthenticatedOnly };
