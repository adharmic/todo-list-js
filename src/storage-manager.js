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
            this._projects = starterProjects;
            localStorage.setItem("projects", JSON.stringify(starterProjects));
        }
        else {
            // Localstorage found, so load it!
            this._projects = JSON.parse(localStorage.getItem("projects"));
        }
    }

    get projects() {
        return this._projects;
    }
}

export default StorageManager;  