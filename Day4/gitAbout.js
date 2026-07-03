async function getUser(userName, controller) {
  try {
    console.log("here", userName);
    const response = await fetch(
      `https://api.github.com/users/${userName}`,
      controller.signal,
    );
    if (!response.ok) {
      if (response.status == 404) throw new Error("User Not found");
      else if (response.status == 403 || response.status == 429)
        throw new Error("Rate limit exceeded");
    }
    const userData = await response.json();

    console.log(userData);
    return {
      avatar: userData["avatar_url"],
      name: userData["name"],
      bio: userData["bio"],
      location: userData["location"],
      followers: userData["followers"],
      following: userData["following"],
      repos_url: userData["repos_url"],
      userName: userName,
    };
  } catch (err) {
    alert(`warning: ${err.message}`);
    console.error(err.mesage);
  }
}
async function fetchRepo(url, controller) {
  try {
    console.log(url);
    const repoData = await fetch(url, controller.signal);
    if (!repoData.ok) {
      throw new Error("Http error");
    }
    const formattedRepoData = await repoData.json();
    // const formattedRepoData = repoData;
    console.log(formattedRepoData);
    let arr = formattedRepoData.map((item) => {
      return {
        ProjectName: item["name"],
        private: item["private"],
        starCount: item["stargazers_count"],
        language: item["language"],
        description: item["description"],
      };
    });
    arr = arr.slice(0, 6);
    arr = arr.sort((a, b) => b.starCount - a.starCount);
    return arr;
  } catch (err) {
    console.error("Shown error");
    throw err;
  }
}
let controller = null;
async function handle(userName) {
  try {
    if (controller) controller.abort();
    controller = new AbortController();
    const details = await getUser(userName, controller);
    if (!details) {
      throw new Error(`user ${userName} does not exists`);
    }
    if (!details["repos_url"]) {
      throw new Error("No repositary");
    }
    const repoInfo = await fetchRepo(details["repos_url"], controller);
    console.log(repoInfo);
    console.log(details);
    display(details, repoInfo);
  } catch (err) {
    showError(err);
  }
}

const github = document.querySelector(".gitHub");
const errDiv = document.querySelector(".error");
function display(details, repoInfo) {
  console.log(details["avatar"]);
  const avatarDiv = document.querySelector(".avatar-div");
  avatarDiv.innerHTML = "";
  const image = document.createElement("img");
  image.classList.add("avatar");
  image.setAttribute("src", details["avatar"]);
  avatarDiv.appendChild(image);
  const name = document.querySelector(".name");
  const username = document.querySelector(".uname");
  name.textContent = details["name"];
  username.textContent = details["userName"];
  const followers = document.querySelector(".followers-number");
  const following = document.querySelector(".following-number");
  followers.textContent = details["followers"];
  following.textContent = details["following"];
  const bioAndLocation = document.querySelector(".bioAndLocation");
  if (details["bio"]) {
    const bio = document.createElement("span");
    bio.textContent = `Bio :${details["bio"]} `;
  }
  if (details["location"]) {
    const location = document.createElement("span");
    location.textContent = `Location :${details["bio"]} `;
  }
  const repoContainer = document.querySelector(".repo-list");
  repoContainer.innerHTML = "";
  for (let item of repoInfo) {
    let mainLi = document.createElement("li");
    let div1 = document.createElement("div");
    div1.classList.add("single-project");
    let div2 = document.createElement("div");
    div2.classList.add("single-project-details");
    let divProjectName = document.createElement("div");
    divProjectName.classList.add("project-name");
    let spanPname = document.createElement("span");
    spanPname.textContent = item.ProjectName;
    let spanPrivacy = document.createElement("span");
    spanPrivacy.classList.add("privacy");
    spanPrivacy.textContent = item.private ? "Private" : "Public";
    divProjectName.appendChild(spanPname);
    divProjectName.appendChild(spanPrivacy);
    let descriptionPara = document.createElement("p");
    descriptionPara.classList.add("description");
    if (item.description) descriptionPara.textContent = item.description;
    let languageDiv = document.createElement("div");
    languageDiv.classList.add("language");
    let languageNameSpan = document.createElement("span");
    languageNameSpan.classList.add("languageName");
    if (item.language) languageNameSpan.textContent = item.language;
    let spanStarContainer = document.createElement("span");
    spanStarContainer.classList.add("star-count");
    const starSvg = document.createElement("span");
    starSvg.innerHTML = `&#9734;`;
    starSvg.classList.add("octicon");
    spanStarContainer.appendChild(starSvg);
    let count = document.createElement("span");
    count.textContent = item.starCount;
    spanStarContainer.appendChild(count);
    languageDiv.appendChild(languageNameSpan);
    languageDiv.appendChild(spanStarContainer);
    div2.appendChild(divProjectName);
    div2.appendChild(descriptionPara);
    div2.appendChild(languageDiv);
    div1.appendChild(div2);
    mainLi.appendChild(div1);
    repoContainer.appendChild(mainLi);
    console.log(mainLi);
  }
  github.classList.add("visible");
  errDiv.classList.remove("visible");
}
const inputForm = document.querySelector(".input-form");
const input = document.querySelector(".input");
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let val = input.value.trim();

  if (val !== "") {
    console.log(val);
    handle(val);
  }

  inputForm.reset();
});

function showError(err) {
  errDiv.textContent = err.message;
  github.classList.remove("visible");
  errDiv.classList.add("visible");
}
