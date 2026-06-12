//primed up empty assignments array that will be filled when assignments are added
let assignments = [];

//keeps track of what view its on and what week/month its looking at
let currentView = "week";
let focusDate = new Date();

//filters
let filterStatus = "all";
let filterClass = "all";

//const vars--------------------------------
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const assignmentForm = document.getElementById("assignment-form");
const taskTitleInput = document.getElementById("task-title");
const taskClassInput = document.getElementById("task-class");
const taskDateInput = document.getElementById("task-date");
const taskColorInput = document.getElementById("task-color");
const errorMessage = document.getElementById("error-message");

const statCompletedEl = document.getElementById("stat-completed");
const statNotDoneEl = document.getElementById("stat-not-done");
const statOverdueEl = document.getElementById("stat-overdue");

const calendarViewWindow = document.getElementById("calendar-view-window");
const calendarTitleLabel = document.getElementById("calendar-title-label");
const navControlsBox = document.getElementById("nav-controls-box");

const viewWeekBtn = document.getElementById("view-week-btn");
const viewMonthBtn = document.getElementById("view-month-btn");
const viewAgendaBtn = document.getElementById("view-agenda-btn");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const filterStatusEl = document.getElementById("filter-status");
const filterClassEl = document.getElementById("filter-class");
//--------------------------------

//this runs every time anything changes. updates the whole page from the data
function renderApp() {
    //save to localStorage so it doesn't disappear on refresh
    localStorage.setItem("savedAssignments", JSON.stringify(assignments));

    let today = new Date().toISOString().split('T')[0];

    //update the stats at the top
    let doneCount = 0;
    let notDoneCount = 0;
    let overdueCount = 0;

    for (let i = 0; i < assignments.length; i++) {
        if (assignments[i].completed) {
            doneCount++;
        } else {
            notDoneCount++;
            //check if the assginment is overdue
            if (assignments[i].dueDate != "" && assignments[i].dueDate < today) {
                overdueCount++;
            }
        }
    }

    statCompletedEl.textContent = doneCount;
    statNotDoneEl.textContent = notDoneCount;
    statOverdueEl.textContent = overdueCount;

    //update the class filter dropdown so new classes show up
    updateClassDropdown();

    //switch between views
    viewWeekBtn.classList.remove("active");
    viewMonthBtn.classList.remove("active");
    viewAgendaBtn.classList.remove("active");
    navControlsBox.style.display = "flex";

    if (currentView === "week") {
        viewWeekBtn.classList.add("active");
        showWeekView(today);
    } else if (currentView === "month") {
        viewMonthBtn.classList.add("active");
        showMonthView();
    } else {
        viewAgendaBtn.classList.add("active");
        navControlsBox.style.display = "none";
        showAgendaView(today);
    }
}

//returns only the assignments that match the current filters
function getFilteredList() {
    let today = new Date().toISOString().split('T')[0];
    let result = [];

    for (let i = 0; i < assignments.length; i++) {
        let task = assignments[i];

        //check status filter
        if (filterStatus === "completed" && !task.completed) continue;
        if (filterStatus === "not-done" && task.completed) continue;
        if (filterStatus === "overdue" && (task.completed || task.dueDate === "" || task.dueDate >= today)) continue;

        //check class filter
        if (filterClass !== "all" && task.class !== filterClass) continue;

        result.push(task);
    }

    return result;
}

//rebuilds the class filter dropdown based on whats currently in the list
function updateClassDropdown() {
    let saved = filterClassEl.value;
    let classes = [];

    for (let i = 0; i < assignments.length; i++) {
        if (classes.indexOf(assignments[i].class) === -1) {
            classes.push(assignments[i].class);
        }
    }

    filterClassEl.innerHTML = '<option value="all">All Classes</option>';

    for (let i = 0; i < classes.length; i++) {
        let opt = document.createElement("option");
        opt.value = classes[i];
        opt.textContent = classes[i];
        filterClassEl.appendChild(opt);
    }

    if (saved !== "all") {
        filterClassEl.value = saved;
    }
}

//builds a small task block for the calendar cells
function buildMiniTask(task) {
    let div = document.createElement("div");
    div.className = "calendar-mini-task";
    div.style.backgroundColor = task.color;

    if (task.completed) {
        div.classList.add("completed-task");
    }

    let titleSpan = document.createElement("span");
    titleSpan.className = "mini-task-title";
    titleSpan.textContent = task.title + " - " + task.class;
    div.appendChild(titleSpan);

    //buttons to mark done or delete from the calendar
    let btnRow = document.createElement("div");
    btnRow.className = "mini-task-actions";

    let doneBtn = document.createElement("button");
    doneBtn.textContent = task.completed ? "Undo" : "Done";
    doneBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        toggleComplete(task.id);
    });

    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        deleteAssignment(task.id);
    });

    btnRow.appendChild(doneBtn);
    btnRow.appendChild(delBtn);
    div.appendChild(btnRow);

    return div;
}





