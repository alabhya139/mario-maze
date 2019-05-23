import { Component, OnInit, DoCheck, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  width = 0;
  height = "";
  ind = [];
  columns = "";
  marioPosition;
  ballsPosition = [];
  balls = [];
  interval
  left = 0;
  right = 0;
  up = 0;
  down = 0;
  ballsBusted = 0;
  ltr    //left to right
  rtl    //right to left
  utd    //up to down
  dtu    //down to up

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.columns === "") {
      this.ind = [];
    }
  }

  //Initialization of game
  setColumns() {
    if (this.columns !== undefined && this.columns !== null && this.columns !== "") {
      this.width = parseInt(this.columns) * 35;
      this.marioPosition = this.randomPosition(0, (parseInt(this.columns) * parseInt(this.columns)) - 1);4
      this.ballsPosition = this._arrayRandom(parseInt(this.columns),0,(parseInt(this.columns) * parseInt(this.columns))-1,true);
      console.log(this.ballsPosition)
      for (let i = 0; i < parseInt(this.columns) * parseInt(this.columns); i++) {
        this.ind[i] = [i];
      }

      for(let i = 0; i<parseInt(this.columns) * parseInt(this.columns); i++){
        this.balls[i] = false;
      }

      this.ballsPosition.forEach(pos=>{
        if(pos===this.marioPosition){
          pos = pos+1;
        }else {
          this.balls[pos] = true;
        }
      });
    }
  }

  //HostListener to listen for Keyboard Arrow Keys for player Navigation
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key==="ArrowLeft" && this.left === 0){
      this.left = 1;
      this.right = 0;
      this.up = 0;
      this.down = 0;
      this.ltr = false;
      this.rtl = true;
      if(this.interval){
        clearInterval(this.interval)
      }
      this.leftAndRightMovement();
      
    }else if(event.key==="ArrowRight" && this.right === 0){
      this.left = 0;
      this.right = 1;
      this.up = 0;
      this.down = 0;
      this.ltr = true;
      this.rtl = false;
      if(this.interval){
        clearInterval(this.interval)
      }
      this.leftAndRightMovement();
    }else if(event.key==="ArrowUp"){  //Moving Player Up
      this.left = 0;
      this.right = 0;
      this.up = 1;
      this.down = 0;
      this.dtu = true;
      this.utd =false;
      if(this.interval){
        clearInterval(this.interval)
      }
      
      this.upAndDownMovement();
    }else if(event.key==="ArrowDown"){ //Moving Player Down
      this.left = 0;
      this.right = 0;
      this.up = 0;
      this.down = 1;
      this.dtu = false;
      this.utd =true;
      if(this.interval){
        clearInterval(this.interval)
      }
      this.upAndDownMovement()
    }
  }

  leftAndRightMovement(){
    this.interval = setInterval(()=>{
      if(this.marioPosition%parseInt(this.columns) === parseInt(this.columns)-1){
        this.rtl = true;
        this.ltr = false;
        this.rightToLeft();
      }else if(this.marioPosition%parseInt(this.columns) === 0) {
        this.rtl = false;
        this.ltr = true;
        this.leftToRight();
      }else if(this.marioPosition%parseInt(this.columns) !== 0 && this.rtl === true){
        this.rightToLeft();
      }else if(this.marioPosition%parseInt(this.columns) !== 0 && this.ltr === true){
        this.leftToRight();
      }else if(this.marioPosition%parseInt(this.columns) !== 0 && this.rtl === false){
        this.leftToRight();
      }else if(this.marioPosition%parseInt(this.columns) !== 0 && this.ltr === false){
        this.rightToLeft();
      }
        
      },250);
  }

  upAndDownMovement(){
    this.interval = setInterval(()=>{
      if(this.marioPosition + parseInt(this.columns) > (parseInt(this.columns) * parseInt(this.columns))-1) {
        this.dtu = true;
        this.utd = false;
        this.downToUp();
      }else if(this.marioPosition - parseInt(this.columns) < 0) {
        this.utd = true;
        this.dtu = false;
        this.upToDown();
      }else if( this.marioPosition + parseInt(this.columns)<= (parseInt(this.columns) * parseInt(this.columns))-1 && this.utd === true){
        this.upToDown()
      }else if( this.marioPosition - parseInt(this.columns)>= 0 && this.dtu === true){
        this.downToUp();
      }else if( this.marioPosition + parseInt(this.columns)<= (parseInt(this.columns) * parseInt(this.columns))-1 && this.utd === false){
        this.downToUp();
      }else if( this.marioPosition - parseInt(this.columns)>= 0 && this.dtu === false){
        this.upToDown();
      }
      
    },250);
  }

  leftToRight(){
    this.marioPosition += 1;
  }

  rightToLeft(){
    this.marioPosition -= 1;
  }

  downToUp(){
    this.marioPosition -= parseInt(this.columns);
  }

  upToDown(){
    this.marioPosition += parseInt(this.columns);
  }

  //function to generate random player position on start
  randomPosition(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //function to generate random arrays for balls position
  _arrayRandom(len, min, max, unique) {
    var len = (len) ? len : 10,
      min = (min !== undefined) ? min : 1,
      max = (max !== undefined) ? max : 100,
      unique = (unique) ? unique : false,
      toReturn = [], tempObj = {}, i = 0;

    if (unique === true) {
      for (; i < len; i++) {
        var randomInt = Math.floor(Math.random() * ((max - min) + min));
        if (tempObj['key_' + randomInt] === undefined) {
          tempObj['key_' + randomInt] = randomInt;
          toReturn.push(randomInt);
        } else {
          i--;
        }
      }
    } else {
      for (; i < len; i++) {
        toReturn.push(Math.floor(Math.random() * ((max - min) + min)));
      }
    }

    return toReturn;
  }


}
