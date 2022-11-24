const addBtn = document.querySelector('.form__button')
const input = document.querySelector('.form__control')
const list = document.querySelector('.main__items')
const emptylist = document.querySelector('#empty')

addBtn.addEventListener('click', addTask)
list.addEventListener('click', delitTask)
list.addEventListener('click', doneTask)

input.focus()

function addTask(event) {
    event.preventDefault()
    let valueForm = input.value;
    if (valueForm.length < 1) return;
    let date = new Date

    const newTask = `<li class="items__item items__item_task">
    <span class="items__tasck">${valueForm}</span>
    <div class="items__info">
        <div class="items__date">
           ${date.getDate()}.${date.getMonth()}. ${date.getFullYear()}
        </div>
        <div class="items__btn">
            <button class="items__done btn" data-action="done">
                <span class="items__done1"></span>
                <span class="items__done2"></span>
            </button>
            <button class="items__del btn" data-action="delete">
                <span class="items__del1"></span>
                <span class="items__del2"></span>
            </button>
        </div>
    </div>
</li>`

    list.insertAdjacentHTML('beforeend', newTask)
    input.value = ""
    input.focus()

    if (list.children.length > 1) {
        emptylist.classList.add('none')
    }
}

function delitTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    event.target.closest('.items__item_task').remove()

    if (list.children.length == 1) {
        emptylist.classList.remove('none')
        input.focus()
    }
}

function doneTask(event) {
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.items__item_task')
        const textTask = parentNode.querySelector('.items__tasck')
        textTask.classList.toggle('througn')
    }
}