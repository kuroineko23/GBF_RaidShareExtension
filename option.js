function save_options() {
  const server = document.getElementById('server').value;
  const key = document.getElementById('key').value;
  chrome.storage.local.set({
    _raidfinder_server: server,
    _raidfinder_key: key
  }, function () {
    document.getElementById('output').innerHTML = "ok"
  });
}
chrome.storage.local.get('_raidfinder_server', (data) => {
  if (data._raidfinder_server != null)
    document.getElementById('server').value = data._raidfinder_server
})
chrome.storage.local.get('_raidfinder_key', (data) => {
  if (data._raidfinder_key != null)
    document.getElementById('key').value = data._raidfinder_key
})
document.getElementById('save').addEventListener('click', save_options);