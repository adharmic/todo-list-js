class TodoProject {
    constructor(items) {
        this._items = items;
    }

    get items() {
        return this._items;
    }

    set items(newItems) {
        this._items = newItems;
    }
}

export default TodoProject;