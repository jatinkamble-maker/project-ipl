const fs = require('fs');
const path = require('path');

const dir = __dirname;
const teams = [
    ["CSK.html", "Chennai Super Kings", "5"],
    ["MI.html", "Mumbai Indians", "5"],
    ["KKR.html", "Kolkata Knight Riders", "3"],
    ["RCB.html", "Royal Challengers Bangalore", "1"],
    ["RR.html", "Rajasthan Royals", "1"],
    ["DC.html", "Delhi Capitals", "0"],
    ["SRH.html", "Sunrisers Hyderabad", "1"],
    ["PBKS.html", "Punjab Kings", "0"],
    ["GT.html", "Gujarat Titans", "1"],
    ["LSG.html", "Lucknow Super Giants", "0"]
];

teams.forEach(t => {
    const file = path.join(dir, t[0]);
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        const replacement = `</header>\n\n<div style="text-align: center; padding-top: 40px;">\n    <h1 style="margin: 0; font-size: 38px; color: #facc15; text-transform: uppercase; letter-spacing: 2px;">${t[1]}</h1>\n    <h3 style="margin: 10px 0 0 0; font-size: 22px; color: #e5e7eb;">🏆 Trophies Won: ${t[2]}</h3>\n</div>\n\n<section class="section">`;
        
        // Prevent double replacement if script ran multiple times
        if (!content.includes('🏆 Trophies Won:')) {
            content = content.replace(/<\/header>[\s\S]*?<section class="section">/, replacement);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${t[0]}`);
        } else {
            console.log(`Already updated ${t[0]}`);
        }
    } else {
        console.log(`File not found: ${t[0]}`);
    }
});
