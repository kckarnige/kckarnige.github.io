if (document.getElementById("imgLibWrapper")) {
  let portfolioList;
  fetch("/list.json", {
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
          document.getElementById("imgLibWrapper").append(portfolioEntry)
      }
    })
}
