export default class Comments {
  constructor(data) {

    this.id = data[`id`] || ``;
    this.img = data[`emotion`] || ``;
    this.author = data[`author`] || ``;
    this.text = data[`comment`];
    this.day = data[`date`] || null;
  }

  toRAW() {
    return {
      'comment': this.text,
      'date': new Date(this.day).toISOString(),
      'emotion': this.img
    };
  }

  static parseComment(data) {
    return new Comments(data);
  }

  static parseComments(data) {
    return data.map(Comments.parseComment);
  }
}
