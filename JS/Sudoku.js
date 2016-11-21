$(document).ready(function(){
  var prePz =[
              [5,3,0,0,7,0,0,0,0],
              [6,0,0,1,9,5,0,0,0],
              [0,9,8,0,0,0,0,6,0],
              [8,0,0,0,6,0,0,0,3],
              [4,0,0,8,0,3,0,0,1],
              [7,0,0,0,2,0,0,0,6],
              [0,6,0,0,0,0,2,8,0],
              [0,0,0,4,1,9,0,0,5],
              [0,0,0,0,8,0,0,7,9]];

  var fillValuesIn = function(prePz, n=0){
    var p = n*81
    for (var i = p; i < 81+p; i++) {
      j = Math.floor((i-p)/9);
      j2 = Math.floor((i-p)%9);
      var cell = prePz[j][j2];
      if (cell !== 0) {
        $('input:eq('+i.toString()+')').val(cell.toString());
      }
    };
  };
  fillValuesIn(prePz);

  var getValues = function() {
    var arr = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]];

    for (var i=0; i < 81; i++) {
      j = Math.floor(i/9);
      j2 = Math.floor(i%9);
      value = $('input:eq('+i.toString()+')').val();
      if (value !== "") {
        arr[j][j2] = parseInt(value);
      };

    }
    return arr;
  }
  /*ar = getValues();
  for (var i= 0; i <81; i++) {
    j = Math.floor(i/9);
    j2 = Math.floor(i%9);
    console.log(ar[j][j2]);
  }*/

  pz = getValues()

  ////////// Here is the code that actually solves
  ///////// the sudoku:

  var check_square = function(pz){
    var arr = {};
    var place = [[0,1,2],[3,4,5],[6,7,8]];
    for (var i=0; i < 3; i++){
      for (var i2=0; i2 < 3; i2++){
        var ar2 = [1,2,3,4,5,6,7,8,9];
        var ar3 = [];
        for (var z=0; z < 3; z++) {
          for (var z2=0; z2 < 3; z2++) {
            //alert(['z', z, 'i', i, 'z2', z2, 'i2', i2]);

            var it = pz[z+(i*3)][z2+(i2*3)];
            //alert([it, arr]);
            if (it !== 0) {
              ar2[it-1] = 0;
            }
          }
        };
      var p = "p" + (place[i][i2].toString());
      arr[p] = (ar2);
      }
    }
    //console.log(arr.p1);
    return arr;
  };

  var check_row = function(pz) {
    var arr = {};
    for (var i = 0; i < 9; i++) {
      var ar2 = [1,2,3,4,5,6,7,8,9];
      for (var i2=0; i2 < 9; i2++) {
        var it = pz[i][i2];
        if (it !== 0) {
          ar2[it-1] = 0;
        }
      }
    var p = "p"+(i.toString());
    arr[p] = ar2;
    }
    return arr;
  };

  var check_collumn = function(pz) {
    var arr = {};
    for (var i = 0; i < 9; i++) {
      var ar2 = [1,2,3,4,5,6,7,8,9];
      for (var i2 = 0; i2 < 9; i2++){
        var it = pz[i2][i];
        if (it !== 0) {
          ar2[it-1]= 0;
        }
      }
    var p = "p"+((i).toString())
    arr[p] = ar2;
    }
    return arr;
  };

  var which_square = function(i,i2) {
    var n = Math.floor(i/3);
    var n2 = Math.floor(i2/3);
    var sq = [[0,1,2],[3,4,5],[6,7,8]];
    return sq[n][n2];
  };

  var posValues =function(x, y, pz){
    var sq = check_square(pz);
    var row = check_row(pz);
    var col = check_collumn(pz);

    var arr = [];

    z = which_square(x, y);

    var s = sq["p"+z.toString()];
    var r = row["p"+ x.toString()];
    var c = col["p"+y.toString()];

    for (var i=0; i < 9; i++) {
      //alert(i);
      //alert(s[i], r[i], c[i]);
      if ((s[i] !== 0) && (r[i] !== 0) && (c[i] !== 0)){
        arr.push(s[i]);
      }
    }
    return arr;
  };

  var sudoku =  function(pz){
    for (var i = 0; i < 9; i++) {
      for (var i2 = 0; i2 < 9; i2++) {
        while (pz[i][i2] === 0) {
          for (var x=0; x<9; x++) {
            for (var y=0; y<9; y++) {

              if (pz[x][y] !== 0) {
                pz[x][y] = pz[x][y];
              } else {
                var val = posValues(x, y, pz);
                if (val.length === 1) {
                  pz[x][y] = val[0];
                }
              }
            }
          }
        }
      }
    };
    return pz
  };

  //////////

  ans = sudoku(pz);

  fillValuesIn(ans, 1);
});
