import React from 'react';
import Footer from '../components/Footer';

const tasks = [
  {
    id: 1,
    title: "Read 'Digital Trends 2024'",
    description: 'Finish the latest tech report and answer a quick quiz.',
    coins: 50,
    imageUrl: '/images/21.jpeg',
  },
  {
    id: 2,
    title: "Review 'AI in Healthcare'",
    description: 'Submit a comprehensive review for the new e-book.',
    coins: 40,
    imageUrl: '/images/22.jpeg',
  },
  {
    id: 3,
    title: 'Complete "Blockchain Basics"',
    description: 'Finish the introductory course on blockchain technology.',
    coins: 30,
    imageUrl: '/images/23.jpeg',
  },
  {
    id: 4,
    title: 'Share on Social Media',
    description: 'Share our new content update on your favorite platform.',
    coins: 60,
    imageUrl: '/images/24.jpeg',
  },
  {
    id: 5,
    title: 'Invite a Friend',
    description: 'Refer a friend who signs up and completes their first task.',
    coins: 100,
    imageUrl: '/images/25.jpeg',
  },
  {
    id: 6,
    title: 'Participate in Forum',
    description: 'Engage in meaningful discussion in any of our community forums.',
    coins: 20,
    imageUrl: '/images/26.jpeg',
  },
];

const recentTransactions = [
  { id: 1, text: "Completed 'Daily Quiz'", amount: +15, date: '2024-07-29' },
  { id: 2, text: "Purchased 'Premium Article Access'", amount: -120, date: '2024-07-28' },
  { id: 3, text: "Finished 'Introduction to React'", amount: +80, date: '2024-07-27' },
  { id: 4, text: 'Logged in daily bonus', amount: +10, date: '2024-07-27' },
  { id: 5, text: "Unlocked 'Advanced Algorithms' course", amount: -250, date: '2024-07-26' },
];

const coinLeaderboard = [
  { id: 1, name: 'Alice Smith', coins: 8750 },
  { id: 2, name: 'Bob Johnson', coins: 7920 },
  { id: 3, name: 'Charlie Brown', coins: 7100 },
  { id: 4, name: 'Diana Prince', coins: 6540 },
  { id: 5, name: 'Eve Adams', coins: 5890 },
  { id: 6, name: 'Frank White', coins: 5310 },
];

const CoinCard = ({ title, description, coins, imageUrl }) => (
  <div style={{
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }}>
    <img src={imageUrl} alt={title} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>{description}</p>
      <p style={{ fontWeight: 700, color: '#9333ea', marginTop: 'auto' }}>{coins} Coins</p>
      <button style={{
        marginTop: '0.75rem',
        background: '#f3e8ff',
        color: '#9333ea',
        border: 'none',
        borderRadius: 6,
        padding: '0.5rem',
        fontWeight: 600,
        cursor: 'pointer',
      }}>
        Start Task {'>'}
      </button>
    </div>
  </div>
);

const Coins = () => {
  return (
    <>
      <section style={{
        maxWidth: 1200,
        margin: '2rem auto',
        padding: '0 1rem',
        display: 'flex',
        gap: '2rem',
      }}>
        {/* Main Section */}
        <main style={{ flex: 3 }}>
          {/* Balance Card */}
          <div style={{
            background: 'linear-gradient(90deg, #e0d9ff 0%, #fce7f3 100%)',
            borderRadius: 16,
            padding: '1.5rem 2rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src="/images/Selection.png" alt="Coin stack icon" width="64" height="64" />
              <div>
                <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>Current Coin Balance</h2>
                <h1 style={{ fontSize: '3rem', color: '#5a4bd8', margin: 0, fontWeight: 800 }}>1573</h1>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Last updated: Just now</p>
              </div>
            </div>
            <button style={{
              background: '#5a4bd8',
              color: '#fff',
              borderRadius: 8,
              border: 'none',
              padding: '0.75rem 1.5rem',
              fontWeight: 700,
              boxShadow: '0 4px 8px rgba(90,75,216,0.3)',
              cursor: 'pointer',
            }}>
              Collect Daily Bonus
            </button>
          </div>

          {/* Tasks */}
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Tasks to Earn More Coins</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}>
              {tasks.map(task => <CoinCard key={task.id} {...task} />)}
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Transactions */}
          <section style={{
            background: '#fff',
            borderRadius: 12,
            padding: '1rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Recent Transactions</h3>
            <ul style={{ padding: 0, listStyle: 'none', margin: '1rem 0 0' }}>
              {recentTransactions.map(({ id, text, amount }) => (
                <li key={id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #eee',
                  color: amount > 0 ? '#16a34a' : '#dc2626',
                }}>
                  <span>{text}</span>
                  <strong>{amount > 0 ? `+${amount}` : amount}</strong>
                </li>
              ))}
            </ul>
          </section>

          {/* Leaderboard */}
          <section style={{
            background: '#fff',
            borderRadius: 12,
            padding: '1rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Coin Leaderboard</h3>
            <ol style={{ paddingLeft: '1.25rem', marginTop: '1rem' }}>
              {coinLeaderboard.map(({ id, name, coins }) => (
                <li key={id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span>{id}. {name}</span>
                  <span style={{ color: '#3b82f6', fontWeight: 700 }}>
                    <img
                      src="/images/lucide-Gem-Outlined.svg"
                      alt="Coin"
                      width="16"
                      height="16"
                      style={{ marginRight: 4, verticalAlign: 'middle' }}
                    />
                    {coins}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </section>
      <Footer />
    </>
  );
};

export default Coins;
