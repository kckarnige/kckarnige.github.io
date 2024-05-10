console.log("Loaded main script :D");
var portfolioListNum = parseInt(localStorage.getItem("portfolio"))
function disableScroll() {
  document.documentElement.classList.add("scrollByebye")
  for (var i = 0; i < document.getElementsByClassName("link").length; i++) {
    document.getElementsByClassName("link")[i].setAttribute("tabindex", "-1")
  }
}

function enableScroll() {
  document.documentElement.classList.remove("scrollByebye")
  for (var i = 0; i < document.getElementsByClassName("link").length; i++) {
    document.getElementsByClassName("link")[i].removeAttribute("tabindex", "-1")
  }
}

// Topbar (I made it JS so it's easier to change things)
document.getElementById("topbar").innerHTML = `
<div id="img"></div><div id="trashyWelcome"><p>Carnige's ${document.title.split(" ")[0]}</p></div>
<div id="ui">
    <ul>
        <li>
            <a href="/" class="link">Home</a>
        </li>
        <li>
            <a href="/projects" class="link">Projects</a>
        </li>
        <li>
            <a href="/donate" class="link" target="_blank">Donate<svg viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path
                        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </svg></a>
        </li>
        <li>
            <a href="https://github.com/kckarnige#-my-socials-" class="link" target="_blank">Socials<svg viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
                d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
        </svg></a>
    </ul>
</div>
`;

// Image expanding
var previewableImgs = document.getElementsByClassName("imgPreviewable");
window.onload = () => {
  setTimeout(() => {
    for (var i = 0; i < previewableImgs.length; i++) {
      previewableImgs[i].addEventListener("click", (e) => {
        document.getElementById("closeImgPreview").style.display = "block";
        document.getElementById("imgPreviewOverlay").style.display = "block";
        document.getElementById("imgPreview").src = e.target.getAttribute("src");
        document.getElementById("imgPreview").setAttribute("pixelated", e.target.getAttribute("pixelated"));
        document.getElementById("imgPreview").setAttribute("imgId", e.target.getAttribute("imgId"));
        document.getElementById("imgTitle").innerText = e.target.getAttribute("imgTitle")
        var currentImgPrev = parseInt(document.getElementById("imgPreview").getAttribute("imgId"), 10);
        if (currentImgPrev == 0) {
          document.getElementById("navLeft").style.display = "none";
        } else {
          document.getElementById("navLeft").style.display = "block";
        }
        if (currentImgPrev == portfolioListNum) {
          document.getElementById("navRight").style.display = "none";
        } else {
          document.getElementById("navRight").style.display = "block";
        }
        var temp = e.target.getAttribute("imgDesc") + ""
        if (!temp.includes("|link|")) {
          document.getElementById("imgDesc").innerText = temp
          document.getElementById("imgLink").style.display = "none";
        } else if (temp.split("|link|")[1]) {
          document.getElementById("imgDesc").innerText = temp.split("|link|")[0]
          document.getElementById("imgLink").setAttribute("href", temp.split("|link|")[1])
          document.getElementById("imgLink").innerText = "LINK"
          document.getElementById("imgLink").style.display = "block";
          if (temp.split("|link|")[2]) {
            document.getElementById("imgLink").innerText = temp.split("|link|")[2]
          }
        }
        disableScroll();
      });
    }
  }, 500)
}
document.getElementById("closeImgPreview").addEventListener("click", () => {
  document.getElementById("closeImgPreview").style.display = "none";
  document.getElementById("imgPreview").style.animation = "zoomOut 0.3s ease";
  document.getElementById("imgPreviewOverlay").style.animation = "fadeOut 0.3s ease-in";
  enableScroll();
  setTimeout(() => {
    document.getElementById("imgPreviewOverlay").style.display = "none";
    document.getElementById("imgPreview").style.animation = "";
    document.getElementById("imgPreviewOverlay").style.animation = "";
    document.getElementById("imgPreview").src = "";
    document.getElementById("imgTitle").innerText = "";
    document.getElementById("imgDesc").innerText = "";
  }, 295);
});

