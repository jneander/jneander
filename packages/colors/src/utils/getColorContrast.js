export default function contrastColors(backgroundColor, foregroundColor) {
  let lighter, darker
  if (backgroundColor.luminance > foregroundColor.luminance) {
    lighter = backgroundColor.luminance
    darker = foregroundColor.luminance
  } else {
    lighter = foregroundColor.luminance
    darker = backgroundColor.luminance
  }

  return Math.round((lighter + 0.05) / (darker + 0.05), 1)
}
