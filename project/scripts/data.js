export async function getRecipes() {
    const url = 'data/recipes.json';
    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Invalid data format');
        return data;
    } catch (err) {
        console.error('Failed to load recipes:', err);
        return []; 
    }
}