import { createTRPCClient, httpBatchStreamLink, httpSubscriptionLink, splitLink } from '@trpc/client';
import type { AppRouter } from '../../server/index.js';
import superjson from 'superjson';
import type { T } from './Util.js';

// Initialize the tRPC client
const trpc = createTRPCClient<AppRouter>({
	links: [
		splitLink({
			condition: (op) => op.type === 'subscription',
			true: httpSubscriptionLink({
				url: 'http://localhost:3000',
				transformer: superjson
			}),
			false: httpBatchStreamLink({
				url: 'http://localhost:3000',
				transformer: superjson
			}),
		}),
	],
});

export type ProfileInfo = T<typeof getProfileInfo>;
export type SkillInfo = T<typeof getSkills>[0];
export type PositionInfo = T<typeof getPositions>[0];
export type EducationInfo = T<typeof getEducation>[0];

export async function getProfileInfo() {
	return await trpc.linkedin.profileInfo.query();
}

export async function getSkills() {
	return await trpc.linkedin.skills.query();
}

export async function getPositions() {
	return await trpc.linkedin.positions.query();
}

export async function getEducation() {
	return await trpc.linkedin.education.query();
}