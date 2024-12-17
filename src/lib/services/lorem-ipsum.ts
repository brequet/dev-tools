const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'curabitur',
    'maximus', 'leo', 'ut', 'suscipit', 'fermentum', 'etiam', 'faucibus', 'augue', 'ac', 'mi', 'venenatis',
    'quis', 'finibus', 'purus', 'aliquam', 'aenean', 'congue', 'diam', 'sagittis', 'morbi', 'pulvinar', 'vitae',
    'arcu', 'id', 'ornare', 'duis', 'molestie', 'urna', 'in', 'scelerisque', 'vehicula', 'efficitur', 'mattis',
    'praesent', 'vulputate', 'porta', 'vivamus', 'nunc', 'at', 'est', 'egestas', 'nunc', 'erat', 'ligula', 'dictum',
    'et', 'consequat', 'pellentesque', 'eros', 'massa', 'condimentum', 'nec', 'laoreet', 'tortor', 'ex'
];

function getRandomWords(count: number): string[] {
    return Array.from({ length: count }, () => loremWords[Math.floor(Math.random() * loremWords.length)]);
}

export type SizingOption = 'Words' | 'Phrases' | 'Paragraphs'

export function generateLoremIpsum(size: number, sizingOption: SizingOption): string {
    if (size <= 0) return '';

    switch (sizingOption) {
        case 'Words':
            return getRandomWords(size).join(' ');
        case 'Phrases':
            return Array.from({ length: size }, () => {
                const phraseLength = Math.floor(Math.random() * 5) + 3; // 3-7 words
                return getRandomWords(phraseLength).join(' ');
            }).join(', ') + '.';
        case 'Paragraphs':
            return Array.from({ length: size }, () => {
                const sentenceCount = Math.floor(Math.random() * 5) + 3; // 3-8 sentences
                return Array.from({ length: sentenceCount }, () => {
                    const sentenceLength = Math.floor(Math.random() * 8) + 4; // 4-11 words
                    const sentence = getRandomWords(sentenceLength).join(' ');
                    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
                }).join(' ');
            }).join('\n\n');
        default:
            return '';
    }
}
