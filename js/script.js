var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("contenido");
    var img = document.getElementById("img-right");
    var img_l = document.getElementById("img-left");
    if(n <= 1){ slideIndex = 1; img.style.display = "none"} else{ img.style.display="block"}
    if(slideIndex >= slides.length){ slideIndex = slides.length; img_l.style.display="none"} else{ img_l.style.display="block"}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";

    }
    slides[slideIndex-1].style.display = "block"; 
    }

