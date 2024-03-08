import Page from "@jumbo/shared/Page";
import PermissionMiddleware from "../Middleware/permission";
import ListGuest from "app/pages/Dashboard/List";
import AddGuest from "app/pages/Dashboard/AddGuest";
import EditGuest from "app/pages/Dashboard/EditGuest";

const routesName = "/member";
const modules = "member";

var routes = [
  {
    path: `/`,
    element: <Page component={ListGuest} layout={"vertical-default"} />,
    permission: "view",
  },
  {
    path: `${routesName}/add`,
    element: <Page component={AddGuest} layout={"vertical-default"} />,
    permission: "add",
  },
  {
    path: `${routesName}/edit/:id`,
    element: <Page component={EditGuest} layout={"vertical-default"} />,
    permission: "edit",
  },
  // {
  //   path: `${routesName}/change-password/:id`,
  //   element: <Page component={MemberChangePassword} layout={"vertical-default"} />,
  //   permission: "edit",
  // },
];

const createRoutes = () => {
  let allRoutes = routes?.map((route) => {
    let obj = {};
    obj["middleware"] = [
      {
        element: PermissionMiddleware,
        fallbackPath: ["/", modules, route.permission],
      },
    ];
    obj["routes"] = [
      {
        path: route.path,
        element: route.element,
      },
    ];
    return obj;
  });
  return allRoutes;
};

export const memberRoute = [...createRoutes()];

