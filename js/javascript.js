//From: https://codepen.io/CheeseTurtle/pen/jzdgI, I changed the css styling and created a keyframe for the animation
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);

};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
//From: https://codepen.io/CheeseTurtle/pen/jzdgI



// I created this function by reviewing material from:
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_navbar_hide_scroll
//https://krasimirtsonev.com/blog/article/Using-media-queries-in-JavaScript-AbsurdJS-edition
//https://stackoverflow.com/questions/46739960/use-multiple-matchmedia-with-svg-for-responsive-viewbox-resizing
var prevScrollpos = window.pageYOffset;

var mq = [ // list of window.matchMedia() queries
    window.matchMedia("(min-width: 786px)"),
    window.matchMedia("(min-width: 900px)")
    ]

window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {

      if(mq[0].matches){
        document.getElementById("header").style.top = "-125px";
      }
      else if(mq[1].matches){
        document.getElementById("header").style.top = "-75px";
      }
      else{
        document.getElementById("header").style.top = "-220px";
      }
  }
  prevScrollpos = currentScrollPos;
}









