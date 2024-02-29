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
    } 
}

export default TodoItem;