# GUIDELINES FOR DEVELOPMENT

This project is prone to be developped by several developpers, so we agreed on some basic rules...

## GENERAL 

- we try to comment and document in english
- check out our ["project" boards](https://github.com/co-demos/apiviz/projects) board to have an idea about the priorities we collectively decided to work on
- "see something, say something" : open new issues when you see problems to solve
- document your own issues with everything you have : images, references, snippets, etc... 
- we update the `README.md` and the `GUIDELINES_DEV.md` directly on github
- for the markdown files try to [follow those advices](http://www.cirosantilli.com/markdown-style-guide/#dollar-signs-in-shell-code)...

## JAVASCRIPT

- camelcase your functions' and variables' names
- lint off your code as mush as possible
- comment your code

## PYTHON 

- comment your code
- factorize what you can 

## GIT MANAGEMENT

We are following this git principles : [link to blog](https://guillim.github.io/git/2018/04/24/Git-workflow.html). In brief : 
- there are 2 main branches : `master` and `develop`
- new features must be code reviewed and then (if accepted) pulled into the branch `develop`
- once every new feature is accepted and merged into `develop`, `develop` must be merged into `master` to constitute a new release

Please follow those rules when developping new features : 
- locally : create a new branch to work on your own feature(s) named like `mypseudo_mynewfeature`
- before pushing your changes pull the remote `develop` branch to be merged with your changes in `mypseudo_mynewfeature` branch (so to be sure the features you just developped are compatible with the checked/reviewed `develop` branch):
  >
  ```bash
  git pull origin develop
  ```
- then push your branch to the remote repo (github repo) : 
  > 
  ```bash
  git push origin <mypseudo_mynewfeature>
  ```
- ask for a pull request on Github from `mypseudo_mynewfeature` to `develop`
- someone else must be assigned as a code reviewer, whose in charge to accept your code changes and merge
- once accepted / reviewed delete `mypseudo_mynewfeature` from repo to keep the branches clean
