var __hasProp={}.hasOwnProperty,__extends=function(e,t){function n(){this.constructor=e}for(var i in t)__hasProp.call(t,i)&&(e[i]=t[i]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};(function(e){"use strict";var t,n,i,r,s,a,o,l,u,c,d;for(t=e.jQuery,i=e.pi=e.pi||{},r=i.utils,i.Checker=function(e){function t(){return l=t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.statuses=["loading"],t.prototype.initialize=function(){return this.type=this.options.type,this.desc=this.nod.find(".desc"),this.deps=this.options.deps||""},t.prototype.loading=function(e){return this.activate(),e?this.nod.addClass("is-loading"):this.nod.removeClass("is-loading")},t.prototype.finished=function(e){return this.loading(!1),this.nod.addClass("is-"+e)},t.prototype.clear=function(){var e,t,n,i;for(this.deactivate(),i=this.statuses,t=0,n=i.length;n>t;t++)e=i[t],this.nod.removeClass("is-"+e);this.desc.empty()},t.prototype.text=function(e){return this.desc.html(e)},t}(i.Base),u=["passed","failed","warning"],s=function(e){return i.Checker.prototype.statuses.push(e),i.Checker.prototype[e]=function(){return this.finished(e)}},a=0,o=u.length;o>a;a++)n=u[a],s(n);return i.RtmpChecker=function(e){function t(){return c=t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.messages={"rtmp.connection":{success:{message:"Подключение установлено.",status:1},error:{status:0,message:"Ошибка подключения RTMP.          Возможные причины:          <ul>          <li> - отсутствует интернет-соединение;</li>          <li> - запрещено подключение по протоколу RTMP;</li>          <li> - запрещено подключение через порт 443;</li>          <li> - домены и IP адреса Teachbase не внесены в белый список файерволла/корпортивного прокси-сервера/другой блокирующей системы <br/>          (необходимо добавить домены *.teachbase.ru и/или IP адреса 54.228.246.72, 79.125.119.170)</li>          </ul>"}},"rtmp.disconnected":{error:{message:"Отсутствует подключение. Попробуйте еще раз.",status:0}},"rtmp.undefined":{error:{message:"Отсутствует адрес RTMP сервера. Попробуйте еще раз.",status:0}},"rtmp.ping":{success:function(e){var t;return t="Пинг (avg, min, max): "+e.avg+"s, "+e.min+"s, "+e.max+"s.",parseInt(e.avg)>1e3?{status:2,data:e,message:""+t+"<br/>Слишком большой пинг: "+e.avg+"s. Вероятна большая задержка при общении."}:{status:1,data:e,message:t}},error:{message:"Ошибка при проверке пинга. Попробуйте еще раз.",status:0}},"rtmp.bw_in":{success:function(e){var t,n;return n="Входящая скорость (avg, min, max): "+e.avg+" KB/s, "+e.min+" KB/s, "+e.max+" KB/s.",t=parseInt(e.avg),512>t?{status:2,data:e,message:""+n+"<br/>Низкая входящая скорость. Возможны обрывы при просмотре видео других участников. <br/> Рекомендуется отключить прием видеосигнала в настройках."}:{status:1,data:e,message:n}},error:{message:"Ошибка при проверке входящей скорости. Попробуйте еще раз",status:0}},"rtmp.bw_out":{success:function(e){var t,n;return n="Исходящая скорость (avg, min, max): "+e.avg+" KB/s, "+e.min+" KB/s, "+e.max+" KB/s.",t=parseInt(e.avg),512>t?{status:2,data:e,message:""+n+"<br/>Низкая исходящая скорость. Не рекомендуется включать трансляцию камеры."}:1024>t?{status:2,data:e,message:""+n+"<br/>Средняя исходящая скорость. Трансляция камеры возможна только в низком или среднем качестве."}:{status:1,data:e,message:n}},error:{message:"Ошибка при проверке исходящей скорости. Попробуйте еще раз",status:0}}},t.prototype.initialize=function(){var e=this;return this.one("as3_event",function(t){return"info"===t.data.level&&"initialized"===t.data.type?(e._initialized=!0,e.trigger("swf_initialized")):void 0}),t.__super__.initialize.apply(this,arguments)},t.prototype.check=function(e){var t=this;return new Promise(function(n,i){return t.one("as3_event",function(e){return"error"===e.data.level?i(t.prepare_error(e.data)):n(t.prepare_success(e.data))}),t.as3_call("check_"+e)})},t.prototype.prepare_error=function(e){return this.messages[e.type].error},t.prototype.prepare_success=function(e){return"function"==typeof this.messages[e.type].success?this.messages[e.type].success(e):this.messages[e.type].success},t}(i.SwfPlayer),i.CheckerController=function(e){function n(){return d=n.__super__.constructor.apply(this,arguments)}return __extends(n,e),n.prototype.initialize=function(){var e=this;return i.event.on("piecified",function(){return e._setup()})},n.prototype._setup=function(){var e;return this.rtmp=t("@rtmp").pi(),this.progress=t("@progress").pi(),this.checkers=function(){var n,i,r,s;for(r=this.nod.find(".item"),s=[],n=0,i=r.length;i>n;n++)e=r[n],s.push(t(e).pi());return s}.call(this),this.total=this.checkers.length,this.passed="",this.report={}},n.prototype.resolver=function(){var e=this;return this._resolver?this._resolver:this._resolver=function(t){return 1===t.status?e.checkers[e.current].passed():e.checkers[e.current].warning(),e.checkers[e.current].text(t.message),e.passed+=""+e.checkers[e.current].type+";",e.report[e.checkers[e.current].type]=t,r.debug(t),e.next()}},n.prototype.error_handler=function(){var e=this;return this._error_handler?this._error_handler:this._error_handler=function(t){return e.checkers[e.current].failed(),e.checkers[e.current].text(t.message),e.report[e.checkers[e.current].type]=t,r.debug(t),e.next()}},n.prototype.start=function(){var e,t,n,i;if(this.current>=0){for(i=this.checkers,t=0,n=i.length;n>t;t++)e=i[t],e.clear();this.passed="",this.progress.reset(),this.report={}}return this.current=-1,this.trigger("start"),this.next()},n.prototype.finish=function(){return this.progress.set(100),this.trigger("finish")},n.prototype.next=function(){return this.current++,this.total>this.current?(this.progress.set(0|100*((this.current+.5*Math.random())/this.total)),this.passed.match(this.checkers[this.current].deps)?(this.checkers[this.current].loading(!0),this["check_"+this.checkers[this.current].type](this.checkers[this.current].options).then(this.resolver())["catch"](this.error_handler())):(this.checkers[this.current].failed(),this.checkers[this.current].text("Пропущена"),this.next())):this.finish()},n.prototype.check_fp_version=function(){var e=this;return new Promise(function(t,n){var i,r,s,a,o;o=swfobject.getFlashPlayerVersion(),r=o.major,s=o.minor,a=o.release,i=""+r+"."+s+"."+a,swfobject.hasFlashPlayerVersion(e.options.fp_version)?t({status:1,message:"Установленная версия: "+i,version:i}):n({status:0,message:"Установленная версия: "+i+". Необходимо установить версию "+e.options.fp_version+" <a href='http://get.adobe.com/ru/flashplayer/' target='_blank'>установить</a>",version:i})})},n.prototype.check_java_version=function(){var e=this;return new Promise(function(t){var n,i;return n=deployJava.getJREs(),i="Установлена версия: "+n.join("; "),deployJava.versionCheck(""+e.options.java_version+"+")?t({status:1,message:i,version:n}):(n.length?i+="<br/>":i="",i+="Для демонстрации рабочего стола необходимо установить Java RE версии "+e.options.java_version+"+ <a href='http://java.com/en/download/testjava.jsp' target='_blank'>установить</a>",t({status:2,message:i,version:n}))})},n.prototype.check_rtmp_connection=function(){var e=this;return this.rtmp._initialized?this.rtmp.check("connection"):new Promise(function(t,n){var i;return i=after(2e4,function(){return n({status:0,message:"Приложение для проверки подключения не найдено"})}),e.rtmp.on("swf_initialized",function(){return clearTimeout(i),t()})}).then(function(){return e.rtmp.check("connection")})},n.prototype.check_rtmp_ping=function(){return this.rtmp.check("latency")},n.prototype.check_rtmp_input=function(){return this.rtmp.check("inbw")},n.prototype.check_rtmp_output=function(){return this.rtmp.check("outbw")},n}(i.Base)})(this);var __hasProp={}.hasOwnProperty,__extends=function(e,t){function n(){this.constructor=e}for(var i in t)__hasProp.call(t,i)&&(e[i]=t[i]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};(function(e){"use strict";var t,n,i,r,s;return t=e.jQuery,n=e.pi=e.pi||{},i=n.utils,s=0,n.HlsPlayer=function(e){function t(){return r=t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.initialize=function(){var e;return e=document.createElement("div"),this.player_id="hls_player_"+ ++s,e.id=this.player_id,this.nod.append(e),this.setup_opts={hls_debug:!0,hls_debug2:!1,hls_minbufferlength:4,hls_maxbufferlength:60,hls_startfromlowestlevel:!1,hls_live_flushurlcache:!0,primary:"html5",flashplayer:"/flash/jwplayer.flash.swf",html5player:"/js/jwplayer.html5.js",wmode:"transparent",controlbar:"over",debug:"none",width:"100%",height:"100%",autostart:!0},null!=this.options.image&&(setup_opts.image=this.options.image),null!=this.options.url?this.load(this.options.url):void 0},t.prototype.load=function(e){return this.setup_opts.playlist=[{file:e,provider:"/flash/HLSProvider6.swf",type:"hls"}],jwplayer(this.player_id).setup(this.setup_opts)},t.prototype.play=function(){return jwplayer(this.player_id).play()},t.prototype.pause=function(){return jwplayer(this.player_id).pause()},t.prototype.stop=function(){return jwplayer(this.player_id).stop()},t}(n.Base)})(this);var __hasProp={}.hasOwnProperty,__extends=function(e,t){function n(){this.constructor=e}for(var i in t)__hasProp.call(t,i)&&(e[i]=t[i]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};(function(e){"use strict";var t,n,i,r;return t=e.jQuery,n=e.pi=e.pi||{},i=n.utils,n.Progressbar=function(e){function t(){return r=t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.set=function(e){return this.value=e,this.nod.css({width:""+e+"%"})},t.prototype.reset=function(){return this.nod.css({width:0})},t}(n.Base)})(this),$(function(){return pi.log_level="debug",pi.piecify()});