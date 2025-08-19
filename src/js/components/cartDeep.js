document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const orderButton = document.getElementById('order-button');
    const orderPopup = document.getElementById('order-popup');
    const orderNumberElement = document.getElementById('order-number');
    const closePopupButton = document.getElementById('close-popup');
    const closePopupButton2 = document.getElementById('close-popup-button');

    // Данные корзины
    let cart = [];
    let total = 0;

    // Инициализация корзины из localStorage
    function initCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
        }
    }

    // Сохранение корзины в localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Обновление отображения корзины
    function updateCart() {
        // Очищаем контейнер
        cartItemsContainer.innerHTML = '';

        // Сбрасываем общую сумму
        total = 0;

        // Обновляем счетчик товаров
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;

        // Если корзина пуста
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="cart-modal__empty">Ваша корзина пуста</div>';
            orderButton.disabled = true;
            cartTotalElement.textContent = '0 ₽';
            return;
        }

        // Включаем кнопку оформления заказа
        orderButton.disabled = false;

        // Добавляем товары в корзину
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item__image">
                <div class="cart-item__info">
                    <h3 class="cart-item__title">${item.name}</h3>
                    <p class="cart-item__price">${item.price.toLocaleString()} ₽</p>
                </div>
                <div class="cart-item__quantity">
                    <button class="cart-item__quantity-button" data-action="decrease" data-id="${item.id}">-</button>
                    <span class="cart-item__quantity-value">${item.quantity}</span>
                    <button class="cart-item__quantity-button" data-action="increase" data-id="${item.id}">+</button>
                </div>
                <button class="cart-item__remove" data-id="${item.id}">×</button>
            `;

            cartItemsContainer.appendChild(cartItemElement);
        });

        // Обновляем общую сумму
        cartTotalElement.textContent = `${total.toLocaleString()} ₽`;

        // Добавляем обработчики событий для кнопок изменения количества и удаления
        addCartEventListeners();

        // Сохраняем корзину
        saveCart();
    }

    // Добавление обработчиков событий для кнопок в корзине
    function addCartEventListeners() {
        // Обработчики для кнопок изменения количества
        document.querySelectorAll('.cart-item__quantity-button').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                const action = this.dataset.action;
                updateQuantity(productId, action);
            });
        });

        // Обработчики для кнопок удаления
        document.querySelectorAll('.cart-item__remove').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                removeFromCart(productId);
            });
        });
    }

    // Добавление товара в корзину
    function addToCart(productId, name, price, image) {
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        updateCart();
        openCart();
    }

    // Обновление количества товара
    function updateQuantity(productId, action) {
        const item = cart.find(item => item.id === productId);

        if (item) {
            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity -= 1;
            }

            updateCart();
        }
    }

    // Удаление товара из корзины
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Открытие корзины
    function openCart() {
        cartModal.classList.add('cart-modal--active');
        document.body.style.overflow = 'hidden';
    }

    // Закрытие корзины
    function closeCart() {
        cartModal.classList.remove('cart-modal--active');
        document.body.style.overflow = 'auto';
    }

    // Оформление заказа
    function placeOrder() {
        // Генерация шестизначного номера заказа
        const orderNumber = Math.floor(100000 + Math.random() * 900000);
        orderNumberElement.textContent = `Номер заказа: #${orderNumber}`;

        // Показываем popup
        orderPopup.classList.add('order-popup--active');
        document.body.style.overflow = 'hidden';

        // Очищаем корзину
        cart = [];
        updateCart();

        // Закрываем корзину
        closeCart();
    }

    // Закрытие popup
    function closePopup() {
        orderPopup.classList.remove('order-popup--active');
        document.body.style.overflow = 'auto';
    }

    // Добавление обработчиков событий для кнопок "Добавить в корзину"
    document.querySelectorAll('.product-card__button').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            const productName = productCard.dataset.name;
            const productPrice = parseInt(productCard.dataset.price);
            const productImage = productCard.dataset.image;

            addToCart(productId, productName, productPrice, productImage);
        });
    });

    // Обработчики для открытия/закрытия корзины
    cartButton.addEventListener('click', openCart);
    closeCartButton.addEventListener('click', closeCart);
    cartModal.querySelector('.cart-modal__overlay').addEventListener('click', closeCart);

    // Обработчик для кнопки оформления заказа
    orderButton.addEventListener('click', placeOrder);

    // Обработчики для закрытия popup
    closePopupButton.addEventListener('click', closePopup);
    closePopupButton2.addEventListener('click', closePopup);
    orderPopup.querySelector('.order-popup__overlay').addEventListener('click', closePopup);

    // Инициализация корзины
    initCart();
});

console.log('cartDeep')
