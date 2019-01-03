Feature: As a user, I want to get configuration data

@debug @only
Scenario: Get root
    Given a cassie instance
    And a request path of ""
    When I get the value
    Then the message is "called with "

Scenario: Get everything from store
    Given a cassie instance
    And a request path of ""
    And the store has the content '{"somevalue":"pie"}'
    When I get the value
    Then the message is "called with "
    Then the content is '{"somevalue":"pie"}'

Scenario: Get somevalue from store
    Given a cassie instance
    And a request path of "somevalue"
    And the store has the content '{"somevalue":"pie"}'
    When I get the value
    Then the message is "called with somevalue"
    Then the content is '"pie"'
