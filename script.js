// =========================================
// MENU MOBILE
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fermer le menu lors du clic sur un lien
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});

// =========================================
// ANIMATIONS AU SCROLL (Intersection Observer)
// =========================================
const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// =========================================
// SIMULATEUR DE COÛTS & RENTABILITÉ
// =========================================
const slider = document.getElementById('sim-delestage');
const sliderVal = document.getElementById('sim-delestage-val');
const btnSimuler = document.getElementById('btn-simuler');
const simResults = document.getElementById('sim-results');
const selectProfil = document.getElementById('sim-profil');

// Affichage dynamique de la valeur du slider
slider.addEventListener('input', (e) => {
    sliderVal.textContent = e.target.value;
});

// Données basées sur l'étude de marché
const PRIX_DIESEL = 828; // FCFA/litre

const profilsData = {
    'villa-std': {
        coutInstall: 2000000, // FCFA
        consoGroupeParHeure: 0.8 // Litres/heure (Petit groupe 3-5 kVA)
    },
    'villa-conf': {
        coutInstall: 4500000,
        consoGroupeParHeure: 1.5 // Litres/heure (Groupe 8-10 kVA)
    },
    'hotel': {
        coutInstall: 6000000,
        consoGroupeParHeure: 3.5 // Litres/heure (Groupe 15-20 kVA)
    },
    'pro': {
        coutInstall: 8000000,
        consoGroupeParHeure: 5.0 // Litres/heure (Groupe 25+ kVA)
    }
};

function formaterFCFA(nombre) {
    return new Intl.NumberFormat('fr-FR').format(nombre) + ' FCFA';
}

btnSimuler.addEventListener('click', () => {
    const profilId = selectProfil.value;
    const heuresDelestage = parseInt(slider.value);
    
    const data = profilsData[profilId];
    
    // Calculs
    const consoLitreParJour = data.consoGroupeParHeure * heuresDelestage;
    const coutDieselParJour = consoLitreParJour * PRIX_DIESEL;
    const economiesParAn = coutDieselParJour * 365;
    
    const roiAnnees = data.coutInstall / economiesParAn;
    
    // Affichage
    document.getElementById('res-cout').textContent = formaterFCFA(data.coutInstall);
    document.getElementById('res-eco').textContent = formaterFCFA(Math.round(economiesParAn));
    
    let roiText = roiAnnees.toFixed(1) + " ans";
    if(roiAnnees < 1) {
        roiText = "Moins d'un an !";
    }
    document.getElementById('res-roi').textContent = "~ " + roiText;
    
    // Animation d'apparition
    simResults.style.display = 'block';
    simResults.style.opacity = '0';
    setTimeout(() => {
        simResults.style.transition = 'opacity 0.5s ease';
        simResults.style.opacity = '1';
    }, 10);
});

// =========================================
// GESTION DU FORMULAIRE DE CONTACT
// =========================================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulation d'un envoi AJAX
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = "Envoi en cours...";
    btn.disabled = true;
    
    setTimeout(() => {
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        
        formMessage.classList.remove('hidden');
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }, 1500);
});
