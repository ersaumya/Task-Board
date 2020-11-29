import { TaskList } from './shared/types/task-list';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskListComponent } from './task-list/task-list.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from './shared/types/task';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'board';

  constructor(private dialog: MatDialog) {}

  taskLists: TaskList[] = [
    {
      title: 'Task1',
      id: 't1',
      tasks: [
        {
          id: 'c1',
          title: 'task 1',
          description: 'task 1 desc',
        },
      ],
    },
    {
      title: 'Task2',
      id: 't2',
      tasks: [
        {
          id: 'c1',
          title: 'task 1',
          description: 'task 1 desc',
        },
      ],
    },
  ];

  addTaskList() {
    const dialogRef = this.dialog.open(TaskListComponent, {
      width: '500px',
      height: '300px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.taskLists.push({
        title: result.taskListName,
        id: result.taskListName,
        tasks: [],
      });
    });
  }

  get taskId(): string[] {
    return this.taskLists.map((task) => task.id);
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  onTaskdrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addCard(taskListId, card?) {
    const cardDialogRef = this.dialog.open(TaskComponent, {
      width: '500px',
      height: '300px',
      data: { header: card, body: !card ? {} : card },
    });
    cardDialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      console.log(taskListId);
      if (result) {
        if (taskListId && !card) {
          const getListIndex = this.taskLists.findIndex(
            (data) => data.id == taskListId
          );
          this.taskLists[getListIndex].tasks.push({
            title: result.title,
            description: result.description,
            id: result.title,
          });
        } else if (taskListId && card) {
          const getListIndex = this.taskLists.findIndex(
            (data) => data.id == taskListId
          );
          const getCardIndex = this.taskLists[getListIndex].tasks.findIndex(
            (data) => data.id == card.id
          );
          this.taskLists[getListIndex].tasks[getCardIndex].description =
            result.description;
          this.taskLists[getListIndex].tasks[getCardIndex].title = result.title;
        }
      }
    });
  }

  deleteList(listId) {
    if (listId) {
      const getListIndex = this.taskLists.findIndex(
        (data) => data.id == listId
      );
      this.taskLists.splice(getListIndex, 1);
    }
  }
  deleteCard(listId, cardId) {
    if (listId && cardId) {
      const getListIndex = this.taskLists.findIndex((data) => data.id == listId);
      const getCardIndex = this.taskLists[getListIndex].tasks.findIndex(
        (data) => data.id == cardId
      );
      this.taskLists[getListIndex].tasks.splice(getCardIndex, 1);
    }
  }
}
