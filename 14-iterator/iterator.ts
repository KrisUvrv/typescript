/* Домашнее задание - Поведенческие паттерны */

// Реализовать паттерн Iterator для массива объектов вида {id: 1, date: "01-01-2023", title: "Test"} с возможностью обхода объекта как по дате, так и по id.

class Task {
    constructor(
        public id: number,
        public date: string,
        public title: string
    ) {}
}

class TaskList {
    private tasks: Task[] = [];

    public addTask(task: Task) {
        this.tasks.push(task)
    }

    public getTask() {
        return this.tasks
    }

    public count() {
        return this.tasks.length;
    }

    public getIterator(sortBy: 'id' | 'date') {
        return new TaskIterator(this, sortBy);
    }
}

interface IIterator<T> {
    current(): T | undefined;
    next(): T | undefined;
    prev(): T | undefined;
    index(): number;
}

class TaskIterator implements IIterator<Task> {
    private position: number = 0;
    private taskList: Task[];

    constructor(taskList: TaskList, sortBy: 'id' | 'date') {
        this.taskList = taskList.getTask().sort((a, b) => {
            if (sortBy === 'id') {
                return a.id - b.id;
            } else {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
        });
    }

    current(): Task | undefined {
        return this.taskList[this.position];
    }

    index(): number {
        return this.position;
    }

    next(): Task | undefined {
        this.position += 1;
        return this.taskList[this.position];
    }

    prev(): Task | undefined {
        this.position -= 1;
        return this.taskList[this.position];
    }
}

const taskList = new TaskList();
taskList.addTask(new Task(3, '2025-02-10', 'C'));
taskList.addTask(new Task(1, '2025-01-01', 'A'));
taskList.addTask(new Task(2, '2025-02-01', 'B'));

const iteratorById = taskList.getIterator('id');
console.log(iteratorById.current());
console.log(iteratorById.next());
console.log(iteratorById.next());
console.log(iteratorById.prev());
console.log(iteratorById.index());

const iteratorByDate = taskList.getIterator('date');
console.log(iteratorByDate.current());
console.log(iteratorByDate.next());
console.log(iteratorByDate.next());
console.log(iteratorByDate.prev());
console.log(iteratorByDate.index());
