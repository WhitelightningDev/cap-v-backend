const Role = require('../models/Role');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = new Role({ name });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    console.error('Error creating role:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    console.error('Error fetching roles:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a role by ID
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedRole = await Role.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(updatedRole);
  } catch (err) {
    console.error('Error updating role:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a role by ID
exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    console.error('Error deleting role:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
