
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log("Error:", error));
  }, []);

  const addToCart = (book) => {
    setCart((prev) => [...prev, book]);
  };

  const categories = [
    "All",
    ...new Set(books.map((book) => book.category))
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  const total = cart.reduce(
    (sum, book) => sum + book.price,
    0
  );

  return (
    <div className="store">

      <nav className="navbar">
        <h2>BOOK<span>HIVE.</span></h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#books">Shop</a>
          <a href="#about">About</a>
        </div>

        <div className="cart">
          🛒 Cart ({cart.length})
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">WELCOME TO BOOKHIVE</p>

          <h1>
            Discover Your Next
            <br />
            <span>Favourite Story.</span>
          </h1>

          <p>
            Explore a world of imagination, knowledge
            and inspiration. Find your next great read.
          </p>

          <a href="#books" className="shop-btn">
            Explore Books →
          </a>
        </div>

        <div className="hero-art">
          <div className="hero-book">
            <span>THE ART OF</span>
            <strong>READING</strong>
            <small>Every book opens a new world.</small>
          </div>
        </div>
      </section>

      <section className="features">
        <div>📚 <span>Wide Book Collection</span></div>
        <div>🚚 <span>Easy Ordering</span></div>
        <div>💳 <span>Simple Checkout</span></div>
      </section>

      <section className="books-section" id="books">
        <div className="section-heading">
          <div>
            <p className="tagline">OUR COLLECTION</p>
            <h2>Explore Our Books</h2>
          </div>

          <input
            type="text"
            placeholder="Search books or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="book-grid">
          {filteredBooks.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="book-cover">
                <span>BOOKHIVE COLLECTION</span>
                <h3>{book.title}</h3>
                <small>{book.author}</small>
              </div>

              <div className="book-info">
                <p className="book-category">{book.category}</p>
                <h3>{book.title}</h3>
                <p>By {book.author}</p>

                <div className="book-bottom">
                  <strong>₹{book.price}</strong>

                  <button
                    onClick={() => addToCart(book)}
                    disabled={book.availableCopies < 1}
                  >
                    {book.availableCopies < 1
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="empty">
            <h3>No books found!</h3>
            <p>
              Add books to your MongoDB database
              to display them here.
            </p>
          </div>
        )}
      </section>

      <section className="cart-section">
        <h2>Your Shopping Cart</h2>

        {cart.map((book, index) => (
          <div className="cart-item" key={`${book._id}-${index}`}>
            <span>{book.title}</span>
            <strong>₹{book.price}</strong>
            <button
              onClick={() =>
                setCart((prev) =>
                  prev.filter((_, i) => i !== index)
                )
              }
            >
              Remove
            </button>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>
      </section>

      <footer id="about">
        <h2>BOOK<span>HIVE.</span></h2>
        <p>Every book is a new adventure.</p>
        <p>© 2026 BookHive. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
