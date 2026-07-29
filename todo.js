/**
 * Task 5.2: Dynamic To-Do Application Engine
 * Spawns structural DOM list items and applies custom modifiers.
 */
function addTaskItem() {
  const inputElement = document.getElementById("taskInput");
  const taskText = inputElement.value.trim();
  const listContainer = document.getElementById("taskList");

  // Block processing if the input is empty
  if (taskText === "") {
    alert("Please write a task description before attempting to add.");
    return;
  }

  // 1. Build the wrapper <li> element container
  const liNode = document.createElement("li");
  liNode.className = "task-list-node";

  // 2. Build the task text description container <span>
  const textSpan = document.createElement("span");
  textSpan.className = "task-label-string";
  textSpan.textContent = taskText;

  // 3. Build the action status toggle <button>
  const doneButton = document.createElement("button");
  doneButton.type = "button";
  doneButton.className = "btn-toggle-done";
  doneButton.textContent = "Done";

  // Attach click listener for toggling completion states
  doneButton.onclick = function () {
    liNode.classList.toggle("completed-state");
  };

  // Assemble the DOM fragments into the tree
  liNode.appendChild(textSpan);
  liNode.appendChild(doneButton);
  listContainer.appendChild(liNode);

  // Reset the input box value and focus state cleanly
  inputElement.value = "";
  inputElement.focus();
}

// Enable pressing the 'Enter' key inside the input to trigger task addition
document
  .getElementById("taskInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTaskItem();
    }
  });
