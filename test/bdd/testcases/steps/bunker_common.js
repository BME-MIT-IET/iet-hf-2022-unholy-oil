let repository = [];
let id = 1;

function setid(newid) {
  id = newid
}

class Bunker {
  name;
  adress;
  capacity;
  stock_dur = 0;
  nextExpDate = "";
  stock = [];
  _id;

  save(callback) {
    this._id = id;
    repository.push(this);
    callback();
  }
}

module.exports = {
  setid: setid,
  repository: repository,
  Bunker: Bunker
};
