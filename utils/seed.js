const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomReactions, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }


  // Create empty array to hold the thoughts
  const thoughts = [];
  const user = []

  // Loop 4 times -- add thoughts to the thoughts array
  for (let i = 0; i < 4; i++) {
    // Get some random reaction objects using a helper function that we imported from ./data

    const thoughtText = getRandomThought();
    const username = getRandomUser()
    const reactions = getRandomReactions(4);
    const email = username.replace(" ","_")+"@hotmail.com"
    user.push({
        username:username,
        email:email
    })
    thoughts.push({
        thoughtText,
        username,
        reactions,
    });
  }

  // Add thoughts to the collection and await the results
  const thoughtData = await Thought.insertMany(thoughts);
  console.log(thoughtData,user,thoughtData.length,user.length)
  const userData = []
for (let i=0;i<thoughtData.length;i++){
    userData.push({
        username:user[i].username,
        email:user[i].email,
        thoughts:thoughtData[i]._id
    })
}
const userInsertData = await User.insertMany(userData);
  // Add users to the collection and await the results
//   await User.insertOne({
//     username: 'Lisa',
//     email: 'lisa@email.com',
//     thoughts: [...thoughtData.map(({_id}) => _id)],
//   });

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
