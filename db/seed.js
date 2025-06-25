import db from "./client.js";
import bcrypt from "bcryptjs";


  const books = [
  {
    title: "The Alchemist",
    synopsis: "A journey of self-discovery wrapped in mystical storytelling.",
    price: 10.99,
    image_url: "https://covers.openlibrary.org/b/id/9280836-L.jpg"
  },
  {
    title: "Atomic Habits",
    synopsis: "An actionable guide to building good habits and breaking bad ones.",
    price: 15.50,
    image_url: "https://covers.openlibrary.org/b/id/10490354-L.jpg"
  },
  {
    title: "Educated",
    synopsis: "A memoir about growing up in a survivalist family and seeking education.",
    price: 12.25,
    image_url: "https://covers.openlibrary.org/b/id/9264817-L.jpg"
  },
  {
    title: "Where the Crawdads Sing",
    synopsis: "A murder mystery intertwined with coming-of-age in the South.",
    price: 11.75,
    image_url: "https://covers.openlibrary.org/b/id/9874153-L.jpg"
  },
  {
    title: "The Midnight Library",
    synopsis: "Exploring parallel lives and infinite regrets through magical realism.",
    price: 14.20,
    image_url: "https://covers.openlibrary.org/b/id/10572294-L.jpg"
  },
  {
    title: "Becoming",
    synopsis: "Michelle Obama's inspiring personal and political journey.",
    price: 13.80,
    image_url: "https://covers.openlibrary.org/b/id/9251270-L.jpg"
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    synopsis: "Brutally honest self-help for a modern generation.",
    price: 16.00,
    image_url: "https://covers.openlibrary.org/b/id/8281991-L.jpg"
  },
  {
    title: "The Four Agreements",
    synopsis: "A code of conduct based on ancient Toltec wisdom.",
    price: 9.40,
    image_url: "https://covers.openlibrary.org/b/id/8091017-L.jpg"
  },
  {
    title: "Sapiens",
    synopsis: "The history of humankind from the Stone Age to the 21st century.",
    price: 18.90,
    image_url: "https://covers.openlibrary.org/b/id/9841613-L.jpg"
  },
  {
    title: "Daring Greatly",
    synopsis: "How the courage to be vulnerable transforms our lives.",
    price: 13.95,
    image_url: "https://covers.openlibrary.org/b/id/8228691-L.jpg"
  },
  {
    title: "Big Magic",
    synopsis: "Creative living beyond fear, by Elizabeth Gilbert.",
    price: 12.49,
    image_url: "https://covers.openlibrary.org/b/id/8233475-L.jpg"
  },
  {
    title: "Untamed",
    synopsis: "A memoir about trusting yourself and breaking expectations.",
    price: 14.99,
    image_url: "https://covers.openlibrary.org/b/id/10517794-L.jpg"
  },
  {
    title: "Think Like a Monk",
    synopsis: "Train your mind for peace and purpose every day.",
    price: 13.20,
    image_url: "https://covers.openlibrary.org/b/id/10474849-L.jpg"
  },
  {
    title: "The Power of Now",
    synopsis: "A guide to spiritual enlightenment in the present moment.",
    price: 11.25,
    image_url: "https://covers.openlibrary.org/b/id/8235460-L.jpg"
  },
  {
    title: "Can’t Hurt Me",
    synopsis: "David Goggins shares his story of conquering mental and physical limits.",
    price: 16.85,
    image_url: "https://covers.openlibrary.org/b/id/10941296-L.jpg"
  },
  {
    title: "The Gifts of Imperfection",
    synopsis: "Letting go of who you're supposed to be and embracing who you are.",
    price: 10.75,
    image_url: "https://covers.openlibrary.org/b/id/8246787-L.jpg"
  },
  {
    title: "The 5 Love Languages",
    synopsis: "How to express heartfelt commitment to your partner.",
    price: 9.90,
    image_url: "https://covers.openlibrary.org/b/id/8228236-L.jpg"
  },
  {
    title: "You Are a Badass",
    synopsis: "Stop doubting your greatness and start living an awesome life.",
    price: 11.50,
    image_url: "https://covers.openlibrary.org/b/id/8369252-L.jpg"
  },
  {
    title: "Man’s Search for Meaning",
    synopsis: "A Holocaust survivor’s insights on purpose and resilience.",
    price: 9.60,
    image_url: "https://covers.openlibrary.org/b/id/10227312-L.jpg"
  },
  {
    title: "Ikigai",
    synopsis: "The Japanese secret to a long and happy life.",
    price: 12.00,
    image_url: "https://covers.openlibrary.org/b/id/11102249-L.jpg"
  },
  {
    title: "Grit",
    synopsis: "Why passion and perseverance matter more than talent.",
    price: 13.00,
    image_url: "https://covers.openlibrary.org/b/id/10484311-L.jpg"
  },
  {
    title: "Digital Minimalism",
    synopsis: "Choosing a focused life in a noisy world.",
    price: 12.75,
    image_url: "https://covers.openlibrary.org/b/id/10579097-L.jpg"
  },
  {
    title: "Drive",
    synopsis: "The surprising truth about what motivates us.",
    price: 11.40,
    image_url: "https://covers.openlibrary.org/b/id/7976507-L.jpg"
  },
  {
    title: "Deep Work",
    synopsis: "Rules for focused success in a distracted world.",
    price: 14.60,
    image_url: "https://covers.openlibrary.org/b/id/8052730-L.jpg"
  },
  {
    title: "Start With Why",
    synopsis: "How great leaders inspire everyone to take action.",
    price: 13.50,
    image_url: "https://covers.openlibrary.org/b/id/7957442-L.jpg"
  },
  {
    title: "Mindset",
    synopsis: "The new psychology of success by Carol Dweck.",
    price: 12.90,
    image_url: "https://covers.openlibrary.org/b/id/8230018-L.jpg"
  },
  {
    title: "A Promised Land",
    synopsis: "Barack Obama's memoir of his early political career.",
    price: 19.99,
    image_url: "https://covers.openlibrary.org/b/id/10589094-L.jpg"
  },
  {
    title: "Greenlights",
    synopsis: "Matthew McConaughey’s unconventional memoir of lessons from life.",
    price: 15.00,
    image_url: "https://covers.openlibrary.org/b/id/10548085-L.jpg"
  },
  {
    title: "Born a Crime",
    synopsis: "Trevor Noah’s memoir of growing up in South Africa.",
    price: 11.70,
    image_url: "https://covers.openlibrary.org/b/id/9884784-L.jpg"
  },
  {
    title: "The Book Thief",
    synopsis: "A haunting tale of books and resistance in Nazi Germany.",
    price: 13.25,
    image_url: "https://covers.openlibrary.org/b/id/10565510-L.jpg"
  },
  {
    title: "The Silent Patient",
    synopsis: "A psychological thriller about a woman who never speaks again.",
    price: 14.00,
    image_url: "https://covers.openlibrary.org/b/id/10557823-L.jpg"
  }
];

