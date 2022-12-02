const list = document.querySelector('.main__items')
let deleteTasks = []

if (localStorage.getItem('deleteTasks')) {
    deleteTasks = JSON.parse(localStorage.getItem('deleteTasks'))
}
checkEmptylist()

function checkEmptylist() {
    if (deleteTasks.length == 0) {
        const emptylistHTML = `<li class="items__item" id="empty">
                                   <h2 class="items__text">Список завершенных задач пуст.</h2>
                               </li>`

        list.insertAdjacentHTML('afterbegin', emptylistHTML)
    }
    if (deleteTasks.length > 0) {
        const emptylistEl = document.querySelector('#empty')
        emptylistEl ? emptylistEl.remove() : null;
    }
}
deleteTasks.forEach((task) => renderDelTask(task));

function renderDelTask(task) {


    const taskHTML = `<li class="items__item items__item_task">
    <span class="items__tasck">${task.text}</span>
    <div class="items__info">
        <div class="items__date">
           ${task.time} - ${task.timeEnd}
        </div>
        
        </div>
    </div>
</li>`

    list.insertAdjacentHTML('beforeend', taskHTML)
}
