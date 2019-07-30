export function labelElementsFor($element) {
  const $labels = Array.from($element.labels || [])

  const ariaLabelIds = ($element.getAttribute('aria-labelledby') || '').split(/ +/)
  ariaLabelIds.forEach(labelId => {
    const $ariaLabel = document.getElementById(labelId)
    if ($ariaLabel) {
      $labels.push($ariaLabel)
    }
  })

  return $labels
}

export function labelTextsFor($element) {
  const ariaLabel = $element.getAttribute('aria-label')
  const labelTexts = ariaLabel ? [ariaLabel.trim()] : []
  return labelTexts.concat(labelElementsFor($element).map($label => $label.innerText.trim()))
}
