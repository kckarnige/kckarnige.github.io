var topProjectNums = [1, 8, 0, 11];
let portfolioListNum;
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

// Projects
if (document.getElementById("projects") || document.getElementById("topProjects") || document.getElementById("recentProjects")) {
  let projectList;
  fetch("/json/projects.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => (projectList = response))
    .then(() => {
      function addProjectsTo(addTo) {
        //console.log("Name: " + projectList.projects[i].name + "\nDescription: " + projectList.projects[i].description)
        let projectEntry = document.createElement("div");
        let projectEntryContainer = document.createElement("a");
        let projectBgBlur;
        let projectEntryBg;
        if (projectList.projects[i].backgroundBlur == true) {
          projectBgBlur = "blur(2.5px);"
        } else {
          projectBgBlur = "blur(0px);"
        }
        if (projectList.projects[i].backgroundGradient == true) {
          projectEntryBg = projectList.projects[i].background
        } else {
          projectEntryBg = "transparent"
        }
        projectEntry.setAttribute("style", `box-sizing: border-box; background-image: ${projectEntryBg};`)
        projectEntry.setAttribute("id", "projectEntry")
        projectEntry.setAttribute("title", projectList.projects[i].name)

        if (projectList.projects[i].link) {
          projectEntryContainer.setAttribute("href", projectList.projects[i].link)
        }
        projectEntryContainer.setAttribute("target", "_blank")


        let projectIcon = document.createElement("img");
        let projectIconContainer = document.createElement("div");
        let projectName = document.createElement("p");
        let projectDescription = document.createElement("p");
        let projectInfo = document.createElement("div");
        let projectBg = document.createElement("img");
        let projectBgContainer = document.createElement("div");

        projectIcon.setAttribute("src", projectList.projects[i].icon)
        projectIconContainer.append(projectIcon)
        projectIconContainer.setAttribute("id", "projectIconContainer")

        projectName.append(projectList.projects[i].name)
        projectName.setAttribute("id", "projectName")
        projectName.style.color = projectList.projects[i].textColor

        projectDescription.append(projectList.projects[i].description)
        projectDescription.setAttribute("id", "projectDescription")
        projectDescription.style.color = projectList.projects[i].textColorDesc

        projectBg.setAttribute("src", projectList.projects[i].background)
        projectBg.setAttribute("style", `filter:${projectBgBlur};`)
        projectBgContainer.append(projectBg)
        projectBgContainer.setAttribute("id", "projectBgContainer")
        projectInfo.append(projectName, projectDescription)
        projectInfo.setAttribute("id", "projectInfo")

        if (projectList.projects[i].backgroundGradient == true) {
          projectEntry.append(projectIconContainer, projectInfo)
        } else {
          projectEntry.append(projectIconContainer, projectInfo, projectBgContainer)
        }
        projectEntryContainer.append(projectEntry)
        addTo.append(projectEntryContainer)
      }

      if (document.getElementById("topProjects")) {
        // Get the 4 top projects
        var e = 0;
        for (e; e < topProjectNums.length; e++) {
          var i = 0;
          for (i; i < projectList.projects.length; i++) {
            if (topProjectNums[e] == i) {
              //console.log(`Iteration ${e}|${i}`)
              addProjectsTo(document.getElementById("topProjects"))
            }
          }
        }
      }
      if (document.getElementById("recentProjects")) {
        // Get the 4 most recently added projects
        var i = projectList.projects.length;
        for (i = i - 1; projectList.projects.length - i - 1 < 4; i--) {
          //console.log("Name: " + projectList.projects[i].name + "\nDescription: " + projectList.projects[i].description)
          addProjectsTo(document.getElementById("recentProjects"))
        }
      }
      if (document.getElementById("projects")) {
        // Setup the "projects" page
        var i = 0;
        for (i; i < projectList.projects.length; i++) {
          addProjectsTo(document.getElementById("projects"));
        }
      }
    })
}

// Portfolio
if (document.getElementById("portfolio")) {
  let portfolioList;
  var previewableImgs = document.getElementsByClassName("imgPreviewable");

  // Image Preview Setup Part I
  document.body.innerHTML = `
    <div id="imgPreviewOverlay">
        <div id="closeImgPreview">
            <a>⨉</a>
        </div>
        <div id="imgPreviewContainer">
            <img id="imgPreview" src="" />
        </div>
        <div id="imgNav">
            <a id="navRight">
                <div class="icon-navRight"></div>
            </a>
            <a id="navLeft">
                <div class="icon-navLeft"></div>
            </a>
        </div>
        <div id="imgContent">
            <h2 id="imgTitle"></h2>
            <p id="imgDesc"></p>
            <a id="imgLink" target="_blank">LINK</a>
        </div>
    </div>
    ${document.body.innerHTML}
    `

  // Image Preview Setup Part II
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
  })

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
      //console.log("NOT_ALLOWED")
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
      //console.log("NOT_ALLOWED")
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
  })


  document.getElementById("navLeft").addEventListener("click", () => {
    previousImg()
  })

  document.getElementById("navRight").addEventListener("click", () => {
    nextImg()
  })

  // Portfolio Setup
  fetch("/json/portfolio.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => (portfolioList = response))
    .then(() => {
      for (var i = 0; i < portfolioList.portfolio.length; i++) {
        let portfolioEntry = document.createElement("img");
        portfolioEntry.setAttribute("imgTitle", portfolioList.portfolio[i].title);
        portfolioEntry.setAttribute("imgDesc", portfolioList.portfolio[i].description);
        portfolioEntry.classList.add("imgPreviewable");
        portfolioEntry.setAttribute("src", portfolioList.portfolio[i].img)
        portfolioEntry.setAttribute("pixelated", portfolioList.portfolio[i].pixelated);
        portfolioEntry.setAttribute("imgId", i);
        document.getElementById("portfolio").append(portfolioEntry)
        if (i + 1 == portfolioList.portfolio.length) {
          portfolioListNum = i;
        }
      }
    })
};

// Splash Text
if (document.getElementById("warmSplashText") && !document.getElementById("huh")) {
  let splashList;
  fetch("/json/splashes.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => (splashList = response))
    .then(() => {
      let min = 0;
      let max = splashList.length - 1;
      let rng = Math.floor(Math.random() * (max - min + 1)) + min;
      if ((splashList[rng] == "mcVer") || (splashList[rng] == "mcSnap")) {
        fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (splashList[rng] == "mcVer") {
              document.getElementById("warmSplashText").innerText = "The latest Minecraft version is " + response.latest.release + ", btw.";
            }
            
            if (splashList[rng] == "mcSnap") {
              document.getElementById("warmSplashText").innerText = "The latest Minecraft snapshot is " + response.latest.snapshot + ", btw.";
            }
          })
      } else {
        document.getElementById("warmSplashText").innerText = splashList[rng];
      }
    })
} else if (document.getElementById("huh")) {
  document.getElementById("warmSplashText").innerText = "404: Page does not exist";
}