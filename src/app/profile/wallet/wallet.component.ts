import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  @Output() moneyCard = new EventEmitter<any>();
  money: number;
  constructor(
    public dialog: MatDialog
  ) { }
  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {money: this.money}
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log('Dialog Closed');
      console.log(res);
      this.moneyCard.emit(res);
    });
  }

}
