// Temporary storage for posts (replace with database later)
let posts = [];

exports.getAllPosts = (req, res) => {
  res.json(posts);
};

exports.createPost = (req, res) => {
  const newPost = {
    id: Date.now().toString(),
    ...req.body,
    date: new Date().toISOString()
  };
  posts.push(newPost);
  res.status(201).json(newPost);
};

exports.getPostById = (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

exports.updatePost = (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Post not found' });
  posts[index] = { ...posts[index], ...req.body };
  res.json(posts[index]);
};

exports.deletePost = (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Post not found' });
  posts.splice(index, 1);
  res.status(204).send();
};