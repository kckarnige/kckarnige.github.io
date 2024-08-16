
if (document.getElementById("imgLibWrapper")) {
  let portfolioList;
  fetch("/portfolio.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => (portfolioList = response))
    .then(() => {
      console.log(portfolioList.portfolio.length-1)
      for (var i = 0; i < portfolioList.portfolio.length; i++) {
          let portfolioEntry = document.createElement("img");
          portfolioEntry.setAttribute("imgTitle", portfolioList.portfolio[i].title);
          portfolioEntry.setAttribute("imgDesc", portfolioList.portfolio[i].description);
          portfolioEntry.classList.add("imgPreviewable");
          portfolioEntry.setAttribute("src", portfolioList.portfolio[i].img)
          portfolioEntry.setAttribute("pixelated", portfolioList.portfolio[i].pixelated);
          portfolioEntry.setAttribute("imgId", i);
          document.getElementById("imgLibWrapper").append(portfolioEntry)
          if(i+1 == portfolioList.portfolio.length){
            localStorage.setItem("portfolio",i)
          }
      }
    })
}
