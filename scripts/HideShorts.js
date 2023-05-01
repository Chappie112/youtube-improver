function startWatchingGrid() {
    const observer = new MutationObserver(mutations => {
            if(mutations.some( (it) => it.target.localName === 'ytd-grid-video-renderer')) {
                var filtered = mutations.filter((it) => it.target.localName === 'ytd-grid-video-renderer')
                filtered.forEach( (fit) => removeIfShort(fit.target) );
            }
    });

    observer.observe(document, {
        childList: true, 
        subtree: true
    })
}
function removeIfShort(node) {
    waitForOneElement('ytd-thumbnail-overlay-time-status-renderer', node).then ((test) => {
        if(test.getAttribute('overlay-style') === 'SHORTS'){
            console.log('found short!');
            node.remove();
        }
    });
}

function waitForOneElement(selector, parent = document) {
    return new Promise(resolve => {
        if (parent.querySelector(selector)) {
            return resolve(parent.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (parent.querySelector(selector)) {
                resolve(parent.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(parent, {
            childList: true,
            subtree: true
        });
    });
}


startWatchingGrid();