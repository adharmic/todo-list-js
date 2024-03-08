// TODO: 
// Implement priority system
// Implement completion system
// Color list items based on priority

import TodoItem from "./todo-item";
import TodoProject from "./todo-project";

class DOMHandler {
    constructor(storageManager) {
        this.storageManager = storageManager;

        // DOM element for list of projects
        this.projectListElem = document.querySelector('.groups');

        // DOM element for list of todo items
        this.todoItemsElem = document.querySelector('.todo-items');

        this.currentProject = 0;

        // Open first project in list
        this.renderProjectList();
        this.openProject(this.currentProject);
        document.querySelector('.project-item')?.classList.add('selected-project');
    }

    renderProjectList() {
        let addProjectButton = document.querySelector('.add-project-header');
        addProjectButton.onclick = (e) => {
            this.showProjectModal(null);
        }

        this.projectListElem.replaceChildren();
        let i = 0;

        for (let i = 0; i < this.storageManager.projects.length; i++) {
            let projectElem = document.createElement('li');
            projectElem.classList.add('project-item');

            let projectNameElem = document.createElement('h2');
            projectNameElem.textContent = this.storageManager.projects[i].name;

            let projectButtons = document.createElement('div');
            projectButtons.classList.add('project-buttons');

            let editProjectButton = document.createElement('div');
            editProjectButton.classList.add("project-button");

            let editProjectIcon = document.createElement('i');
            editProjectIcon.classList.add("fa");
            editProjectIcon.classList.add("fa-pencil")

            editProjectButton.appendChild(editProjectIcon);

            editProjectButton.onclick = (e) => {
                e.stopPropagation();
                this.showProjectModal(i);
            }

            let deleteProjectButton = document.createElement('div');
            deleteProjectButton.classList.add("project-button");

            let deleteProjectIcon = document.createElement('i');
            deleteProjectIcon.classList.add("fa");
            deleteProjectIcon.classList.add("fa-trash");

            deleteProjectButton.appendChild(deleteProjectIcon);

            deleteProjectButton.onclick = (e) => {
                e.stopPropagation();
                this.storageManager.projects.splice(i, 1);
                this.storageManager.updateLocalStorage();
                this.renderProjectList();
                this.openProject(0);
            }

            projectButtons.appendChild(editProjectButton);
            projectButtons.appendChild(deleteProjectButton);

            // projectElem.appendChild(editProjectButton);
            // projectElem.appendChild(deleteProjectButton);
            projectElem.appendChild(projectButtons);
            projectElem.appendChild(projectNameElem);

            projectElem.onclick = () => {
                document.querySelector('.selected-project')?.classList.remove('selected-project');
                this.openProject(i);
                projectElem.classList.add('selected-project');
            }

            this.projectListElem.appendChild(projectElem);
        }
    }

    openProject(index) {
        // Remove active project class from previous project

        // Add active projcet class to newly opened project

        this.currentProject = index;
        this.todoItemsElem.replaceChildren();
        let currProjItems = this.storageManager.projects[index]?.items;

        let titleElem = document.querySelector('.project-title');
        titleElem.textContent = this.storageManager.projects[index]?.name;

        let addItemButton = document.querySelector('.taskbar');
        addItemButton.onclick = (e) => {
            this.showTodoModal(null, this.storageManager.projects[this.currentProject]?.items);
        }

        // Loop through todo items in currProj
        for (let i = 0; i < currProjItems.length; i++) {
            this.todoItemsElem.appendChild(this.getTodoElement(currProjItems[i], i));
        }
    }

