const express = require('express');
const router = express.Router();
const Review = require('./models/review'); 
const userCoinTransaction =require('./models/userCoinTransaction')
const mongoose = require('mongoose');


// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not logged in' });
  }
  next();
};

//post request for add user review and rating for any partivular book with their BookId
router.post('/:bookId/review', requireLogin, async (req, res) => {
  const { rating, reviewText } = req.body;
  const { bookId } = req.params;

  try {
    if (!req.user.isVerified) {
      return res.status(403).json({ error: 'User is not a verified purchaser' });
    }

    // 1. Save the review
    const review = new Review({
      userId: req.user._id,
      bookId,
      rating,
      reviewText,
      isVerifiedPurchase: true,
      totalVotes: 1,
    });
    await review.save();

    // 2. Add coin transaction (20 coins for rating)
    const transaction = new userCoinTransaction({
      user_id: req.user._id,
      activity: 'book_rating',
      coins: 20,
      transaction_type: 'credit',
      description: `Rewarded 20 coins for rating book ${bookId}`,
    });
    await transaction.save();

    return res.status(201).json({
      message: 'Review submitted and 20 coins credited.',
      review,
      transaction
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});






//get the reviews for a specific book by its bookId it will show always either user loggedin or not
router.get('/:bookId/review',async (req, res) => {
  const { bookId } = req.params;
  try {
    const reviews = await Review.find({ bookId });

    if (!reviews.length) {
      return res.json({
        averageRating: 0,
        totalRatings: 0,
        breakdown: { 1:0,2:0,3:0,4:0,5:0},
      });
    }


    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let total = 0;

    for (const review of reviews) {
      breakdown[review.rating]++;
      total += review.rating;
    }

    const averageRating = (total / reviews.length).toFixed(2);
    const totalRatings = reviews.length;

    return res.json({ averageRating, totalRatings, breakdown });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

//get request to get all the comments for a specific book by its 
// for any bookId we open in tab it will show always either user loggedin or not
// it will show the reviewText, rating, and username of the user who made the comment
exports = router;
module.exports = router;