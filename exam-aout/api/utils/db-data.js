                  const { ObjectId } = require('mongodb');
const dbDataInput = {
  jokes: [
    {
      _id: new ObjectId('6461f476d9a9da9dbeade34e'),
      question: 'Why are modern programming languages so materialistic?',
      answer: 'Because they are object-oriented.',
      category: 'Programming',
    },
    {
      _id: new ObjectId('6461f476d9a9da9dbeade35e'),
      question: "What's the object-oriented way to become wealthy?",
      answer: 'Inheritance.',
      category: 'Programming',
    },
    {
      _id: new ObjectId('6461f476d9a9da9dbeade36e'),
      question: 'What did the fish say when it swam into the wall?',
      answer: 'Dam.',
      category: 'Pun',
    },
    {
      _id: new ObjectId('6461f476d9a9da9dbeade37e'),
      question: 'How much did your chimney cost?',
      answer: 'Nothing, it was on the house.',
      category: 'Pun',
    },
  ],
  scores: [
    {
      username: 'camille',
      date: '2021-01-02T10:17:35.457+00:00',
      score: 10,
      joke: new ObjectId('6461f476d9a9da9dbeade34e'),
    },
    {
      username: 'laurent',
      date: '2022-01-02T13:26:15.457+00:00',
      score: 2,
      joke: new ObjectId('6461f476d9a9da9dbeade35e'),
    },
    {
      username: 'laurent',
      date: '2023-01-02T15:49:27.457+00:00',
      score: 8,
      joke: new ObjectId('6461f476d9a9da9dbeade34e'),
    },
  ],
};

module.exports = { dbDataInput };
