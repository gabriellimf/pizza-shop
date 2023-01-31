const selector = (element) => document.querySelector(element);
const selectorAll = (element) => document.querySelectorAll(element);
let modalQt = 1;
let cart = [];
let modalKey = 0;

// Listagem das pizzas
pizzaJson.map((item, index) => {
  let pizzaItem = selector(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--img").innerHTML = "<img src=" + item.img + " />";
  pizzaItem.querySelector(".pizza-item--price").innerHTML = item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
  pizzaItem.querySelector("a").addEventListener("click", (event) => {
    event.preventDefault();
    let key = event.target.closest(".pizza-item").getAttribute("data-key");
    modalQt = 1;
    modalKey = key;

    selector(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    selector(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
    selector(".pizzaInfo--size.selected").classList.remove("selected");
    selector(".pizzaInfo--actualPrice").innerHTML = pizzaJson[
      key
    ].price.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    selector(".pizzaBig").innerHTML = "<img src= " + pizzaJson[key].img + " />";
    selectorAll(".pizzaInfo--size").forEach((size, index) => {
      if (index === 0) {
        size.classList.add("selected");
      }
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[index];
    });

    selector(".pizzaInfo--qt").innerHTML = modalQt;
    selector(".pizzaWindowArea").style.opacity = "0";
    selector(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      selector(".pizzaWindowArea").style.opacity = "1";
    }, 200);
  });

  selector(".pizza-area").append(pizzaItem);
});

// Eventos do modal
function closeModal() {
  selector(".pizzaWindowArea").style.opacity = 0;
  setTimeout(() => {
    selector(".pizzaWindowArea").style.display = "none";
  }, 500);
}

selectorAll(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach(
  (item) => {
    item.addEventListener("click", closeModal);
  }
);

selector(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQt > 1) {
    modalQt--;
    selector(".pizzaInfo--qt").innerHTML = modalQt;
  }
});

selector(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQt++;
  selector(".pizzaInfo--qt").innerHTML = modalQt;
});

selectorAll(".pizzaInfo--size").forEach((size, index) => {
  size.addEventListener("click", () => {
    selector(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

// Habilitando o carrinho de compra

selector(".pizzaInfo--addButton").addEventListener("click", () => {
  let size = parseInt(
    selector(".pizzaInfo--size.selected").getAttribute("data-key")
  );
  let identifier = pizzaJson[modalKey].id + "@" + size;
  let key = cart.findIndex((item) => item.identifier == identifier);
  if (key > -1) {
    cart[key].qt += modalQt;
  } else {
    cart.push({
      identifier: identifier,
      id: pizzaJson[modalKey].id,
      size: size,
      quantity: modalQt,
    });
  }
  updateCart();
  closeModal();
});

// Atualizando o carrinho de compras

function updateCart() {
  if (cart.length > 0) {
    selector("aside").classList.add("show");
    selector(".cart").innerHTML = '';

    let subtotal = 0;
    let total = 0;
    let discount = 0;

    for (let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      let cartItem = selector('.models .cart--item').cloneNode(true);
      let pizzaSizeName;
      
      subtotal += pizzaItem.price * cart[i].quantity;

      switch(cart[i].size){
        case 0: 
            pizzaSizeName = "P";
            break;
        case 1:
            pizzaSizeName = "M";
            break;
        case 2:
            pizzaSizeName = "G";
            break;
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;  
      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].quantity; 
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
        if(cart[i].quantity > 1){
            cart[i].quantity--;
        } else {
            cart.splice(i, 1);
        }
        updateCart();
      });
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
        cart[i].quantity++;	
        updateCart();
      });

      selector('.cart').append(cartItem);
    }

    discount = subtotal * 0.1;
    total = subtotal - discount;

    selector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
    selector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
    selector('.desconto span:last-child').innerHTML = `R$ ${discount.toFixed(2)}`

  } else {
    selector("aside").classList.remove("show");
  }
}
