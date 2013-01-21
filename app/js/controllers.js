'use strict';

/* Controllers */

function StroopGameCtrl($scope){	
    $scope.UI={};	
	$scope.game={};
	$scope.totalProblem=100;
	$scope.rightScore=5;//how much score you get when get a correct answer
	$scope.wrongScore=-3;//how much score you get when get a wrong answer
	$scope.totalTime=30;
	
	$scope.stopGame=function(){ 	
		$scope.UI.showStartButton=true;
		$scope.UI.showGameButton=false;
		$scope.UI.countDownClass="badge badge-success";
		$scope.UI.wrongLength="";//length of green progress bar
		$scope.UI.rightLength="";//length of red progress bar
		$scope.UI.imgSrc="img/color.png";
		$scope.game.quizText="Color";//text on the right
		$scope.game.quizClass="blue";
		$scope.game.previousColor="";//to prevent same color multiple times
		$scope.game.answer="";
		$scope.game.isStarted=false;
		$scope.game.countDown = $scope.totalTime;
	 }
	  $scope.stopGame(); 
	  
	  $scope.resetGame=function(){ 
		$scope.setNextProblem();
		$scope.game.previousColor="";
		$scope.UI.countDownClass="badge badge-success"
		$scope.UI.imgSrc="img/none.png";		
		$scope.UI.showStartButton=false;
		$scope.UI.showGameButton=true;
		$scope.game.countDown = $scope.totalTime;
		$scope.game.rightCount=0;
		$scope.game.wrongCount=0;
		$scope.game.answer="";
		$scope.game.totalScore=0;
		$scope.game.isStarted=true;
	 }	
	
    $scope.startGame=function(){	
		$scope.resetGame();
		var timer = setInterval(function(){       
		   $scope.$apply(function(){
				 $scope.game.countDown--;
				if ($scope.game.countDown<10){
					$scope.UI.countDownClass="badge badge-important";
				}
				if ($scope.game.countDown==0){
				 clearInterval(timer);
				 $scope.stopGame();	
				 $scope.game.totalScore=$scope.game.rightCount*$scope.rightScore+$scope.game.wrongCount*$scope.wrongScore;
				 $scope.modalShown = true;
  			
				}                       
			});
		 }, 1000);  
	 }
	 
	$scope.pickRandomColor=function(){
		var choice=["green","red","blue","orange"];
		return choice[Math.floor(Math.random()*4)];
	}
	
	$scope.setNextProblem=function(){		
		$scope.game.quizText=$scope.pickRandomColor();			 
		$scope.game.quizClass=$scope.pickRandomColor();
		while($scope.game.quizClass==$scope.game.previousColor){
			$scope.game.quizClass=$scope.pickRandomColor();
		}
		$scope.game.previousColor=$scope.game.quizClass;
	}
		
	$scope.clicked=function(input){
		 if($scope.game.isStarted==false){
			return
		 }
			$scope.game.answer=(input==$scope.game.quizClass);
			if ($scope.game.answer==true){			
				$scope.game.rightCount++;
				$scope.UI.rightLength="width:"+$scope.game.rightCount/$scope.totalProblem*100+"%";
				$scope.UI.imgSrc="img/right.png";
			}else{
				
				$scope.game.wrongCount++;
				$scope.UI.wrongLength="width:"+$scope.game.wrongCount/$scope.totalProblem*100+"%";
				$scope.UI.imgSrc="img/wrong.png";
			}	
			setTimeout(function(){
				$scope.UI.imgSrc="img/none.png";
			}, 100); 			
			$scope.setNextProblem();				
	}
}
