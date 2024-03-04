// TODO: 
// Implement priority system
// Implement completion system
// Color list items based on priority

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

        this.renderAddProjectButton();

        for (let i = 0; i < this.storageManager.projects.length; i++) {
            let projectElem = document.createElement('li');
            projectElem.classList.add('project-item');

            let projectNameElem = document.createElement('h2');
            projectNameElem.textContent = this.storageManager.projects[i].name;

            let editProjectButton = document.createElement('button');
            editProjectButton.textContent = "Edit";

            editProjectButton.onclick = (e) => {
                e.stopPropagation();
                this.showProjectModal(i);
            }

            let deleteProjectButton = document.createElement('button');
            deleteProjectButton.textContent = "Delete";

            deleteProjectButton.onclick = (e) => {
                e.stopPropagation();
                this.storageManager.projects.splice(i, 1);
                this.storageManager.updateLocalStorage();
                this.renderProjectList();
                this.openProject(0);
            }

            projectElem.appendChild(projectNameElem);
            projectElem.appendChild(editProjectButton);
            projectElem.appendChild(deleteProjectButton);

            projectElem.onclick = () => {
                this.openProject(i);
            }

            this.projectListElem.appendChild(projectElem);
        }
    }

    renderAddProjectButton() {
        // Open modal, but for now just add dummy project
        let addProjectButton = document.createElement('li');
        addProjectButton.textContent = "Add Project";
        addProjectButton.classList.add('add-project');
        addProjectButton.onclick = () => {
            this.showProjectModal();
        }

        this.projectListElem.appendChild(addProjectButton);
    }

    openProject(index) {
        // Remove active project class from previous project

        // Add active projcet class to newly opened project

        this.currentProject = index;
        this.todoItemsElem.replaceChildren();
        let currProjItems = this.storageManager.projects[index]?.items;

        let listHeader = document.createElement('div');
        listHeader.classList.add('list-header');

        let titleElem = document.createElement('h1');
        titleElem.textContent = this.storageManager.projects[index]?.name;

        listHeader.appendChild(titleElem);

        let addItemButton = document.createElement('button');
        addItemButton.textContent = "Add Item";
        addItemButton.onclick = (e) => {
            // Show todo modal
            this.showTodoModal(null, this.storageManager.projects[this.currentProject]?.items);
        }

        listHeader.appendChild(addItemButton);

        this.todoItemsElem.appendChild(listHeader);

        // Loop through todo items in currProj
        for (let i = 0; i < currProjItems.length; i++) {
            this.todoItemsElem.appendChild(this.getTodoElement(currProjItems[i], i));
        }
    }

    getTodoElement(item, index) {
        let itemCard = document.createElement('div');
        itemCard.classList.add('todo-item');

        let itemTitle = document.createElement('h2');
        itemTitle.textContent = item.title;

        let itemDesc = document.createElement('h2');
        itemDesc.textContent = item.desc;

        let dueDate = document.createElement('h2');
        dueDate.textContent = item.dueDate;

        let itemActions = document.createElement('div');

        let editItem = document.createElement('button');
        editItem.textContent = "Edit";
        editItem.onclick = (e) =>{
            this.showTodoModal(index, this.storageManager.projects[this.currentProject].items);
            console.log(`editing item ${index}`);
        }

        let deleteItem = document.createElement('button');
        deleteItem.textContent = "Delete";
        deleteItem.onclick = (e) => {
            this.storageManager.projects[this.currentProject].items.splice(index, 1);
            this.openProject(this.currentProject);
            this.storageManager.updateLocalStorage();
        }

        itemActions.appendChild(editItem);
        itemActions.appendChild(deleteItem);

        itemCard.appendChild(itemTitle);
        itemCard.appendChild(itemDesc);
        itemCard.appendChild(dueDate);
        itemCard.appendChild(itemActions);

        return itemCard;
    }

    hideTodoModal() {
        let overlay = document.querySelector('.overlay');
        overlay.classList.add('hidden');

        let modal = document.querySelector('.new-item-modal');
        modal.classList.add('hidden');
    }

    showTodoModal(index = null, items) {
        let overlay = document.querySelector('.overlay');
        overlay.classList.remove('hidden');

        let modal = document.querySelector('.new-item-modal');
        modal.classList.remove('hidden');
        
        let nameBox = document.querySelector('#item-name');
        let descBox = document.querySelector('#item-desc');
        let dateBox = document.querySelector('#item-date');
        let prioBox = document.querySelector('#item-prio');
        let notesBox = document.querySelector('#item-notes');

        let submit = document.querySelector('#todo-submit');
        let cancel = document.querySelector('#todo-cancel');

        cancel.onclick = (e) => {
            e.preventDefault();
            this.hideTodoModal();
        }

        if (index !== null) {
            let currTodo = items[index];
            nameBox.value = currTodo.title;
            descBox.value = currTodo.desc;
            dateBox.value = currTodo.dueDate;
            prioBox.value = currTodo.prio;
            notesBox.value = currTodo.notes;
        
            submit.onclick = (e) => {
                // TODO: VALIDATE ENTRY
                e.preventDefault();
                currTodo.title = nameBox.value;
                currTodo.desc = descBox.value;
                currTodo.dueDate = dateBox.value;
                currTodo.prio = prioBox.value;
                currTodo.notes = notesBox.value;

                this.storageManager.updateLocalStorage();
                this.openProject(this.currentProject);
                this.hideTodoModal();
            };
        }
        else {
            submit.onclick = (e) => {
                // TODO: VALIDATE ENTRY
                e.preventDefault();
                let newTodo = new TodoItem(nameBox.value, descBox.value, dateBox.value, prioBox.value, notesBox.value);
                items.unshift(newTodo);
                this.openProject(this.currentProject);
                this.storageManager.updateLocalStorage();
                this.hideTodoModal();
            }
        }
    }

    showProjectModal(index = null) {
        let overlay = document.querySelector('.overlay');
        overlay.classList.remove('hidden');

        let modal = document.querySelector('.new-project-modal');
        modal.classList.remove('hidden');

        let projectBox = document.querySelector('#project-name');
        let submit = document.querySelector('#project-submit');
        let cancel = document.querySelector('#project-cancel');

        cancel.onclick = (e) => {
            e.preventDefault();
            this.hideProjectModal();
        }

        if (index !== null) {
            projectBox.value = this.storageManager.projects[index].name;

            submit.onclick = (e) => {
                // TODO: VALIDATE ENTRY
                e.preventDefault();

                this.storageManager.projects[index].name = projectBox.value;
                this.storageManager.updateLocalStorage();
                this.renderProjectList();
                this.hideProjectModal();
            }
        }
        else {
            submit.onclick = (e) => {
                // TODO: VALIDATE ENTRY
                e.preventDefault();

                this.storageManager.projects.push(new TodoProject(projectBox.value, []));
                this.storageManager.updateLocalStorage();
                this.renderProjectList();
                this.hideProjectModal();
                this.openProject(this.storageManager.projects.length - 1);
            }
        }
    }

    hideProjectModal() {
        let overlay = document.querySelector('.overlay');
        overlay.classList.add('hidden');

        let modal = document.querySelector('.new-project-modal');
        modal.classList.add('hidden');
    }

};

export default DOMHandler;