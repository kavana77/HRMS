export interface SidebarItem{
    label: string;
    icon: React.ComponentType<{size: number}>;
    path: string;
}