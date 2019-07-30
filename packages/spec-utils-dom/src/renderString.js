import createContainer from './createContainer'

export default function renderString(htmlString, $container = null) {
  if ($container == null) {
    $container = createContainer('div')
  }

  $container.innerHTML = htmlString

  return {$container}
}
