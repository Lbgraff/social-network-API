const users = [
    'Amy',
    'Erin',
    'Becca',
    'Skippy',
    'Schwieterman',
    'Graff',
    'Doorn',
    'Corral',
  ];
  
  const thoughts = [
    'I love JavaScript',
    'Coding is fun',
    'Algorithms are great',
    'I love this social network'
  ];

  const reactions = [
    'Cool thought',
    'Well said',
    'I agree',
    'That is amazing'
  ];
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random full name
  const getRandomUser = () =>
    `${getRandomArrItem(users)} ${getRandomArrItem(users)}`;

  const getRandomThought = () =>
    `${getRandomArrItem(thoughts)}`;
  
  // Function to generate random reactions that we can add to thought object.
  const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(reactions),
        username: getRandomArrItem(users)
        // score: Math.floor(Math.random() * (99 - 4 + 1) + 4),
      });
    }
    console.log("data for thoughts (reaction)schema",results)
    return results;
  };
  
  // Export the functions for use in seed.js
  module.exports = { getRandomUser, getRandomReactions, getRandomThought };
  