// Medieval-themed SVG obstacles for the Old English theme.
// Each page gets a unique period-appropriate decorative element:
// 1. Vine border (green trailing ivy — illuminated manuscript style)
// 2. Jester (court fool motif — medieval entertainment)
// 3. Quill & scroll (scholar's instrument — calibration/measurement)

function createSvgDataUrl(markup: string): string {
  return `data:image/svg+xml,${encodeURIComponent(markup)}`
}

// Trailing green vine with leaves — common in illuminated manuscript margins
export const VINE_SVG_DATA_URL = createSvgDataUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">' +
    // Main vine stem — sinuous curve
    '<path d="M30 170 C40 140 35 110 50 85 C65 60 55 35 70 15" ' +
    'fill="none" stroke="#3d6b35" stroke-width="3" opacity="0.7"/>' +
    // Branch stems
    '<path d="M50 85 C70 80 85 65 95 50" fill="none" stroke="#3d6b35" stroke-width="2" opacity="0.6"/>' +
    '<path d="M42 120 C25 115 15 100 10 80" fill="none" stroke="#3d6b35" stroke-width="2" opacity="0.6"/>' +
    '<path d="M60 55 C80 60 100 55 115 40" fill="none" stroke="#3d6b35" stroke-width="1.5" opacity="0.5"/>' +
    // Leaves — pointed ivy shapes
    '<path d="M95 50 C100 40 110 38 105 50 C112 45 108 55 95 50Z" fill="#4a8a3f" opacity="0.75"/>' +
    '<path d="M10 80 C5 70 8 58 15 72 C8 62 20 65 10 80Z" fill="#4a8a3f" opacity="0.7"/>' +
    '<path d="M115 40 C120 28 132 25 125 40 C135 30 128 45 115 40Z" fill="#5a9a4f" opacity="0.65"/>' +
    '<path d="M70 15 C75 5 85 2 78 18 C88 8 80 22 70 15Z" fill="#4a8a3f" opacity="0.7"/>' +
    // Small leaves along the stem
    '<path d="M38 145 C32 138 28 128 38 135 C30 130 40 132 38 145Z" fill="#5a9a4f" opacity="0.6"/>' +
    '<path d="M55 70 C60 62 68 58 60 68 C66 60 62 72 55 70Z" fill="#4a8a3f" opacity="0.65"/>' +
    // Curling tendrils
    '<path d="M48 100 C42 95 38 88 42 92" fill="none" stroke="#5a9a4f" stroke-width="1" opacity="0.5"/>' +
    '<path d="M65 40 C72 38 78 40 75 42" fill="none" stroke="#5a9a4f" stroke-width="1" opacity="0.5"/>' +
    // Small berries
    '<circle cx="35" cy="155" r="3" fill="#8b1a1a" opacity="0.6"/>' +
    '<circle cx="32" cy="150" r="2.5" fill="#8b1a1a" opacity="0.5"/>' +
    '<circle cx="58" cy="62" r="2" fill="#8b1a1a" opacity="0.5"/>' +
    '</svg>',
)

// Jester / court fool — diamond motley, bell-tipped cap, mirthful pose
export const JESTER_SVG_DATA_URL = createSvgDataUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    // Head
    '<circle cx="100" cy="65" r="20" fill="#e8d5b0" stroke="#5c4a32" stroke-width="1.5" opacity="0.85"/>' +
    // Eyes — mischievous
    '<circle cx="93" cy="62" r="2.5" fill="#1a1008" opacity="0.8"/>' +
    '<circle cx="107" cy="62" r="2.5" fill="#1a1008" opacity="0.8"/>' +
    // Grin
    '<path d="M90 72 Q100 82 110 72" fill="none" stroke="#1a1008" stroke-width="1.5" opacity="0.7"/>' +
    // Jester cap — three-pointed with bells
    '<path d="M80 55 C75 30 60 20 50 15" fill="none" stroke="#8b1a1a" stroke-width="2.5" opacity="0.8"/>' +
    '<path d="M100 45 C100 25 105 10 110 5" fill="none" stroke="#c9a84c" stroke-width="2.5" opacity="0.8"/>' +
    '<path d="M120 55 C125 30 140 20 150 15" fill="none" stroke="#3d6b35" stroke-width="2.5" opacity="0.8"/>' +
    // Cap base
    '<path d="M78 58 C85 48 95 45 100 45 C105 45 115 48 122 58" fill="#5c4a32" opacity="0.3"/>' +
    // Bells at cap tips
    '<circle cx="50" cy="15" r="5" fill="#c9a84c" opacity="0.7"/>' +
    '<circle cx="110" cy="5" r="5" fill="#c9a84c" opacity="0.7"/>' +
    '<circle cx="150" cy="15" r="5" fill="#c9a84c" opacity="0.7"/>' +
    // Bell clappers
    '<circle cx="50" cy="18" r="1.5" fill="#8b6914" opacity="0.6"/>' +
    '<circle cx="110" cy="8" r="1.5" fill="#8b6914" opacity="0.6"/>' +
    '<circle cx="150" cy="18" r="1.5" fill="#8b6914" opacity="0.6"/>' +
    // Body — diamond motley pattern
    '<path d="M85 85 L100 120 L115 85 L100 90 Z" fill="#8b1a1a" opacity="0.5"/>' +
    '<path d="M85 85 L100 90 L100 120 Z" fill="#c9a84c" opacity="0.35"/>' +
    '<path d="M115 85 L100 90 L100 120 Z" fill="#3d6b35" opacity="0.4"/>' +
    // Collar — ruffled
    '<path d="M82 85 C88 80 95 82 100 78 C105 82 112 80 118 85 C112 88 105 86 100 90 C95 86 88 88 82 85Z" ' +
    'fill="#e8d5b0" stroke="#5c4a32" stroke-width="0.8" opacity="0.7"/>' +
    // Arms — outstretched playfully
    '<path d="M85 90 C70 95 55 100 45 110" fill="none" stroke="#5c4a32" stroke-width="2" opacity="0.5"/>' +
    '<path d="M115 90 C130 95 145 100 155 110" fill="none" stroke="#5c4a32" stroke-width="2" opacity="0.5"/>' +
    // Legs
    '<path d="M95 120 C90 145 85 165 80 180" fill="none" stroke="#5c4a32" stroke-width="2" opacity="0.5"/>' +
    '<path d="M105 120 C110 145 115 165 120 180" fill="none" stroke="#5c4a32" stroke-width="2" opacity="0.5"/>' +
    // Shoes — pointed medieval
    '<path d="M80 180 C75 182 65 180 60 178" fill="none" stroke="#8b1a1a" stroke-width="2" opacity="0.5"/>' +
    '<path d="M120 180 C125 182 135 180 140 178" fill="none" stroke="#3d6b35" stroke-width="2" opacity="0.5"/>' +
    // Shoe bells
    '<circle cx="60" cy="178" r="3" fill="#c9a84c" opacity="0.5"/>' +
    '<circle cx="140" cy="178" r="3" fill="#c9a84c" opacity="0.5"/>' +
    '</svg>',
)

