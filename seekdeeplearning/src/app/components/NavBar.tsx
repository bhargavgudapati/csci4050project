'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdHome, MdLibraryBooks, MdStyle, MdQuiz, MdPeople } from 'react-icons/md';

const navItems = [
    { href: '/', icon: <MdHome size={24} />, label: 'Home' },
    { href: '/SetList', icon: <MdLibraryBooks size={24} />, label: 'Your Library' },
    { href: '/flashcardsFirst', icon: <MdStyle size={24} />, label: 'Flashcards' },
    { href: '/ale-page', icon: <MdQuiz size={24} />, label: 'Quiz' },
    { href: '/seekhoot/sh-player', icon: <MdPeople size={24} />, label: 'Join Seekhoot'}
];

export default function NavBar() {
    const pathname = usePathname();

    return (
	<nav className="fixed left-0 top-0 h-screen w-16 bg-[#FAFAFA] flex flex-col items-center py-4 space-y-6 shadow-md z-50">
	    {navItems.map(({ href, icon, label }) => (
		<Link key={href} href={href}>
		    <div
			className={`p-2 rounded-md hover:bg-[#859AD4] transition ${
			    pathname === href ? 'bg-[#E0E4F5]' : ''
			}`}
			title={label}
		    >
			{icon}
		    </div>
		</Link>
	    ))}
	</nav>
    );
}
