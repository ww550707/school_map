var start, end;
var start_x, start_y, start_point_name, start_floor;
var end_x, end_y, end_point_name, end_floor;
var flag_1 = 0;
var flag_start = 0;
var flag_end = 0;
var flag_start_input = 0
var flag_end_input = 0
var flag_test = 0;
var flag_draw_way = 0;
var sys_x, sys_pr, sys_y;
var paint_x, paint_y;
var x_multiple, y_multiple;
var floor_h = 230;
var floor_g = 229;
//var point_move_value = 1;
var the_way = [];
var now_floor = 1;
var now_floor_data = "1L";
var floor_color = new Array("#8eba5b", "#7abbf9", "#fff780", "#eb7375");
var floor_color_1 = "#8eba5b";
var floor_color_2 = "#7abbf9";
var floor_color_3 = "#fff780";
var floor_color_4 = "#eb7375";
var start_point_color = "red";
var end_point_color = "#934871";
var flag_all_way = 0;
var special_point = new Array("A", "B", "3", "4", "6", "7", "8", "10", "11", "12", "13", "14", "15", "16");

//x_multiple = 1/6;
//y_multiple = 11/66;
//x_multiple = 7/45;
//y_multiple = 33/195;
x_multiple = 14 / 77;//差不多了
y_multiple = 132 / 794;


Page({

  data: {
    test_text_start: "...", //开始点
    test_text_end: "...",  //结束点
    now_floor_data: "1L",
    floor_color_1: floor_color_1,
    floor_color_2: floor_color_2,
    floor_color_3: floor_color_3,
    floor_color_4: floor_color_4,
    start_point_color: start_point_color,
    end_point_color: end_point_color,
    tip_hedden: "none",
    start_point_text_color: "#666",
    end_point_text_color: "#666",
    all_way_check_color:"#011125"
  },

  onTap_more:function(event){
        wx.navigateTo({
          url: "../mores/more"
        });

  },

  onReady: function () {

    wx.getSystemInfo({
      success: function (res) {
        sys_x = res.windowWidth;
        sys_y = res.screenHeight;
        sys_pr = res.pixelRatio;

        paint_x = sys_x;
        paint_y = sys_x * 500 / 375;

        console.log("sys_x: " + sys_x);
        console.log("sys_y: " + sys_y);
        console.log("sys_pr: " + sys_pr);
        console.log("paint_x: " + paint_x);
        console.log("paint_y: " + paint_y);
      }
    })

    var ctx = wx.createCanvasContext('map');
    ctx.drawImage("/image/1L0.9.jpg", 0, 0, paint_x, paint_y);
    ctx.draw();
    /*
        wx.setTopBarText({
          text: 'hello world'
        })
        */
    wx.setNavigationBarTitle({
      title: "教学楼平面图" + now_floor_data
    })
  },

  onTap_flood_1: function () {
    var ctx = wx.createCanvasContext('map');
    ctx.drawImage("/image/1L0.9.jpg", 0, 0, paint_x, paint_y)
    ctx.draw()
    now_floor = 1;
    now_floor_data = "1L";

    wx.setNavigationBarTitle({
      title: "教学楼平面图" + now_floor_data
    })

    if (flag_test == 1) {
      test_point();
    }
    else if (flag_draw_way == 1) {
      if (flag_all_way == 0) {
        draw_way(the_way, now_floor);
      }
      else {
        draw_way(the_way, 0);
      }
    }
  },

  onTap_flood_2: function () {
    var ctx = wx.createCanvasContext('map');
    ctx.drawImage("/image/2L0.9.jpg", 0, 0, paint_x, paint_y)
    ctx.draw()
    now_floor = 2;
    now_floor_data = "2L";

    wx.setNavigationBarTitle({
      title: "教学楼平面图" + now_floor_data
    })

    if (flag_test == 1) {
      test_point();
    }
    else if (flag_draw_way == 1) {
      if (flag_all_way == 0) {
        draw_way(the_way, now_floor);
      }
      else {
        draw_way(the_way, 0);
      }
    }
  },

  onTap_flood_3: function () {
    var ctx = wx.createCanvasContext('map');
    ctx.drawImage("/image/3L0.9.jpg", 0, 0, paint_x, paint_y)
    ctx.draw()
    now_floor = 3;
    now_floor_data = "3L";

    wx.setNavigationBarTitle({
      title: "教学楼平面图" + now_floor_data
    })

    if (flag_test == 1) {
      test_point();
    }
    else if (flag_draw_way == 1) {
      if (flag_all_way == 0) {
        draw_way(the_way, now_floor);
      }
      else {
        draw_way(the_way, 0);
      }
    }
  },

  onTap_flood_4: function () {
    var ctx = wx.createCanvasContext('map');
    ctx.drawImage("/image/4L0.9.jpg", 0, 0, paint_x, paint_y)
    ctx.draw()
    now_floor = 4;
    now_floor_data = "4L";

    wx.setNavigationBarTitle({
      title: "教学楼平面图" + now_floor_data
    })

    if (flag_test == 1) {
      test_point();
    }
    else if (flag_draw_way == 1) {
      if (flag_all_way == 0) {
        draw_way(the_way, now_floor);
      }
      else {
        draw_way(the_way, 0);
      }
    }
  },

  onTap_flood_0: function () {
    if (flag_all_way == 0) {
      flag_all_way = 1;
      draw_way(the_way, 0);
      this.setData({
        all_way_check_color: "#8eba5b"
      })
    }
    else {
      flag_all_way = 0;
      draw_way(the_way, now_floor);
      this.setData({
        all_way_check_color: "#011125"
      })
    }
    //draw_way(the_way, 0);
  },

  onTap_test_point: function () {
    flag_draw_way = 0;
    if (flag_test == 0) {
      flag_test = 1;
      test_point();
    }
    else {
      flag_test = 0;
      draw_now_floor();
    }
  },

  get_start: function (e) {  //开始点输入
    start = e.detail.value;
    start = start.toUpperCase();
    var flag_red_text = 0;
    if (get_point_start(start) == 1) {
      this.setData({
        test_text_start: start
      })
      flag_start = 1;

      //让特殊点的颜色变红

      for (var i = 0; i < special_point.length; i++) {
        if (start == special_point[i]) {
          this.setData({
            start_point_text_color: "red"
          })
          flag_red_text = 1;
          break;
        }
      }

      if (flag_red_text == 0) {
        this.setData({
          start_point_text_color: "#666"
        })
      }

    }
    else {
      this.setData({
        start_point_text_color: "#666",
        test_text_start: "房间不存在"
      })
      flag_start = 0;
    }
  },

  get_end: function (event) {  //结束点输入
    end = event.detail.value;
    end = end.toUpperCase();
    var flag_red_text = 0;
    if (get_point_end(end) == 1) {
      this.setData({
        test_text_end: end
      })
      flag_end = 1;

      //让特殊点的颜色变红
      
      for (var i = 0; i < special_point.length; i++) {
        if (end == special_point[i]) {
          this.setData({
            end_point_text_color: "red"
          })
          flag_red_text = 1;
          break;
        }
        if (flag_red_text == 0) {
          this.setData({
            end_point_text_color: "#666"
          })
        }
      }

    }
    else {
      this.setData({
        end_point_text_color: "#666",
        test_text_end: "房间不存在"
      })
      flag_end = 0;
    }
  },

  onTap_getway: function () {

    flag_draw_way = 1;
    flag_test = 0;
    flag_all_way = 0;
    this.setData({
      all_way_check_color: "#011125"
    })
    if (flag_end == 1 && flag_start == 1) {
      the_way = searchRoad(start_x, start_y, start_floor, end_x, end_y, end_floor);
      this.setData({
        tip_hedden: "flex"
      })
    }
    draw_way(the_way, 0);
  },

  onTap_cleanway: function () {
    the_way = {};
    flag_test = 0;
    draw_now_floor();

    this.setData({
      tip_hedden: "none"
    })
  }
})

//以上是page内容
//以上是page内容
//以上是page内容

