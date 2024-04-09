context('Happy path flow described in assignment spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('Successfully signs up', () => {
    const name = 'Hayden Smith';
    const email = `hsmith${new Date().getTime()}@test.com`;
    const password = '123';

    cy.get('input[name=name]').focus().type(name);

    cy.get('input[name=email]').focus().type(email);

    cy.get('input[name=password]').focus().type(password);

    cy.get('button[type=submit]').click();

    cy.contains(`Welcome ${email}`).should('be.visible');
    cy.contains('Dashboard').should('be.visible');

    cy.get('[data-test-target=newPresentationButton]').click();

    const newPresentationName = 'I should get HD for this assignment';
    cy.get('input[name=newPresentationName]').focus().type(newPresentationName);

    const newPresentationDescription = 'Defintely deserve HD';
    cy.get('input[name=newPresentationDescription]')
      .focus()
      .type(newPresentationDescription);

    cy.contains('button', 'Create').click();

    cy.contains(newPresentationName).should('be.visible');
    cy.contains(newPresentationDescription).should('be.visible');

    cy.contains(newPresentationName).click();

    // TODO: Update thumbnail

    cy.get('[aria-label="Edit"]').click();

    const thumbail =
      'https://sm.ign.com/t/ign_za/lists/t/the-12-bes/the-12-best-sonic-characters-in-the-series-ranked_kujt.1280.jpg';
  });
});
