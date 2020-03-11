var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité par 2 quand il reste 10 jours ou moins", function () {
    listItems.push(new Item("Aged Brie", 10, 34));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 8, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 36 },
      { sellIn: 7, quality: 32 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });


  it("Augmenter la qualité par 3 quand il reste 5 jours ou moins", function () {
    listItems.push(new Item("Aged Brie", 4, 11));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 15));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 3, quality: 14 },
      { sellIn: 4, quality: 18 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser la quality des produits deux fois plus rapidement quand on dépasse la sellIn date", function () {
    listItems.push(new Item("+5 Dexterity Vest", 0, 20));
    listItems.push(new Item("Mana Cake", 0, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 18 },
      { sellIn: -1, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Modifier la qualité du Backstage Passes et de Brie à 0 quand on dépasse la sellIn date", function () {
    listItems.push(new Item("Aged Brie", 0, 20));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Ne pas modifier la qualité de Sulfuras", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });

  it("Ne pas augementer la qualité au delà de 50", function () {
    listItems.push(new Item("Aged Brie", 4, 49));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(3);
  });
});