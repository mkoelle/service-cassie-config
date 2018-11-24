Feature: As a user, I want to get configuration data

@debug @only
Scenario: Get root
    Given a cassie instance
    And a request path of ""
    When I get the value
    Then the message is "called with "

Scenario: Get somevalue
    Given a cassie instance
    And a request path of "somevalue"
    When I get the value
    Then the message is "called with somevalue"