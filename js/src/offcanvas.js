/**
 * --------------------------------------------------------------------------
 * CoreUI (v4.0.0-rc.5): dropdown.js
 * Licensed under MIT (https://coreui.io/license)
 *
 * This component is a modified version of the Bootstrap's offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import {
  defineJQueryPlugin,
  getElementFromSelector,
  isDisabled,
  isVisible,
  typeCheckConfig
} from './util/index'
import ScrollBarHelper from './util/scrollbar'
import EventHandler from './dom/event-handler'
import BaseComponent from './base-component'
import SelectorEngine from './dom/selector-engine'
import Manipulator from './dom/manipulator'
import Backdrop from './util/backdrop'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'offcanvas'
const DATA_KEY = 'coreui.offcanvas'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const ESCAPE_KEY = 'Escape'

const Default = {
  backdrop: true,
  keyboard: true,
  scroll: false
}

const DefaultType = {
  backdrop: 'boolean',
  keyboard: 'boolean',
  scroll: 'boolean'
}

const CLASS_NAME_SHOW = 'show'
const OPEN_SELECTOR = '.offcanvas.show'

const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`

const SELECTOR_DATA_DISMISS = '[data-coreui-dismiss="offcanvas"]'
const SELECTOR_DATA_TOGGLE = '[data-coreui-toggle="offcanvas"]'

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Offcanvas extends BaseComponent {
  constructor(element, config) {
    super(element)

    this._config = this._getConfig(config)
    this._isShown = false
    this._backdrop = this._initializeBackDrop()
    this._addEventListeners()
  }

  // Getters

  static get NAME() {
    return NAME
  }

  static get Default() {
    return Default
  }

  // Public

  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget)
  }

  show(relatedTarget) {
    if (this._isShown) {
      return
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, { relatedTarget })

    if (showEvent.defaultPrevented) {
      return
    }

    this._isShown = true
    this._element.style.visibility = 'visible'

    this._backdrop.show()

    if (!this._config.scroll) {
      new ScrollBarHelper().hide()
      this._enforceFocusOnElement(this._element)
    }

    this._element.removeAttribute('aria-hidden')
    this._element.setAttribute('aria-modal', true)
    this._element.setAttribute('role', 'dialog')
    this._element.classList.add(CLASS_NAME_SHOW)

    const completeCallBack = () => {
      EventHandler.trigger(this._element, EVENT_SHOWN, { relatedTarget })
    }

    this._queueCallback(completeCallBack, this._element, true)
  }

  hide() {
    if (!this._isShown) {
      return
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE)

    if (hideEvent.defaultPrevented) {
      return
    }

    EventHandler.off(document, EVENT_FOCUSIN)
    this._element.blur()
    this._isShown = false
    this._element.classList.remove(CLASS_NAME_SHOW)
    this._backdrop.hide()

    const completeCallback = () => {
      this._element.setAttribute('aria-hidden', true)
      this._element.removeAttribute('aria-modal')
      this._element.removeAttribute('role')
      this._element.style.visibility = 'hidden'

      if (!this._config.scroll) {
        new ScrollBarHelper().reset()
      }

      EventHandler.trigger(this._element, EVENT_HIDDEN)
    }

    this._queueCallback(completeCallback, this._element, true)
  }

  dispose() {
    this._backdrop.dispose()
    super.dispose()
    EventHandler.off(document, EVENT_FOCUSIN)
  }

  // Private

  _getConfig(config) {
    config = {
      ...Default,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' ? config : {})
    }
    typeCheckConfig(NAME, config, DefaultType)
    return config
  }

  _initializeBackDrop() {
    return new Backdrop({
      isVisible: this._config.backdrop,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: () => this.hide()
    })
  }

  _enforceFocusOnElement(element) {
    EventHandler.off(document, EVENT_FOCUSIN) // guard against infinite focus loop
    EventHandler.on(document, EVENT_FOCUSIN, event => {
      if (document !== event.target &&
        element !== event.target &&
        !element.contains(event.target)) {
        element.focus()
      }
    })
    element.focus()
  }

  _addEventListeners() {
    EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, () => this.hide())

    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
      if (this._config.keyboard && event.key === ESCAPE_KEY) {
        this.hide()
      }
    })
  }

  // Static

  static jQueryInterface(config) {
    return this.each(function () {
      const data = Offcanvas.getOrCreateInstance(this, config)

      if (typeof config !== 'string') {
        return
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`)
      }

      data[config](this)
    })
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  const target = getElementFromSelector(this)

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault()
  }

  if (isDisabled(this)) {
    return
  }

  EventHandler.one(target, EVENT_HIDDEN, () => {
    // focus on trigger when it is closed
    if (isVisible(this)) {
      this.focus()
    }
  })

  // avoid conflict when clicking a toggler of an offcanvas, while another is open
  const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR)
  if (allReadyOpen && allReadyOpen !== target) {
    Offcanvas.getInstance(allReadyOpen).hide()
  }

  const data = Offcanvas.getOrCreateInstance(target)
  data.toggle(this)
})

EventHandler.on(window, EVENT_LOAD_DATA_API, () =>
  SelectorEngine.find(OPEN_SELECTOR).forEach(el => Offcanvas.getOrCreateInstance(el).show())
)

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

defineJQueryPlugin(Offcanvas)

export default Offcanvas