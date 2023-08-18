let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
    document.querySelector('.card').style.overflowY = 'auto'; // เปิดการเลื่อน
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
    document.querySelector('.card').style.overflowY = 'hidden'; // ปิดการเลื่อน
});

let products = [
    {
        id: 1,
        name: 'Bibimbap',
        image: '2.png',
        price: 149 
    },
    {
        id: 2,
        name: 'Corn dog',
        image: '3.jpg',
        price: 69
    },
    {
        id: 3,
        name: 'jajangmyeon',
        image: '4.jpg',
        price: 129
    },
    {
        id: 4,
        name: 'Kimchi fried rice',
        image: '5.png',
        price: 139
    },
    {
        id: 5,
        name: 'Korean fried chicken',
        image: '6.jpg',
        price: 119
    },
    {
        id: 6,
        name: 'Spam Kimbap 6',
        image: '7.jpg',
        price: 89
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">เพิ่มใส่ตะกร้า</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        document.querySelector('.card').classList.add('active-right'); // Add this line
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
     if (totalPrice >=1000){
         totalPrice=totalPrice*90/100
     }
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function showPopup() {
    document.querySelector('.overlay').style.display = 'block';
}

function submitOrder() {
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var payment = document.getElementById("payment").value;

    // ตรวจสอบข้อมูลชื่อและที่อยู่
    if (name === "" || address === "") {
        alert("โปรดกรอกชื่อและที่อยู่ให้ครบถ้วน");
        return;
    }

    // ตรวจสอบการชำระเงินที่ผู้ใช้เลือก
    if (payment === "") {
        alert("โปรดเลือกวิธีการชำระเงิน");
        return;
    }

    // ทำอะไรกับข้อมูล เช่น ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลเพิ่มเติม

    // แสดงข้อความสำเร็จ
    var successMessage = document.querySelector('.success-message');
    successMessage.style.display = 'block';

    // ปิดป๊อปอัพ
    setTimeout(function() {
        document.querySelector('.overlay').style.display = 'none';
        successMessage.style.display = 'none';
    }, 2000); // แสดงข้อความสำเร็จเป็นเวลา 2 วินาที
}