// Quill pen with scroll — scholar/measurement motif for calibration
export const QUILL_SVG_DATA_URL = createSvgDataUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="190" height="190" viewBox="0 0 190 190">' +
    // Scroll — rolled parchment
    '<path d="M40 140 C40 130 50 125 60 125 L150 125 C160 125 170 130 170 140 C170 150 160 155 150 155 L60 155 C50 155 40 150 40 140Z" ' +
    'fill="#d4bb8a" stroke="#5c4a32" stroke-width="1.5" opacity="0.6"/>' +
    // Scroll roll shadow
    '<path d="M40 140 C40 135 45 130 55 130 C45 132 42 136 42 140 C42 144 45 148 55 150 C45 150 40 145 40 140Z" ' +
    'fill="#b89e6e" opacity="0.5"/>' +
    '<path d="M170 140 C170 135 165 130 155 130 C165 132 168 136 168 140 C168 144 165 148 155 150 C165 150 170 145 170 140Z" ' +
    'fill="#b89e6e" opacity="0.5"/>' +
    // Text lines on scroll
    '<line x1="65" y1="135" x2="125" y2="135" stroke="#5c4a32" stroke-width="0.8" opacity="0.3"/>' +
    '<line x1="70" y1="140" x2="140" y2="140" stroke="#5c4a32" stroke-width="0.8" opacity="0.3"/>' +
    '<line x1="65" y1="145" x2="130" y2="145" stroke="#5c4a32" stroke-width="0.8" opacity="0.3"/>' +
    // Quill pen — diagonal across the scroll
    '<path d="M140 30 C135 50 125 75 110 100 C105 110 95 125 90 135" ' +
    'fill="none" stroke="#5c4a32" stroke-width="1.5" opacity="0.7"/>' +
    // Quill feather — flowing plume
    '<path d="M140 30 C150 20 160 15 170 10 C160 18 155 28 145 35 C155 22 162 12 170 10 C158 20 150 32 140 30Z" ' +
    'fill="#3d6b35" opacity="0.6"/>' +
    '<path d="M140 30 C145 22 155 15 165 12 C152 20 148 28 142 32Z" ' +
    'fill="#4a8a3f" opacity="0.4"/>' +
    // Feather barbs
    '<path d="M150 25 C155 20 160 18 162 15" fill="none" stroke="#3d6b35" stroke-width="0.5" opacity="0.4"/>' +
    '<path d="M145 30 C150 25 155 22 158 18" fill="none" stroke="#3d6b35" stroke-width="0.5" opacity="0.4"/>' +
    // Nib — ink tip
    '<path d="M90 135 L88 142 L92 140 Z" fill="#1a1008" opacity="0.7"/>' +
    // Ink splatter
    '<circle cx="85" cy="145" r="2" fill="#1a1008" opacity="0.4"/>' +
    '<circle cx="92" cy="148" r="1.5" fill="#1a1008" opacity="0.3"/>' +
    '<circle cx="88" cy="150" r="1" fill="#1a1008" opacity="0.25"/>' +
    // Wax seal on scroll
    '<circle cx="105" cy="160" r="10" fill="#8b1a1a" opacity="0.5"/>' +
    '<circle cx="105" cy="160" r="6" fill="#8b1a1a" opacity="0.3"/>' +
    // Seal impression
    '<path d="M102 157 L105 154 L108 157 L108 163 L105 166 L102 163 Z" fill="#a02020" opacity="0.4"/>' +
    '</svg>',
)

// Map of page IDs to their medieval SVG replacements
export const medievalImageOverrides: Record<string, string> = {
  'signal-problem': VINE_SVG_DATA_URL,
  'interview-architecture': JESTER_SVG_DATA_URL,
  'calibration-gap': QUILL_SVG_DATA_URL,
}
