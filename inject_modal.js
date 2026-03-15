const fs = require('fs');
const path = require('path');

const dir = __dirname;
const teams = [
    "CSK.html", "MI.html", "KKR.html", "RCB.html", 
    "RR.html", "DC.html", "SRH.html", "PBKS.html", 
    "GT.html", "LSG.html"
];

// CSS to inject
const modalCSS = `
/* ===== PLAYER STATS MODAL ===== */
.modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(2, 6, 23, 0.85);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: linear-gradient(145deg, #1e293b, #0f172a);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 40px;
    width: 90%;
    max-width: 500px;
    text-align: center;
    position: relative;
    transform: translateY(50px) scale(0.9);
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 25px 50px rgba(0,0,0,0.6);
}

.modal-overlay.active .modal-content {
    transform: translateY(0) scale(1);
}

.modal-close {
    position: absolute;
    top: 20px; right: 25px;
    background: rgba(255,255,255,0.1);
    border: none;
    color: white;
    font-size: 24px;
    border-radius: 50%;
    width: 36px; height: 36px;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-close:hover {
    background: #ef4444;
    transform: rotate(90deg);
}

.modal-img {
    width: 120px; height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
    border: 3px solid #facc15;
    background: rgba(255,255,255,0.1);
}

.modal-name {
    font-size: 28px;
    font-weight: bold;
    color: #facc15;
    margin-bottom: 5px;
}

.modal-role {
    font-size: 16px;
    color: #cbd5f5;
    margin-bottom: 25px;
}

.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.stat-box {
    background: rgba(0,0,0,0.3);
    padding: 15px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.05);
}

.stat-value {
    font-size: 24px;
    font-weight: bold;
    color: white;
}

.stat-label {
    font-size: 12px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 4px;
}
`;

// JS to inject
const modalHTMLJS = `
<!-- MODAL HTML -->
<div class="modal-overlay" id="playerModal">
    <div class="modal-content">
        <button class="modal-close" id="closeModal">&times;</button>
        <img src="" class="modal-img" id="modalImg">
        <div class="modal-name" id="modalName">Player Name</div>
        <div class="modal-role" id="modalRole">Role</div>
        
        <div class="stats-grid">
            <div class="stat-box">
                <div class="stat-value" id="statMatches">0</div>
                <div class="stat-label">Matches</div>
            </div>
            <div class="stat-box">
                <div class="stat-value" id="statRuns">0</div>
                <div class="stat-label">Runs/Wkts</div>
            </div>
            <div class="stat-box">
                <div class="stat-value" id="statAvg">0.00</div>
                <div class="stat-label">Average</div>
            </div>
            <div class="stat-box">
                <div class="stat-value" id="statSR">0.00</div>
                <div class="stat-label">Strike Rate</div>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("playerModal");
    const closeBtn = document.getElementById("closeModal");
    const playerCards = document.querySelectorAll(".player-card");
    
    // Modal elements
    const mImg = document.getElementById("modalImg");
    const mName = document.getElementById("modalName");
    const mRole = document.getElementById("modalRole");
    
    const sMatches = document.getElementById("statMatches");
    const sRuns = document.getElementById("statRuns");
    const sAvg = document.getElementById("statAvg");
    const sSR = document.getElementById("statSR");

    // Close Modal
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
        if(e.target === modal) modal.classList.remove("active");
    });

    playerCards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img").src;
            const name = card.querySelector(".player-name").innerText;
            const role = card.querySelector(".player-role").innerText;
            
            mImg.src = img;
            mName.innerText = name;
            mRole.innerText = role;

            // Generate Random/Dummy Stats based on Role
            sMatches.innerText = Math.floor(Math.random() * 150) + 20;
            
            if (role.toLowerCase().includes("bowler")) {
                sRuns.innerText = Math.floor(Math.random() * 150) + 30; // Wickets
                document.querySelectorAll(".stat-label")[1].innerText = "Wickets";
                sAvg.innerText = (Math.random() * 15 + 18).toFixed(2);
                sSR.innerText = (Math.random() * 10 + 15).toFixed(2);
                document.querySelectorAll(".stat-label")[3].innerText = "Econ Rate";
            } else {
                sRuns.innerText = Math.floor(Math.random() * 4000) + 500; // Runs
                document.querySelectorAll(".stat-label")[1].innerText = "Runs";
                sAvg.innerText = (Math.random() * 20 + 25).toFixed(2);
                sSR.innerText = (Math.random() * 40 + 120).toFixed(2);
                document.querySelectorAll(".stat-label")[3].innerText = "Strike Rate";
            }

            modal.classList.add("active");
        });
    });
});
</script>
</body>
`;

teams.forEach(t => {
    const file = path.join(dir, t);
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        let modified = false;

        // Resize images via CSS replacement
        if (content.includes('width:110px;\r\n    height:110px;') || content.includes('width:110px;\n    height:110px;')) {
            content = content.replace(/width:110px;[\r\n\s]+height:110px;/, 'width:130px;\n    height:130px;\n    object-position: top;');
            modified = true;
        }

        // Add Modal CSS
        if (!content.includes('.modal-overlay {')) {
            content = content.replace('</style>', modalCSS + '\n</style>');
            modified = true;
        }

        // Add Modal DOM and Script
        if (!content.includes('id="playerModal"')) {
            content = content.replace('</body>', modalHTMLJS);
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log("Updated", t);
        } else {
            console.log("Already updated", t);
        }
    }
});
