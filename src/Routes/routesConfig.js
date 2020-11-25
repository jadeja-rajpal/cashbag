import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import DashboardPage from "views/Dashboard/Dashboard";
import ManageFranchise from "views/ManageFranchise";
import FrontendUsers from "../views/FrontendUsers/FrontendUsersList";
import ChangePassword from "../views/ChangePassword";
import FrontendUserDetails from "../views/FrontendUsers/FrontendUserDetails";
import endpoints from "./endpoints";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    headerRoute: "/dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    showPrivilege: true,
  },
  {
    path: endpoints.frontendUserDetails,
    name: "User Details",
    headerRoute: endpoints.frontendUserDetails,
    component: FrontendUserDetails,
    layout: endpoints.frontendUsers,
    privilegeId: 7,
  },
  {
    path: endpoints.frontendUsers,
    name: "Manage Frontend Users",
    icon: Person,
    headerRoute: endpoints.frontendUsers,
    component: FrontendUsers,
    layout: "/admin",
    privilegeId: 7,
  },
  {
    path: endpoints.manageFranchise,
    name: "Manage Franchise",
    icon: Person,
    headerRoute: endpoints.manageFranchise,
    component: ManageFranchise,
    layout: "/admin",
    privilegeId: 4,
  },
  {
    path: endpoints.changePassword,
    name: "Change Password",
    headerRoute: endpoints.changePassword,
    icon: "content_paste",
    component: ChangePassword,
    layout: `${endpoints.admin}/${endpoints.changePassword}`,
    showPrivilege: true,
  },
];

export default dashboardRoutes;
