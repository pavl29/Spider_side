document.addEventListener('DOMContentLoaded', function () {
  // Элементы DOM
  const cartButton = document.getElementById('cart-button');
  const cartModal = document.getElementById('cart-modal');
  const closeCartButton = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountElement = document.getElementById('cart-count');
  const cartTotalElement = document.getElementById('cart-total');
  const cartOrderNumberElement = document.getElementById('cart-order-number');
  const orderButton = document.getElementById('order-button');
  const clearCartButton = document.getElementById('clear-cart');
  const orderPopup = document.getElementById('order-popup');
  const orderNumberElement = document.getElementById('order-number');
  const closePopupButton = document.getElementById('close-popup');
  const closePopupButton2 = document.getElementById('close-popup-button');
  const cartPreloader = document.querySelector('.spinner');
  const orderBtnText = document.querySelector('.orderBtnText');
  // const categoryItems = document.querySelectorAll('li');
  // const categoryListAmplifiers = document.querySelectorAll('#amplifiers li');
  // const categoryListSubwoofers = document.querySelectorAll('#subwoofers li');


// categoryItems.forEach((item, index) => {
//     item.setAttribute('data-id', index + 1);
// });

//   categoryListAmplifiers.forEach((item, index) => {
//     item.setAttribute('data-id', index + categoryListAmplifiers.length + 10);
//   });

//   categoryListSubwoofers.forEach((item, index, id) => {
//       id = categoryListAmplifiers.length;
//     item.setAttribute('data-id', index + categoryListSubwoofers.length + id + 1);
// });





  // Данные корзины
  let cart = [];
  let total = 0;
  let orderNumber = null;
  cartPreloader.style.display = 'none';
  orderBtnText.style.visibility = 'visible';



  // Генерация уникального шестизначного номера заказа
  function generateOrderNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  // Создание индикатора количества на карточке товара
  function createQuantityIndicator(productId) {
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!productCard) return;

    // Удаляем старый индикатор, если он есть
    const oldIndicator = productCard.querySelector('.product-card__quantity');
    if (oldIndicator) {
      oldIndicator.remove();
    }

    // Находим товар в корзине
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 0) {
      // Создаем индикатор количества
      const quantityIndicator = document.createElement('a');
      quantityIndicator.className = 'product-card__quantity';
      quantityIndicator.href = '#cart-button';
      quantityIndicator.textContent = cartItem.quantity;

      // Добавляем индикатор на карточку
      productCard.style.position = 'relative';
      productCard.appendChild(quantityIndicator);
    }
  }

  // Обновление индикаторов количества на всех карточках
  function updateAllQuantityIndicators() {
    cart.forEach(item => {
      createQuantityIndicator(item.id);
    });

    // Удаляем индикаторы с карточек, которых нет в корзине
    document.querySelectorAll('.product-card').forEach(card => {
      const productId = parseInt(card.dataset.id);
      const cartItem = cart.find(item => item.id === productId);

      if (!cartItem || cartItem.quantity === 0) {
        const indicator = card.querySelector('.product-card__quantity');
        if (indicator) {
          indicator.remove();
        }
      }
    });
  }

  // Инициализация корзины из localStorage
  function initCart() {
    const savedCart = localStorage.getItem('cart');
    const savedOrderNumber = localStorage.getItem('orderNumber');

    if (savedCart) {
      cart = JSON.parse(savedCart);
    }

    if (savedOrderNumber) {
      orderNumber = savedOrderNumber;
      cartOrderNumberElement.textContent = `${orderNumber}`;
    }

    updateCart();
    updateAllQuantityIndicators();
  }

  // Сохранение корзины в localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    if (orderNumber) {
      localStorage.setItem('orderNumber', orderNumber);
    }
  }

  // Полная очистка корзины
  function clearCart() {
    // Удаляем все индикаторы с карточек
    document.querySelectorAll('.product-card__quantity').forEach(indicator => {
      indicator.remove();
    });

    // Очищаем корзину
    cart = [];
    orderNumber = null;

    // Очищаем localStorage
    localStorage.removeItem('cart');
    localStorage.removeItem('orderNumber');

    // Обновляем отображение
    updateCart();
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

    // Показываем/скрываем кнопку очистки корзины
    if (clearCartButton) {
      if (cart.length > 0) {
        clearCartButton.style.display = 'block';
      } else {
        clearCartButton.style.display = 'none';
      }
    }

    // Генерируем номер заказа, если его еще нет
    if (!orderNumber && cart.length > 0) {
      orderNumber = generateOrderNumber();
      cartOrderNumberElement.textContent = `${orderNumber}`;
      saveCart();
    }

    // Если корзина пуста
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="cart-modal__empty">Ваша корзина пуста</div>';
      orderButton.disabled = true;
      cartTotalElement.textContent = '0 ₽';
      cartOrderNumberElement.textContent = '';
      orderNumber = null;
      localStorage.removeItem('orderNumber');
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
                 <div class="cart-item__btns">
                <div class="cart-item__quantity">
                    <button class="cart-item__quantity-button" data-action="decrease" data-id="${item.id}">-</button>
                    <span class="cart-item__quantity-value">${item.quantity}</span>
                    <button class="cart-item__quantity-button" data-action="increase" data-id="${item.id}">+</button>
                </div>
                <button class="cart-item__remove" data-id="${item.id}">×</button>
                </div>
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
      button.addEventListener('click', function () {
        const productId = parseInt(this.dataset.id);
        const action = this.dataset.action;
        updateQuantity(productId, action);
      });
    });

    // Обработчики для кнопок удаления
    document.querySelectorAll('.cart-item__remove').forEach(button => {
      button.addEventListener('click', function () {
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

      // Генерируем номер заказа при добавлении первого товара
      if (cart.length === 1) {
        orderNumber = generateOrderNumber();
        cartOrderNumberElement.textContent = `${orderNumber}`;
      }
    }

    // Анимация иконки корзины
    cartCountElement.classList.remove('cart-animate');
    void cartCountElement.offsetWidth; // Trigger reflow
    cartCountElement.classList.add('cart-animate');

    // Обновляем индикатор на карточке
    createQuantityIndicator(productId);

    updateCart();
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

      // Обновляем индикатор на карточке
      createQuantityIndicator(productId);

      updateCart();
    }
  }

  // Удаление товара из корзины
  function removeFromCart(productId) {
    // Удаляем товар из массива корзины
    cart = cart.filter(item => item.id !== productId);

    // Удаляем индикатор с карточки
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (productCard) {
      const indicator = productCard.querySelector('.product-card__quantity');
      if (indicator) {
        indicator.remove();
      }
    }

    // Если корзина пуста, удаляем номер заказа из localStorage
    if (cart.length === 0) {
      orderNumber = null;
      localStorage.removeItem('orderNumber');
    }

    // Сохраняем изменения в localStorage
    saveCart();

    // Обновляем отображение корзины
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
    // Показываем popup с номером заказа
    orderNumberElement.textContent = `Номер вашего заказа: ${orderNumber}`;
    orderPopup.classList.add('order-popup--active');
    document.body.style.overflow = 'hidden';

    // Очищаем корзину
    clearCart();

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
    button.addEventListener('click', function () {
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

  document.querySelector('.order').addEventListener('submit', (e) => {
    e.preventDefault();

    let self = e.currentTarget;
    let cartCount = document.getElementById('cart-order-number').innerHTML
    let prodClean = cart;
    let formData = new FormData(self);
    let name = self.querySelector('[name="Имя"]').value;
    let tel = self.querySelector('[name="Телефон"]').value;
    let email = self.querySelector('[name="Email"]').value;
    let fprice = self.querySelector('#cart-total').innerHTML;
    let fpriceClean = String(fprice).replace(/\&nbsp;/g, '').trim()
    let dest = prodClean.map(item => `Наименование: ${item.name}` + ` Цена: ${item.price} ₽` + ` Количество: ${item.quantity} шт.<br>`).join(' ');

    formData.append('Товары', dest);
    formData.append('Имя', name);
    formData.append('Телефон', `<a href="tel:${tel}">${tel}</a>`);
    formData.append('Email', email);
    formData.append('Итого', fpriceClean);
    formData.append('Заказ №', cartCount);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {


      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          cartPreloader.style.display = 'none';
          placeOrder()
          self.reset();
        }
      }
    }

    if (name && tel && email) {
      cartPreloader.style.display = 'inline-block';
      orderBtnText.style.visibility = 'hidden';
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
    }
  });


  // Обработчик для кнопки очистки корзины
  if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart);
  }

  // Обработчики для закрытия popup
  closePopupButton.addEventListener('click', closePopup);
  closePopupButton2.addEventListener('click', closePopup);
  orderPopup.querySelector('.order-popup__overlay').addEventListener('click', closePopup);

  // Инициализация корзины
  initCart();
});





