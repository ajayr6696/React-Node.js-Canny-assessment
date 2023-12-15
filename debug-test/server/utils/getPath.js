export default function getPath(urlString) {
  console.log(urlString);
  if (!urlString || typeof urlString !== 'string') {
    return null;
  }

  if (urlString.indexOf('?') === -1) {
    return urlString;
  }

  // strip get params if there are any
  return urlString.substr(0, urlString.indexOf('?'));
}
