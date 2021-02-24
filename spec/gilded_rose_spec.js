var {
  Shop,
  Item,
  ConjuredItem,
  ReversedItem,
  LegendaryItem,
} = require("../src/gilded_rose.js");
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });

  it("Lowers the quality and sellIn by 1 for normal items", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 },
    ];

    gildedRose.items.forEach((testCase, idx) => {
      expect(expected[idx].quality).toBe(testCase.quality);
      expect(expected[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Raises the quality by 1 for Reversed Items (Aged Brie / Backstage passes)", function () {
    listItems.push(new ReversedItem("Aged Brie", 20, 30));
    listItems.push(
      new ReversedItem("Backstage passes to a TAFKAL80ETC concert", 20, 30)
    );
    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    gildedRose.items.forEach((testCase, idx) => {
      expect(expected[idx].quality).toBe(testCase.quality);
      expect(expected[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("If sellIn is <= 0, quality downgrades 2 times faster", function () {
    listItems.push(new Item("+5 Dexterity Vest", -3, 20));
    listItems.push(new ConjuredItem("Magic Stick", -1, 30));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: -4, quality: 18 },
      { sellIn: -2, quality: 26 },
    ];

    gildedRose.items.forEach((testCase, idx) => {
      expect(expected[idx].quality).toBe(testCase.quality);
      expect(expected[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("If Item is Legendary, quality doesn't change", function () {
    listItems.push(new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 80));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [{ sellIn: 0, quality: 80 }];

    gildedRose.items.forEach((testCase, idx) => {
      expect(expected[idx].quality).toBe(testCase.quality);
    });
  });

  it("If Item is conjured, quality decreases twice the normal rate", function () {
    listItems.push(new ConjuredItem("Mana Bun", 10, 20));
    listItems.push(new ConjuredItem("Healthstone", 20, 10));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 18 },
      { sellIn: 19, quality: 8 },
    ];

    gildedRose.items.forEach((testCase, idx) => {
      expect(expected[idx].quality).toBe(testCase.quality);
    });
  });

  it("If Item is Aged Brie or Backstage, quality increases by 3 when sellin is <= 5", function () {
    listItems.push(new ReversedItem("Aged Brie", 2, 5));
    listItems.push(
      new ReversedItem("Backstage passes to a TAFKAL80ETC concert", 2, 5)
    );

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 1, quality: 8 },
      { sellIn: 1, quality: 8 },
    ];

    gildedRose.items.forEach((testCase, idx) => {
      expect(expected[idx].quality).toBe(testCase.quality);
    });
  });

  it("If Item is Aged Brie or Backstage, quality increases by 2 when sellin is <= 10 && > 5", function () {
    listItems.push(new ReversedItem("Aged Brie", 8, 5));
    listItems.push(
      new ReversedItem("Backstage passes to a TAFKAL80ETC concert", 8, 5)
    );

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 7, quality: 7 },
      { sellIn: 7, quality: 7 },
    ];

    gildedRose.items.forEach((testCase, idx) => {
      expect(expected[idx].quality).toBe(testCase.quality);
    });
  });

  it("If Backstage sellIn === 0, then quality is 0", function () {
    listItems.push(
      new ReversedItem("Backstage passes to a TAFKAL80ETC concert", 0, 10)
    );

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [{ sellIn: 0, quality: 0 }];

    gildedRose.items.forEach((testCase, idx) => {
      expect(expected[idx].quality).toBe(testCase.quality);
    });
  });

  it("Quality can not exceed 50, except for LegendaryItems", function () {
    listItems.push(new ReversedItem("Aged Brie", 5, 50));
    listItems.push(
      new ReversedItem("Backstage passes to a TAFKAL80ETC concert", 5, 50)
    );
    listItems.push(new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 80));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 4, quality: 50 },
      { sellIn: 4, quality: 50 },
      { sellIn: 0, quality: 80 },
    ];

    gildedRose.items.forEach((testCase, idx) => {
      expect(expected[idx].quality).toBe(testCase.quality);
    });
  });

  it("Quality can not be < 0", function () {
    listItems.push(new Item("Yellow belt of the tiger", 10, 0));
    listItems.push(new ConjuredItem("Mana Potion", 12, 0));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 0 },
      { sellIn: 10, quality: 0 },
    ];

    gildedRose.items.forEach((testCase, idx) => {
      expect(expected[idx].quality).toBe(testCase.quality);
    });
  });
});
