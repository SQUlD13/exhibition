console.log('Starting up');
$(renderPortfolio(),
  assignMailingFormClick(),
  assignProjectClicks()
)

function sendEmail(ev) {
  ev.preventDefault()
  var subject = $('#inputSubject1').val()
  var body = $('#inputTextarea1').val().replace(/\n/g, `%0d%0a`)
  var url = `https://mail.google.com/mail?view=cm&fs=1&to=squadinio13@gmail.com&su=${subject}&body=${body}`
  window.open(url)
}

function assignProjectClicks() {
  getProjects().forEach(project => {
    $(`#${project.id}`).click({ projectId: project.id }, function (event) {
      renderModal(event)
      console.log('project.id passed is', project.id)
    })
  })
}

function assignMailingFormClick() {
  $('form.mail-form').on('submit', function (event) {
    sendEmail(event); console.log(event)
  })
}

function renderPortfolio() {
  var projects = getProjects();
  //var strHTML = '<div class="row">'
  var strHTML = ''
  projects.forEach(project => {
    strHTML += /*html*/ `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" id="${project.id}">
            <div class="portfolio-hover rounded">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid rounded" src="img/portfolio/${project.id}.png" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${project.name}</h4>
            <p class="text-muted">${project.title}</p>
          </div>
        </div>`
  });
  //strHTML += '</div>'
  $('#portfolio .container .row:nth-child(2)').html(strHTML)
}

function renderModal(event) {
  var $container = $('.modal .modal-dialog .modal-content .container')
  var project = getProjectById(event.data.projectId)
  var date = new Date(project.publishedAt)
  console.log('rendering modal', date)
  var strHTML = /*html*/ `
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <h2>${project.name}</h2>
                <p class="item-intro text-muted">${project.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.id}.png" alt="">
                <p class="text-light">${project.desc}</p>
                <ul class="list-inline text-muted">
                  <li>${new Date(project.publishedAt).toLocaleDateString()}</li>
                </ul>
                <a href="projects/${project.id}/index.html" id="game-${project.id}">
                  <button class="btn btn-success" onclick="window.open('projects/${project.id}/index.html') ">
                  <i class="fa fa-envelope-open"></i> Play Me!</button>
                </a>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i> Close Project</button>
              </div>
            </div>
          </div>`
  $container.html(strHTML)
}
