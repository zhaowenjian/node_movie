<style>
    .device{
        text-align:left;
        margin-bottom: 1em;
    }
    .device-status0{
        color:gray;
    }
    .device-status1{
        color:green;
        font-size:larger;
        font-weight:bolder;
    }


    #addDevice{
        margin: 2em 35%;
    }
    #map {
        display: none;
    }
    .bg{ background-color: black; z-index:1001; -moz-opacity: 0.7; opacity:.70; filter: alpha(opacity=70);}
    #show{display: none; position: absolute; top: 25%;  width: 90%; padding: 8px; border: 8px solid #E8E9F7; background-color: white; z-index:1002; overflow: auto;}
</style>

<template>
<div>
    <div class="device">
        <mt-cell 
        v-for="d in devices" 
        :title="d.name"
        :class="'device-status'+d.status"
        :label="'绑定于'+ (d.update_at||d.created_at)"
        >
            <div v-if="d.status>0">
                <mt-button type="primary" size="small" @click.native="send(d)">发送位置</mt-button>
                <mt-button size="small" @click.native="set(d.id,d.car_id)">设置</mt-button>   
            </div>
            <span v-else>已经失效</span>
        </mt-cell>
        <mt-button id='addDevice' type="primary" @click.native="scan" plain>添加设备</mt-button>
    </div>
    <div id="map">
            <iframe frameborder="0" id="mapPage" width="100%" height="100%" src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&zoom=14&key=ACABZ-F5BWX-5574P-7AHMN-TZJP5-FZBWO&referer=ccpk">
                
            </iframe>  
    </div>
    <div id="show">
        <div id="locMsg"></div>
        <button id = 'confirm'>确认发送</button>            
        <button id = 'cancel'>取消</button>            
    </div>
</div>
</template>

<script>
import { Cell,Button,Toast,Indicator} from 'mint-ui';
export default {
    data(){
        return{
            devices:[
            ]
        }
    },
    components:{
      "mt-cell":Cell,
      "mt-button":Button
    },
    mounted(){
        this.$yyf.success((info)=>{
            this.devices=info;
        }).get('Device/');
    },
    methods:{
        scan(){
            window.location.href="/scan.html";
        },
        set(device_id,car_id){
            this.$router.push('/device/'+device_id+'/car/'+car_id);
        },
        send(device){
            var map = document.querySelector('#map');
            var confirm = document.querySelector('#confirm');
            var cancel = document.querySelector('#cancel');
            
            //Indicator.open('正在获取位置...');
            var $vm=this;

            console.log(device);
            var $vm=this;
            var loc;

            var devices = document.querySelector('#devices');
            var map = document.querySelector('#map');
            var confirm = document.querySelector('#confirm');
            var cancel = document.querySelector('#cancel');

            confirm.onclick = function(){
                var location = {
                    latitude: loc.latlng.lat,
                    longitude: loc.latlng.lng
                };
                $vm.destination(device, location);
                Indicator.open('正在发送位置...');

                document.getElementById("show").style.display ="none";
                map.className = '';
                map.style.display = 'none';
                devices.style.display = 'block';
            }

            cancel.onclick = function(){
                document.getElementById("show").style.display ="none";
                map.className = '';
                map.style.display = 'none';
                devices.style.display = 'block';
            }

            window.addEventListener('message', function(e){
                    //接受位置信息
                    loc = e.data;
                    if(loc && loc.module == 'locationPicker'){
                        map.className = 'bg';
                        document.getElementById("show").style.display ="block";
                        // loc: {module:, la}
                        document.getElementById("locMsg").innerHTML ="您已选择位置： " + loc.poiname;
                    }
                }, false);

            devices.style.display = 'none';
            map.style.display = 'block'; 


            if(document.readyState === "complete"){

                wx.checkJsApi({
                    jsApiList: ['geoLocation,getLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function(res) {
                    if(res.checkResult.geoLocation){
                            $vm.setLocation(device);
                        }else{
                            $vm.$yyf.success((info)=>{
                                info.jsApiList = ['getLocation'];
                                wx.config(info);
                            }).get('Wechat/sign');
                            wx.ready(()=>$vm.setLocation(device));                            
                        }
                    }
                });


            }else{//尚未加载
                window.onload=()=>{
                    $vm.$yyf.success((info)=>{
                        info.jsApiList = ['getLocation'];
                        wx.config(info);
                    }).get('Wechat/sign');
                    wx.ready(()=>$vm.setLocation(device));                    
                };
            }
        },
        setLocation(device){
            var callback=(des)=>this.destination(device,des);
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success(res) {
                    var data={
                        latitude:res.latitude,
                        longitude:res.longitude,
                    }
                    callback(data);
                },
                fail(res) {
                    Indicator.close();
                    Toast("位置获取失败");
                }
            });
        },
        destination(device,des){
            var api = this.$yyf.success(info=>{
                Indicator.close();
                if(Number.isInteger(info)){
                    device['car_id']=info;
                    info="添加成功";
                }
                Toast({
                    message: info,
                    iconClass: 'icon icon-success'
                })
            }).fail(info=>{
                Indicator.close();
                Toast({
                    message: info,
                    iconClass: 'icon icon-error'
                })
            });
            if(device.car_id){
                api.put('Car/'+device.car_id+'/destination',des);
            }else{
                des['device_id']=device.id;
                api.post('Car/',des);
            }
        },
    }
}
</script>
