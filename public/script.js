// Theme toggle: default to system preference, no persistence needed for a static export
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const knob = document.getElementById('knob');
function setTheme(t){
  root.setAttribute('data-theme', t);
  knob.textContent = t === 'light' ? '☀' : '☾';
}
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
setTheme(prefersLight ? 'light' : 'dark');
toggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Language switch (ID / EN) ----------
const translations = {
  en: {
    nav_about: "about",
    nav_skills: "skills",
    nav_projects: "projects",
    nav_certificates: "certificates",
    nav_contact: "contact",
    hero_eyebrow: "student · smkn 1 gempol · tkj",
    hero_role: "Student from Indonesia, currently in grade 11 at <strong>SMKN 1 Gempol</strong>, majoring in Computer &amp; Network Engineering (TKJ).",
    btn_view_project: "View Project →",
    btn_contact_me: "Contact Me",
    about_num: "01 / profile",
    about_title: "About Me",
    about_comment: "-- who is Azriel?",
    about_text: "I'm Azriel Aurizal Ednisia, an 11th-grade student majoring in Computer and Network Engineering (TKJ) at SMKN 1 Gempol, Indonesia. I'm still early in my journey, but I'm committed to sharpening my skills one project at a time.",
    chip_grade: "🎓 Grade 11 SMK",
    chip_location: "📍 Indonesia",
    chip_major: "💻 Computer & Network Engineering",
    skills_num: "02 / stack",
    skills_title: "Skills",
    skills_col_skill: "skill",
    skills_col_prof: "proficiency",
    skills_col_strength: "strength",
    skill_level_building: "building",
    projects_num: "03 / work",
    projects_title: "Projects",
    project_status: "deployed on vercel",
    project_desc: "A live project deployed on Vercel — part of my ongoing practice turning ideas into working web applications.",
    certs_num: "04 / records",
    certs_title: "Certificates",
    cert_placeholder: "+ add certificate photo",
    contact_num: "05 / reach me",
    contact_title: "Contact Me",
    contact_label_email: "Email",
    contact_label_instagram: "Instagram",
    contact_label_github: "GitHub",
    contact_label_whatsapp: "WhatsApp",
    footer_text: "built with care.",
    row_count: (n) => `${n} rows returned`
  },
  id: {
    nav_about: "tentang",
    nav_skills: "keahlian",
    nav_projects: "proyek",
    nav_certificates: "sertifikat",
    nav_contact: "kontak",
    hero_eyebrow: "siswa · smkn 1 gempol · tkj",
    hero_role: "Siswa asal Indonesia, saat ini kelas 11 di <strong>SMKN 1 Gempol</strong>, jurusan Teknik Komputer &amp; Jaringan (TKJ).",
    btn_view_project: "Lihat Proyek →",
    btn_contact_me: "Hubungi Saya",
    about_num: "01 / profil",
    about_title: "Tentang Saya",
    about_comment: "-- siapa itu Azriel?",
    about_text: "Saya Azriel Aurizal Ednisia, siswa kelas 11 jurusan Teknik Komputer dan Jaringan (TKJ) di SMKN 1 Gempol, Indonesia. Saya masih di awal perjalanan, tapi berkomitmen mengasah kemampuan saya satu proyek demi satu proyek.",
    chip_grade: "🎓 Kelas 11 SMK",
    chip_location: "📍 Indonesia",
    chip_major: "💻 Teknik Komputer & Jaringan",
    skills_num: "02 / kemampuan",
    skills_title: "Keahlian",
    skills_col_skill: "keahlian",
    skills_col_prof: "tingkat",
    skills_col_strength: "kekuatan",
    skill_level_building: "sedang berkembang",
    projects_num: "03 / karya",
    projects_title: "Proyek",
    project_status: "sudah tayang di vercel",
    project_desc: "Proyek yang sudah tayang di Vercel — bagian dari latihan saya mengubah ide menjadi aplikasi web yang berjalan.",
    certs_num: "04 / arsip",
    certs_title: "Sertifikat",
    cert_placeholder: "+ tambahkan foto sertifikat",
    contact_num: "05 / hubungi",
    contact_title: "Hubungi Saya",
    contact_label_email: "Email",
    contact_label_instagram: "Instagram",
    contact_label_github: "GitHub",
    contact_label_whatsapp: "WhatsApp",
    footer_text: "dibuat dengan sepenuh hati.",
    row_count: (n) => `${n} baris ditemukan`
  }
};

const i18nEls = document.querySelectorAll('[data-i18n]');
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'id';

function applyLang(lang){
  const dict = translations[lang];
  if(!dict) return;
  currentLang = lang;
  i18nEls.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = dict[key];
    if(typeof val !== 'string') return;
    if(val.includes('<strong>')){
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
  langButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === lang));
  root.setAttribute('lang', lang);
  const rc = document.getElementById('rowCount');
  if(rc && rc.dataset.filled === 'true'){
    rc.textContent = dict.row_count(4);
  }
}

langButtons.forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
});

const browserLang = (navigator.language || 'id').toLowerCase().startsWith('id') ? 'id' : 'en';
applyLang(browserLang);

// Typing animation for the hero query
const query = "SELECT * FROM student WHERE school = 'SMKN 1 Gempol';";
const typedEl = document.getElementById('typedQuery');
const resultTable = document.getElementById('resultTable');
const rowCount = document.getElementById('rowCount');
const cursor = document.getElementById('typeCursor');

function highlighted(str){
  return str
    .replace(/SELECT|FROM|WHERE/g, m => `<span class="kw">${m}</span>`)
    .replace(/'([^']*)'/g, `<span class="str">'$1'</span>`);
}

let i = 0;
function typeStep(){
  if(i <= query.length){
    typedEl.innerHTML = highlighted(query.slice(0, i));
    i++;
    setTimeout(typeStep, 22);
  } else {
    cursor.style.display = 'none';
    setTimeout(() => {
      resultTable.classList.add('show');
      rowCount.textContent = translations[currentLang].row_count(4);
      rowCount.dataset.filled = 'true';
    }, 200);
  }
}
setTimeout(typeStep, 500);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.15});
revealEls.forEach(el => io.observe(el));

// ---------- Certificate lightbox ----------
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalClose = document.getElementById('certModalClose');
const certSlots = document.querySelectorAll('.cert-slot');

function openCertModal(src, alt){
  certModalImg.src = src;
  certModalImg.alt = alt || 'Sertifikat';
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCertModal(){
  certModal.classList.remove('open');
  document.body.style.overflow = '';
}

certSlots.forEach(slot => {
  const img = slot.querySelector('.cert-img');
  const src = img.getAttribute('src');
  if(!src) return; // slot kosong, tidak ada foto, tidak bisa diklik
  slot.classList.add('has-photo');
  slot.addEventListener('click', () => {
    openCertModal(img.getAttribute('src'), img.getAttribute('alt'));
  });
});

certModalClose.addEventListener('click', closeCertModal);
certModal.addEventListener('click', (e) => {
  if(e.target === certModal) closeCertModal();
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeCertModal();
});

// Skill bar fill on view
const bars = document.querySelectorAll('.bar-fill');
const barIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      barIo.unobserve(e.target);
    }
  });
}, {threshold:0.3});
bars.forEach(b => barIo.observe(b));
