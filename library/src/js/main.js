import '@styles/style.css';

class Book {
    constructor(name = '', author = '', status = false) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.author = author;
        this.isRead = status;
    }

    toggleStatus() {
        this.isRead = !this.isRead;
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
        this.booksContainer = document.getElementById('books');
        this.formNode = document.getElementById('book-form');
    }

    bindBookEvents(deleteBtn, checkbox) {
        deleteBtn.addEventListener('click', (evt) => {
            const index = this.myLibrary.findIndex(
                (book) => book.id === evt.target.dataset.id
            );
            if (index !== -1) {
                this.myLibrary.splice(index, 1);
            }
            evt.target.parentElement.parentElement.remove();
        });

        checkbox.addEventListener('change', (evt) => {
            const currentBook = this.myLibrary.find((el) => {
                return el.id === evt.target.dataset.id;
            });
            currentBook.toggleStatus();
        });
    }

    addBookToLibrary(data) {
        const { name, author, status } = data;
        const book = new Book(name, author, status);
        this.myLibrary.push(book);
    }

    createBook(book, id) {
        const tr = document.createElement('tr');
        tr.classList.add('book');
        const idNode = document.createElement('td');
        idNode.textContent = id;
        const name = document.createElement('td');
        name.textContent = book.name;
        const author = document.createElement('td');
        author.textContent = book.author;
        const status = document.createElement('td');
        const label = document.createElement('label');
        label.textContent = 'Is read?';
        const checkbox = document.createElement('input');
        checkbox.setAttribute('name', 'checkbox');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('role', 'switch');
        checkbox.dataset.id = book.id;
        checkbox.checked = book.isRead;
        checkbox.style.marginLeft = '10px';
        label.append(checkbox);
        status.append(label);
        const btn = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('button', 'contrast', 'outline', 'button--del');
        deleteBtn.textContent = 'delete';
        deleteBtn.dataset.id = book.id;
        btn.append(deleteBtn);
        tr.append(idNode, name, author, status, btn);
        this.bindBookEvents(deleteBtn, checkbox);
        return tr;
    }

    renderBooks() {
        this.booksContainer.innerHTML = '';
        const books = this.myLibrary.map((book, id) => {
            const bookNode = this.createBook(book, id + 1);
            return bookNode;
        });
        this.booksContainer.append(...books);
    }

    init() {
        this.formNode.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const data = new FormData(evt.target);
            this.addBookToLibrary({
                name: data.get('name'),
                author: data.get('author'),
                status: data.get('status') === 'true' ? true : false
            });
            this.renderBooks();
            evt.currentTarget.reset();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const newLibrary = new Library();
    newLibrary.init();
});
