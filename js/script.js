console.log("Loaded main script :D");
var portfolioListNum = localStorage.getItem("portfolio")
function disableScroll() {
  document.documentElement.classList.add("scrollByebye")
  for (var i = 0; i < document.getElementsByClassName("link").length; i++) {
    document.getElementsByClassName("link")[i].setAttribute("tabindex","-1")
  }
}

function enableScroll() {
  document.documentElement.classList.remove("scrollByebye")
  for (var i = 0; i < document.getElementsByClassName("link").length; i++) {
    document.getElementsByClassName("link")[i].removeAttribute("tabindex","-1")
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
            <a href="https://buymeacoffee.com/kckarnige" class="link" target="_blank">Donate<svg viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path
                        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </svg></a>
        </li>
        <li>
            <a href="https://twitter.com/kckarnige" class="link" target="_blank">Twitter<svg viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
                d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
        </svg></a>
        </li>
        <li>
            <a href="https://github.com/kckarnige" class="link" target="_blank">GitHub<svg viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path
                        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </svg></a>
        </li>
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
        document.getElementById("imgDesc").innerText = e.target.getAttribute("imgDesc")
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

document.body.addEventListener("keydown", (event) => {
  if (event.isComposing || event.key === "Escape") {
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
});


document.getElementById("navLeft").addEventListener("click", () => {
  var pe = parseInt(document.getElementById("imgPreview").getAttribute("imgId"),10)
  var nis = pe-1
  var warmer = document.querySelectorAll(`.imgPreviewable[imgId="${nis}"]`)[0];
  console.log(pe+" -> "+nis)
  if(pe!=0){
    console.log("ALLOWED")
    console.log(warmer.getAttribute("src")) 
  } else {
    console.log("NOT_ALLOWED")
  }
});

document.getElementById("navRight").addEventListener("click", () => {
  var pe = parseInt(document.getElementById("imgPreview").getAttribute("imgId"),10)
  var nis = pe+1
  var warmer = document.querySelectorAll(`.imgPreviewable[imgId="${nis}"]`)[0];
  console.log(pe+" -> "+nis)
  if(pe!=portfolioListNum){
    console.log("ALLOWED")
    console.log(warmer.getAttribute("src")) 
  } else {
    console.log("NOT_ALLOWED")
  }
});