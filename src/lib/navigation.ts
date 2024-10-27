import { Braces, Calendar1 } from 'lucide-svelte';

export interface NavItem {
    title: string;
    description: string;
    href: string;
    icon?: typeof Braces;
}

export const BASE_PATH = '/dev-tools';

export const navItems: NavItem[] = [
    {
        title: 'Date Finder',
        description: 'Find the date for a given day index and year.',
        href: '/date-finder',
        icon: Calendar1
    },
    {
        title: 'JSON Formatter/Minifier',
        description: 'Format and minify JSON.',
        href: '/json-formatter',
        icon: Braces
    },
];

export function getNavItem(href: string): NavItem | undefined {
    return navItems.find(navItem => navItem.href === `/${href}`);
}
