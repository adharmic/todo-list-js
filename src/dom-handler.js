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

class DOMHandler  {
    constructor(storageManager) {
        this._storageManager = storageManager;
        
        // DOM element for list of projects
        this._projectList = document.querySelector('.groups');

        // DOM element for list of todo items
        this._todoItems = document.querySelector('.main-content');

        this._currentProject = 0;

        // Open first project in list
        this.renderProjectList();
        this.openProject(this._currentProject);
    }

    renderProjectList() {
        // TODO: Figure out best way to append multiple children to DOM element
        this._projectList.replaceChildren();
        let i = 0;
        for (let i = 0; i < this._storageManager._projects.length; i++) {
            let projectElem = document.createElement('li');
            projectElem.textContent = this._storageManager._projects[i]._name;

            projectElem.onclick = () => {
                this.openProject(i);
            }

            this._projectList.appendChild(projectElem);
        }
    }

    openProject(index) {
        this._currentProject = index;
        this._todoItems.replaceChildren();
        let currProjItems = this._storageManager._projects[index]._items;
        console.log(currProjItems);

        // Loop through todo items in currProj
        currProjItems.forEach(item => {
            this._todoItems.appendChild(this.getTodoElement(item));
        });

        this.renderAddItemButton();
    }

    renderAddItemButton() {
        let addItemButton = document.createElement('button');
        addItemButton.textContent = "Add Item";
        addItemButton.onclick = () => {
            // Show todo modal

            // For now, just insert a dummy value
            let testItem2 = new TodoItem("Be GOOFY!", "reach 500 goofiness points", "thursday", 2, "Try doing something spontaneous");
            this._storageManager._projects[this._currentProject]._items.push(testItem2);
            this.openProject(this._currentProject);
            this._storageManager.updateLocalStorage();
        }

        this._todoItems.appendChild(addItemButton);
    }

    getTodoElement(item) {
        let itemCard = document.createElement('div');
        itemCard.textContent = item._title;
        return itemCard;
    }

};

export default DOMHandler;