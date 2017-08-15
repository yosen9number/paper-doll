document.onmousedown = function (e) {
    var item = e.target;

    if (!item.classList.contains('draggable')) return;

    var coords, shiftX, shiftY;

    startDrag(e.clientX, e.clientY);

    document.onmousemove = function (e) {
        moveAt(e.clientX, e.clientY)
    };

    item.onmouseup = function () {
        finishDrag();
    };

    function startDrag(clientX, clientY) {
        shiftX = clientX - item.getBoundingClientRect().left;
        shiftY = clientY - item.getBoundingClientRect().top;

        item.style.position = 'fixed';

        moveAt(clientX, clientY);
    }

    function finishDrag() {
        item.style.top = parseInt(item.style.top) + pageYOffset + 'px';
        item.style.position = 'absolute';

        document.onmousemove = null;
        item.onmouseup = null;
    }

    function moveAt(clientX, clientY) {
        var newX = clientX - shiftX;
        var newY = clientY - shiftY;

        var newBottom = newY + item.offsetHeight;

        if (newBottom > document.documentElement.clientHeight) {

            var docBottom = document.documentElement.getBoundingClientRect().bottom;
            var scrollY = Math.min(docBottom - newBottom, 10);

            if (scrollY < 0) scrollY = 0;

            window.scrollBy(0, scrollY);

            newY = Math.min(newY, document.documentElement.clientHeight - item.offsetHeight);
        }

        if (newY < 0) {
            var scrollY = Math.min(-newY, 10);
            if (scrollY < 0) scrollY = 0;

            window.scrollBy(0, -scrollY);
            newY = Math.max(newY, 0);
        }

        if (newX < 0) newX = 0;
        if (newX > document.documentElement.clientWidth - item.offsetHeight) {
            newX = document.documentElement.clientWidth - item.offsetHeight;
        }

        item.style.left = newX + 'px';
        item.style.top = newY + 'px';
    }
    return false;
}