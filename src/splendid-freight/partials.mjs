// Shared snippets for the Splendid Freight concept page.
const logo = `<svg viewBox="0 0 40 40" aria-hidden="true"><defs><mask id="sfm"><rect width="40" height="40" fill="#fff"/><path d="M14 1.5C8 7.5 8.6 14.2 16.4 18.6C24.2 23 28.4 28.6 24.6 38.6" fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="round"/></mask></defs><circle cx="20" cy="20" r="19" fill="#1EF7C4" mask="url(#sfm)"/></svg>`;

const items = [
  ["plane", "Air Freight"], ["ship", "Ocean Freight"], ["train-front", "Rail Freight"],
  ["truck", "Road Transport"], ["package-search", "Online Tracking"], ["calendar-clock", "Pickup Scheduling"],
  ["scale", "Cargo Weight"], ["boxes", "Supply Chain Solutions"], ["globe-2", "International Shipping"],
];

export default {
  logo,
  marquee: ({ icon }) => {
    const row = items.map(([i, t]) => `<span>${icon(i)}${t}</span>`).join("");
    return row + row.replace(/<span>/g, '<span aria-hidden="true">');
  },
};
