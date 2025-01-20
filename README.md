## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

    cd nextjs-dashboard
    pnpm run dev
    pnpm dev




"# nextjs-dashboard-api" 




npm install -g pnpm@latest-10

pnpm install bcrypt



 7 | import bcrypt from 'bcrypt';


    Server Error

    Error: Failed to load external module bcrypt: Error: Cannot find module 'C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\bcrypt@5.1.1\node_modules\bcrypt\lib\binding\napi-v3\bcrypt_lib.node'
    Require stack:
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\bcrypt@5.1.1\node_modules\bcrypt\bcrypt.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\.next\server\chunks\ssr\[turbopack]_runtime.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\.next\server\app\login\page.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\next@15.0.3_react-dom@19.0.0_react@19.0.0__react@19.0.0\node_modules\next\dist\server\require.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\next@15.0.3_react-dom@19.0.0_react@19.0.0__react@19.0.0\node_modules\next\dist\server\load-components.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\next@15.0.3_react-dom@19.0.0_react@19.0.0__react@19.0.0\node_modules\next\dist\build\utils.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\next@15.0.3_react-dom@19.0.0_react@19.0.0__react@19.0.0\node_modules\next\dist\build\swc\options.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\next@15.0.3_react-dom@19.0.0_react@19.0.0__react@19.0.0\node_modules\next\dist\build\swc\index.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\next@15.0.3_react-dom@19.0.0_react@19.0.0__react@19.0.0\node_modules\next\dist\build\next-config-ts\transpile-config.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\next@15.0.3_react-dom@19.0.0_react@19.0.0__react@19.0.0\node_modules\next\dist\server\config.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\next@15.0.3_react-dom@19.0.0_react@19.0.0__react@19.0.0\node_modules\next\dist\server\next.js
    - C:\Users\sangb\Documents\GitHub\nextjs-dashboard-api\node_modules\.pnpm\next@15.0.3_react-dom@19.0.0_react@19.0.0__react@19.0.0\node_modules\next\dist\server\lib\start-server.js



            5 | import { sql } from '@vercel/postgres';
        6 | import type { User } from '@/app/lib/definitions';
        >  7 | import bcrypt from 'bcrypt';
        8 |
        9 | async function getUser(email: string): Promise<User | undefined> {
        10 |   try { {
        page: '/login'
        }
        GET /login 500 in 276ms