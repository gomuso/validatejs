import RuleParser from '../src/RuleParser'

test('It should parse rules into the right functions', () => {
  const ruleObj = { required: true, type: 'string', min: 5, max: 10 }

  const rules = RuleParser.parseRuleObject(ruleObj)

  expect(rules).toHaveLength(4)

  expect(rules[0].constructor.name).toBe('Required')
  expect(rules[1].constructor.name).toBe('Type')
  expect(rules[2].constructor.name).toBe('Length')
  expect(rules[3].constructor.name).toBe('Length')
})


test('It should ignore invalid rules', () => {
  const ruleObj = { required: true, abc: '123' }

  const rules = RuleParser.parseRuleObject(ruleObj)

  expect(rules).toHaveLength(1)
})
