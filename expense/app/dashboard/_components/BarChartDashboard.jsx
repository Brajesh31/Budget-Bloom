import React from 'react'
import { BarChart, Bar, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'

function BarChartDashboard({ budgetList }) {
  return (
    <>
      <h2 className='font-bold text-3xl'>Activity</h2>
      <div className='border rounded-lg p-5'>
        <ResponsiveContainer width={'80%'} height={300} >
          <BarChart
            data={budgetList}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='totalSpend' stackId="a" fill="#4845d2" />
            <Bar dataKey='amount' stackId="a" fill="#C3C2FF" />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default BarChartDashboard
