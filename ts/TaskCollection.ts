import { Task } from './Task';
export class TaskCollection {
  private tasks: Task[] = [];

  add(task: Task) {
    this.tasks.push(task);
  }
  delete(task: Task) {
    // ここの{}は何してるん？普通にid入れるだけじゃああかんのか,分割代入か
    this.tasks = this.tasks.filter(({ id }) => {
      id !== task.id;
    });
  }
}
