// Garden Gnome Software - Skin
// Object2VR 3.1.7/10775
// Filename: GraceBay_SKIN.ggsk
// Generated Mon Sep 28 13:58:32 2026

function object2vrSkin(player,base) {
	var me=this;
	var flag=false;
	var nodeMarker=new Array();
	var activeNodeMarker=new Array();
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=new Array();
	this.elementMouseOver=new Array();
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	for(i=0;i<prefixes.length;i++) {
		if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
			cssPrefix='-' + prefixes[i].toLowerCase() + '-';
			domTransition=prefixes[i] + 'Transition';
			domTransform=prefixes[i] + 'Transform';
		}
	}
	
	this.player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=new Array();
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=new Array();
		var stack=new Array();
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		this._controller0=document.createElement('div');
		this._controller0.ggId="controller";
		this._controller0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._controller0.ggVisible=false;
		this._controller0.className='ggskin ggskin_container';
		this._controller0.ggType='container';
		this._controller0.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(252 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-62 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 252px;';
		hs+='top:  -62px;';
		hs+='width: 263px;';
		hs+='height: 50px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._controller0.setAttribute('style',hs);
		this._left0=document.createElement('div');
		this._left0.ggId="left";
		this._left0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._left0.ggVisible=true;
		this._left0.className='ggskin ggskin_svg';
		this._left0.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 19px;';
		hs+='top:  9px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._left0.setAttribute('style',hs);
		this._left0__img=document.createElement('img');
		this._left0__img.className='ggskin ggskin_svg';
		this._left0__img.setAttribute('src',basePath + 'images/left0.png');
		this._left0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._left0__img['ondragstart']=function() { return false; };
		this._left0.appendChild(this._left0__img);
		this._left0.onclick=function () {
			me.player.changePanLog(1,true);
		}
		this._left0.onmouseover=function () {
			me._left0__img.src=basePath + 'images/left0__o.png';
		}
		this._left0.onmouseout=function () {
			me._left0__img.src=basePath + 'images/left0.png';
		}
		this._controller0.appendChild(this._left0);
		this._right0=document.createElement('div');
		this._right0.ggId="right";
		this._right0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._right0.ggVisible=true;
		this._right0.className='ggskin ggskin_svg';
		this._right0.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 50px;';
		hs+='top:  9px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._right0.setAttribute('style',hs);
		this._right0__img=document.createElement('img');
		this._right0__img.className='ggskin ggskin_svg';
		this._right0__img.setAttribute('src',basePath + 'images/right0.png');
		this._right0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._right0__img['ondragstart']=function() { return false; };
		this._right0.appendChild(this._right0__img);
		this._right0.onclick=function () {
			me.player.changePanLog(-1,true);
		}
		this._right0.onmouseover=function () {
			me._right0__img.src=basePath + 'images/right0__o.png';
		}
		this._right0.onmouseout=function () {
			me._right0__img.src=basePath + 'images/right0.png';
		}
		this._controller0.appendChild(this._right0);
		this._zoomin0=document.createElement('div');
		this._zoomin0.ggId="zoomin";
		this._zoomin0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomin0.ggVisible=true;
		this._zoomin0.className='ggskin ggskin_svg';
		this._zoomin0.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 83px;';
		hs+='top:  9px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._zoomin0.setAttribute('style',hs);
		this._zoomin0__img=document.createElement('img');
		this._zoomin0__img.className='ggskin ggskin_svg';
		this._zoomin0__img.setAttribute('src',basePath + 'images/zoomin0.png');
		this._zoomin0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._zoomin0__img['ondragstart']=function() { return false; };
		this._zoomin0.appendChild(this._zoomin0__img);
		this._zoomin0.onmouseover=function () {
			me._tt_zoomin0.style[domTransition]='none';
			me._tt_zoomin0.style.visibility='inherit';
			me._tt_zoomin0.ggVisible=true;
			me._zoomin0__img.src=basePath + 'images/zoomin0__o.png';
		}
		this._zoomin0.onmouseout=function () {
			me._tt_zoomin0.style[domTransition]='none';
			me._tt_zoomin0.style.visibility='hidden';
			me._tt_zoomin0.ggVisible=false;
			me._zoomin0__img.src=basePath + 'images/zoomin0.png';
			me.elementMouseDown['zoomin0']=false;
		}
		this._zoomin0.onmousedown=function () {
			me.elementMouseDown['zoomin0']=true;
		}
		this._zoomin0.onmouseup=function () {
			me.elementMouseDown['zoomin0']=false;
		}
		this._zoomin0.ontouchend=function () {
			me.elementMouseDown['zoomin0']=false;
		}
		this._tt_zoomin0=document.createElement('div');
		this._tt_zoomin0__text=document.createElement('div');
		this._tt_zoomin0.className='ggskin ggskin_textdiv';
		this._tt_zoomin0.ggTextDiv=this._tt_zoomin0__text;
		this._tt_zoomin0.ggId="tt_zoomin";
		this._tt_zoomin0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomin0.ggVisible=false;
		this._tt_zoomin0.className='ggskin ggskin_text';
		this._tt_zoomin0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_zoomin0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomin0__text.setAttribute('style',hs);
		this._tt_zoomin0.ggTextDiv.innerHTML="Zoom In";
		this._tt_zoomin0.appendChild(this._tt_zoomin0__text);
		this._tt_zoomins0=document.createElement('div');
		this._tt_zoomins0__text=document.createElement('div');
		this._tt_zoomins0.className='ggskin ggskin_textdiv';
		this._tt_zoomins0.ggTextDiv=this._tt_zoomins0__text;
		this._tt_zoomins0.ggId="tt_zoomins";
		this._tt_zoomins0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomins0.ggVisible=true;
		this._tt_zoomins0.className='ggskin ggskin_text';
		this._tt_zoomins0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_zoomins0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomins0__text.setAttribute('style',hs);
		this._tt_zoomins0.ggTextDiv.innerHTML="Zoom In";
		this._tt_zoomins0.appendChild(this._tt_zoomins0__text);
		this._tt_zoomin0.appendChild(this._tt_zoomins0);
		this._zoomin0.appendChild(this._tt_zoomin0);
		this._controller0.appendChild(this._zoomin0);
		this._zoomout0=document.createElement('div');
		this._zoomout0.ggId="zoomout";
		this._zoomout0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomout0.ggVisible=true;
		this._zoomout0.className='ggskin ggskin_svg';
		this._zoomout0.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 116px;';
		hs+='top:  9px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._zoomout0.setAttribute('style',hs);
		this._zoomout0__img=document.createElement('img');
		this._zoomout0__img.className='ggskin ggskin_svg';
		this._zoomout0__img.setAttribute('src',basePath + 'images/zoomout0.png');
		this._zoomout0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._zoomout0__img['ondragstart']=function() { return false; };
		this._zoomout0.appendChild(this._zoomout0__img);
		this._zoomout0.onmouseover=function () {
			me._tt_zoomout0.style[domTransition]='none';
			me._tt_zoomout0.style.visibility='inherit';
			me._tt_zoomout0.ggVisible=true;
			me._zoomout0__img.src=basePath + 'images/zoomout0__o.png';
		}
		this._zoomout0.onmouseout=function () {
			me._tt_zoomout0.style[domTransition]='none';
			me._tt_zoomout0.style.visibility='hidden';
			me._tt_zoomout0.ggVisible=false;
			me._zoomout0__img.src=basePath + 'images/zoomout0.png';
			me.elementMouseDown['zoomout0']=false;
		}
		this._zoomout0.onmousedown=function () {
			me.elementMouseDown['zoomout0']=true;
		}
		this._zoomout0.onmouseup=function () {
			me.elementMouseDown['zoomout0']=false;
		}
		this._zoomout0.ontouchend=function () {
			me.elementMouseDown['zoomout0']=false;
		}
		this._tt_zoomout0=document.createElement('div');
		this._tt_zoomout0__text=document.createElement('div');
		this._tt_zoomout0.className='ggskin ggskin_textdiv';
		this._tt_zoomout0.ggTextDiv=this._tt_zoomout0__text;
		this._tt_zoomout0.ggId="tt_zoomout";
		this._tt_zoomout0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomout0.ggVisible=false;
		this._tt_zoomout0.className='ggskin ggskin_text';
		this._tt_zoomout0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_zoomout0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomout0__text.setAttribute('style',hs);
		this._tt_zoomout0.ggTextDiv.innerHTML="Zoom Out";
		this._tt_zoomout0.appendChild(this._tt_zoomout0__text);
		this._tt_zoomouts0=document.createElement('div');
		this._tt_zoomouts0__text=document.createElement('div');
		this._tt_zoomouts0.className='ggskin ggskin_textdiv';
		this._tt_zoomouts0.ggTextDiv=this._tt_zoomouts0__text;
		this._tt_zoomouts0.ggId="tt_zoomouts";
		this._tt_zoomouts0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomouts0.ggVisible=true;
		this._tt_zoomouts0.className='ggskin ggskin_text';
		this._tt_zoomouts0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -2px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_zoomouts0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomouts0__text.setAttribute('style',hs);
		this._tt_zoomouts0.ggTextDiv.innerHTML="Zoom Out";
		this._tt_zoomouts0.appendChild(this._tt_zoomouts0__text);
		this._tt_zoomout0.appendChild(this._tt_zoomouts0);
		this._zoomout0.appendChild(this._tt_zoomout0);
		this._controller0.appendChild(this._zoomout0);
		this._autorotate0=document.createElement('div');
		this._autorotate0.ggId="autorotate";
		this._autorotate0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._autorotate0.ggVisible=true;
		this._autorotate0.className='ggskin ggskin_svg';
		this._autorotate0.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 148px;';
		hs+='top:  9px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._autorotate0.setAttribute('style',hs);
		this._autorotate0__img=document.createElement('img');
		this._autorotate0__img.className='ggskin ggskin_svg';
		this._autorotate0__img.setAttribute('src',basePath + 'images/autorotate0.png');
		this._autorotate0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._autorotate0__img['ondragstart']=function() { return false; };
		this._autorotate0.appendChild(this._autorotate0__img);
		this._autorotate0.onclick=function () {
			me.player.toggleAutorotate();
		}
		this._autorotate0.onmouseover=function () {
			me._tt_autorotate0.style[domTransition]='none';
			me._tt_autorotate0.style.visibility='inherit';
			me._tt_autorotate0.ggVisible=true;
			me._autorotate0__img.src=basePath + 'images/autorotate0__o.png';
		}
		this._autorotate0.onmouseout=function () {
			me._tt_autorotate0.style[domTransition]='none';
			me._tt_autorotate0.style.visibility='hidden';
			me._tt_autorotate0.ggVisible=false;
			me._autorotate0__img.src=basePath + 'images/autorotate0.png';
		}
		this._tt_autorotate0=document.createElement('div');
		this._tt_autorotate0__text=document.createElement('div');
		this._tt_autorotate0.className='ggskin ggskin_textdiv';
		this._tt_autorotate0.ggTextDiv=this._tt_autorotate0__text;
		this._tt_autorotate0.ggId="tt_autorotate";
		this._tt_autorotate0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotate0.ggVisible=false;
		this._tt_autorotate0.className='ggskin ggskin_text';
		this._tt_autorotate0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -66px;';
		hs+='top:  35px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_autorotate0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotate0__text.setAttribute('style',hs);
		this._tt_autorotate0.ggTextDiv.innerHTML="Start\/Stop Autorotation";
		this._tt_autorotate0.appendChild(this._tt_autorotate0__text);
		this._tt_autorotates0=document.createElement('div');
		this._tt_autorotates0__text=document.createElement('div');
		this._tt_autorotates0.className='ggskin ggskin_textdiv';
		this._tt_autorotates0.ggTextDiv=this._tt_autorotates0__text;
		this._tt_autorotates0.ggId="tt_autorotates";
		this._tt_autorotates0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotates0.ggVisible=true;
		this._tt_autorotates0.className='ggskin ggskin_text';
		this._tt_autorotates0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_autorotates0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotates0__text.setAttribute('style',hs);
		this._tt_autorotates0.ggTextDiv.innerHTML="Start\/Stop Autorotation";
		this._tt_autorotates0.appendChild(this._tt_autorotates0__text);
		this._tt_autorotate0.appendChild(this._tt_autorotates0);
		this._autorotate0.appendChild(this._tt_autorotate0);
		this._controller0.appendChild(this._autorotate0);
		this._fullscreen0=document.createElement('div');
		this._fullscreen0.ggId="fullscreen";
		this._fullscreen0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._fullscreen0.ggVisible=false;
		this._fullscreen0.className='ggskin ggskin_svg';
		this._fullscreen0.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 180px;';
		hs+='top:  9px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		hs+='cursor: pointer;';
		this._fullscreen0.setAttribute('style',hs);
		this._fullscreen0__img=document.createElement('img');
		this._fullscreen0__img.className='ggskin ggskin_svg';
		this._fullscreen0__img.setAttribute('src',basePath + 'images/fullscreen0.png');
		this._fullscreen0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._fullscreen0__img['ondragstart']=function() { return false; };
		this._fullscreen0.appendChild(this._fullscreen0__img);
		this._fullscreen0.onclick=function () {
			me.player.toggleFullscreen();
		}
		this._fullscreen0.onmouseover=function () {
			me._tt_fullscreen0.style[domTransition]='none';
			me._tt_fullscreen0.style.visibility='inherit';
			me._tt_fullscreen0.ggVisible=true;
			me._fullscreen0__img.src=basePath + 'images/fullscreen0__o.png';
		}
		this._fullscreen0.onmouseout=function () {
			me._tt_fullscreen0.style[domTransition]='none';
			me._tt_fullscreen0.style.visibility='hidden';
			me._tt_fullscreen0.ggVisible=false;
			me._fullscreen0__img.src=basePath + 'images/fullscreen0.png';
		}
		this._tt_fullscreen0=document.createElement('div');
		this._tt_fullscreen0__text=document.createElement('div');
		this._tt_fullscreen0.className='ggskin ggskin_textdiv';
		this._tt_fullscreen0.ggTextDiv=this._tt_fullscreen0__text;
		this._tt_fullscreen0.ggId="tt_fullscreen";
		this._tt_fullscreen0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_fullscreen0.ggVisible=false;
		this._tt_fullscreen0.className='ggskin ggskin_text';
		this._tt_fullscreen0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_fullscreen0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_fullscreen0__text.setAttribute('style',hs);
		this._tt_fullscreen0.ggTextDiv.innerHTML="Fullscreen";
		this._tt_fullscreen0.appendChild(this._tt_fullscreen0__text);
		this._tt_fullscreens0=document.createElement('div');
		this._tt_fullscreens0__text=document.createElement('div');
		this._tt_fullscreens0.className='ggskin ggskin_textdiv';
		this._tt_fullscreens0.ggTextDiv=this._tt_fullscreens0__text;
		this._tt_fullscreens0.ggId="tt_fullscreens";
		this._tt_fullscreens0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_fullscreens0.ggVisible=true;
		this._tt_fullscreens0.className='ggskin ggskin_text';
		this._tt_fullscreens0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_fullscreens0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_fullscreens0__text.setAttribute('style',hs);
		this._tt_fullscreens0.ggTextDiv.innerHTML="Fullscreen";
		this._tt_fullscreens0.appendChild(this._tt_fullscreens0__text);
		this._tt_fullscreen0.appendChild(this._tt_fullscreens0);
		this._fullscreen0.appendChild(this._tt_fullscreen0);
		this._controller0.appendChild(this._fullscreen0);
		this.divSkin.appendChild(this._controller0);
		this._loading=document.createElement('div');
		this._loading.ggId="loading";
		this._loading.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading.ggVisible=true;
		this._loading.className='ggskin ggskin_container';
		this._loading.ggType='container';
		this._loading.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-115 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-306 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -115px;';
		hs+='top:  -306px;';
		hs+='width: 210px;';
		hs+='height: 60px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._loading.setAttribute('style',hs);
		this._loading.onclick=function () {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		}
		this._loadingbg=document.createElement('div');
		this._loadingbg.ggId="loadingbg";
		this._loadingbg.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingbg.ggVisible=true;
		this._loadingbg.className='ggskin ggskin_rectangle';
		this._loadingbg.ggType='rectangle';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 210px;';
		hs+='height: 60px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0.5;';
		hs+='visibility: inherit;';
		hs+='background: #000000;';
		hs+='border: 0px solid #000000;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		this._loadingbg.setAttribute('style',hs);
		this._loading.appendChild(this._loadingbg);
		this._loadingbrd=document.createElement('div');
		this._loadingbrd.ggId="loadingbrd";
		this._loadingbrd.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingbrd.ggVisible=true;
		this._loadingbrd.className='ggskin ggskin_rectangle';
		this._loadingbrd.ggType='rectangle';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 208px;';
		hs+='height: 58px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0.5;';
		hs+='visibility: inherit;';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		this._loadingbrd.setAttribute('style',hs);
		this._loading.appendChild(this._loadingbrd);
		this._loadingtext=document.createElement('div');
		this._loadingtext__text=document.createElement('div');
		this._loadingtext.className='ggskin ggskin_textdiv';
		this._loadingtext.ggTextDiv=this._loadingtext__text;
		this._loadingtext.ggId="loadingtext";
		this._loadingtext.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingtext.ggVisible=true;
		this._loadingtext.className='ggskin ggskin_text';
		this._loadingtext.ggType='text';
		this._loadingtext.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			this.ggTextDiv.style.left=Math.floor(0 + (176-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		hs ='position:absolute;';
		hs+='left: 16px;';
		hs+='top:  12px;';
		hs+='width: 176px;';
		hs+='height: 23px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._loadingtext.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._loadingtext__text.setAttribute('style',hs);
		this._loadingtext.ggUpdateText=function() {
			var hs="Loading... "+(me.player.getPercentLoaded()*100.0).toFixed(0)+"%";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
			}
		this.ggUpdatePosition();
		}
		this._loadingtext.ggUpdateText();
		this._loadingtext.appendChild(this._loadingtext__text);
		this._loading.appendChild(this._loadingtext);
		this._loadingbar=document.createElement('div');
		this._loadingbar.ggId="loadingbar";
		this._loadingbar.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingbar.ggVisible=true;
		this._loadingbar.className='ggskin ggskin_rectangle';
		this._loadingbar.ggType='rectangle';
		hs ='position:absolute;';
		hs+='left: 15px;';
		hs+='top:  35px;';
		hs+='width: 181px;';
		hs+='height: 12px;';
		hs+=cssPrefix + 'transform-origin: 0% 50%;';
		hs+='visibility: inherit;';
		hs+='background: #ffffff;';
		hs+='border: 1px solid #808080;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		this._loadingbar.setAttribute('style',hs);
		this._loading.appendChild(this._loadingbar);
		this.divSkin.appendChild(this._loading);
		this._zoom=document.createElement('div');
		this._zoom.ggId="ZOOM";
		this._zoom.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoom.ggVisible=true;
		this._zoom.className='ggskin ggskin_container';
		this._zoom.ggType='container';
		this._zoom.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-93 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-32 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -93px;';
		hs+='top:  -32px;';
		hs+='width: 33px;';
		hs+='height: 100px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._zoom.setAttribute('style',hs);
		this._zoombutton=document.createElement('div');
		this._zoombutton.ggId="ZOOMBUTTON";
		this._zoombutton.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoombutton.ggVisible=true;
		this._zoombutton.className='ggskin ggskin_image';
		this._zoombutton.ggType='image';
		this._zoombutton.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-33 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-50 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -33px;';
		hs+='top:  -50px;';
		hs+='width: 33px;';
		hs+='height: 100px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._zoombutton.setAttribute('style',hs);
		this._zoombutton__img=document.createElement('img');
		this._zoombutton__img.className='ggskin ggskin_image';
		this._zoombutton__img.setAttribute('src',basePath + 'images/zoombutton.png');
		this._zoombutton__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._zoombutton__img.className='ggskin ggskin_image';
		this._zoombutton__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._zoombutton__img);
		this._zoombutton.appendChild(this._zoombutton__img);
		this._zoom.appendChild(this._zoombutton);
		this._zoom_plus=document.createElement('div');
		this._zoom_plus.ggId="ZOOM_PLUS";
		this._zoom_plus.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoom_plus.ggVisible=true;
		this._zoom_plus.className='ggskin ggskin_image';
		this._zoom_plus.ggType='image';
		this._zoom_plus.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-27 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(18 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -27px;';
		hs+='top:  18px;';
		hs+='width: 21px;';
		hs+='height: 20px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._zoom_plus.setAttribute('style',hs);
		this._zoom_plus__img=document.createElement('img');
		this._zoom_plus__img.className='ggskin ggskin_image';
		this._zoom_plus__img.setAttribute('src',basePath + 'images/zoom_plus.png');
		this._zoom_plus__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._zoom_plus__img.className='ggskin ggskin_image';
		this._zoom_plus__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._zoom_plus__img);
		this._zoom_plus.appendChild(this._zoom_plus__img);
		this._zoom_plus.onclick=function () {
			me.player.changeFovLog(1,true);
		}
		this._zoom.appendChild(this._zoom_plus);
		this._zoom_minus=document.createElement('div');
		this._zoom_minus.ggId="ZOOM_MINUS";
		this._zoom_minus.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoom_minus.ggVisible=true;
		this._zoom_minus.className='ggskin ggskin_image';
		this._zoom_minus.ggType='image';
		this._zoom_minus.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-27 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-39 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -27px;';
		hs+='top:  -39px;';
		hs+='width: 21px;';
		hs+='height: 21px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._zoom_minus.setAttribute('style',hs);
		this._zoom_minus__img=document.createElement('img');
		this._zoom_minus__img.className='ggskin ggskin_image';
		this._zoom_minus__img.setAttribute('src',basePath + 'images/zoom_minus.png');
		this._zoom_minus__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._zoom_minus__img.className='ggskin ggskin_image';
		this._zoom_minus__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._zoom_minus__img);
		this._zoom_minus.appendChild(this._zoom_minus__img);
		this._zoom_minus.onclick=function () {
			me.player.changeFovLog(-1,true);
		}
		this._zoom.appendChild(this._zoom_minus);
		this.divSkin.appendChild(this._zoom);
		this._controller=document.createElement('div');
		this._controller.ggId="controller";
		this._controller.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._controller.ggVisible=true;
		this._controller.className='ggskin ggskin_container';
		this._controller.ggType='container';
		this._controller.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-388 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-62 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -388px;';
		hs+='top:  -62px;';
		hs+='width: 263px;';
		hs+='height: 50px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._controller.setAttribute('style',hs);
		this._left=document.createElement('div');
		this._left.ggId="left";
		this._left.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._left.ggVisible=true;
		this._left.className='ggskin ggskin_svg';
		this._left.ggType='svg';
		this._left.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-244 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-41 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -244px;';
		hs+='top:  -41px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._left.setAttribute('style',hs);
		this._left__img=document.createElement('img');
		this._left__img.className='ggskin ggskin_svg';
		this._left__img.setAttribute('src',basePath + 'images/left.png');
		this._left__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._left__img['ondragstart']=function() { return false; };
		this._left.appendChild(this._left__img);
		this._left.onclick=function () {
			me.player.changePanLog(1,true);
		}
		this._left.onmouseover=function () {
			me._left__img.src=basePath + 'images/left__o.png';
		}
		this._left.onmouseout=function () {
			me._left__img.src=basePath + 'images/left.png';
		}
		this._controller.appendChild(this._left);
		this._right=document.createElement('div');
		this._right.ggId="right";
		this._right.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._right.ggVisible=true;
		this._right.className='ggskin ggskin_svg';
		this._right.ggType='svg';
		this._right.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-213 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-41 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -213px;';
		hs+='top:  -41px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._right.setAttribute('style',hs);
		this._right__img=document.createElement('img');
		this._right__img.className='ggskin ggskin_svg';
		this._right__img.setAttribute('src',basePath + 'images/right.png');
		this._right__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._right__img['ondragstart']=function() { return false; };
		this._right.appendChild(this._right__img);
		this._right.onclick=function () {
			me.player.changePanLog(-1,true);
		}
		this._right.onmouseover=function () {
			me._right__img.src=basePath + 'images/right__o.png';
		}
		this._right.onmouseout=function () {
			me._right__img.src=basePath + 'images/right.png';
		}
		this._controller.appendChild(this._right);
		this._zoomin=document.createElement('div');
		this._zoomin.ggId="zoomin";
		this._zoomin.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomin.ggVisible=true;
		this._zoomin.className='ggskin ggskin_svg';
		this._zoomin.ggType='svg';
		this._zoomin.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-180 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-41 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -180px;';
		hs+='top:  -41px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._zoomin.setAttribute('style',hs);
		this._zoomin__img=document.createElement('img');
		this._zoomin__img.className='ggskin ggskin_svg';
		this._zoomin__img.setAttribute('src',basePath + 'images/zoomin.png');
		this._zoomin__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._zoomin__img['ondragstart']=function() { return false; };
		this._zoomin.appendChild(this._zoomin__img);
		this._zoomin.onmouseover=function () {
			me._tt_zoomin.style[domTransition]='none';
			me._tt_zoomin.style.visibility='inherit';
			me._tt_zoomin.ggVisible=true;
			me._zoomin__img.src=basePath + 'images/zoomin__o.png';
		}
		this._zoomin.onmouseout=function () {
			me._tt_zoomin.style[domTransition]='none';
			me._tt_zoomin.style.visibility='hidden';
			me._tt_zoomin.ggVisible=false;
			me._zoomin__img.src=basePath + 'images/zoomin.png';
			me.elementMouseDown['zoomin']=false;
		}
		this._zoomin.onmousedown=function () {
			me.elementMouseDown['zoomin']=true;
		}
		this._zoomin.onmouseup=function () {
			me.elementMouseDown['zoomin']=false;
		}
		this._zoomin.ontouchend=function () {
			me.elementMouseDown['zoomin']=false;
		}
		this._tt_zoomin=document.createElement('div');
		this._tt_zoomin__text=document.createElement('div');
		this._tt_zoomin.className='ggskin ggskin_textdiv';
		this._tt_zoomin.ggTextDiv=this._tt_zoomin__text;
		this._tt_zoomin.ggId="tt_zoomin";
		this._tt_zoomin.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomin.ggVisible=false;
		this._tt_zoomin.className='ggskin ggskin_text';
		this._tt_zoomin.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_zoomin.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomin__text.setAttribute('style',hs);
		this._tt_zoomin.ggTextDiv.innerHTML="Zoom In";
		this._tt_zoomin.appendChild(this._tt_zoomin__text);
		this._tt_zoomins=document.createElement('div');
		this._tt_zoomins__text=document.createElement('div');
		this._tt_zoomins.className='ggskin ggskin_textdiv';
		this._tt_zoomins.ggTextDiv=this._tt_zoomins__text;
		this._tt_zoomins.ggId="tt_zoomins";
		this._tt_zoomins.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomins.ggVisible=true;
		this._tt_zoomins.className='ggskin ggskin_text';
		this._tt_zoomins.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_zoomins.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomins__text.setAttribute('style',hs);
		this._tt_zoomins.ggTextDiv.innerHTML="Zoom In";
		this._tt_zoomins.appendChild(this._tt_zoomins__text);
		this._tt_zoomin.appendChild(this._tt_zoomins);
		this._zoomin.appendChild(this._tt_zoomin);
		this._controller.appendChild(this._zoomin);
		this._zoomout=document.createElement('div');
		this._zoomout.ggId="zoomout";
		this._zoomout.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomout.ggVisible=true;
		this._zoomout.className='ggskin ggskin_svg';
		this._zoomout.ggType='svg';
		this._zoomout.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-147 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-41 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -147px;';
		hs+='top:  -41px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._zoomout.setAttribute('style',hs);
		this._zoomout__img=document.createElement('img');
		this._zoomout__img.className='ggskin ggskin_svg';
		this._zoomout__img.setAttribute('src',basePath + 'images/zoomout.png');
		this._zoomout__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._zoomout__img['ondragstart']=function() { return false; };
		this._zoomout.appendChild(this._zoomout__img);
		this._zoomout.onmouseover=function () {
			me._tt_zoomout.style[domTransition]='none';
			me._tt_zoomout.style.visibility='inherit';
			me._tt_zoomout.ggVisible=true;
			me._zoomout__img.src=basePath + 'images/zoomout__o.png';
		}
		this._zoomout.onmouseout=function () {
			me._tt_zoomout.style[domTransition]='none';
			me._tt_zoomout.style.visibility='hidden';
			me._tt_zoomout.ggVisible=false;
			me._zoomout__img.src=basePath + 'images/zoomout.png';
			me.elementMouseDown['zoomout']=false;
		}
		this._zoomout.onmousedown=function () {
			me.elementMouseDown['zoomout']=true;
		}
		this._zoomout.onmouseup=function () {
			me.elementMouseDown['zoomout']=false;
		}
		this._zoomout.ontouchend=function () {
			me.elementMouseDown['zoomout']=false;
		}
		this._tt_zoomout=document.createElement('div');
		this._tt_zoomout__text=document.createElement('div');
		this._tt_zoomout.className='ggskin ggskin_textdiv';
		this._tt_zoomout.ggTextDiv=this._tt_zoomout__text;
		this._tt_zoomout.ggId="tt_zoomout";
		this._tt_zoomout.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomout.ggVisible=false;
		this._tt_zoomout.className='ggskin ggskin_text';
		this._tt_zoomout.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_zoomout.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomout__text.setAttribute('style',hs);
		this._tt_zoomout.ggTextDiv.innerHTML="Zoom Out";
		this._tt_zoomout.appendChild(this._tt_zoomout__text);
		this._tt_zoomouts=document.createElement('div');
		this._tt_zoomouts__text=document.createElement('div');
		this._tt_zoomouts.className='ggskin ggskin_textdiv';
		this._tt_zoomouts.ggTextDiv=this._tt_zoomouts__text;
		this._tt_zoomouts.ggId="tt_zoomouts";
		this._tt_zoomouts.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomouts.ggVisible=true;
		this._tt_zoomouts.className='ggskin ggskin_text';
		this._tt_zoomouts.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -2px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_zoomouts.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomouts__text.setAttribute('style',hs);
		this._tt_zoomouts.ggTextDiv.innerHTML="Zoom Out";
		this._tt_zoomouts.appendChild(this._tt_zoomouts__text);
		this._tt_zoomout.appendChild(this._tt_zoomouts);
		this._zoomout.appendChild(this._tt_zoomout);
		this._controller.appendChild(this._zoomout);
		this._autorotate=document.createElement('div');
		this._autorotate.ggId="autorotate";
		this._autorotate.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._autorotate.ggVisible=true;
		this._autorotate.className='ggskin ggskin_svg';
		this._autorotate.ggType='svg';
		this._autorotate.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-115 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-41 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -115px;';
		hs+='top:  -41px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._autorotate.setAttribute('style',hs);
		this._autorotate__img=document.createElement('img');
		this._autorotate__img.className='ggskin ggskin_svg';
		this._autorotate__img.setAttribute('src',basePath + 'images/autorotate.png');
		this._autorotate__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._autorotate__img['ondragstart']=function() { return false; };
		this._autorotate.appendChild(this._autorotate__img);
		this._autorotate.onclick=function () {
			me.player.toggleAutorotate();
		}
		this._autorotate.onmouseover=function () {
			me._tt_autorotate.style[domTransition]='none';
			me._tt_autorotate.style.visibility='inherit';
			me._tt_autorotate.ggVisible=true;
			me._autorotate__img.src=basePath + 'images/autorotate__o.png';
		}
		this._autorotate.onmouseout=function () {
			me._tt_autorotate.style[domTransition]='none';
			me._tt_autorotate.style.visibility='hidden';
			me._tt_autorotate.ggVisible=false;
			me._autorotate__img.src=basePath + 'images/autorotate.png';
		}
		this._tt_autorotate=document.createElement('div');
		this._tt_autorotate__text=document.createElement('div');
		this._tt_autorotate.className='ggskin ggskin_textdiv';
		this._tt_autorotate.ggTextDiv=this._tt_autorotate__text;
		this._tt_autorotate.ggId="tt_autorotate";
		this._tt_autorotate.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotate.ggVisible=false;
		this._tt_autorotate.className='ggskin ggskin_text';
		this._tt_autorotate.ggType='text';
		hs ='position:absolute;';
		hs+='left: -66px;';
		hs+='top:  35px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_autorotate.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotate__text.setAttribute('style',hs);
		this._tt_autorotate.ggTextDiv.innerHTML="Start\/Stop Autorotation";
		this._tt_autorotate.appendChild(this._tt_autorotate__text);
		this._tt_autorotates=document.createElement('div');
		this._tt_autorotates__text=document.createElement('div');
		this._tt_autorotates.className='ggskin ggskin_textdiv';
		this._tt_autorotates.ggTextDiv=this._tt_autorotates__text;
		this._tt_autorotates.ggId="tt_autorotates";
		this._tt_autorotates.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotates.ggVisible=true;
		this._tt_autorotates.className='ggskin ggskin_text';
		this._tt_autorotates.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_autorotates.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotates__text.setAttribute('style',hs);
		this._tt_autorotates.ggTextDiv.innerHTML="Start\/Stop Autorotation";
		this._tt_autorotates.appendChild(this._tt_autorotates__text);
		this._tt_autorotate.appendChild(this._tt_autorotates);
		this._autorotate.appendChild(this._tt_autorotate);
		this._controller.appendChild(this._autorotate);
		this._fullscreen=document.createElement('div');
		this._fullscreen.ggId="fullscreen";
		this._fullscreen.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._fullscreen.ggVisible=true;
		this._fullscreen.className='ggskin ggskin_svg';
		this._fullscreen.ggType='svg';
		this._fullscreen.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-83 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-41 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -83px;';
		hs+='top:  -41px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._fullscreen.setAttribute('style',hs);
		this._fullscreen__img=document.createElement('img');
		this._fullscreen__img.className='ggskin ggskin_svg';
		this._fullscreen__img.setAttribute('src',basePath + 'images/fullscreen.png');
		this._fullscreen__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._fullscreen__img['ondragstart']=function() { return false; };
		this._fullscreen.appendChild(this._fullscreen__img);
		this._fullscreen.onclick=function () {
			me.player.toggleFullscreen();
		}
		this._fullscreen.onmouseover=function () {
			me._tt_fullscreen.style[domTransition]='none';
			me._tt_fullscreen.style.visibility='inherit';
			me._tt_fullscreen.ggVisible=true;
			me._fullscreen__img.src=basePath + 'images/fullscreen__o.png';
		}
		this._fullscreen.onmouseout=function () {
			me._tt_fullscreen.style[domTransition]='none';
			me._tt_fullscreen.style.visibility='hidden';
			me._tt_fullscreen.ggVisible=false;
			me._fullscreen__img.src=basePath + 'images/fullscreen.png';
		}
		this._tt_fullscreen=document.createElement('div');
		this._tt_fullscreen__text=document.createElement('div');
		this._tt_fullscreen.className='ggskin ggskin_textdiv';
		this._tt_fullscreen.ggTextDiv=this._tt_fullscreen__text;
		this._tt_fullscreen.ggId="tt_fullscreen";
		this._tt_fullscreen.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_fullscreen.ggVisible=false;
		this._tt_fullscreen.className='ggskin ggskin_text';
		this._tt_fullscreen.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_fullscreen.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_fullscreen__text.setAttribute('style',hs);
		this._tt_fullscreen.ggTextDiv.innerHTML="Fullscreen";
		this._tt_fullscreen.appendChild(this._tt_fullscreen__text);
		this._tt_fullscreens=document.createElement('div');
		this._tt_fullscreens__text=document.createElement('div');
		this._tt_fullscreens.className='ggskin ggskin_textdiv';
		this._tt_fullscreens.ggTextDiv=this._tt_fullscreens__text;
		this._tt_fullscreens.ggId="tt_fullscreens";
		this._tt_fullscreens.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_fullscreens.ggVisible=true;
		this._tt_fullscreens.className='ggskin ggskin_text';
		this._tt_fullscreens.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_fullscreens.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_fullscreens__text.setAttribute('style',hs);
		this._tt_fullscreens.ggTextDiv.innerHTML="Fullscreen";
		this._tt_fullscreens.appendChild(this._tt_fullscreens__text);
		this._tt_fullscreen.appendChild(this._tt_fullscreens);
		this._fullscreen.appendChild(this._tt_fullscreen);
		this._controller.appendChild(this._fullscreen);
		this.divSkin.appendChild(this._controller);
		this._image_1=document.createElement('div');
		this._image_1.ggId="Image 1";
		this._image_1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._image_1.ggVisible=true;
		this._image_1.className='ggskin ggskin_image';
		this._image_1.ggType='image';
		this._image_1.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-120 + w) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -120px;';
		hs+='top:  77px;';
		hs+='width: 100px;';
		hs+='height: 100px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._image_1.setAttribute('style',hs);
		this._image_1__img=document.createElement('img');
		this._image_1__img.className='ggskin ggskin_image';
		this._image_1__img.setAttribute('src',basePath + 'images/image_1.png');
		this._image_1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._image_1__img.className='ggskin ggskin_image';
		this._image_1__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._image_1__img);
		this._image_1.appendChild(this._image_1__img);
		this.divSkin.appendChild(this._image_1);
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		}
		this.divSkin.ggReLoaded=function() {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='inherit';
			me._loading.ggVisible=true;
		}
		this.divSkin.ggLoadedLevels=function() {
		}
		this.divSkin.ggReLoadedLevels=function() {
		}
		this.divSkin.ggEnterFullscreen=function() {
		}
		this.divSkin.ggExitFullscreen=function() {
		}
		this.skinTimerEvent();
	};
	this.hotspotProxyClick=function(id) {
	}
	this.hotspotProxyOver=function(id) {
	}
	this.hotspotProxyOut=function(id) {
	}
	this.changeActiveNode=function(id) {
		var newMarker=new Array();
		var i,j;
		var tags=me.player.userdata.tags;
		for (i=0;i<nodeMarker.length;i++) {
			var match=false;
			if ((nodeMarker[i].ggMarkerNodeId==id) && (id!='')) match=true;
			for(j=0;j<tags.length;j++) {
				if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
			}
			if (match) {
				newMarker.push(nodeMarker[i]);
			}
		}
		for(i=0;i<activeNodeMarker.length;i++) {
			if (newMarker.indexOf(activeNodeMarker[i])<0) {
				if (activeNodeMarker[i].ggMarkerNormal) {
					activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
				}
				if (activeNodeMarker[i].ggMarkerActive) {
					activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
				}
				if (activeNodeMarker[i].ggDeactivate) {
					activeNodeMarker[i].ggDeactivate();
				}
			}
		}
		for(i=0;i<newMarker.length;i++) {
			if (activeNodeMarker.indexOf(newMarker[i])<0) {
				if (newMarker[i].ggMarkerNormal) {
					newMarker[i].ggMarkerNormal.style.visibility='hidden';
				}
				if (newMarker[i].ggMarkerActive) {
					newMarker[i].ggMarkerActive.style.visibility='inherit';
				}
				if (newMarker[i].ggActivate) {
					newMarker[i].ggActivate();
				}
			}
		}
		activeNodeMarker=newMarker;
	}
	this.skinTimerEvent=function() {
		setTimeout(function() { me.skinTimerEvent(); }, 10);
		if (me.elementMouseDown['zoomin0']) {
			me.player.changeFovLog(-1,true);
		}
		if (me.elementMouseDown['zoomout0']) {
			me.player.changeFovLog(1,true);
		}
		this._loadingtext.ggUpdateText();
		var hs='';
		if (me._loadingbar.ggParameter) {
			hs+=parameterToTransform(me._loadingbar.ggParameter) + ' ';
		}
		hs+='scale(' + (1 * me.player.getPercentLoaded() + 0) + ',1.0) ';
		me._loadingbar.style[domTransform]=hs;
		if (me.elementMouseDown['zoomin']) {
			me.player.changeFovLog(-1,true);
		}
		if (me.elementMouseDown['zoomout']) {
			me.player.changeFovLog(1,true);
		}
		var hs='';
		if (me._image_1.ggParameter) {
			hs+=parameterToTransform(me._image_1.ggParameter) + ' ';
		}
		hs+='rotate(' + (-1.0*(-10 * me.player.getPanN() + 0)) + 'deg) ';
		me._image_1.style[domTransform]=hs;
	};
	this.addSkin();
};