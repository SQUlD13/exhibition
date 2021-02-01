console.log('Starting up');

renderPortfolio()

function renderPortfolio() {
  var projects = getProjects();
  //var strHTML = '<div class="row">'
  var strHTML = ''
  projects.forEach(project => {
    strHTML += /*html*/ `
            <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${project.id}.png" alt="">
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
