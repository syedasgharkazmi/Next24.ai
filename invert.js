const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace backgrounds
code = code.replace(/bg-black/g, 'bg-white');
code = code.replace(/bg-\[#000000\]/g, 'bg-white');
code = code.replace(/bg-\[#0A0A0A\]/g, 'bg-gray-50');
code = code.replace(/bg-\[#111111\]/g, 'bg-gray-100');

// Replace text colors based on the context of those inverted sections.
// Wait, if I unconditionally replace text-white with text-black, I might break some elements (like buttons) that need white text.
// Let's be careful.
code = code.replace(/text-white/g, 'text-gray-900');
code = code.replace(/text-gray-900\/50/g, 'text-gray-500'); // wait, if I had text-white/50 -> text-gray-900/50, let's just do text-gray-900
code = code.replace(/text-white\/([0-9]+)/g, 'text-gray-$10'); // This is risky, text-gray-500 is better
code = code.replace(/border-white/g, 'border-black');

fs.writeFileSync('src/App.tsx.new', code);
