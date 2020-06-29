/* Scroll animation for all platform support using jquery */
$('.sender').on('click', function(e) {
  if(this.hash != '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate(
      {
      scrollTop: $(hash).offset().top
      },
      800
    );
  }
});

/* Random background selector */
function randombg() {
  var random= Math.floor(Math.random() * 6) + 0;
  var mainImage = document.querySelector(".default-image");
  mainImage.classList.remove("default-image");
  mainImage.classList.toggle("background"+random);
}

/* change navbar transparency on movement from start position */
function navbarFill() {
  window.addEventListener("scroll", function(){
      var nav = document.querySelector("#mainNav");
      nav.classList.toggle("scrolled", this.scrollY > 20);
    })
}

/* Hover about me items for text popup */
function itemHover() {
  var logos = document.querySelectorAll("#logos i");
  var aboutLogos = document.querySelectorAll("#logos span");

  for (var i = 0; i < logos.length; i++) {
    logos[i].addEventListener("mouseover", function() {
      this.classList.add("hovered");
    });
    logos[i].addEventListener("mouseout", function() {
      this.classList.remove("hovered");
    });
  }

  logos[0].addEventListener("mouseover", function() {
    aboutLogos[0].classList.remove("d-none");
  });
  logos[0].addEventListener("mouseout", function() {
    aboutLogos[0].classList.add("d-none");
  });

  logos[1].addEventListener("mouseover", function() {
    aboutLogos[1].classList.remove("d-none");
  });
  logos[1].addEventListener("mouseout", function() {
    aboutLogos[1].classList.add("d-none");
  });

  logos[2].addEventListener("mouseover", function() {
    aboutLogos[2].classList.remove("d-none");
  });
  logos[2].addEventListener("mouseout", function() {
    aboutLogos[2].classList.add("d-none");
  });

  logos[3].addEventListener("mouseover", function() {
    aboutLogos[3].classList.remove("d-none");
  });
  logos[3].addEventListener("mouseout", function() {
    aboutLogos[3].classList.add("d-none");
  });

  logos[4].addEventListener("mouseover", function() {
    aboutLogos[4].classList.remove("d-none");
  });
  logos[4].addEventListener("mouseout", function() {
    aboutLogos[4].classList.add("d-none");
  });

  logos[5].addEventListener("mouseover", function() {
    aboutLogos[5].classList.remove("d-none");
  });
  logos[5].addEventListener("mouseout", function() {
    aboutLogos[5].classList.add("d-none");
  });

  logos[6].addEventListener("mouseover", function() {
    aboutLogos[6].classList.remove("d-none");
  });
  logos[6].addEventListener("mouseout", function() {
    aboutLogos[6].classList.add("d-none");
  });
}

/* Sets scroll triggers and location on click to navigate through website */
function scrolls() {
  // Scroll locations
  var welcomeMsgScroll = document.getElementById("welcome-msg");
  var aboutScroll = document.getElementById("about-me");
  var projectsScroll = document.getElementById("projects");

  // Scroll triggers
  var navHome = document.getElementById("navHome");
  var navAbout = document.getElementById("navAbout");
  var navProjects = document.getElementById("navProjects");
  var navMainClick = document.getElementById("navMainClick");
  var navSendBeginning = document.getElementById("navSendBeginning");

  navHome.addEventListener("click", function() {
    welcomeMsgScroll.scrollIntoView(true);
  });
  navAbout.addEventListener("click", function() {
    aboutScroll.scrollIntoView(true);
  });
  navProjects.addEventListener("click", function() {
    projectsScroll.scrollIntoView(true);
  });
  navMainClick.addEventListener("click", function() {
    aboutScroll.scrollIntoView(true);
  });
  navSendBeginning.addEventListener("click", function() {
    welcomeMsgScroll.scrollIntoView(true);
  });
}
