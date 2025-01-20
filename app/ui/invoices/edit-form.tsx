'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

 
import { updateInvoice } from '@/app/lib/actions'; 

import React, { useState, FormEvent } from 'react'
// import FormData from 'form-data';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
// import Datepicker from "tailwind-datepicker-react"
// import Datepicker from "react-tailwindcss-datepicker";

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { ko } from 'date-fns/locale';
registerLocale("ko", ko);


export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {

  console.log(`edit page ### invoice=${JSON.stringify(invoice)}`)
  console.log(`edit page ### customers=${JSON.stringify(customers)}`)
  console.log(`edit page ### invoice.id=${invoice.id}`)
  console.log('########### invoice=', invoice)
  console.log('■■■■########### invoice.date=', invoice.date)
 
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
 
  // 버튼 클릭시 비활성화 처리
  // 폼 필드 값 가져오기.
  const [isLoading, setIsLoading] = useState<boolean>(false)
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true) // Set loading to true when the request starts

      // const formData = {
      //   customerId : event.target.customerId.value,
      //   // amount : event.target.amount.value * 100,
      //   amount : event.target.amount.value ,
      //   status : event.target.status.value,
      //   id : invoice.id,
      //   date : event.target.date.value.substring(0,10),
      // }
  }
 


  // 날짜 값이 없는 경우.... 오늘 날짜 세팅
  let [startDate, setStartDate] = useState(new Date());// invoice.date
  if (invoice.date != undefined) {
    [startDate, setStartDate] = useState(new Date(invoice.date));// invoice.date
  }  
  else{
    [startDate, setStartDate] = useState(new Date());// invoice.date
  }


  return (
    // Passing an id as argument won't work
    <form action={updateInvoiceWithId}>
    {/* <form action="/invoices"> */}
    {/* <form onSubmit={onSubmit}> */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customerId" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customerId"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={invoice.customer_id}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice.amount}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>



        {/* Invoice date */}

        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Choose an date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <DatePicker 
              locale={ko}
              dateFormat="yyyy-MM-dd(eee)"
                placeholderText="Enter date"
                id="date"
                name="date"
              selected={startDate} onChange={(date) => setStartDate(date)} 
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>







      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type='submit'>Edit Invoice</Button>

        {/* <button type="submit" disabled={isLoading}
        className='flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
        >
          {isLoading ? 'Loading...' : 'Edit Invoice'}
        </button> */}


      </div>
    </form>
  );
}
