import { getRecipes } from './data.js';
import { openModal } from './modal.js';

const state = {
    all: [],
    filtered: [],
    favorites: new Set(JSON.parse(localStorage.getItem('favorites') || '[]'))
};

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify([...state.favorites]));
}

function imgTag(src, alt) {
    return `<img src="${src}" alt="${alt}" width="800" height="533" loading="lazy">`;
}

function recipeCard(r) {
    
    return `
  <article class="card" role="listitem">
    ${imgTag(r.image, r.alt)}
    <div class="content">
      <h3>${r.name}</h3>
      <p>
        <span class="badge">${r.cuisine}</span>
        <span class="badge">${r.difficulty}</span>
        <span class="badge">${r.time} min</span>
      </p>
      <div>
        <button class="button secondary" data-action="details" data-id="${r.id}">Details</button>
        <button class="button" data-action="favorite" data-id="${r.id}">
          ${state.favorites.has(r.id) ? '★ Favorited' : '☆ Favorite'}
        </button>
      </div>
    </div>
  </article>`;
}

function applyFilters() {
    const q = document.getElementById('search')?.value.trim().toLowerCase() || '';
    const cuisine = document.getElementById('cuisine')?.value || '';
    const difficulty = document.getElementById('difficulty')?.value || '';
    const maxTime = parseInt(document.getElementById('time')?.value || '0', 10);

    state.filtered = state.all.filter(r => {
        const matchesQ = !q || r.name.toLowerCase().includes(q) || r.ingredients.some(i => i.toLowerCase().includes(q));
        const matchesCuisine = !cuisine || r.cuisine === cuisine;
        const matchesDifficulty = !difficulty || r.difficulty === difficulty;
        const matchesTime = !maxTime || r.time <= maxTime;
        return matchesQ && matchesCuisine && matchesDifficulty && matchesTime;
    });

    render();
}

function render() {
    const grid = document.getElementById('recipesGrid');
    if (!grid) return;
    grid.innerHTML = state.filtered.map(recipeCard).join('');
}

function showDetails(id) {
    const r = state.all.find(x => x.id === id);
    if (!r) return;
    const body = document.getElementById('modalBody');
    const title = document.getElementById('modalTitle');
    title.textContent = r.name;
    body.innerHTML = `
    <figure>
      ${imgTag(r.image, r.alt)}
      <figcaption class="sr-only">${r.name}</figcaption>
    </figure>
    <p><strong>Cuisine:</strong> ${r.cuisine}</p>
    <p><strong>Difficulty:</strong> ${r.difficulty}</p>
    <p><strong>Time:</strong> ${r.time} minutes</p>
    <p>${r.description}</p>
    <p><strong>Ingredients:</strong> ${r.ingredients.join(', ')}</p>
  `;
    openModal('modalBackdrop', 'modalClose');
}

function onGridClick(e) {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    const action = btn.dataset.action;
    if (action === 'details') showDetails(id);
    if (action === 'favorite') {
        if (state.favorites.has(id)) state.favorites.delete(id);
        else state.favorites.add(id);
        saveFavorites();
        applyFilters(); 
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    state.all = await getRecipes();

    if (state.all.length < 15) {
        console.warn('Expected at least 15 recipes for the rubric.');
    }

    document.getElementById('recipesGrid')?.addEventListener('click', onGridClick);
    ['search', 'cuisine', 'difficulty', 'time'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', applyFilters);
        document.getElementById(id)?.addEventListener('change', applyFilters);
    });

    applyFilters();
});