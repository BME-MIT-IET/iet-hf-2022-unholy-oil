const { When, Then, Given } = require("@cucumber/cucumber");
const { assert } = require("chai");
const deleteBunker = require("../../../../middleware/bunker/deleteBunker");

let mockRepository = [];

Given("Bunker by ID {int} exists", function (int) {

    mockRepository.push(
        {
            _id: int,
            name: `name${int}`,
            adress: `adress${int}`,
            capacity: int,
            stock_dur: int,
            nextExpDate: Date.now().toString(),
            stock: null
        }
    )

});

Given("{int} bunkers exist", function (int) {
  // Given('{int} bunker by ID {float} exists', function (int, float) {
  // Given('{float} bunker by ID {int} exists', function (float, int) {
  // Given('{float} bunker by ID {float} exists', function (float, float2) {
  // Write code here that turns the phrase above into concrete actions

  for (let i = 0; i < int; i++)
    mockRepository.push(
        {
            _id: i,
            name: `name${i}`,
            adress: `adress${i}`,
            capacity: i,
            stock_dur: i,
            nextExpDate: Date.now().toString(),
            stock: null
        }
    )

});

When("I delete bunker by ID {int}", function (int) {
    
    let del_func = deleteBunker({
        'BunkerModel': {
            'deleteOne': (obj, next) => {
                mockRepository = mockRepository.filter(
                    bunker => bunker._id !== obj._id
                )
            }
        }
    });

    del_func({
        params: {
            bunkerid: int
        }
    }, {}, () => {
        // next called
    });

});

Then("There are {int} bunkers", function (int) {
    assert.lengthOf(mockRepository, int, `Repository has ${mockRepository.length} elements instead of the expected ${int}`);
});

Then("There is no bunker with ID {int}", function (int) {
    assert.notInclude(mockRepository, {_id: int}, `Repository has bunker with id ${int}`);
});

Then("There is a bunker with ID {int}", function (int) {
    assert.include(mockRepository, {_id: int}, `Repository has no bunker with id ${int}`);
});
