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
          projectEntry.setAttribute("id", "projectEntry")
          projectEntry.setAttribute("style", `background: ${projectList.projects[i].background};  color: ${projectList.projects[i].textColor};`)
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
  
          projectIcon.setAttribute("src", projectList.projects[i].icon)
          projectIconContainer.append(projectIcon)
          projectIconContainer.setAttribute("id", "projectIconContainer")
  
          projectName.append(projectList.projects[i].name)
          projectName.setAttribute("id", "projectName")
  
          projectDescription.append(projectList.projects[i].description)
          projectDescription.setAttribute("id", "projectDescription")
  
          projectInfo.append(projectName, projectDescription)
          projectInfo.setAttribute("id", "projectInfo")
  
          projectEntry.append(projectIconContainer,  projectInfo)
          projectEntryContainer.append(projectEntry)
          document.getElementById("projects").append(projectEntryContainer)
      }
    })
}
