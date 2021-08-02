import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if field is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
