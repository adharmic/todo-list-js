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
        this._title = title;
        this._desc = desc;
        this._dueDate = dueDate;
        this._prio = prio;
        this._notes = notes;
    } 

    get title() {
        return this._title;
    }

    get desc() {
        return this._desc;
    }

    get dueDate() {
        return this._dueDate;
    }

    get prio() {
        return this._prio;
    }

    get notes() {
        return this._notes;
    }

    set title(newTitle) {
        this._title = newTitle;
    }
    
    set desc(newDesc) {
        this._desc = newDesc;
    }
    
    set dueDate(newDate) {
        this._dueDate = newDate;
    }
    
    set prio(newPrio) {
        this._prio = newPrio;
    }
    
    set notes(newNotes) {
        this._notes = newNotes;
    }
}

export default TodoItem;