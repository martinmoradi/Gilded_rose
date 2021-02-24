import Item from "./Item";

class LegendaryItem extends Item {
  constructor(name, sellIn = 0, quality = 80) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    return;
  }
}

export default LegendaryItem;