function draw_way(fin, floor) {                    //fin为路径数组，floor为要画出路线的楼层，floor为0代表画出全部楼层
  if (fin != null) {                               //如果路线数组里是0的话，根本什么都不会画
    var ctx = wx.createCanvasContext('map');
    switch (now_floor) {
      case 1:
        ctx.drawImage("/image/1L0.9.jpg", 0, 0, paint_x, paint_y);
        break;
      case 2:
        ctx.drawImage("/image/2L0.9.jpg", 0, 0, paint_x, paint_y);
        break;
      case 3:
        ctx.drawImage("/image/3L0.9.jpg", 0, 0, paint_x, paint_y);
        break;
      case 4:
        ctx.drawImage("/image/4L0.9.jpg", 0, 0, paint_x, paint_y);
        break;
    }

    //这是如果要求画制定层的情况

    if (floor != 0) {
      var flag_b = 0;
      var flag_c = 0;
      //var flag_start = 0;
      for (var i = 0; i < fin.length; i++) {
        if (fin[i].floor == floor) {                       //如果这个点是在制定楼层的话
          if (fin[i + 1] != null) {                        //如果还有点的话
            if (fin[i].floor == fin[(i + 1)].floor) {      //如果下一个点的楼层与这个点相等的话
              if (flag_b == 0) {

                //画起点
                if (is_start_point(fin, fin[i].x, fin[i].y, fin[i].floor) == 1) {
                  //if (flag_start == 0) {
                  ctx.rect(get_true_x_position(fin[i].x, x_multiple, paint_x) - 5, get_true_y_position(fin[i].y, y_multiple, paint_y) - 5, 10, 10);
                  ctx.setFillStyle(start_point_color);    //这里是测试//
                  ctx.fill();
                  ctx.draw();
                  //flag_start = 1;
                  //}
                }


                ctx.moveTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
                console.log("开始点x: " + fin[i].x);
                console.log("开始点y: " + fin[i].y);
                flag_b = 1;
              }
              else {
                ctx.lineTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
              }

            }
            else {                  //如果下一个点的楼层与这个点不同话，该把线移到这个点，然后画线
              if (flag_c == 0) {    //是否为第一次绘制
                //ctx.setStrokeStyle('red');
                ctx.lineTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
                ctx.setStrokeStyle(floor_color[fin[i].floor - 1]);
                ctx.stroke();
                ctx.draw(true);
                //ctx.draw();       //如果是，覆盖之前的图

                //画出切换点
                ctx.rect(get_true_x_position(fin[i].x, x_multiple, paint_x) - 2, get_true_y_position(fin[i].y, y_multiple, paint_y) - 2, 4, 4);
                ctx.setFillStyle(floor_color[fin[i + 1].floor - 1]);    //这里是测试//
                ctx.fill();
                ctx.draw(true);

                flag_c = 1;
                flag_b = 0;
              }
              else {
                ctx.lineTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
                ctx.setStrokeStyle(floor_color[fin[i].floor - 1]);
                ctx.stroke();
                ctx.draw(true);   //如果不是，不覆盖之前的图，接着画////////

                //画出切换点
                ctx.rect(get_true_x_position(fin[i].x, x_multiple, paint_x) - 2, get_true_y_position(fin[i].y, y_multiple, paint_y) - 2, 4, 4);
                ctx.setFillStyle(floor_color[fin[i + 1].floor - 1]);    //这里是测试//
                ctx.fill();
                ctx.draw(true);

                flag_b = 0;
              }
            }
          }
          else {                  //如果没有点了的话
            if (flag_c == 0) {    //是否为第一次绘制
              //ctx.setStrokeStyle('red');
              ctx.lineTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
              ctx.setStrokeStyle(floor_color[fin[i].floor - 1]);
              ctx.stroke();
              ctx.draw(true);
              //ctx.draw();       //如果是，覆盖之前的图

              //画出切换点
              ctx.rect(get_true_x_position(fin[i].x, x_multiple, paint_x) - 5, get_true_y_position(fin[i].y, y_multiple, paint_y) - 5, 10, 10);
              ctx.setFillStyle(end_point_color);    //这里是测试//
              ctx.fill();
              ctx.draw(true);

              //flag_c = 1;
              //flag_b = 0;
            }
            else {
              ctx.lineTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
              ctx.setStrokeStyle(floor_color[fin[i].floor - 1]);
              ctx.stroke();
              ctx.draw(true);   //如果不是，不覆盖之前的图，接着画

              //画出结尾切换点
              ctx.rect(get_true_x_position(fin[i].x, x_multiple, paint_x) - 5, get_true_y_position(fin[i].y, y_multiple, paint_y) - 5, 10, 10);
              ctx.setFillStyle(end_point_color);    //这里是测试//
              ctx.fill();
              ctx.draw(true);

              //flag_b = 0;
            }
          }
        }
        else {           //如果这个点不在在制定楼层的话
          continue;
        }
      }
    }

    //这是不要求画制定层的情况

    else {
      var flag_b = 0;
      var flag_c = 0;
      //var flag_start = 0;
      for (var i = 0; i < fin.length; i++) {
        if (fin[i + 1] != null) {
          if (fin[i].floor == fin[(i + 1)].floor) {
            if (flag_b == 0) {

              //画起点
              if (is_start_point(fin, fin[i].x, fin[i].y, fin[i].floor) == 1) {
                //if (flag_start == 0) {
                ctx.rect(get_true_x_position(fin[i].x, x_multiple, paint_x) - 5, get_true_y_position(fin[i].y, y_multiple, paint_y) - 5, 10, 10);
                ctx.setFillStyle(start_point_color);
                ctx.fill();
                ctx.draw();
                //flag_start = 1;
                //}
              }

              ctx.moveTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
              console.log("开始点x: " + fin[i].x);
              console.log("开始点y: " + fin[i].y);
              flag_b = 1;
            }
            else {
              ctx.lineTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
            }
          }
          else {
            if (flag_c == 0) {    //是否为第一次绘制  //楼层变换，要先把现在的线画出来
              //ctx.setStrokeStyle('red');
              ctx.lineTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
              ctx.setStrokeStyle(floor_color[fin[i].floor - 1]);
              ctx.stroke();
              ctx.draw(true);
              //ctx.draw();       //如果是，覆盖之前的图

              //画出切换点
              ctx.rect(get_true_x_position(fin[i].x, x_multiple, paint_x) - 2, get_true_y_position(fin[i].y, y_multiple, paint_y) - 2, 4, 4);
              ctx.setFillStyle(floor_color[fin[i + 1].floor - 1]);    //这里是测试//
              ctx.fill();
              ctx.draw(true);

              flag_c = 1;
              flag_b = 0;

              ctx.moveTo(get_draw_point_x(get_true_x_position(fin[i + 1].x, x_multiple, paint_x), fin[i + 1].floor), get_draw_point_y(get_true_y_position(fin[i + 1].y, y_multiple, paint_y), fin[i + 1].floor));   //move_to到下一个点，以防止下一次直接line_to导致什么奇怪的错误
            }
            else {
              ctx.lineTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
              ctx.setStrokeStyle(floor_color[fin[i].floor - 1]);
              ctx.stroke();
              ctx.draw(true);   //如果不是，不覆盖之前的图，接着画////////

              //画出切换点 
              ctx.rect(get_true_x_position(fin[i].x, x_multiple, paint_x) - 2, get_true_y_position(fin[i].y, y_multiple, paint_y) - 2, 4, 4);
              ctx.setFillStyle(floor_color[fin[i + 1].floor - 1]);    //这里是测试//
              ctx.fill();
              ctx.draw(true);

              flag_b = 0;
              ctx.moveTo(get_draw_point_x(get_true_x_position(fin[i + 1].x, x_multiple, paint_x), fin[i + 1].floor), get_draw_point_y(get_true_y_position(fin[i + 1].y, y_multiple, paint_y), fin[i + 1].floor)); //move_to到下一个点，以防止下一次直接line_to导致什么奇怪的错误
            }
          }
        }
        else {
          if (flag_c == 0) {    //是否为第一次绘制   //这里是全部点都已经遍历完了，收尾
            //ctx.setStrokeStyle('red');
            ctx.lineTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
            ctx.setStrokeStyle(floor_color[fin[i].floor - 1]);
            ctx.stroke();
            ctx.draw(true);       //如果是，覆盖之前的图
            //这里我有疑问，到底该不该加true
            //这里我有疑问，到底该不该加true
            //这里我有疑问，到底该不该加true

            //画出切换点
            ctx.rect(get_true_x_position(fin[i].x, x_multiple, paint_x) - 5, get_true_y_position(fin[i].y, y_multiple, paint_y) - 5, 10, 10);
            ctx.setFillStyle(end_point_color);    //这里是测试//
            ctx.fill();
            ctx.draw(true);

            //flag_c = 1;
            //flag_b = 0;
          }
          else {
            ctx.lineTo(get_draw_point_x(get_true_x_position(fin[i].x, x_multiple, paint_x), fin[i].floor), get_draw_point_y(get_true_y_position(fin[i].y, y_multiple, paint_y), fin[i].floor));
            ctx.setStrokeStyle(floor_color[fin[i].floor - 1]);
            ctx.stroke();
            ctx.draw(true);   //如果不是，不覆盖之前的图，接着画

            //画出结尾切换点
            ctx.rect(get_true_x_position(fin[i].x, x_multiple, paint_x) - 5, get_true_y_position(fin[i].y, y_multiple, paint_y) - 5, 10, 10);
            ctx.setFillStyle(end_point_color);    //这里是测试//
            ctx.fill();
            ctx.draw(true);
            //flag_b = 0;
          }
        }
      }
    }
  }
}
  /*
  var flag_b = 0;
  for (var i in fin) {
    //console.log(fin[i].x);
    //console.log(fin[i].y);
    if (flag_b == 0) {
      ctx.moveTo(get_true_x_position(fin[i].x, x_multiple, paint_x), get_true_y_position(fin[i].y, y_multiple, paint_y));
      flag_b = 1;
    }
    else {
      ctx.lineTo(get_true_x_position(fin[i].x, x_multiple, paint_x), get_true_y_position(fin[i].y, y_multiple, paint_y));
    }
  }
  */
  /*
  ctx.setStrokeStyle('RED')
  ctx.stroke();
  ctx.draw();

  console.log("you_win,again!!!")
  */;
