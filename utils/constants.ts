import {
  DashboardOutlined,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  AdminPanelSettings,
} from "@mui/icons-material";

type JSXComponent = () => JSX.Element;

interface Routes {
  name: string;
  route: string;
  Component?: any;
}

export const links: Routes[] = [
  { name: "home", route: "/" },
  { name: "headphones", route: "/headphones" },
  { name: "earphones", route: "/earphones" },
  { name: "speakers", route: "/speakers" },
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
