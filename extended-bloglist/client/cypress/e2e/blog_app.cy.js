// end to end test: npm run cypress:open
// testing api: npm run start:test
// npm run test:e2e
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = { name: "super test1", username: "test1", password: "test1" };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.visit("");
    cy.contains("Blogs");
    cy.contains("Blog app, test blog, test author");
  });

  it("login form can be opened", function () {
    cy.visit("");
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.visit("");

    cy.contains("login").click();
    cy.get("#username").type("test1");
    cy.get("#password").type("test1");
    cy.get("#login-button").click();

    cy.contains("super test1 logged in");
  });

  it("login fails with wrong password", function () {
    cy.visit("");

    cy.contains("login").click();
    cy.get("#username").type("test1");
    cy.get("#password").type("test");
    cy.get("#login-button").click();

    cy.contains("Wrong username or password");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test1", password: "test1" });
    });

    it("a new blog can be created", function () {
      cy.visit("");
      cy.handleCreate({
        title: "A new blog created by test",
        author: "test",
        url: "https://www.sina.com/",
      });

      cy.contains("A new blog created by test");
    });

    describe("several blogs exist", function () {
      beforeEach(function () {
        cy.handleCreate({
          title: "first blog",
          author: "aimee",
          url: "https://www.qqmail.com/",
        });
        cy.handleCreate({
          title: "second blog",
          author: "aimee001",
          url: "https://www.baidu.com/",
        });
        cy.handleCreate({
          title: "third blog",
          author: "aime002",
          url: "https://www.tiaomao.com/",
        });
        cy.handleCreate({
          title: "fourth blog",
          author: "aime003",
          url: "https://www.tiaomao.com/",
        });
        cy.handleCreate({
          title: "fifth blog",
          author: "aime004",
          url: "https://www.tiaomao.com/",
        });
        cy.handleCreate({
          title: "sixth blog",
          author: "aime005",
          url: "https://www.tiaomao.com/",
        });
      });

      it("users can like a blog", function () {
        cy.contains("second blog").parent().find("button").click();
        cy.get("#like-button").click();
      });

      it("users can delete a blog", function () {
        cy.contains("first blog").parent().find("button").click();
        cy.get("#remove-button").click();
      });

      it("the blogs are ordered according to likes with the most likes blogs", async function () {
        cy.contains("third blog").parent().find("button").click();
        cy.get("#like-button").click().wait(500).click().wait(500);
        cy.contains("third blog").parent().find("button").click();

        cy.contains("sixth blog").parent().find("button").click();
        cy.get("#like-button")
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500);

        cy.get(".blog").eq(0).should("contain", "sixth blog");
        cy.get(".blog").eq(1).should("contain", "third blog");
        cy.get(".blog").eq(2).should("contain", "fifth blog");
        cy.get(".blog").eq(3).should("contain", "fourth blog");
      });
    });
  });
});
