document.addEventListener('DOMContentLoaded', async function () {
    let allPosts; // Declare allPosts outside the try-catch block

    try {
        // Fetch all blog posts from the GitHub repository
        const response = await fetch('https://api.github.com/repos/hiddenciphers/webdevblog/contents/posts');
        const posts = await response.json();

        // Fetch and resolve the content of each post concurrently
        const postPromises = posts.map(async (post) => {
            const postResponse = await fetch(post.download_url);
            const postContent = await postResponse.text();

            // Return an object with post data
            return {
                name: post.name.replace('.html', ''),
                html_url: post.html_url,
                content: postContent,
            };
        });

        // Assign the resolved posts to the allPosts variable
        allPosts = await Promise.all(postPromises);

        // Reverse the posts so that the latest one appears first
        allPosts.reverse().forEach((post) => {
            // Create a new article element for each post
            const article = document.createElement('article');
            article.innerHTML = `
                <h2><a href="${post.html_url}" target="_blank">${post.name}</a></h2>
                <div>${post.content}</div>
            `;

            // Append the article to the main section
            document.querySelector('main').appendChild(article);
        });

        // Add event listener for the search bar
        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('input', function () {
            const searchTerm = searchBar.value.toLowerCase();

            // Clear existing search results
            const main = document.querySelector('main');
            main.innerHTML = '';

            // Filter and display posts that match the search term
            const matchingPosts = allPosts.filter((post) => post.name.toLowerCase().includes(searchTerm));
            matchingPosts.forEach((post) => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2><a href="${post.html_url}" target="_blank">${post.name}</a></h2>
                    <div>${post.content}</div>
                `;
                main.appendChild(article);
            });
        });

    } catch (error) {
        // Handle errors and log them to the console
        console.error('Error fetching and displaying blog posts:', error);

        // Display an error message on the page
        const main = document.querySelector('main');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'An error occurred while fetching blog posts. Please try again later.';
        main.appendChild(errorMessage);
    }
});










