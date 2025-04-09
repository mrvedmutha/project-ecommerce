import { Sidebar } from "@/components/ui/sidebar";
import { INavItem } from "./navItems";
export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userEmail?: string;
  onLogout?: () => void;
  data: {
    navItems: INavItem[];
  };
}
