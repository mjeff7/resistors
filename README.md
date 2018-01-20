## Resistance Calculator

Resistors follow a color scheme to indicate how much resistance they provide.
How much resistance comes in a resistor? Enter their color bands here and find
out.

[Try it](https://mjeff7.github.io/resistors/) now.

### How to use

Color coded resistors typically have between 4 and 6 bands, each representing a
different aspect of the resistance value it provides. Order is important!
There is a larger gap before the last band on one end indicating that that is
the tail end. In some cases, the last band is missing entirely (which is
treated like a separate color), in which case the tail end is empty. Read more
about it [here](https://en.wikipedia.org/wiki/Electronic_color_code).

Match the colors of the resistor with the menus here like in the picture to see
what the resistance spec is for a resistor with 4 bands.

### Exploring the code

1. Clone the repo.
2. Install types if you'll be consulting flow: `flow-typed install`.  
   (you'll need to `yarn global add flow-typed` if you don't already have it.).
3. Start any runners of interest. Run these from the project root.
 - Dev server: `yarn start`
 - Test runner: `yarn test`
 - Type checker: `yarn flow-watch`

### How this project was made

This project is built in Javascript using React to manage the interface. Flow
manages type checking and Jest runs the tests.

Test driven development and Type driven development led the design. Most of the
time, failing tests or types are put in place and then made to pass. For
failing tests, larger integration tests lead eventually to unit tests, which
are made to pass and checked in with the code. Generally, tests are made to
pass before being checked in.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
