const express = require('express');
const router = express.Router();
const Review = require('./models/review'); 

const mongoose = require('mongoose');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

router.get('/:bookId/comments', async (req, res) => {
  const { bookId } = req.params;

  try {
    let comments = await Review.find(
      { bookId },
      { reviewText: 1, rating: 1, userId: 1, _id: 0 }
    ).populate('userId', 'username -_id').lean();

  
    comments = comments.map(comment => {
      const analysis = sentiment.analyze(comment.reviewText);
      return { ...comment, sentimentScore: analysis.score };
    });

    comments.sort((a, b) => b.sentimentScore - a.sentimentScore);
    const finalComments = comments.map(({ sentimentScore, ...rest }) => rest);

    return res.json({ comments: finalComments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

exports = router;
module.exports = router;

