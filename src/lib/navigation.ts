import { Braces, Calendar1, CodeXml, FileDiff, Signature } from 'lucide-svelte';

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
    {
        title: 'XML Formatter/Minifier',
        description: 'Format and minify XML.',
        href: '/xml-formatter',
        icon: CodeXml
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
