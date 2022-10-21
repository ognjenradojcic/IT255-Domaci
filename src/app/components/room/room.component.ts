import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Room } from 'src/app/models/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @Input() room: Room;
  @Output() delete = new EventEmitter<Room>();
  @Output() edit = new EventEmitter<Room>();
  @HostBinding('attr.class') cssClass = "card col-md-4 p-3";
  constructor() { }

  ngOnInit(): void {
    console.log('OnInit');
  }

  deleteRoom(){
    this.delete.emit(this.room);
  }
  editRoom(){
    this.edit.emit(this.room);
  }

}
