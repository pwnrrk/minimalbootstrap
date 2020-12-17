window.onload = () => {
    initnavbar()
    initmodal()
    initpopup()
    initAnimateSlideStyle()
}

function initnavbar() {
    document.querySelectorAll('.navbar-toggler').forEach(e => {
        e.addEventListener('click', ev => toggleNavbar(e.dataset.target))
    })
}

function toggleNavbar(target) {
    document.querySelectorAll(target).forEach(e => {
        if (e.classList.contains('opened')) {
            slideUpElement(e)
            e.addEventListener('animationend',slideRemove)
        } else {
            e.classList.add('opened')
            slideDownElement(e)
        }
    })
}

function initAnimateSlideStyle(){
    let style = document.createElement('style')
    style.id = 'mb-slide-elm'
    document.querySelectorAll('head').forEach(h=>{
        h.append(style)
    })
}

function slideRemove(e){
    e = e.path[0]
    if(e.classList.contains('opened')){
        e.classList.remove('opened')               
    }
    removeSlideHandler(e)   
}
function removeSlideHandler(e){
    e.removeEventListener('animationend',slideRemove)
}
function slideDownElement(e){
    document.querySelectorAll('#mb-slide-elm').forEach(slide=>{
        slide.innerHTML = `
        @keyframes slide-elm-down {
            from{
                max-height: 0px;   
            }
            to{
                max-height: ${e.offsetHeight}px;
            }
        }
        `
    })
    e.setAttribute('style','animation: slide-elm-down .3s ease;will-change:height;')
    e.addEventListener('animationend',()=>{
        e.removeAttribute('style')
    })
}

function slideUpElement(e){
    document.querySelectorAll('#mb-slide-elm').forEach(slide=>{
        slide.innerHTML = `
        @keyframes slide-elm-up {
            from{
                max-height: ${e.offsetHeight}px;
            }
            to{
                max-height: 0px;
            }
        }
        `
    })
    e.setAttribute('style','animation: slide-elm-up .3s ease;')
    e.addEventListener('animationend',()=>{
        e.removeAttribute('style')
    })
}

function initmodal() {
    document.querySelectorAll('.btn,.close,.modal').forEach(e => {
        if (e.classList.contains('modal')) {
            e.addEventListener('click', ev => {
                if (ev.target == e) {
                    closeModal()
                }
            })
        }
        if (e.dataset.toggle == 'modal') {
            e.addEventListener('click', ev => openModal(e.dataset.target))
        }
        if (e.dataset.dismiss == 'modal') {
            e.addEventListener('click', closeModal)
        }
    })
}

function openModal(target) {
    document.querySelectorAll(target).forEach(modal => {
        modal.classList.add('showing')
        document.body.classList.add('modal-open')
        document.addEventListener('keyup', closeModalEsc)
    })
}

function closeModalEsc(ev) {
    if (ev.key == 'Escape') {
        closeModal()
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        if (modal.classList.contains('showing')) {
            modal.classList.add('goingout')
            document.removeEventListener('keyup', closeModalEsc)
            modal.addEventListener('animationend', () => {
                if (modal.classList.contains('goingout')) {
                    modal.classList.remove('goingout')
                    modal.classList.remove('showing')
                    document.body.classList.remove('modal-open')
                }
            })
        }
    })
}

function initpopup() {
    document.querySelectorAll('.btn,a').forEach(e => {
        if (e.dataset.toggle == 'popup') {
            e.addEventListener('click', ev => openPopup(e, e.dataset.target))
        }
    })
}

function openPopup(source, target) {
    document.querySelectorAll(target).forEach(popup => {
        if (!popup.classList.contains('showing')) {
            popup.classList.add('showing')
            popup.setAttribute('style', `left: ${source.offsetLeft = source.offsetWidth} ;top: ${source.offsetTop+source.offsetHeight+10}`)
            popup.addEventListener('animationend', addPopDismiss)
        }
    })
}

function addPopDismiss() {
    document.addEventListener('click', closePopupTrigger)
    document.querySelectorAll('.popup').forEach(popup => {
        removePopupListener(popup)
    })
}

function removePopupListener(popup) {
    popup.removeEventListener('animationend', addPopDismiss)
}

function closePopupTrigger(ev) {
    document.querySelectorAll('.popup').forEach(popup => {
        if (ev.target != popup) {
            closePopup()
        }
    })
}

function closePopup() {
    document.querySelectorAll('.popup').forEach(popup => {
        if (popup.classList.contains('showing')) {
            popup.classList.add('goingout')
            document.removeEventListener('click', closePopupTrigger)
            popup.addEventListener('animationend', () => {
                if (popup.classList.contains('goingout')) {
                    popup.classList.remove('goingout')
                    popup.classList.remove('showing')
                }
            })
        }
    })
}