/*
var ctx = wx.createCanvasContext('test');
ctx.moveTo(10, 10);
ctx.rect(10, 10, 100, 50);
ctx.lineTo(110, 60);
ctx.stroke();
ctx.draw();
*/

function get_draw_point_x(x, floor) {
  switch (parseInt(floor)) {
    case 1:
      return (x - 1);
    case 3:
      console.log("right");
      return (x - 2);

      break;
    case 2:
      return (x + 2);
    case 4:
      console.log("right");
      return (x + 1);

      break;
    default:
      console.log("ERROR");
      return x

      break;
  }
}

function get_draw_point_y(y, floor) {
  switch (parseInt(floor)) {
    case 1:
      return (y - 1);
    case 2:
      return (y - 2);
      break;
    case 3:
      return (y + 2);
    case 4:
      return (y + 1);
      break;
    default:
      return y
      break;
  }
}

function get_point_start(x) {
  for (var i in point_list) {
    for (var j in point_list[i].room) {
      if (x == point_list[i].room[j]) {
        start_x = point_list[i].x;
        start_y = point_list[i].y;
        start_point_name = point_list[i].point;
        start_floor = point_list[i].flood;
        //index = i;
        console.log("start_point: " + start_point_name);
        flag_1 = 1;
        break;
      }
    }
    if (flag_1 == 1) {   //这几行是为了只取列表里的第一个
      flag_1 = 0;
      return 1;
      break;
    }
  }
  return 0;
}

function get_point_end(x) {
  for (var i in point_list) {
    for (var j in point_list[i].room) {
      if (x == point_list[i].room[j]) {
        end_x = point_list[i].x;
        end_y = point_list[i].y;
        end_point_name = point_list[i].point;
        end_floor = point_list[i].flood;
        //index = i;
        console.log("end_point: " + end_point_name);
        flag_1 = 1;
        break;
      }
    }
    if (flag_1 == 1) {   //这几行是为了只取列表里的第一个
      flag_1 = 0;
      return 1;
    }
  }
  return 0;
}

function searchRoad(start_x, start_y, start_floor, end_x, end_y, end_floor) {
  var openList = [],    //开启列表
    closeList = [],   //关闭列表
    result = [],      //结果数组
    result_index;   //结果数组在开启列表中的序号

  openList.push({ x: start_x, y: start_y, G: 0, point_name: start_point_name, floor: start_floor });//把当前点加入到开启列表中，并且G是0

  do {
    var now_Point = openList.pop();
    closeList.push(now_Point);                   //currentPoint----当前节点  now_Point
    var around_Point = SurroundPoint(now_Point); //这里获取的是环绕的点，返回的是一个数组（把每个点的相连点的信息都储存好然后输入x，y查询？）

    /*
      console.log(now_Point.g);
      console.log(around_Point[1]);
      console.log("down");
      console.log(flag_1);
    */
    //var currentPoint = openList.pop();
    //closeList.push(currentPoint);                                   //currentPoint----当前节点
    //var surroundPoint = SurroundPoint(currentPoint);                

    for (var i in around_Point) {
      var item = around_Point[i];                //获得周围的点,全部可用
      if (!existList(item, closeList)) {
        //g 到父节点的位置
        //如果是上下左右位置的则g等于10，斜对角的就是14
        //var g = now_Point.G + ((now_Point.x - item.x) * (now_Point.y - item.y) == 0 ? 10 : 14);
        var g = get_g(now_Point, item);

        console.log("G: " + g);

        if (!existList(item, openList)) {       //如果不在开启列表中,我有点担心会不会出现0的情况
          //计算H，通过水平和垂直距离进行确定
          item['H'] = get_h(end_x, end_y, end_floor, item.x, item.y, item.floor);
          item['G'] = g;
          item['F'] = item.H + item.G;
          item['parent'] = now_Point;
          openList.push(item);
        }
        else {                                  //存在在开启列表中，比较目前的g值和之前的g的大小
          var index = existList(item, openList);
          //如果当前点的g更小
          if (g < openList[index].G) {
            openList[index].parent = now_Point;
            openList[index].G = g;
            openList[index].F = g + openList[index].H;
          }
        }
      }
    }
    //如果开启列表空了，没有通路，结果为空
    if (openList.length == 0) {

      console.log("没有通路");

      break;
    }
    openList.sort(sortF);//这一步是为了循环回去的时候，找出 F 值最小的, 将它从 "开启列表" 中移掉

  } while (!(result_index = existList({ x: end_x, y: end_y, point_name: end_point_name }, openList)));
  console.log("you_win!!!");
  console.log(result_index);

  //判断结果列表是否为空
  if (!result_index) {
    console.log("没有通路，有问题");
    result = [];
  }
  else {
    var currentObj = openList[result_index];
    var flag_fin = 0;
    do {
      //把路径节点添加到result当中
      result.unshift({
        x: currentObj.x,
        y: currentObj.y,
        floor: currentObj.floor
      });
      if (currentObj.x == start_x && currentObj.y == start_y && currentObj.floor == start_floor) {
        flag_fin = 1;
      }
      else {
        currentObj = currentObj.parent;
      }
      //} while (currentObj.x != start_x || currentObj.y != start_y);
    } while (flag_fin != 1);
    //draw_way(result, 0);
    console.log("you_win!!!");
  }
  return result;
}

//用F值对数组排序
function sortF(a, b) {
  return b.F - a.F;
}

//获取周围八个点的值,进来的是点的信息，包含点的名字，x，y，G
//要求返回相邻节点的信息
function SurroundPoint(curPoint) {
  var name = curPoint.point_name;
  var near_point_list = [];
  var out_list = [];
  for (var i in point_list) {
    if (name == point_list[i].point) {
      for (var j in point_list[i].near_point) {
        near_point_list.push(point_list[i].near_point[j]);
      }
      flag_1 = 1;
    }
    if (flag_1 == 1) {
      flag_1 = 0;
      break;
    }
  }
  for (var j in near_point_list) {
    for (var i in point_list) {
      if (near_point_list[j] == point_list[i].point) {
        out_list.push({ x: point_list[i].x, y: point_list[i].y, point_name: point_list[i].point, floor: point_list[i].flood });
        break;
      }
    }
  }
  return out_list
}

//判断点是否存在在列表中，是的话返回的是序列号
function existList(point, list) {
  for (var i in list) {
    if (point.point_name == list[i].point_name) {
      return i;
    }
  }
  return false;
}

