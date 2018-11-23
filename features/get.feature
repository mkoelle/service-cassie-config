Feature: As a user, I want to get configuration data

@debug
Scenario: Get root
    Given a cassie instance
    When I get the path ""
    Then the result is "called with "