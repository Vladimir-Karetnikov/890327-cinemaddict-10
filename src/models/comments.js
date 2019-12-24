export default class Comments {
  constructor(data) {

    this.id = data[`id`];
    this.img = data[`emotion`];
    this.author = data[`author`];
    this.text = data[`comment`];
    this.day = data[`date`] || null;
  }

  toRAW() {
    return {
      'id': this.id,
      'emotion': this.img,
      'author': this.author,
      'comment': this.text,
      'data': this.day ? this.day : null
    };
  }

  static parseComment(data) {
    return new Comments(data);
  }

  static parseComments(data) {
    return data.map(Comments.parseComment);
  }
}
