import { TaskList } from './shared/types/task-list';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskListComponent } from './task-list/task-list.component';

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

  
}
