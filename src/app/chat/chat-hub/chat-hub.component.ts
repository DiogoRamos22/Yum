import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { interval } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-chat-hub',
  templateUrl: './chat-hub.component.html',
  styleUrls: ['./chat-hub.component.css']
})
export class ChatHubComponent implements OnInit {
  showFiller = false;
  messages: any;
  chatList: any;
  chatHub: any[];
  chatHubId: any[];
  name: any;
  pollingCall: any;
  id: any;


  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
    .getActiveChats()
    .then(res => {
      const chatString = res.data;
      let tempArray = [];
      let tempArrayId = [];
      chatString.forEach(element => {
        let chatArray = element.split(',');
        tempArray.push(chatArray[1] + ' ' + chatArray[2]);
        tempArrayId.push([chatArray[0], chatArray[1] + ' ' + chatArray[2]]);
        this.chatHub = tempArray;
        this.chatHubId = tempArrayId;
      });
      let chat = this.chatHubId[0];
      this.id = chat[0]
      this.name = chat[1];
      this.GetMessages(this.id);
      this.pollingCall = interval(3000)
        .subscribe(() => {
          this.GetMessages(this.id);
        });
    })
    .catch(err => {

    });
  }


  UpdateMessages(id) {
    console.log(this.messages);
    this.chatList = '';
    for (let i in this.messages) {
      if (this.messages[i].idSender == id) {
        this.chatList += '<li class="ml-5 mb-2">' + this.messages[i].message + '</li>';
      } else {
        this.chatList += '<li class="mr-5 mb-2 text-right">' + this.messages[i].message + '</li>';
      }
    }
  }

  GetMessages(id) {
    this.api.getMessages(id)
      .then((res) => {
        this.messages = res.data;
        this.UpdateMessages(id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  SendMessage(message) {
    this.api.sendMessage(this.id, message)
      .then((res) => {
        this.GetMessages(this.id);
        console.log('deu');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ChangeChat(liId) {
    this.id = this.chatHubId[liId][0];
    this.name = this.chatHubId[liId][1];
    this.GetMessages(this.id);
    this.pollingCall.unsubscribe();
    this.pollingCall = interval(3000)
        .subscribe(() => {
          this.GetMessages(this.id);
    });
  }
}