    getTodoElement(item, index) {
        let itemCard = document.createElement('div');
        itemCard.classList.add('todo-item');

        let prioIndicator = document.createElement('div');
        prioIndicator.classList.add('prio-indicator');
        
        if (item.prio == 1) {
            prioIndicator.classList.add('prio1-indicator');
        }
        if (item.prio == 2) {
            prioIndicator.classList.add('prio2-indicator');
        }
        if (item.prio == 3) {
            prioIndicator.classList.add('prio3-indicator');
        }

        let completedCheck = document.createElement("input");
        completedCheck.setAttribute('type', 'checkbox');
        completedCheck.classList.add('completed-checkbox');

        completedCheck.onclick = (e) => {
            let currProjItems = this.storageManager.projects[this.currentProject]?.items;
            item.completed = completedCheck.checked;
            currProjItems[index] = item;
            this.storageManager.updateLocalStorage();
            this.openProject(this.currentProject);
            // itemCard.classList.add('completed-todo');
        }

        completedCheck.checked = item.completed;
        if (item.completed) {
            itemCard.classList.add('completed-todo');
        }

        let itemTitle = document.createElement('h2');
        itemTitle.textContent = item.title;
        itemTitle.classList.add('item-title-text');

        let itemDesc = document.createElement('h2');
        itemDesc.textContent = item.desc;

        let dueDate = document.createElement('h2');
        dueDate.textContent = item.dueDate;
        dueDate.classList.add('due-date-text');

        let itemActions = document.createElement('div');
        itemActions.classList.add('item-actions');

        let editItemButton = document.createElement('div');
        editItemButton.classList.add("project-button");

        let editItem = document.createElement('i');
        editItem.classList.add('fa');
        editItem.classList.add('fa-pencil');
        editItemButton.onclick = (e) => {
            this.showTodoModal(index, this.storageManager.projects[this.currentProject].items);
            console.log(`editing item ${index}`);
        }

        editItemButton.appendChild(editItem);

        let deleteItemButton = document.createElement('div');
        deleteItemButton.classList.add("project-button");

        let deleteItem = document.createElement('i');
        deleteItem.classList.add('fa');
        deleteItem.classList.add('fa-trash');
        deleteItemButton.onclick = (e) => {
            this.storageManager.projects[this.currentProject].items.splice(index, 1);
            this.openProject(this.currentProject);
            this.storageManager.updateLocalStorage();
        }

        deleteItemButton.appendChild(deleteItem);

        itemActions.appendChild(editItemButton);
        itemActions.appendChild(deleteItemButton);

        itemCard.appendChild(prioIndicator);
        itemCard.appendChild(completedCheck);
        itemCard.appendChild(itemTitle);
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
        let prioBox1 = document.querySelector('#prio1');
        let prioBox2 = document.querySelector('#prio2');
        let prioBox3 = document.querySelector('#prio3');
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
            notesBox.value = currTodo.notes;

            console.dir(prioBox1);

            switch (currTodo.prio) {
                case 1:
                    prioBox1.checked = true;
                    break;
                case 2:
                    prioBox2.checked = true;
                    break;
                case 3:
                    prioBox3.checked = true;
                    break;

                default:
                    break;
            }

            submit.onclick = (e) => {
                // TODO: VALIDATE ENTRY
                e.preventDefault();
                currTodo.title = nameBox.value;
                currTodo.desc = descBox.value;
                currTodo.dueDate = dateBox.value;
                currTodo.notes = notesBox.value;

                if (prioBox1.checked) {
                    currTodo.prio = 1;
                }

                if (prioBox2.checked) {
                    currTodo.prio = 2;
                }

                if (prioBox3.checked) {
                    currTodo.prio = 3;
                }

                this.storageManager.updateLocalStorage();
                this.openProject(this.currentProject);
                this.hideTodoModal();
            };
        }
        else {
            nameBox.value = "";
            descBox.value = "";
            dateBox.value = "";
            notesBox.value = "";
            prioBox1.checked = 0;
            prioBox2.checked = 0;
            prioBox3.checked = 0;
            submit.onclick = (e) => {
                // TODO: VALIDATE ENTRY
                e.preventDefault();
                let prio = 0;
                if (prioBox1.checked) {
                    prio = 1;
                }
    
                if (prioBox2.checked) {
                    prio = 2;
                }
    
                if (prioBox3.checked) {
                    prio = 3;
                }
                let newTodo = new TodoItem(nameBox.value, descBox.value, dateBox.value, prio, notesBox.value);
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

        let modal = document.querySelector('.modal-wrapper');
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
                // this.openProject(this.currentProject);
                if (index == this.currentProject) {
                    let titleText = document.querySelector('.project-title');
                    titleText.textContent = projectBox.value;
                }
                this.hideProjectModal();
            }
        }
        else {
            projectBox.value = "";
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

        let modal = document.querySelector('.modal-wrapper');
        modal.classList.add('hidden');
    }
};

export default DOMHandler;