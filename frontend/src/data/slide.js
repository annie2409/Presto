/* eslint-disable prettier/prettier */

export class Slide {
  constructor () {
    this.elements = []
  }

  addElement (newElement) {
    this.elements.push(newElement)
  }

  toString () {
    return JSON.stringify(
      this.toJSON()
    )
  }

  toJSON () {
    return {
      elements: this.elements,
    }
  }

  static fromData (data) {
    const slide = new Slide()
    if (data && data.elements) {
      data.elements.forEach(element => {
        slide.addElement(element)
      });
    }
    return slide;
  }
}
