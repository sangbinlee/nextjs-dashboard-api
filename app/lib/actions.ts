'use server';
  
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { z } from 'zod';
 
import { revalidatePath } from 'next/cache';

import { redirect } from 'next/navigation';


import { API_URL } from "@/app/lib/data";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

export async function createUser(prevState: any, formData: FormData) {
  const res = await fetch('https://...')
  const json = await res.json()
 
  if (!res.ok) {
    return { message: 'Please enter a valid email' }
  }
 
  redirect('/dashboard')
}



 
// const CreateInvoice = FormSchema.omit({ id: true, date: true });
const CreateInvoice = FormSchema.omit({ id: true});
export async function createInvoice(formData: FormData) {
  console.log('@@@@createInvoice=========FormData',FormData)
  const { customerId, amount, status , date} = CreateInvoice.parse({    
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    date: formData.get('date')?.toString().substring(0,10),
  })
  // Test it out:
  
  const amountInCents = amount * 100;
  
  // const date = new Date().toISOString().split('T')[0];

 
  try {
 

    let formData = { customerId, amount ,status, date}
    let body = JSON.stringify(formData)
    console.log(`### body=${body}`)

    let loginData = {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(`### loginData=${loginData}`)

    const url = `${API_URL}/invoices`
    console.log(`### url=${url}`)

    const res = await fetch(url, loginData);
    const data = await res.json();
    console.log(`### res=${res}`)
    console.log(`### data=${data}`)
    console.log(`### data=${JSON.stringify(data)}`)



  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }
 
  // revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


// 
// const UpdateInvoice = FormSchema.omit({ id: true, date: true });
// const UpdateInvoice = FormSchema.omit({ id: true });
const UpdateInvoice = FormSchema.omit({});
export async function updateInvoice(ids: string, formData: FormData) {

    console.log(`updateInvoice ### formData=${formData}`)
    console.log('updateInvoice ### ids=', ids)

    const { customerId, amount, status, date, id } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
      date: formData.get('date')?.toString().substring(0,10),
      id:ids.toString()
    });

    const amountInCents = amount * 100;
    
    try {

        let formData = { customerId, amount ,status, date, id}
        let body = JSON.stringify(formData)
        console.log(`### body=${body}`)
    
        let loginData = {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            },
            // mode: 'no-cors'
            // mode: 'cors'
        };
        console.log(`### loginData=${loginData}`)


        const url = `${API_URL}/invoices`
        console.log(`fetchCustomers ### url=${url}`)
    
        const res = await fetch(url, loginData);
        const data = await res.json();
        console.log(`### res=${res}`)
        console.log(`### data=${data}`)
        console.log(`### data=${JSON.stringify(data)}`)


    } catch (error) {
        // We'll log the error to the console for now
        console.error(error);
    }

    // try 안에 넣으면 안됨... 
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

}



export async function deleteInvoice(id: string) {

  console.log(`### id=${id}`)

  // throw new Error('Failed to Delete Invoice');
  
  // Unreachable code block
  // await sql`DELETE FROM invoices WHERE id = ${id}`;
  try {
    
    let formData = { id}
    let body = JSON.stringify(formData)
    let loginData = {
        method: 'DELETE',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(`### loginData=${loginData}`)


    const url = `https://api.dev9.store/invoices/${id}`
    console.log(`DELETE ### url=${url}`)

    const res = await fetch(url, loginData);
    const data = await res.json();
    console.log(`DELETE ### res=${res}`)
    console.log(`DELETE ### data=${data}`)
    console.log(`DELETE ### data=${JSON.stringify(data)}`)
  } catch (error) {
    
    console.error(error);
  }



  revalidatePath('/dashboard/invoices');
}