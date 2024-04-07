/* eslint-disable prettier/prettier */

export class Slide {
  constructor () {
    this.elements = []
    this.background = null;
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
      background: this.background,
    }
  }

  static fromData (data) {
    const slide = new Slide()
    if (data && data.elements) {
      data.elements.forEach(element => {
        slide.addElement(element)
      });
    }
    if (data && data.background) {
      slide.background = data.background;
    }
    return slide;
  }
}
