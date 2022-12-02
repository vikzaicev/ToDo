const burger = document.querySelector('.burger')
const popup = document.querySelector('.popup')
const body = document.body

burger.addEventListener('click', openPopup)

function openPopup() {
    popup.classList.toggle('open')
    console.log('open');
    burger.classList.toggle('open')
    body.classList.toggle('noscrol')
}