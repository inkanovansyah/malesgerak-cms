const axios = require('axios');

async function checkTrendingData() {
    const baseUrl = 'https://api.maknauang.com';

    console.log("1. Searching for 'Trending' or 'Popular' terms...");
    const terms = ['trending', 'popular', 'hot', 'terpopuler'];
    for (const term of terms) {
        try {
            const catRes = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?search=${term}`);
            if (catRes.data.length > 0) console.log(`   [Category] '${term}':`, catRes.data.map(c => `${c.name} (${c.id})`));

            const tagRes = await axios.get(`${baseUrl}/wp-json/wp/v2/tags?search=${term}`);
            if (tagRes.data.length > 0) console.log(`   [Tag] '${term}':`, tagRes.data.map(t => `${t.name} (${t.id})`));
        } catch (e) {
            // ignore
        }
    }

    console.log("\n2. Checking 'trending-posts' again with headers...");
    try {
        const res = await axios.get(`${baseUrl}/trending-posts`, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const data = res.data;
        let count = 0;
        if (Array.isArray(data)) count = data.length;
        else if (data.data) count = data.data.length;
        else if (data.value) count = data.value.length;
        console.log(`   /trending-posts Count: ${count}`);
    } catch (e) {
        console.log(`   Failed: ${e.response ? e.response.status : e.message}`);
    }

    console.log("\n3. Checking 'popular-posts' plugin endpoint...");
    try {
        const res = await axios.get(`${baseUrl}/wp-json/wordpress-popular-posts/v1/popular-posts`);
        console.log(`   /popular-posts status: ${res.status}`);
    } catch (e) {
        console.log(`   /popular-posts failed: ${e.response ? e.response.status : e.message}`);
    }
}

checkTrendingData();
