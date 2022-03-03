const text = document.getElementById("info-text");
const button = document.getElementById("warning-continue");

button.style.display = "none";

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const supercalifragilisticexpialidocious = urlParams.get("url");
let url = urlParams.get("url");

if (!supercalifragilisticexpialidocious) {
  text.innerHTML = "No URL specified";
}

if (!url.startsWith("http")) {
  url = "https://" + url.split("/")[0];
} else {
  url = "https://" + url.split("/")[2];
}

if (!supercalifragilisticexpialidocious.startsWith("http")) {
  supercalifragilisticexpialidocious = `https://${supercalifragilisticexpialidocious}`
}

YAML.load("list.yml", function (result) {
  let list = YAML.parse(YAML.stringify(result));
  if (!list[url]) return window.location.replace(supercalifragilisticexpialidocious);
  for (i in list[url]) {
    //i = i.replace(i[0], i[0].toUpperCase());
    if (i == "redirect") {
      window.location.replace(list[url][i]);
    } else if (i == "warning") {
      text.innerHTML = `${i} reason: ${list[url][i]}`;
      button.style.display = "block";
      button.innerHTML = "Continue anyway";
      button.addEventListener("click", function () {
        window.location.replace(supercalifragilisticexpialidocious);
      });
    } else {
      text.innerHTML = `${i} reason: ${list[url][i]}`;
    }
  }
});