async function seed() {
  await db.connect();

  // Create user
  const hashedPassword = await bcrypt.hash("test123", 10);
  const {
    rows: [user]
  } = await db.query(
    `INSERT INTO users (username, password)
     VALUES ($1, $2)
     RETURNING *`,
    ["kourtney", hashedPassword]
  );

  // Insert books
  const bookInserts = await Promise.all(
    books.map(b =>
      db.query(
        `INSERT INTO books (title, synopsis, price, image_url)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [b.title, b.synopsis, b.price, b.image_url]
      )
    )
  );
  const insertedBooks = bookInserts.map(r => r.rows[0]);

  // Create order with note
  const note = "1 The Alchemist, 2 Atomic Habits";
  const {
    rows: [order]
  } = await db.query(
    `INSERT INTO orders (user_id, date, note)
     VALUES ($1, CURRENT_DATE, $2)
     RETURNING *`,
    [user.id, note]
  );

  // Create 3 reviews for different books
  await db.query(
    `INSERT INTO reviews (book_id, user_id, content, rating)
     VALUES ($1, $2, $3, $4), ($5, $6, $7, $8), ($9, $10, $11, $12)`,
    [
      insertedBooks[0].id, user.id, "Life-changing book with beautiful storytelling.", 5,
      insertedBooks[1].id, user.id, "Tons of practical advice. Very readable.", 4,
      insertedBooks[2].id, user.id, "Raw and powerful memoir. Highly recommend.", 5
    ]
  );

  await db.end();
  console.log("📚 Book Haven seeded successfully!");
}

seed().catch(console.error);