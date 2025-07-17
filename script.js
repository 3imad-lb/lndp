const thumbnails = document.querySelectorAll('.thumbnails img');
const imgPrincipale = document.querySelector('.img_principale');
const title = document.querySelector('.product-info h1');
const price = document.querySelector('.new-price');
const quantityBtns = document.querySelectorAll('.quantitybtn');
const quantityDisplay = document.querySelector('.quantity span');
const orderBtn = document.getElementById('orderbtn1');
const tbody = document.querySelector('table tbody');

let quantity = 1;

// Change principale image, title, price
thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        imgPrincipale.src = thumb.src;
        if (thumb.src.includes('pack')) {
            title.textContent = "باك مقام العود";
            price.textContent = "900 درهم";
        } else {
            title.textContent = "عطر مفرد";
            price.textContent = "300 درهم";
        }
    });
});

// Modify main quantity
quantityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent === '+' && quantity < 20) quantity++;
        if (btn.textContent === '-' && quantity > 1) quantity--;
        quantityDisplay.textContent = quantity;
    });
});

// Add to table on order button click
orderBtn.addEventListener('click', () => {
    const imgName = imgPrincipale.src;
    const isPack = imgName.includes('pack');
    const productName = isPack ? 'باك مقام العود' : 'عطر مفرد';
    const unitPrice = isPack ? 900 : 300;

    let total = 0;
    if (isPack) {
        total = quantity === 1 ? 900 : quantity * 900;
    } else {
        if (quantity === 1) total = 300;
        else if (quantity === 2) total = 500;
        else total = quantity * 200;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${productName}</td>
        <td>${unitPrice} د.م</td>
        <td>
            <button class="quantitybtn">-</button>
            <span>${quantity}</span>
            <button class="quantitybtn">+</button>
        </td>
        <td>${total} د.م</td>
    `;

    const totalRow = tbody.querySelector('.total');
    if (totalRow) {
        tbody.insertBefore(tr, totalRow);
    } else {
        tbody.appendChild(tr);
    }

    updateTableQuantityEvents();
});

function updateTableQuantityEvents() {
    tbody.querySelectorAll('tr:not(.total)').forEach(row => {
        const minus = row.querySelector('.quantitybtn:first-child');
        const plus = row.querySelector('.quantitybtn:last-child');
        const span = row.querySelector('span');
        const tdPrice = row.children[1];
        const tdTotal = row.children[3];
        const isPack = row.children[0].textContent.includes('باك');
        let qte = parseInt(span.textContent);

        minus.onclick = () => {
            if (qte > 1) {
                qte--;
                span.textContent = qte;
                tdTotal.textContent = calculateTotal(isPack, qte) + ' د.م';
            }
        };
        plus.onclick = () => {
            qte++;
            span.textContent = qte;
            tdTotal.textContent = calculateTotal(isPack, qte) + ' د.م';
        };
    });
}

function calculateTotal(isPack, quantity) {
    if (isPack) return quantity === 1 ? 900 : quantity * 900;
    if (quantity === 1) return 300;
    if (quantity === 2) return 500;
    return quantity * 200;
}

// Slider gallery
const galleryImages = document.querySelector('.gallery-images');
const arrows = document.querySelectorAll('.gallery .arrow');
let scrollAmount = 300;

arrows[0].addEventListener('click', () => {
    galleryImages.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});
arrows[1].addEventListener('click', () => {
    galleryImages.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});
