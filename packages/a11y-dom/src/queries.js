const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([type=hidden]):not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[tabindex]'
].join(',')

export function findFocusable($parent, filterFn = () => true) {
  if (!$parent || typeof $parent.querySelectorAll !== 'function') {
    return []
  }

  let matches = $parent.querySelectorAll(focusableSelector)

  return [...matches].filter($el => filterFn($el) && visible($el))
}

export function findTabbable($parent) {
  return findFocusable($parent, hasValidTabIndex)
}

function hasValidTabIndex($el) {
  const tabIndex = $el.getAttribute('tabindex')
  return isNaN(tabIndex) || tabIndex >= 0
}

function visible($el) {
  let $currentEl = $el
  while ($currentEl) {
    // Stop traversing up the hierarchy at the document body.
    if ($currentEl === document.body) {
      break
    }

    // When the element is hidden, it cannot be focused.
    if (hidden($currentEl)) {
      return false
    }

    $currentEl = $currentEl.parentNode
  }

  return true
}

function hidden($el) {
  const style = window.getComputedStyle($el)
  return (
    (style.display !== 'inline' && $el.offsetWidth <= 0 && $el.offsetHeight <= 0) ||
    style.display === 'none'
  )
}
