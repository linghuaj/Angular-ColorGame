import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {FirebaseService} from './service';
import {Player} from './player';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  componentServices: [FirebaseService]
})
export class HeroesComponent implements OnInit {
  public players: Player[];
  dataRef: Firebase;
  
  constructor(private _router: Router) {
    this.dataRef = new FirebaseService().dataRef;
    var self = this;
    this.players = [];
    this.dataRef.orderByChild("score").limitToLast(10).on("child_added", function(snapshot) {
      self.players.push(snapshot.val());
    });
  }
  ngOnInit() {
  }
}
