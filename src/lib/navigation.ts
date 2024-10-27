import { Braces } from 'lucide-svelte';

export interface NavItem {
    title: string;
    href: string;
    icon?: typeof Braces;
}

export const navItems: NavItem[] = [
    { title: 'JSON Formatter/Minifier', href: '/json-formatter', icon: Braces },
];
