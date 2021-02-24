import Item from "./Item";

class ConjuredItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.name = `Conjured ${this.name}`;
  }

  updateQuality() {
    const multiplier = this.sellIn >= 1 ? 1 : 2;
    this.quality <= 2
      ? (this.quality = 0)
      : (this.quality = this.quality - 2 * multiplier);
  }
}

export default ConjuredItem;
