"use strict";

var projectCards;

(function ($) {
  jQuery(document).ready(function () {

    var isMobile = false, isTablet = false, isLaptop = false;

    function detectDevice() {
      if (window.innerWidth <= 425) {
        isMobile = true;
        isTablet = false;
        isLaptop = false;
      } else if (window.innerWidth <= 768) {
        isMobile = false;
        isTablet = true;
        isLaptop = false;
      } else {
        isMobile = false;
        isTablet = false;
        isLaptop = true;
      }
    }
    detectDevice();

    // =========== Typing Carousel ================
    // get data from hidden ul and set as typing data
    if (document.getElementById('typing-carousel-data') != undefined) {
      var ul = document.getElementById('typing-carousel-data').children;

      if (ul.length != 0) {
        var data = [];
        Array.from(ul).forEach(el => {
          data.push(el.textContent);
        })

        ityped.init('#ityped', {
          strings: data,
          startDelay: 200,
          loop: true
        });
      }
    }

    // ================= Smooth Scroll ===================
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });

    // ============== Fix Timelines Horizontal Lines =========
    var hLines = document.getElementsByClassName("horizontal-line");
    for (let i = 0; i < hLines.length; i++) {
      if (i % 2) {
        hLines[i].children[0].children[0].classList.add("bottom-right");
        hLines[i].children[2].children[0].classList.add("top-left");
      } else {
        hLines[i].children[0].children[0].classList.add("top-right");
        hLines[i].children[2].children[0].classList.add("bottom-left");
      }
    }

    // ============== Fix Timelines Vertical lines =========
    var vLines = document.getElementsByClassName("vertical-line");
    for (let i = 0; i < vLines.length; i++) {
      if (i % 2) {
        vLines[i].classList.add("vertical-line-left-adjustment");
      }
    }

    // ==================== Adjust height of the skills card =============
    function adjustSkillCardsHeight() {
      if (!isMobile) { // no need to adjust height for mobile devices
        // primary skills
        var el = document.getElementById("primary-skills").children;
        var maxHeight = 0;
        for (let i = 0; i < el.length; i++) {
          if (el[i].children[0].clientHeight > maxHeight) {
            maxHeight = el[i].children[0].clientHeight;
          }
        }
        for (let i = 0; i < el.length; i++) {
          el[i].children[0].setAttribute("style", "min-height: " + maxHeight + "px;")
        }
      }
    }
    adjustSkillCardsHeight();

    // ================== Project cards =====================
    // Add click action on project category selector buttons
    var btns = document.getElementById("project-filter-buttons").children;

    for (let i = 0; i < btns.length; i++) {
      btns[i].onclick = function () {
        showGithubStars(btns[i].id);
      }
    }

    if (document.getElementById("project-card-holder").children.length != 0) {
      projectCards = $(".filtr-projects").filterizr({ layout: 'sameWidth' });
    }

    function showGithubStars() {
      // fix the github button class
      // we had set it to github-button-inactive in projects holder cards so that respective javascript
      // don't render it and replace respective span with shadow root
      let githubButtons = document.getElementsByClassName("github-button-inactive");
      while (githubButtons.length > 0) {
        if (githubButtons[0].classList != undefined) {
          githubButtons[0].classList.replace("github-button-inactive", "github-button");
        }
      }
      // now render github button. it will call the github API and fill the respective fields
      renderGithubButton();
    }
    showGithubStars();

    // ==================== Adjust height of the recent-posts card =============

    function adjustRecentPostsHeight() {
      if (!isMobile) { // no need to adjust height for mobile devices
        let el = document.getElementById("recent-post-cards").children;
        let maxHeight = 0;
        for (let i = 0; i < el.length; i++) {
          if (el[i].children[1].clientHeight > maxHeight) {
            maxHeight = el[i].children[1].clientHeight;
          }
        }
        for (let i = 0; i < el.length; i++) {
          el[i].children[1].setAttribute("style", "min-height: " + maxHeight + "px;")
        }
      }
    }
    adjustRecentPostsHeight();

    // =============== Achievements ===========

    function fourColumRow(gallery, entries, i) {
      let entry1 = document.createElement("div");
      entry1.classList.add("col-lg-6", "m-0", "p-0");
      entry1.appendChild(entries[i].cloneNode(true));
      entry1.children[0].classList.add("img-type-1");
      gallery.appendChild(entry1);
      i++;

      let entry2 = document.createElement("div");
      entry2.classList.add("col-lg-3", "m-0", "p-0");
      entry2.appendChild(entries[i].cloneNode(true));
      entry2.children[0].classList.add("img-type-1");
      gallery.appendChild(entry2);
      i++;

      let entry3 = document.createElement("div");
      entry3.classList.add("col-lg-3", "m-0", "p-0");
      entry3.appendChild(entries[i].cloneNode(true));
      entry3.children[0].classList.add("img-type-2");
      i++;
      entry3.appendChild(entries[i].cloneNode(true));
      entry3.children[1].classList.add("img-type-2");
      gallery.appendChild(entry3);
      i++;
    }

    function fourColumnReversedRow(gallery, entries, i) {
      let entry1 = document.createElement("div");
      entry1.classList.add("col-lg-3", "m-0", "p-0");
      entry1.appendChild(entries[i].cloneNode(true));
      entry1.children[0].classList.add("img-type-2");
      i++;
      entry1.appendChild(entries[i].cloneNode(true));
      entry1.children[1].classList.add("img-type-2");
      gallery.appendChild(entry1);
      i++;

      let entry2 = document.createElement("div");
      entry2.classList.add("col-lg-3", "m-0", "p-0");
      entry2.appendChild(entries[i].cloneNode(true));
      entry2.children[0].classList.add("img-type-1");
      gallery.appendChild(entry2);
      i++;

      let entry3 = document.createElement("div");
      entry3.classList.add("col-lg-6", "m-0", "p-0");
      entry3.appendChild(entries[i].cloneNode(true));
      entry3.children[0].classList.add("img-type-1");
      gallery.appendChild(entry3);
      i++;
    }

    function threeColumnRow(gallery, entries, i) {
      console.log(i);
      let entry1 = document.createElement("div");
      entry1.classList.add("col-lg-6", "col-md-6", "m-0", "p-0");
      entry1.appendChild(entries[i].cloneNode(true));
      entry1.children[0].classList.add("img-type-1");
      gallery.appendChild(entry1);
      i++;

      let entry2 = document.createElement("div");
      entry2.classList.add("col-lg-3", "col-md-3", "m-0", "p-0");
      entry2.appendChild(entries[i].cloneNode(true));
      entry2.children[0].classList.add("img-type-1");
      gallery.appendChild(entry2);
      i++;

      let entry3 = document.createElement("div");
      entry3.classList.add("col-lg-3", "col-md-3", "m-0", "p-0");
      entry3.appendChild(entries[i].cloneNode(true));
      entry3.children[0].classList.add("img-type-1");
      gallery.appendChild(entry3);
      i++;
    }
    function threeColumnReversedRow(gallery, entries, i) {
      let entry1 = document.createElement("div");
      entry1.classList.add("col-lg-3", "col-md-3", "m-0", "p-0");
      entry1.appendChild(entries[i].cloneNode(true));
      entry1.children[0].classList.add("img-type-1");
      gallery.appendChild(entry1);
      i++;

      let entry2 = document.createElement("div");
      entry2.classList.add("col-lg-3", "col-md-3", "m-0", "p-0");
      entry2.appendChild(entries[i].cloneNode(true));
      entry2.children[0].classList.add("img-type-1");
      gallery.appendChild(entry2);
      i++;

      let entry3 = document.createElement("div");
      entry3.classList.add("col-lg-6", "col-md-3", "m-0", "p-0");
      entry3.appendChild(entries[i].cloneNode(true));
      entry3.children[0].classList.add("img-type-1");
      gallery.appendChild(entry3);
      i++;
    }
    function twoColumnRow(gallery, entries, i) {
      let entry1 = document.createElement("div");
      entry1.classList.add("col-lg-6", "col-md-6", "m-0", "p-0");
      entry1.appendChild(entries[i].cloneNode(true));
      entry1.children[0].classList.add("img-type-1");
      gallery.appendChild(entry1);
      i++;

      let entry2 = document.createElement("div");
      entry2.classList.add("col-lg-6", "col-md-6", "m-0", "p-0");
      entry2.appendChild(entries[i].cloneNode(true));
      entry2.children[0].classList.add("img-type-1");
      gallery.appendChild(entry2);
      i++;
    }

    function singleColumnRow(gallery, entries, i) {
      let entry1 = document.createElement("div");
      entry1.classList.add("col-lg-6", "col-md-6", "m-0", "p-0");
      entry1.appendChild(entries[i].cloneNode(true));
      entry1.children[0].classList.add("img-type-1");
      gallery.appendChild(entry1);
      i++;
    }

    function showAchievements() {
      // show achievements from achievements-holder div
      let gallery = document.getElementById("gallery");
      gallery.innerHTML = "";
      const entries = document.getElementById("achievements-holder").children;
      let len = entries.length;
      let i = 0;
      let rowNumber = 1;
      while (i < len) {
        if (isLaptop) {
          if (i + 4 <= len) {
            if (rowNumber % 2) {
              fourColumRow(gallery, entries, i);
            } else {
              fourColumnReversedRow(gallery, entries, i);
            }
            i += 4;

          } else if (i + 3 <= len) {
            if (rowNumber % 2) {
              threeColumnRow(gallery, entries, i);
            } else {
              threeColumnReversedRow(gallery, entries, i);
            }
            i += 3;
          } else if (i + 2 <= len) {
            twoColumnRow(gallery, entries, i);
            i += 2;
          } else {
            singleColumnRow(gallery, entries, i);
            i++;
          }
        } else if (isTablet) {
          if (i + 2 <= len) {
            twoColumnRow(gallery, entries, i);
            i += 2;
          } else {
            singleColumnRow(gallery, entries, i);
            i++;
          }
        } else {
          singleColumnRow(gallery, entries, i);
          i++;
        }
        rowNumber++;
      }

      // show full image on click
      let elements = document.getElementsByClassName("achievement-entry");
      len = elements.length;
      for (let i = 0; i < len; i++) {
        elements[i].onclick = function () {
          let achievements = document.getElementsByClassName("achievement-entry");
          let len2 = achievements.length;
          for (let j = 0; j < len2; j++) {
            achievements[j].classList.toggle("hidden");
          }
          this.classList.toggle("achievement-details");
          this.classList.toggle("hidden");
          this.parentElement.classList.toggle("col-lg-12");
          this.parentElement.classList.toggle("col-md-12");
          this.parentElement.classList.toggle("col-sm-12");
          if (this.children["caption"] != undefined) {
            this.children["caption"].classList.toggle("hidden");
          }
          if (this.children["enlarge-icon"] != undefined) {
            this.children["enlarge-icon"].classList.toggle("fa-search-plus");
            this.children["enlarge-icon"].classList.toggle("fa-times");
          }
          if (this.children["achievement-title"] != undefined) {
            this.children["achievement-title"].classList.toggle("hidden");
          }
        }
      }
    }
    showAchievements();

    // re-render custom functions on window resize
    window.onresize = function () {
      detectDevice();
      adjustSkillCardsHeight();
      adjustRecentPostsHeight();
      showAchievements();
    };
  });

})(jQuery);
