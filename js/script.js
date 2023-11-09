const element = document.getElementById('telInput');
const maskOptions = {
  mask: '+{7}(000)000-00-00'
};
const mask = IMask(element, maskOptions);




// Перключение варианта отправки чека

  const emailRadio = document.getElementById('email');
  const smsRadio = document.getElementById('sms');
  const emailInput = document.getElementById('emailInput');
  const telInput = document.getElementById('telInput');

  emailRadio.addEventListener('change', function() {
      if (emailRadio.checked) {
          emailInput.style.display = 'block';
          telInput.style.display = 'none';
      }
  });

  smsRadio.addEventListener('change', function() {
      if (smsRadio.checked) {
          telInput.style.display = 'block';
          emailInput.style.display = 'none';
      }
  });


  // Работа с товаром

 
    const products = document.querySelectorAll('.product');
    const cartItems = document.querySelector('.cart__items');
    const totalItems = document.querySelector('.total__items');
    const cartItemCountElement = document.getElementById('cartItemCount');

    // Инициализация корзины
    let cart = [];

    // Функция для обновления корзины
    function updateCart() {
        cartItems.innerHTML = '';

        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart__item');

            cartItem.innerHTML = `
                <div class="cart__img">
                    <img src="${item.imgSrc}" alt="">
                </div>
                <span class="name">${item.name}</span>
                <div class="total">
                    <div class="count">
                        <img src="./img/minus.svg" alt="" onclick="decrementItem('${item.name}')">
                        <small>${item.quantity}</small>
                        <img src="./img/plus.svg" alt="" onclick="incrementItem('${item.name}')">
                    </div>
                    <span>${item.price * item.quantity} ₸</span>
                </div>
            `;

            cartItems.appendChild(cartItem);

            totalPrice += item.price * item.quantity;

           
        });

        totalItems.textContent = `Итого: ${totalPrice} ₸`;
        updateCartCount();
    }

    function addToCart(name, price, imgSrc) {
        const existingItem = cart.find(item => item.name === name);
    
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                imgSrc: imgSrc,
                quantity: 1,
            });
        }
        updateCart();
    }

    function removeItem(name) {
        cart = cart.filter(item => item.name !== name);
        updateCart();
    }

    function decrementItem(name) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity--;
            updateCart();
        }
    }

    function incrementItem(name) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
            updateCart();
        }
    }


products.forEach(product => {
    const addButton = product.querySelector('button');
    addButton.addEventListener('click', addButtonHandler);
});

function addButtonHandler(event) {
    event.preventDefault();

    const addButton = event.target;
    const name = addButton.closest('.product').querySelector('.name span').textContent;

    setTimeout(() => {
        if (addButton.textContent === 'Добавить') {
            addButton.textContent = 'Удалить';
            addButton.classList.add('active');
        } else {
            removeItem(name);
            addButton.textContent = 'Добавить';
            addButton.classList.remove('active');
        }
    }, 0);
}

    function updateCartCount() {
        const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartItemCountElement.textContent = cartItemCount.toString();
    }

// Платежный Виджет

function openPaymentWidgetHandler() {
    openPaymentWidget({
      api_key: '7fd711e7-136c-4a0e-96d8-1d5229fbf152',
      amount: 10,
      currency: "KZT",
      order_id: "1",
      description: "1",
      payment_type: "pay",
      payment_method: "ecom",
      items: [{
          merchant_id: "2a217afd-21ed-4e34-bd74-f8f05185a7e1",
          service_id: "93fa5d99-3dcb-47ae-9dfe-39b886f2247e",
          merchant_name: "Example",
          name: "Example",
          quantity: 1,
          amount_one_pcs: 10,
          amount_sum: 10,
      }],
      user_id: "string",
      email: "example@gmail.com",
      phone: "example",
      success_url: "http://example.com",
      failure_url: "http://example.com",
      callback_url: "http://example.com",
      payment_lifetime: 0,
      create_recurrent_profile: false,
      recurrent_profile_lifetime: 0,
      lang: "ru",
      extra_params: {},
      payment_gateway_host: "https://api.onevisionpay.com/",
      payment_widget_host: "https://widget.onevisionpay.com"
    }, 
    onSuccess = (success) => {},
    onFail = (error) => {
        console.log("asd " + error)
    });
  }