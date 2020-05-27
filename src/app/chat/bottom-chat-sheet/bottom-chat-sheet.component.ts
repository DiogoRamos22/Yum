import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ChatComponent } from '../chat/chat.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-bottom-chat-sheet',
  templateUrl: './bottom-chat-sheet.component.html',
  styleUrls: ['./bottom-chat-sheet.component.css']
})
export class BottomChatSheetComponent implements OnInit, OnChanges {
  id: number;
  @Input() firstName;
  @Input() lastName;
  data = {};

  constructor(private bottomSheet: MatBottomSheet, private route: ActivatedRoute, private api: ApiService) {
  }
  openBottomChatSheet() {
    this.bottomSheet.open(ChatComponent, {
      disableClose: true,
      closeOnNavigation: false,
      hasBackdrop: false,
      data : this.data
    });
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.route.params.subscribe((params) => {
      this.data = {
        id : params.userId,
        firstName: this.firstName,
        lastName: this.lastName
      };

    });

  }

}
