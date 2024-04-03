/* eslint-disable prettier/prettier */
export class Presentation {
  constructor (id, title, description) {
    this.id = id
    this.title = title;
    this.description = description ?? '';
    this.slides = []
  }

  getThumbnail () {
    return this.slides.length === 0 ? null : 'COMING SOON'
  }

  static fromData (data) {
    return new Presentation(data.id, data.title, data.description)
  }
}
