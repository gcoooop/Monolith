const EarthTower = require("../towers/earth_tower");
const WaterTower = require("../towers/water_tower");
const FireTower = require("../towers/fire_tower");

const flintImgEle = document.getElementById("flint");

const flintFontColor = tower => game => {
  return game.flint < tower.FLINT ? "red" : "white";
};

const uiElements = {
  earthTowerButton: {
    type: "roundRect",
    tag: "button",
    a: "placeTower",
    tower: EarthTower,
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
    a: "placeTower",
    tower: WaterTower,
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
    a: "placeTower",
    tower: FireTower,
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
    image: EarthTower.SPRITE,
    x: 1675,
    y: 357.5,
    dx: -EarthTower.SPRITE.width * 0.5,
    dy: -EarthTower.SPRITE.height * 0.5,
  },
  waterTowerImg: {
    type: "image",
    image: WaterTower.SPRITE,
    x: 1675,
    y: 582.5,
    dx: -WaterTower.SPRITE.width * 0.5,
    dy: -WaterTower.SPRITE.height * 0.5,
  },
  fireTowerImg: {
    type: "image",
    image: FireTower.SPRITE,
    x: 1675,
    y: 807.5,
    dx: -FireTower.SPRITE.width * 0.5,
    dy: -FireTower.SPRITE.height * 0.5,
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
        text: () => `${EarthTower.FLINT}`,
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
        text: () => `${WaterTower.FLINT}`,
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
        text: () => `${FireTower.FLINT}`,
        font: "24px Arial",
        f: flintFontColor(FireTower),
        x: 1675,
        y: 910
      }
    }
  },
  waveCounter: {
    type: "text",
    text: game => `Wave ${game.wave}`,
    font: "24px Arial",
    f: "white",
    x: 1675,
    y: 225
  },
  flintBank: {
    type: "text",
    text: game => `${game.flint}`,
    font: "24px Arial",
    f: "white",
    x: 1680,
    y: 975,
    innerObjs: {
      flintImg: {
        type: "image",
        image: flintImgEle,
        x: 1640,
        y: 975,
        dx: -flintImgEle.width * 0.5,
        dy: -flintImgEle.height * 0.5,
        s: 2
      }
    }
  },
  attackButton: {
    type: "roundRect",
    tag: "button",
    a: "sendWave",
    x: 1607.5,
    y: 1000,
    w: 135,
    h: 50,
    r: 10,
    lw: 2,
    s: "black",
    f: "rgb(255, 0, 0)",
    hF: "rgb(255, 50, 50)",
    innerObjs: {
      attackText: {
        type: "text",
        text: "Attack!",
        font: "24px Arial",
        f: "white",
        x: 1675,
        y: 1025
      }
    }
  }
};

module.exports = uiElements;