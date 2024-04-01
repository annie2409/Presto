/* eslint-disable prettier/prettier */
export class UserData {
  // eslint-disable-next-line space-before-function-paren
  constructor(presentations) {
    this.presentations = presentations ?? [];
  }

  addPresentation (newPresentation) {
    this.presentations.push(newPresentation);
  }

  // Serialize the class instance to JSON
  toString () {
    return JSON.stringify(
      this.toJSON()
    )
  }

  toJSON () {
    return {
      presentations: this.presentations,
    }
  }

  static fromData (data) {
    const userDataBuilder = new UserDataBuilder()
    if (data.presentations) {
      userDataBuilder.setPresentations(data.presentations)
    }
    return userDataBuilder.build();
  }
}

class UserDataBuilder {
  constructor () {
    this.userData = {};
  }

  setPresentations (presentations) {
    this.userData.presentations = presentations
  }

  build () {
    return new UserData(this.userData.presentations);
  }
}
