
let books = JSON.parse(localStorage.getItem("books")) || [
  { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, genre: "Fantasy", description: "Bilbo Baggins goes on an unexpected journey to reclaim treasure guarded by a dragon." },
  { title: "Dune", author: "Frank Herbert", year: 1965, genre: "Sci-Fi", description: "In a desert world of spice and power struggles, a young heir becomes a messiah figure." },
  { title: "Pride & Prejudice", author: "Jane Austen", year: 1813, genre: "Romance", description: "Elizabeth Bennet navigates love, pride, and society in 19th-century England." },
  { title: "Gone Girl", author: "Gillian Flynn", year: 2012, genre: "Thriller", description: "A wife disappears on her anniversary, and the husband’s secrets unravel fast." },
  { title: "Babel", author: "R.F. Kuang", year: 2022, genre: "Fantasy", description: "A dark academia fantasy where language holds magical power. A young translator at Oxford must choose between empire and revolution." },
  { title: "Fourth Wing", author: "Rebecca Yarros", year: 2023, genre: "Fantasy-Romance", description: "A fierce heroine must survive deadly trials, uncover secrets, and bond with a dragon or die trying." },
  { title: "Little Women", author: "Louisa May Alcott", year: 1868, genre: "Classic", description: "The lives of four sisters growing up in post-Civil War Massachusetts." },
  { title: "My Brief History", author: "Stephen Hawking", year: 2013, genre: "Memoir", description: "Hawking’s own concise and humble look at his life, work, and ideas." },
  { title: "IT", author: "Stephen King", year: 1986, genre: "Horror", description: "A chilling horror story about a group of kids facing an ancient, shapeshifting evil that preys on fear. Years later, they must reunite as adults to confront the nightmare they thought they escaped." }
];

