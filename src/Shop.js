import LegendaryItem from "./LegendaryItem";

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item instanceof LegendaryItem) continue;
      item.sellIn--;
      item.updateQuality();
    }
  }
}

export default Shop;
