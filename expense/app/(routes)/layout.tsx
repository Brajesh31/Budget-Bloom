import React, { use } from 'react'
import Dashboard from '../dashboard/page'
import { useUser } from '@clerk/nextjs'
import { db } from '../../utils/dbConfig'
import { Budgets } from '../../utils/schema'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/router'
import { UserResource } from '@clerk/types'

function DashboardLayout({ childern }) {

  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    user && checkUserBudget();
  }, [user]);

  const checkUserBudget = async () => {
    const result = await db.select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    if (result?.length === 0) {
      router.replace('/dashboard/budgets');
    }
  }
  return (
    <div>
      <div className='relative md:ml-64'>
        <Dashboard
        />
      </div>
      <div className='md:ml-64'>
        {childern}
      </div>
    </div>
  )
}

export default DashboardLayout

function useEffect(arg0: () => void, arg1: UserResource[]) {
  throw new Error('Function not implemented.')
}
