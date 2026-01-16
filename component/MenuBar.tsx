'use client'

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { clsx as cn } from 'clsx';

// activeMenu 타입을 "소개" | "프랜차이즈" 등으로 지정합니다.
interface MenuBarProps {
    children: ReactNode;
    header?: string;
    activeMenu?: "소개" | "정보" | undefined; 
}

const MenuBar = ({ children, header, activeMenu }: MenuBarProps) => {
    const router = useRouter();

    const MENULIST = [
        { path: "/info", text: "소개" },
        { path: "/list", text: "정보" },
    ]

    return (
        <div className="flex min-h-screen">
            <div className="w-60 h-screen border-r border-gray-200 p-5 fixed left-0 top-0 bg-white">
                <div className='px-2 py-4 cursor-pointer flex justify-center' onClick={() => router.push('/home')}>
                    <Image src="/Logo/Logo1.png" alt="logo" width={120} height={40}/>
                </div>

                <div className='py-6 space-y-2 flex flex-col items-center'>
                    {MENULIST.map((item, i) => (
                        <div 
                            key={i}
                            onClick={() => router.push(item.path)} 
                            className={cn(
                                'text-center w-40 py-4 border-b-2 cursor-pointer duration-200 transition-all hover:scale-110 hover:font-bold',
                                activeMenu === item.text
                                    ? 'border-[#549387] text-[#549387] font-bold' 
                                    : ' text-gray-400 hover:text-[#549387]'
                            )}
                        >
                            <div className="h2 w-full">{item.text}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 ml-60 flex flex-col">
                {header && <header className="border-b border-gray-200 px-4 py-6 text-center title3">{header}</header>}
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}

export default MenuBar;