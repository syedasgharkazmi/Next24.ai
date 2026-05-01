const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The goal is to invert DARK sections to LIGHT.
// Dark sections use:
// bg-[#000000], bg-[#0A0A0A], bg-[#111111]
// text-white, text-white/x
// border-white, border-white/x
// bg-white, bg-white/x  (for buttons and overlays in dark mode)
// hover:bg-white/10 etc.

// BUT wait, original code ALSO has:
// bg-[#F5F5F7], bg-[#F5F5F9], etc for light sections.
// bg-black/5, border-black/5, text-black inside light sections.

// So if we blindly replace "text-white" -> "text-black", we make dark sections light.
// If we blindly replace "bg-black" -> "bg-white", we do it correctly EXCEPT for "bg-black/5" which is already light mode.
// So we should NOT replace "bg-black/5" to "bg-white/5".

// Let's replace ONLY EXACT MATCHES of bg-black without slash: 
code = code.replace(/bg-black(?!\/)/g, 'bg-white');

// Backgrounds
code = code.replace(/bg-\[#000000\]/g, 'bg-white');
code = code.replace(/bg-\[#0A0A0A\]/g, 'bg-gray-50');
code = code.replace(/bg-\[#111111\]/g, 'bg-gray-100');

// text-white -> text-black
code = code.replace(/text-white(?!\/)/g, 'text-black');

// text-white/50 -> text-black/50
code = code.replace(/text-white\/([0-9]+)/g, 'text-black/$1');

// border-white -> border-black
code = code.replace(/border-white(?!\/)/g, 'border-black');
// border-white/5 -> border-black/5
code = code.replace(/border-white\/([0-9]+)/g, 'border-black/$1');

// In dark mode, buttons have bg-white text-black. 
// If background becomes white, bg-white text-black button on white background is invisible.
// So we should make buttons bg-black text-white!
// But how do we distinguish dark mode buttons from light mode cards?
// Originally: "bg-white text-black" is a button. Let's make it "bg-black text-white"
code = code.replace(/bg-white text-black/g, 'bg-black text-white');

// Wait! "bg-white/5" on dark bg was used for overlays.
// Now dark bg is white. So "bg-white/5" should become "bg-black/5".
code = code.replace(/bg-white\/([0-9]+)/g, 'bg-black/$1');

// Wait! "hover:bg-white/10" -> "hover:bg-black/10"
code = code.replace(/hover:bg-white\/([0-9]+)/g, 'hover:bg-black/$1');

// Fix specific logo text
code = code.replace(/text-black text-\[10px\](.*?)>AI<\/span>/g, 'text-white text-[10px]$1>AI</span>');

// Selection: bg-blue-500/30 selection:text-white -> wait, selection text is handled.

fs.writeFileSync('src/App.tsx.new', code);
