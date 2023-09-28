const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
function onFunction(){
  showQuestion(0);
  startTimer(25);
  startTimerLine(25);
}
function showQuestion(index) {
    const que_text = document.querySelector(".que_text");
  
    let que_tag = '<span>' + tie_ques[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + tie_ques[index].options[0] + '</span></div>'
      + '<div class="option"><span>' + tie_ques[index].options[1] + '</span></div>'
      + '<div class="option"><span>' + tie_ques[index].options[2] + '</span></div>'
      + '<div class="option"><span>' + tie_ques[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
  
    const option = option_list.querySelectorAll(".option");
  
    for (i=0; i < option.length; i++) {
      option[i].setAttribute("onclick","optionSelected(this)");
    }
}

function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    var correcAns = tie_ques[0].answer; //getting correct answer from array
   
    const allOptions = option_list.children.length; //getting all option items
  
    if (userAns == correcAns) { //if user selected option is equal to array's correct answer
      userScore = 1; //upgrading score value with 1
      answer.classList.add("correct"); //adding green color to correct selected option
      answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
      console.log("Correct Answer");
      console.log("Your correct answers = " + userScore);
    } else {
      answer.classList.add("incorrect"); //adding red color to correct selected option
      answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
      console.log("Wrong Answer");
  
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
          option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Auto selected correct answer.");
        }
      }
    }
    for (i = 0; i < allOptions; i++) {
      option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
      timeCount.textContent = time; //changing the value of timeCount with time value
      time--; //decrement the time value
      if (time < 9) { //if timer is less than 9
        let addZero = timeCount.textContent;
        timeCount.textContent = "0" + addZero; //add a 0 before time value
      }
      if (time < 0) { //if timer is less than 0
        clearInterval(counter); //clear counter
        timeText.textContent = "Time Off"; //change the time text to time off
        const allOptions = option_list.children.length; //getting all option items
        
          correcAns = tie_ques[0].answer; //getting correct answer from array
        
        for (i = 0; i < allOptions; i++) {
          if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
            option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
            option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
            console.log("Time Off: Auto selected correct answer.");
          }
        }
        for (i = 0; i < allOptions; i++) {
          option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
        }
        next_btn.classList.add("show"); //show the next button if user selected any option
      }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 25);
    function timer() {
      time += .77; //upgrading time value with 1
      time_line.style.width = time + "px"; //increasing width of time_line with px by time value
      if (time > 800) { //if time value is greater than 549
        clearInterval(counterLine); //clear counterLine
      }
    }
  }