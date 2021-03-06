function getRepositories(){
  let userInput = event.target.parentElement.children[1].value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${userInput}/repos`)
  req.send()
}

function displayRepositories(){
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  let userInput = document.getElementById("username").value
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${userInput}/${name}/commits`)
  req.send()
}

function displayCommits() {

  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.filter(function(x){return x.author}).map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
