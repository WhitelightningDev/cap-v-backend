const Division = require('../models/Division');

exports.createDivision = async (req, res) => {
  const { name, ou } = req.body;
  try {
    let division = new Division({ name, ou });
    await division.save();
    res.json(division);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getDivisions = async (req, res) => {
  try {
    const divisions = await Division.find().populate('ou');
    res.json(divisions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
