
const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-post-form');

async function show_posts() {
    try {
        const res = await fetch('http://localhost:8000/api/posts');
        if (!res.ok) {
            throw new Error('Failed to fetch posts.');
        }

        const posts = await res.json();
        output.innerHTML = '';

        posts.forEach((post) => {
            const post_element = document.createElement('div');
            post_element.textContent = post.title;
            output.appendChild(post_element);
        });
    } catch (error) {
        console.error('Error while fetching posts.');
    }
}

async function add_post(event) {
    event.preventDefault();
    const form_data = new FormData(this);
    const title = form_data.get('title');

    try {
        const res = await fetch('http://localhost:8000/api/posts',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            }
        );
        if (!res.ok) {
            throw new Error('Failed to add post.');
        }

        const new_post = await res.json();
        const post_element = document.createElement('div');
        post_element.textContent = new_post.title;
        output.appendChild(post_element);
        show_posts();
    } catch (error) {
        console.error('Error while adding post.');
    }
}

button.addEventListener('click', show_posts);
form.addEventListener('submit', add_post);