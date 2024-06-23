import { menuArray } from "./data.js"

const menuItemsEl = document.getElementById("menu-items")
const orderEl = document.getElementById("order")
const paymentModalEl = document.getElementById("modal-order")
const order = new Map()

document.addEventListener('click', function (e) {
    if (e.target.dataset.add) {
        const itemId = e.target.dataset.add
        if (order.has(itemId)) {
            order.set(itemId, order.get(itemId) + 1)
        } else {
            order.set(itemId, 1)
        }
    }
    if (e.target.dataset.remove) {
        const orderItemId = e.target.dataset.remove
        if (order.has(orderItemId)) {
            order.delete(orderItemId)
        }
    }
    renderOrder(order)
    if (e.target.id == "complete-order") {
        paymentModalEl.style.setProperty('display', 'flex')
    }
})

function buildMenu(menuItems) {
    return menuItems.map(item => {
        const { name, ingredients, id, price, emoji } = item
        return `
    <div class="item">
        <div class="item-info">
            <div class="item-emoji">
                <p>${emoji}</p>
            </div>
            <div class="item-desc">
                <p class="item-name">${name}</p>
                <p class="item-ingredients">${ingredients}</p>
                <p class="item-price">$${price}</p>
            </div>
        </div>
        <div class="item-add">
            <button type="submit" class="add-btn" data-add="${id}">+</button>
        </div>
    </div>
    `
    }).join('')
}


function buildOrder(order) {
    let result = '<h2 class="order-title">Your order</h2>';
    let totalCost = 0;
    
    for (const [key, value] of order.entries()) {
        const item = menuArray.find(menuItem => menuItem.id === parseInt(key));
        const itemCost = value * item.price;
        totalCost += itemCost;
        result += `
            <div class='order-item'>
                <div>
                    <span class='order-item-name'>${item.name} (${value})</span>
                    <button type='button' class='order-item-remove' data-remove='${key}'>remove</button>
                </div>
                <span class='order-item-cost'>$${itemCost}</span>
            </div>
        `;
    }
    
    result += `
        <div class='total-price'>
            <span class='total-price-text'>Total price:</span>
            <span class='total-price-amount'>$${totalCost}</span>
        </div> 
        <button type='button' id='complete-order'>Complete order</button>
    `;
    
    return result;
}

function renderMenu(menuItems) {
    menuItemsEl.innerHTML = buildMenu(menuItems)
}

function renderOrder(order) {
    if (order.size === 0 ) {
        orderEl.innerHTML = ''
    } else {
        orderEl.innerHTML = buildOrder(order)
    }
}

renderMenu(menuArray)
renderOrder(order)
