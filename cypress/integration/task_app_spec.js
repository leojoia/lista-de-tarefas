describe('Task App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('successfully loads', () => {
      cy.visit('http://localhost:3000'); 
    });
  
    it('should add a new task', () => {
      cy.get('input[type="text"]').type('Nova tarefa');
      cy.get('button').contains('Adicionar').click();
      cy.get('ul').contains('Nova tarefa');
    });
  
    it('should complete a task', () => {
      cy.get('input[type="text"]').type('Nova tarefa');
      cy.get('button').contains('Adicionar').click();
      cy.get('input[type="checkbox"]').check();
      cy.get('input[type="checkbox"]').should('be.checked');
    });
  
    it('should delete a task', () => {
      cy.get('input[type="text"]').type('Nova tarefa');
      cy.get('button').contains('Adicionar').click();
      cy.get('button').contains('Excluir').click();
      cy.get('ul').should('not.contain', 'Nova tarefa');
    });
  
    it('should have a heading', () => {
      cy.get('h1').should('contain', 'Lista de Tarefas');
    });
  
    it('should have a placeholder in the input', () => {
      cy.get('input[type="text"]').should('have.attr', 'placeholder', 'Nova tarefa');
    });
  });
  