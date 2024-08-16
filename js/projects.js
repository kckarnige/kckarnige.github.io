if (document.getElementById("projects")) {
  let projectList;
  fetch("/list.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => (projectList = response))
    .then(() => {
      for (var i = 0; i < projectList.projects.length; i++) {
          //console.log("Name: " + projectList.projects[i].name + "\nDescription: " + projectList.projects[i].description)
          let projectEntry = document.createElement("div");
          let projectEntryContainer = document.createElement("a");
          let projectBgBlur;
          let projectEntryBg
          if (projectList.projects[i].backgroundBlur == true) {
            projectBgBlur = "blur(2.5px);"
          } else {
            projectBgBlur = "blur(0px)"
          }
          
          if (projectList.projects[i].backgroundGradient == true){
            projectEntryBg = projectList.projects[i].background
          } else {
            projectEntryBg = "transparent"
          }
          projectEntry.setAttribute("style", `box-sizing: border-box; background-image: ${projectEntryBg};color: ${projectList.projects[i].textColor};`)
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
  
          projectDescription.append(projectList.projects[i].description)
          projectDescription.setAttribute("id", "projectDescription")

          projectBg.setAttribute("src", projectList.projects[i].background)
          projectBgContainer.append(projectBg)
          projectBgContainer.setAttribute("id", "projectBgContainer")
          projectBgContainer.setAttribute("style", `filter:${projectBgBlur};`)

          projectInfo.append(projectName, projectDescription)
          projectInfo.setAttribute("id", "projectInfo")
  
          if (projectList.projects[i].backgroundGradient == true){
            projectEntry.append(projectIconContainer, projectInfo)
          } else {
            projectEntry.append(projectIconContainer, projectInfo, projectBgContainer)
          }
          projectEntryContainer.append(projectEntry)
          document.getElementById("projects").append(projectEntryContainer)
      }
    })
}
