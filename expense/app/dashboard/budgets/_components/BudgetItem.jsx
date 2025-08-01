import React from 'react'
import Link from 'next/link'
export default function BudgetItem({ budget }) {

  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return Math.min(perc, 100).toFixed(2);
  }
  return (
    <Link href={'/dashboard/expenses/' + budget?.id} >
      <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
        <div className='flex gap-2 items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
            <div>
              <h2 className='font-bold text-black-100'>{budget.name}</h2>
              <h2 className='text-sm text-black-100'>{budget.totalItem} Item</h2>
            </div>
          </div>
          <h2 className='font-bold  text-primary text-lg'>${budget.amount}</h2>
        </div>
        <div className='mt-5'>
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-xs text-slate-400'>${budget.totalSpend ? budget.totalSpend : 0} Spend</h2>
            <h2 className='text-xs text-slate-400'>${budget.amount - budget.totalSpend}Remaining</h2>
          </div>
          <div className='w-full bg-slate-300 h-2 rounded-full'>
            <div className='bg-black h-2 rounded-full'
              style={{
                width: `${calculateProgressPerc()}%`
              }}
            >
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
