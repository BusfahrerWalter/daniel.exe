export type T<Fn extends (...args: any) => any> = Awaited<ReturnType<Fn>>;

export function getUrlParam(name: string): string | null {
	name = name.trim().toLowerCase();
	const url = new URL(window.location.href);

	for (const [key, value] of url.searchParams.entries()) {
		if (name === key.trim().toLowerCase()) {
			return value;
		}
	}

	return null;
}

export function random(minInclusive: number, maxInclusive: number) {
	return Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive;
}

export function parseDate(dateString: string | Date): Date {
	return typeof dateString === 'string' ? new Date(dateString) : dateString;
}

export function duration(from?: string | Date, to?: string | Date): string {
	const start = from ? parseDate(from) : new Date();
	const end = to ? parseDate(to) : new Date();
	if (!start || !end) {
		return '';
	}

	let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
	const years = Math.floor(months / 12);
	months = months % 12;

	let result = '';
	if (years > 0) {
		result += `${years} yr${years > 1 ? 's' : ''}`;
	}
	if (months > 0) {
		result += `${years > 0 ? ' ' : ''}${months} mo${months > 1 ? 's' : ''}`;
	}

	return result;
}

export async function sleep(delay: number): Promise<void> {
	return new Promise(resolve => {
		setTimeout(resolve, delay);
	});
}