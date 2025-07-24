const mongoose = require("./config/db");
const User = require("./Profile/models/user.schema");
const Bookmark = require("./Profile/models/user_bookmarks");
const ReadingProgress = require("./Profile/models/user_reading_progress");
const UserCoinBalance = require("./Profile/models/userCoinBalance.schema");
const userCoinTransaction = require("./Profile/models/userCoinTransaction.schema");
const UserActivityLog = require("./Profile/models/user_activity_logs");

async function seedDatabase() {
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Bookmark.deleteMany({}),
      ReadingProgress.deleteMany({}),
      UserCoinBalance.deleteMany({}),
      userCoinTransaction.deleteMany({}),
      UserActivityLog.deleteMany({}),
    ]);

    // Create users
    const users = [
      {
        _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
        email: "john.doe@example.com",
        username: "johndoe",
        password_hash: "hashedpassword123",
        first_name: "John",
        last_name: "Doe",
        email_verified: true,
        preferred_language: "en",
        timezone: "UTC",
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
        email: "jane.smith@example.com",
        username: "janesmith",
        password_hash: "hashedpassword456",
        first_name: "Jane",
        last_name: "Smith",
        email_verified: true,
        preferred_language: "en",
        timezone: "UTC",
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await User.insertMany(users);

    // Create reading progress
    const readingProgress = [
      {
        userId: users[0]._id,
        bookId: "resource001",
        currentPosition: { chapter: 1, page: 10, offset: 0 },
        progressPercentage: 10,
        lastReadAt: new Date("2025-06-20T12:00:00Z"),
        readingTimeMinutes: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0]._id,
        bookId: "resource002",
        currentPosition: { chapter: 2, page: 20, offset: 50 },
        progressPercentage: 20,
        lastReadAt: new Date("2025-06-21T15:30:00Z"),
        readingTimeMinutes: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[1]._id,
        bookId: "resource005",
        currentPosition: { chapter: 1, page: 5, offset: 0 },
        progressPercentage: 5,
        lastReadAt: new Date("2025-06-22T09:15:00Z"),
        readingTimeMinutes: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await ReadingProgress.insertMany(readingProgress);

    // Create bookmarks
    const bookmarks = [
      {
        userId: users[0]._id,
        bookId: "resource003",
        position: { chapter: 3, page: 30 },
        note: "Introduction to Programming",
        createdAt: new Date(),
      },
      {
        userId: users[0]._id,
        bookId: "resource004",
        position: { chapter: 4, page: 40 },
        note: "Advanced Mathematics",
        createdAt: new Date(),
      },
      {
        userId: users[1]._id,
        bookId: "resource006",
        position: { chapter: 1, page: 10 },
        note: "Data Structures",
        createdAt: new Date(),
      },
    ];

    await Bookmark.insertMany(bookmarks);

    // Create coin balances
    const coinBalances = [
      {
        user_id: users[0]._id,
        total_coins: 100,
        updated_at: new Date(),
      },
      {
        user_id: users[1]._id,
        total_coins: 50,
        updated_at: new Date(),
      },
    ];

    await UserCoinBalance.insertMany(coinBalances);

    // Create coin transactions
    const coinTransactions = [
      {
        user_id: users[0]._id,
        activity: "user_readings",
        coins: 10,
        transaction_type: "credit",
        description: "Earned 10 coins for reading",
        created_at: new Date("2025-06-20T12:00:00Z"),
      },
      {
        user_id: users[0]._id,
        activity: "purchase",
        coins: 20,
        transaction_type: "debit",
        description: "Spent 20 coins on book purchase",
        created_at: new Date("2025-06-21T15:30:00Z"),
      },
      {
        user_id: users[1]._id,
        activity: "user_login",
        coins: 5,
        transaction_type: "credit",
        description: "Earned 5 coins for daily login",
        created_at: new Date("2025-06-22T09:15:00Z"),
      },
    ];

    await userCoinTransaction.insertMany(coinTransactions);

    // Create activity logs
    const activityLogs = [
      {
        userId: users[0]._id,
        activityType: "rate_book",
        bookId: null,
        details: { action: "User logged in" },
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0",
        createdAt: new Date("2025-06-20T12:00:00Z"),
      },
      {
        userId: users[0]._id,
        activityType: "add_to_favorites",
        bookId: "resource003",
        details: { action: "Added bookmark for resource003" },
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0",
        createdAt: new Date("2025-06-20T12:05:00Z"),
      },
      {
        userId: users[1]._id,
        activityType: "rate_book",
        bookId: null,
        details: { action: "User logged in" },
        ipAddress: "192.168.1.2",
        userAgent: "Mozilla/5.0",
        createdAt: new Date("2025-06-22T09:15:00Z"),
      },
    ];

    await UserActivityLog.insertMany(activityLogs);

    console.log(
      "Dummy data seeded successfully at",
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
