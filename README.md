# State-based LWW-Register

The code defines a class called LWWDictionaryStateBased which implements a state-based two-phase set. The class has two sets called addSet and removeSet which store elements that are being added or removed. The class provides methods to perform operations such as adding an element, removing an element, checking the existence of an element, comparing the set with another replica, and merging two sets. The class also provides a method to check the validity of the data format of an input element and converts it into an object with the element as the key and the timestamp as the value. The code also uses a module called CommonUtils for checking the validity of the input and checking if one set is a subset of another.

## Features

- Two sets for storing elements to be added or removed.
- Methods for adding an element, removing an element, checking the existence of an element, comparing the set with another replica, and merging two sets.
- Input element data format validation and conversion to key-value pairs with timestamps.
- Uses a module called CommonUtils for input validation and checking subset relations.

## Installation

This project requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the project.

```sh
npm i
```

## Program Test

```sh
yarn test
```

## Tech

State-based LWW-Register uses a number of open source projects to work properly:

- Node.js - evented I/O for the backend
- JEST.js - testing framework

## License

ISC
