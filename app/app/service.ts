export class FirebaseService{
    dataRef: Firebase;
    constructor() {
       this.dataRef = new Firebase('https://angular-color-game.firebaseio.com/playerHistory');
    }
}