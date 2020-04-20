import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  searchText = '';
  editForm = false;

  showForm=false;
  myTask: Task={
    label:'',
    completed:false
  }
tasks: Task[] = [];
ResultTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
 getTasks(){
   this.taskService.findAll()
   .subscribe((tasks)=>{
     this.ResultTasks=this.tasks=tasks
   })
 }
 
deleteTask(id){
  this.taskService.delete(id)
  .subscribe(()=>{
    this.tasks=this.tasks.filter(task =>task.id !=id)
  })
}
persistTask(){
  this.taskService.persist(this.myTask)
  .subscribe((task) =>{
   this.tasks = [task, ...this.tasks],
   this.resetTask();
   this.showForm=!this.showForm
  });
}
resetTask(){
  this.myTask={
    label:'',
    completed:false
  }
}
ToggleCompleted(task){
  this.taskService.completed(task.id, task.completed)
  .subscribe(()=>{
    task.completed= !task.completed
  })
}
editTask(task){

    this.myTask=task;
    this.editForm=true;
    }
    
    updateTask(){
      this.taskService.update(this.myTask)
      .subscribe((task)=>{
        this.resetTask();
        this.editForm=false;

      })
    }
    searchTask(){
     this.ResultTasks = this.tasks.filter(
       task=>task.label.toLowerCase().includes(this.searchText.toLowerCase()))
  }
    
}

