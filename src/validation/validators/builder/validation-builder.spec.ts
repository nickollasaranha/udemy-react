import { ValidationBuilder as sut, RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { MinLengthValidation } from '../min-length/min-length-validation'

describe('ValidationBuilder', () => {
  test('Should return RequireFieldValidation ', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return EmailValidation ', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('Should return MinLengthValidation ', () => {
    const length = 5
    const validations = sut.field('any_field').min(length).build()
    expect(validations).toEqual([new MinLengthValidation('any_field', length)])
  })
})
