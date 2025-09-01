
import GraphModal from 'graph-modal';


document.addEventListener('DOMContentLoaded', () => {

  const productsBtn = document.querySelectorAll('.product__btn', '.modal__open')

  const cartProductsList = document.querySelector('.cart-content__list')

  const modalSucssesBtn = document.querySelector('.modal-popup__btn')

  const modalCloseBtn = document.querySelector('#popupModalClose')

  const cartPreloader = document.querySelector('.spinner')

  const cart = document.querySelector('.cart', 'modal__products')

  const cartQuantity = document.querySelector('.cart__quantity')

  const fullPrice = document.querySelector('.fullprice')

  const orderModalOpenProd = document.querySelector('.modal__open')

  const orderModalList = document.querySelector('.modal__list')

  const cartContent = document.querySelector('.cart-content')

  let price = 0

  let randomId = 0

  let productArray = []

  cartPreloader.style.display = 'none';

  const generateOrderCount = () => {
    return Math.floor(100000 + Math.random() * 900000)
  }

  let orderCount = generateOrderCount()



  const closedModal = () => {
    document.querySelector('#numberOfOrder').innerHTML = '';
    orderCount = generateOrderCount();
    let button = document.querySelector('.js-modal-close')
    let button2 = document.querySelectorAll('.cart-product__delete')
    button.click();
    for (let i = 0; i < button2.length; i++) {
      button2[i].click()
    }
  }

  const openDialog = () => {
    modalSucssesBtn.click();
  }

  modalCloseBtn.addEventListener('click', () => {
    closedModal();
  })

  const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
  };

  const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  };

  const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
  };

  const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
  };

  const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} ₽`;
  };


  const printQuantity = () => {
    if (cartProductsList.getElementsByTagName('li')) {
      let productsListLength = cartProductsList.getElementsByTagName('li').length;


      if (productsListLength == 0) {
        fullPrice.textContent = 0
        cartContent.style.display = 'none';
      } else {
        cartContent.style.display = 'block';
      }

      cartQuantity.textContent = productsListLength;
      productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
    }

  };

  printQuantity();


  const generateCartProduct = (img, title, price, id) => {

    return `
		<li class="cart-content__item">
			<article class="cart-content__product cart-product" data-id="${id}">
				<img src="${img}" alt="" class="cart-product__img">
				<div class="cart-product__text">
					<h3 class="cart-product__title">${title}</h3>
					<div class="cart-product__price">${normalPrice(price)}</div>
				</div>
				<button class="cart-product__delete" aria-label="Удалить товар">   <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 69 14"
    class="svgIcon bin-top"
  >
    <g clip-path="url(#clip0_35_24)">
      <path
        fill="black"
        d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_35_24">
        <rect fill="white" height="14" width="69"></rect>
      </clipPath>
    </defs>
  </svg>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 69 57"
    class="svgIcon bin-bottom"
  >
    <g clip-path="url(#clip0_35_22)">
      <path
        fill="black"
        d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_35_22">
        <rect fill="white" height="57" width="69"></rect>
      </clipPath>
    </defs>
  </svg></button>
			</article>
		</li>
	`;
  };

  const deleteProducts = (productParent) => {
    let id = productParent.querySelector('.cart-product').dataset.id;
    document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
    minusFullPrice(currentPrice);
    productParent.remove();
    printFullPrice();
    printQuantity();
    updateStorage();
  };






  const updateStorage = () => {
    let parent = cartProductsList;
    let html = parent.innerHTML
    html = html.trim()
    if (html.length) {
      localStorage.setItem('products', html)

    } else {
      localStorage.removeItem('products')
    }

  };

  const countSumm = () => {
    document.querySelectorAll('.cart-content__item').forEach(el => {
      price += parseInt(priceWithoutSpaces(el.querySelector('.cart-product__price').textContent));
    });
  };


  const initialState = () => {
    let itemOfStorage = localStorage.getItem('products')
    if (itemOfStorage !== null) {
      let list = cartProductsList;
      list.innerHTML = itemOfStorage
    }
    printQuantity();
    countSumm();
    printFullPrice();
  };

  initialState()

  productsBtn.forEach(el => {
    el.closest('.product').setAttribute('data-id', randomId++);

    el.addEventListener('click', (e) => {
      let self = e.currentTarget;
      let parent = self.closest('.product');
      let id = parent.dataset.id;
      let img = parent.querySelector('.product__img img').getAttribute('src');
      let title = parent.querySelector('.product__title').textContent;
      let priceString = priceWithoutSpaces(parent.querySelector('.product__price').textContent);


      let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product__price').textContent));

      plusFullPrice(priceNumber);
      printFullPrice();


      cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
      updateStorage();


      printQuantity();


      self.disabled = true;


    });
  });



  cartProductsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-product__delete', 'modal-product__delete')) {
      deleteProducts(e.target.closest('.cart-content__item', 'modal__item'));
    }

  });

  let flag = 0

  orderModalOpenProd.addEventListener('click', () => {
    if (flag == 0) {
      orderModalOpenProd.classList.add('open')
      orderModalList.style.display = 'flex';
      flag = 1;
    } else {
      orderModalOpenProd.classList.remove('open')
      orderModalList.style.display = 'none';
      flag = 0;
    }
  })



  const generateModalProduct = (img, title, price, id) => {

    return `<li class="modal__item">
                <article class="modal-product" data-id="${id}">
                  <img src="${img}" alt="" class="modal-product__img">
                  <div class="modal-product__text">
                    <h3 class="modal-product__title">${title}</h3>
                    <div class="modal-product__price">${normalPrice(price)}</div>
                  </div>
                  <button class="btn-reset modal-product__delete" aria-label="Удалить товар">
                    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                    <svg width="36" height="36" viewBox="-3 0 32 32" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000" stroke="#ffffff">
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <title>trash</title>
                        <desc>Created with Sketch Beta.</desc>
                        <defs> </defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                          sketch:type="MSPage">
                          <g id="Icon-Set-Filled" sketch:type="MSLayerGroup"
                            transform="translate(-261.000000, -205.000000)" fill="#000000">
                            <path
                              d="M268,220 C268,219.448 268.448,219 269,219 C269.552,219 270,219.448 270,220 L270,232 C270,232.553 269.552,233 269,233 C268.448,233 268,232.553 268,232 L268,220 L268,220 Z M273,220 C273,219.448 273.448,219 274,219 C274.552,219 275,219.448 275,220 L275,232 C275,232.553 274.552,233 274,233 C273.448,233 273,232.553 273,232 L273,220 L273,220 Z M278,220 C278,219.448 278.448,219 279,219 C279.552,219 280,219.448 280,220 L280,232 C280,232.553 279.552,233 279,233 C278.448,233 278,232.553 278,232 L278,220 L278,220 Z M263,233 C263,235.209 264.791,237 267,237 L281,237 C283.209,237 285,235.209 285,233 L285,217 L263,217 L263,233 L263,233 Z M277,209 L271,209 L271,208 C271,207.447 271.448,207 272,207 L276,207 C276.552,207 277,207.447 277,208 L277,209 L277,209 Z M285,209 L279,209 L279,207 C279,205.896 278.104,205 277,205 L271,205 C269.896,205 269,205.896 269,207 L269,209 L263,209 C261.896,209 261,209.896 261,211 L261,213 C261,214.104 261.895,214.999 262.999,215 L285.002,215 C286.105,214.999 287,214.104 287,213 L287,211 C287,209.896 286.104,209 285,209 L285,209 Z"
                              id="trash" sketch:type="MSShapeGroup"> </path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                </article>
              </li>
	`;
  };



  new GraphModal({
    isOpen: () => {
      let array = cartProductsList.children;
      let fullprice = fullPrice.textContent;
      let length = array.length;
      document.querySelector('.modal__num span').textContent = `${orderCount}`
      document.querySelector('.modal__quantity span').textContent = `${length} шт`
      document.querySelector('.modal__summ span').textContent = `${fullprice}`
      for (const el of array) {
        let img = el.querySelector('.cart-product__img').getAttribute('src');
        let title = el.querySelector('.cart-product__title').textContent;
        let priceString = priceWithoutSpaces(el.querySelector('.cart-product__price').textContent);
        let id = el.querySelector('.cart-product').dataset.id;
        orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id));

        productArray.push(title, `  Цена ${priceString}`);

      }
    },
  });

  document.querySelector('.order').addEventListener('submit', async (e) => {
    e.preventDefault();

    let self = e.currentTarget;
    let prodClean = String(productArray).replace(/\r?\n|\r/g, ' ').trim();
    let count = orderCount
    let formData = new FormData(self);
    let name = self.querySelector('[name="Имя"]').value;
    let tel = self.querySelector('[name="Телефон"]').value;
    let email = self.querySelector('[name="Email"]').value;
    let fprice = self.querySelector('#cart-total').value;

    console.log(fprice)

    formData.append('Имя', name);
    formData.append('Телефон', `<a href="tel:${tel}">${tel}</a>`);
    formData.append('Email', email);
    formData.append('Товары', prodClean);
    formData.append('Итого', fprice);
    formData.append('Заказ №', count);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {


      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          cartPreloader.style.display = 'none';
          openDialog();
          self.reset();
        }
      }
    }

    if (name && tel && email) {
      cartPreloader.style.display = 'inline-block';
      await xhr.open('POST', 'mail.php', true);
      await xhr.send(formData);
    }

  });
});

