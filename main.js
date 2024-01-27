document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and display all blog posts
    async function fetchAndDisplayPosts() {
        try {
            // Assuming your blog posts are stored in a 'posts' directory on GitHub
            const response = await fetch('https://api.github.com/repos/hiddenciphers/webdevblog/contents/posts');
            const posts = await response.json();

            console.log('Fetched posts:', posts);  // Log the fetched posts to the console

            // Reverse the posts so that the latest one appears first
            posts.reverse().forEach(async (post) => {
                // Fetch the raw content of the post
                const postResponse = await fetch(post.download_url);
                const postContent = await postResponse.text();

                // Create a new article element for each post
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2><a href="${post.html_url}" target="_blank">${post.name.replace('.html', '')}</a></h2>
                    <div>${postContent}</div>
                `;

                // Append the article to the main section
                document.querySelector('main').appendChild(article);
            });
        } catch (error) {
            console.error('Error fetching and displaying blog posts:', error);
        }
    }

    // Call the function to fetch and display all blog posts
    fetchAndDisplayPosts();
});






