var bc = document.querySelectorAll('.breadcrumbs_step');
var bcLine = document.querySelector('.breadcrumbs_line__is-active');
getActiveForm(0);


///// buttons ////
// show/hide initialization

var formBut = document.querySelectorAll('[data-is-hide]');
for (var i = 0; i < formBut.length; i++) {
    formBut[i].addEventListener('click', function () {
        onLoad();
        document.querySelector('.Initializ').classList.remove('is-hide');
    });
}

document.querySelector('.Initializ button').addEventListener('click', function() {
    this.parentElement.parentElement.classList.add('is-hide');
});

// show/hide sections
var links = document.querySelectorAll('[data-link]');
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
        if (errorStatusCheck()) {

            var link = this.getAttribute('data-link');
            var sect = document.querySelector('section.is-active').getAttribute('data-sect');

            document.querySelector('section[data-sect="' + sect + '"]').classList.remove('is-active');
            document.querySelector('section[data-sect="' + link + '"]').classList.add('is-active');

            bc[sect].classList.remove('is-active');
            bc[link].classList.add('is-active');
            for (var i = 0; i < bc.length; i++) {
                if (bc[i].classList.contains('is-success')) bc[i].classList.remove('is-success');
            }
            for (var i = 0; i < link; i++) {
                bc[i].classList.add('is-success');
            }

            bc[sect].classList.remove('is-block');
            getActiveForm(link);
            checkEmpty(link);
        }
    });
}

//functions
function getActiveForm(link) {
    var leftpos = bc[link].querySelector('.__number').getBoundingClientRect().left - bcLine.getBoundingClientRect().left + 5;
    bcLine.style.width = leftpos + 'px';
}

function checkEmpty(link) {
    var sect = document.querySelector('section[data-sect="' + link + '"]');
    var empty = sect.querySelector('.empty');
    var check = sect.querySelector('[data-check-empty]');

    if (check != null && check != undefined) {
        if (check.innerHTML !== '') {
            onLoad();
            empty.style.display = "none";
        } else {
            empty.style.display = 'block';
        }
    }
}

window.onresize = function() {
    var link = document.querySelector('section.is-active').getAttribute('data-sect');
    getActiveForm(link);
};

//error
function errorStatusCheck() {
    var error = document.querySelector('.error');
    if (error.classList.contains('is-active')) {
        return false;
    }
    return true;
}

window.closeError = function() {
    var error = document.querySelector('.error');
    error.classList.remove('is-active');
}

function onLoad() {
    document.querySelector('.main').classList.remove('is-active');
    document.querySelector('.spin-wrapper').classList.remove('is-delete');

    setTimeout(function() {
        document.querySelector('.main').classList.add('is-active');
        document.querySelector('.spin-wrapper').classList.add('is-delete');
    }, 600);
}

setTimeout(function() {
    document.querySelector('.main').classList.add('is-active');
    document.querySelector('.spin-wrapper').classList.add('is-delete');
}, 1000);