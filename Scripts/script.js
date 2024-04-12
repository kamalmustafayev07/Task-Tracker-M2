const listContainer = document.getElementById('list-container');

// DRAG AND DROP
function handleDragStart(e) {
    e.target.classList.add("dragging");
}

function handleDragEnd(e) {
    e.target.classList.remove("dragging");
}

//Добавление такой возможности для уже существующего li
const li = listContainer.querySelector('li');
li.addEventListener('dragstart',handleDragStart);
li.addEventListener('dragend',handleDragEnd);

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
    //Добавление такой возможности для новых li
    li.setAttribute('draggable', 'true');
    li.innerHTML = '<input type="text"><button class="delete-button"></button>';
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragend", handleDragEnd);
    listContainer.appendChild(li);

    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        li.remove();
    });
}

// УДАЛЕНИЕ ПЕРВОГО ЭЛЕМЕНТА
const firstButton = document.getElementById("first-button");
let tasks=[];

firstButton.addEventListener('click', () => {
    const inputs = listContainer.querySelectorAll('li input');
    if (inputs.length > 1) {
        inputs.forEach(item => {
            tasks.push(item.value);
        });
        tasks.shift();
        for (let i = 0; i < tasks.length; i++) {
            inputs[i].value = tasks[i];
        }
        listContainer.removeChild(listContainer.lastElementChild);
    } else {
        inputs.forEach(item => {
            item.value = '';
        });
    }
    tasks=[];
});

// СОРТИРОВКА
const sortButton = document.getElementById('sort-button');
let flag=true;

sortButton.addEventListener('click', () => {
    const inputs = listContainer.querySelectorAll('li input');
    tasks = Array.from(inputs).map(input => input.value);
    if(flag){
        sortButton.className='sort-button-increase';
        tasks.sort((a,b)=> a.localeCompare(b));
    }else{
        sortButton.className='sort-button-decrease';
        tasks.sort((a,b)=> b.localeCompare(a));
    }
    tasks.forEach((task, index) => {
        inputs[index].value = task;
    });
    tasks=[];
    flag = !flag;
});