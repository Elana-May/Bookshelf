document.addEventListener("DOMContentLoaded", () => {
  const plank1 = document.getElementById("plank1");
  const plank2 = document.getElementById("plank2");
  const plank3 = document.getElementById("plank3");
  const planks = [plank1, plank2, plank3];
  const maxBooksPerPlank = 4;
  const maxTotalBooks = 12;

  let books = JSON.parse(localStorage.getItem("books")) || [];

  const addBookButton = document.getElementById("addbook");
  const fullMessage = document.getElementById("fullMessage");

  function updateLibraryStatus() {
    if (books.length >= maxTotalBooks) {
      addBookButton.style.display = "none";
      fullMessage.textContent = "Boekenkast is vol";
    } else {
      addBookButton.style.display = "block";
      fullMessage.textContent = "Library";
    }
  }

  function renderBooks(filteredBooks) {
    planks.forEach((plank) => (plank.innerHTML = ""));

    let currentPlankIndex = 0;
    filteredBooks.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");

      switch (book.genre) {
        case "action":
          bookElement.style.backgroundColor = "red";
          break;
        case "fantasy":
          bookElement.style.backgroundColor = "purple";
          break;
        case "dark":
          bookElement.style.backgroundColor = "darkblue";
          break;
        case "mystery":
          bookElement.style.backgroundColor = "grey";
          break;
        case "romance":
          bookElement.style.backgroundColor = "pink";
          break;
        case "dystopia":
          bookElement.style.backgroundColor = "lightgreen";
          break;
        default:
          bookElement.style.backgroundColor = "white";
      }

      const coverImage = document.createElement("img");
      coverImage.classList.add("book-cover");
      coverImage.src = book.cover;
      coverImage.alt = `cover of ${book.title}`;
      coverImage.width = 50;
      coverImage.height = 80;
      bookElement.appendChild(coverImage);

      bookElement.addEventListener("click", () => {
        showModal(book);
      });

      if (planks[currentPlankIndex].children.length >= maxBooksPerPlank) {
        currentPlankIndex++;
      }

      if (currentPlankIndex < planks.length) {
        planks[currentPlankIndex].appendChild(bookElement);
      }
    });
  }

  document.getElementById("stats").addEventListener("click", showStats);

  function showStats() {
    const statsWindow = document.getElementById("statswindow");
    const statsButton = document.getElementById("stats");

    if (statsWindow.style.display === "block") {
      statsWindow.style.display = "none";
      statsButton.innerHTML = "Show stats";
    } else {
      statsWindow.style.display = "block";
      statsButton.innerHTML = "Hide stats";
      const totalBooks = books.length;
      let genreCounts = {
        action: 0,
        fantasy: 0,
        dark: 0,
        mystery: 0,
        romance: 0,
        dystopia: 0,
      };

      books.forEach((book) => {
        genreCounts[book.genre]++;
      });

      document.getElementById("total-books").textContent = totalBooks;
      document.getElementById("genre-action").textContent = genreCounts.action;
      document.getElementById("genre-fantasy").textContent =
        genreCounts.fantasy;
      document.getElementById("genre-dark").textContent = genreCounts.dark;
      document.getElementById("genre-mystery").textContent =
        genreCounts.mystery;
      document.getElementById("genre-romance").textContent =
        genreCounts.romance;
      document.getElementById("genre-dystopia").textContent =
        genreCounts.dystopia;
    }
  }

  function showModal(book) {
    document.getElementById("modal-title").textContent = `Title: ${book.title}`;
    document.getElementById(
      "modal-author"
    ).textContent = `Author: ${book.author}`;
    document.getElementById("modal-genre").textContent = `Genre: ${book.genre}`;
    document.getElementById(
      "modal-pages"
    ).textContent = `Page Count: ${book.pages}`;
    document.getElementById("modal-series").textContent = book.series
      ? "Serie: Yes"
      : "Serie: No";
    document.getElementById("bookModal").style.display = "block";

    document.getElementById("deleteBook").onclick = () => {
      deleteBook(book);
    };

    document.getElementById("editBook").onclick = () => {
      editBook(book);
    };
  }

  document.querySelector(".close").onclick = function () {
    document.getElementById("bookModal").style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === document.getElementById("bookModal")) {
      document.getElementById("bookModal").style.display = "none";
    }
  };

  function deleteBook(book) {
    const index = books.indexOf(book);
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    document.getElementById("bookModal").style.display = "none";
    updateLibraryStatus();
    renderBooks(books);
  }

  function editBook(book) {
    const index = books.indexOf(book);
    localStorage.setItem(
      "editBook",
      JSON.stringify({ ...books[index], index })
    );
    window.location.href = "changebooks.html";
  }

  document
    .getElementById("genreSelect")
    .addEventListener("change", function () {
      const selectedGenre = this.value;
      const filteredBooks =
        selectedGenre === "all"
          ? books
          : books.filter((book) => book.genre === selectedGenre);
      renderBooks(filteredBooks);
    });

  updateLibraryStatus();
  renderBooks(books);
});
// localStorage.clear();