function previousImg() {
  var pe = parseInt(document.getElementById("imgPreview").getAttribute("imgId"), 10)
  var nis = pe - 1
  var warmer = document.querySelectorAll(`.imgPreviewable[imgId="${nis}"]`)[0];
  if (pe != 0) {
    document.getElementById("navLeft").style.display = "block";
    document.getElementById("navRight").style.display = "block";
    document.getElementById("imgPreview").src = warmer.getAttribute("src");
    document.getElementById("imgPreview").setAttribute("pixelated", warmer.getAttribute("pixelated"));
    document.getElementById("imgPreview").setAttribute("imgId", warmer.getAttribute("imgId"));
    document.getElementById("imgTitle").innerText = warmer.getAttribute("imgTitle")
    var temp = warmer.getAttribute("imgDesc") + ""
    if (!temp.includes("|link|")) {
      document.getElementById("imgDesc").innerText = temp
      document.getElementById("imgLink").style.display = "none";
    } else if (temp.split("|link|")[1]) {
      document.getElementById("imgDesc").innerText = temp.split("|link|")[0]
      document.getElementById("imgLink").setAttribute("href", temp.split("|link|")[1])
      document.getElementById("imgLink").innerText = "LINK"
      document.getElementById("imgLink").style.display = "block";
      if (temp.split("|link|")[2]) {
        document.getElementById("imgLink").innerText = temp.split("|link|")[2]
      }
    }
    if (nis == 0) {
      document.getElementById("navLeft").style.display = "none";
    } else {
      document.getElementById("navLeft").style.display = "block";
    }
    if (nis == portfolioListNum) {
      document.getElementById("navRight").style.display = "none";
    } else {
      document.getElementById("navRight").style.display = "block";
    }
  } else {
    document.getElementById("navLeft").style.display = "none";
    console.log("NOT_ALLOWED")
  }
}

function nextImg() {
  var pe = parseInt(document.getElementById("imgPreview").getAttribute("imgId"), 10)
  var nis = pe + 1
  var warmer = document.querySelectorAll(`.imgPreviewable[imgId="${nis}"]`)[0];
  if (pe != portfolioListNum) {
    document.getElementById("navLeft").style.display = "block";
    document.getElementById("navRight").style.display = "block";
    document.getElementById("imgPreview").src = warmer.getAttribute("src");
    document.getElementById("imgPreview").setAttribute("pixelated", warmer.getAttribute("pixelated"));
    document.getElementById("imgPreview").setAttribute("imgId", warmer.getAttribute("imgId"));
    document.getElementById("imgTitle").innerText = warmer.getAttribute("imgTitle")
    var temp = warmer.getAttribute("imgDesc") + ""
    if (!temp.includes("|link|")) {
      document.getElementById("imgDesc").innerText = temp
      document.getElementById("imgLink").style.display = "none";
    } else if (temp.split("|link|")[1]) {
      document.getElementById("imgDesc").innerText = temp.split("|link|")[0]
      document.getElementById("imgLink").setAttribute("href", temp.split("|link|")[1])
      document.getElementById("imgLink").innerText = "LINK"
      document.getElementById("imgLink").style.display = "block";
      if (temp.split("|link|")[2]) {
        document.getElementById("imgLink").innerText = temp.split("|link|")[2]
      }
    }
    if (nis == 0) {
      document.getElementById("navLeft").style.display = "none";
    } else {
      document.getElementById("navLeft").style.display = "block";
    }
    if (nis == portfolioListNum) {
      document.getElementById("navRight").style.display = "none";
    } else {
      document.getElementById("navRight").style.display = "block";
    }
  } else {
    document.getElementById("navRight").style.display = "none";
    console.log("NOT_ALLOWED")
  }
}

document.body.addEventListener("keyup", (e) => {
  if (e.isComposing || e.key === "Escape") {
    document.getElementById("closeImgPreview").style.display = "none";
    document.getElementById("imgPreview").style.animation = "zoomOut 0.3s ease";
    document.getElementById("imgPreviewOverlay").style.animation = "fadeOut 0.3s ease-in";
    enableScroll();
    setTimeout(() => {
      document.getElementById("imgPreviewOverlay").style.display = "none";
      document.getElementById("imgPreview").style.animation = "";
      document.getElementById("imgPreviewOverlay").style.animation = "";
      document.getElementById("imgPreview").src = "";
      document.getElementById("imgTitle").innerText = "";
      document.getElementById("imgDesc").innerText = "";
    }, 295);
  }
  if (e.key === "ArrowRight") {
    nextImg()
  }
  if (e.key === "ArrowLeft") {
    previousImg()
  }
});


document.getElementById("navLeft").addEventListener("click", () => {
  previousImg()
});

document.getElementById("navRight").addEventListener("click", () => {
  nextImg()
});