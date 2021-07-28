import { ValidationBuilder as sut, RequiredFieldValidation } from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('Should return RequireFieldValidation ', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
