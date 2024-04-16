const listContainer = document.getElementById('list-container');
addTask(); //добавление первого элемента списка.

// DRAG AND DROP
function handleDragStart(e) {
    e.target.classList.add("dragging");
}

function handleDragEnd(e) {
    e.target.classList.remove("dragging");
}

function initSortableList(e) {
    e.preventDefault();
    const draggingItem = listContainer.querySelector('.dragging');
    const siblings = [...listContainer.querySelectorAll("li:not(.dragging)")];
    let nextSibling = siblings.find(sibling => e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2);

    listContainer.insertBefore(draggingItem, nextSibling);
}

listContainer.addEventListener("dragover", initSortableList);

// Кнопка добавления
function addTask() {
    const li = document.createElement('li');    
    //Добавление такой возможности для всех li
    li.setAttribute('draggable', 'true');
    li.innerHTML = '<input type="text"><button class="delete-button"></button>';
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragend", handleDragEnd);
    listContainer.appendChild(li);

    //Удаление элемента
    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click',()=>{
        if(li===listContainer.firstChild)
        {
            let lis=listContainer.querySelectorAll('li');
            lis.length<2 ? li.firstChild.value='' : li.remove();
        }else{
            li.remove();
        }
    });
}

// СОРТИРОВКА
const sortButton = document.getElementById('sort-button');
let flag = true;

sortButton.addEventListener('click', () => {
    const inputs = listContainer.querySelectorAll('li input');
    tasks = Array.from(inputs).map(input => input.value);
    if (flag) {
        sortButton.className = 'sort-button-increase';
        tasks.sort((a, b) => a.localeCompare(b));
    } else {
        sortButton.className = 'sort-button-decrease';
        tasks.sort((a, b) => b.localeCompare(a));
    }
    tasks.forEach((task, index) => {
        inputs[index].value = task;
    });
    tasks = [];
    flag = !flag;
});