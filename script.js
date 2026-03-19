// TASKS
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

function addTask(){
const taskText = taskInput.value.trim();
if(taskText === "") return;

createTaskElement(taskText);
saveTask(taskText);

taskInput.value="";
}

function createTaskElement(taskText){

const li = document.createElement("li");

// text
const span = document.createElement("span");
span.textContent = taskText;

// mark complete
span.addEventListener("click", function(){
span.classList.toggle("completed");
});

// delete button
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "❌";

deleteBtn.addEventListener("click", function(){
li.remove();
removeTask(taskText);
});

li.appendChild(span);
li.appendChild(deleteBtn);

taskList.appendChild(li);
}

function saveTask(task){
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.push(task);
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => createTaskElement(task));
}

function removeTask(task){
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks = tasks.filter(t => t !== task);
localStorage.setItem("tasks", JSON.stringify(tasks));
}

// TIMER
let time = 1500;
let timer = null;

const timerDisplay = document.getElementById("timerdisplay");
const startTimer = document.getElementById("startTimer");
const resetTimer = document.getElementById("resetTimer");

function updateTimer(){
let minutes = Math.floor(time/60);
let seconds = time % 60;
seconds = seconds < 10 ? "0"+seconds : seconds;
timerDisplay.textContent = minutes + ":" + seconds;
}

startTimer.addEventListener("click", function(){
if(timer !== null) return;

timer = setInterval(()=>{
if(time>0){
time--;
updateTimer();
}else{
clearInterval(timer);
timer=null;
alert("⏰ Time's up! Take a break!");
}
},1000);
});

resetTimer.addEventListener("click", function(){
clearInterval(timer);
timer=null;
time=1500;
updateTimer();
});

updateTimer();

// MOTIVATION
const quotes=[
"Believe you can and you're halfway there.",
"Your only limit is your mind.",
"Push yourself because no one else will do it for you.",
"Dream big. Start small. Act now.",
"Focus on progress, not perfection.",
"Small steps every day lead to big results.",
"Success is the sum of small efforts repeated daily."
];

const quoteText = document.getElementById("quote");
const motivationBtn = document.getElementById("btn");

motivationBtn.addEventListener("click", function(){
const random = Math.floor(Math.random()*quotes.length);
quoteText.textContent = quotes[random];
});

// NOTES
const notes = document.getElementById("notes");

notes.value = localStorage.getItem("notes") || "";

notes.addEventListener("input", function(){
localStorage.setItem("notes", notes.value);
});

// DARK MODE
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function(){
document.body.classList.toggle("dark-mode");
});