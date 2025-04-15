/**
 * Recursively converts all Date objects within an object to ISO strings
 * @param obj The object to process
 * @returns A new object with all Date objects converted to strings
 */
type DateToStringConverter<T> = T extends Date
	? string
	: T extends Array<infer U>
		? Array<DateToStringConverter<U>>
		: T extends object
			? { [K in keyof T]: DateToStringConverter<T[K]> }
			: T;

export function convertDatesToStrings<T>(obj: T): DateToStringConverter<T> {
	// Handle null or undefined
	if (obj === null || obj === undefined) {
		return obj as DateToStringConverter<T>;
	}

	// Handle Date objects
	if (obj instanceof Date) {
		return obj.toISOString() as DateToStringConverter<T>;
	}

	// Handle arrays
	if (Array.isArray(obj)) {
		return obj.map((item) =>
			convertDatesToStrings(item),
		) as DateToStringConverter<T>;
	}

	// Handle objects (but not dates, which are also objects)
	if (typeof obj === "object") {
		const result: Record<string, unknown> = {};

		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				result[key] = convertDatesToStrings(obj[key]);
			}
		}

		return result as DateToStringConverter<T>;
	}

	// Handle primitives
	return obj as DateToStringConverter<T>;
}