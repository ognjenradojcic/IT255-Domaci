import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room } from 'src/app/models/room.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  myForm: FormGroup;
  room: Room;
  name: AbstractControl;
  price: AbstractControl;

  constructor(public dialog: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any, fb: FormBuilder) {
    this.room = this.data.room;
    this.myForm = fb.group({
      'name': [this.room.name, Validators.required],
      'price': [this.room.price, Validators.required]
    })
    this.name = this.myForm.controls['name'];
    this.price = this.myForm.controls['price'];

  }

  editRoom(form: any): any {
    if (this.myForm.valid) {
      let editedRoom = new Room(form.name, form.price);
      this.dialog.close(editedRoom);
    }
  }

  ngOnInit(): void {
  }
}
