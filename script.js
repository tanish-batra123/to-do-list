let inputbox = document.querySelector(".input-box");
let list = document.querySelector(".list");
let btn = document.querySelector(".btn");

btn.addEventListener("click", addtask);

function addtask() {
    if (inputbox.value.trim() === "") {
        alert("You should write something");
    } else {
        let li = document.createElement("li");
        li.textContent = inputbox.value;

        
        li.addEventListener("click", function () {
            li.classList.toggle("completed");
            savedata();
        });

        let remove = document.createElement("button");
        remove.textContent = "❌";
        remove.style.marginLeft = "10px";
        remove.style.cursor = "pointer";

        remove.addEventListener("click", () => {
            li.remove();
            savedata();
        });

        li.appendChild(remove);
        list.appendChild(li);
        inputbox.value = "";
        savedata();
    }
}

function savedata() {
    let tasks = [];
    document.querySelectorAll(".list li").forEach((li) => {
        tasks.push({
            text: li.childNodes[0].textContent, 
            completed: li.classList.contains("completed") 
        });
    });
    localStorage.setItem("data", JSON.stringify(tasks));
}

function loaddata() {
    let tasks = JSON.parse(localStorage.getItem("data")) || [];

    list.innerHTML = ""; 
    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function () {
            li.classList.toggle("completed");
            savedata();
        });

        let remove = document.createElement("button");
        remove.textContent = "❌";
        remove.style.marginLeft = "10px";
        remove.style.cursor = "pointer";

        remove.addEventListener("click", () => {
            li.remove();
            savedata();
        });

        li.appendChild(remove);
        list.appendChild(li);
    });
}

loaddata();
