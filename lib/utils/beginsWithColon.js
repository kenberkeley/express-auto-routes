var beginsWithColonReg =/^:/;

function beginsWithColon(params) {
  if (!params) return params;
  if (!beginsWithColonReg.test(params)) {
    console.info('[AutoFix] params:', params, 'is missing a beginning colon(:)');
    params = ':' + params;
  }
  return params;
}

module.exports = beginsWithColon;
