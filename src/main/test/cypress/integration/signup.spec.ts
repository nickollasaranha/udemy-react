import * as FormHelper from '../support/form-helper'
import * as Http from '../support/signup-mocks'
import faker from 'faker'

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').type(faker.name.findName())
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.random.alphaNumeric(7)
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)
  cy.getByTestId('submit').click()
}

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Campo obrigatório')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('name', 'Valor inválido')
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Valor inválido')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('passwordConfirmation', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    simulateValidSubmit()
    FormHelper.testInputStatus('name')
    FormHelper.testInputStatus('email')
    FormHelper.testInputStatus('password')
    FormHelper.testInputStatus('passwordConfirmation')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if email already in use', () => {
    Http.mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError('Email já cadastrado')
    FormHelper.testUrl('/signup')
  })
})
