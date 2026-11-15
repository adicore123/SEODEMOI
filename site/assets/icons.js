// icons.js — מערכת אייקוני קו ידנית, אחידה: viewBox 24, stroke 1.7, פינות מעוגלות.
// שימוש: window.icon('scissors', 24) מחזיר HTML של <svg>. אייקוני fill מסומנים בתוך המחרוזת.
'use strict';
window.ICONS = {
  // ── UI ─────────────────────────────────────────────
  phone: '<path d="M20.4 16.9v2.6a1.9 1.9 0 0 1-2.1 1.9 18.6 18.6 0 0 1-8.1-2.9 18.3 18.3 0 0 1-5.6-5.6A18.6 18.6 0 0 1 1.7 4.6 1.9 1.9 0 0 1 3.6 2.5h2.6a1.9 1.9 0 0 1 1.9 1.6c.1.9.3 1.8.6 2.6a1.9 1.9 0 0 1-.4 2L7.2 9.8a15.2 15.2 0 0 0 5.7 5.7l1.1-1.1a1.9 1.9 0 0 1 2-.4c.8.3 1.7.5 2.6.6a1.9 1.9 0 0 1 1.8 2.3Z"/>',
  whatsapp: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.1a4.9 4.9 0 0 0-4.2 7.4L7.2 16.8l2.4-.6A4.9 4.9 0 1 0 12 7.1Z" fill="currentColor" stroke="none"/><path d="M9.9 9.4c.2-.4.4-.4.6-.4h.4c.2 0 .4 0 .5.4l.5 1.2c.1.2 0 .4-.1.5l-.4.4c-.1.1-.1.2 0 .4.7 1.2 1.6 1.8 2 2 .2.1.3 0 .4-.1l.4-.4c.1-.2.3-.2.5-.1l1.2.6c.2.1.2.2.2.4 0 .5-.4 1-.9 1.1-.3.1-.8.1-1.9-.5a6 6 0 0 1-2.4-2.6c-.1-.2-.1-1 .1-1.3Z" fill="var(--accent-dark,#122b24)" stroke="none"/>',
  pin: '<path d="M12 21.4S5.5 14.9 5.5 10a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11.4-6.5 11.4Z"/><circle cx="12" cy="10" r="2.4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.4V12l3.2 2"/>',
  star: '<path d="M12 3.6l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6-5.1-2.8-5.1 2.8 1.1-5.6L3.8 9.5l5.7-.7L12 3.6Z" fill="currentColor" stroke="none"/>',
  'star-line': '<path d="M12 4.2l2.3 4.7 5.2.7-3.8 3.5 1 5.1-4.7-2.5-4.7 2.5 1-5.1-3.8-3.5 5.2-.7L12 4.2Z"/>',
  'arrow-left': '<path d="M19 12H5.5"/><path d="M11 6.5 5.5 12l5.5 5.5"/>',
  check: '<path d="M4.5 12.5l5 5L19.5 7.5"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.2"/><path d="M15.4 15.4 20.5 20.5"/>',
  spark: '<path d="M12 3.5 13.9 8.6 19 10.5l-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9L12 3.5Z"/><path d="M18.6 15.8l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z"/>',
  chart: '<path d="M3.5 20.5h17"/><path d="M6.5 16.5 10.5 12l3 2.8 4.5-5.3"/><path d="M15.2 9h3v3"/>',
  users: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c.5-3.5 2.7-5 5.5-5s5 1.5 5.5 5"/><circle cx="16.2" cy="9.4" r="2.4"/><path d="M16 14.8c2.5.2 4.2 1.7 4.7 4.7"/>',
  wallet: '<rect x="3.5" y="6.8" width="17" height="12.7" rx="2.5"/><path d="M15.5 13h5.2"/><circle cx="16.2" cy="13.2" r="1" fill="currentColor" stroke="none"/>',
  eye: '<path d="M2.5 12S6 5.6 12 5.6 21.5 12 21.5 12 18 18.4 12 18.4 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
  copy: '<rect x="9" y="9" width="11.5" height="11.5" rx="2"/><path d="M5.5 15H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 3h9A1.5 1.5 0 0 1 15.5 4.5V5"/>',
  send: '<path d="M21 3 3.9 10.2c-.8.3-.8 1.5.1 1.7l5 1.4 1.4 5c.2.9 1.4.9 1.7.1L21 3Z"/><path d="M9.9 13.3 21 3"/>',
  award: '<circle cx="12" cy="9" r="5"/><path d="M8.8 13.1 7.5 21l4.5-2.5L16.5 21l-1.3-7.9"/>',
  chat: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H12l-4.5 4v-4h-1A2.5 2.5 0 0 1 4 13.5Z"/><circle cx="8.3" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="15.7" cy="10" r=".9" fill="currentColor" stroke="none"/>',
  navigation: '<path d="M20.5 3.5 3.6 10.4l6.9 2.6 2.6 6.9L20.5 3.5Z"/>',
  'chev-left': '<path d="M14.5 5.5 8 12l6.5 6.5"/>',
  'chev-down': '<path d="M5.5 9.5 12 16l6.5-6.5"/>',

  // ── שירותים: עיצוב שיער ──────────────────────────
  scissors: '<circle cx="6" cy="7" r="2.2"/><circle cx="6" cy="17" r="2.2"/><path d="M7.9 8.3 20 17"/><path d="M7.9 15.7 20 7"/>',
  razor: '<rect x="9" y="3" width="6" height="9" rx="2"/><path d="M7.5 14.5h9"/><path d="M9.8 14.5v3"/><path d="M12 14.5v3"/><path d="M14.2 14.5v3"/><path d="M8.5 20.5h7"/>',
  kid: '<circle cx="12" cy="7.2" r="3.2"/><path d="M7 20.5v-3a5 5 0 0 1 10 0v3"/><path d="M12 4V2.5"/><path d="M12 2.5c0-1 .8-1.8 1.8-1.8"/>',
  comb: '<path d="M4 8.5h12.5a4 4 0 0 1 0 8H8.5"/><path d="M6 8.5v3.2"/><path d="M9 8.5v3.2"/><path d="M12 8.5v3.2"/><path d="M15 8.5v3.2"/>',
  droplet: '<path d="M12 3.5C9.2 7.8 6.5 10.6 6.5 14a5.5 5.5 0 0 0 11 0c0-3.4-2.7-6.2-5.5-10.5Z"/>',
  leaf: '<path d="M5 19C5 10.2 11 5 20 4c-1 9-6 15-15 15Z"/><path d="M5 19c3-5 7-8.5 11-11"/>',
  hairdryer: '<rect x="3.5" y="7" width="9" height="8" rx="3.5"/><path d="M12.5 9.5 19 7v8l-6.5-2.5"/><path d="M6 15v2.5"/><circle cx="6.5" cy="19.5" r="1.6"/><path d="M8 9.5h.01"/>',
  crown: '<path d="M4 17.5 3 7l5 3.5L12 4l4 6.5L21 7l-1 10.5Z"/><path d="M5 20.5h14"/>',
  bottle: '<rect x="8.5" y="9.5" width="7" height="11" rx="2"/><rect x="10" y="6" width="4" height="3.5" rx="1"/><path d="M12 6V4"/><path d="M17.5 12.5h.01"/>',

  // ── סלולר ומחשבים ─────────────────────────────────
  screen: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 7.5l1.7 2.2-1.3 1.8 1.8 2.2"/>',
  battery: '<rect x="3" y="8.5" width="15" height="7" rx="1.8"/><path d="M20.5 10.8v2.4"/><path d="M11.5 10l-2.4 2.9h2.9l-2.4 2.9"/>',
  plug: '<path d="M9 3v4.5"/><path d="M15 3v4.5"/><rect x="7" y="7.5" width="10" height="6" rx="2"/><path d="M12 13.5v3.5"/><path d="M9 21c0-1.7 1.3-3 3-3s3 1.3 3 3"/>',
  unlock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.7-1.5"/><circle cx="12" cy="15.5" r="1.1" fill="currentColor" stroke="none"/>',
  shield: '<path d="M12 3l7 2.5v5.7c0 4.4-3 7.4-7 8.9-4-1.5-7-4.5-7-8.9V5.5Z"/>',
  'shield-check': '<path d="M12 3l7 2.5v5.7c0 4.4-3 7.4-7 8.9-4-1.5-7-4.5-7-8.9V5.5Z"/><path d="M9 11.8l2.2 2.2 4-4.3"/>',
  laptop: '<rect x="4.5" y="5" width="15" height="10" rx="1.8"/><path d="M2.5 18.5h19"/><path d="M8.5 8.5h5"/>',
  bug: '<ellipse cx="12" cy="13" rx="4.5" ry="5"/><path d="M9.5 8.3 8 5.8"/><path d="M14.5 8.3 16 5.8"/><path d="M7.5 11h-3"/><path d="M7.5 14.5h-3"/><path d="M16.5 11h3"/><path d="M16.5 14.5h3"/><path d="M9.5 17.2 8 19.8"/><path d="M14.5 17.2 16 19.8"/>',
  chip: '<rect x="7" y="7" width="10" height="10" rx="1.6"/><rect x="10.4" y="10.4" width="3.2" height="3.2"/><path d="M9.3 7V4.5"/><path d="M12 7V4.5"/><path d="M14.7 7V4.5"/><path d="M9.3 19.5V17"/><path d="M12 19.5V17"/><path d="M14.7 19.5V17"/><path d="M7 9.3H4.5"/><path d="M7 12H4.5"/><path d="M7 14.7H4.5"/><path d="M19.5 9.3H17"/><path d="M19.5 12H17"/><path d="M19.5 14.7H17"/>',
  hdd: '<ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
  network: '<circle cx="12" cy="5.2" r="2.2"/><circle cx="5" cy="19" r="2.2"/><circle cx="19" cy="19" r="2.2"/><path d="M12 7.4v4"/><path d="M12 11.4 6.1 17.2"/><path d="M12 11.4l5.9 5.8"/>',
  presentation: '<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M12 15v3.5"/><path d="M8.5 21h7"/><path d="M7.5 11.5l2.5-3 2 2 3.5-4"/>',

  // ── קוסמטיקה וציפורניים ───────────────────────────
  face: '<circle cx="12" cy="12" r="8"/><circle cx="9.3" cy="10.8" r=".8" fill="currentColor" stroke="none"/><circle cx="14.7" cy="10.8" r=".8" fill="currentColor" stroke="none"/><path d="M9.3 14.3q2.7 2.2 5.4 0"/><path d="M18.2 4.3l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6Z"/>',
  hourglass: '<path d="M7 3.5h10"/><path d="M7 20.5h10"/><path d="M8 3.5c0 4 3.2 5 4 7 .8-2 4-3 4-7"/><path d="M8 20.5c0-4 3.2-5 4-7 .8 2 4 3 4 7"/>',
  candle: '<path d="M12 2.8c1.7 1.7 2.5 2.9 2.5 4.2A2.5 2.5 0 0 1 12 9.5a2.5 2.5 0 0 1-2.5-2.5c0-1.3.8-2.5 2.5-4.2Z"/><rect x="9" y="11.5" width="6" height="9" rx="1.2"/><path d="M12 9.5v2"/>',
  polish: '<rect x="8.5" y="10.5" width="7" height="10" rx="1.8"/><rect x="10.3" y="7.5" width="3.4" height="3" rx="1"/><path d="M12 7.5V4.5"/>',
  lotus: '<path d="M12 20c-4.5 0-7-2.4-7-5.9 2.8 0 4.6 1.2 5.7 2.8"/><path d="M12 20c4.5 0 7-2.4 7-5.9-2.8 0-4.6 1.2-5.7 2.8"/><path d="M12 20V9.3"/><path d="M12 9.3C10.6 6.9 8.6 6 6.2 6c0 2.7 1.4 4.4 3.4 5.2"/><path d="M12 9.3c1.4-2.4 3.4-3.3 5.8-3.3 0 2.7-1.4 4.4-3.4 5.2"/>',
  pen: '<path d="M4 20l1-4L16.4 4.6a2.1 2.1 0 0 1 3 3L8 19l-4 1Z"/><path d="M14.4 6.6l3 3"/>',
  layers: '<path d="M12 3.5 21 8.5l-9 5-9-5 9-5Z"/><path d="M3.5 12.5 12 17l8.5-4.5"/><path d="M3.5 16.5 12 21l8.5-4.5"/>',

  // ── חיות ──────────────────────────────────────────
  dog: '<path d="M7.6 7.4 5 3.8l3.6 1.6"/><path d="M16.4 7.4 19 3.8l-3.6 1.6"/><path d="M12 5c3 0 5 2.4 5 5.6 0 3-2 5.4-5 5.4s-5-2.4-5-5.4C7 7.4 9 5 12 5Z"/><circle cx="10" cy="10.3" r=".8" fill="currentColor" stroke="none"/><circle cx="14" cy="10.3" r=".8" fill="currentColor" stroke="none"/><path d="M10.4 13.2q1.6 1.4 3.2 0"/>',
  cat: '<path d="M7.5 7.8 5.5 4l3.9 1.7"/><path d="M16.5 7.8 18.5 4l-3.9 1.7"/><path d="M12 6c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5Z"/><circle cx="10" cy="10.8" r=".8" fill="currentColor" stroke="none"/><circle cx="14" cy="10.8" r=".8" fill="currentColor" stroke="none"/><path d="M3 11.5h2.8"/><path d="M3 14.2h2.8"/><path d="M18.2 11.5H21"/><path d="M18.2 14.2H21"/>',
  bath: '<path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z"/><path d="M6 12V7a2 2 0 0 1 4 0"/><path d="M7 19l-1 2.3"/><path d="M17 19l1 2.3"/>',
  tooth: '<path d="M12 3.5c2 0 2.6 1 4.5 1S20 6 20 8.5c0 3-1.5 5-2.2 8-.3 1.3-.8 3-2 3s-1.6-2.3-1.8-4c-.1-1-.9-1-1 0-.2 1.7-.6 4-1.8 4s-1.7-1.7-2-3C6.5 14.5 4 12.5 4 9 4 6.5 5.6 4.5 7.5 4.5S10 3.5 12 3.5Z"/>',

  // ── רכב ───────────────────────────────────────────
  car: '<path d="M5 11l1.5-3A2.5 2.5 0 0 1 8.7 6.5h6.6a2.5 2.5 0 0 1 2.2 1.4L19 11"/><path d="M3.5 16.5v-3a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v3"/><circle cx="7.5" cy="16.5" r="1.9"/><circle cx="16.5" cy="16.5" r="1.9"/><path d="M9.6 16.5h4.8"/><path d="M3.5 16.5h2"/><path d="M18.6 16.5h1.9"/>',
  tire: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v5.3"/><path d="M12 15.2v5.3"/><path d="M3.5 12h5.3"/><path d="M15.2 12h5.3"/>',
  rim: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.6"/><circle cx="12" cy="7.9" r=".9"/><circle cx="15.9" cy="10.7" r=".9"/><circle cx="14.4" cy="15.2" r=".9"/><circle cx="9.6" cy="15.2" r=".9"/><circle cx="8.1" cy="10.7" r=".9"/>',
  gauge: '<path d="M4 16.5a8.2 8.2 0 1 1 16 0"/><path d="M12 16.5l3.8-5.6"/><circle cx="12" cy="16.5" r="1.4"/><path d="M5.5 19.5h13"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
  snowflake: '<path d="M12 3v18"/><path d="M4.2 7.5l15.6 9"/><path d="M19.8 7.5 4.2 16.5"/><path d="M12 6.2 10.2 4.7"/><path d="M12 6.2l1.8-1.5"/><path d="M12 17.8l-1.8 1.5"/><path d="M12 17.8l1.8 1.5"/>',
  pulse: '<path d="M3.5 12H7l2.3-5.2 3.4 9.7 2.5-4.5h5.3"/>',
  wrench: '<path d="M16.7 3.5a5.2 5.2 0 0 0-5 6.6L3.5 18.3a2 2 0 0 0 2.8 2.8l8.2-8.2a5.2 5.2 0 0 0 6.5-5.4L17.5 11l-3.3-3.3 2.5-4.2Z"/>',
  ac: '<rect x="3.5" y="5.5" width="17" height="8" rx="1.8"/><path d="M3.5 9.5h17"/><path d="M6.8 13.5v2"/><path d="M10.2 13.5v2"/><path d="M13.6 13.5v2"/><path d="M17 13.5v2"/><path d="M8 18.5h5.5"/>',
  doc: '<path d="M14 3.5H8A1.5 1.5 0 0 0 6.5 5v14A1.5 1.5 0 0 0 8 20.5h8a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5Z"/><path d="M14 3.5V8h3.5"/><path d="M9.5 12.5h5"/><path d="M9.5 16h5"/>',
  spray: '<rect x="7.5" y="10.5" width="9" height="10" rx="1.8"/><path d="M9.8 10.5V8.5h4.4v2"/><path d="M12 8.5V6.5h2.6"/><circle cx="17.5" cy="4.2" r=".6"/><circle cx="19.8" cy="6.3" r=".6"/><circle cx="18.8" cy="8.8" r=".6"/>',
  wind: '<path d="M3.5 8h9a2.5 2.5 0 1 0-2.4-3.2"/><path d="M3.5 12.5H15a3 3 0 1 1-2.9 3.8"/><path d="M3.5 17h6"/>',
  window: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 9h17"/><path d="M12 9v11.5"/><path d="M7 6.2h.01"/><path d="M9.8 6.2h.01"/>',
  repeat: '<path d="M6.7 6.7A8 8 0 0 1 20 10.7"/><path d="M20 5.5v5.2h-5.2"/><path d="M17.3 17.3A8 8 0 0 1 4 13.3"/><path d="M4 18.5v-5.2h5.2"/>',
  hammer: '<path d="M16.5 3.5 20.5 7.5 17.2 10.8l-4-4Z"/><path d="M13.2 6.8 3.6 16.4a1.85 1.85 0 0 0 2.6 2.6l9.6-9.6"/>',
  roller: '<rect x="3.5" y="5" width="11" height="5" rx="1.2"/><path d="M14.5 7.5H17a1.5 1.5 0 0 1 1.5 1.5v2A1.5 1.5 0 0 1 17 12.5h-2.5"/><path d="M11 12.5V15h2v5.5h-4V15h2Z"/>',
  road: '<path d="M6.5 20.5 8.5 3.5"/><path d="M17.5 20.5 15.5 3.5"/><path d="M12 5.5v2.6"/><path d="M12 10.9v2.6"/><path d="M12 16.3v2.6"/>',
  parking: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M9.8 16.5v-9h2.7a2.7 2.7 0 0 1 0 5.4H9.8"/>',
  bolt: '<path d="M13 2.5 5.5 13.5H11L9.5 21.5 18 10.5h-5.5L13 2.5Z"/>',

  // ── חשמל ──────────────────────────────────────────
  panel: '<rect x="4.5" y="4" width="15" height="16" rx="2"/><path d="M8.5 8h1.8"/><path d="M13.7 8h1.8"/><path d="M8.5 12h1.8"/><path d="M13.7 12h1.8"/><path d="M8.5 16h1.8"/><path d="M13.7 16h1.8"/>',
  bulb: '<path d="M12 2.8a6 6 0 0 0-3.6 10.8c.9.7 1.6 1.7 1.6 2.7h4c0-1 .7-2 1.6-2.7A6 6 0 0 0 12 2.8Z"/><path d="M9.8 19h4.4"/><path d="M10.5 21.5h3"/>',
  thermometer: '<path d="M10 14.2V5a2 2 0 1 1 4 0v9.2a4.2 4.2 0 1 1-4 0Z"/><circle cx="12" cy="17.5" r="1.6" fill="currentColor" stroke="none"/>',
  outlet: '<rect x="5" y="4" width="14" height="16" rx="2.5"/><path d="M9.5 8.8v3"/><path d="M14.5 8.8v3"/><circle cx="12" cy="15.8" r=".9"/>',
  building: '<path d="M4.5 20.5V6.5L12 3l7.5 3.5v14"/><path d="M8.7 9.5h1.8"/><path d="M13.5 9.5h1.8"/><path d="M8.7 13h1.8"/><path d="M13.5 13h1.8"/><path d="M8.7 16.5h1.8"/><path d="M13.5 16.5h1.8"/><path d="M10.7 20.5v-3h2.6v3"/><path d="M3 20.5h18"/>',

  // ── דיג'יי, צילום ─────────────────────────────────
  headphones: '<path d="M4.5 14.5v-2.5a7.5 7.5 0 0 1 15 0v2.5"/><rect x="3.5" y="13.5" width="4" height="6" rx="1.5"/><rect x="16.5" y="13.5" width="4" height="6" rx="1.5"/>',
  speaker: '<rect x="6" y="3.5" width="12" height="17" rx="2"/><circle cx="12" cy="14.8" r="3.2"/><circle cx="12" cy="7.6" r="1.2"/>',
  disco: '<path d="M12 9.5a3.5 3.5 0 0 1 3.5 3.5v1.2h-7V13A3.5 3.5 0 0 1 12 9.5Z"/><path d="M12 9.5v-2"/><path d="M6.5 13 4 15.2"/><path d="M17.5 13 20 15.2"/><path d="M8.2 17 6.8 19.8"/><path d="M15.8 17l1.4 2.8"/><path d="M12 16.2v3"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11.5a6 6 0 0 0 12 0"/><path d="M12 17.5V21"/><path d="M9 21h6"/>',
  music: '<circle cx="6.2" cy="17.8" r="2.4"/><circle cx="16.8" cy="15.6" r="2.4"/><path d="M8.6 17.8V6.8L19.2 4.4v11.2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17"/><path d="M8 2.8V7"/><path d="M16 2.8V7"/><circle cx="12" cy="14.5" r="1.1"/>',
  camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.8"/><path d="M8.5 7l1.5-2.5h4L15.5 7"/><circle cx="17.6" cy="10.4" r=".5" fill="currentColor" stroke="none"/>',
  heart: '<path d="M12 20.5S4 15 4 9.5A4.5 4.5 0 0 1 12 6.6a4.5 4.5 0 0 1 8 2.9c0 5.5-8 11-8 11Z"/>',
  baby: '<circle cx="12" cy="11" r="5.5"/><circle cx="10" cy="10.3" r=".8" fill="currentColor" stroke="none"/><circle cx="14" cy="10.3" r=".8" fill="currentColor" stroke="none"/><path d="M10.2 13q1.8 1.6 3.6 0"/><path d="M12 5.5V4"/><path d="M12 4c0-1 .8-1.8 1.8-1.8"/>',
  id: '<rect x="3.5" y="5" width="17" height="14.5" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M6.3 16.5c.4-1.7 4-1.7 4.4 0"/><path d="M13.5 9.5h4.2"/><path d="M13.5 12.8h4.2"/>',
  album: '<rect x="6.5" y="3.5" width="14" height="14" rx="1.8"/><path d="M4 6.8v11.7A2 2 0 0 0 6 20.5h11.7"/><circle cx="12.5" cy="8.8" r="1.3"/><path d="M8.8 15.5l2.6-2.8 1.9 2 2.3-2.9"/>',
  adjust: '<path d="M5 6.5h14"/><path d="M5 12h14"/><path d="M5 17.5h14"/><circle cx="9.2" cy="6.5" r="1.8" fill="var(--paper,#fff)"/><circle cx="15" cy="12" r="1.8" fill="var(--paper,#fff)"/><circle cx="8" cy="17.5" r="1.8" fill="var(--paper,#fff)"/>',

  // ── גינון, איפור, אינסטלציה ───────────────────────
  grass: '<path d="M12 20.5c-4 0-6.5-2.5-6.5-6.5 3 0 5 1.2 6.5 3.2 1.5-2 3.5-3.2 6.5-3.2 0 4-2.5 6.5-6.5 6.5Z"/><path d="M8 13.5c-1-1.4-1-3 0-4.4"/><path d="M12 12.8c-1-2-1-4 0-6"/><path d="M16 13.5c1-1.4 1-3 0-4.4"/>',
  tree: '<path d="M12 3.5a6.8 6.8 0 0 1 6.8 6.8c0 3.8-3 6.2-6.8 6.2s-6.8-2.4-6.8-6.2A6.8 6.8 0 0 1 12 3.5Z"/><path d="M12 16.5V21"/><path d="M9.5 21h5"/>',
  bag: '<path d="M5.5 8h13l-1 12.5h-11Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M8.8 12v4.5"/><path d="M15.2 12v4.5"/>',
  sprinkle: '<path d="M12 3.5C9.4 7.4 7 9.9 7 13a5 5 0 0 0 10 0c0-3.1-2.4-5.6-5-9.5Z"/><path d="M4.5 20.5c1.2-1.2 2.3-1.2 3.5 0s2.3 1.2 3.5 0 2.3-1.2 3.5 0 2.3 1.2 3.5 0"/>',
  plant: '<path d="M7.5 14.5h9L15.5 20.5h-7Z"/><path d="M12 14.5V11"/><path d="M12 11C9.2 11 7.7 9.2 7.7 6.7 10.2 6.7 12 8.5 12 11Z"/><path d="M12 11c2.8 0 4.3-1.8 4.3-4.3C13.8 6.7 12 8.5 12 11Z"/>',
  houseplant: '<path d="M4.5 20.5V11L12 4.5 19.5 11v9.5"/><path d="M3 20.5h18"/><path d="M12 16.8v-2"/><path d="M12 14.8c-1.8 0-3-1.2-3-3 1.8 0 3 1.2 3 3Z"/><path d="M12 14.8c1.8 0 3-1.2 3-3-1.8 0-3 1.2-3 3Z"/>',
  lipstick: '<path d="M9.5 21v-10h5v10Z"/><path d="M9.5 11V6.4c0-.4.2-.8.5-1l2.4-1.7c.3-.2.6 0 .6.4V11"/><path d="M8 21h8"/>',
  'lashes': '<path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z"/><path d="M5 8.5 3.8 6.8"/><path d="M8.5 6.8 8 4.8"/><path d="M12 6.2V4"/><path d="M15.5 6.8l.6-2"/><path d="M19 8.5l1.3-1.7"/>',
  plunger: '<path d="M12 3.5V11"/><path d="M8 11h8c0 3.9-1.8 7-4 7s-4-3.1-4-7Z"/><path d="M5 20.5h14"/>',
  faucet: '<path d="M4 14.5h4.5V12a3.5 3.5 0 0 1 3.5-3.5h3.5"/><path d="M9.5 8.5v-3h3v3"/><path d="M19.8 13.5c0 1-1.5 3.2-1.5 3.2s-1.5-2.2-1.5-3.2a1.5 1.5 0 0 1 3 0Z"/>',
  flame: '<path d="M12 3.5c1 3 4.5 4.5 4.5 8.5a4.5 4.5 0 0 1-9 0c0-2 1-3.5 2-5 .3 1.2 1 2 2.5 2.5-.5-1.5-.5-3.5 0-6Z"/>',
  'clock-plus': '<circle cx="11" cy="13" r="8"/><path d="M11 9v4l2.8 1.8"/><path d="M18.5 2.8v4"/><path d="M16.5 4.8h4"/>',
};

window.icon = function (name, size, cls) {
  var p = window.ICONS[name];
  if (!p) p = window.ICONS.spark;
  return '<svg class="icn' + (cls ? ' ' + cls : '') + '" width="' + (size || 24) + '" height="' + (size || 24) +
    '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
};

// ממלא כל <span data-icn="name" data-sz="18"></span> באייקון — לשימוש ב-markup סטטי
window.hydrateIcons = function (root) {
  (root || document).querySelectorAll('[data-icn]').forEach(function (el) {
    el.innerHTML = window.icon(el.getAttribute('data-icn'), Number(el.getAttribute('data-sz') || 18));
  });
};
