Feature: Home
  Scenario: View Items
    Given I have "500g Peas" in stock
    And I have "1kg Chips" in stock
    And I am on "/larder"
    Then I should have 2 ".stock-item" elements

  Scenario: View an Item
    Given I have "500g Peas" in stock
    And I am on "/larder"   
    When I click on "Peas"
    Then I should be on "/larder/peas"
  
  Scenario: Add an Item
    Given I am on "/larder"
    When I focus on "#stock-search-input"
    And I type "1kg Sugar"
    And I press enter
    Then I should have 1 ".stock-item" element
