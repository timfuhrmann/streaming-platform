export const DEFAULT_TIMESTAMP = "00:00";

/**
 * Converts seconds into time code.
 * @param {number} value - A number in seconds to be converted into a formatted time code.
 * @returns {string} A formatted time code string.
 */
export function convertToTimeCode(value: number): string {
    if (isNaN(value)) {
        return DEFAULT_TIMESTAMP;
    }

    value = Math.max(value, 0);
    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    const s = Math.floor((value % 3600) % 60);

    return (
        (h === 0 ? "" : h < 10 ? "0" + h.toString() + ":" : h.toString() + ":") +
        (m < 10 ? "0" + m.toString() : m.toString()) +
        ":" +
        (s < 10 ? "0" + s.toString() : s.toString())
    );
}
