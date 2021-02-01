'use strict'

var gProjects = [
    {
        id: 'touchNums',
        name: 'Touch Nums',
        title: 'Willing to break your own record?',
        desc: 'Practicing js and html basic structuring - also beginning a small dive into CSS!',
        url: 'projs/touchNums',
        labels: ["Matrixes", "mouse events", "CSS"],
        publishedAt: 1610892271000
    },
    {
        id: 'minesweeper',
        name: 'Minesweeper',
        title: 'A Classic revived',
        desc: 'Practicing recursion and keeping a clean work flow. some basic css experimentation. makes me wanna go back and make it even more satisfying!',
        url: 'projs/minesweeper',
        labels: ["Matrixes", "mouse events", "Recursion"],
        publishedAt: 1611410671000
    },
    {
        id: 'loginForm',
        name: 'Login Form',
        title: 'Done endless times before, surely',
        desc: 'Practicing CSS to make things look satisfying, along with creating a database (Admittedly on the local cache), and manipulating it using a correct data structure.',
        url: 'projs/minesweeper',
        labels: ["CSS", "caching", "responsiveness"],
        publishedAt: 1611756271000
    }

]


function getProjects() {
    return gProjects;
}

function getProjectById(projectId) {
    return gProjects.find(function (project) {
        return project.id === projectId
    })
}