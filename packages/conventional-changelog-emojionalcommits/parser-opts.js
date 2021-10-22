'use strict'

module.exports = function (config) {
  config = defaultConfig(config)
  return {
    headerPattern: /^([^ (:\u2002]*)(?:\((.*)\))?!?[:\u2002] ?(.*)$/,
    breakingHeaderPattern: /^([^ :(\u2002]*)(?:\((.*)\))?![:\u2002] ?(.*)$/,
    headerCorrespondence: [
      'type',
      'scope',
      'subject'
    ],
    noteKeywords: ['BREAKING CHANGE'],
    revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
    revertCorrespondence: ['header', 'hash'],
    issuePrefixes: config.issuePrefixes
  }
}

// merge user set configuration with default configuration.
function defaultConfig (config) {
  config = config || {}
  config.issuePrefixes = config.issuePrefixes || ['#']
  return config
}
