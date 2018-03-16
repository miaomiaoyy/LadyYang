function average(scores) {
  var total = 0;
  scores.forEach(function(score){
    total += score;
  }) ;
  var average = total/scores.length;
  return Math.round(average);

}

var scores =[1,2,3,5,6,7,4];
console.log(average(scores));
