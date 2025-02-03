const supabase = require('../config/supabase');

exports.getAllPosts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      image: req.body.image,
      date: req.body.date,
      read_time: req.body.readTime,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('posts')
      .insert([newPost])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createUserProfile = async (req, res) => {
  try {
    const userProfile = {
      user_id: req.body.userId,
      name: req.body.name,
      profile_photo: req.body.profilePhoto,
      about: req.body.about,
      socials: req.body.socials,
      role: req.body.role,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('user_profiles')
      .insert([userProfile])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: error.message });
  }
};