(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("MonolithMap",
{ "height":40,
 "infinite":false,
 "layers":[
        {
         "data":[37, 37, 37, 37, 37, 37, 37, 8, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 31, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 8, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 8, 13, 13, 13, 13, 13, 13, 13, 13, 13, 31, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 8, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 31, 58, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 8, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 15, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 8, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 15, 34, 34, 34, 34, 34, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 8, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 23, 58, 58, 24, 13, 13, 13, 15, 37, 34, 37, 37, 37, 37, 37, 37, 13, 13, 13, 24, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 23, 58, 58, 58, 58, 13, 13, 13, 13, 37, 37, 37, 37, 37, 37, 37, 37, 13, 13, 13, 58, 24, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 58, 58, 58, 58, 58, 13, 13, 13, 7, 37, 37, 37, 37, 37, 37, 37, 37, 13, 13, 13, 58, 58, 24, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 31, 58, 58, 58, 32, 13, 7, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 13, 13, 13, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 34, 34, 34, 37, 37, 37, 37, 13, 13, 13, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 23, 58, 58, 58, 24, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 39, 13, 13, 40, 37, 37, 37, 16, 13, 13, 13, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 58, 58, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 39, 13, 13, 13, 13, 37, 37, 37, 13, 13, 13, 13, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 58, 58, 58, 58, 58, 13, 13, 13, 13, 13, 13, 7, 34, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 34, 34, 37, 13, 13, 13, 13, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 31, 58, 58, 58, 32, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 10, 13, 13, 13, 13, 7, 37, 37, 37, 13, 13, 13, 13, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 10, 10, 13, 13, 13, 13, 37, 37, 37, 37, 13, 13, 13, 23, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 10, 13, 13, 13, 13, 7, 37, 37, 37, 39, 13, 23, 58, 58, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 13, 13, 37, 37, 37, 37, 13, 23, 58, 58, 58, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 13, 13, 13, 37, 37, 37, 16, 23, 58, 58, 58, 58, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 13, 58, 58, 58, 58, 58, 58, 58, 32, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 10, 10, 10, 13, 13, 37, 37, 37, 37, 13, 58, 58, 58, 58, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 13, 13, 10, 10, 10, 10, 10, 13, 7, 37, 37, 37, 16, 13, 58, 58, 58, 58, 58, 58, 32, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 13, 13, 10, 10, 10, 10, 13, 13, 13, 37, 37, 37, 37, 13, 13, 58, 58, 58, 58, 58, 32, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 13, 10, 10, 10, 10, 13, 13, 13, 13, 7, 37, 37, 37, 37, 13, 13, 58, 58, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 13, 10, 10, 10, 10, 13, 13, 13, 13, 13, 37, 37, 37, 37, 16, 13, 13, 31, 58, 58, 58, 58, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 37, 16, 13, 13, 13, 10, 10, 10, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 13, 13, 13, 13, 13, 31, 58, 58, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 13, 13, 31, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 23, 58, 24, 13, 13, 13, 13, 13, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 23, 58, 58, 58, 58, 24, 13, 13, 13, 7, 37, 37, 37, 37, 37, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 37, 37, 37, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 23, 58, 58, 58, 58, 58, 58, 13, 13, 13, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 37, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 23, 58, 58, 58, 58, 58, 58, 58, 32, 13, 13, 7, 37, 37, 37, 37, 37, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 13, 13, 58, 58, 58, 58, 58, 58, 58, 58, 13, 13, 13, 37, 37, 37, 37, 37, 37, 13, 13, 13, 13, 13, 13, 23, 58, 24, 13, 13, 37, 37, 37, 39, 13, 13, 13, 13, 13, 13, 13, 13, 58, 58, 58, 58, 58, 58, 58, 58, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 23, 58, 58, 58, 13, 13, 37, 37, 39, 13, 13, 13, 13, 13, 13, 13, 13, 13, 31, 58, 58, 58, 58, 58, 58, 32, 13, 13, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 23, 58, 58, 58, 58, 13, 13, 37, 39, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 13, 13, 13, 13, 13, 23, 58, 58, 58, 58, 58, 13, 13, 39, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 16, 13, 13, 13, 13, 13, 58, 61, 58, 58, 58, 32, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 34, 13, 13, 13, 13, 13, 13, 31, 58, 58, 58, 32, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7, 37, 37, 37, 37, 37, 34, 16, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
         "height":40,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":40,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.2.4",
 "tileheight":50,
 "tilesets":[
        {
         "firstgid":1,
         "source":"MonolithTileset.json"
        }],
 "tilewidth":50,
 "type":"map",
 "version":1.2,
 "width":40
});