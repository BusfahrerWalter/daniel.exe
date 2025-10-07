import superjson from 'superjson';
import { createTRPCClient, httpBatchStreamLink, httpSubscriptionLink, splitLink } from '@trpc/client';
import type { AppRouter } from '../../../server/src/index';
import type { T } from './Util.js';

// Initialize the tRPC client
let trpc!: ReturnType<typeof createTRPCClient<AppRouter>>;

export function init() {
	trpc = createTRPCClient<AppRouter>({
		links: [
			splitLink({
				condition: (op) => op.type === 'subscription',
				true: httpSubscriptionLink({
					url: window.app.apiBase,
					transformer: superjson
				}),
				false: httpBatchStreamLink({
					url: window.app.apiBase,
					transformer: superjson
				})
			})
		]
	});
}

function assertInitialized() {
	if (!trpc) {
		throw new Error('tRPC client not initialized yet!');
	}
}

export type ProfileInfo = T<typeof getProfileInfo>;
export type SkillInfo = T<typeof getSkills>[0];
export type PositionInfo = T<typeof getPositions>[0];
export type EducationInfo = T<typeof getEducation>[0];
export type ProjectInfo = T<typeof getProjects>[0];

export async function getProfileInfo() {
	assertInitialized();
	return await trpc.linkedin.profileInfo.query();
}

export async function getSkills() {
	assertInitialized();
	return await trpc.linkedin.skills.query();
}

export async function getPositions() {
	assertInitialized();
	return await trpc.linkedin.positions.query();
}

export async function getEducation() {
	assertInitialized();
	return await trpc.linkedin.education.query();
}

export async function getProjects() {
	assertInitialized();
	return await trpc.linkedin.projects.query();
}