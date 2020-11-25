import Routes from "../../Routes/endpoints";

const paths = {
  [Routes.dashboard]: [{ title: "Dashboard", redirect: Routes.dashboard }],
  [Routes.frontendUsers]: [
    { title: "Manage Frontend Users", redirect: Routes.frontendUsers },
  ],
  [Routes.frontendUserDetails]: [
    { title: "Manage Frontend Users", redirect: Routes.frontendUsers },
    { title: "User Details" },
  ],
  [Routes.manageFranchise]: [{ title: "Franchise" }],
  [Routes.viewFranchise(":franchiseId")]: [
    { title: "Franchise", redirect: Routes.manageFranchise },
    { title: "Franchise Details" },
  ],
};

export default paths;
