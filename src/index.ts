/**
 * Created by user on 2018/3/12.
 */
import './main.scss';
import $ = require('jquery');
var PageAwardHome = (function () {
    function _initPublish(options){
        // 默认参数对象
        var defaults = {
            element: document.getElementById('page-award-home'), // 接收DOM对象
            scaleWidth:null,//比例尺 for 宽度
            scaleHeight:null,//比例尺 for 高度
            rotating:false, //是否正在旋转
            pos:{ //position and size

            },
            url:{
            },
            dom:{
                domPoint:'dom-point', //指针
                domRotate:'dom-rotate',//大转盘
            },
        };

        var opts = $.extend(defaults, options); // 合并接收对象数据

        var _publish = {
            /**
             * 模块初始化入口
             *
             * @param {string} opts 外部参数对象与内部默认参数对象合并后的对象
             */
            _init: function(opts){
                $.extend(true, this, opts); // 把合并后接收的对象，继续合并为需要返回的对象
                this._initDom();
                _publish._initScale();
                _publish._initDomStyle();
                this._initListeners();
            },
            /**
             * 自动获取dom元素
             *
             */
            _initDom:function () {
                for(var key in this.dom){
                    //带有子节点的dom
                    if(this.utils.isObject(this.dom[key])){
                        var el = this.element.querySelectorAll('['+this.dom[key]['el']+']');
                        var children = this.dom[key]['children'];
                        _publish.utils.each(el,function(dataI){
                            var attrDataI = $(dataI).attr('data-i');
                            _publish.dom[key][attrDataI] = _publish.dom[key][attrDataI] || {};
                            _publish.dom[key][attrDataI]['el'] = dataI;
                            _publish.utils.each(children,function(it,ky){
                                _publish.dom[key][attrDataI]['children'] = _publish.dom[key][attrDataI]['children']
                                    || {};
                                _publish.dom[key][attrDataI]['children'][ky] = dataI.querySelector('['+it+']');
                            });
                        });
                    }
                    //单节点
                    if(this.utils.isString(this.dom[key])){
                        var doms = this.element.querySelectorAll('['+this.dom[key]+']');
                        this.dom[key] = doms.length > 1 ? doms : doms[0];
                    }
                }
            },
            /**
             * 初始化dom样式
             *
             */
            _initDomStyle:function () {
                var scaleWidth = this.scaleWidth,
                    scaleHeight = this.scaleHeight;
                //初始化大转盘 样式
                $(_publish.dom.domRotate).animate({
                    top:scaleHeight * 1010 + 'px',
                    left:scaleWidth * 360 + 'px',
                    width:scaleWidth * 1245 + 'px'
                },1000);
                //初始化指针样式
                $(_publish.dom.domPoint).animate({
                    top:scaleHeight * 1175 + 'px',
                    left:scaleWidth * 740 + 'px',
                    width:scaleWidth * 500 + 'px'
                },1000);
            },
            /**
             * 初始化比例尺
             *
             */
            _initScale:function () {
                var mapWidth = this.element.clientWidth,
                    mapHeight = this.element.clientHeight;
                this.scaleWidth = mapWidth / 1920;
                this.scaleHeight = mapWidth / 1080;
            },
            /**
             * 渲染数据
             * @params json
             */
            _renderData:function (json) {

            },
            /**
             * 绑定事件监听器
             *
             */
            _initListeners: function(){
               
            },
            /**
             * 回调事件 外部调用
             *
             */
            callback: {

            },
            /**
             * 工具类事件
             *
             */
            utils: {
                delegates: function(element, configs){
                    var el = $(element);
                    for (var name in configs) {
                        var value = configs[name];
                        if (typeof value === 'function') {
                            var obj = {};
                            obj.click = value;
                            value = obj;
                        }
                        for (var type in value) {
                            el.delegate(name, type, value[type]);
                        }
                    }
                },
                each:function (obj,callback) {
                    //针对ie8
                    if(obj == '[object StaticNodeList]'){
                        for(var i = 0; i < obj.length; i++){
                            callback(obj[i],i);
                        }
                        return;
                    }
                    //针对正常浏览器
                    if(this.isArray(obj)){
                        for(var i = 0; i < obj.length; i++){
                            callback(obj[i],i);
                        }
                    }
                    if(this.isNodeList(obj)){
                        for(var i = 0; i < obj.length; i++){
                            callback(obj[i],i);
                        }
                    }
                    if(this.isObject(obj)){
                        for(var key in obj){
                            callback(obj[key],key);
                        }
                    }
                },
                isString:function (obj) {
                    return Object.prototype.toString.call(obj) == '[object String]';
                },
                isArray:function (obj) {
                    return Object.prototype.toString.call(obj) == '[object Array]';
                },
                isNodeList:function (obj) {
                    return Object.prototype.toString.call(obj) == '[object NodeList]';
                },
                isObject:function (obj) {
                    return Object.prototype.toString.call(obj) == '[object Object]';
                },
                isNull:function (obj) {
                    return Object.prototype.toString.call(obj) == '[object Null]';
                },
                isIe8:function () {
                    var browser=navigator.appName
                    var b_version=navigator.appVersion
                    var version=b_version.split(";");
                    var trim_Version=version[1].replace(/[ ]/g,"");
                    return browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0";
                },

                //获取区间随机数
                randRange:function (n,m) {
                    return Math.floor(Math.random()*(m-n+1)+n);
                },

                //获取queryString
                getQueryString:function (name) {
                    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) {
                        return unescape(r[2]);
                    }
                    return null;
                },

            }
        };
        _publish._init(opts);
        return _publish;
    }
    return _initPublish;
})();
$(function(){
    new PageAwardHome();
});