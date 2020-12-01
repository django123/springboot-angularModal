import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Friend } from '../_models/friend';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { FriendService } from '../_services/friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  friends: Friend[];
  friend: Friend;
  closeResult: string;

  constructor(

    private httpClient: HttpClient,
    private friendService: FriendService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getFriends();
  }

  getFriends(){
    this.friendService.getAllFriend().subscribe(
      response => {
        console.log(response);
        this.friends = response;
      }
    );
  }

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

onSubmit(f: NgForm) {
  
  this.friendService.saveFriend(f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
}

}
