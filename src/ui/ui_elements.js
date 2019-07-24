const EarthTower = require("../towers/earth_tower");
const WaterTower = require("../towers/water_tower");
const FireTower = require("../towers/fire_tower");

const flintImgEle = document.getElementById("flint");

const gillSans = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";

const flintFontColor = tower => game => {
  return game.flint < tower.FLINT ? "red" : "white";
};

const uiElements = {
  background: {
    type: "rect",
    x: 1500,
    y: 150,
    w: 350,
    h: 1065,
    f: "gray",
    innerObjs: {
      backgroundBorder: {
        type: "rect",
        x: 1507.5,
        y: 157.5,
        w: 335,
        h: 1035,
        s: "black",
        lw: 15
      },
    }
  },
  earthTowerButton: {
    type: "roundRect",
    tag: "button",
    a: "placeTower",
    tower: EarthTower,
    disabled: false,
    x: 1580,
    y: 275,
    w: 190,
    h: 205,
    r: 20,
    lw: 5,
    s: "black",
    f: "rgb(53, 128, 0)",
    hF: "rgb(86, 154, 37)",
    innerObjs: {
      earthTowerImg: {
        type: "image",
        image: EarthTower.SPRITE,
        x: 1675,
        y: 357.5,
        dx: -EarthTower.SPRITE.width * 0.5,
        dy: -EarthTower.SPRITE.height * 0.5,
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
            font: `24px ${gillSans}`,
            f: flintFontColor(EarthTower),
            x: 1675,
            y: 460
          }
        }
      },
    }
  },
  waterTowerButton: {
    type: "roundRect",
    tag: "button",
    a: "placeTower",
    tower: WaterTower,
    disabled: false,
    x: 1580,
    y: 500,
    w: 190,
    h: 205,
    r: 20,
    lw: 5,
    s: "black",
    f: "rgb(0, 65, 145)",
    hF: "rgb(38, 103, 183)",
    innerObjs: {
      waterTowerImg: {
        type: "image",
        image: WaterTower.SPRITE,
        x: 1675,
        y: 582.5,
        dx: -WaterTower.SPRITE.width * 0.5,
        dy: -WaterTower.SPRITE.height * 0.5,
      },
      waterTowerFlintContainer: {
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
            font: `24px ${gillSans}`,
            f: flintFontColor(WaterTower),
            x: 1675,
            y: 685
          }
        }
      }
    }
  },
  fireTowerButton: {
    type: "roundRect",
    tag: "button",
    a: "placeTower",
    tower: FireTower,
    disabled: false,
    x: 1580,
    y: 725,
    w: 190,
    h: 205,
    r: 20,
    lw: 5,
    s: "black",
    f: "rgb(125, 0, 0)",
    hF: "rgb(201, 41, 41)",
    innerObjs: {
      fireTowerImg: {
        type: "image",
        image: FireTower.SPRITE,
        x: 1675,
        y: 807.5,
        dx: -FireTower.SPRITE.width * 0.5,
        dy: -FireTower.SPRITE.height * 0.5,
      },
      fireTowerFlintContainer: {
        type: "roundRect",
        x: 1580,
        y: 890,
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
            font: `24px ${gillSans}`,
            f: flintFontColor(FireTower),
            x: 1675,
            y: 910
          }
        }
      },
    }
  },
  waveCounter: {
    type: "text",
    text: game => `Wave ${game.wave}`,
    font: `36px ${gillSans}`,
    f: "white",
    x: 1675,
    y: 225
  },
  flintBank: {
    type: "text",
    text: game => `${game.flint}`,
    font: `24px ${gillSans}`,
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
    disabled: false,
    x: 1607.5,
    y: 1025,
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
        font: `24px ${gillSans}`,
        f: "white",
        x: 1675,
        y: 1050
      }
    }
  },
  storyButton: {
    type: "roundRect",
    tag: "button",
    a: "showStory",
    x: 1525,
    y: 1125,
    w: 100,
    h: 50,
    r: 30,
    lw: 2,
    s: null,
    f: "rgb(0, 0, 0)",
    hF: "rgb(35, 35, 35)",
    innerObjs: {
      storyText: {
        type: "text",
        text: "Story",
        font: `24px ${gillSans}`,
        f: "white",
        x: 1575,
        y: 1150
      }
    }
  },
  htpButton: {
    type: "roundRect",
    tag: "button",
    a: "htp",
    x: 1650,
    y: 1125,
    w: 175,
    h: 50,
    r: 30,
    lw: 2,
    s: null,
    f: "rgb(0, 0, 0)",
    hF: "rgb(35, 35, 35)",
    innerObjs: {
      htpText: {
        type: "text",
        text: "How To Play",
        font: `24px ${gillSans}`,
        f: "white",
        x: 1737.5,
        y: 1150
      }
    }
  },
  header: {
    type: "rect",
    x: 0,
    y: 0,
    w: 1850,
    h: 150,
    f: "gray",
    innerObjs: {
      headerText: {
        type: "text",
        text: "MONOLITH",
        font: `100px ${gillSans}`,
        f: "white",
        x: 1850 * 0.5,
        y: 90,
      },
      backgroundBorder: {
        type: "rect",
        x: 7.5,
        y: 7.5,
        w: 1835,
        h: 150,
        s: "black",
        lw: 15
      },
      gameBorder: {
        type: "rect",
        x: 7.5,
        y: 7.5,
        w: 1835,
        h: 1185,
        s: "black",
        lw: 15
      }
    }
  }
};

module.exports = uiElements;