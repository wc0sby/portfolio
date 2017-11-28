"use strict";

function enter() {
  var viewOne = document.getElementById('welcome');
  var viewTwo = document.getElementById('mainPage');
  var contain = document.getElementById('changeWidth');

  // function isHidden(x) {
  //   return (x.offsetParent === null);
  // }
  //
  // if ('isHidden(viewOne)' = false) {
    viewOne.style.display = 'none';
    viewTwo.style.display = 'block';
    // contain.className = "container my-wrapper";
    contain.style.background = '#333333';
  }





// var cards = []
// var duration = 10000;
// var i = 0;
//
// // Puts the cards into array
// cards[0] = document.getElementById('aboutMe');
// cards[1] = document.getElementById('mySkills');
// cards[2] = document.getElementById('projectOne');
// cards[3] = document.getElementById('projectTwo');
//
//
// function cardTrans() {
//
//   if (i < cards.length - 1) {
//     cards[i].classList.toggle('box-content-visible');
//     i++;
//   } else {
//     i = 0;
//   }
//
// setInterval("cardTrans()", duration);
// }
//
// window.onload = cardTrans;
