// Initialize Consent Mode v2 Defaults immediately
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
});

document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('btn-accept');
    const btnReject = document.getElementById('btn-reject');

    const restrictedRegions = [
        'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 
        'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 
        'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'CH'
    ];

    const consentChoice = localStorage.getItem('cookie-consent');

    if (!consentChoice) {
        checkGeolocation();
    } else if (consentChoice === 'granted') {
        updateConsent('granted');
    }

    async function checkGeolocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            if (restrictedRegions.includes(data.country_code)) {
                banner.classList.remove('d-none');
            } else {
                updateConsent('granted');
            }
        } catch (error) {
            console.warn("Geo-check failed, showing banner for safety.");
            banner.classList.remove('d-none');
        }
    }

    function updateConsent(status) {
        gtag('consent', 'update', {
            'ad_storage': status,
            'ad_user_data': status,
            'ad_personalization': status,
            'analytics_storage': status
        });
        localStorage.setItem('cookie-consent', status);
    }

    btnAccept.addEventListener('click', function () {
        updateConsent('granted');
        banner.classList.add('d-none');
    });

    btnReject.addEventListener('click', function () {
        updateConsent('denied');
        banner.classList.add('d-none');
    });
});