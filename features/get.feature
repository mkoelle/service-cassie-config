Feature: As a user, I want to get configuration data

    Scenario: Get root
        Given a cassie instance
        And a request path of ""
        And the store has the content '{}'
        When I get the value
        Then the message is "called with "
        Then the content is '{}'

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

    Scenario: Get some complex value from store
        Given a cassie instance
        And a request path of "somevalue"
        And the store has the content '{"somevalue":{"appricot":"pie"}}'
        When I get the value
        Then the message is "called with somevalue"
        Then the content is '{"appricot":"pie"}'

    @only
    Scenario: Get some nested value from store
        Given a cassie instance
        And a request path of "somevalue/appricot"
        And the store has the content '{"somevalue":{"appricot":"strudel"}}'
        When I get the value
        Then the message is "called with somevalue/appricot"
        Then the content is '"strudel"'