function get_g(father, son) {    //应该是只有垂直与水平两种情况
  var i;
  if (father.x - son.x == 0) {
    i = Math.abs(father.y - son.y);
  }
  else {
    i = Math.abs(father.x - son.x);
  }
  if (father.floor == son.floor) {
    return i;
  }
  else {
    //console.log("重要测试： " + (i +Math.abs(parseInt(father.floor) - parseInt(son.floor)) * floor_g))
    return (i + Math.abs(parseInt(father.floor) - parseInt(son.floor)) * floor_g);
  }
}

function get_h(x1, y1, f1, x2, y2, f2) {
  var hh = Math.ceil(Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)));
  if (f1 != f2) {
    hh = hh + floor_h * Math.abs(parseInt(f1) - parseInt(f2));
    console.log("重要测试： " + hh)
  }
  //return Math.ceil(Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)));
  return hh;
}

//用于获取节点x和y值坐标
function get_true_x_position(x, multiple, pt_x) {
  return (multiple * x + 17) / 375 * pt_x;
}

function get_true_y_position(y, multiple, pt_y) {
  return (multiple * y + 14) / 500 * pt_y;
}

function test_point() {
  var ctx = wx.createCanvasContext('map');
  switch (now_floor) {
    case 0:
    case 1:
      ctx.drawImage("/image/1L0.9.jpg", 0, 0, paint_x, paint_y);
      break;
    case 2:
      ctx.drawImage("/image/2L0.9.jpg", 0, 0, paint_x, paint_y);
      break;
    case 3:
      ctx.drawImage("/image/3L0.9.jpg", 0, 0, paint_x, paint_y);
      break;
    case 4:
      ctx.drawImage("/image/4L0.9.jpg", 0, 0, paint_x, paint_y);
      break;
  }
  for (var i in point_list) {
    if (parseInt(point_list[i].flood) == now_floor) {
      //ctx.rect(x_multiple * (point_list[i].x) - 2 + 17, y_multiple * (point_list[i].y) - 2 + 14, 4, 4);
      ctx.rect(get_true_x_position(point_list[i].x, x_multiple, paint_x) - 2, get_true_y_position(point_list[i].y, y_multiple, paint_y) - 2, 4, 4);
      console.log("获取节点成功");
    }
    //ctx.rect((x_multiple * (point_list[i].x) - 2 + 17) / 375 * paint_x, (y_multiple * (point_list[i].y) - 2 + 14) / 500 * paint_y, 4, 4);
  }

  switch (now_floor) {
    case 1:
      ctx.setFillStyle(floor_color_1);
      ctx.fill();
      ctx.draw();
      console.log("1L节点成功");
      break;
    case 2:
      ctx.setFillStyle(floor_color_2);
      ctx.fill();
      ctx.draw();
      console.log("2L节点成功");
      break;
    case 3:
      ctx.setFillStyle(floor_color_3);
      ctx.fill();
      ctx.draw();
      console.log("3L节点成功");
      break;
    case 4:
      ctx.setFillStyle(floor_color_4);
      ctx.fill();
      ctx.draw();
      console.log("4L节点成功");
      break;
  }
}

function draw_now_floor() {
  var ctx = wx.createCanvasContext('map');
  switch (now_floor) {
    case 0:
    case 1:
      ctx.drawImage("/image/1L0.9.jpg", 0, 0, paint_x, paint_y);
      break;
    case 2:
      ctx.drawImage("/image/2L0.9.jpg", 0, 0, paint_x, paint_y);
      break;
    case 3:
      ctx.drawImage("/image/3L0.9.jpg", 0, 0, paint_x, paint_y);
      break;
    case 4:
      ctx.drawImage("/image/4L0.9.jpg", 0, 0, paint_x, paint_y);
      break;
  }
  ctx.draw();
}

function is_start_point(list, x, y, floor) {
  if (list[0].x == x &&
    list[0].y == y &&
    list[0].floor == floor
  ) {
    return 1;
  }
  else {
    return 0;
  }
}

