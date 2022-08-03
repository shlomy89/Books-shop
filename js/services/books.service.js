'use strict'

const STORAGE_KEY = 'booksDB'
const PAGE_SIZE = 5

var gId = 1
var gBooks
var gPageIdx = 0
var gSearchBy
var gFilterBy = { maxPrice: 200, minRate: 0 }

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 15; i++) {
            books[i] = _createBook()
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _createBook(name = makeLorem(1), price = getRandomIntInclusive(10, 200), imgUrl) {
    var idx = gId++
    var book = {
        id: idx.toString(),
        name,
        price,
        imgUrl,
        rate: '0'
    }
    return book
}

function addBook(name, price, rate) {
    var book = _createBook(name, price, rate)
    gBooks.push(book)
    _saveBooksToStorage()
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function updateBook(bookId, bookNewPrice) {
    const book = getBookById(bookId)
    book.price = bookNewPrice
    _saveBooksToStorage()
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    gId--
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function setBookRate(bookId, newBookRate) {
    const book = getBookById(bookId)
    book.rate = newBookRate
    _saveBooksToStorage()
}

function setSearch(searchStr) {
    gSearchBy = searchStr
}


function setBookFilter(filterBy = {}) {
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    return gFilterBy
}

function getBooksForDisplay() {
    if (!gSearchBy) gSearchBy = ''
    var books = gBooks.filter(book => book.price <= gFilterBy.maxPrice &&
        book.rate >= gFilterBy.minRate &&
        book.name.includes(gSearchBy))

    if (books.length > PAGE_SIZE) {
        const startIdx = gPageIdx * PAGE_SIZE
        books = books.slice(startIdx, startIdx + PAGE_SIZE)
    }
    return books
}


function previousPage() {
    gPageIdx--
    elPageIdx.innerText = gPageIdx + 1
    if (!gPageIdx) {
        elPrevious.disabled = true
        elNext.disabled = false
    }
}

function nextPage() {
    elPrevious.disabled = false
    gPageIdx++
    elPageIdx.innerText = gPageIdx + 1
    if (gPageIdx * PAGE_SIZE === gBooks.length - PAGE_SIZE) {
        elNext.disabled = true
        elPrevious.disabled = false
    }
}