import { Font } from '@react-pdf/renderer';

// Import WOFF2 files from @fontsource/inter — Vite resolves these to URLs
import interLatin400 from '@fontsource/inter/files/inter-latin-400-normal.woff2';
import interLatin600 from '@fontsource/inter/files/inter-latin-600-normal.woff2';
import interLatin700 from '@fontsource/inter/files/inter-latin-700-normal.woff2';
import interLatin400Italic from '@fontsource/inter/files/inter-latin-400-italic.woff2';

Font.register({
  family: 'Inter',
  fonts: [
    { src: interLatin400, fontWeight: 400, fontStyle: 'normal' },
    { src: interLatin400Italic, fontWeight: 400, fontStyle: 'italic' },
    { src: interLatin600, fontWeight: 600, fontStyle: 'normal' },
    { src: interLatin700, fontWeight: 700, fontStyle: 'normal' },
  ],
});

// Disable hyphenation to match browser rendering
Font.registerHyphenationCallback((word) => [word]);
