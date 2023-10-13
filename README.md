# Mock-jlum3-thuang49

# Project Details

**Project Name:**
Sprint 3: Mock

**Team members and contributions**
thuang49 - 12 individual hours, 10 collaborative hours
jlum3 - 12 individual hours, 10 collaborative hours

**Total Estimated Time Spent on Project:**
20-25 hours

**Repo Link:**
https://github.com/cs0320-f23/mock-jlum3-thuang49

# Design Choices

**Design**
The project consists of three main components; load, view, and search. Each of
these core functionalities have their own class/files, but all are called in REPL.
A couple other core classes are REPLHistory and REPLInput. REPL acts as the
high-level class that delegates the tasks to the various handlers, and it stores
both the commands and outputs resulting from those commands in order to be used
in the REPL History, depending on whether the REPL is on Brief or Verbose mode.
For Brief mode, we only return the output of the command, but for Verbose mode,
we return both the output as well as the command that resulted in that output.

**Relationships Between Classes and Interfaces:**
With REPL being the high-level class that manages the other classes, it contains
two classes inside of it, namely REPLInput and REPLHistory. However, it also 
delegates tasks to the load, view, and search handlers, which handle error
checking for specific commands in their own files.

REPLInput is in charge of user inputs. Here, we take in the user's commands, store
them in a state, and call addCommand, which is located in REPL. REPL then manages
the parsing of inputs and the storage of different inputs/commands/outputs of
load, view, and search computations. Error checking user input and mode switching
also occurs here. Inside REPL, we call REPLHistory, which manages the display of
previous/current outputs and the changes in display when mode changes are made by
the user. 

**Data Structures and Design Choices:**
We directed our load, search, and view functionalities to classes that were external
to REPL to allow for future dependency injection and coding best practice. While
load, search, and view are all mocked functionalities, the output of these classes
match the types expected in real implementation, thus allowing for future development
to be done efficiently without the need to modify code in the REPL class. These
dependency injections allow for each item to operate independently and take
care of its own specialized class, which allows for later extensibility. For Search
specifically, our search backend functionality is mocked using MockSearch. MockSearch
outputs a list of lists, mirroring the true backend functionality of search. View
and Load follow a similar logic, drawing data from our MockedJson class.

The MockedJson mimics the JSON structure from Server, with files being divided
based on their fileName in a HashMap mapping from fileNames to the individual
contents for files, and then further individually separated into their
headers and body contents. The body content is stored as a 2D array of strings,
which allows for them to be iterated over for searching and viewing.

# Runtime / space optimizations made (if applicable).

N/A

# Errors/Bugs

No errors/bugs were found in development of this program.

# Tests

**App.spec.ts**
In the App testing file, we tested that the basic UI of the app was there. For
example, there were tests checking that there was a place for command inputs,
that we could change the input content when we typed in the box, that a header
exists, and that the mode is set to "brief" when the page first loads.

**LoadCSV.spec.ts**
For LoadCSV testing file, we tested that we can toggle the mode between "brief"
and "verbose," and within each mode we tested that we would get an error with an
undefined/blank command, that we get an error with an invalid command, that we
can load a file with headers, that we can load a file without headers, that we
can load a file with just one column, that we can load a file with just one row,
that we can load a file with just one cell, and that we can load an empty file.
These tests were replicated for verbose, with the only difference being that we
were also testing for "Command" and "Output" headers above each respective item.
For each of these, we tested that the element is visible, that we can click the
buttons and type in input boxes, and that we get the correct message in the REPL
History.

**SearchCSV.spec.ts**
The core search tests consist of:

- Incorrect/too few/too many arguments
- Load not being called before search is called
- General search where no column name or index is input
- Search with column name provided
- Search with column index provided
- Integration testing, where load is used and search is called multiple times
- Integration testing, where load and search are called with different files
- Integration testing, where load, view, and search are called
  successively with different files
- Searching that yields no results
- Searching through different shapes of data

**ViewCSV.spec.ts**
For the ViewCSV testing file, we tested that we can load and view a file with
headers, that we can load and view a file without headers, that we can load and
view a file with one row, that we can load and view a file with one column, that
we can load and view a file with one cell, that we can load and view an empty
file, and that we get an error when trying to view a file without loading
anything. We replicated each of these tests for when we're in verbose mode, with
the main difference being that we also needed to test for "Command" and "Output"
headers. For each of these tests, we made sure that we were able to click and
input text into buttons and input boxes, and that the contents of the HTML table
that we returned were all correct using a for-loop that looped through the table
as well as the JSON file that we used as reference. Lastly, we also did some
integration with view and load, so we made sure that we could make consecutive
calls to view and load and that whenever we loaded a new file, we could view the
correct file.

# How to...

**Run the program**
Run npm start and, in browser, navigate to local host link that is displayed.
VSCode live server extension can also be utilized for easy access.

**Run tests**
Tests can be run by navigating to the terminal after installing Playwright and
running "npx playwright test" to check which tests pass and which don't.
