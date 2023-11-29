const setEditModal = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            const book = JSON.parse(xhttp.responseText);

            const {
                title,
                author,
                publisher,
                publish_date,
                numOfPages
            } = book;

            document.getElementById('isbn').value = isbn;
            document.getElementById('title').value = title;
            document.getElementById('author').value = author;
            document.getElementById('publisher').value = publisher;
            document.getElementById('publisheddate').value = publish_date;
            document.getElementById('numOfPages').value = numOfPages;

            document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
        } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.error(`Error: ${xhttp.status}`);
        }
    };

    xhttp.send();
}

const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            // Reload the page after successful deletion
            location.reload();
        } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.error(`Error: ${xhttp.status}`);
        }
    };

    xhttp.send();
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/books", false);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            const books = JSON.parse(xhttp.responseText);
            const booksContainer = document.getElementById('books');

            for (let book of books) {
                const bookCard = document.createElement('div');
                bookCard.classList.add('col-4');
                bookCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                            <div>Author: ${book.author}</div>
                            <div>Published Date: ${book.publisheddate}</div>
                            <div>Publisher: ${book.publisher}</div>
                            <div>Number Of Pages: ${book.numOfPages}</div>

                            <hr>

                            <button type="button" class="btn btn-danger" onclick="deleteBook('${book.isbn}')">Delete</button>
                            <button types="button" class="btn btn-primary" data-toggle="modal"
                                data-target="#editBookModal" onClick="setEditModal('${book.isbn}')">
                                Edit
                            </button>
                        </div>
                    </div>
                `;
                booksContainer.appendChild(bookCard);
            }
        } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.error(`Error: ${xhttp.status}`);
        }
    };

    xhttp.send();
}

loadBooks();
