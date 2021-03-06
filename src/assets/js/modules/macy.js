////////////////////////////////////////////////////////////////////////////////
// CORE FUNCTIONALITY
////////////////////////////////////////////////////////////////////////////////

// MACY INITIALIZATION /////////////////////////////////////////////////////////
import Macy from 'macy'
import notes from '../components/note-list'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#macy-container') ? initMacy() : null
  document.querySelector('#macy-container .macy-item')
    ? initDragAndDrop()
    : null
})

function initMacy() {
  document.querySelector('#macy-container').style.columnCount = 'unset'

  window.macy = Macy({
    container: '#macy-container',
    columns: 1,
    trueOrder: false,
    margin: 16,
    waitForImages: true,
    useOwnImageLoader: false,
    mobileFirst: true,
    breakAt: {
      1024: 3,
      640: 2
    }
  })

  notes.get()
  notes.listen()

  // MACY EVENT LISTENERS ////////////////////////////////////////////////////////
  let c = macy.constants
  let listen = (event, message) => {
    macy.on(
      event,
      ctx => {
        console.log(ctx, message)
      },
      true
    )
  }

  // listen(c.EVENT_INITIALIZED, ': Macy instance initialized/reinitialized.')
  // listen(c.EVENT_RECALCULATED, ': Macy recalculated layout.')
  // listen(c.EVENT_IMAGE_LOAD, ': Macy detected that an image loaded.')
  // listen(c.EVENT_IMAGE_COMPLETE, ': Macy detected that all images have loaded.')
  // listen(c.EVENT_RESIZE, ': Macy detected that the document has been resized.')
}

// MACY AVAILABLE METHODS //////////////////////////////////////////////////////
// macy.recalculate();
// macy.reInit();
// macy.remove();
// macy.on(macy.constants.EVENT_INITIALIZED, (ctx) => {})

// macyInstance.runOnImageLoad(function () {
//   console.log('I only get called when all images are loaded');
//   macyInstance.recalculate(null, true);
// });

// macyInstance.runOnImageLoad(function () {
//   console.log('Every time an image loads I get fired');
//   macyInstance.recalculate(true);
// }, true);

////////////////////////////////////////////////////////////////////////////////
// DRAG AND DROP FUNCTIONALITY
////////////////////////////////////////////////////////////////////////////////

export function initDragAndDrop() {
  const masonryEnvironment = (function() {
    let testDragAndDropSupport = function() {
      return 'draggable' in document.createElement('span')
    }
    return {
      init: function() {
        if (testDragAndDropSupport()) {
          let root = document.getElementsByTagName('html')[0]
          root.classList.add('draganddrop')
        }
      }
    }
  })()

  masonryEnvironment.init()

  let macyC = document.querySelector('#macy-container')
  let macyI = macyC.querySelectorAll('.macy-item')
  // console.log(macyC, macyI)
  ;[].forEach.call(macyI, function(macyI) {
    macyI.addEventListener('dragstart', handleDragStart, false)
    macyI.addEventListener('dragenter', handleDragEnter, false)
    macyI.addEventListener('dragover', handleDragOver, false)
    macyI.addEventListener('dragleave', handleDragLeave, false)
    macyI.addEventListener('drop', handleDrop, false)
    macyI.addEventListener('dragend', handleDragEnd, false)
  })
  macyC.className += ' is-active'

  let dragSrcEl = null
  let dragEnterState = 0
  function handleDragStart(e) {
    // Target (this) element is the source node
    // console.log('Drag Start')
    dragSrcEl = this
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text', this.innerHTML)
  }

  function handleDragOver(e) {
    // console.log('Drag Over')
    if (e.preventDefault) {
      // Allows us to drop.
      e.preventDefault()
    }
    e.dataTransfer.dropEffect = 'move'
    return false
  }

  function handleDragEnter(e) {
    // this e.target is the current hovepreventr target
    // console.log('Drag Enter')
    this.classList.add('over')
    dragEnterState += 1
  }

  function handleDragLeave(e) {
    // this e.target is previous target element
    // console.log('Drag Leave')
    dragEnterState -= 1
    // console.log('dragEnterState: ', dragEnterState)
    dragEnterState <= 0 ? this.classList.remove('over') : null
  }

  function handleDrop(e) {
    // this/e.target is current target element
    // console.log('Handle Drop')
    dragEnterState = 0
    if (e.stopPropagation) {
      // Stops some browsers from redirecting
      e.stopPropagation()
    }
    // Don't do anything if dropping the same item we're dragging
    if (dragSrcEl != this) {
      // Set the source item's HTML to the HTML of the item we dropped upon
      dragSrcEl.innerHTML = this.innerHTML
      this.innerHTML = e.dataTransfer.getData('text')
      e.dataTransfer.clearData()
      this.classList.remove('over')
      notes.store()
      macy.reInit()
      setTimeout(() => {
        macy.reInit()
      }, 100)
    }
    return false
  }

  function handleDragEnd(e) {
    // this e.target is the source node
    // console.log('Handle Drag End')
    document
      .querySelectorAll('.macy-item.over')
      .forEach(elm => elm.classList.remove('over'))
  }
}
