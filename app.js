const input = document.querySelector("input");
const button = document.querySelector("button");
const form = document.querySelector("form");
const todos = document.querySelector(".addlist");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let value = input.value.trim();
  if (value) {
    addTodo({
        text: value,
    })

    saveTodoList()
  }

  input.value = ''
});

function addTodo(todo) {
    var li = document.createElement('li')
    li.innerHTML = 
    `
        <span>${todo.text}</span>
        <i class="far fa-trash-alt open"></i>
    `

    if(todo.status === 'hidden') {
        li.setAttribute('class', 'hidden')
    }

    // click hidden
    li.addEventListener('click', function() {
        // this = li 
        li.classList.toggle('hidden')
        saveTodoList()
    })

    // remove
    li.querySelector('i').addEventListener('click', function() {
        // this = i
        this.parentElement.remove()
        saveTodoList()
    })


    todos.appendChild(li)
}

function saveTodoList() {
    let todoList = document.querySelectorAll('li')
    let todoStorage = []
    todoList.forEach(function(item) {
        let text = item.querySelector('span').innerText;
        let status = item.getAttribute('class')

        todoStorage.push({
            text,
            status
        })
    })

    localStorage.setItem('todoList',JSON.stringify(todoStorage))
}

function init() {
    let data = JSON.parse(localStorage.getItem('todoList'))
    data.forEach(function(item) {
        console.log(item)
        addTodo(item)
    })
}

init()