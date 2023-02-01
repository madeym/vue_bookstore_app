export const LoadingBtn = (btn) => {
    btn.innerHTML = "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span><span class='ms-2'>Loading...</span>";
    btn.disabled = true;
}

export const LoadingContent = (element, remove = false) => {
    if (remove == false) {
        if (element.children.length != 0 && !element.children[0].classList.contains('loading-container')) {
            element.insertAdjacentHTML('afterbegin', "<div class='loading-container container'><span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span><span class='ms-2'>Loading...</span></div>");
        } else {
            return;
        }
    } else {
        if (element.children.length != 0) {
            element.children[0].remove();
        }
    }
}

export const SendNotification = (message, status) => {
    var classAlert = '';
    var htmlIcon = '';
    var svgAttribute = '';
    if (status == 200) {
        classAlert = 'alert-primary';
        htmlIcon = "<use xlink:href='#check-circle-fill'/>";
        svgAttribute = "Success:";
    } else if (status > 200 && status <= 500) {
        classAlert = 'alert-warning';
        htmlIcon = "<use xlink:href='#exclamation-triangle-fill'/>";
        svgAttribute = "Warning:";
    } else if (status == -1) {
        classAlert = 'alert-primary';
        htmlIcon = "<use xlink:href='#info-fill'/>";
        svgAttribute = "Info:";
    } else {
        classAlert = 'alert-danger';
        htmlIcon = "<use xlink:href='#info-fill'/>";
        svgAttribute = "Danger:";
    }
    document.querySelector('.svg-container').setAttribute('aria-label', svgAttribute);
    document.querySelector('.svg-container').innerHTML = htmlIcon;
    document.querySelector('.alert-message').innerHTML = message;

    document.querySelector('.alert-container').classList.add(classAlert);
    document.querySelector('.alert-container').classList.add('alert-show');

    setTimeout(() => {
        document.querySelector('.alert-container').classList.remove('alert-show');
        document.querySelector('.svg-container').classList.remove('alert-show');
        document.querySelector('.alert-message').classList.remove('alert-show');
        document.querySelector('.alert-container').classList.remove(classAlert);
        document.querySelector('.svg-container').removeAttribute('aria-label');

        setTimeout(() => {
            document.querySelector('.alert-message').innerHTML = '';
            document.querySelector('.svg-container').innerHTML = '';
        }, 500);
    }, 5000);

}

export const CutString = (str, lastindex) => {
    if (str.length > lastindex) {
        return str.substring(0, lastindex) + "...";
    } else return str;
}

export const BookRating = (rating, width) => {
    let ratingHTML = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            ratingHTML =
                ratingHTML +
                "<img width='" + width + "' class='" + i + "' src='https://img.icons8.com/fluency/48/null/star.png'/>";
        } else {
            ratingHTML =
                ratingHTML +
                "<img width='" + width + "' class='" + i + "' src='https://img.icons8.com/color/48/null/star--v1.png'/>";
        }
    }
    return ratingHTML;
}

export const DateFormatter = (date, time = false) => {
    date = date.split('T');
    date[0] = date[0].split('-');
    var strDate = date[0][2] + '-' + date[0][1] + '-' + date[0][0];
    if (time == true) {
        date[1] = date[1].split('.');
    }
    strDate = strDate + " " + date[1][0];
    return strDate;
}