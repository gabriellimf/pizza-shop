const selector = (element) => document.querySelector(element)    
const selectorAll = (element) => document.querySelectorAll(element)
let modalQt

// Listagem das pizzas
pizzaJson.map((item, index) =>{
    let pizzaItem = selector('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img').innerHTML = '<img src=' + item.img + ' />'; 
    pizzaItem.querySelector('.pizza-item--price').innerHTML = item.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();
        let key = event.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1

        selector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        selector('.pizzaInfo--size.selected').classList.remove('selected');
        selector('.pizzaInfo--actualPrice').innerHTML = pizzaJson[key].price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        selector('.pizzaBig').innerHTML = '<img src= '+ pizzaJson[key].img + ' />';
        selectorAll('.pizzaInfo--size').forEach((size, index) => {
            if(index === 0){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[index]
        });
        
        selector('.pizzaInfo--qt').innerHTML = modalQt;
        selector('.pizzaWindowArea').style.opacity = '0'
        selector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            selector('.pizzaWindowArea').style.opacity = '1'
        }, 200)

    });
    
    selector('.pizza-area').append(pizzaItem);


});

// Eventos do modal
function closeModal(){
    selector('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        selector('.pizzaWindowArea').style.display = 'none';
    },500);

};

selectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

selector('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1){
        modalQt--;
        selector('.pizzaInfo--qt').innerHTML = modalQt;
    }
    
});

selector('.pizzaInfo--qtmais').addEventListener('click', () => {
   modalQt++;
   selector('.pizzaInfo--qt').innerHTML = modalQt; 
});

selectorAll('.pizzaInfo--size').forEach((size, index) => {
    size.addEventListener('click', () => {
        selector('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//Teste