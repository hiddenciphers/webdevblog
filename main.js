document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and display blog posts
    function fetchAndDisplayPosts() {
        // Assuming your blog posts are stored in a 'posts' directory on GitHub
        fetch('https://api.github.com/repos/hiddenciphers/webdevblog/contents/posts/post1.html')
            .then(response => response.json())
            .then(post => {
                // Extract post content from the GitHub API response
                const postContent = atob(post.content);

                // Create a new article element for the post
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2><a href="${post.html_url}" target="_blank">${post.name.replace('.html', '')}</a></h2>
                    <div>${postContent}</div>
                `;

                // Append the article to the main section
                document.querySelector('main').appendChild(article);
            })
            .catch(error => console.error('Error fetching blog posts:', error));
    }

    // Call the function to fetch and display blog posts
    fetchAndDisplayPosts();
});

