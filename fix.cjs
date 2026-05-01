const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/bg-black\/60 backdrop-blur-md/g, 'bg-white/80 backdrop-blur-md');
code = code.replace(/_black_100%/g, '_white_100%');
code = code.replace(/border-white\/\[0\.05\]/g, 'border-black/[0.05]');

// Let's also check for any text-black/[0-9]+ that overlay text which might need visibility
// What about other overlays?
// "bg-black" is white now. "bg-black/50" should be "bg-white/50" or similar?
code = code.replace(/bg-black\/50 border border-white\/10/, 'bg-white/50 border border-black/10'); // For inputs

fs.writeFileSync('src/App.tsx', code);
