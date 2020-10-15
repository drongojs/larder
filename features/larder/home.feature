Feature: Larder Home
  Scenario: View Items
    Given I have "Peas" in stock
    Given I have "Chips" in stock
    Given I am on "/larder"
    Then I should have a list of 2 items

  Scenario: View an Item
    Given I have "Peas" in stock
    Given I am on "/larder "   
    When I click on "#stock_item_peas"
    Then I should be on "/larder/peas"

  Scenario: Edit an Item
    Given I have "Peas" in stock
    Given I am on "/larder"
    When I click on "#stock_item_peas_menu_button"
    And I click on "Edit"
    Then I should be on "/larder/peas/edit"
  
  Scenario: Add an Item
    Given I am on "/larder"
    When I focus on "#larder_search_input"
    And I type "1kg Sugar"
    When I wait 4000
    And I press enter
    And I wait 4000
    And I wait 4000
    Then I should have a list of 1 item
