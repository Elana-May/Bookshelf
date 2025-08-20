document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const pages = document.getElementById("pages").value;
    const series = document.getElementById("series").checked;
    const cover = document.getElementById("cover").value;

    let color;
    switch (genre) {
      case "action":
        color = "red";
        break;
      case "fantasy":
        color = "purple";
        break;
      case "dark":
        color = "black";
        break;
      case "mystery":
        color = "darkblue";
        break;
      case "romance":
        color = "pink";
        break;
      case "dystopia":
        color = "gray";
        break;
      default:
        color = "white";
    }

    const book = {
      title: title,
      author: author,
      genre: genre,
      pages: pages,
      series: series,
      color: color,
      cover: cover,
    };

    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    window.location.href = "index.html";
  });
});
