class TodoList {
    constructor() {
        this.tasks = [];
    }

    
    createTask(task) {
        this.tasks.push(task);
    }

    
    editTask(index, updatedTask) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks[index] = updatedTask;
        } else {
            console.log("Invalid index.");
        }
    }

    
    deleteTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        } else {
            console.log("Invalid index.");
        }
    }

    
    updateTaskStatus(index, status) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks[index].status = status;
        } else {
            console.log("Invalid index.");
        }
    }
}


const todoList = new TodoList();


todoList.createTask({ task: "Task 1", status: "Pending" });
todoList.createTask({ task: "Task 2", status: "Pending" });
todoList.createTask({ task: "Task 3", status: "Pending" });

console.log("Initial tasks:", todoList.tasks);


todoList.editTask(0, { task: "Updated Task 1", status: "Pending" });

console.log("After editing task:", todoList.tasks);


todoList.deleteTask(1);

console.log("After deleting task:", todoList.tasks);


todoList.updateTaskStatus(0, "Completed");

console.log("After updating task status:", todoList.tasks);