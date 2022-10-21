import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, DoCheck, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialogs/dialog/dialog.component';
import { Room } from './models/room.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterContentInit {
  title = "IT255-DZ13";
  rooms: Room[];
  @HostBinding('attr.class') cssClass = 'container';
  constructor(private dialog: MatDialog){

  }

  addRoom(name: HTMLInputElement, price: HTMLInputElement){
    this.rooms.push(new Room(name.value, parseInt(price.value)));
    name.value = price.value = "";
    return false;
  }

  deleteRoom(room: Room){
    const index = this.rooms.indexOf(room);
    this.rooms.splice(index, 1);
  }

  editRoom(room: Room){
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        room: Room
      }
    })
    dialogRef.afterClosed().subscribe((newRoom) =>{
      room.name = newRoom.name;
      room.price = newRoom.price;
    })
  }

  ngOnInit(): void {
    this.rooms = [ new Room ("Nataly Spa", 50)];
  }

  ngDoCheck(): void {
    console.log('DoCheck');
  }

  ngAfterContentInit(): void {
    console.log('AfterContentInit');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit fired');
  }

  ngAfterContentChecked(): void {
    console.log('AfterContentChecked');
  }

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('OnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`OnChanges: ${changes}`);
  }


  
}
