
let posts = [
    { id: 1, title: "Example Post 1" },
    { id: 2, title: "Example Post 2" },
    { id: 3, title: "Example Post 3" }
];

export const fetch_posts = (req, res, next) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && (limit > 0))
        res.status(200).json(posts.slice(0, limit));
    else
        res.status(200).json(posts);
};

export const fetch_post = (req, res, next) => {
    const post_id = parseInt(req.params.post_id);
    const post = posts.find((post) => post.id === post_id);

    if (!post) {
        const e = new Error(`Could not find post with ID of ${post_id}`);
        e.status = 404;
        return next(e);
    }
    else
        res.status(200).json(post);
};

export const new_post = (req, res, next) => {
    const new_post = { id: posts.length + 1, title: req.body.title };
    if (!new_post.title) {
        const e = new Error('Title required');
        e.status = 400;
        return next(e);
    }
    else {
        posts.push(new_post);
        res.status(201).json(posts);
    }
};

export const update_post = (req, res, next) => {
    const post_id = parseInt(req.params.post_id);
    const post = posts.find((post) => post.id === post_id);

    if (!post) {
        const e = new Error(`Could not find post with ID of ${post_id}`);
        e.status = 404;
        return next(e);
    }
    else {
        post.title = req.body.title;
        res.status(200).json(posts);
    }
};

export const delete_post = (req, res, next) => {
    const post_id = parseInt(req.params.post_id);
    const post = posts.find((post) => post.id === post_id);

    if (!post) {
        const e = new Error(`Could not find post with ID of ${post_id}`);
        e.status = 404;
        return next(e);
    }
    else {
        posts.splice(post_id - 1, 1);
        res.status(200).json(posts);
    }
};
