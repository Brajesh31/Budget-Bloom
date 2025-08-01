import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from "next/image";
import img from "../../../public/exlogo.jpg";

function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center'>
      <div className='flex items-center space-x-4'>
        <Image src={img} alt="logo" width={50} height={50} className="rounded-full" />
        <h1 className='text-2xl font-bold'>Budget-Bloom</h1>
      </div>
      <div>
        <UserButton/>
      </div>
    </div>
  )
}

export default DashboardHeader;