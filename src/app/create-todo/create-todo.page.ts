import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {
  todoForm: FormGroup;

  constructor(
    private crudService: CrudService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      name: [''],
      category: [''],
      title: [''],
    });
  }

  onSubmit() {
    if (!this.todoForm.valid) {
      return false;
    } else {
      this.crudService
        .create(this.todoForm.value)
        .then(() => {
          this.todoForm.reset();
          this.router.navigate(['/todo-list']);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
