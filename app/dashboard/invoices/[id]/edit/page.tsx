import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

import { notFound } from 'next/navigation';


import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '수정 송장 Invoices',
};


export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    console.log(`edit page ### params=${params}`)
    console.log(`edit page ### params=${JSON.stringify(params)}`)
    console.log(`edit page ### id=${id}`)

    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
      ]);


      if (!invoice) {
        notFound();
      }

      
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}