export const sensitiveKeys = {
	phoneNumber: true,
	emailAddress: true,
};

type Data<T> = Omit<T, keyof typeof sensitiveKeys>;

export type SanitizedData<T> = T extends any[] ? Data<T[0]>[] : Data<T>;
export type DirtyData = Record<string, any> | any[];

export function dropSensitiveData<T extends DirtyData>(data: T): SanitizedData<T> {
	if (Array.isArray(data)) {
		return data.map(item => dropSensitiveData(item)) as SanitizedData<T>;
	}

	for (const [key, value] of Object.entries(data)) {
		if ((sensitiveKeys as any)[key]) {
			delete data[key];
			continue;
		}

		if (typeof value === 'object' && value !== null) {
			dropSensitiveData(value);
			continue;
		}
	}

	return data as never as SanitizedData<T>;
}