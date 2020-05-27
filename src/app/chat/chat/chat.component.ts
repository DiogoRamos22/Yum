import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/_services/api.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public api: ApiService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public messages: any,
    @Inject(MAT_BOTTOM_SHEET_DATA) public chatList: any) { }

  ngOnInit(): void {
    document.getElementById('name').innerText = this.data.firstName + ' ' + this.data.lastName;
    console.log('chatlist: ' , this.chatList);
    console.log('data' , this.data);
    this.chatList = document.getElementById('chatList');
    this.GetMessages(this.data.id);

    var call = interval(3000)
      .subscribe(() => {
        this.GetMessages(this.data.id)
      });
  }

  UpdateMessages() {
    console.log(this.messages);
    this.chatList.innerHTML = '';
    for (let i in this.messages) {
      if (this.messages[i].idSender == this.data.id) {
        this.chatList.insertAdjacentHTML('beforeend', '<li>' + this.messages[i].message + '</li>');
      } else {
        this.chatList.insertAdjacentHTML('beforeend', '<li style=text-align:right;>' + this.messages[i].message + '</li>');
      }
    }
  }

  GetMessages(id) {
    this.api.getMessages(id)
      .then((res) => {
        this.messages = res.data;
        this.UpdateMessages();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  SendMessage(message) {
    console.log(message);
    document.getElementById('messageText').innerText ='epic';
    this.api.sendMessage(this.data.id, message)
      .then((res) => {
        this.GetMessages(this.data.id);
        console.log('deu');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  Close() {
    document.getElementById('chat').innerHTML = '';
  }





}
