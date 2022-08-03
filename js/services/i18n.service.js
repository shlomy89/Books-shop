var gTrans = {
    title: {
        en: 'Welcome to the Books Shop',
        he: 'ברוך הבא לחנות הספרים'
    },
    'create-book-btn': {
        en: 'Create new book',
        he: 'צור ספר חדש'
    },
    'search-placeholder': {
        en: 'Search by name',
        he: 'חפש לפי שם'
    },
    'rate-filter-lable': {
        en: 'Max Price',
        he: 'דירוג מינימלי'
    },
    'price-filter-lable': {
        en: 'Min Rate',
        he: 'מחיר מקסימלי'
    },
    'modal-id': {
        en: 'Id:',
        he: 'מזהה:'
    },
    'modal-name': {
        en: 'Name:',
        he: 'שם:'
    },
    'modal-price': {
        en: 'Price:',
        he: 'מחיר:'
    },
    'modal-rate': {
        en: 'Rate:',
        he: 'דירוג:'
    },
    'modal-btn': {
        en: 'Close',
        he: 'סגור'
    },
    'table-id': {
        en: 'Id',
        he: 'מזהה'
    },
    'table-title': {
        en: 'Title',
        he: 'שם'
    },
    'table-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'table-rate': {
        en: 'Rate',
        he: 'דירוג'
    },
    'table-action': {
        en: 'Actions',
        he: 'פעולות'
    },
    'previous-btn': {
        en: 'Previous',
        he: 'הקודם'
    },
    'next-btn': {
        en: 'Next',
        he: 'הבא'
    },
    'action-read': {
        en: 'Read',
        he: 'קרא'
    },
    'action-update': {
        en: 'Update',
        he: 'עדכן'
    },
    'action-delete': {
        en: 'Delete',
        he: 'מחק'
    }
}

var gCurrLang = 'en'

function setLang(lang) {
    gCurrLang = lang
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')

    els.forEach(el => {

        const translateKey = el.dataset.trans
        const translateVal = getTrans(translateKey)
        el.innerText = translateVal
        if (el.placeholder !== undefined) el.placeholder = translateVal
    })
}

function getTrans(transKey) {
    const key = gTrans[transKey]
    // if key is unknown return 'UNKNOWN'
    if (!key) return 'UNKNOWN'
    //  get from gTrans
    let translateVal = key[gCurrLang]
    // If translation not found - use english
    if (!translateVal) translateVal = key['en']
    return translateVal
}



// function formatNumOlder(num) {
//     return num.toLocaleString('es')
// }

// function formatNum(num) {
//     return new Intl.NumberFormat(gCurrLang).format(num)
// }

// function formatCurrency(num) {
//     return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num)
// }

// function formatDate(time) {

//     var options = {
//         year: 'numeric', month: 'short', day: 'numeric',
//         hour: 'numeric', minute: 'numeric',
//         hour12: true,
//     }

//     return new Intl.DateTimeFormat(gCurrLang,options).format(time)
// }

// function kmToMiles(km) {
//     return km / 1.609
// }