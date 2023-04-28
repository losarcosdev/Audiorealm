import {
  DashboardOutlined,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  AdminPanelSettings,
  Home,
  Headphones,
  Earbuds,
  Speaker,
} from "@mui/icons-material";

interface Routes {
  name: string;
  route: string;
  Component?: any;
}

export const links: Routes[] = [
  { name: "home", route: "/", Component: Home },
  { name: "headphones", route: "/headphones", Component: Headphones },
  { name: "earphones", route: "/earphones", Component: Earbuds },
  { name: "speakers", route: "/speakers", Component: Speaker },
];

export const adminLinks: Routes[] = [
  {
    name: "Dashboard",
    route: "/admin",
    Component: DashboardOutlined,
  },
  {
    name: "Products",
    route: "/admin/products",
    Component: CategoryOutlined,
  },
  {
    name: "Orders",
    route: "/admin/orders",
    Component: ConfirmationNumberOutlined,
  },
  {
    name: "Users",
    route: "/admin/users",
    Component: AdminPanelSettings,
  },
];
