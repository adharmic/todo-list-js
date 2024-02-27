class TodoProject {
    constructor(name, items) {
        this._name = name;
        this._items = items;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    get items() {
        return this._items;
    }

    set items(newItems) {
        this._items = newItems;
    }
}

export default TodoProject;