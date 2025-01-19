'use server';
 

import { z } from 'zod';
 
import { revalidatePath } from 'next/cache';

import { redirect } from 'next/navigation';




const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
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



 
const CreateInvoice = FormSchema.omit({ id: true, date: true });


export async function createInvoice(formData: FormData) {
  console.log('createInvoice=========',1111111)
  const { customerId, amount, status } = CreateInvoice.parse({    
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })
  // Test it out:
  
  const amountInCents = amount * 100;
  
  const date = new Date().toISOString().split('T')[0];



//   await sql`
//     INSERT INTO invoices (customer_id, amount, status, date)
//     VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//   `;
  try {
    // await sql`
    //   INSERT INTO invoices (customer_id, amount, status, date)
    //   VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    // `;

    let formData = { customerId, amount ,status}
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

    const url = `http://localhost:8088/invoices`
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

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

}


// 
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export async function updateInvoice(formData: FormData) {

  console.log(`updateInvoice ### formData=${formData}`)






  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });


   


    const amountInCents = amount * 100;

 

    // await sql`
    //   UPDATE invoices
    //   SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    //   WHERE id = ${id}
    // `;
    
    try {
        // await sql`
        //     UPDATE invoices
        //     SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        //     WHERE id = ${id}
        // `;

        let formData = { customerId, amount ,status}
        let body = JSON.stringify(formData)
        console.log(`### body=${body}`)
    
        let loginData = {
            method: 'update',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(`### loginData=${loginData}`)


        const url = `http://localhost:8088/invoices`
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


    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }



  export async function deleteInvoice(id: string) {


    console.log(`### id=${id}`)
    return

    // throw new Error('Failed to Delete Invoice');
   
    // Unreachable code block
    // await sql`DELETE FROM invoices WHERE id = ${id}`;

    let loginData = {
        method: 'delete',
        body: {id },
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(`### loginData=${loginData}`)


    const url = `http://localhost:8088/invoices`
    console.log(`fetchCustomers ### url=${url}`)

    const res = await fetch(url, loginData);
    const data = await res.json();
    console.log(`### res=${res}`)
    console.log(`### data=${data}`)
    console.log(`### data=${JSON.stringify(data)}`)



    revalidatePath('/dashboard/invoices');
  }