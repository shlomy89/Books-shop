'use strict'

const elPrevious = document.querySelector('.previous-page')
const elNext = document.querySelector('.next-page')
const elPageIdx = document.querySelector('.page-idx')


function onInit() {
    renderFilterByQueryStringParams()
    gBooks = loadFromStorage(STORAGE_KEY)
    _createBooks()
    renderBooks()

}

function renderBooks() {
    var books = getBooksForDisplay()
    const strHTMLs = books.map(book => `
    <tr>
    <td>${book.id}</td>
    <td>${book.name}</td>
    <td>${book.price} &#8362</td>
    <td>${book.rate}</td>
    <td>
    <div class="action">
    <button data-trans="action-read" class="btn btn-success" onclick="onReadBook('${book.id}')">Read</button>
    <button data-trans="action-update" class="btn btn-warning" onclick="onUpdateBook('${book.id}')">Update</button>
    <button data-trans="action-delete" class="btn btn-danger" onclick="onRemoveBook('${book.id}')">Delete</button>
    </div>
    </td>
    </tr>
    `
    )
    document.querySelector('.books-table tbody').innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var bookName = prompt('Name?')
    var bookPrice = prompt('Price?')
    if (bookName && bookPrice) {
        addBook(bookName, bookPrice)
    }
    renderBooks()
}

function onUpdateBook(bookId) {
    var updatedPrice = prompt('Please update a new price?')
    if (updatedPrice) {
        updateBook(bookId, updatedPrice)
    } else {
        return
    }
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    const elmyModal = document.querySelector('.my-modal')
    const elChangeRate = elmyModal.querySelector('.change-rate')

    elmyModal.classList.add('open')
    elmyModal.querySelector('.id-cont').innerText = `${book.id}`
    elmyModal.querySelector('.name-cont').innerText = `${book.name}`
    elmyModal.querySelector('.price-cont').innerText = `${book.price} ₪`
    elmyModal.querySelector('.modal-img').innerHTML = `<img src="img/new_book.png" alt="">`
    elmyModal.querySelector('.rate-cont').innerText = `${book.rate}`
    elChangeRate.innerHTML = `<input onchange="onSetBookRate(this.value, '${bookId}')" type="number" class="change-rate" value="0" min="0" max="10" step="1"/>`
}

function onCloseModal() {
    document.querySelector('.my-modal').classList.remove('open')

}

function onSetBookRate(bookId, bookRate) {
    setBookRate(bookRate, bookId)
    renderBooks()
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    const elRateFilter = document.querySelector('.rate-filter-label')
    elRateFilter.innerText = gFilterBy.minRate
    const elPriceFilter = document.querySelector('.price-filter-label')
    elPriceFilter.innerText = gFilterBy.maxPrice
    renderBooks()

    const queryStringParams = `?minRate=${filterBy.minRate}&maxPrice=${filterBy.maxPrice}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        minRate: queryStringParams.get('minRate') || 0,
        maxPrice: +queryStringParams.get('maxPrice') || 200
    }

    if (!filterBy.minRate && !filterBy.maxPrice) return

    document.querySelector('.filter-min-rate').value = filterBy.minRate
    document.querySelector('.filter-max-price').value = filterBy.maxPrice
    setBookFilter(filterBy)
}

function onSetSearch() {
    const elTxt = document.querySelector('[name=search-str]')
    setSearch(elTxt.value)
    renderBooks()
}

function onPreviousPage() {
    previousPage()
    renderBooks()
}

function onNextPage() {
    nextPage()
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang)
    const elPriceFilter = document.querySelector('.price-filter-cont')
    if (lang === 'he') {
        document.body.classList.add('rtl')
        elPriceFilter.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
        elPriceFilter.classList.remove('rtl')
    }
    doTrans()
}