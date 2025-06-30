import format from 'xml-formatter';

export interface XmlResult {
    text: string;
    error: string | null;
}

export function formatXml(xml: string, spacing: number = 2): XmlResult {
    if (xml.trim().length === 0) {
        return { text: "", error: null };
    }

    try {
        const formattedXml = format(xml, {
            indentation: ' '.repeat(spacing),
            collapseContent: true,
            lineSeparator: '\r\n',
        });
        return { text: formattedXml, error: null };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Invalid XML';
        return { text: "", error: errorMessage };
    }
}

export function minifyXml(xml: string): XmlResult {
    if (xml.trim().length === 0) {
        return { text: "", error: null };
    }

    try {
        const minifiedXml = format(xml, {
            indentation: '',
            collapseContent: true,
            lineSeparator: '',
        });
        return { text: minifiedXml, error: null };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Invalid XML';
        return { text: "", error: errorMessage };
    }
}
