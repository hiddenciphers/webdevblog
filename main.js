document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and display all blog posts
    async function fetchAndDisplayPosts() {
        try {
            // Assuming your blog posts are stored in a 'posts' directory on GitHub
            const response = await fetch('https://api.github.com/repos/hiddenciphers/webdevblog/contents/posts');
            const posts = await response.json();

            console.log('Fetched posts:', posts);  // Log the fetched posts to the console

            // Fetch all posts concurrently
            const postPromises = posts.map(async (post) => {
                const postResponse = await fetch(post.download_url);
                const postContent = await postResponse.text();
            
                // Parse the title from the HTML content
                const titleMatch = postContent.match(/<title>(.*?)<\/title>/);
                const title = titleMatch ? titleMatch[1] : 'Untitled'; // Default to 'Untitled' if no title found
            
                // Return an object with post data
                return {
                    title,
                    html_url: post.html_url,
                    content: postContent,
                };
            });
            
            // Wait for all promises to resolve
            const allPosts = await Promise.all(postPromises);

            // Reverse the posts so that the latest one appears first
            allPosts.reverse().forEach((post) => {
                // Create a new article element for each post
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2><a href="${post.html_url}" target="_blank">${post.title}</a></h2>
                    <div>${post.content}</div>
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

    // Toggle between dark and light modes
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        modeToggle.classList.toggle('dark-mode');
        toggleIcon(); // Call the function to toggle the sun/moon icons
    });

    // Function to toggle between sun and moon icons
    function toggleIcon() {
        const sunIcon = document.getElementById('sun');
        const moonIcon = document.getElementById('moon');
        const slider = document.querySelector('.slider');

        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');
        slider.classList.toggle('dark-mode-slider');
    }

    // Call the function to set the initial icon based on the current mode
    toggleIcon();
});








