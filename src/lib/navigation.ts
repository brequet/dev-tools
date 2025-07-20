import { Braces, Calendar1, FileDiff, Signature } from 'lucide-svelte';

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
        title: 'JSON/XML Formatter/Minifier',
        description: 'Format and minify JSON/XML.',
        href: '/formatter',
        icon: Braces
    },
    {
        title: 'Diff viewer',
        description: 'Compare two blocks of text.',
        href: '/diff-viewer',
        icon: FileDiff
    },
    {
        title: 'Lorem Ipsum',
        description: 'Generate random text.',
        href: '/lorem-ipsum',
        icon: Signature
    }
];

export function getNavItem(href: string): NavItem | undefined {
    return navItems.find(navItem => navItem.href === `/${href}`);
}
