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

    const divisionNames = [
      'Finance', 'IT', 'Writing', 'Development', 'HR', 'Marketing', 'Sales', 'Customer Support',
      'Design', 'Research', 'Quality Assurance', 'Product Management', 'Operations', 'Legal'
    ];

    const divisions = [];
    for (let i = 0; i < divisionNames.length; i++) {
      divisions.push(new Division({ name: divisionNames[i], ou: newsManagement._id }));
      divisions.push(new Division({ name: divisionNames[i], ou: softwareReviews._id }));
      divisions.push(new Division({ name: divisionNames[i], ou: hardwareReviews._id }));
      divisions.push(new Division({ name: divisionNames[i], ou: opinionPublishing._id }));
    }

    for (const division of divisions) {
      await division.save();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword1 = await bcrypt.hash('password1', salt);
    const hashedPassword2 = await bcrypt.hash('password2', salt);
    const hashedPassword3 = await bcrypt.hash('password3', salt);

    const adminUser = new User({ username: 'adminuser', password: hashedPassword1, role: 'Admin', division: divisions[0]._id });
    const managerUser = new User({ username: 'manageruser', password: hashedPassword2, role: 'Manager', division: divisions[1]._id });
    const normalUser = new User({ username: 'normaluser', password: hashedPassword3, role: 'Normal', division: divisions[2]._id });

    await adminUser.save();
    await managerUser.save();
    await normalUser.save();

    const credential1 = new Credential({
      title: 'Website Login',
      username: 'admin',
      password: 'adminpass',
      division: divisions[0]._id,
      ou: newsManagement._id // Add the ou 
    });
    const credential2 = new Credential({
      title: 'Server Login',
      username: 'ituser',
      password: 'itpass',
      division: divisions[1]._id,
      ou: softwareReviews._id // Add the ou
    });

    await credential1.save();
    await credential2.save();

    mongoose.disconnect();
    console.log('Sample data inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

insertSampleData();
