// Handle storage and retrieval from localstorage.
// Should also handle current list of projects
// Required methods:
// 1.  

import starterProjects from './defaultItems.json';

class StorageManager {
    constructor() {
        // Check localstorage for project list
        if  (localStorage.getItem("projects") === null) {
            // No localstorage, so load default data
            this.projects = starterProjects;
            localStorage.setItem("projects", JSON.stringify(starterProjects));
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

export default StorageManager;  