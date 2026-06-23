const XML_URL = 'https://lingering-breeze-62e0.moramoboljecom.workers.dev';
let currentMode = 'ID';
window.allFlights = [];

async function fetchTimetable() {
    const now = new Date();
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    document.getElementById('snap-date').innerText = 
        `${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()} @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    try {
        const response = await fetch(XML_URL);
        const xmlText = await response.text();
        const xml = new DOMParser().parseFromString(xmlText, "text/xml");
        const letovi = Array.from(xml.getElementsByTagName('LET'));

        window.allFlights = letovi.filter(l => {
            const br = (l.getElementsByTagName('BROJ_LETA')[0]?.textContent || '').trim();
            const vl = (l.getElementsByTagName('VEZAN_LET')[0]?.textContent || '').trim();
            return vl === '' || br === vl;
        }).map(l => ({
            // Uzimamo TIP letova (ID, IA, DD, DA)
            tip: l.getElementsByTagName('TIP')[0]?.textContent,
            dest: l.getElementsByTagName('DESTINACIJA')[0]?.textContent,
            vreme: l.getElementsByTagName('VREME')[0]?.textContent,
            br: l.getElementsByTagName('BROJ_LETA')[0]?.textContent,
            od: l.getElementsByTagName('OD')[0]?.textContent,
            do: l.getElementsByTagName('DO')[0]?.textContent,
            dan: l.getElementsByTagName('FREKVENCIJA')[0]?.textContent,
            note: l.getElementsByTagName('PREKID_OD')[0]?.textContent ? 
                  `(excl. fm ${l.getElementsByTagName('PREKID_OD')[0].textContent} till ${l.getElementsByTagName('PREKID_DO')[0].textContent})` : ''
        }));
        
        updateUI();
    } catch (e) {
        document.getElementById('timetable-container').innerHTML = '<div class="loader">Unable to load data.</div>';
    }
}

function parseOAGDate(dateStr) {
    const months = {
        "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
        "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
    };
    const parts = dateStr.split('-'); // ["15", "Apr", "26"]
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]];
    const year = 2000 + parseInt(parts[2], 10); // Converts "26" to 2026
    
    return new Date(year, month, day);
}

function toggleMode() {
    currentMode = (currentMode === 'ID') ? 'IA' : 'ID';
    updateUI();
}

function updateUI() {
    const title = document.getElementById('page-title');
    const navBtn = document.getElementById('nav-toggle');
    title.innerText = (currentMode === 'ID') ? 'DEPARTURES' : 'ARRIVALS';
    navBtn.innerText = (currentMode === 'ID') ? 'ARRIVALS' : 'DEPARTURES';
    render();
}

function render() {
    const container = document.getElementById('timetable-container');
    container.innerHTML = '';
    
    // 1. Get today's date and reset time to midnight for a fair comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 2. Filter flights by Mode (ID/IA) AND check if the flight is still active
    const modeFlights = window.allFlights.filter(f => {
        // First, check the mode (ID/IA)
        let matchesMode = false;
        if (currentMode === 'ID') matchesMode = (f.tip === 'ID' || f.tip === 'DD');
        if (currentMode === 'IA') matchesMode = (f.tip === 'IA' || f.tip === 'DA');
        
        if (!matchesMode) return false;

        // Second, check the "TO" date (f.do)
        // If the end date is earlier than today, we exclude it
        const flightEndDate = parseOAGDate(f.do);
        return flightEndDate >= today; 
    });

    const groups = {};
    
    modeFlights.forEach(f => {
        if(!groups[f.dest]) groups[f.dest] = [];
        groups[f.dest].push(f);
    });

    Object.keys(groups).sort().forEach(dest => {
        const div = document.createElement('div');
        div.className = 'dest-row';
        
        const rows = groups[dest].sort((a,b) => a.vreme.localeCompare(b.vreme)).map(f => {
    // Only show the remarks cell if there is actually a note
    const remarkCell = f.note ? `<td class="col-note" data-label="Remarks">${f.note}</td>` : '';
    
    return `
        <tr>
            <td class="col-days" data-label="Days">${formatDays(f.dan)}</td>
            <td class="col-time" data-label="Time">${f.vreme}</td>
            <td class="col-flight" data-label="Flight">${f.br}</td>
            <td class="col-val" data-label="From">${f.od}</td>
            <td class="col-val" data-label="Till">${f.do}</td>
            ${remarkCell}
        </tr>
    `;
}).join('');

        // Only append the destination block if there are flights left after filtering
        if (rows.length > 0) {
            div.innerHTML = `
                <div class="dest-name">${dest}</div>
                <table class="flights-table">
                    <thead>
                        <tr>
                            <th class="col-days">DAYS</th>
                            <th class="col-time">TIME</th>
                            <th class="col-flight">FLIGHT</th>
                            <th class="col-val">FROM</th>
                            <th class="col-val">TILL</th>
                            <th class="col-note">REMARKS</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>`;
            container.appendChild(div);
        }
    });
}

function formatDays(d) {
    let s = "";
    for(let i=1; i<=7; i++) {
        if (d.includes(i)) {
            s += i; 
        } else {
            // remove bold
            s += '<span style="font-weight: normal; opacity: 0.7;">-</span>'; 
        }
    }
    return s;
}

fetchTimetable();