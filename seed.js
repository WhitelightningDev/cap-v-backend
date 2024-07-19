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

    // Create OUs
    const newsManagement = new OU({ name: 'News Management' });
    const softwareReviews = new OU({ name: 'Software Reviews' });
    const hardwareReviews = new OU({ name: 'Hardware Reviews' });
    const opinionPublishing = new OU({ name: 'Opinion Publishing' });

    await newsManagement.save();
    await softwareReviews.save();
    await hardwareReviews.save();
    await opinionPublishing.save();

    // Define division names
    const divisionNames = [
      'Finance', 'IT', 'Writing', 'Development', 'HR', 'Marketing', 'Sales', 'Customer Support',
      'Design', 'Research', 'Quality Assurance', 'Product Management', 'Operations', 'Legal'
    ];

    // Create divisions and credentials
    const divisions = [];
    for (let ou of [newsManagement, softwareReviews, hardwareReviews, opinionPublishing]) {
      for (let name of divisionNames) {
        const division = new Division({ name, ou: ou._id });
        await division.save();
        divisions.push(division);

        // Create 2 credentials for each division
        for (let i = 1; i <= 2; i++) {
          const credential = new Credential({
            title: `${name} Credential ${i}`,
            username: `${name.toLowerCase()}user${i}`,
            password: `${name.toLowerCase()}pass${i}`,
            division: division._id,
            ou: ou._id
          });
          await credential.save();
        }
      }
    }

    // Create users
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

    mongoose.disconnect();
    console.log('Sample data inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

insertSampleData();
