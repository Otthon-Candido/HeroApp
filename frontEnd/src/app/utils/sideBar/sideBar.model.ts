interface SidebarItem {
    size?: string;
    id: string;
    hidden?: boolean;
    name: string;
    svgIcon?: string;
    checked?: boolean
    callback?: () => void;
    subMenuItemns?: SubmenuItem[];
}

interface SubmenuItem {
    id: string;
    name: string;
    svgIcon?: string;
    checked?: boolean;
    callback?: () => void;
}

enum ThemeType {
    dark = "dark",
    light = "light",
    blue = "blue",
    energisa = "energisa"
}

interface SidebarIcon {
    svgIcon?: string,
    name?: string;
}

interface SidebarConfig {
    toggleSideBar: boolean;
    sidebarItems: SidebarItem[];
    sidebarItemExit?: SidebarItem;
    sidebarTitle: {
        show: SidebarIcon;
        hidden: SidebarIcon;
        callback?: () => void;
    }
}

const Icons = {
    left: {
        svg: `M2.828 6.99999L7.778 11.95L6.364 13.364L0 6.99999L6.364 0.635986L7.778 2.04999L2.828 6.99999Z`,
        vb: `0 0 8 14`,
        color: "#ffffff"
    },
    right: {
        svg: `M5.17266 6.99999L0.222656 2.04999L1.63666 0.635986L8.00066 6.99999L1.63666 13.364L0.222656 11.95L5.17266 6.99999Z`,
        vb: `0 0 8 14`,
        color: "#000000"
    },
}


export { SidebarConfig, SidebarItem, SubmenuItem, Icons };