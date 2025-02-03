const supabase = require('../config/supabase');

exports.checkUser = async (req, res) => {
  try {
    const { clerkId } = req.body;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', clerkId)
      .single();

    if (error) return res.status(500).json({ error: error.message });

    if (data) {
      res.json({ exists: true, role: data.role });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { clerkId, name, profilePhoto, about, socials, role } = req.body;

    const { data, error } = await supabase
      .from('users')
      .insert([{ clerk_id: clerkId, name, profile_photo: profilePhoto, about, socials, role }]);

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