//---------------------------------
//WEEK VIEW
function showWeekView(today) {
    calendarViewWindow.innerHTML = "";

    let focus = new Date(focusDate);
    let dayIndex = focus.getDay();
    let sunday = new Date(focus);
    sunday.setDate(focus.getDate() - dayIndex);

    let saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);

    calendarTitleLabel.textContent = (sunday.getMonth() + 1) + "/" + sunday.getDate() + " - " + (saturday.getMonth() + 1) + "/" + saturday.getDate();

    //day name headers
    let headers = document.createElement("div");
    headers.className = "calendar-day-headers";
    for (let i = 0; i < 7; i++) {
        let d = document.createElement("div");
        d.textContent = dayNames[i];
        headers.appendChild(d);
    }
    calendarViewWindow.appendChild(headers);

    let grid = document.createElement("div");
    grid.className = "week-grid";

    let filtered = getFilteredList();

    for (let i = 0; i < 7; i++) {
        let day = new Date(sunday);
        day.setDate(sunday.getDate() + i);
        let dayStr = day.toISOString().split('T')[0];

        let cell = document.createElement("div");
        cell.className = "week-cell";
        if (dayStr === today) {
            cell.classList.add("current-today");
        }

        let numLabel = document.createElement("div");
        numLabel.className = "cell-number-label";
        numLabel.textContent = day.getDate();
        cell.appendChild(numLabel);

        //add any tasks due that day
        for (let j = 0; j < filtered.length; j++) {
            if (filtered[j].dueDate === dayStr) {
                cell.appendChild(buildMiniTask(filtered[j]));
            }
        }

        grid.appendChild(cell);
    }

    calendarViewWindow.appendChild(grid);
}
//---------------------------------



//---------------------------------
//MONTH VIEW
function showMonthView() {
    calendarViewWindow.innerHTML = "";

    let year = focusDate.getFullYear();
    let month = focusDate.getMonth();

    calendarTitleLabel.textContent = monthNames[month] + " " + year;

    let headers = document.createElement("div");
    headers.className = "calendar-day-headers";
    for (let i = 0; i < 7; i++) {
        let d = document.createElement("div");
        d.textContent = dayNames[i];
        headers.appendChild(d);
    }
    calendarViewWindow.appendChild(headers);

    let firstDay = new Date(year, month, 1).getDay();
    let totalDays = new Date(year, month + 1, 0).getDate();

    let grid = document.createElement("div");
    grid.className = "month-grid";

    //blank cells before the 1st
    for (let i = 0; i < firstDay; i++) {
        let blank = document.createElement("div");
        blank.className = "calendar-cell empty-cell";
        grid.appendChild(blank);
    }

    let filtered = getFilteredList();

    for (let day = 1; day <= totalDays; day++) {
        let cell = document.createElement("div");
        cell.className = "calendar-cell";



        let dateStr = new Date(year, month, day).toISOString().split('T')[0];

        let numLabel = document.createElement("span");
        numLabel.className = "cell-number-label";
        numLabel.textContent = day;
        cell.appendChild(numLabel);

        for (let i = 0; i < filtered.length; i++) {
            if (filtered[i].dueDate === dateStr) {
                cell.appendChild(buildMiniTask(filtered[i]));
            }
        }

        grid.appendChild(cell);
    }

    calendarViewWindow.appendChild(grid);
}
//---------------------------------


