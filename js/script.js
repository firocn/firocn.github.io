let bodyHeight = document.body.offsetHeight
let windowHeight = window.innerHeight

window.addEventListener('resize', onUIUpdated)

Array.prototype.forEach.call(document.querySelectorAll('img'), img => {
  if (img.complete) return img.classList.add('complete')
  img.addEventListener('load', e => {
    e.target.classList.add('complete')
    bodyHeight = document.body.offsetHeight
  })
})

if (document.referrer.includes(window.siteURL)) {
  const footerHome = document.querySelector('#footer_home')
  if (footerHome) footerHome.style.display = 'none'
}

;(function () {
  const header = document.querySelector('body > header')
  const scrollToTop = document.querySelector('#scroll_to_top')
  const deadzone = 10, headerHeight = header.offsetHeight
  let lastScrollY
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset
    if (scrollY < headerHeight) {
      header.classList.add('visible')
    } else {
      header.classList.remove('visible')
    }
    const isBottom = scrollY + windowHeight >= bodyHeight - 100
    if (scrollY < lastScrollY - deadzone || scrollY < deadzone || isBottom) {
      document.body.classList.add('show-header')
      document.body.classList.remove('hide-header')
      if (scrollY > 0) {
        document.body.classList.add('show-topbtn')
      } else {
        document.body.classList.remove('show-topbtn')
      }
    } else if (scrollY > lastScrollY + deadzone) {
      hideHeader()
      document.body.classList.remove('show-topbtn')
    }
    if (isBottom) {
      document.body.classList.add('is-bottom')
    } else {
      document.body.classList.remove('is-bottom')
    }
    lastScrollY = scrollY
  })
})()

if (navigator.userAgent.includes('Firefox')) document.body.classList.add('firefox')
if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
  document.body.classList.add('safari')
}

document.body.classList.add('initialized')

function hideHeader() {
  document.body.classList.remove('show-header')
  document.body.classList.add('hide-header')
}

function onUIUpdated() {
  requestAnimationFrame(() => {
    bodyHeight = document.body.offsetHeight
    windowHeight = window.innerHeight
  })
}
