import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';
import { CompletenessPipe } from './completeness.pipe';

@Component({
  selector: 'task-list',
  template: `
  <select (change)="onChange($event.target.value)">
    <option value="all">Show All</option>
    <option value="isDone">Show Done</option>
    <option value="notDone" selected="selected">Show Not Done</option>
  </select>
  <div *ngFor="let currentTask of childTaskList | completeness:selectedCompleteness">
    <h3>{{ currentTask.description }}</h3>
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
    conosole.log(this.selectedCompleteness);
  }
}
