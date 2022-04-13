const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".form__input");
const elList = document.querySelector(".todo-list");
// const elTemplateList = document.querySelector(".film-template").content;
// console.log(elTemplateList);


const elWrapperBtn = document.querySelector(".all-btns");
const elAllBtn = document.querySelector(".all-btn");
const elComplateBtn = document.querySelector(".complate-btn");
const elUnComplateBtn = document.querySelector(".uncomplate-btn");


const elAllCount = document.querySelector(".all-count");
const elComplateCount = document.querySelector(".complate-count");
const elUnComplateCount = document.querySelector(".uncomplate-count");



const localTodos = JSON.parse(window.localStorage.getItem("list"));
const todos = localTodos || [];

renderTodo(todos , elList);

elList.addEventListener("click" , evt => {

  if(evt.target.matches(".todo-list__btn")){

    const btnId = evt.target.dataset.todoId;

    const findIndexArr = todos.findIndex(todo => todo.id == btnId);

    todos.splice(findIndexArr, 1);

    renderTodo(todos , elList);

    window.localStorage.setItem("list", JSON.stringify(todos))

  }else if(evt.target.matches(".todo-list__checkbox")){

    const inputCheckedId = evt.target.dataset.todoId;

    const findElement = todos.find(todo => todo.id == inputCheckedId);

    findElement.isComplated = !findElement.isComplated;

    renderTodo(todos , elList);
    window.localStorage.setItem("list", JSON.stringify(todos))
  }
})


function renderTodo(arr, element) {

  element.innerHTML = "";


  const allCount = todos.length

  elAllCount.textContent = allCount;

  const allComplateCount = todos.filter(e => e.isComplated === true).length;

  elComplateCount.textContent = allComplateCount;

  elUnComplateCount.textContent = allCount - allComplateCount;


  const todosFragment = document.createDocumentFragment();
  arr.forEach(todo => {
    const newItem = document.createElement("li");
    const newTitle = document.createElement("h3");
    const newCheckbox = document.createElement("input");
    const newBtn = document.createElement("button");
    console.log(newItem);
    



    newItem.setAttribute("class", "item");
    newTitle.textContent = todo.title;
    newTitle.setAttribute("class", "item__title");
    newCheckbox.setAttribute("class", "item__input");
    newBtn.setAttribute("class", "item__btn");
    newCheckbox.type = "checkbox";
    newBtn.textContent = "Delete";
    newBtn.classList.add("todo-list__btn");
    newBtn.dataset.todoId = todo.id;
    newCheckbox.dataset.todoId = todo.id;
    newCheckbox.classList.add("todo-list__checkbox");

    if(todo.isComplated){
      newCheckbox.checked = true;
      newTitle.style.textDecoration = "line-through";
    }

    
    newItem.appendChild(newTitle);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newBtn);
    todosFragment.appendChild(newItem);
  });
  element.appendChild(todosFragment)

}



elForm.addEventListener("submit", evt =>{

  evt.preventDefault();

  const elInputValue = elFormInput.value.trim();


  if (elInputValue == "" || !isNaN(elInputValue)) {
    elFormInput.style.border ="2px solid #ff0000"
    return
  }else{
    elFormInput.style.border ="2px solid #000"
  }
  const todo = {
    id: todos.length > 0 ? todos[todos.length -1].id + 1 : 1,
    title: elInputValue,
    isComplated: false,
  };

  todos.push(todo);

  renderTodo(todos , elList);
  window.localStorage.setItem("list", JSON.stringify(todos));

  elFormInput.value = "";

});



elWrapperBtn.addEventListener("click", evt => {

  if(evt.target.matches(".all-btn")){
    renderTodo(todos , elList);
  };

  if(evt.target.matches(".complate-btn")){

    const complateFiltered = todos.filter(e => e.isComplated === true);

    renderTodo(complateFiltered , elList);
  };

  if(evt.target.matches(".uncomplate-btn")){

    const unComplateFiltered = todos.filter(e => e.isComplated === false);

    renderTodo(unComplateFiltered , elList);
  };

})



