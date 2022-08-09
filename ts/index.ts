import { EventListener } from './EventListener';
import { Task } from './Task';
import { TaskCollection } from './TaskCollection';
import { TaskRenderer } from './taskRenderer';

class Application {
  private readonly eventListener = new EventListener();
  private readonly taskCollection = new TaskCollection();
  private readonly taskRenderer = new TaskRenderer(
    document.getElementById('todoList') as HTMLElement
  );

  start() {
    const createForm = document.getElementById('createForm') as HTMLElement;
    // 最終的にはsubmitイベントを発火点にhandleSubmitメソッドを行なっている
    this.eventListener.add(
      'submit-handler',
      'submit',
      createForm,
      this.handleSubmit
    );
  }
  private handleSubmit = (e: Event) => {
    e.preventDefault();
    // HTMLInputElementはHTMLElementを継承する型。
    // value propertyを使えるのはHTMLInputElement
    const titleInput = document.getElementById('title') as HTMLInputElement;

    if (!titleInput.value) return;

    const task = new Task({ title: titleInput.value });

    this.taskCollection.add(task);

    const { deleteButtonEl } = this.taskRenderer.append(task);
    // task作成時にボタンにイベントハンドラをつけている
    this.eventListener.add(task.id, 'click', deleteButtonEl, () =>
      this.handleClickDeleteTask(task)
    );

    titleInput.value = '';
  };
  private handleClickDeleteTask(task: Task) {
    if (!window.confirm(`「${task.title}」を削除してよろしいですか？`)) return;
    console.log(task);
    // イベントハンドラだけを消している
    this.eventListener.remove(task.id);
    // tasks配列からtaskを削除する
    this.taskCollection.delete(task);
    // 実際にviewから削除
    this.taskRenderer.remove(task);
  }
}

window.addEventListener('load', () => {
  const app = new Application();
  app.start();
});
