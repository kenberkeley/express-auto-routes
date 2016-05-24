var beginsWithSlashReg = /^\//;

function beginsWithSlash(url) {
  if (!url) return url;
  if (!beginsWithSlashReg.test(url)) {
    console.info('[AutoFix] url:', url, 'is missing a beginning slash(/)');
    url = '/' + url;
  }
  return url;
}

module.exports = beginsWithSlash;