//---------------------------------
//AGENDA VIEW
function showAgendaView(today) {
    calendarViewWindow.innerHTML = "";

    let filtered = getFilteredList();

    if (filtered.length === 0) {
        calendarViewWindow.innerHTML = "<p style='color: #777; padding: 10px;'>No assignments to show.</p>";
        return;
    }

    //get unique dates so can group by date
    let dates = [];
    for (let i = 0; i < filtered.length; i++) {
        if (dates.indexOf(filtered[i].dueDate) === -1) {
            dates.push(filtered[i].dueDate);
        }
    }

    //sort dates oldest first, undated goes at the bottom
    dates.sort(function(a, b) {
        if (a === "") return 1;
        if (b === "") return -1;
        if (a < b) return -1;
        return 1;
    });

    for (let d = 0; d < dates.length; d++) {
        let dateGroup = dates[d];

        let heading = document.createElement("div");
        heading.className = "agenda-date-heading";

        if (dateGroup === "") {
            heading.textContent = "No Due Date";
        } else if (dateGroup < today) {
            heading.textContent = "Overdue: " + dateGroup;
        } else {
            heading.textContent = "Due: " + dateGroup;
        }

        calendarViewWindow.appendChild(heading);

        let ul = document.createElement("ul");
        ul.className = "agenda-list";

        for (let i = 0; i < filtered.length; i++) {
            let task = filtered[i];
            if (task.dueDate !== dateGroup) continue;

            let li = document.createElement("li");
            li.className = "task-item";

            if (task.completed) {
                li.classList.add("completed");
            } else if (task.dueDate !== "" && task.dueDate < today) {
                li.classList.add("overdue-item");
            }

            //color bar on the left side
            let wrap = document.createElement("div");
            wrap.className = "agenda-content-wrap";

            let colorBar = document.createElement("div");
            colorBar.className = "agenda-color-bar";
            colorBar.style.backgroundColor = task.color;
            wrap.appendChild(colorBar);

            let textDiv = document.createElement("div");
            textDiv.innerHTML = '<span class="task-title-text">' + task.title + '</span><span class="task-class-tag">' + task.class + '</span>';
            wrap.appendChild(textDiv);

            li.appendChild(wrap);

            //done and remove buttons
            let btnWrap = document.createElement("div");
            btnWrap.className = "task-buttons";

            let doneBtn = document.createElement("button");
            doneBtn.textContent = task.completed ? "Undo" : "Done";
            doneBtn.className = "complete-btn";
            doneBtn.addEventListener("click", function() { toggleComplete(task.id); });
            btnWrap.appendChild(doneBtn);

            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.className = "delete-btn";
            removeBtn.addEventListener("click", function() { deleteAssignment(task.id); });
            btnWrap.appendChild(removeBtn);

            li.appendChild(btnWrap);
            ul.appendChild(li);
        }

        calendarViewWindow.appendChild(ul);
    }
}
//---------------------------------




//add a new assignment to the array
function addAssignment(title, className, dueDate, color) {
    let newTask = {
        id: Date.now(),
        title: title,
        class: className,
        dueDate: dueDate,
        color: color,
        completed: false
    };
    assignments.push(newTask);
    renderApp();
}

function toggleComplete(id) {
    for (let i = 0; i < assignments.length; i++) {
        if (assignments[i].id === id) {
            assignments[i].completed = !assignments[i].completed;
            break;
        }
    }
    renderApp();
}

function deleteAssignment(id) {
    //find the index then remove it
    for (let i = 0; i < assignments.length; i++) {
        if (assignments[i].id === id) {
            assignments.splice(i, 1);
            break;
        }
    }
    renderApp();
}

//move forward or back a week/month
function navigate(direction) {
    if (currentView === "week") {
        focusDate.setDate(focusDate.getDate() + (direction * 7));
    } else if (currentView === "month") {
        focusDate.setMonth(focusDate.getMonth() + direction);
    }
    renderApp();
}


//form submit
assignmentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let title = taskTitleInput.value.trim();
    let className = taskClassInput.value.trim();
    let dueDate = taskDateInput.value;
    let color = taskColorInput.value;

    //make sure they filled in the required fields
    if (title === "" || className === "") {
        errorMessage.textContent = "Please fill in both the assignment name and class.";
        return;
    }

    errorMessage.textContent = "";
    addAssignment(title, className, dueDate, color);

    //clear the form
    taskTitleInput.value = "";
    taskClassInput.value = "";
    taskDateInput.value = "";
    taskColorInput.value = "#3498db";
});

//view toggle buttons
viewWeekBtn.addEventListener("click", function() {
    currentView = "week";
    renderApp();
});

viewMonthBtn.addEventListener("click", function() {
    currentView = "month";
    renderApp();
});

viewAgendaBtn.addEventListener("click", function() {
    currentView = "agenda";
    renderApp();
});

prevBtn.addEventListener("click", function() { navigate(-1); });
nextBtn.addEventListener("click", function() { navigate(1); });

//filter dropdowns
filterStatusEl.addEventListener("change", function() {
    filterStatus = filterStatusEl.value;
    renderApp();
});

filterClassEl.addEventListener("change", function() {
    filterClass = filterClassEl.value;
    renderApp();
});


//load from localStorage if there is saved data
let saved = localStorage.getItem("savedAssignments");
if (saved !== null) {
    assignments = JSON.parse(saved);
} else {
    //default assignments so the page isn't empty
    assignments = [
        { id: 1, title: "Read Chapter 4", class: "Science", dueDate: "2026-06-10", color: "#e74c3c", completed: false },
        { id: 2, title: "Build HTML Layout", class: "Web Scripting II", dueDate: "2026-06-12", color: "#9b59b6", completed: true },
        { id: 3, title: "Fix Code Variables", class: "Python", dueDate: "2026-06-18", color: "#a83281", completed: false }
    ];
}

renderApp();