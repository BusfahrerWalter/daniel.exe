import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

// Initialize tRPC backend
const trpcRoot = initTRPC.create({ 
	transformer: superjson
});

export const router = trpcRoot.router;
export const publicProcedure = trpcRoot.procedure;
