// Should have a list of projects
// Should have access to the storage manager
// Required methods:
// 1. Populate sidebar with projects
// 2. Redraw main section with todo items when project is selected (using index)
// 3. Draw individual todo item card (color based on prio)
// 4. Draw individual project list items
// 5. Draw modal for creating new todo list
// -- This method should have a parameter for editing vs. creation.
// -- Editing should not create a new item and instead update an existing one.
// 6. Draw

// When project is deleted/created -> update local storage, redraw sidebar
// When todo item is deleted/created/updated -> update local storage, redraw main view

import TodoItem from "./todo-item";
import TodoProject from "./todo-project";

class DOMHandler  {
    constructor(storageManager) {
        this.storageManager = storageManager;
        
        // DOM element for list of projects
        this.projectListElem = document.querySelector('.groups');

        // DOM element for list of todo items
        this.todoItemsElem = document.querySelector('.main-content');

        this.currentProject = 0;

        // Open first project in list
        this.renderProjectList();
        this.openProject(this.currentProject);
    }

    renderProjectList() {
        // TODO: Figure out best way to append multiple children to DOM element
        this.projectListElem.replaceChildren();
        let i = 0;
        for (let i = 0; i < this.storageManager.projects.length; i++) {
            let projectElem = document.createElement('li');
            projectElem.textContent = this.storageManager.projects[i].name;

            projectElem.onclick = () => {
                this.openProject(i);
            }

            this.projectListElem.appendChild(projectElem);
        }

        this.renderAddProjectButton();
    }

    renderAddProjectButton() {
        // Open modal, but for now just add dummy project
        let addProjectButton = document.createElement('li');
        addProjectButton.textContent = "Add Project";
        addProjectButton.classList.add('add-project');
        addProjectButton.onclick = () => {
            this.storageManager.projects.push(new TodoProject("New Project", []));
            this.storageManager.updateLocalStorage();
            this.renderProjectList();
            this.openProject(this.storageManager.projects.length - 1);
        }

        this.projectListElem.appendChild(addProjectButton);
    }

    openProject(index) {
        // Remove active project class from previous project

        // Add active projcet class to newly opened project

        this.currentProject = index;
        this.todoItemsElem.replaceChildren();
        let currProjItems = this.storageManager.projects[index].items;
        console.log(this.storageManager.projects[index]);
        console.log(currProjItems);

        // Loop through todo items in currProj
        for (let i = 0; i < currProjItems.length; i++) {
            this.todoItemsElem.appendChild(this.getTodoElement(currProjItems[i], i));
        }

        this.renderAddItemButton();
    }

    renderAddItemButton() {
        let addItemButton = document.createElement('button');
        addItemButton.textContent = "Add Item";
        addItemButton.onclick = () => {
            // Show todo modal

            // For now, just insert a dummy value
            let testItem2 = new TodoItem("Be GOOFY!", "reach 500 goofiness points", "thursday", 2, "Try doing something spontaneous");
            this.storageManager.projects[this.currentProject].items.push(testItem2);
            this.openProject(this.currentProject);
            this.storageManager.updateLocalStorage();
        }

        this.todoItemsElem.appendChild(addItemButton);
    }

    getTodoElement(item, index) {
        let itemCard = document.createElement('div');
        itemCard.classList.add('todo-item');

        let itemTitle = document.createElement('h1');
        itemTitle.textContent = item.title;

        let itemDesc = document.createElement('h1');
        itemDesc.textContent = item.desc;

        let dueDate = document.createElement('h1');
        dueDate.textContent = item.dueDate;

        let deleteItem = document.createElement('button');
        deleteItem.textContent = "Delete";
        deleteItem.onclick = (index) => {
            console.log(this.currentProject);
            this.storageManager.projects[this.currentProject].items.splice(index, 1);
            this.openProject(this.currentProject);
            this.storageManager.updateLocalStorage();
        }

        itemCard.appendChild(itemTitle);
        itemCard.appendChild(itemDesc);
        itemCard.appendChild(dueDate);
        itemCard.appendChild(deleteItem);

        return itemCard;
    }

    showTodoModal(index = null) {

    }

};

export default DOMHandler;