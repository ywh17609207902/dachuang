var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        placeData: {}
    },
    makertap: function(e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
        that.changeMarkerColor(wxMarkerData, id);
    },
    onLoad: function() {
        var that = this;
        var BMap = new bmap.BMapWX({
            ak: 'VfH1MOaSDfnKUZMy9cmOvaBDrKj7ah5g'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData
            });
            that.setData({
                latitude: wxMarkerData[0].latitude
            });
            that.setData({
                longitude: wxMarkerData[0].longitude
            });
        }
        BMap.search({
            "query": '医院',
            fail: fail,
            success: success,
            iconPath: '../../images/red.png',
            iconTapPath: '../../images/red.png'
        });
    },
    showSearchInfo: function(data, i) {
        var that = this;
        that.setData({
            placeData: {
                title: '名称：' + data[i].title + '\n',
                address: '地址：' + data[i].address + '\n',
                telephone: '电话：' + data[i].telephone +"\n",
                latitude:"纬度 " + data[i].latitude + "\n",
                longitude:"经度 " + data[i].longitude +" \n",
            }
        });
    },
    changeMarkerColor: function(data, id) {
        var that = this;
        var markersTemp = [];
        for (var i = 0; i < data.length; i++) {
            if (i === id) {
                data[i].iconPath = "../../images/yellow.png";
            } else {
                data[i].iconPath = "../../images/red.png";
            }
            markersTemp[i] = data[i];
        }
        that.setData({
            markers: markersTemp
        });
    },
    clickMarker :function(e){ 
        var that = this;
        var markersy = that.data.markers
        for (var i = 0; i < markersy.length; i++) { //利用循环对比marker和markers中一样的ID
        if (e.detail.markerId == markersy[i].id) { //得到点击map上面的经纬度坐标
        var navi_lng=markersy[i].longitude;
        var navi_lat=markersy[i].latitude;
        var towerNum=markersy[i].title;
        wx.openLocation({          //将此经纬度通过openlocation导航
        latitude: navi_lat,
        longitude: navi_lng,
        name:towerNum
        })
        }
        }
        }
        
})