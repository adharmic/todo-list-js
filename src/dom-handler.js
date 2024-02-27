// Should have a list of projects
// Should have access to the storage manager
// Required methods:
// 1. Populate sidebar with projects
// 2. Redraw main section with todo items when project is selected (using index)
// 3. Draw individual todo item card (color based on prio)
// 4. Draw individual project list items
// 5. Draw modal for creating new todo list
// 6. Draw

// When project is deleted/created -> update local storage, redraw sidebar
// When todo item is deleted/created/updated -> update local storage, redraw main view

class DOMHandler  {
    constructor(storageManager) {
        this._storageManager = storageManager;
        
        // DOM element for list of projects
        this._projectList = document.querySelector('.groups');

        // DOM element for list of todo items
        this._todoItems = document.querySelector('.main-content');

        // Open first project in list
        this.renderProjectList();
        this.openProject(0);
    }

    renderProjectList() {
        // TODO: Figure out best way to append multiple children to DOM element
        this._storageManager._projects.forEach(project => {
            let projectElem = document.createElement('li');
            projectElem.textContent = project._name;
            this._projectList.appendChild(projectElem);
        });
    }

    openProject(index) {
        let currProjItems = this._storageManager._projects[index]._items;
        console.log(currProjItems);

        // Loop through todo items in currProj
        currProjItems.forEach(item => {
            this._todoItems.appendChild(this.getTodoElement(item));
        });
    }

    getTodoElement(item) {
        let itemCard = document.createElement('div');
        itemCard.textContent = item._title;
        return itemCard;
    }

};

export default DOMHandler;