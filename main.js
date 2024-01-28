document.addEventListener('DOMContentLoaded', function () {
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

            // Populate the table of contents
            populateTableOfContents(allPosts);
        } catch (error) {
            console.error('Error fetching and displaying blog posts:', error);
        }
    }

    // Function to populate the table of contents
    function populateTableOfContents(posts) {
        const tableOfContents = document.getElementById('table-of-contents');

        posts.forEach((post, index) => {
            const entry = document.createElement('div');
            entry.classList.add('table-of-contents-entry');
            entry.textContent = post.title;

            // Add a click event listener to scroll to the corresponding blog post
            entry.addEventListener('click', () => {
                scrollToBlogPost(index);
            });

            tableOfContents.appendChild(entry);
        });
    }

    // Call the function to fetch and display all blog posts
    fetchAndDisplayPosts();

    // Scroll to the selected blog post when a table of contents entry is clicked
    function scrollToBlogPost(index) {
        const blogPostElements = document.querySelectorAll('main article');
        const targetBlogPost = blogPostElements[index];

        if (targetBlogPost) {
            window.scrollTo({
                top: targetBlogPost.offsetTop,
                behavior: 'smooth',
            });
        }
    }

    // Add scroll event listener to highlight the active entry in the table of contents
    window.addEventListener('scroll', function () {
        const blogPostElements = document.querySelectorAll('main article');
        const tableOfContentsEntries = document.querySelectorAll('.table-of-contents-entry');

        blogPostElements.forEach((post, index) => {
            const rect = post.getBoundingClientRect();

            if (rect.top <= 150 && rect.bottom >= 150) {
                // Highlight the corresponding entry in the table of contents
                tableOfContentsEntries.forEach((entry, entryIndex) => {
                    entry.classList.toggle('active', index === entryIndex);
                });
            }
        });
    });

    // Toggle between dark and light modes
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        modeToggle.classList.toggle('dark-mode');
    });

    // Add scroll event listener to toggle fixed class
    window.addEventListener('scroll', function () {
        if (window.scrollY > header.offsetHeight) {
            document.body.classList.add('fixed-toggle');
        } else {
            document.body.classList.remove('fixed-toggle');
        }
    });
});








