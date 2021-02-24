class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality() {
    const multiplier = this.sellIn >= 0 ? 1 : 2;
    this.quality <= 1
      ? (this.quality = 0)
      : (this.quality = this.quality - 1 * multiplier);
  }
}

export default Item;
