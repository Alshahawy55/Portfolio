'use strict';

// All links are relative to keep this site portable, including GitHub project Pages.
const CONTACT_EMAIL = 'alshahawy55@gmail.com';
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  if (!menuToggle || !navigation) return;
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}
if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav')) closeMenu();
  });
}
document.querySelectorAll('[data-year]').forEach(element => { element.textContent = String(new Date().getFullYear()); });

const skills = {
  sql: { label: 'FROM RAW ROWS TO REAL QUESTIONS', title: 'SQL', description: 'Extract, join, and analyze data to understand operational performance and identify patterns.', tags: ['Joins & aggregation', 'CASE WHEN', 'Subqueries', 'Date/time analysis', 'Trino'], note: 'Used for operational reporting, multi-table analysis, and fraud investigations.', code: ['SELECT', 'the useful bits', 'FROM', 'the bigger picture'] },
  excel: { label: 'THE SPREADSHEET, WITH A PLAN', title: 'Microsoft Excel', description: 'Clean messy inputs, reconcile sources, and turn operational data into clear, usable reporting.', tags: ['Power Query', 'Power Pivot', 'PivotTables & charts', 'Advanced formulas', 'Data validation'], note: 'Applied to structured data management, reconciliation, and operational performance analysis.', code: ['CLEAN', 'the messy inputs', 'FIND', 'the useful answers'] },
  sheets: { label: 'MAKE THE REPEATABLE PART REPEAT ITSELF', title: 'Sheets & Apps Script', description: 'Build dashboards and structured reports, reconcile data, and automate recurring updates.', tags: ['Advanced formulas', 'Pivot tables', 'Dashboards', 'Reconciliation', 'Apps Script'], note: 'Recurring data updates and reporting automations developed with AI assistance.', code: ['LESS', 'copy and paste', 'MORE', 'time to investigate'] },
  powerbi: { label: 'GIVE THE NUMBERS SOME CONTEXT', title: 'Power BI', description: 'Bring data sources together and build dashboards that let people explore the story behind performance.', tags: ['Data modeling', 'Multi-page dashboards', 'Drill-down analysis', 'DAX measures'], note: 'Dashboard and DAX development with AI assistance. Public portfolio demos are planned.', code: ['CONNECT', 'the data', 'EXPLORE', 'what it means'] },
  python: { label: 'A CLOSER LOOK AT THE DATA', title: 'Python & pandas', description: 'Explore datasets, clean and transform raw data, and prepare it for analysis.', tags: ['Exploratory analysis', 'Data cleaning', 'Transformation', 'Data manipulation', 'pandas'], note: 'Continuing to develop these skills through study and practice.', code: ['IMPORT', 'a little curiosity', 'EXPLORE', 'the possibilities'] }
};
document.querySelectorAll('[data-skill]').forEach(button => {
  button.addEventListener('click', () => {
    const skill = skills[button.dataset.skill];
    const panel = document.getElementById('skill-panel');
    if (!skill || !panel) return;
    document.querySelectorAll('[data-skill]').forEach(tab => {
      const selected = tab === button;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
    // Only trusted, locally defined skill copy is rendered here.
    panel.innerHTML = `<div class="skill-graphic" aria-hidden="true">${skill.code[0]} <span>${skill.code[1]}</span><br>${skill.code[2]} <span>${skill.code[3]}</span><span class="code-cursor">_</span></div><span class="small-label">${skill.label}</span><h3>${skill.title}</h3><p>${skill.description}</p><div class="tags">${skill.tags.map(tag => `<span>${tag}</span>`).join('')}</div><p class="skill-footnote">${skill.note}</p>`;
  });
});

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* Use the local-file fallback. */ }
  }
  const active = document.activeElement;
  const temporary = document.createElement('textarea');
  temporary.value = text;
  temporary.setAttribute('aria-label', 'Text to copy');
  temporary.style.cssText = 'position:fixed;left:-9999px;top:0;';
  document.body.appendChild(temporary);
  temporary.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
  temporary.remove();
  if (active && active.focus) active.focus();
  return copied;
}
document.querySelector('.copy-email')?.addEventListener('click', async () => {
  const copied = await copyText(CONTACT_EMAIL);
  document.getElementById('copy-status').textContent = copied ? 'Email address copied. One less thing to type.' : `Copy this address: ${CONTACT_EMAIL}`;
});
const form = document.getElementById('contact-form');
if (form) {
  const name = document.getElementById('sender-name');
  const email = document.getElementById('sender-email');
  const message = document.getElementById('message');
  const topic = document.getElementById('message-topic');
  const feedback = document.getElementById('form-feedback');
  const characterCount = document.getElementById('character-count');
  message.addEventListener('input', () => {
    characterCount.textContent = String(message.value.length);
    message.setCustomValidity('');
  });
  name.addEventListener('input', () => name.setCustomValidity(''));
  function compose() {
    return {
      subject: `${topic.value} — ${name.value.trim()}`,
      body: `Hi Ahmed,\n\n${message.value.trim()}\n\nBest,\n${name.value.trim()}\nReply email: ${email.value.trim()}`
    };
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    name.setCustomValidity(name.value.trim() ? '' : 'Please enter your name.');
    message.setCustomValidity(message.value.trim() ? '' : 'Please write a message.');
    if (!form.reportValidity()) return;
    const draft = compose();
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
    feedback.textContent = 'Your draft is ready. Nothing has been sent from this website.';
    document.getElementById('email-fallback').hidden = false;
    window.location.href = mailto;
  });
  document.getElementById('copy-message').addEventListener('click', async () => {
    const draft = compose();
    const copied = await copyText(`To: ${CONTACT_EMAIL}\nSubject: ${draft.subject}\n\n${draft.body}`);
    feedback.textContent = copied ? 'Message copied. Paste it into your email app and send when you’re ready.' : 'Copy is unavailable in this browser. You can select your message above and copy it manually.';
  });
}
