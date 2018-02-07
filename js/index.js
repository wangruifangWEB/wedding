$(function(){
  //轮播图调用
  $('#slider').carousel();
  //窗口右下角弹出框
/*  window.onload=function(){
    var msg=document.getElementById("msg");
    msg.style.bottom="0";
    msg.firstElementChild.onclick=function(){
    msg.style.bottom="-300px";
      setTimeout(function(){
        msg.style.bottom="0";
      },200000);
    }
  }*/

//点击移动图片
var clickCount=0;//定义累计点击次数
$(".prev").click(function(){
  clickCount++;
  var moveWidth=($(".lun li").width()+16)*clickCount;
      $("#action .imgs_item .lun").animate({
        right:moveWidth
      },300);
    if(clickCount>=$(".lun li").length){
      clickCount=0;
    }
  });

$(".next").click(function(){
  clickCount++;
  var moveWidth=($(".lun li").width()+16)*clickCount;
      $("#action .imgs_item .lun").animate({
        right:-moveWidth
      },300)
  });
});

/**
   * 轮播广告插件函数，调用方法形如：
   * $('#slider').carousel();
   * HTML结构形如：
   * <div id="slider">
   *     <img class="active" src="01.jpg">
   *     <img src="02.jpg">
   *     <ul>
   *       <li class="active">1</li>
   *       <li>2</li>
   *     </ul>
   *  </div>
   * **/
  jQuery.fn.carousel = function(){
    var interval = 3000;    //每隔多久轮换一张
    var duration = 500;     //每次轮换动画的持续时间
    var $imgList = this.children('img'); //所有的img组成的类数组对象
    var $liList = this.find('li'); //所有的li组成的类数组对象
    var cur = 0;  //当前显示的广告的序号
    var next = 1; //下次即将要显示的广告的序号


    //开启一个定时器，每隔interval时长启动一次轮换
    setInterval(function(){
      lunHuan()
    }, interval);

    //为每个li添加事件监听，单击后直接显示指定的广告
    $liList.click(function(){
      //cur 0    next 1       点击4后
      //cur 0    next 4
      var i = $liList.index(this);//点击的li在所有li中的序号
      next = i;
      //点击后立即开始广告轮换
      lunHuan();
    });

    //进行广告轮换
    function lunHuan(){
      //让第next个li圆饼添加.active，其兄弟删除.active
      $liList.eq(next).addClass('active').siblings('.active').removeClass('active');
      //让当前显示的广告启动动画向左滑动，滑出去后，删除.active
      $imgList.eq(cur).animate({left:'-100%'},duration,function(){
        $(this).removeClass('active');
      })
      //让即将要显示的下一张广告添加.active，出现在最右侧，开始动画慢慢向左滑动
      $imgList.eq(next).addClass('active').css('left','100%').animate({left: '0'},duration);
      //修改cur和next变量的值,第cur张移走后next张移入
      cur = next;  //<=0     <=1
      next++;
      if(next>=$imgList.length){
        next = 0;
      }
    }
  }