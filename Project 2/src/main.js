import "./style.css";
import { welcomeMessage, goals, knownSkills, newSkills, projects } from "./data.js";

//set the welcome message at the top
document.getElementById("welcome-msg").textContent = welcomeMessage;

//build the goals list from the array
let goalsList = document.getElementById("goals-list");

for (let i = 0; i < goals.length; i++) {
    let li = document.createElement("li");
    li.textContent = goals[i];
    goalsList.appendChild(li);
}

//fill in known skills list
let knownList = document.getElementById("known-skills-list");

for (let i = 0; i < knownSkills.length; i++) {
    let li = document.createElement("li");
    li.textContent = knownSkills[i];
    knownList.appendChild(li);
}

//fill in skills i want to learn
let newList = document.getElementById("new-skills-list");

for (let i = 0; i < newSkills.length; i++) {
    let li = document.createElement("li");
    li.textContent = newSkills[i];
    newList.appendChild(li);
}

//build the project cards from the projects array
let cardsContainer = document.getElementById("project-cards");

for (let i = 0; i < projects.length; i++) {
    let project = projects[i];

    let card = document.createElement("div");
    card.className = "project-card";

    //add a class based on status so it can color it differently
    if (project.status === "Done") {
        card.classList.add("card-done");
    } else {
        card.classList.add("card-pending");
    }

    let title = document.createElement("h3");
    title.textContent = project.title;
    card.appendChild(title);

    let desc = document.createElement("p");
    desc.textContent = project.description;
    card.appendChild(desc);

    let statusTag = document.createElement("span");
    statusTag.className = "status-tag";
    statusTag.textContent = project.status;
    card.appendChild(statusTag);

    cardsContainer.appendChild(card);
}
