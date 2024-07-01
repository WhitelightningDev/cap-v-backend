const OU = require('../models/OU');

exports.createOU = async (req, res) => {
  const { name } = req.body;
  try {
    let ou = new OU({ name });
    await ou.save();
    res.json(ou);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getOUs = async (req, res) => {
  try {
    const ous = await OU.find();
    res.json(ous);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
