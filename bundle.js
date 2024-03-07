/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _defaultItems_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
// Handle storage and retrieval from localstorage.
// Should also handle current list of projects
// Required methods:
// 1.  



class StorageManager {
    constructor() {
        // Check localstorage for project list
        if  (localStorage.getItem("projects") === null) {
            // No localstorage, so load default data
            this.projects = _defaultItems_json__WEBPACK_IMPORTED_MODULE_0__;
            localStorage.setItem("projects", JSON.stringify(_defaultItems_json__WEBPACK_IMPORTED_MODULE_0__));
        }
        else {
            // Localstorage found, so load it!
            this.projects = JSON.parse(localStorage.getItem("projects"));
        }
    }

    updateLocalStorage() {
        localStorage.setItem("projects", JSON.stringify(this.projects));
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StorageManager);  

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"name":"My Day","items":[{"title":"Be Silly!","desc":"reach 500 silliness points","dueDate":"2024-03-12","prio":2,"notes":"Try doing something wacky"},{"title":"Be GOOFY!","desc":"reach 500 goofiness points","dueDate":"2024-03-09","prio":2,"notes":"Try doing something spontaneous"}]},{"name":"Grocery","items":[{"title":"Eggs","desc":"Buy a dozen brown eggs","dueDate":"2024-03-08","prio":2,"notes":"HEB"},{"title":"Milk","desc":"Buy 2% milk, store brand","dueDate":"2024-03-28","prio":2,"notes":"Make sure we have 2 weeks before expiry"}]}]');

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todo_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _todo_project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
// TODO: 
// Implement priority system
// Implement completion system
// Color list items based on priority




class DOMHandler  {
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
    }

    renderProjectList() {
        let addProjectButton = document.querySelector('.add-project-button');
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
                this.openProject(i);
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

        let taskText = document.querySelector('.task-text');
        taskText.textContent = 'Tasks';

        let addItemButton = document.querySelector('.add-item-button');
        // addItemButton.textContent = "Add Item";
        addItemButton.onclick = (e) => {
        //     // Show todo modal
            this.showTodoModal(null, this.storageManager.projects[this.currentProject]?.items);
        }

        // listHeader.appendChild(addItemButton);

        // this.todoItemsElem.appendChild(listHeader);

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
        editItem.onclick = (e) => {
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
                let newTodo = new _todo_item__WEBPACK_IMPORTED_MODULE_0__["default"](nameBox.value, descBox.value, dateBox.value, prioBox.value, notesBox.value);
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
                // this.openProject(this.currentProject);
                if (index == this.currentProject) {
                    let titleText = document.querySelector('.project-title');
                    titleText.textContent = projectBox.value;
                }
                this.hideProjectModal();
            }
        }
        else {
            submit.onclick = (e) => {
                // TODO: VALIDATE ENTRY
                e.preventDefault();

                this.storageManager.projects.push(new _todo_project__WEBPACK_IMPORTED_MODULE_1__["default"](projectBox.value, []));
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMHandler);

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// To-do item should have:
// title: name of to-do item
// desc: what needs to be done to complete the todo
// dueDate: when the to-do item should be done
// priority: how important this item is compared to others
// -- let's do 3 prio levels: low, medium, high.
// -- Medium prio should be default
// notes: added details for the to-do item
// checklist: ???

class TodoItem {
    constructor(title, desc, dueDate, prio = 1, notes = "") {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.prio = prio;
        this.notes = notes;
        this.completed = false;
    } 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoItem);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TodoProject {
    constructor(name, items) {
        this.name = name;
        this.items = items;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoProject);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storage_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _dom_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _todo_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _todo_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);






const storageManager = new _storage_manager__WEBPACK_IMPORTED_MODULE_0__["default"]();
const domHandler = new _dom_handler__WEBPACK_IMPORTED_MODULE_1__["default"](storageManager); 

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
    let testItem = new _todo_item__WEBPACK_IMPORTED_MODULE_2__["default"]("Be Silly!", "reach 500 silliness points", "tomorrow", 2, "Try doing something wacky");
    let testItem2 = new _todo_item__WEBPACK_IMPORTED_MODULE_2__["default"]("Be GOOFY!", "reach 500 goofiness points", "thursday", 2, "Try doing something spontaneous");
    let testItems = [testItem, testItem2];
    let testProject = new _todo_project__WEBPACK_IMPORTED_MODULE_3__["default"]("My Day", testItems);
    projects.push(testProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    console.log(JSON.stringify(projects));
}

// createTestData();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map