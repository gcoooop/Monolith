const EarthTower = require("../towers/earth_tower");
const WaterTower = require("../towers/water_tower");
const FireTower = require("../towers/fire_tower");

const earthTowerImgEle = document.getElementById("earth-tower");
const waterTowerImgEle = document.getElementById("water-tower");
const fireTowerImgEle = document.getElementById("fire-tower");
const flintImgEle = document.getElementById("flint");

const uiElements = {
  earthTowerButton: {
    type: "roundRect",
    x: 80,
    y: 125,
    w: 190,
    h: 205,
    r: 20,
    f: "rgb(53, 128, 0)",
    hF: "rgb(86, 154, 37)"
  },
  waterTowerButton: {
    type: "roundRect",
    x: 80,
    y: 350,
    w: 190,
    h: 205,
    r: 20,
    f: "rgb(0, 65, 145)",
    hF: "rgb(38, 103, 183)"
  },
  fireTowerButton: {
    type: "roundRect",
    x: 80,
    y: 575,
    w: 190,
    h: 205,
    r: 20,
    f: "rgb(125, 0, 0)",
    hF: "rgb(201, 41, 41)"
  },
  earthTowerImg: {
    type: "image",
    image: earthTowerImgEle,
    x: 175,
    y: 207.5,
    dx: -earthTowerImgEle.width * 0.5,
    dy: -earthTowerImgEle.height * 0.5,
  },
  waterTowerImg: {
    type: "image",
    image: waterTowerImgEle,
    x: 175,
    y: 432.5,
    dx: -waterTowerImgEle.width * 0.5,
    dy: -waterTowerImgEle.height * 0.5,
  },
  fireTowerImg: {
    type: "image",
    image: fireTowerImgEle,
    x: 175,
    y: 657.5,
    dx: -fireTowerImgEle.width * 0.5,
    dy: -fireTowerImgEle.height * 0.5,
  },
  earthTowerFlintContainer: {
    type: "roundRect",
    x: 80,
    y: 290,
    w: 190,
    h: 205,
    radii: {
      tlr: 0,
      trr: 0,
      brr: 20,
      blr: 20
    },
    f: "rgb(0,0,0,0.3)",
    innerObjs: {
      flintImg: {
        type: "image",
        image: flintImgEle,
        x: 140,
        y: 310,
        dx: -flintImgEle.width * 0.5,
        dy: -flintImgEle.height * 0.5,
        s: 1.5
      },
      towerPrice: {
        type: "text",
        text: `${EarthTower.FLINT}`,
        font: "24px Arial"
      }
    }
  },
  waterTowerFlint: {
    type: "roundRect",
    x: 80,
    y: 515,
    w: 190,
    h: 205,
    radii: {
      tlr: 0,
      trr: 0,
      brr: 20,
      blr: 20
    },
    f: "rgb(0,0,0,0.3)",
    innerObjs: {
      flintImg: {
        type: "image",
        image: flintImgEle,
        x: 140,
        y: 535,
        dx: -flintImgEle.width * 0.5,
        dy: -flintImgEle.height * 0.5,
        s: 1.5
      },
      towerPrice: {
        type: "text",
        text: `${WaterTower.FLINT}`,
        font: "24px Arial"
      }
    }
  },
  fireTowerFlintContainer: {
    type: "roundRect",
    x: 80,
    y: 740,
    w: 190,
    h: 205,
    radii: {
      tlr: 0,
      trr: 0,
      brr: 20,
      blr: 20
    },
    f: "rgb(0,0,0,0.3)",
    innerObjs: {
      flintImg: {
        type: "image",
        image: flintImgEle,
        x: 140,
        y: 760,
        dx: -flintImgEle.width * 0.5,
        dy: -flintImgEle.height * 0.5,
        s: 1.5
      },
      towerPrice: {
        type: "text",
        text: `${FireTower.FLINT}`,
        font: "24px Arial"
      }
    }
  },
};

module.exports = uiElements;