import { SnapshotData, SnapshotDomain } from './linkedin.d';
import { dropSensitiveData, SanitizedData } from "./sanitize";

const apiKey = process.env.LINKEDIN_API_KEY;

export async function requestRawDomainData(domain: SnapshotDomain): Promise<any> {
	const params = new URLSearchParams();
	params.append('q', 'criteria');
	params.append('domain', domain);

	try {
		const res = await fetch(`https://api.linkedin.com/rest/memberSnapshotData?${params}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${apiKey}`,
				'Connection': 'Keep-Alive',
				'X-Restli-Protocol-Version': '2.0.0',
				'LinkedIn-Version': '202312'
			}
		});

		return await res.json();
	} catch(err) {
		console.error('Error fetching LinkedIn data');
		throw err;
	}
}

function cleanObjectKeys(obj: any): any {
	if (Array.isArray(obj)) {
		return obj.map(item => cleanObjectKeys(item));
	}

	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === 'object' && value !== null) {
			cleanObjectKeys(value);
		}

		const newKey = transformKey(key);
		if (newKey === key) {
			continue;
		}

		delete obj[key];
		obj[newKey] = value;
	}

	return obj;
}

function transformKey(key: string): string {
	return `${key[0].toLowerCase()}${key.substring(1).replace(/\s/g, '')}`;
}

export async function requestDomainData<T extends SnapshotDomain>(domain: T): Promise<SanitizedData<SnapshotData[T]>> {
	const raw = await requestRawDomainData(domain);
	const snapshots = raw.elements[0].snapshotData;

	console.log("LINKEDIN RAW", JSON.stringify(raw, null, 2));
	return dropSensitiveData(cleanObjectKeys(snapshots)) as any;
}

export async function requestDomainDataFirst<T extends SnapshotDomain>(domain: T): Promise<SanitizedData<SnapshotData[T]>> {
	const snapshot = await requestDomainData(domain);
	return snapshot[0] ?? null;
}

export async function getProfileInfo() {
	return await requestDomainDataFirst('PROFILE');
}

export async function getSkills() {
	return await requestDomainData('SKILLS');
}

export async function getPositions() {
	return await requestDomainData('POSITIONS');
}

export async function getEducation() {
	return await requestDomainData('EDUCATION');
}