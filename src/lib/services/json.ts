export interface JsonResult {
    text: string;
    error: string | null;
}

export function formatJson(json: string, spacing: number = 2): JsonResult {
    if (json.length === 0) return { text: "", error: null };

    try {
        const parsed = JSON.parse(json);
        return { text: JSON.stringify(parsed, null, spacing), error: null };
    } catch (e) {
        return { text: "", error: e instanceof Error ? e.message : 'Invalid JSON' };
    }
}

export function minifyJson(json: string): JsonResult {
    if (json.length === 0) return { text: "", error: null };

    try {
        const parsed = JSON.parse(json);
        return { text: JSON.stringify(parsed), error: null };
    } catch (e) {
        return { text: "", error: e instanceof Error ? e.message : 'Invalid JSON' };
    }
}
