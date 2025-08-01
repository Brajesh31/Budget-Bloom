"use client"
import { Button } from '../../components/ui/button';
import React from 'react'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs';
import img from '../../public/exlogo.jpg'
import Link from 'next/link'
function Header() {
  const { isSignedIn } = useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-md '>
      <div className='text-2xl left-10 font-bold'
      >
        <Image src={img}
          alt='logo'
          left={50}
          width={50}
          height={50}
          className='rounded-full'
        />
        Budget Bloom
      </div>
      {isSignedIn ?
        <UserButton /> :
        <Link href={'/sign-in'}>
          <Button>Login</Button>
        </Link>
      }
    </div>
  )
}

export default Header