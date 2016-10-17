import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';
import { CompletenessPipe } from './completeness.pipe';
import {TaskComponent} from './task.component';

@Component({
  selector: 'task-list',
  template: `
  <select class="form-group filter" (change)="onChange($event.target.value)">
    <option value="all">Show All</option>
    <option value="isDone">Show Done</option>
    <option value="notDone" selected="selected">Show Not Done</option>
  </select>
  <div class="form-group well" *ngFor="let currentTask of childTaskList | completeness:selectedCompleteness">
    <task-display
      [task] = "currentTask"
    ></task-display>
    <button (click)="editButtonHasBeenClicked(currentTask)">Edit</button>
  </div>
  `
})

export class TaskListComponent {
  public selectedCompleteness: string = "notDone";
  @Input() childTaskList: Task[];
  @Output() clickSender = new EventEmitter();
  editButtonHasBeenClicked(taskToEdit: Task) {
    this.clickSender.emit(taskToEdit);
  }

  onChange(optionFromMenu) {
    this.selectedCompleteness = optionFromMenu;
    console.log(this.selectedCompleteness);
  }
}
