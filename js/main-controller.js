console.log('Starting up');
$(renderPortfolio())

function sendEmail(ev) {
  ev.preventDefault()
  var subject = $('#inputSubject1').val()
  var body = $('#inputTextarea1').val()
  var url = `https://mail.google.com/mail?view=cm&fs=1&to=squadinio13@gmail.com&su=${subject}&body=${body}`
  window.location = url
}

function renderPortfolio() {
  var projects = getProjects();
  //var strHTML = '<div class="row">'
  var strHTML = ''
  projects.forEach(project => {
    strHTML += /*html*/ `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="renderModal('${project.id}')">
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

function renderModal(projectId) {
  var $container = $('.modal .modal-dialog .modal-content .container')
  var project = getProjectById(projectId)
  var date = new Date(project.publishedAt)
  console.log(date)
  var strHTML = /*html*/ `
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <h2>${project.name}</h2>
                <p class="item-intro text-muted">${project.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.id}.png" alt="">
                <p>${project.desc}</p>
                <ul class="list-inline">
                  <li>${new Date(project.publishedAt).toLocaleDateString()}</li>
                </ul>
                <a href="projects/${project.id}/index.html">
                  <button class="btn btn-success" onclick="window.location= 'projects/${project.id}/index.html' ">
                  <i class="fa fa-envelope-open"></i> Play me!</button>
                </a>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i> Close Project</button>
              </div>
            </div>
          </div>`
  $container.html(strHTML)
}
