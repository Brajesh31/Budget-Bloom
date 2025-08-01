"use client"
import React, { useEffect } from 'react'
import CreateBudget from './CreateBudget'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { db } from '../../../../utils/dbConfig'
import BudgetItem from './BudgetItem'
import { useState } from 'react'
import { Budgets, Expenses } from '../../../../utils/schema'

export default function BudgetList() {

  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getBudgetList();
  }, [user])

  const getBudgetList = async () => {

    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  }
  return (
    <div className='mt-9'>
      <div className='grid grid-cols-1 md:grid-cols-2 
      lg:grid-cols-3 gap-10'>
        <CreateBudget
          refreshData={() => getBudgetList()}
        />
        {budgetList?.length > 0 ? budgetList.map((budget, index) => (
          <BudgetItem key={index} budget={budget} />
        ))
          : [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-bounce'>
              <p className='text-center text-black'>No budget found</p>
            </div>))}
      </div>
    </div>
  )
}
