const listContainer=document.getElementById('list-container');

//DRAG AND DROP

//Кнопка добавления
function addTask(){
    let li=document.createElement('li');
    //Добавление возможности drag and pull
    li.setAttribute('draggable','true');
    li.innerHTML='<input type="text"><button class="delete-button"></button>';
    listContainer.appendChild(li);

    //Кнопка удаления
    let deleteButtons=document.querySelectorAll('.delete-button');
    deleteButtons.forEach((item)=>{
    item.addEventListener('click',()=>{
        item.parentElement.remove();
    })
});

}

//УДАЛЕНИЕ ПЕРВОГО ЭЛЕМЕНТА
let tasks = [];

let firstButton = document.getElementById("first-button");

firstButton.addEventListener('click', () =>{
    let inputs = document.querySelectorAll('ul li input');
    if (inputs.length>1){
    inputs.forEach((item)=>{
        tasks.push(item.value)
    });
    tasks.splice(0,1)
    for (let i=0; i<tasks.length; i++)
        inputs[i].value = tasks[i];

    document.querySelector("ul li:last-child").remove();
    tasks=[];
    } else{
        inputs.forEach((item)=>{
            item.value = ''
        }) 
    }

});

//СОРТИРОВКА
let flag=false;

let sortButton=document.getElementById('sort-button')
sortButton.addEventListener('click',()=>{
    sortButton.classList.toggle('sort-button-increase');
    if(flag){
        let inputs = document.querySelectorAll('ul li input');
        inputs.forEach((item)=>{
            tasks.push(item.value);
        })
        tasks.sort((a,b)=>a.localeCompare(b));
        for(let i=0;i<tasks.length;i++)
            inputs[i].value=tasks[i];
    }
    else{
        let inputs = document.querySelectorAll('ul li input');
        inputs.forEach((item)=>{
            tasks.push(item.value);
        })
        tasks.sort((a,b)=>b.localeCompare(a));
        for(let i=0;i<tasks.length;i++)
            inputs[i].value=tasks[i];
    }
    flag=!flag;
    tasks=[];

});