import 'dotenv/config';
import cors from 'cors';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc.js';
import { getEducation, getPositions, getProfileInfo, getSkills } from './linkedin.js';

const appRouter = router({
	linkedin: {
		profileInfo: publicProcedure.query(getProfileInfo),
		skills: publicProcedure.query(getSkills),
		positions: publicProcedure.query(getPositions),
		education: publicProcedure.query(getEducation),
	}
});

// Export type router type signature, this is used by the client.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
	router: appRouter,
	middleware: cors({
		methods: process.env.CORS_ALLOWED_METHODS ?? 'GET',
		origin: process.env.CORS_ALLOWED_ORIGINS ?? '*'
	}),
	responseMeta(opts) {
		if (opts.errors.length) {
			return {
				status: 500
			};
		}

		const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
		return {
			headers: new Headers([
				['cache-control', `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`]
			])
		};
	}
});

server.listen(process.env.HTTP_SEVER_PORT ?? 3000);
