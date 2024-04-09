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

    cy.get('[aria-label="Edit"]').click();

    const newTitle = 'Definitely deserve HD';
    const thumbail =
      'https://sm.ign.com/t/ign_za/lists/t/the-12-bes/the-12-best-sonic-characters-in-the-series-ranked_kujt.1280.jpg';

    cy.get('input[name=newPresentationName]').focus().type(newTitle);
    cy.get('input[name=thumbnail]').focus().type(thumbail);
    cy.get('button[type=submit]').click();

    cy.get('[aria-label="Go back"]').click();

    cy.contains(newTitle).click();

    cy.get('[aria-label="Delete presentation"]').click();
    cy.contains('Are you sure?').should('be.visible');
    cy.get('[aria-label="Confirm"]').click();

    cy.contains(newTitle).should('not.exist');
    cy.contains(newPresentationDescription).should('not.exist');

    cy.get('[data-test-target=newPresentationButton]').click();
    cy.get('input[name=newPresentationName]').focus().type(newPresentationName);
    cy.get('input[name=newPresentationDescription]')
      .focus()
      .type(newPresentationDescription);

    cy.contains('button', 'Create').click();
    cy.contains(newPresentationName).click();

    cy.get('[aria-label="Add new slide"]').click();
    cy.wait(1000);
    cy.get('[aria-label="Add new slide"]').click();
    cy.wait(1000);
    cy.get('[aria-label="Add new slide"]').click();
    cy.wait(1000);
    cy.get('[aria-label="Add new slide"]').click();
    cy.wait(1000);

    cy.get('[aria-label="Previous slide"]').should('not.exist');
    cy.get('[aria-label="Next slide"]').click();
    cy.wait(1000);
    cy.get('[aria-label="Next slide"]').click();
    cy.wait(1000);
    cy.get('[aria-label="Next slide"]').click();
    cy.get('[aria-label="Next slide"]').should('not.exist');
    cy.get('[aria-label="Previous slide"]').click();
    cy.wait(1000);

    cy.get('[aria-label="Next slide"]').should('be.visible');
    cy.get('[aria-label="Previous slide"]').should('be.visible');

    cy.get('[aria-label="Log out"]').click();
    cy.contains('Login').should('be.visible');

    cy.get('input[name=email]').focus().type(email);
    cy.get('input[name=password]').focus().type(password);
    cy.get('button[type=submit]').click();

    cy.contains(newPresentationName).should('be.visible');
    cy.contains(newPresentationDescription).should('be.visible');
  });
});
