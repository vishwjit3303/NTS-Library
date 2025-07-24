//keyword search
//filter by subject
//filter by type
//filter by author

const Book = require("./books");

// Controller for searching and filtering books
const searchBooks = async (req, res) => {
  try {
    const { keyword, subject, type, author, page = 1, limit = 20 } = req.query;

    let query = { status: "published" };

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    if (subject) {
      query.categories = { $regex: `^${subject}$`, $options: "i" };
    }

    if (type) {
      query.contentType = { $regex: `^${type}$`, $options: "i" };
    }

    if (author) {
      query["authors.name"] = { $regex: `^${author}$`, $options: "i" };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const books = await Book.find(query)
      .sort({ title: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select(
        "isbn title subtitle authors.name categories contentType publishedDate cover.thumbnail"
      ); // Select relevant fields

    // Get total count for pagination
    const total = await Book.countDocuments(query);

    // Return results
    res.status(200).json({
      success: true,
      data: books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { searchBooks };
