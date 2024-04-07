import { Presentation } from './presentation';

/* eslint-disable prettier/prettier */
export class UserData {
  // eslint-disable-next-line space-before-function-paren
  constructor(presentations) {
    this.presentations = presentations ?? [];
  }

  addPresentation (newPresentation) {
    if (!(newPresentation instanceof Presentation)) {
      newPresentation = Presentation.fromData(newPresentation)
    }
    this.presentations.push(newPresentation);
  }

  getPresentationById (presentationId) {
    let result = this.presentations.find((p) => p.id === parseInt(presentationId))
    if (result && !(result instanceof Presentation)) {
      result = Presentation.fromData(result)
    }
    // console.log(result)
    return result
  }

  addNewSlideToPresentation (presentationId) {
    console.log(this, presentationId)
    this.getPresentationById(presentationId).addEmptySlide()
  }

  deletePresentation (presentationId) {
    const idx = this.presentations.findIndex((item) => item.id === parseInt(presentationId))
    if (idx !== -1) {
      this.presentations.splice(idx, 1);
      return true;
    } else {
      return false
    }
  }

  // Serialize the class instance to JSON
  toString () {
    return JSON.stringify(
      this.toJSON()
    )
  }

  toJSON () {
    // console.log(this.presentations)
    return {
      presentations: this.presentations.map(p => p.toJSON()),
    }
  }

  static fromData (data) {
    const userDataBuilder = new UserDataBuilder()
    if (data.presentations) {
      userDataBuilder.setPresentations(data.presentations.map(p => Presentation.fromData(p)))
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
