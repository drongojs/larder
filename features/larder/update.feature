Feature: Larder Update
  Scenario: View Item
    Given I have "500g Peas" in stock
    And I am on "/larder/peas"
    Then I should see "500g"
    And I should see "Peas"

  Scenario: Live Preview
    Given I have "500g Peas" in stock
    And I am on "/larder/peas"
    When I focus on "#stock-amount-input"
    And I type "500"
    And I wait 1500
    Then I should see "1kg"

  Scenario: Update Item
    Given I have "500g Peas" in stock
    And I am on "/larder/peas"
    When I focus on "#stock-amount-input"
    And I type "500"
    And I press enter
    Then I should be on "/larder"

  Scenario: Edit Item
    Given I have "500g Peas" in stock
    And I am on "/larder/peas"
    When I click on "#edit-stock-item"
    Then I should be on "/larder/peas/edit"
