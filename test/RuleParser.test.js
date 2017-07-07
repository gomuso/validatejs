import RuleParser from '../src/RuleParser'

test('It should parse rules', () => {
  const ruleString = 'required, type:string, min:5, max:10'

  const rules = RuleParser.parseString(ruleString)
})
