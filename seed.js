const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const OU = require('./models/OU');
const Division = require('./models/Division');
const Credential = require('./models/Credential');

// Load environment variables from .env file
dotenv.config();

async function insertSampleData() {
  const dbURI = process.env.MONGO_URI;

  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Optional: Clear existing data
    await User.deleteMany({});
    await OU.deleteMany({});
    await Division.deleteMany({});
    await Credential.deleteMany({});

    const newsManagement = new OU({ name: 'News Management' });
    const softwareReviews = new OU({ name: 'Software Reviews' });
    const hardwareReviews = new OU({ name: 'Hardware Reviews' });
    const opinionPublishing = new OU({ name: 'Opinion Publishing' });

    await newsManagement.save();
    await softwareReviews.save();
    await hardwareReviews.save();
    await opinionPublishing.save();

    const division1 = new Division({ name: 'Finance', ou: newsManagement._id });
    const division2 = new Division({ name: 'IT', ou: softwareReviews._id });

    await division1.save();
    await division2.save();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword1 = await bcrypt.hash('password1', salt);
    const hashedPassword2 = await bcrypt.hash('password2', salt);
    const hashedPassword3 = await bcrypt.hash('password3', salt);

    const adminUser = new User({ username: 'adminuser', password: hashedPassword1, role: 'Admin', division: division1._id });
    const managerUser = new User({ username: 'manageruser', password: hashedPassword2, role: 'Manager', division: division2._id });
    const normalUser = new User({ username: 'normaluser', password: hashedPassword3, role: 'Normal', division: division1._id });

    await adminUser.save();
    await managerUser.save();
    await normalUser.save();

    const credential1 = new Credential({ title: 'Website Login', username: 'admin', password: 'adminpass', division: division1._id });
    const credential2 = new Credential({ title: 'Server Login', username: 'ituser', password: 'itpass', division: division2._id });

    await credential1.save();
    await credential2.save();

    mongoose.disconnect();
    console.log('Sample data inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

insertSampleData();