var point_list = [
  { point: "p101", x: 45, y: 195, near_point: ["p102"], room: ["B105"], flood: "1" },
  { point: "p102", x: 140, y: 195, near_point: ["p101", "p103"], room: ["B105"], flood: "1" },
  { point: "p103", x: 180, y: 195, near_point: ["p102", "p104", "p116"], room: ["0"], flood: "1" },
  { point: "p104", x: 225, y: 195, near_point: ["p103", "p105"], room: ["B107", "B102"], flood: "1" },
  { point: "p105", x: 325, y: 195, near_point: ["p104", "p106"], room: ["B107", "B102"], flood: "1" },
  { point: "p106", x: 365, y: 195, near_point: ["p105", "p107"], room: ["B104", "B109"], flood: "1" },
  { point: "p107", x: 570, y: 195, near_point: ["p106", "p108"], room: ["B104", "B109"], flood: "1" },
  { point: "p108", x: 620, y: 195, near_point: ["p107", "p109"], room: ["B104", "B109"], flood: "1" },
  { point: "p109", x: 825, y: 195, near_point: ["p108", "p110"], room: ["B104", "B109"], flood: "1" },
  { point: "p110", x: 870, y: 195, near_point: ["p109", "p111"], room: ["B104", "B111"], flood: "1" },
  { point: "p111", x: 1070, y: 195, near_point: ["p110", "p112"], room: ["B104", "B111"], flood: "1" },
  { point: "p112", x: 1120, y: 195, near_point: ["p111", "p113"], room: ["B106"], flood: "1" },
  { point: "p113", x: 1170, y: 195, near_point: ["p112", "p114", "p213", "p313", "p413"], room: ["7"], flood: "1" },
  { point: "p114", x: 1220, y: 195, near_point: ["p113", "p115"], room: ["B106"], flood: "1" },
  { point: "p115", x: 1260, y: 195, near_point: ["p114", "p124"], room: ["0"], flood: "1" },
  { point: "p116", x: 180, y: 295, near_point: ["p103", "p117", "p216", "p316", "p416"], room: ["8"], flood: "1" },
  { point: "p117", x: 180, y: 665, near_point: ["p116", "p118"], room: ["0"], flood: "1" },
  { point: "p118", x: 180, y: 760, near_point: ["p117", "p119"], room: ["B103"], flood: "1" },
  { point: "p119", x: 180, y: 860, near_point: ["p118", "p120"], room: ["B", "4"], flood: "1" },
  { point: "p120", x: 180, y: 965, near_point: ["p119", "p121", "p122"], room: ["B101"], flood: "1" },
  { point: "p121", x: 225, y: 965, near_point: ["p120", "p221", "p321"], room: ["0"], flood: "1" },
  { point: "p122", x: 180, y: 1045, near_point: ["p120"], room: ["3"], flood: "1" },
  { point: "p123", x: 180, y: 1295, near_point: ["p182"], room: ["10"], flood: "1" },
  { point: "p182", x: 180, y: 1350, near_point: ["p123", "p131", "p282", "p382", "p482"], room: ["0"], flood: "1" },
  { point: "p124", x: 1260, y: 340, near_point: ["p115", "p125", "p224", "p324", "p424"], room: ["6"], flood: "1" },
  { point: "p125", x: 1260, y: 665, near_point: ["p124", "p126"], room: ["B108", "B113"], flood: "1" },
  { point: "p126", x: 1260, y: 895, near_point: ["p125", "p128"], room: ["B108", "B113"], flood: "1" },
  { point: "p127", x: 1210, y: 965, near_point: ["p128", "p227", "p327"], room: ["0"], flood: "1" },
  { point: "p128", x: 1260, y: 965, near_point: ["p126", "p127", "p129"], room: ["B115"], flood: "1" },
  { point: "p129", x: 1260, y: 1045, near_point: ["p128"], room: ["5"], flood: "1" },
  { point: "p130", x: 1260, y: 1295, near_point: ["p141"], room: ["11"], flood: "1" },
  { point: "p131", x: 180, y: 1435, near_point: ["p182", "p132"], room: ["0"], flood: "1" },
  { point: "p132", x: 230, y: 1435, near_point: ["p131", "p133"], room: ["A133"], flood: "1" },
  { point: "p133", x: 350, y: 1435, near_point: ["p132", "p134", "p233", "p333", "p433"], room: ["0"], flood: "1" },
  { point: "p134", x: 450, y: 1435, near_point: ["p133", "p135", "p151"], room: ["A133"], flood: "1" },
  { point: "p135", x: 500, y: 1435, near_point: ["p134", "p136"], room: ["A131", "A116"], flood: "1" },
  { point: "p136", x: 705, y: 1435, near_point: ["p135", "p137"], room: ["A131", "A116"], flood: "1" },
  { point: "p137", x: 755, y: 1435, near_point: ["p136", "p138"], room: ["A129", "A114"], flood: "1" },
  { point: "p138", x: 960, y: 1435, near_point: ["p136", "p138"], room: ["A129", "A114"], flood: "1" },
  { point: "p139", x: 1010, y: 1435, near_point: ["p138", "p140"], room: ["A112"], flood: "1" },
  { point: "p140", x: 1215, y: 1435, near_point: ["p139", "p141"], room: ["A112"], flood: "1" },
  { point: "p141", x: 1260, y: 1435, near_point: ["p130", "p140", "p142"], room: ["A110"], flood: "1" },
  { point: "p142", x: 1350, y: 1435, near_point: ["p141", "p183", "p242", "p342", "p442"], room: ["0"], flood: "1" },
  { point: "p183", x: 1450, y: 1435, near_point: ["p142", "p143"], room: ["A110"], flood: "1" },
  { point: "p143", x: 1500, y: 1435, near_point: ["p183", "p144", "p158"], room: ["0"], flood: "1" },
  { point: "p144", x: 1540, y: 1435, near_point: ["p143", "p145"], room: ["A127"], flood: "1" },
  { point: "p145", x: 1670, y: 1435, near_point: ["p144", "p146"], room: ["A127"], flood: "1" },
  { point: "p146", x: 1700, y: 1435, near_point: ["p145", "p147"], room: ["A125"], flood: "1" },
  { point: "p147", x: 1830, y: 1435, near_point: ["p146", "p148"], room: ["A125"], flood: "1" },
  { point: "p148", x: 1875, y: 1435, near_point: ["p147", "p149"], room: ["0"], flood: "1" },
  { point: "p149", x: 1875, y: 1255, near_point: ["p148", "p150", "p249", "p349"], room: ["12"], flood: "1" },
  { point: "p150", x: 1550, y: 1255, near_point: ["p149", "p250", "p350"], room: ["12"], flood: "1" },
  { point: "p151", x: 450, y: 1585, near_point: ["p134"], room: ["0"], flood: "1" },
  { point: "p152", x: 450, y: 1940, near_point: ["p153"], room: ["0"], flood: "1" },
  { point: "p153", x: 450, y: 2015, near_point: ["p152", "p154", "p155"], room: ["A101"], flood: "1" },
  { point: "p154", x: 490, y: 2015, near_point: ["p153", "p254", "p354"], room: ["0"], flood: "1" },
  { point: "p155", x: 450, y: 2125, near_point: ["p153", "p156"], room: ["A"], flood: "1" },
  { point: "p156", x: 450, y: 2315, near_point: ["p155", "p157"], room: ["A103"], flood: "1" },
  { point: "p157", x: 450, y: 2545, near_point: ["p156", "p164", "p257", "p357", "p457"], room: ["16"], flood: "1" },
  { point: "p158", x: 1500, y: 1485, near_point: ["p143", "p159"], room: ["A123"], flood: "1" },
  { point: "p159", x: 1500, y: 1685, near_point: ["p158", "p160"], room: ["A123"], flood: "1" },
  { point: "p160", x: 1500, y: 1780, near_point: ["p159", "p161", "p260", "p360", "p460"], room: ["13"], flood: "1" },
  { point: "p161", x: 1500, y: 1870, near_point: ["p160", "p162"], room: ["A121"], flood: "1" },
  { point: "p162", x: 1500, y: 2450, near_point: ["p161", "p163"], room: ["A119"], flood: "1" },
  { point: "p163", x: 1500, y: 2545, near_point: ["p162", "p181", "p263", "p363", "p463"], room: ["14"], flood: "1" },
  { point: "p164", x: 450, y: 2635, near_point: ["p157", "p165"], room: ["0"], flood: "1" },
  { point: "p165", x: 500, y: 2635, near_point: ["p164", "p166"], room: ["A102", "A105"], flood: "1" },
  { point: "p166", x: 580, y: 2635, near_point: ["p165", "p167"], room: ["A105"], flood: "1" },
  { point: "p167", x: 610, y: 2635, near_point: ["p166", "p168"], room: ["A107"], flood: "1" },
  { point: "p168", x: 700, y: 2635, near_point: ["p167", "p169"], room: ["A102", "A107"], flood: "1" },
  { point: "p169", x: 740, y: 2635, near_point: ["p168", "p170"], room: ["A104", "A109"], flood: "1" },
  { point: "p170", x: 830, y: 2635, near_point: ["p169", "p171"], room: ["A109"], flood: "1" },
  { point: "p171", x: 860, y: 2635, near_point: ["p170", "p172"], room: ["A111"], flood: "1" },
  { point: "p172", x: 950, y: 2635, near_point: ["p171", "p173"], room: ["A104", "A111"], flood: "1" },
  { point: "p173", x: 990, y: 2635, near_point: ["p172", "p174"], room: ["A106", "A113"], flood: "1" },
  { point: "p174", x: 1080, y: 2635, near_point: ["p173", "p175"], room: ["A113"], flood: "1" },
  { point: "p175", x: 1110, y: 2635, near_point: ["p174", "p176"], room: ["A115"], flood: "1" },
  { point: "p176", x: 1200, y: 2635, near_point: ["p175", "p177"], room: ["A106", "A115"], flood: "1" },
  { point: "p177", x: 1240, y: 2635, near_point: ["p176", "p178"], room: ["A108", "A117"], flood: "1" },
  { point: "p178", x: 1330, y: 2635, near_point: ["p177", "p179"], room: ["A117"], flood: "1" },
  { point: "p179", x: 1405, y: 2635, near_point: ["p178", "p180", "p279", "p379", "p479"], room: ["15"], flood: "1" },
  { point: "p180", x: 1440, y: 2635, near_point: ["p179", "p181"], room: ["A108"], flood: "1" },
  { point: "p181", x: 1500, y: 2635, near_point: ["p180", "p163"], room: ["0"], flood: "1" },


  { point: "p201", x: 45, y: 195, near_point: ["p202"], room: ["B205"], flood: "2" },
  { point: "p202", x: 140, y: 195, near_point: ["p201", "p203"], room: ["B205"], flood: "2" },
  { point: "p203", x: 180, y: 195, near_point: ["p202", "p204", "p216"], room: ["0"], flood: "2" },
  { point: "p204", x: 225, y: 195, near_point: ["p203", "p205"], room: ["B207", "B204"], flood: "2" },
  { point: "p205", x: 325, y: 195, near_point: ["p204", "p206"], room: ["B207", "B204"], flood: "2" },
  { point: "p206", x: 365, y: 195, near_point: ["p205", "p207"], room: ["B209", "B206"], flood: "2" },
  { point: "p207", x: 570, y: 195, near_point: ["p206", "p208"], room: ["B209", "B206"], flood: "2" },
  { point: "p208", x: 620, y: 195, near_point: ["p207", "p209"], room: ["B211", "B208"], flood: "2" },
  { point: "p209", x: 825, y: 195, near_point: ["p208", "p210"], room: ["B211", "B208"], flood: "2" },
  { point: "p210", x: 870, y: 195, near_point: ["p209", "p211"], room: ["B213", "B210"], flood: "2" },
  { point: "p211", x: 1070, y: 195, near_point: ["p210", "p212"], room: ["B213", "B210"], flood: "2" },
  { point: "p212", x: 1120, y: 195, near_point: ["p211", "p213"], room: ["0"], flood: "2" },
  { point: "p213", x: 1170, y: 195, near_point: ["p212", "p214", "p113", "p313", "p413"], room: ["0"], flood: "2" },
  { point: "p214", x: 1220, y: 195, near_point: ["p213", "p215"], room: ["0"], flood: "2" },
  { point: "p215", x: 1260, y: 195, near_point: ["p214", "p224"], room: ["0"], flood: "2" },
  { point: "p216", x: 180, y: 295, near_point: ["p203", "p217", "p116", "p316", "p416"], room: ["0"], flood: "2" },
  { point: "p217", x: 180, y: 665, near_point: ["p216", "p283"], room: ["B203", "B202"], flood: "2" },
  { point: "p283", x: 180, y: 875, near_point: ["p217", "p220"], room: ["B202"], flood: "2" },
  { point: "p220", x: 180, y: 965, near_point: ["p283", "p221", "p222"], room: ["B201"], flood: "2" },
  { point: "p221", x: 225, y: 965, near_point: ["p220", "p121", "p321"], room: ["0"], flood: "2" },
  { point: "p222", x: 180, y: 1045, near_point: ["p220", "p282"], room: ["B201"], flood: "2" },
  { point: "p282", x: 180, y: 1350, near_point: ["p222", "p231", "p182", "p382", "p482"], room: ["0"], flood: "2" },
  { point: "p224", x: 1260, y: 340, near_point: ["p215", "p225", "p124", "p324", "p424"], room: ["0"], flood: "2" },
  { point: "p225", x: 1260, y: 665, near_point: ["p224", "p226"], room: ["B214", "B215"], flood: "2" },
  { point: "p226", x: 1260, y: 895, near_point: ["p225", "p228"], room: ["B214", "B215"], flood: "2" },
  { point: "p227", x: 1210, y: 965, near_point: ["p228", "p127", "p327"], room: ["0"], flood: "2" },
  { point: "p228", x: 1260, y: 965, near_point: ["p226", "p227", "p241"], room: ["B217"], flood: "2" },
  { point: "p231", x: 180, y: 1435, near_point: ["p282", "p232"], room: ["0"], flood: "2" },
  { point: "p232", x: 230, y: 1435, near_point: ["p231", "p233"], room: ["A233"], flood: "2" },
  { point: "p233", x: 350, y: 1435, near_point: ["p232", "p234", "p133", "p333", "p433"], room: ["0"], flood: "2" },
  { point: "p234", x: 450, y: 1435, near_point: ["p233", "p235", "p284"], room: ["A233"], flood: "2" },
  { point: "p235", x: 500, y: 1435, near_point: ["p234", "p236"], room: ["A231", "A218"], flood: "2" },
  { point: "p236", x: 705, y: 1435, near_point: ["p235", "p237"], room: ["A231", "A218"], flood: "2" },
  { point: "p237", x: 755, y: 1435, near_point: ["p236", "p238"], room: ["A229", "A216"], flood: "2" },
  { point: "p238", x: 960, y: 1435, near_point: ["p236", "p238"], room: ["A229", "A216"], flood: "2" },
  { point: "p239", x: 1010, y: 1435, near_point: ["p238", "p240"], room: ["A214"], flood: "2" },
  { point: "p240", x: 1215, y: 1435, near_point: ["p239", "p241"], room: ["A214"], flood: "2" },
  { point: "p241", x: 1260, y: 1435, near_point: ["p228", "p240", "p242"], room: ["A212"], flood: "2" },
  { point: "p242", x: 1350, y: 1435, near_point: ["p241", "p285", "p142", "p342", "p442"], room: ["0"], flood: "2" },
  { point: "p285", x: 1450, y: 1435, near_point: ["p242", "p243"], room: ["A212"], flood: "2" },
  { point: "p243", x: 1500, y: 1435, near_point: ["p285", "p244", "p258"], room: ["0"], flood: "2" },
  { point: "p244", x: 1540, y: 1435, near_point: ["p243", "p245"], room: ["A227"], flood: "2" },
  { point: "p245", x: 1670, y: 1435, near_point: ["p244", "p246"], room: ["A227"], flood: "2" },
  { point: "p246", x: 1700, y: 1435, near_point: ["p245", "p247"], room: ["A225"], flood: "2" },
  { point: "p247", x: 1830, y: 1435, near_point: ["p246", "p248"], room: ["A225"], flood: "2" },
  { point: "p248", x: 1875, y: 1435, near_point: ["p247", "p249"], room: ["0"], flood: "2" },
  { point: "p249", x: 1875, y: 1255, near_point: ["p248", "p250", "p149", "p349"], room: ["0"], flood: "2" },
  { point: "p250", x: 1550, y: 1255, near_point: ["p249", "p150", "p350"], room: ["0"], flood: "2" },
  { point: "p284", x: 450, y: 1960, near_point: ["p253", "p234"], room: ["A201"], flood: "2" },
  { point: "p253", x: 450, y: 2015, near_point: ["p284", "p254", "p255"], room: ["0"], flood: "2" },
  { point: "p254", x: 490, y: 2015, near_point: ["p253", "p154", "p354"], room: ["0"], flood: "2" },
  { point: "p255", x: 450, y: 2070, near_point: ["p253", "p256"], room: ["A202"], flood: "2" },
  { point: "p256", x: 450, y: 2325, near_point: ["p255", "p257"], room: ["A203"], flood: "2" },
  { point: "p257", x: 450, y: 2545, near_point: ["p256", "p264", "p157", "p357", "p457"], room: ["0"], flood: "2" },
  { point: "p258", x: 1500, y: 1485, near_point: ["p243", "p259"], room: ["A223"], flood: "2" },
  { point: "p259", x: 1500, y: 1685, near_point: ["p258", "p260"], room: ["A223"], flood: "2" },
  { point: "p260", x: 1500, y: 1780, near_point: ["p259", "p261", "p160", "p360", "p460"], room: ["0"], flood: "2" },
  { point: "p261", x: 1500, y: 1870, near_point: ["p260", "p262"], room: ["A221"], flood: "2" },
  { point: "p262", x: 1500, y: 2450, near_point: ["p261", "p263"], room: ["A219"], flood: "2" },
  { point: "p263", x: 1500, y: 2545, near_point: ["p262", "p281", "p163", "p363", "p463"], room: ["0"], flood: "2" },
  { point: "p264", x: 450, y: 2635, near_point: ["p257", "p265"], room: ["0"], flood: "2" },
  { point: "p265", x: 500, y: 2635, near_point: ["p264", "p266"], room: ["A204", "A205"], flood: "2" },
  { point: "p266", x: 580, y: 2635, near_point: ["p265", "p267"], room: ["A205"], flood: "2" },
  { point: "p267", x: 610, y: 2635, near_point: ["p266", "p268"], room: ["A207"], flood: "2" },
  { point: "p268", x: 700, y: 2635, near_point: ["p267", "p269"], room: ["A204", "A207"], flood: "2" },
  { point: "p269", x: 740, y: 2635, near_point: ["p268", "p270"], room: ["A206", "A209"], flood: "2" },
  { point: "p270", x: 830, y: 2635, near_point: ["p269", "p271"], room: ["A209"], flood: "2" },
  { point: "p271", x: 860, y: 2635, near_point: ["p270", "p272"], room: ["A211"], flood: "2" },
  { point: "p272", x: 950, y: 2635, near_point: ["p271", "p273"], room: ["A206", "A211"], flood: "2" },
  { point: "p273", x: 990, y: 2635, near_point: ["p272", "p274"], room: ["A208", "A213"], flood: "2" },
  { point: "p274", x: 1080, y: 2635, near_point: ["p273", "p275"], room: ["A213"], flood: "2" },
  { point: "p275", x: 1110, y: 2635, near_point: ["p274", "p276"], room: ["A215"], flood: "2" },
  { point: "p276", x: 1200, y: 2635, near_point: ["p275", "p277"], room: ["A208", "A215"], flood: "2" },
  { point: "p277", x: 1240, y: 2635, near_point: ["p276", "p278"], room: ["A210", "A217"], flood: "2" },
  { point: "p278", x: 1330, y: 2635, near_point: ["p277", "p279"], room: ["A217"], flood: "2" },
  { point: "p279", x: 1405, y: 2635, near_point: ["p278", "p280", "p179", "p379", "p479"], room: ["0"], flood: "2" },
  { point: "p280", x: 1440, y: 2635, near_point: ["p279", "p281"], room: ["A210"], flood: "2" },
  { point: "p281", x: 1500, y: 2635, near_point: ["p280", "p263"], room: ["0"], flood: "2" },


  { point: "p301", x: 45, y: 195, near_point: ["p302"], room: ["B307"], flood: "3" },
  { point: "p302", x: 140, y: 195, near_point: ["p301", "p303"], room: ["B307"], flood: "3" },
  { point: "p303", x: 180, y: 195, near_point: ["p302", "p304", "p316"], room: ["0"], flood: "3" },
  { point: "p304", x: 225, y: 195, near_point: ["p303", "p305"], room: ["B309", "B304"], flood: "3" },
  { point: "p305", x: 325, y: 195, near_point: ["p304", "p306"], room: ["B309", "B304"], flood: "3" },
  { point: "p306", x: 365, y: 195, near_point: ["p305", "p307"], room: ["B311", "B306"], flood: "3" },
  { point: "p307", x: 570, y: 195, near_point: ["p306", "p308"], room: ["B311", "B306"], flood: "3" },
  { point: "p308", x: 620, y: 195, near_point: ["p307", "p309"], room: ["B313", "B308"], flood: "3" },
  { point: "p309", x: 825, y: 195, near_point: ["p308", "p310"], room: ["B313", "B308"], flood: "3" },
  { point: "p310", x: 870, y: 195, near_point: ["p309", "p311"], room: ["B315", "B310"], flood: "3" },
  { point: "p311", x: 1070, y: 195, near_point: ["p310", "p312"], room: ["B315", "B310"], flood: "3" },
  { point: "p312", x: 1120, y: 195, near_point: ["p311", "p313"], room: ["B312"], flood: "3" },
  { point: "p313", x: 1170, y: 195, near_point: ["p312", "p314", "p113", "p213", "p413"], room: ["0"], flood: "3" },
  { point: "p314", x: 1220, y: 195, near_point: ["p313", "p315"], room: ["B312"], flood: "3" },
  { point: "p315", x: 1260, y: 195, near_point: ["p314", "p324"], room: ["0"], flood: "3" },
  { point: "p316", x: 180, y: 295, near_point: ["p303", "p317", "p116", "p216", "p416"], room: ["0"], flood: "3" },
  { point: "p317", x: 180, y: 665, near_point: ["p316", "p383"], room: ["B305", "B302"], flood: "3" },
  { point: "p383", x: 180, y: 875, near_point: ["p317", "p320"], room: ["B303", "B302"], flood: "3" },
  { point: "p320", x: 180, y: 965, near_point: ["p383", "p321", "p322"], room: ["0"], flood: "3" },
  { point: "p321", x: 225, y: 965, near_point: ["p320", "p121", "p221"], room: ["0"], flood: "3" },
  { point: "p322", x: 180, y: 1045, near_point: ["p320", "p323"], room: ["B301"], flood: "3" },
  { point: "p382", x: 180, y: 1350, near_point: ["p322", "p331", "p182", "p282", "p482"], room: ["0"], flood: "3" },
  { point: "p324", x: 1260, y: 340, near_point: ["p315", "p325", "p124", "p224", "p424"], room: ["0"], flood: "3" },
  { point: "p325", x: 1260, y: 665, near_point: ["p324", "p326"], room: ["B314", "B317"], flood: "3" },
  { point: "p326", x: 1260, y: 895, near_point: ["p325", "p328"], room: ["B314", "B317"], flood: "3" },
  { point: "p327", x: 1210, y: 965, near_point: ["p328", "p127", "p227"], room: ["0"], flood: "3" },
  { point: "p328", x: 1260, y: 965, near_point: ["p326", "p327", "p341"], room: ["B319"], flood: "3" },
  { point: "p331", x: 180, y: 1435, near_point: ["p382", "p332"], room: ["0"], flood: "3" },
  { point: "p332", x: 230, y: 1435, near_point: ["p331", "p333"], room: ["A331"], flood: "3" },
  { point: "p333", x: 350, y: 1435, near_point: ["p332", "p334", "p133", "p233", "p433"], room: ["0"], flood: "3" },
  { point: "p334", x: 450, y: 1435, near_point: ["p333", "p335", "p384"], room: ["A331"], flood: "3" },
  { point: "p335", x: 500, y: 1435, near_point: ["p334", "p336"], room: ["A329", "A318"], flood: "3" },
  { point: "p336", x: 705, y: 1435, near_point: ["p335", "p337"], room: ["A329", "A318"], flood: "3" },
  { point: "p337", x: 755, y: 1435, near_point: ["p336", "p338"], room: ["A327", "A316"], flood: "3" },
  { point: "p338", x: 960, y: 1435, near_point: ["p336", "p338"], room: ["A327", "A316"], flood: "3" },
  { point: "p339", x: 1010, y: 1435, near_point: ["p338", "p340"], room: ["A314"], flood: "3" },
  { point: "p340", x: 1215, y: 1435, near_point: ["p339", "p341"], room: ["A314"], flood: "3" },
  { point: "p341", x: 1260, y: 1435, near_point: ["p328", "p340", "p342"], room: ["A312"], flood: "3" },
  { point: "p342", x: 1350, y: 1435, near_point: ["p341", "p385", "p142", "p242", "p442"], room: ["0"], flood: "3" },
  { point: "p385", x: 1450, y: 1435, near_point: ["p342", "p343"], room: ["A312"], flood: "3" },
  { point: "p343", x: 1500, y: 1435, near_point: ["p385", "p358"], room: ["0"], flood: "3" },
  { point: "p349", x: 1875, y: 1255, near_point: ["p350", "p149", "p249"], room: ["0"], flood: "3" },
  { point: "p350", x: 1550, y: 1255, near_point: ["p349", "p150", "p250"], room: ["0"], flood: "3" },
  { point: "p384", x: 450, y: 1960, near_point: ["p353", "p334"], room: ["A301"], flood: "3" },
  { point: "p353", x: 450, y: 2015, near_point: ["p384", "p354", "p355"], room: ["0"], flood: "3" },
  { point: "p354", x: 490, y: 2015, near_point: ["p353", "p154", "p254"], room: ["0"], flood: "3" },
  { point: "p355", x: 450, y: 2070, near_point: ["p353", "p356"], room: ["A303", "A302"], flood: "3" },
  { point: "p356", x: 450, y: 2325, near_point: ["p355", "p357"], room: ["A305", "A302"], flood: "3" },
  { point: "p357", x: 450, y: 2545, near_point: ["p356", "p364", "p157", "p257", "p457"], room: ["0"], flood: "3" },
  { point: "p358", x: 1500, y: 1485, near_point: ["p343", "p359"], room: ["A325"], flood: "3" },
  { point: "p359", x: 1500, y: 1685, near_point: ["p358", "p360"], room: ["A325"], flood: "3" },
  { point: "p360", x: 1500, y: 1780, near_point: ["p359", "p361", "p160", "p260", "p460"], room: ["0"], flood: "3" },
  { point: "p361", x: 1500, y: 1870, near_point: ["p360", "p362"], room: ["A323"], flood: "3" },
  { point: "p362", x: 1500, y: 2450, near_point: ["p361", "p363"], room: ["A321"], flood: "3" },
  { point: "p363", x: 1500, y: 2545, near_point: ["p362", "p381", "p163", "p263", "p463"], room: ["0"], flood: "3" },
  { point: "p364", x: 450, y: 2635, near_point: ["p357", "p365"], room: ["0"], flood: "3" },
  { point: "p365", x: 500, y: 2635, near_point: ["p364", "p366"], room: ["A304", "A307"], flood: "3" },
  { point: "p366", x: 580, y: 2635, near_point: ["p365", "p367"], room: ["A307"], flood: "3" },
  { point: "p367", x: 610, y: 2635, near_point: ["p366", "p368"], room: ["A309"], flood: "3" },
  { point: "p368", x: 700, y: 2635, near_point: ["p367", "p369"], room: ["A304", "A309"], flood: "3" },
  { point: "p369", x: 740, y: 2635, near_point: ["p368", "p370"], room: ["A306", "A311"], flood: "3" },
  { point: "p370", x: 830, y: 2635, near_point: ["p369", "p371"], room: ["A311"], flood: "3" },
  { point: "p371", x: 860, y: 2635, near_point: ["p370", "p372"], room: ["A313"], flood: "3" },
  { point: "p372", x: 950, y: 2635, near_point: ["p371", "p373"], room: ["A306", "A313"], flood: "3" },
  { point: "p373", x: 990, y: 2635, near_point: ["p372", "p374"], room: ["A308", "A315"], flood: "3" },
  { point: "p374", x: 1080, y: 2635, near_point: ["p373", "p375"], room: ["A315"], flood: "3" },
  { point: "p375", x: 1110, y: 2635, near_point: ["p374", "p376"], room: ["A317"], flood: "3" },
  { point: "p376", x: 1200, y: 2635, near_point: ["p375", "p377"], room: ["A308", "A317"], flood: "3" },
  { point: "p377", x: 1240, y: 2635, near_point: ["p376", "p378"], room: ["A310", "A319"], flood: "3" },
  { point: "p378", x: 1330, y: 2635, near_point: ["p377", "p379"], room: ["A319"], flood: "3" },
  { point: "p379", x: 1405, y: 2635, near_point: ["p378", "p380", "p179", "p279", "p479"], room: ["0"], flood: "3" },
  { point: "p380", x: 1440, y: 2635, near_point: ["p379", "p381"], room: ["A310"], flood: "3" },
  { point: "p381", x: 1500, y: 2635, near_point: ["p380", "p363"], room: ["0"], flood: "3" },


  { point: "p401", x: 45, y: 195, near_point: ["p402"], room: ["B401"], flood: "4" },
  { point: "p402", x: 140, y: 195, near_point: ["p401", "p403"], room: ["B401"], flood: "4" },
  { point: "p403", x: 180, y: 195, near_point: ["p402", "p404", "p416"], room: ["0"], flood: "4" },
  { point: "p404", x: 225, y: 195, near_point: ["p403", "p405"], room: ["B403", "B402"], flood: "4" },
  { point: "p405", x: 325, y: 195, near_point: ["p404", "p406"], room: ["B403", "B402"], flood: "4" },
  { point: "p406", x: 365, y: 195, near_point: ["p405", "p407"], room: ["B405", "B404"], flood: "4" },
  { point: "p407", x: 570, y: 195, near_point: ["p406", "p408"], room: ["B405", "B404"], flood: "4" },
  { point: "p408", x: 620, y: 195, near_point: ["p407", "p409"], room: ["B407", "B406"], flood: "4" },
  { point: "p409", x: 825, y: 195, near_point: ["p408", "p410"], room: ["B407", "B406"], flood: "4" },
  { point: "p410", x: 870, y: 195, near_point: ["p409", "p411"], room: ["B409", "B408"], flood: "4" },
  { point: "p411", x: 1070, y: 195, near_point: ["p410", "p412"], room: ["B409", "B408"], flood: "4" },
  { point: "p412", x: 1120, y: 195, near_point: ["p411", "p413"], room: ["B410"], flood: "4" },
  { point: "p413", x: 1170, y: 195, near_point: ["p412", "p414", "p113", "p213", "p313"], room: ["0"], flood: "4" },
  { point: "p414", x: 1220, y: 195, near_point: ["p413", "p415"], room: ["B410"], flood: "4" },
  { point: "p415", x: 1260, y: 195, near_point: ["p414", "p424"], room: ["0"], flood: "4" },
  { point: "p416", x: 180, y: 295, near_point: ["p403", "p116", "p216", "p316"], room: ["0"], flood: "4" },
  { point: "p482", x: 180, y: 1350, near_point: ["p431", "p182", "p282", "p382"], room: ["0"], flood: "4" },
  { point: "p424", x: 1260, y: 340, near_point: ["p415", "p124", "p224"], room: ["0"], flood: "4" },
  { point: "p431", x: 180, y: 1435, near_point: ["p482", "p432"], room: ["0"], flood: "4" },
  { point: "p432", x: 230, y: 1435, near_point: ["p431", "p433"], room: ["A423"], flood: "4" },
  { point: "p433", x: 350, y: 1435, near_point: ["p432", "p434", "p133", "p233", "p333"], room: ["0"], flood: "4" },
  { point: "p434", x: 450, y: 1435, near_point: ["p433", "p435"], room: ["A423"], flood: "4" },
  { point: "p435", x: 500, y: 1435, near_point: ["p434", "p436"], room: ["A421", "A416"], flood: "4" },
  { point: "p436", x: 705, y: 1435, near_point: ["p435", "p437"], room: ["A421", "A416"], flood: "4" },
  { point: "p437", x: 755, y: 1435, near_point: ["p436", "p438"], room: ["A419", "A414"], flood: "4" },
  { point: "p438", x: 960, y: 1435, near_point: ["p436", "p438"], room: ["A419", "A414"], flood: "4" },
  { point: "p439", x: 1010, y: 1435, near_point: ["p438", "p440"], room: ["A412"], flood: "4" },
  { point: "p440", x: 1215, y: 1435, near_point: ["p439", "p441"], room: ["A412"], flood: "4" },
  { point: "p441", x: 1260, y: 1435, near_point: ["p440", "p442"], room: ["A410"], flood: "4" },
  { point: "p442", x: 1350, y: 1435, near_point: ["p441", "p485", "p142", "p242", "p342"], room: ["0"], flood: "4" },
  { point: "p485", x: 1450, y: 1435, near_point: ["p442", "p443"], room: ["A410"], flood: "4" },
  { point: "p443", x: 1500, y: 1435, near_point: ["p485", "p460"], room: ["0"], flood: "4" },
  { point: "p457", x: 450, y: 2545, near_point: ["p464", "p157", "p257", "p357"], room: ["0"], flood: "4" },
  //{ point: "p458", x: 1500, y: 1485, near_point: ["p443","p459"], room: ["0"], flood: "4" },
  //{ point: "p459", x: 1500, y: 1685, near_point: ["p458","p460"], room: ["0"], flood: "4" },
  { point: "p460", x: 1500, y: 1780, near_point: ["p443", "p461", "p160", "p260", "p360"], room: ["0"], flood: "4" },
  { point: "p461", x: 1500, y: 1870, near_point: ["p460", "p462"], room: ["A417"], flood: "4" },
  { point: "p462", x: 1500, y: 2450, near_point: ["p461", "p463"], room: ["A415"], flood: "4" },
  { point: "p463", x: 1500, y: 2545, near_point: ["p462", "p481", "p163", "p263", "p363"], room: ["0"], flood: "4" },
  { point: "p464", x: 450, y: 2635, near_point: ["p457", "p465"], room: ["0"], flood: "4" },
  { point: "p465", x: 500, y: 2635, near_point: ["p464", "p466"], room: ["A402", "A401"], flood: "4" },
  { point: "p466", x: 580, y: 2635, near_point: ["p465", "p467"], room: ["A401"], flood: "4" },
  { point: "p467", x: 610, y: 2635, near_point: ["p466", "p468"], room: ["A403"], flood: "4" },
  { point: "p468", x: 700, y: 2635, near_point: ["p467", "p469"], room: ["A402", "A403"], flood: "4" },
  { point: "p469", x: 740, y: 2635, near_point: ["p468", "p470"], room: ["A404", "A405"], flood: "4" },
  { point: "p470", x: 830, y: 2635, near_point: ["p469", "p471"], room: ["A405"], flood: "4" },
  { point: "p471", x: 860, y: 2635, near_point: ["p470", "p472"], room: ["A407"], flood: "4" },
  { point: "p472", x: 950, y: 2635, near_point: ["p471", "p473"], room: ["A404", "A407"], flood: "4" },
  { point: "p473", x: 990, y: 2635, near_point: ["p472", "p474"], room: ["A406", "A409"], flood: "4" },
  { point: "p474", x: 1080, y: 2635, near_point: ["p473", "p475"], room: ["A409"], flood: "4" },
  { point: "p475", x: 1110, y: 2635, near_point: ["p474", "p476"], room: ["A411"], flood: "4" },
  { point: "p476", x: 1200, y: 2635, near_point: ["p475", "p477"], room: ["A406", "A411"], flood: "4" },
  { point: "p477", x: 1240, y: 2635, near_point: ["p476", "p478"], room: ["A408", "A413"], flood: "4" },
  { point: "p478", x: 1330, y: 2635, near_point: ["p477", "p479"], room: ["A413"], flood: "4" },
  { point: "p479", x: 1405, y: 2635, near_point: ["p478", "p480", "p179", "p279", "p379"], room: ["0"], flood: "4" },
  { point: "p480", x: 1440, y: 2635, near_point: ["p479", "p481"], room: ["A408"], flood: "4" },
  { point: "p481", x: 1500, y: 2635, near_point: ["p480", "p463"], room: ["0"], flood: "4" },
];