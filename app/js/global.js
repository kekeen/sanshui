$(document).ready(function(){
    //模块js初始化
    commonJs.fn.init();

});

var commonJs = $(window).commonJs || {};

commonJs.fn = {
    init : function(){
        var _this = this;
        _this.dropdown();
        _this.icheck();
        _this.nicescroll();
        _this.showNav();
    },

    // 下拉菜单
    dropdown : function () {
        $('.dropdown').on('click','.dropdown-menu li a', function(event) {
            var txt = $(this).text();
            $(this).parents('.dropdown-menu').siblings('.dropdown-toggle')[0].childNodes[0].nodeValue = txt + ' ';
        });
    },

    // 侧边条
    nicescroll : function () {
        $(".nicescroll").niceScroll({
            cursorcolor: "#ccc",
            cursorwidth:"3px",
            cursorborder:"none"
        });
    },

    // 复选框
    icheck : function () {
        $('input').iCheck({
            checkboxClass: 'icheckbox_minimal-green',
            radioClass: 'iradio_minimal-green',
            increaseArea: '20%'
        });
    },

    //v2.0版鼠标经过底部显示导航
    showNav : function () {
        $('.nav-wrap').hover(function () {
            $(this).children('.nav').toggle();
        })
    }

};
