import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private round: number = 0;
  private roundPtr: number = 0;
  public roundStr:string = "Round 1/1";
  private player1: number[] = []; 
  private player2: number[] = [];
  private player3: number[] = [];
  private player4: number[] = [];
  private eastWindArr: number[] = [];
  private roundWinnerArr: number[] = [];
  eastWind: number = 0;
  roundWinner: number = 0;
  points_p1: number = 0;
  points_p2: number = 0;
  points_p3: number = 0;
  points_p4: number = 0;
  score_p1: number = 0;
  score_p2: number = 0;
  score_p3: number = 0;
  score_p4: number = 0;

  constructor(public alertController: AlertController) {}

  newRound() {
    if (
      this.points_p1 < 0 
      || this.points_p2 < 0
      || this.points_p3 < 0
      || this.points_p4 < 0)
    {
      this.presentAlert("Invalid points");
      return;
    }
    if (this.eastWind == 0) {
      this.presentAlert("Check East Wind.");
      return;
    }
    if (this.roundWinner == 0) {
      this.presentAlert("Check Round Winner.");
      return;
    }
    if (this.roundPtr < this.round){
      this.presentAlert("Go to last round first.");
      return;
    }
    this.player1.push(this.points_p1);
    this.player2.push(this.points_p2);
    this.player3.push(this.points_p3);
    this.player4.push(this.points_p4);
    this.eastWindArr.push(this.eastWind);
    this.roundWinnerArr.push(this.roundWinner);
    this.round++;
    this.roundPtr = this.round;
    this.updateScores();
    this.points_p1 = 0;
    this.points_p2 = 0;
    this.points_p3 = 0;
    this.points_p4 = 0;
    this.eastWind = 0;
    this.roundWinner = 0;
    this.roundStr = "Round: " + (this.roundPtr+1) + "/" + (this.round+1);
  }

  prevRound() {
    if (this.roundPtr > 0){
      this.updateScores();
      if (this.roundPtr < this.round){
        this.saveRound();
      }
      this.roundPtr--;
      this.points_p1 = this.player1[this.roundPtr];
      this.points_p2 = this.player2[this.roundPtr];
      this.points_p3 = this.player3[this.roundPtr];
      this.points_p4 = this.player4[this.roundPtr];
      this.eastWind = this.eastWindArr[this.roundPtr];
      this.roundWinner = this.roundWinnerArr[this.roundPtr];
      this.roundStr = "Round: " + (this.roundPtr+1) + "/" + (this.round+1);
    }
  }

  nextRound() {
    if (this.roundPtr < this.round){
      this.saveRound();
      this.roundPtr++;
      if (this.player1.length > this.roundPtr){
        this.points_p1 = this.player1[this.roundPtr];
        this.points_p2 = this.player2[this.roundPtr];
        this.points_p3 = this.player3[this.roundPtr];
        this.points_p4 = this.player4[this.roundPtr];
        this.eastWind = this.eastWindArr[this.roundPtr];
        this.roundWinner = this.roundWinnerArr[this.roundPtr];
      } else{
        this.points_p1 = 0;
        this.points_p2 = 0;
        this.points_p3 = 0;
        this.points_p4 = 0;
        this.eastWind = 0;
        this.roundWinner = 0;
      }
      this.updateScores();
      this.roundStr = "Round: " + (this.roundPtr+1) + "/" + (this.round+1);
    }
  }

  saveRound(){
    if (this.player1.length > this.roundPtr) {
      this.player1[this.roundPtr] = this.points_p1;
      this.player2[this.roundPtr] = this.points_p2;
      this.player3[this.roundPtr] = this.points_p3;
      this.player4[this.roundPtr] = this.points_p4;
      this.eastWindArr[this.roundPtr] = this.eastWind;
      this.roundWinnerArr[this.roundPtr] = this.roundWinner;
    }
  }

  updateScores(){
    //debugger;
    this.score_p1=0;
    this.score_p2=0;
    this.score_p3=0;
    this.score_p4=0;
    var i: number;
    var limit: number;
    limit = Math.min(this.roundPtr, this.player1.length, this.roundWinnerArr.length, this.eastWindArr.length);
    console.log("limit: " +limit);
    for (i=0; i<limit; i++){
      switch ( String(this.eastWindArr[i]) ) {
        case "1":
          switch ( String(this.roundWinnerArr[i]) ) {
            case "1":
              this.score_p1 += this.player1[i]*6;
              this.score_p2 += (-this.player1[i])*2 + (this.player2[i]-this.player3[i]) + (this.player2[i]-this.player4[i]);
              this.score_p3 += (-this.player1[i])*2 + (this.player3[i]-this.player2[i]) + (this.player3[i]-this.player4[i]);
              this.score_p4 += (-this.player1[i])*2 + (this.player4[i]-this.player2[i]) + (this.player4[i]-this.player3[i]);
              break;
            case "2":
              this.score_p1 += (-this.player2[i])*2 + (this.player1[i]-this.player3[i])*2 + (this.player1[i]-this.player4[i])*2;
              this.score_p2 +=  this.player2[i]*4;
              this.score_p3 += (-this.player2[i]) + (this.player3[i]-this.player1[i])*2 + (this.player3[i]-this.player4[i]);
              this.score_p4 += (-this.player2[i]) + (this.player4[i]-this.player1[i])*2 + (this.player4[i]-this.player3[i]);
              break;
            case "3":
              this.score_p1 += (-this.player3[i])*2 + (this.player1[i]-this.player2[i])*2 + (this.player1[i]-this.player4[i])*2;
              this.score_p2 += (-this.player3[i]) + (this.player2[i]-this.player1[i])*2 + (this.player2[i]-this.player4[i]);
              this.score_p3 +=  this.player3[i]*4;
              this.score_p4 += (-this.player3[i]) + (this.player4[i]-this.player1[i])*2 + (this.player4[i]-this.player2[i]);
              break;
            case "4":
              this.score_p1 += (-this.player4[i])*2 + (this.player1[i]-this.player2[i])*2 + (this.player1[i]-this.player3[i])*2;
              this.score_p2 += (-this.player4[i]) + (this.player2[i]-this.player1[i])*2 + (this.player2[i]-this.player3[i]);
              this.score_p3 += (-this.player4[i]) + (this.player3[i]-this.player1[i])*2 + (this.player3[i]-this.player2[i]);
              this.score_p4 +=  this.player4[i]*4;
              break;
          }
          break;
        case "2":
          switch ( String(this.roundWinnerArr[i]) ) {
            case "1":
              this.score_p1 += this.player1[i]*4;
              this.score_p2 += (-this.player1[i])*2 + (this.player2[i]-this.player3[i])*2 + (this.player2[i]-this.player4[i])*2;
              this.score_p3 += (-this.player1[i]) + (this.player3[i]-this.player2[i])*2 + (this.player3[i]-this.player4[i]);
              this.score_p4 += (-this.player1[i]) + (this.player4[i]-this.player2[i])*2 + (this.player4[i]-this.player3[i]);
              break;
            case "2":
              this.score_p1 += (-this.player2[i])*2 + (this.player1[i]-this.player3[i]) + (this.player1[i]-this.player4[i])*2;
              this.score_p2 +=  this.player2[i]*6;
              this.score_p3 += (-this.player2[i])*2 + (this.player3[i]-this.player1[i]) + (this.player3[i]-this.player4[i]);
              this.score_p4 += (-this.player2[i])*2 + (this.player4[i]-this.player1[i]) + (this.player4[i]-this.player3[i]);
              break;
            case "3":
              this.score_p1 += (-this.player3[i]) + (this.player1[i]-this.player2[i])*2 + (this.player1[i]-this.player4[i]);
              this.score_p2 += (-this.player3[i])*2 + (this.player2[i]-this.player1[i])*2 + (this.player2[i]-this.player4[i])*2;
              this.score_p3 +=  this.player3[i]*4;
              this.score_p4 += (-this.player3[i]) + (this.player4[i]-this.player1[i]) + (this.player4[i]-this.player2[i])*2;
              break;
            case "4":
              this.score_p1 += (-this.player4[i]) + (this.player1[i]-this.player2[i])*2 + (this.player1[i]-this.player3[i]);
              this.score_p2 += (-this.player4[i])*2 + (this.player2[i]-this.player1[i])*2 + (this.player2[i]-this.player3[i])*2;
              this.score_p3 += (-this.player4[i]) + (this.player3[i]-this.player1[i]) + (this.player3[i]-this.player2[i])*2;
              this.score_p4 +=  this.player4[i]*4;
              break;
          }
          break;
        case "3":
          switch ( String(this.roundWinnerArr[i]) ) {
            case "1":
              this.score_p1 += this.player1[i]*4;
              this.score_p2 += (-this.player1[i]) + (this.player2[i]-this.player3[i])*2 + (this.player2[i]-this.player4[i]);
              this.score_p3 += (-this.player1[i])*2 + (this.player3[i]-this.player2[i])*2 + (this.player3[i]-this.player4[i])*2;
              this.score_p4 += (-this.player1[i]) + (this.player4[i]-this.player2[i]) + (this.player4[i]-this.player3[i])*2;
              break;
            case "2":
              this.score_p1 += (-this.player2[i]) + (this.player1[i]-this.player3[i])*2 + (this.player1[i]-this.player4[i]);
              this.score_p2 +=  this.player2[i]*4;
              this.score_p3 += (-this.player2[i])*2 + (this.player3[i]-this.player1[i])*2 + (this.player3[i]-this.player4[i])*2;
              this.score_p4 += (-this.player2[i]) + (this.player4[i]-this.player1[i]) + (this.player4[i]-this.player3[i])*2;
              break;
            case "3":
              this.score_p1 += (-this.player3[i])*2 + (this.player1[i]-this.player2[i]) + (this.player1[i]-this.player4[i]);
              this.score_p2 += (-this.player3[i])*2 + (this.player2[i]-this.player1[i]) + (this.player2[i]-this.player4[i]);
              this.score_p3 +=  this.player3[i]*6;
              this.score_p4 += (-this.player3[i])*2 + (this.player4[i]-this.player1[i]) + (this.player4[i]-this.player2[i]);
              break;
            case "4":
              this.score_p1 += (-this.player4[i]) + (this.player1[i]-this.player2[i]) + (this.player1[i]-this.player3[i])*2;
              this.score_p2 += (-this.player4[i]) + (this.player2[i]-this.player1[i]) + (this.player2[i]-this.player3[i])*2;
              this.score_p3 += (-this.player4[i])*2 + (this.player3[i]-this.player1[i])*2 + (this.player3[i]-this.player2[i])*2;
              this.score_p4 +=  this.player4[i]*4;
              break;
          }
          break;
        case "4":
          switch ( String(this.roundWinnerArr[i]) ) {
            case "1":
              this.score_p1 += this.player1[i]*4;
              this.score_p2 += (-this.player1[i]) + (this.player2[i]-this.player3[i]) + (this.player2[i]-this.player4[i])*2;
              this.score_p3 += (-this.player1[i]) + (this.player3[i]-this.player2[i]) + (this.player3[i]-this.player4[i])*2;
              this.score_p4 += (-this.player1[i])*2 + (this.player4[i]-this.player2[i])*2 + (this.player4[i]-this.player3[i])*2;
              break;
            case "2":
              this.score_p1 += (-this.player2[i]) + (this.player1[i]-this.player3[i]) + (this.player1[i]-this.player4[i])*2;
              this.score_p2 +=  this.player2[i]*4;
              this.score_p3 += (-this.player2[i]) + (this.player3[i]-this.player1[i]) + (this.player3[i]-this.player4[i])*2;
              this.score_p4 += (-this.player2[i])*2 + (this.player4[i]-this.player1[i])*2 + (this.player4[i]-this.player3[i])*2;
              break;
            case "3":
              this.score_p1 += (-this.player3[i]) + (this.player1[i]-this.player2[i]) + (this.player1[i]-this.player4[i])*2;
              this.score_p2 += (-this.player3[i]) + (this.player2[i]-this.player1[i]) + (this.player2[i]-this.player4[i])*2;
              this.score_p3 +=  this.player3[i]*4;
              this.score_p4 += (-this.player3[i])*2 + (this.player4[i]-this.player1[i])*2 + (this.player4[i]-this.player2[i])*2;
              break;
            case "4":
              this.score_p1 += (-this.player4[i])*2 + (this.player1[i]-this.player2[i]) + (this.player1[i]-this.player3[i])*2;
              this.score_p2 += (-this.player4[i])*2 + (this.player2[i]-this.player1[i]) + (this.player2[i]-this.player3[i]);
              this.score_p3 += (-this.player4[i])*2 + (this.player3[i]-this.player1[i]) + (this.player3[i]-this.player2[i]);
              this.score_p4 +=  this.player4[i]*6;
              break;
          }
          break;
        default:
          break;
      }
    }
  }

  async presentAlert(errorMsg: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: errorMsg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
