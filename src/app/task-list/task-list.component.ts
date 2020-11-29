import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  taskListForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm() {
    this.taskListForm = this.fb.group({
      taskListName: ['', Validators.required],
    });
    if (this.data.body) {
      this.taskListForm.patchValue({
        taskListName: this.data.body,
      });
    }
  }

  onSubmit(): void {
    this.dialogRef.close(this.taskListForm.value);
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
