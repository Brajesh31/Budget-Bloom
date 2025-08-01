import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    CalculateCardInfo();
  }, [budgetList]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach(element => {
      totalBudget_ += Number(element.amount);
      totalSpend_ += element.totalSpend;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7'>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>Total Budget</h2>
              <h2 className='font-bold text-lg'>${totalBudget}</h2>
            </div>
            <PiggyBank className='bg-blue-500 p-3 h-12 w-12 rounded-full text-white' />
          </div>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>Total Spend</h2>
              <h2 className='font-bold text-lg'>${totalSpend}</h2>
            </div>
            <ReceiptText className='bg-blue-500 p-3 h-12 w-12 rounded-full text-white' />
          </div>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>No. Of Budgets</h2>
              <h2 className='font-bold text-lg'>{budgetList?.length}</h2>
            </div>
            <Wallet className='bg-blue-500 p-3 h-12 w-12 rounded-full text-white' />
          </div>
        </div>
      ) : (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5'>
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className='h-[110px] w-full bg-slate-200 animate-bounce rounded-lg'
            >
              <p className='text-center text-black'>No budget found</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
