document.addEventListener("DOMContentLoaded", () => {
  const editBook = JSON.parse(localStorage.getItem("editBook"));
  if (editBook) {
    document.getElementById("title").value = editBook.title;
    document.getElementById("author").value = editBook.author;
    document.getElementById("genre").value = editBook.genre;
    document.getElementById("pages").value = editBook.pages;
    document.getElementById("series").checked = editBook.series;
    document.getElementById("cover").value = editBook.cover;

    document
      .getElementById("bookForm-change")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const books = JSON.parse(localStorage.getItem("books")) || [];
        const index = editBook.index;

        let color;
        switch (document.getElementById("genre").value) {
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

        books[index] = {
          title: document.getElementById("title").value,
          author: document.getElementById("author").value,
          genre: document.getElementById("genre").value,
          pages: document.getElementById("pages").value,
          series: document.getElementById("series").checked,
          color: color,
          cover: document.getElementById("cover").value,
        };

        localStorage.setItem("books", JSON.stringify(books));
        localStorage.removeItem("editBook");
        window.location.href = "index.html";
      });
  }
});
