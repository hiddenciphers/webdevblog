document.addEventListener('DOMContentLoaded', function () {
    // Select the header element
    const header = document.querySelector('header');

    // Function to fetch and display all blog posts
    async function fetchAndDisplayPosts() {
        try {
            // Blog posts are stored in a 'posts' directory on GitHub
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
        // Toggle dark mode class
        document.body.classList.toggle('dark-mode');
        modeToggle.classList.toggle('dark-mode');

        // Save the current mode to local storage
        if(document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check local storage for dark mode preference on page load
    if(localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        modeToggle.classList.add('dark-mode');
    }

    // Add scroll event listener to toggle fixed class
    window.addEventListener('scroll', function () {
        if (window.scrollY > header.offsetHeight) {
            document.body.classList.add('fixed-toggle');
        } else {
            document.body.classList.remove('fixed-toggle');
        }
    });
});
 









