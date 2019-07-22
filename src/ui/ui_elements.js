const EarthTower = require("../towers/earth_tower");
const WaterTower = require("../towers/water_tower");
const FireTower = require("../towers/fire_tower");

const earthTowerImgEle = document.getElementById("earth-tower");
const waterTowerImgEle = document.getElementById("water-tower");
const fireTowerImgEle = document.getElementById("fire-tower");
const flintImgEle = document.getElementById("flint");

const flintFontColor = tower => game => {
  return game.flint < tower.FLINT ? "red" : "white";
};

const uiElements = {
  earthTowerButton: {
    type: "roundRect",
    tag: "button",
    x: 1580,
    y: 275,
    w: 190,
    h: 205,
    r: 20,
    lw: 5,
    s: "black",
    f: "rgb(53, 128, 0)",
    hF: "rgb(86, 154, 37)"
  },
  waterTowerButton: {
    type: "roundRect",
    tag: "button",
    x: 1580,
    y: 500,
    w: 190,
    h: 205,
    r: 20,
    lw: 5,
    s: "black",
    f: "rgb(0, 65, 145)",
    hF: "rgb(38, 103, 183)"
  },
  fireTowerButton: {
    type: "roundRect",
    tag: "button",
    x: 1580,
    y: 725,
    w: 190,
    h: 205,
    r: 20,
    lw: 5,
    s: "black",
    f: "rgb(125, 0, 0)",
    hF: "rgb(201, 41, 41)"
  },
  earthTowerImg: {
    type: "image",
    image: earthTowerImgEle,
    x: 1675,
    y: 357.5,
    dx: -earthTowerImgEle.width * 0.5,
    dy: -earthTowerImgEle.height * 0.5,
  },
  waterTowerImg: {
    type: "image",
    image: waterTowerImgEle,
    x: 1675,
    y: 582.5,
    dx: -waterTowerImgEle.width * 0.5,
    dy: -waterTowerImgEle.height * 0.5,
  },
  fireTowerImg: {
    type: "image",
    image: fireTowerImgEle,
    x: 1675,
    y: 807.5,
    dx: -fireTowerImgEle.width * 0.5,
    dy: -fireTowerImgEle.height * 0.5,
  },
  earthTowerFlintContainer: {
    type: "roundRect",
    x: 1580,
    y: 440,
    w: 190,
    h: 40,
    r: {
      tlr: 0,
      trr: 0,
      brr: 20,
      blr: 20
    },
    f: "rgb(0,0,0,0.3)",
    lw: 5,
    s: "black",
    innerObjs: {
      flintImg: {
        type: "image",
        image: flintImgEle,
        x: 1640,
        y: 460,
        dx: -flintImgEle.width * 0.5,
        dy: -flintImgEle.height * 0.5,
        s: 1.5
      },
      towerPrice: {
        type: "text",
        text: `${EarthTower.FLINT}`,
        font: "24px Arial",
        f: flintFontColor(EarthTower),
        x: 1675,
        y: 460
      }
    }
  },
  waterTowerFlint: {
    type: "roundRect",
    x: 1580,
    y: 665,
    w: 190,
    h: 40,
    r: {
      tlr: 0,
      trr: 0,
      brr: 20,
      blr: 20
    },
    f: "rgb(0,0,0,0.3)",
    lw: 5,
    s: "black",
    innerObjs: {
      flintImg: {
        type: "image",
        image: flintImgEle,
        x: 1640,
        y: 685,
        dx: -flintImgEle.width * 0.5,
        dy: -flintImgEle.height * 0.5,
        s: 1.5
      },
      towerPrice: {
        type: "text",
        text: `${WaterTower.FLINT}`,
        font: "24px Arial",
        f: flintFontColor(WaterTower),
        x: 1675,
        y: 685
      }
    }
  },
  fireTowerFlintContainer: {
    type: "roundRect",
    x: 1580,
    y: 890 ,
    w: 190,
    h: 40,
    r: {
      tlr: 0,
      trr: 0,
      brr: 20,
      blr: 20
    },
    f: "rgb(0,0,0,0.3)",
    lw: 5,
    s: "black",
    innerObjs: {
      flintImg: {
        type: "image",
        image: flintImgEle,
        x: 1640,
        y: 910,
        dx: -flintImgEle.width * 0.5,
        dy: -flintImgEle.height * 0.5,
        s: 1.5
      },
      towerPrice: {
        type: "text",
        text: `${FireTower.FLINT}`,
        font: "24px Arial",
        f: flintFontColor(FireTower),
        x: 1675,
        y: 910
      }
    }
  },
};

module.exports = uiElements;