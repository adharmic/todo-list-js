import StorageManager from "./storage-manager";
import DOMHandler from "./dom-handler";

import TodoItem from "./todo-item";
import TodoProject from "./todo-project";

const storageManager = new StorageManager();
const domHandler = new DOMHandler(storageManager); 

function startApp() {
    const element = document.createElement('div');

    element.innerHTML = 'Hello!!';

    return element;

    // Loop through JSON to populate projects and list items
    // What project should open by default?

    // Create DOM Handler. If localstorage has data, use that as projectList. If not, use defaultItems.
}

// startApp();

function createTestData() {
    let projects = [];
    let testItem = new TodoItem("Be Silly!", "reach 500 silliness points", "tomorrow", 2, "Try doing something wacky");
    let testItem2 = new TodoItem("Be GOOFY!", "reach 500 goofiness points", "thursday", 2, "Try doing something spontaneous");
    let testItems = [testItem, testItem2];
    let testProject = new TodoProject("My Day", testItems);
    projects.push(testProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    console.log(JSON.stringify(projects));
}

// createTestData();