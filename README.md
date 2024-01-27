# My 2024 Web Development Journey Blog

This repository contains the code for my personal web development blog, where I document my journey into web development in 2024.

## Overview

The structure of the project is as follows:

- **index.html**: The main HTML file that serves as the entry point for the blog. It includes the header, clickable image linked to GitHub, and the main section where blog posts are dynamically fetched and displayed.

- **styles.css**: The stylesheet that provides the styling for the blog, including reset styles, header styling, link styling, and specific styles for the header image.

- **main.js**: The JavaScript file that fetches and dynamically displays the blog posts. It uses the GitHub API to fetch the content of a specific post and appends it to the main section of index.html.

- **img/**: The folder that contains images used in the blog.

- **posts/**: The folder that contains individual blog post files.

## How it Works

1. **Header**: The header of the blog is styled with a dark background and centered text. It includes the main heading and a clickable image linked to my GitHub profile. The image is styled to be centered, half the original size, and linked to my GitHub profile.

2. **Blog Posts**: The main section of the blog is styled to have a maximum width of 800px, centered, and with padding. Each blog post appears as a card with a border, providing a neat and organized display. The JavaScript in main.js fetches the content of a specific blog post from the GitHub repository using the GitHub API. It then dynamically creates an article element with the post content and appends it to the main section.

3. **Footer**: The footer is styled with the same dark background as the header and includes clickable icons linked to my various social media pages, such as Github, LinkedIn, X and Instagram. Additionally, there is a ProtonMail logo that serves as a mailto link, opening a new email to send directly to me.

4. **Styles**: The styles.css file provides styling for the entire blog, including header, footer, links, and images. Each blog post is styled as a card for improved readability. It uses a responsive design to ensure a good user experience on various devices.

## Hosting and Deployment

- **GitHub**: The code is hosted on GitHub at [https://github.com/hiddenciphers/webdevblog](https://github.com/hiddenciphers/webdevblog). GitHub is used to version control the project and host the source code.

- **Vercel**: The blog is deployed using Vercel, a platform for hosting web applications. Vercel automatically deploys the latest changes from the GitHub repository whenever there is a new commit.

Feel free to explore the blog, read through the posts, and follow my web development journey!

Thanks for visiting!
