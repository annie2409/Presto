/* eslint-disable prettier/prettier */
export class Presentation {
  constructor (title, description) {
    this.title = title;
    this.description = description ?? '';
    this.slides = []
  }

  getThumbnail () {
    return this.slides.length === 0 ? null : 'COMING SOON'
  }

  static fromData (data) {
    return new Presentation(data.title, data.description)
  }
}
