import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() item: string | undefined

  //@input() - decorator used to hold data from the parent (dashboard)
  //item will send to the parent (property binding [item]="acno") - dashboard.html

  @Output() onCancel = new EventEmitter()  //User defined event
  @Output() onDelete = new EventEmitter()  //User defined event


  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.onCancel.emit()
  }
  delete() {
    // localStorage.removeItem('currentAcno');
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('');
    this.onDelete.emit()
  }
}
