const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  isbn: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: String,

  authors: [
    {
      name: String,
      bio: String,
      photo: String,
    },
  ],

  publisher: {
    name: String,
    website: String,
  },

  publishedDate: Date,
  description: String,
  categories: [String],
  tags: [String],

  language: {
    type: String,
    enum: ["en", "es", "fr", "de", "hi", "ja", "zh", "ar"],
  },

  contentType: {
    type: String,
    enum: ["ebook", "audiobook", "magazine", "comic", "textbook"],
    required: true,
  },

  bookMeta: {
    genre: [String],
    title: String,
    authors: [String],
    language: String,
    contentType: String,
    publishedYear: Number,
    keywords: [String],
  },

  format: {
    type: String,
    enum: ["pdf", "epub", "mobi", "mp3", "m4a"],
  },

  pageCount: Number,
  wordCount: Number,
  readingTime: Number,
  maturityRating: {
    type: String,
    enum: ["G", "PG", "PG-13", "R", "Adult"],
  },

  price: {
    amount: Number,
    currency: String,
    salePrice: Number,
    saleEndDate: Date,
  },

  availability: {
    free: Boolean,
    subscription: Boolean,
    purchase: Boolean,
    regions: [String],
  },

  cover: {
    thumbnail: String,
    small: String,
    medium: String,
    large: String,
    extraLarge: String,
  },

  content: {
    fileUrl: String,
    fileSize: Number,
    drm: Boolean,
    downloadable: Boolean,
    streamingUrl: String,
    previewUrl: String,
    samplePages: Number,
  },

  chapters: [
    {
      id: String,
      title: String,
      startPage: Number,
      endPage: Number,
      duration: Number,
      fileUrl: String,
    },
  ],

  toc: [
    {
      level: Number,
      title: String,
      pageNumber: Number,
      anchor: String,
    },
  ],

  stats: {
    views: Number,
    downloads: Number,
    purchases: Number,
    favorites: Number,
    shares: Number,
  },

  status: {
    type: String,
    enum: ["draft", "published", "archived", "deleted"],
    required: true,
  },

  featured: Boolean,
  trending: Boolean,
  newRelease: Boolean,
  bestseller: Boolean,
  editorsPick: Boolean,
  metadata: mongoose.Schema.Types.Mixed,

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  publishedAt: Date,
});

module.exports = mongoose.model("Book", BookSchema);
