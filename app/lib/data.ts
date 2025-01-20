// import { sql } from '@vercel/postgres';

import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  Customer,
} from "./definitions";
import { formatCurrency } from "./utils";

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    let res = await fetch("http://localhost:8088/revenue");
    let data = await res.json();

    // console.log("data=", data);

    return data;
    // return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestInvoices() {
  try {
    // const data = await sql<LatestInvoiceRaw>`
    //   SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   ORDER BY invoices.date DESC
    //   LIMIT 5`;

    let res = await fetch("http://localhost:8088/todo/2");
    let data = await res.json();

    const latestInvoices = data.map((invoice : InvoiceForm) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    // const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;

    let res1 =  await  fetch("http://localhost:8088/todo/3");
    let invoiceCountPromise = await res1.json();
    let res2 =  await  fetch("http://localhost:8088/todo/4");
    let customerCountPromise = await res2.json();
    let res3 =  await  fetch("http://localhost:8088/todo/5") ;
    let invoiceStatusPromise = await res3.json();
    // const invoiceCountPromise = await fetch("http://localhost:8088/todo/3");
    // const customerCountPromise = await fetch("http://localhost:8088/todo/4");
    // const invoiceStatusPromise = await fetch("http://localhost:8088/todo/5") ;

         const data = await Promise.all([
          invoiceCountPromise,
          customerCountPromise,
          invoiceStatusPromise,
        ]);
 
        console.log('data[0]=', data[0]) 
        console.log('data[1]=', data[1]) 
        console.log('data[2]=', data[2]) 

    const numberOfInvoices = Number(data[0][0].count ?? "0");
    const numberOfCustomers = Number(data[1][0].count ?? "0");
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? "0");
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? "0");

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
const limit = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {


  console.log(`2222ssssssssssssss### query=${query}`)
  console.log(`2222ssssssssssssss### currentPage=${currentPage}`)


  console.log(`### ITEMS_PER_PAGE=${ITEMS_PER_PAGE}`)
  console.log(`### limit=${limit}`)
  console.log(`### currentPage=${currentPage}`)

  
  // const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const offset = (currentPage - 1) * limit;
  console.log(`### offset=${offset}`)

  try {
    // const invoices = await sql<InvoicesTable>`
    //   SELECT
    //     invoices.id,
    //     invoices.amount,
    //     invoices.date,
    //     invoices.status,
    //     customers.name,
    //     customers.email,
    //     customers.image_url
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   WHERE
    //     customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    //   ORDER BY invoices.date DESC
    //   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    // `;

    const url = `http://localhost:8088/todo/6?offset=${offset}&limit=${limit}&query=${query}`
  console.log(`2222ssssssssssssss### url=${url}`)
    let res = await fetch(url);
    const invoices = await res.json();


    console.log(`2222ssssssssssssss### invoices=${invoices}`)
    console.log('### invoices=',invoices)




    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string) {


  console.log(`ssssssssssssss### query=${query}`)

  try {



  //   const count = await sql`SELECT COUNT(*)
  //   FROM invoices
  //   JOIN customers ON invoices.customer_id = customers.id
  //   WHERE
  //     customers.name ILIKE ${`%${query}%`} OR
  //     customers.email ILIKE ${`%${query}%`} OR
  //     invoices.amount::text ILIKE ${`%${query}%`} OR
  //     invoices.date::text ILIKE ${`%${query}%`} OR
  //     invoices.status ILIKE ${`%${query}%`}
  // `;
    const url = `http://localhost:8088/todo/7?query=${query}`
    console.log(`### url=${url}`)
    const res = await fetch(url);
    const data = await res.json();
    console.log(`### res=${res}`)
    console.log(`### data=${JSON.stringify(data)}`)
    console.log(`### data[0]=${data[0]}`)

  // const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
  const totalPages = Math.ceil(Number(data[0].count) / limit);
    console.log(`SSSSSSSSSSSS ### totalPages=${totalPages}`)
    return totalPages;




  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    // const data = await sql<InvoiceForm>`
    //   SELECT
    //     invoices.id,
    //     invoices.customer_id,
    //     invoices.amount,
    //     invoices.status
    //   FROM invoices
    //   WHERE invoices.id = ${id};
    // `;


    const url = `http://localhost:8088/todo/9?id=${id}`
    console.log(`### url999=${url}`)

    const res = await fetch(url);
    const data = await res.json();

    console.log(`### res=${res}`)
    console.log(`### data=${JSON.stringify(data)}`)

    
    const invoice = data.map((invoice : InvoiceForm) => ({
      ...invoice,
      // Convert amount from cents to dollars
      // amount: invoice.amount / 100,
    }));

    console.log(invoice); // Invoice is an empty array []


    
    return invoice[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchCustomers() {
  try {

    const url = `http://localhost:8088/todo/8`
    console.log(`fetchCustomers ### url=${url}`)

    const res = await fetch(url);
    const data = await res.json();
    console.log(`### res=${res}`)
    console.log(`### data=${data}`)
    console.log(`### data=${JSON.stringify(data)}`)

    const customers = data;
    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    // const data = await sql<CustomersTableType>`
		// SELECT
		//   customers.id,
		//   customers.name,
		//   customers.email,
		//   customers.image_url,
		//   COUNT(invoices.id) AS total_invoices,
		//   SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		//   SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		// FROM customers
		// LEFT JOIN invoices ON customers.id = invoices.customer_id
		// WHERE
		//   customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`}
		// GROUP BY customers.id, customers.name, customers.email, customers.image_url
		// ORDER BY customers.name ASC
	  // `;



    const url = `http://localhost:8088/todo/10?query=${query}`
    console.log(`fetchCustomers ### url=${url}`)

    const res = await fetch(url);
    const data = await res.json();
    console.log(`### res=${res}`)
    console.log(`### data=${data}`)
    console.log(`### data=${JSON.stringify(data)}`)


    const customers = data.map((customer: CustomersTableType) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}

 