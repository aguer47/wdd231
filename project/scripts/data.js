export async function getRecipes() { // asynchronous using async keyword
    const url = 'data/recipes.json';
    try {   // handles data retrieval
        const res = await fetch(url, { cache: 'no-store' }); // use await to pause 2
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();  // response converted into json
        if (!Array.isArray(data)) throw new Error('Invalid data format');
        return data;
    } catch (err) { // handles errors
        console.error('Failed to load recipes:', err);
        return []; 
    }
}