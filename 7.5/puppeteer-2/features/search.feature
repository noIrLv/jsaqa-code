Feature: buying tickets

        Scenario: the user select and book 1 seat
                Given user is on page
                When user choose 2-th day and movie
                And select 9 row and 4,5 seats
                Then ticket purchase is confirmed

        Scenario: the user select and book 3 seats next week
                Given user is on page
                When user choose 7-th day and movie
                And select 9 row and 1 seat
                Then ticket purchase is confirmed

        Scenario: the user select and book 1 reserved seat
                Given user is on page
                When user choose 2-th day and movie
                And trying to select reserved 9 row and 4 seat
                Then booking is not possible