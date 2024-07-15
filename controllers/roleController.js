const Role = require('../models/Role');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    // Create a new Role object with the provided name
    const role = new Role({ name });
    await role.save(); // Save the new role to the database
    res.status(201).json(role); // Send the newly created role as JSON response with status 201 (Created)
  } catch (err) {
    console.error('Error creating role:', err.message); // Log any errors that occur
    res.status(500).json({ error: 'Server error' }); // Send a 500 server error response with error message
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    // Fetch all roles from the database
    const roles = await Role.find();
    res.status(200).json(roles); // Send the fetched roles as JSON response with status 200 (OK)
  } catch (err) {
    console.error('Error fetching roles:', err.message); // Log any errors that occur
    res.status(500).json({ error: 'Server error' }); // Send a 500 server error response with error message
  }
};

// Update a role by ID
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    // Find the role by ID and update its name with the provided data, returning the updated document
    const updatedRole = await Role.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' }); // If role not found, return a 404 response
    }
    res.json(updatedRole); // Send the updated role as JSON response
  } catch (err) {
    console.error('Error updating role:', err.message); // Log any errors that occur
    res.status(500).json({ error: 'Server error' }); // Send a 500 server error response with error message
  }
};

// Delete a role by ID
exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the role by ID and delete it from the database
    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' }); // If role not found, return a 404 response
    }
    res.json({ message: 'Role deleted successfully' }); // Send a success message as JSON response
  } catch (err) {
    console.error('Error deleting role:', err.message); // Log any errors that occur
    res.status(500).json({ error: 'Server error' }); // Send a 500 server error response with error message
  }
};

