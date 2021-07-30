import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valuetoCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valuetoCompare)

describe('CompareFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
})
