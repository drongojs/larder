Feature: Edit
  Scenario: View Item
    Given I have "500g Peas" in stock
    And I am on "/larder/peas/edit"
    Then I should see "Peas"
    And I should see "500g"
    And I should see "Upload"
    And I should see "Save"

  Scenario: Edit Item
    Given I have "500g Peas" in stock
    And I am on "/larder/peas/edit"
    When I focus on "#stock-amount-input"
    And I type "1000g"
    When I focus on "#stock-name-input"
    And I type "Carrots"
    And I press enter
    Then I should be on "/larder/peas"
