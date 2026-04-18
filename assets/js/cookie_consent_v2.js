window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// 1. Inicijalna podešavanja (Deny po defaultu)
if (!localStorage.getItem('cookie_consent_status')) {
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const modalElement = document.getElementById('cookie-modal');
    if (!modalElement) return;

    const cookieModal = new bootstrap.Modal(modalElement);
    const trigger = document.getElementById('cookie-settings-trigger');
    const checkAnalytics = document.getElementById('check-analytics');
    const checkMarketing = document.getElementById('check-marketing');

    // Buttons
    const btnAcceptAll = document.getElementById('btn-accept-all');
    const btnRejectAll = document.getElementById('btn-reject-all');
    const btnSave = document.getElementById('btn-save-settings');

    // Otvori modal i postavi prekidače na trenutno stanje
    trigger.addEventListener('click', () => {
        const saved = JSON.parse(localStorage.getItem('cookie_consent_status'));
        if (saved) {
            checkAnalytics.checked = saved.analytics_storage === 'granted';
            checkMarketing.checked = saved.ad_storage === 'granted';
        }
        cookieModal.show();
    });

    function applyConsent(analytics, marketing) {
        const consentObj = {
            'analytics_storage': analytics ? 'granted' : 'denied',
            'ad_storage': marketing ? 'granted' : 'denied',
            'ad_user_data': marketing ? 'granted' : 'denied',
            'ad_personalization': marketing ? 'granted' : 'denied'
        };
        
        gtag('consent', 'update', consentObj);
        localStorage.setItem('cookie_consent_status', JSON.stringify(consentObj));
        cookieModal.hide();
    }

    btnAcceptAll.addEventListener('click', () => {
        checkAnalytics.checked = true;
        checkMarketing.checked = true;
        applyConsent(true, true);
    });
    
    btnRejectAll.addEventListener('click', () => {
        checkAnalytics.checked = false;
        checkMarketing.checked = false;
        applyConsent(false, false);
    });

    btnSave.addEventListener('click', () => {
        applyConsent(checkAnalytics.checked, checkMarketing.checked);
    });

    async function checkGeography() {
        const saved = localStorage.getItem('cookie_consent_status');
        if (saved) return;

        try {
            const response = await fetch('https://stat.ripe.net/data/geoloc/data.json?resource=');
            const result = await response.json();
            const country = result.data.locations[0].country;

            // Regulisane zemlje uključujući Srbiju i EU
            const regulated = ['RS', 'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'NO', 'IS', 'LI', 'CH', 'GB'];

            if (regulated.includes(country)) {
                cookieModal.show();
            } else {
                applyConsent(true, true);
            }
        } catch (e) {
            cookieModal.show();
        }
    }

    checkGeography();
});