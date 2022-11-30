const addBtn = document.querySelector('.form__button')
const input = document.querySelector('.form__control')
const list = document.querySelector('.main__items')

addBtn.addEventListener('click', addTask)
list.addEventListener('click', delitTask)
list.addEventListener('click', doneTask)

let tasks = []
let deleteTasks = []
if (localStorage.getItem('deleteTasks')) {
    deleteTasks = JSON.parse(localStorage.getItem('deleteTasks'))
}

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}



tasks.forEach((task) => renderTask(task));
checkEmptylist()
input.focus()

function addTask(event) {
    event.preventDefault()
    let valueForm = input.value;
    if (valueForm.length < 1) return;
    const date = new Date
    const dateTask = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()


    const newTask = {
        text: valueForm,
        id: Date.now(),
        time: dateTask,
        timeEnd: 0,
        done: false,
    }

    tasks.push(newTask)
    saveToLocalStorage()
    

    renderTask(newTask)

    input.value = ""
    input.focus()
    checkEmptylist()
}

function delitTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.items__item_task')

    const index = tasks.findIndex((task) => task.id == parentNode.id)

    const date = new Date
    tasks[index].timeEnd = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    console.log(tasks[index].timeEnd);
    deleteTasks.push(tasks[index])
    localStorage.setItem('deleteTasks', JSON.stringify(deleteTasks))
    console.log(deleteTasks);

    tasks.splice(index, 1)
    saveToLocalStorage()
    parentNode.remove()

    checkEmptylist()
}
console.log(deleteTasks);

function doneTask(event) {
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.items__item_task')
        const textTask = parentNode.querySelector('.items__tasck')
        textTask.classList.toggle('througn')

        const task = tasks.find((task) => task.id == parentNode.id)
        task.done = !task.done
        saveToLocalStorage()
    }
}

function checkEmptylist() {
    if (tasks.length == 0) {
        const emptylistHTML = `<li class="items__item" id="empty">
                               <h2 class="items__text">Список задач пуст.</h2>
                         </li>`

        list.insertAdjacentHTML('afterbegin', emptylistHTML)
    }
    if (tasks.length > 0) {
        const emptylistEl = document.querySelector('#empty')
        emptylistEl ? emptylistEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const classCSS = task.done ? "items__tasck througn" : "items__tasck";

    const taskHTML = `<li id = "${task.id}"class="items__item items__item_task">
    <span class="${classCSS}">${task.text}</span>
    <div class="items__info">
        <div class="items__date">
           ${task.time}
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

    list.insertAdjacentHTML('beforeend', taskHTML)
}