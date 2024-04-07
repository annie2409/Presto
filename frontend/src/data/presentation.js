import { Slide } from './slide';

/* eslint-disable prettier/prettier */
export class Presentation {
  constructor (id, title, description) {
    this.id = id
    this.title = title;
    this.description = description ?? '';
    this.slides = [];
    this.defaultTheme = null;
    this.thumbnail = null;
  }

  addSlide (slide) {
    if (!(slide instanceof Slide)) {
      slide = Slide.fromData(slide);
    }
    this.slides.push(slide);
  }

  addEmptySlide () {
    this.slides.push(new Slide());
  }

  getSlideByIndex (idx) {
    // console.log('GGGG', this.slides)
    return this.slides[idx];
  }

  getThumbnail () {
    return this.thumbnail;
  }

  toString () {
    return JSON.stringify(
      this.toJSON()
    )
  }

  toJSON () {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      slides: this.slides.map(slide => slide.toJSON()),
      thumbnail: this.thumbnail,
      defaultTheme: this.defaultTheme,
    }
  }

  static fromData (data) {
    const presentation = new Presentation(data.id, data.title, data.description);
    if (data.slides) {
      data.slides.forEach(slide => {
        presentation.addSlide(Slide.fromData(slide));
      });
    }
    if (data.thumbnail) {
      presentation.thumbnail = data.thumbnail;
    }
    if (data.defaultTheme) {
      presentation.defaultTheme = data.defaultTheme;
    }
    return presentation;
  }
}
