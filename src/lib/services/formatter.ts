import { formatJson, minifyJson } from './json';
import { formatXml, minifyXml } from './xml';

export type Language = 'json' | 'xml' | 'unknown';
export type FormatterResult = {
    text: string;
    error: string | null;
    language: Language;
};

/**
 * Processes the input string by attempting to format/minify it as JSON, then XML.
 * @param input The raw string to process.
 * @param options.minify A boolean indicating whether to minify the output.
 * @param options.spacing The number of spaces to use for formatting.
 * @returns A FormatterResult object containing the processed text, any errors, and the detected language.
 */
function process(
    input: string,
    options: { minify: boolean; spacing: number }
): FormatterResult {
    if (input.trim().length === 0) {
        return { text: '', error: null, language: 'unknown' };
    }

    // Attempt JSON first
    const jsonResult = options.minify ? minifyJson(input) : formatJson(input, options.spacing);
    if (jsonResult.error === null) {
        return { ...jsonResult, language: 'json' };
    }

    // If JSON fails, attempt XML
    const xmlResult = options.minify ? minifyXml(input) : formatXml(input, options.spacing);
    if (xmlResult.error === null) {
        return { ...xmlResult, language: 'xml' };
    }

    // If both fail, return a detailed error
    return {
        text: '',
        error: `Invalid format. Input must be valid JSON or XML.\n\nJSON Error: ${jsonResult.error}\nXML Error: ${xmlResult.error}`,
        language: 'unknown'
    };
}

/**
 * A clean, public-facing function to process text based on user-selected options.
 * @param text The raw string to process.
 * @param formattingOption Determines whether to 'Format' or 'Minify'.
 * @param spacing The number of spaces for indentation when formatting.
 * @returns A FormatterResult object.
 */
export function processText(
    text: string,
    formattingOption: 'Format' | 'Minify',
    spacing: number
): FormatterResult {
    const options = {
        minify: formattingOption === 'Minify',
        spacing: spacing
    };
    return process(text, options);
}
