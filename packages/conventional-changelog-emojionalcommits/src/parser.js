import { breakingHeaderPattern } from './utils.js'

export function createParserOpts (config) {
  return {
    headerPattern: /^([^ (:\u2002]*)(?:\((.*)\))?!?[:\u2002] ?(.*)$/,
    breakingHeaderPattern,
    headerCorrespondence: [
      'type',
      'scope',
      'subject'
    ],
    noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE'],
    revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
    revertCorrespondence: ['header', 'hash'],
    issuePrefixes: config?.issuePrefixes || ['#']
  }
}
