console.log("Loaded main script :D");

function disableScroll() {
  // Get the current page scroll position
  scrollTop = window.scrollY || document.documentElement.scrollTop;
  (scrollLeft = window.scrollX || document.documentElement.scrollLeft),
    // if any scroll is attempted, set this to the previous value
    (window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    });
}

function enableScroll() {
  window.onscroll = function () {};
}

// Topbar (I made it JS so it's easier to change things)
document.getElementById("topbar").innerHTML = `
<div id="img"></div><div id="trashyWelcome"><p>Carnige's Dumpster</p></div>
<div id="ui">
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="https://gamejolt.com/@kckarnige/games" target="_blank">GameJolt<svg viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
                d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
        </svg></a>
        </li>
        <li>
            <a href="https://gamebanana.com/members/1716410" target="_blank">GameBanana<svg viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path
                        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </svg></a>
        </li>
        <li>
            <a href="https://modrinth.com/user/kckarnige" target="_blank">Modrinth<svg viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path
                        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </svg></a>
        </li>
        <li>
            <a href="https://twitter.com/kckarnige" target="_blank">Twitter<svg viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
                d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
        </svg></a>
        </li>
        <li>
            <a href="https://github.com/kckarnige" target="_blank">GitHub<svg viewBox="0 0 24 24"
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
document.getElementById("imgPreviewOverlay").innerHTML = `
<div id="closeImgPreview">
    <a>⨉</a>
</div>
<div id="imgPreviewContainer">
    <div>
        <img id="imgPreview" src="" />
    </div>
</div>
`;
var previewableImgs = document.getElementsByClassName("imgPreviewable");
for (var i = 0; i < previewableImgs.length; i++) {
  previewableImgs[i].addEventListener("click", (e) => {
    document.getElementById("closeImgPreview").style.display = "block";
    document.getElementById("imgPreviewOverlay").style.display = "block";
    document.getElementById("imgPreview").src = e.target.getAttribute("src");
    document.getElementById("imgPreview").setAttribute("pixelated", e.target.getAttribute("pixelated"));
    disableScroll();
  });
}

document.getElementById("closeImgPreview").addEventListener("click", () => {
  document.getElementById("closeImgPreview").style.display = "none";
  document.getElementById("imgPreview").style.animation = "zoomOut 0.3s ease";
  document.getElementById("imgPreviewOverlay").style.animation =
    "fadeOut 0.3s ease-in";
  enableScroll();
  setTimeout(() => {
    document.getElementById("imgPreviewOverlay").style.display = "none";
    document.getElementById("imgPreview").style.animation = "";
    document.getElementById("imgPreviewOverlay").style.animation = "";
    document.getElementById("imgPreview").src = "";
  }, 295);
});

document.body.addEventListener("keydown", (event) => {
    if (event.isComposing || event.key === "Escape") {
        document.getElementById("closeImgPreview").style.display = "none";
        document.getElementById("imgPreview").style.animation = "zoomOut 0.3s ease";
        document.getElementById("imgPreviewOverlay").style.animation =
          "fadeOut 0.3s ease-in";
        enableScroll();
        setTimeout(() => {
          document.getElementById("imgPreviewOverlay").style.display = "none";
          document.getElementById("imgPreview").style.animation = "";
          document.getElementById("imgPreviewOverlay").style.animation = "";
          document.getElementById("imgPreview").src = "";
        }, 295);
    }
  });
