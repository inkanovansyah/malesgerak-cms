const axios = require('axios');

async function checkHotNewsData() {
    console.log("1. Checking 'trending-posts' endpoint...");
    try {
        const response = await axios.get('https://api.maknauang.com/trending-posts');
        const data = response.data;
        let count = 0;
        if (Array.isArray(data)) count = data.length;
        else if (data.data) count = data.data.length;
        else if (data.value) count = data.value.length;

        console.log(`   Count: ${count}`);
        if (count > 0) console.log("   First item:", JSON.stringify(data[0] || data.data[0], null, 2));

    } catch (e) {
        console.log("   Error fetching trending-posts:", e.message);
    }

    console.log("\n2. Checking for 'Hot' category or tag...");
    try {
        const catResponse = await axios.get('https://api.maknauang.com/wp-json/wp/v2/categories?search=hot');
        console.log("   Categories found:", catResponse.data.map(c => `${c.name} (${c.id})`));

        const tagResponse = await axios.get('https://api.maknauang.com/wp-json/wp/v2/tags?search=hot');
        console.log("   Tags found:", tagResponse.data.map(t => `${t.name} (${t.id})`));
    } catch (e) {
        console.log("   Error searching categories/tags:", e.message);
    }
}

checkHotNewsData();
