(function(){
    var script = {
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_44299303_4A6D_A577_41CE_03D412F5C50C_playlist,this.mainPlayList])",
 "overflow": "visible",
 "children": [
  "this.MainViewer",
  "this.ThumbnailList_44299303_4A6D_A577_41CE_03D412F5C50C"
 ],
 "horizontalAlign": "left",
 "id": "rootPlayer",
 "paddingLeft": 0,
 "mobileMipmappingEnabled": false,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minHeight": 20,
 "propagateClick": false,
 "scripts": {
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "existsKey": function(key){  return key in window; },
  "unregisterKey": function(key){  delete window[key]; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getKey": function(key){  return window[key]; }
 },
 "defaultVRPointer": "laser",
 "vrPolyfillScale": 0.5,
 "verticalAlign": "top",
 "minWidth": 20,
 "definitions": [{
 "hfovMin": "150%",
 "label": "Aerial",
 "id": "panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6",
 "thumbnailUrl": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_t.jpg",
 "hfov": 30,
 "partial": true,
 "pitch": 0,
 "hfovMax": 30,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0/f/0/{row}_{column}.jpg",
      "rowCount": 38,
      "height": 19456,
      "tags": "ondemand",
      "width": 19456,
      "colCount": 38,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0/f/1/{row}_{column}.jpg",
      "rowCount": 19,
      "height": 9728,
      "tags": "ondemand",
      "width": 9728,
      "colCount": 19,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0/f/2/{row}_{column}.jpg",
      "rowCount": 10,
      "height": 5120,
      "tags": "ondemand",
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0/f/3/{row}_{column}.jpg",
      "rowCount": 5,
      "height": 2560,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0/f/4/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0/f/5/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0/f/6/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_t.jpg"
  }
 ],
 "vfov": 16.85,
 "class": "Panorama",
 "overlays": [
  "this.overlay_36C68098_24D5_51AF_41C0_FB7CE00D37D6",
  "this.overlay_31F4624E_24D5_30A1_41AA_F112444EBB70",
  "this.overlay_3102CCB7_24D4_D1E1_41A5_AADC4C45FED3",
  "this.overlay_3772E88F_24D3_71A0_41B2_82E74C70B177",
  "this.overlay_37062A77_24D3_D160_41BB_CFC16449B1B1",
  "this.overlay_368995A6_24D3_33E3_41C1_ADA6DE500565",
  "this.overlay_355E69FF_272F_5360_41A2_BCBBEE25471A",
  "this.overlay_35CA6520_272C_D0E0_41A0_1D9683C7FFD0",
  "this.overlay_349BF35F_272D_70A0_41C1_68A69C725B7D",
  "this.overlay_3500E9BF_272C_D3E0_41C0_C1B24D8B6F06",
  "this.overlay_356732A7_2733_71E0_41B3_23DFF728575D",
  "this.overlay_35D6EB97_2733_D7A1_41B8_DA3EA325E21B",
  "this.overlay_3426339F_2733_57A0_41C0_BEDD71D84D27",
  "this.overlay_34DCA84E_2733_30A0_41B5_7A830B15717A",
  "this.overlay_351F3B86_2734_D7A3_4198_1F16E77DEE9B",
  "this.overlay_34CCE8BD_2734_D1E0_41BA_0B66086DA794",
  "this.overlay_356E974E_2737_D0A0_41BA_56C7ACC1A8B8",
  "this.overlay_35C6EC1E_2737_D0A3_41B9_1BA286AADBE6",
  "this.overlay_34C4F4B7_2737_31E1_41B4_C8EC9EC43BC3",
  "this.overlay_351B64C3_2735_51A0_4195_C1A7681347E2",
  "this.overlay_34682CAF_2733_31E1_41B9_F5C40088E4A7",
  "this.overlay_34D38135_2733_50E0_41C1_799D0790BAD9",
  "this.overlay_351FCA1E_2733_F0A3_4163_AB3785C6C1B6",
  "this.overlay_356902C4_2733_71A0_41C1_20942721B6BA",
  "this.overlay_34044AE6_273C_D160_41BD_EC32509509A1",
  "this.overlay_34DA573E_273D_50E0_41B9_FC23989E8CF7",
  "this.overlay_357C7A0E_273C_D0A3_41BE_6FCAFFEC60FD",
  "this.overlay_37F03F98_273F_2FA0_41A0_F8762692CE1E",
  "this.overlay_34C6C7F6_273F_DF63_41BD_36A7CA296090",
  "this.overlay_350BF626_273F_30E3_41A6_03498383F84B",
  "this.overlay_356B103E_273C_D0E0_41B2_B4830F900BBE",
  "this.overlay_35A05ABE_273C_D1E3_4146_76F56E6889CC",
  "this.overlay_34C6EB15_273D_D0A0_41B3_1DD7949034B0",
  "this.overlay_350FADF5_273D_D360_41B8_ED27D5BB4075",
  "this.overlay_35B028FD_273C_D160_41BD_1739E1262857",
  "this.overlay_3473385D_2733_50A1_41B7_5A411717D8E7",
  "this.overlay_34F7E87E_2733_F163_41BA_10F857D8EC0C",
  "this.overlay_342D0E05_2734_D0A0_41C2_731E437FB4D9",
  "this.overlay_34FFCE45_2735_30A1_41B9_8CBB01FCD318",
  "this.overlay_34E745F6_2737_7360_41BA_F3F57D7FE289",
  "this.overlay_35B2CF96_2737_2FA3_41B8_6264AB6967CE",
  "this.overlay_34665CD4_2734_D1A7_41AF_5B1CE4136016",
  "this.overlay_34E114F6_2735_7163_41B6_72A3E3A404FC",
  "this.overlay_35191457_2735_30A0_41C0_9EBC0B008680",
  "this.overlay_358AEE25_2735_30E1_41C0_B8A43B11A7CF",
  "this.overlay_3462D885_2735_51A0_4184_708F5C5288C4",
  "this.overlay_34D3CCB5_2734_D1E0_41A9_4DA7BA8DC384",
  "this.overlay_350B1E04_2733_50A0_4193_854DBB822D27",
  "this.overlay_35537D4C_2733_D0A0_41B3_81B11182BD1F",
  "this.overlay_35A56E4D_2733_30A1_41C2_84A8D4787EFD",
  "this.overlay_34D4400D_272C_D0A1_41B3_EFF7FC75EB3B",
  "this.overlay_34E627DB_272D_3FA0_416C_8FB24E1B2ADA",
  "this.overlay_35795124_272D_F0E0_41B5_7C22585952E3",
  "this.overlay_358869D5_272D_D3A1_419E_E97B5BA40608",
  "this.overlay_34A3F89C_272D_51A0_41B1_56FAD422400D",
  "this.overlay_359FEF5D_272F_D0A1_41C0_8262FB42C17C",
  "this.overlay_34FA5B24_272C_D0E0_41BD_B5B075D47342",
  "this.overlay_35D589FC_272F_D360_41C2_BE4028D6D4F9",
  "this.overlay_30CEDD3D_272D_D0E0_41B8_6BB9525E9A8B",
  "this.overlay_34F0740C_272D_50A0_41C2_BE7132346401",
  "this.overlay_3587996C_2753_5360_41BD_29F34CF68909",
  "this.overlay_32140661_2753_F160_41BC_80146029755D",
  "this.overlay_32AFC824_2753_70E0_41B8_FB359C2014D9",
  "this.overlay_331E694B_2753_30A0_41C1_F6BEE04BA3E0",
  "this.overlay_34DC2A65_2755_5161_41A3_3BDCAB5B5ADE",
  "this.overlay_34FA5164_2755_5367_41B0_55266449CF4F",
  "this.overlay_34CDC9D4_275D_53A7_4197_E20F748E6E92",
  "this.overlay_3544F85B_275F_30A1_41A1_2ABC2CD42746",
  "this.overlay_35B4C947_275F_70A0_4188_EAAA65BA88A4",
  "this.overlay_35D30690_275F_51BF_41B7_1C7A5D0741F0",
  "this.overlay_35F78A07_275F_30A1_41C0_447EEC5BE080",
  "this.overlay_322DCC4F_275F_F0A1_41B7_31AD5CCBB0DD",
  "this.overlay_32799BEA_275F_D760_41B1_92A9191DF197",
  "this.overlay_32973DDB_275F_33A1_41C0_3FEB889E83DB",
  "this.overlay_332226C2_275F_51A1_4198_F9DB7FCBE3D0",
  "this.overlay_339DE4D1_275C_D1A0_41BF_896948D47379",
  "this.overlay_345223A2_275C_F7E3_4199_8DBF0CFBE619",
  "this.overlay_34CB431A_275D_30A0_41C2_65AA8B9F9F31",
  "this.overlay_352BF3EA_275D_3763_41B6_C5B66094BCD8",
  "this.overlay_355C0912_275D_D0A0_41A2_9AD72745AB83",
  "this.overlay_35AF2F4B_275D_30A0_417B_4B665FE9D367",
  "this.overlay_320E12EF_275D_3160_4169_9D9DEEAB144E",
  "this.overlay_32307B47_275D_30A0_4180_F1978A896BC6",
  "this.overlay_32672359_275C_F0A0_41C2_CD383CCE600F",
  "this.overlay_32E3835A_2753_30A3_41BB_90E80DE454EF",
  "this.overlay_34F20089_2753_31A0_41A5_5C1434CC7C94",
  "this.overlay_35A6CC97_2754_D1A1_41BF_BBE07D2AA5D4",
  "this.overlay_35FD0877_2755_5160_41AD_51F65EB07FAC",
  "this.overlay_322BCE2A_2755_30E3_419A_F28F2BCB8D28",
  "this.overlay_32793514_2755_F0A7_41B5_08E637FA1862",
  "this.overlay_32B0AF11_2755_30A0_41A4_C9A7CC9617B9",
  "this.overlay_348FD682_2755_71A3_4192_813A2BD62740",
  "this.overlay_34AD4FCA_2755_6FA3_41B7_989175F4B111",
  "this.overlay_34A1A833_2755_50E1_41B5_260F819105A9",
  "this.overlay_34D6336C_2755_3767_41B0_EA3B9A582E81",
  "this.overlay_34C9AA92_2755_31A0_41B6_684DD5EB9EC6",
  "this.overlay_34FEE69A_2754_D1A3_418B_146DD7647AE6",
  "this.overlay_34EF7F1C_2754_D0A7_41B6_DF08477B2F64",
  "this.overlay_34E2C83A_2754_F0E0_417B_62D5E3308425",
  "this.overlay_354D54AB_2757_51E1_41A0_E86E028416C1",
  "this.overlay_3593D0B7_2757_31E1_41B9_A597DCBB6206",
  "this.overlay_35B4E0D6_2757_D1A0_41C0_6601E2736F33",
  "this.overlay_35A24A8E_2757_D1A3_41A3_BED107FA8A9E",
  "this.overlay_35FB8BD2_2757_F7A3_41B2_6CEFBEFA0D1F",
  "this.overlay_3216908A_2757_31A0_4184_B0D8EA4BBDED",
  "this.overlay_323B79A2_2757_33E3_415E_12F350197389",
  "this.overlay_325EB1EA_2757_5363_414A_2E5CEEADA4A0",
  "this.overlay_327D5A72_2757_5160_41BF_606D5C66A674",
  "this.overlay_344E427A_2757_5160_41B2_42878033654E",
  "this.overlay_3499ADE9_2757_5360_41C2_346D9DDFD21B",
  "this.overlay_3486D1CA_2754_D3A0_41B5_6ED2D63CB1C6",
  "this.overlay_353C5662_2755_5163_4154_025CB3921647",
  "this.overlay_35271C1A_2755_70A0_41B4_577ABCAB3913",
  "this.overlay_354F6C29_2755_50E0_4191_5CA114063456",
  "this.overlay_35798907_2755_30A1_41BB_BF0B874BC494",
  "this.overlay_35BF2A6A_2755_F163_41B2_56D3434E1ACD",
  "this.overlay_35A2C969_2755_D360_41AB_14E99AD10047",
  "this.overlay_35EB6099_2755_71A0_41B3_390E954C3B2B",
  "this.overlay_3424223D_2755_30E1_41A0_CAE07D3184B5",
  "this.overlay_348B212A_2754_D0E0_41A0_078A49084002",
  "this.overlay_34DD40A2_2754_F1E3_41AB_1EC9EA016BE2",
  "this.overlay_34C0117B_2754_D361_4180_20584F9C7104",
  "this.overlay_34E07E91_2753_31A1_41B9_43F805DBEAE4",
  "this.overlay_3555E029_2753_D0E1_41BC_B40D6D8F3414",
  "this.overlay_357F111C_2753_30A0_41C1_96B760585AF9",
  "this.overlay_359471E3_2753_7360_41BB_EAE5F998FDD4",
  "this.overlay_35802043_2753_50A0_41B8_CA0C8E49A369",
  "this.overlay_35AF89E2_2753_5363_417A_1DC63FB4FD25",
  "this.overlay_3513FB3C_276D_50E0_41C1_6C9235CA1F1E",
  "this.overlay_35F4E8E9_276D_F160_418D_244C8257AE98",
  "this.overlay_34C55AB3_276D_51E0_418D_F43392E42E6D",
  "this.overlay_35AB79BD_276F_53E0_41B9_EBD7E62630A8",
  "this.overlay_35D7B479_276F_3161_41A3_E304B7A5D9C2",
  "this.overlay_3462367F_276F_F161_41B7_E7CB1E2926BA",
  "this.overlay_34EB2109_276F_D0A1_41A6_EBE45DD79D5C",
  "this.overlay_34FAAEF8_276F_D160_41B2_FC42529A665E",
  "this.overlay_34CAFC59_276F_30A1_41B4_4CC1E36BC816",
  "this.overlay_34DFAC39_276F_50E1_41B1_18057AB317DA",
  "this.overlay_353E24E1_276F_5160_41B3_8720042FAD77",
  "this.overlay_356D0881_276F_31A1_41BF_41F4F4D0D34E",
  "this.overlay_3545EF7F_276C_EF60_41BD_BF5E6097006C",
  "this.overlay_35A8D737_276C_D0E1_41C2_FB4A2E89D72F",
  "this.overlay_358A3699_276D_31A1_41AF_2C0F6B720B47",
  "this.overlay_35F614F1_276D_7160_41C0_C45C5E15D948",
  "this.overlay_34629BFD_276D_3761_41B8_0DAB1DE43889",
  "this.overlay_34DCC2DB_276D_51A1_41A4_973AB4F7EC9E",
  "this.overlay_358E806C_2773_5167_41AD_6648BB41E618",
  "this.overlay_35C11BE0_2773_7760_41BE_E99D4D5EF50A",
  "this.overlay_35D77342_2773_50A3_41B3_C270ABEA1729",
  "this.overlay_346186ED_2773_3160_41C0_BE532A2A5F48",
  "this.overlay_345CCE69_2773_3161_419F_A2D1056C6CD0",
  "this.overlay_34EDFF9B_2773_EFA1_4191_A31E7F86BE6D",
  "this.overlay_34D92012_2773_D0A3_41AD_3D30A937C3E0",
  "this.overlay_3539D881_2773_31A1_41C2_62D7ADCEC7D1",
  "this.overlay_351693B3_2773_77E1_4180_49F961DC0448",
  "this.overlay_35408954_2773_30A0_41BD_5BC59C52552E",
  "this.overlay_35AF724E_2774_F0A3_41B9_7397A2E38005",
  "this.overlay_358C3371_2774_D760_415C_71D6F7D01D6A",
  "this.overlay_35987B51_2774_D0A1_41A2_B075DA5B0BF0",
  "this.overlay_35FBAC79_2775_3160_416E_21CF89EA7349",
  "this.overlay_35DAB872_2775_5163_41A5_CE304C287ACE",
  "this.overlay_34FDF19A_2775_53A3_41AA_7E987797CC3C",
  "this.overlay_32C07058_276D_50A0_41C0_7F626D57700F",
  "this.overlay_32A630F3_276D_3161_41BC_0850385B02A4",
  "this.overlay_330F3591_276F_F3A0_41A0_3CED4327AC5C",
  "this.overlay_33A59611_276F_50A1_41B4_4E18A390BF60",
  "this.overlay_32BDEA78_276C_F160_41B9_4DBFC3EDF584",
  "this.overlay_32DB0979_276D_7361_41B3_D76D6C91ABDA",
  "this.overlay_35DE6D91_276D_33A0_418F_4159E4361CD9",
  "this.overlay_32B3A600_276D_509F_41B2_965CDF3F22A4",
  "this.overlay_32C2ED68_2753_336F_41C1_27391AA2A301",
  "this.overlay_3309EA30_2753_50E0_41BF_6DE3A1F9B51C",
  "this.overlay_32540B28_2753_D0EF_41B5_52964F0DD523",
  "this.overlay_32A95131_2753_50E0_4162_186393F4E10E",
  "this.overlay_32C291A8_2754_D3EF_41A9_43E056436EF4",
  "this.overlay_32249FC0_2755_2F9F_419D_EB474F5F68C8",
  "this.overlay_32AEEFF8_2755_2F6F_41A7_5F57D1D10D77",
  "this.overlay_32FF9AD9_2755_D1A0_41B8_5ED6E6F7D60C",
  "this.overlay_35FC9561_2757_F361_41AF_EB14839AA9D3",
  "this.overlay_35E9B768_2755_3F6F_41BC_F0A74B7E4E3B",
  "this.overlay_32BCB738_2755_D0EF_41B4_77A8683673E4",
  "this.overlay_3263FB37_2754_F0E0_41C2_F58480B49188",
  "this.overlay_32F36DF2_2753_5363_41C0_6C377FB9316D",
  "this.overlay_3307284F_2753_F0A1_41B0_A6BF99AFC995",
  "this.overlay_3239B277_2753_3160_41B6_A6E14111516D",
  "this.overlay_3207CB96_2753_37A0_41B6_847DCB41B858",
  "this.overlay_32097517_2753_50A1_418B_D8F14F05BB48",
  "this.overlay_32A9AA3F_2753_70E0_41BF_F181F24891AC",
  "this.overlay_32F02C71_2753_3160_41B1_5577CEF4A97A",
  "this.overlay_32ED84C8_275C_D1A0_41BE_EE12AAB636E9",
  "this.overlay_32DD0D3E_275C_D0E0_41AA_E4CDEA215AC9",
  "this.overlay_32CEB856_275C_F0A0_41B1_4AD1894BD876",
  "this.overlay_332F3626_275C_D0E0_41A7_1A9DE701623E",
  "this.overlay_325F7067_275D_5160_41B8_33114EB24299",
  "this.overlay_32A6F307_275D_50A0_41C0_A900FB7E187B",
  "this.overlay_32F5C483_275D_F1A1_41B6_F5CA390A29FA",
  "this.overlay_32CAE192_275D_33A3_4156_9CBF8442A161",
  "this.overlay_3336F576_275D_5360_41A3_69DE0E08F43D",
  "this.overlay_3315BBFE_275D_7763_41BF_E54B2C9FE1FF",
  "this.overlay_337DDD17_275D_50A1_41B0_79F08B5B304A",
  "this.overlay_3214EBBE_275C_D7E0_41A2_6BE39B1C4ED0",
  "this.overlay_32B4F76F_275C_DF60_41A9_C1431839E352",
  "this.overlay_329E5A10_275F_30BF_41AF_2F3BF541ED3D",
  "this.overlay_32855B40_275F_50A0_41C2_697886A5380A",
  "this.overlay_32EC7F20_275F_70E0_4195_1A7F871303E9",
  "this.overlay_32D502EF_275F_3161_41BD_8E45EAD6EBB9",
  "this.overlay_333176EF_275F_D160_41C1_7EBFB0F5261F",
  "this.overlay_3319662F_275F_F0E0_4199_40D392F356DF",
  "this.overlay_3216868E_275F_D1A0_41BC_66C05B9449F8"
 ]
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "hfovMax": 30,
 "hfovMin": "150%",
 "partial": true,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_0/f/0/{row}_{column}.jpg",
      "rowCount": 38,
      "height": 19456,
      "tags": "ondemand",
      "width": 19456,
      "colCount": 38,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_0/f/1/{row}_{column}.jpg",
      "rowCount": 19,
      "height": 9728,
      "tags": "ondemand",
      "width": 9728,
      "colCount": 19,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_0/f/2/{row}_{column}.jpg",
      "rowCount": 10,
      "height": 5120,
      "tags": "ondemand",
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_0/f/3/{row}_{column}.jpg",
      "rowCount": 5,
      "height": 2560,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_0/f/4/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_0/f/5/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_0/f/6/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_t.jpg"
  }
 ],
 "vfov": 15,
 "hfov": 30,
 "label": "Side",
 "id": "panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153",
 "thumbnailUrl": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "overlays": [
  "this.overlay_34E3D708_2555_30A0_4176_8EA672AE63FE",
  "this.overlay_3423E1B9_255C_F3E1_41BE_6864CFC4E075",
  "this.overlay_37B123FA_255D_7763_41BA_C3223D51D2A3",
  "this.overlay_3551AA70_255D_717F_41A0_4AB4A6A7A462",
  "this.overlay_340FCAAA_255C_F1E0_41C0_498A1367D687",
  "this.overlay_34F3D22F_255F_50E0_41A6_CABE338D5793",
  "this.overlay_347DA9F9_255D_3360_41B9_9D62EB022CC8",
  "this.overlay_351756C9_255D_D1A1_41B0_AF04622764FD",
  "this.overlay_34C611A9_255D_33E1_4199_3917292455FF",
  "this.overlay_37A41EE0_2553_719F_41C0_5990F7F944A0",
  "this.overlay_3545BF78_2553_EF6F_41C2_8213A0C3010B",
  "this.overlay_3479C727_2553_30E0_41A3_30A8D7F52191",
  "this.overlay_341BFF66_2555_2F60_41C0_D4154D608864",
  "this.overlay_37954DBF_2554_D3E1_41B2_32487168CBEF",
  "this.overlay_350AA338_2557_30EF_41B9_5C847752758A",
  "this.overlay_340B2388_2557_D7A0_41B0_3CE8EAAB6EE4",
  "this.overlay_379511A7_2557_33E0_41B9_095843D8741A",
  "this.overlay_34C7681F_2555_70A1_41B3_84766CF6556D",
  "this.overlay_34715FAF_2555_EFE1_41A4_F1A878166697",
  "this.overlay_37F43AD0_2555_51BF_41C0_CC4C39AC18C5",
  "this.overlay_34DE2BDF_2554_F7A0_41BA_572F9E6D1AF9",
  "this.overlay_37903A7F_2553_5160_4195_49CEC27757A9",
  "this.overlay_37806228_252D_50EF_41BF_3F86DEAFE588",
  "this.overlay_36B3B5FF_252D_3360_41A3_83D58D7027E8",
  "this.overlay_31C2E64C_252C_D0A7_41C0_176342CDC9EF",
  "this.overlay_3116A2AF_2533_D1E0_417E_8B829010ED22",
  "this.overlay_30B6D296_2533_51A3_41C0_23ACA7B5CA73",
  "this.overlay_3446FEA7_2534_F1E0_41B5_6D510DBEBD80",
  "this.overlay_343AE1FF_2535_D360_41B3_B1C4D0123E33",
  "this.overlay_36CF6466_2534_F163_41A2_F4AC5EA2CF4E",
  "this.overlay_34FB4CFE_2537_7163_4192_E992ED87F13A",
  "this.overlay_345BB717_2537_D0A1_41B0_87DCEEBF44A8",
  "this.overlay_3426EE66_2537_7163_41BB_71C4A59A2E7D",
  "this.overlay_3780A277_2534_D161_41B4_1725345826DF",
  "this.overlay_376D5D9E_2535_53A3_419C_FD1EE538116A",
  "this.overlay_350E6F0E_253D_30A3_41B8_FAF9A744FB67",
  "this.overlay_34B7FCAE_253D_31E3_41A6_AE5D21EA8154",
  "this.overlay_3420056E_253C_F360_41B6_2C625B4CD328",
  "this.overlay_378B8C4D_253F_30A0_4150_D6552A1AB4F0",
  "this.overlay_3496B6B6_253F_D1E0_41B6_C639145FAAC6",
  "this.overlay_34206C55_253F_D0A0_41A2_4A95E3FF7539",
  "this.overlay_3787BB8E_253F_37A0_41B7_18A23357C9E2",
  "this.overlay_37057E4F_253D_30A1_41A5_A367B9E4DCBA",
  "this.overlay_365C05A6_253D_F3E0_41C0_230BC7D19563",
  "this.overlay_3140C805_253D_50A0_41B9_C1872415402B",
  "this.overlay_3478831E_2533_50A3_4191_8CDA4F82BBA6",
  "this.overlay_378D0CE4_2534_F160_41C0_6754469CD4A8",
  "this.overlay_365EE12E_2535_50E0_419F_7C9103A9A36B",
  "this.overlay_376263CE_2537_57A3_41B4_CFAFD703BCB4",
  "this.overlay_348C57FD_2535_3F60_41BE_5886122107C7",
  "this.overlay_3422DC5D_2535_30A1_4196_1268BC147D99",
  "this.overlay_37B1FB26_2535_50E0_41B7_0A14DB9D75E3",
  "this.overlay_349E75EC_2534_D360_41A6_56224E227020",
  "this.overlay_343B6CCD_2533_D1A0_41A0_7723E07728C6",
  "this.overlay_379EECFC_2533_3160_41C2_43CD0AE3D5C1",
  "this.overlay_343E187D_252D_7161_41C0_44EEF201DC98",
  "this.overlay_34AFD424_252F_30E7_41C2_AE604D46A1EC",
  "this.overlay_34217B05_252F_50A0_41AB_3490A8DFDFDC",
  "this.overlay_37E963EC_252F_3767_41B4_27993E1175A5",
  "this.overlay_34CB5AF5_252D_5160_41BE_94434CE482DE",
  "this.overlay_3418C344_252D_30A0_41B3_52318AA3B100",
  "this.overlay_371652AD_24D5_D1E1_419A_263D2B25E1C0",
  "this.overlay_36A431B9_24D5_73E0_4199_529F51E52867",
  "this.overlay_31F8F8CD_24D4_D1A1_41AA_5981931EC849",
  "this.overlay_3118D54B_24D7_50A0_41C0_3C0636999D89",
  "this.overlay_341385C5_24D7_33A1_41B3_0C84702C66EA",
  "this.overlay_37C6104B_24D7_30A0_41B5_9815C2A58CCF",
  "this.overlay_375BBB3C_24D5_50E0_419E_704D1814D894",
  "this.overlay_36D6C3EB_24D5_D761_41BB_688075D46EBC",
  "this.overlay_36529FCC_24D5_2FA7_41C2_AFA1D0E2455E",
  "this.overlay_3450D59C_24D5_53A7_41BC_FBFEE546FF92",
  "this.overlay_37D06C8C_24D3_51A7_41C2_0F6E86D65FCC",
  "this.overlay_378027A2_24D3_DFE0_41AA_BE6CA8092D9C",
  "this.overlay_372D040C_24D3_50A7_41BE_4D77F5FB1AD7",
  "this.overlay_347007EC_24DD_5F60_41BB_E8C2D9B84C82",
  "this.overlay_31ED1732_24F3_D0E0_41C0_E7405D11DE27",
  "this.overlay_3159C1DA_24F3_33A3_41A6_02FFEECBDD45",
  "this.overlay_37D099FA_24FD_5360_41BB_DC08475D8F2D",
  "this.overlay_377679E2_24FD_D360_41BC_B18A491D2055",
  "this.overlay_369EFE3A_24FC_D0E0_41A0_C19A1CB6E769",
  "this.overlay_360869A1_24FF_73E1_41BD_67B87C202C63",
  "this.overlay_37EAD68A_24FC_D1A0_417F_6FCD9A2FCE52",
  "this.overlay_37616399_24FD_57A0_41BA_0B58138CBCBE",
  "this.overlay_37141DEA_24FD_F363_41C2_1ACA181D927B",
  "this.overlay_3699D67A_24FD_7163_4178_9173727B0416",
  "this.overlay_342AF752_24FC_D0A3_41B3_F406D531EDAE",
  "this.overlay_37C97B09_24F4_D0A0_41BC_3DA98A1870C3",
  "this.overlay_36AEFF22_24F5_30E3_4168_779F380D91BD",
  "this.overlay_312A226F_24F7_5160_4198_7ED24620B9E7",
  "this.overlay_311D51DF_24F7_33A0_41C1_2705D4B85E05",
  "this.overlay_30D058D0_24F7_D1BF_4195_4B4F655FBA5E",
  "this.overlay_30B0D2B0_24F7_F1E0_4189_BA109155663E",
  "this.overlay_30963B48_24F7_F0A0_41AE_8E3F261FFEDD",
  "this.overlay_302242A8_24F7_51EF_41B7_BA6F682765EB",
  "this.overlay_343890FF_24F7_5161_41B5_E05B56D44A5E",
  "this.overlay_37E60960_24F7_509F_41B8_73E1E6EF203B",
  "this.overlay_37F40427_24F7_30E1_41B4_2023E5E8D307",
  "this.overlay_37B8C277_24F4_D161_41B1_8FAFFDB5C2E0",
  "this.overlay_378B4DAF_24F4_D3E0_41B1_116101402E60",
  "this.overlay_3766BAE7_24F4_D161_41B1_F51851C6BAF6",
  "this.overlay_37530C98_24F5_51AF_4195_60413AB55DE4",
  "this.overlay_37344CD7_24F5_71A1_416D_DFD10DDCE6B1",
  "this.overlay_3700C458_24F5_50AF_41BA_29414F89465B",
  "this.overlay_36EC8D27_24F5_50E1_41AC_F80BF62EBDD2",
  "this.overlay_36F625C0_24F5_339F_4185_5FFEFBE5687C",
  "this.overlay_36C2DC88_24F5_31AF_41BA_23418F93DD7E",
  "this.overlay_36AA2508_24F5_D0AF_41AA_8146E6F8130B",
  "this.overlay_368FF375_24F5_F760_419C_1DAE85DD1EE4",
  "this.overlay_36463474_24F5_3160_41A3_B29600C79C97",
  "this.overlay_31E34817_24F5_50A1_4192_0BF0B2A310DE",
  "this.overlay_31C71EB8_24F5_51EF_41B6_978E3FB869D1",
  "this.overlay_31A82598_24F5_73AF_41C1_8D00A61F2FC3",
  "this.overlay_318BECE7_24F5_7160_41C2_E71E8A596E93",
  "this.overlay_314A5B98_24F5_37AF_41C2_092502132627",
  "this.overlay_312B939F_24F4_D7A0_418D_7C1971F7B91C",
  "this.overlay_3420EFA0_24F4_EF9F_41B4_33D5506C620B",
  "this.overlay_37C01F78_24F4_EF6F_41C2_26914F16EA85",
  "this.overlay_37D457C7_24F4_DFA0_41AA_E17CAC65E7AC",
  "this.overlay_37A63267_24F3_3160_41B6_3806F5CA3D06",
  "this.overlay_37813727_24F3_70E0_4199_97FDD723D965",
  "this.overlay_375AD470_24F3_317F_41AD_0BD705BB3231",
  "this.overlay_372ACB97_24F3_37A0_4192_13C12945293D",
  "this.overlay_373D5117_24F3_D0A0_41B9_8DE00F4836A0",
  "this.overlay_37072CA8_24F3_D1EF_4172_FA4328D7B63C",
  "this.overlay_36ED29AA_24F3_F3E0_41AE_9DEA5F75CF72",
  "this.overlay_36C86FDD_24F3_2FA1_41B7_D445229EE671",
  "this.overlay_364B3C88_24EC_F1AF_41AA_DDFC1284D072",
  "this.overlay_362E2867_24EC_D160_41B6_E5D6E6BE4D45",
  "this.overlay_31EC012F_24ED_50E0_41C1_3A53FF7CF002",
  "this.overlay_3780DE37_24ED_70E0_41C0_69565AEEC2A6",
  "this.overlay_3767D417_24ED_30A1_41B3_345EE05BAC65",
  "this.overlay_37538C6E_24ED_3160_41C2_E8273D4A6373",
  "this.overlay_3738D26F_24ED_D160_41C1_28FC0FB5DC1A",
  "this.overlay_3716898F_24ED_33A1_41BA_2041C22AEDD2",
  "this.overlay_370461A0_24ED_53E0_41A4_651C94CF3567",
  "this.overlay_36F459E4_24ED_5360_41C2_BAC0ED827E53",
  "this.overlay_36C5AF0A_24ED_50A0_41C1_09C22A9A4391",
  "this.overlay_36A9054F_24EC_D0A0_41A6_CBA762498009",
  "this.overlay_3689B357_24EC_F0A0_41A5_4757F247B05A",
  "this.overlay_36646D7F_24EC_F361_41B1_EF5925F4169E",
  "this.overlay_37C0FDB8_24EF_33E0_419E_F5F63F1CBF2C",
  "this.overlay_37ADABB0_24EF_57FF_41B4_966DBD0AFF78",
  "this.overlay_379EE537_24EF_70E1_41C0_89984ABB8AD0",
  "this.overlay_377F0C77_24EF_5160_4178_705D9125AB11",
  "this.overlay_3751F969_24EF_3361_41AF_D85042E994BB",
  "this.overlay_374076E8_24EF_D16F_41A3_43378403E1CD",
  "this.overlay_373FA92B_24EF_F0E1_41A5_FFC3828639E3",
  "this.overlay_371A6125_24EF_30E0_419A_9DEF73D539A7",
  "this.overlay_36E0897F_24EF_5361_41BA_8758F44EB951",
  "this.overlay_36C435C7_24EF_53A1_41B6_812BDCD78AF3",
  "this.overlay_36AA18A7_24EF_31E0_41A4_55845FF51740",
  "this.overlay_368BE32F_24EC_D0E0_41B5_6D1EBF1689B1",
  "this.overlay_3447CF7A_24EC_EF63_41AF_03FC913C9EC0",
  "this.overlay_3400A71F_24EC_F0A0_41B6_63F799C49A87",
  "this.overlay_340D1E47_24EC_F0A0_41A4_6E36385ADF57",
  "this.overlay_37B11AC7_24ED_31A1_41B1_68F15157A8B2",
  "this.overlay_3764B57F_24ED_5361_41B6_60D458E63915",
  "this.overlay_37516CE7_24ED_5161_41BF_0352EE9D9349",
  "this.overlay_374355F9_24ED_3360_41BA_275700C94B66",
  "this.overlay_37375202_24ED_D0A0_4186_94B554D7B0BD",
  "this.overlay_3721E835_24ED_D0E1_41B0_DF8AD6EEFAAA",
  "this.overlay_37195289_24ED_F1A0_41B4_B896F5157DEA",
  "this.overlay_36E63AB7_24ED_D1E1_41AF_9CD877E465A0",
  "this.overlay_36D9B5FF_24ED_3360_41B3_4101D19E92DE",
  "this.overlay_36ABBE77_24ED_5160_41B0_E6F650B20A0A",
  "this.overlay_3682461F_24ED_70A1_41BF_0ADB1203EC00",
  "this.overlay_37C36CF6_24ED_5160_41A4_D240FB10FC2F",
  "this.overlay_37B2140F_24ED_30A0_41A8_DF225459436A",
  "this.overlay_379DB63F_24EC_D0E0_41C0_E0CA503B846C",
  "this.overlay_374EB868_24EC_D16F_41AC_A786A06C5914",
  "this.overlay_373E74A3_24D3_31E0_41A0_D49432A3073D",
  "this.overlay_372CC3C3_24D3_57A0_41A4_BA406EB25395",
  "this.overlay_36FB3289_24D3_51A0_41A5_8C69140E3179",
  "this.overlay_36E41916_24D3_50A0_41B7_411B30D66747",
  "this.overlay_342FEC67_24D3_3161_41B1_8948CBE909E5",
  "this.overlay_37BC7EA7_24D4_D1E1_41BE_2738D0346DD7",
  "this.overlay_37ACABFF_24D4_F761_41AF_DB768096C412",
  "this.overlay_3780D05F_24D5_30A0_41A1_4ACECDD77503",
  "this.overlay_376F13CF_24D5_57A0_41BC_0B510E0C1281",
  "this.overlay_375DFE0F_24D5_50A1_41BA_2130E68D76AB",
  "this.overlay_374F17D0_24D5_7FA0_419B_E3A830240688",
  "this.overlay_372F8FC5_24D5_2FA1_41A3_15FCB1BEFCC1",
  "this.overlay_371ADAAA_24D5_31E3_41BF_5A8035519949",
  "this.overlay_36F0A69F_24D5_D1A1_41AA_367F14F5EB19",
  "this.overlay_36DE3D6F_24D5_F360_41AC_74D9B1F439FB",
  "this.overlay_36B7977E_24D5_DF60_41A9_C7C2B6B8C4B2",
  "this.overlay_37E36017_24D5_50A1_41B3_274CFDDF5C29",
  "this.overlay_37B54897_24D5_71A1_41BC_6C2CA42DD44E",
  "this.overlay_378A810F_24D5_30A0_41C0_A1685F6425FA",
  "this.overlay_377ACC4F_24D5_30A0_41C0_3971F70DD0A3",
  "this.overlay_376AE94E_24D4_D0A0_41A3_EAC36ACF9A1D",
  "this.overlay_3745472E_24D4_F0E0_418B_01D5892609A7",
  "this.overlay_374B0012_24D4_D0A3_41C2_1E33BEF7407C",
  "this.overlay_3718F5BC_24D7_73E7_41AF_087CA5AB7174",
  "this.overlay_370AEFE4_24D7_6F60_41B1_7683026A2DBA",
  "this.overlay_36C7B03F_24D7_D0E0_4162_EE66F657A177",
  "this.overlay_36B27620_24D7_D0E0_41C2_2369259C9C2E",
  "this.overlay_3694DDB1_24D7_D3E1_41C2_7B2103572135",
  "this.overlay_368F24F7_24D7_F161_41B0_CA7828EC2489",
  "this.overlay_34360DCF_24D7_F3A1_41B7_D719415A97A1",
  "this.overlay_340A9717_24D7_D0A1_41BF_83619931800A",
  "this.overlay_37733446_24D7_30A0_41A8_25792293FEA4",
  "this.overlay_37662C66_24D7_3160_41BB_CACBA4D684F4",
  "this.overlay_37581098_24D4_F1AF_4195_5C3EC2C452A0",
  "this.overlay_370DF5A4_24D4_D3E0_41B6_115E40236C7D",
  "this.overlay_36D0BFD7_24D5_2FA1_41C1_ED9A9E857266",
  "this.overlay_36B0A88F_24D5_71A1_41BC_88358564CEC6",
  "this.overlay_3694A6DF_24D5_51A1_41C0_07C3F36C84BB",
  "this.overlay_37758B68_24D5_D76F_4177_3F910956DA70",
  "this.overlay_3765E8A7_24D5_F1E1_41A5_B769DB0E0363",
  "this.overlay_372E53A6_24D4_D7E3_41B2_D30504BF7E74",
  "this.overlay_371F4ED4_24D4_D1A7_41BB_C49963C8BC9D",
  "this.overlay_36FBA8AD_24D4_D1E1_41AD_E3D9E89A3533",
  "this.overlay_36DBD1EE_24D3_5360_41B1_DB68A439BC00",
  "this.overlay_36B9C19F_24D3_73A1_41A0_470E8A1CC757",
  "this.overlay_3691CCEF_24D3_7160_41A6_F80D52190D55",
  "this.overlay_37934ED6_24D3_71A0_419E_D566AC880452",
  "this.overlay_37668B76_24D3_3760_4197_598D215AFF72",
  "this.overlay_375D7B06_24DC_D0A0_4192_3C8176FA89DC",
  "this.overlay_374AE38F_24DC_F7A1_41B1_AE741693EDEF",
  "this.overlay_371CEC61_24DC_D161_41C1_49B75907F775",
  "this.overlay_37052B2B_24DD_30E0_41C2_77EE7F8AEDB4",
  "this.overlay_36F5B4C6_24DD_51A0_41BD_C50097D4774D",
  "this.overlay_36AD7E66_24DD_5160_41B4_1095EBBA0A70",
  "this.overlay_3683966F_24DD_7161_41B6_A8EFF038F65C",
  "this.overlay_37AAAC5E_24DD_50A3_41AB_1C591722F7F5",
  "this.overlay_37A5968D_24DD_31A0_41AC_82045F03ED43",
  "this.overlay_379410DF_24DC_D1A1_41C0_FC7DCA8E506C",
  "this.overlay_3763C285_24DC_D1A0_41A3_DD51D2E42F32",
  "this.overlay_37529045_24D3_30A0_41C0_FA23D22F308C",
  "this.overlay_373CA80E_24D3_50A3_41B0_EF1AEA636F18",
  "this.overlay_359F583B_2775_70E1_41AF_FCB1C5E1ABF6",
  "this.overlay_356A69A3_2774_D3E0_4196_6CBF169A7D9F",
  "this.overlay_35D345F9_2777_3361_4180_5809559DAF0B",
  "this.overlay_32765C79_2777_F161_4195_47014FC5B163",
  "this.overlay_34A2C638_2777_D0E0_417B_5421C1E171FF",
  "this.overlay_34998060_2777_3160_41C1_B1CAF1CECC25",
  "this.overlay_3534EF89_2777_2FA1_41C1_38198CA4B892",
  "this.overlay_353B6820_2777_50E0_41AD_8D6B8F138D88",
  "this.overlay_354D1111_2777_50A0_41BE_DFCCF97BE9F5",
  "this.overlay_355CCE91_2777_51A1_41B9_9E115EC72588",
  "this.overlay_358E726E_2774_F163_41B1_CA00C590CF13",
  "this.overlay_359109C1_2774_F3A0_41BA_FC2D1893DADF",
  "this.overlay_35E3916D_2774_D361_41A5_4A19139EF49F",
  "this.overlay_35FC6E23_2774_D0E1_41B9_E605F22D2081",
  "this.overlay_35079129_2775_D0E1_41C0_CDA809409AB6",
  "this.overlay_35B26548_2775_70A0_41BD_6BC0887B6098",
  "this.overlay_3584BDC1_2775_73A1_419A_D991EEF39CC5",
  "this.overlay_358854E9_2775_5161_41A2_54699686F824",
  "this.overlay_35982E78_2775_5160_4198_16E0AE30D735",
  "this.overlay_35F0EE81_2775_31A0_4183_7E2FA3495AF1",
  "this.overlay_35C97E9E_2774_D1A3_41A4_76225F37499C",
  "this.overlay_32177AC6_2773_31A3_41AD_8A491BD1C4AD",
  "this.overlay_327BAFA0_2773_6FE0_41C0_7AEE1EC108A1",
  "this.overlay_3252D7E1_2773_7F61_41BC_4E3CB34DEDBD",
  "this.overlay_32B041FF_2773_5360_41B2_451896518074",
  "this.overlay_329F6B91_2773_57A1_41BB_1612AF5AEEA8",
  "this.overlay_32C58947_2773_30A0_41A5_CBD390324E52",
  "this.overlay_33276020_2773_D0E0_41AB_5D142E310A60",
  "this.overlay_336AA2B9_2773_F1E1_41B1_BA14B3BB66B0",
  "this.overlay_34AC3E61_2773_F160_41BE_03121E4CE2A4",
  "this.overlay_356CAB91_2773_77A0_41B9_6EBC0E795144",
  "this.overlay_35B03A63_277C_D161_419A_83B8FBCA0571",
  "this.overlay_358CC319_277C_F0A1_41BD_2F6CFA8A0C17",
  "this.overlay_35986A00_277C_F0A0_419F_70BDEAF67160",
  "this.overlay_35E92499_277C_D1A1_41B5_4D2E69F30316",
  "this.overlay_35F8EC6E_277C_D163_41C2_5AFEEAF0BFA6",
  "this.overlay_35DE0DFD_277D_3361_41A1_BC014B3E7BF5",
  "this.overlay_322CE541_277D_50A1_41B0_C135004AE50D",
  "this.overlay_32399B00_277D_509F_41B0_4B5795FC5F8E",
  "this.overlay_326A1888_277D_51A0_41B6_7E6405EE705B",
  "this.overlay_32BAE448_277D_D0A0_41A3_DB9F70854DA9",
  "this.overlay_34A9AF8E_277D_EFA3_4197_36A00F988113",
  "this.overlay_3494A6B9_277D_F1E1_418C_4A8F4CA7C069",
  "this.overlay_34DC5410_277D_D0A0_419B_5929F57846AA",
  "this.overlay_35283C80_277D_D1A0_41B2_80C9671E395A",
  "this.overlay_352353C8_277D_37A0_4155_0D30F5C975FC",
  "this.overlay_353F6D39_277D_30E1_41C0_EB29BD819AEA",
  "this.overlay_350CC468_277D_516F_41B0_BF5A953BCC1E",
  "this.overlay_351CCEC9_277D_51A1_41B5_893DD2597EA1"
 ]
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "hfovMax": 30,
 "hfovMin": "150%",
 "partial": true,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0/f/0/{row}_{column}.jpg",
      "rowCount": 38,
      "height": 19456,
      "tags": "ondemand",
      "width": 19456,
      "colCount": 38,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0/f/1/{row}_{column}.jpg",
      "rowCount": 19,
      "height": 9728,
      "tags": "ondemand",
      "width": 9728,
      "colCount": 19,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0/f/2/{row}_{column}.jpg",
      "rowCount": 10,
      "height": 5120,
      "tags": "ondemand",
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0/f/3/{row}_{column}.jpg",
      "rowCount": 5,
      "height": 2560,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0/f/4/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0/f/5/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0/f/6/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_t.jpg"
  }
 ],
 "vfov": 15,
 "hfov": 30,
 "label": "Back",
 "id": "panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810",
 "thumbnailUrl": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "overlays": [
  "this.overlay_34A6AF3C_256D_50E7_4188_0CDCEE242F92",
  "this.overlay_34B42562_256D_3360_4173_A781CA6E0290",
  "this.overlay_341D76AA_256D_31E0_41B1_36D66D3ACACC",
  "this.overlay_36B98063_2573_D161_41B4_66EC8C1A87C0",
  "this.overlay_34B78493_2573_31A0_41AB_C85FEAB04010",
  "this.overlay_3733A95A_2575_30A0_419D_7AF447251EB3",
  "this.overlay_345187EB_2577_7F61_41B8_5C95182400AE",
  "this.overlay_34F38343_2575_D0A1_41B6_A575142E793F",
  "this.overlay_346FCC1E_2575_50A0_41BC_0BB50B19B413",
  "this.overlay_3542A773_2574_FF61_41BF_41FDD2455D9A",
  "this.overlay_34CD1F82_2573_6FA3_41B1_14B77C88EE66",
  "this.overlay_37B7213A_2573_70E3_41BE_1863BAE7D818",
  "this.overlay_34A294A9_257C_F1E0_41B9_DD010A80B473",
  "this.overlay_342AF9C1_257D_73A0_4186_6D7ED4E8F544",
  "this.overlay_31F42BB2_257C_F7E3_41B8_058438207916",
  "this.overlay_30AF3BA9_257F_57E0_41BB_EB698E2249BC",
  "this.overlay_34F21FA2_257F_2FE3_41B9_729DCFBBA10D",
  "this.overlay_3411C5F2_257C_D360_4152_94FA17625F56",
  "this.overlay_3788080B_257D_30A0_41B7_285A7A01B394",
  "this.overlay_34BC5CC2_257D_51A3_41A2_C9D4DCBFB182",
  "this.overlay_343A2379_2573_5761_4197_BB06B253669D",
  "this.overlay_37B8611A_2573_F0A0_41A3_05B881D9A372",
  "this.overlay_34CA077A_2574_DF60_41A1_0F85D85BEF83",
  "this.overlay_37AD7B4A_2575_D0A0_4140_EC6644A3F62C",
  "this.overlay_372F5731_2575_50E1_41AB_292CED44C693",
  "this.overlay_34E41059_2574_D0A0_4191_D54910850D3C",
  "this.overlay_3439A0B1_2577_71E1_4187_05E5E62C90F4",
  "this.overlay_37E7BCA9_2577_31E1_41B4_87943BCB38CA",
  "this.overlay_34FCBCB9_2574_D1E1_41A8_D8808BAE41C8",
  "this.overlay_3402B0F9_2575_7161_41B9_AA3AEE97DA64",
  "this.overlay_34EAC659_2575_50A1_4190_B02455889700",
  "this.overlay_3483CFAA_2573_2FE3_4188_36D8189FA1F6",
  "this.overlay_342395AA_256C_D3E0_41B3_67C344129F56",
  "this.overlay_343AD419_256F_D0A0_41C1_78471F229277",
  "this.overlay_37AF1E80_256F_51A0_41BC_CE7244D83BEF",
  "this.overlay_37B2CFF9_256C_EF60_41A7_B696533C9895",
  "this.overlay_35214228_2553_70EF_41A4_6397C54E44AE",
  "this.overlay_34CE3AA9_2553_31E0_41B2_DB694DDEE64A",
  "this.overlay_37BC4DB4_24EC_D3E7_41BE_73A619557C40",
  "this.overlay_37CAD4D1_24ED_31A0_41BB_E4EB51E115EC",
  "this.overlay_37DAD11B_24ED_D0A1_41A8_12B574EFF837",
  "this.overlay_37A94AA1_24ED_D1E0_41BE_326D98FF62CE",
  "this.overlay_37996F60_24ED_2F60_41B5_912C0342691D",
  "this.overlay_374F63E6_24ED_7760_4199_7501E3726920",
  "this.overlay_36A26C79_24EC_D160_418D_4CA3876021A4",
  "this.overlay_36833571_24EC_F360_41A4_0F74550B68A2",
  "this.overlay_34B8F131_24EC_D0E0_41B5_3591764AA67E",
  "this.overlay_346F7AF0_24EC_D160_4191_774FD069F9E2",
  "this.overlay_347AE611_24EF_30A1_41C2_6B68DF8854C8",
  "this.overlay_34444BC9_24EF_37A0_4190_EA7B7D236DA8",
  "this.overlay_34502369_24EF_5761_4183_F2A1F7BED96E",
  "this.overlay_37E7FEC9_24EF_51A1_41A1_0AA9FC97D438",
  "this.overlay_37D3115A_24EF_D0A0_41B9_AF27A4304A04",
  "this.overlay_3719C091_24EC_D1A0_41A1_1E7265E21874",
  "this.overlay_36FB49D9_24EC_D3A0_41A7_A73A01FCDF5C",
  "this.overlay_36DE1931_24EC_F0E0_41BE_6740A9C6B49A",
  "this.overlay_36BA5162_24EC_D363_41C0_B4C526D8F762",
  "this.overlay_34245629_24ED_30E1_41AF_E4C5AB42A7DF",
  "this.overlay_37E6861A_24ED_70A0_418A_3041FB2E3490",
  "this.overlay_37D2F7B1_24ED_DFE1_41A1_FFD9023B0682",
  "this.overlay_37897B13_24ED_D0A0_41C2_8F8C73B69248",
  "this.overlay_376940F4_24ED_5167_4178_6CB000A48F32",
  "this.overlay_37564279_24ED_5160_41AF_CA1E842DACD5",
  "this.overlay_37245AD0_24ED_51A0_41B7_E5398D0DEC96",
  "this.overlay_3702B331_24ED_30E1_41C2_06D6E1A91C83",
  "this.overlay_36E38F30_24ED_30E1_41BD_0B3C4385052C",
  "this.overlay_37E581C2_24F3_53A3_4192_79DBB2DA9513",
  "this.overlay_37DFBA51_24F3_70A0_41AA_BAC70535A354",
  "this.overlay_37AA82F1_24F3_5161_4192_B1737A372D46",
  "this.overlay_37B47C89_24F3_51A1_41B5_B18FB55277D5",
  "this.overlay_378785EE_24F3_3363_419B_A982E11348E6",
  "this.overlay_3774B60E_24F3_F0A0_4197_985A9C037B70",
  "this.overlay_37596C41_24F3_D0A1_41B7_FE7DD1A84D18",
  "this.overlay_371C36A9_24F3_71E0_41BB_8EF5FBE4AC27",
  "this.overlay_343B2E99_24F3_51A1_41BF_CAB80FA58FA9",
  "this.overlay_3417FEA9_24F3_31E0_41BD_58C5F997D500",
  "this.overlay_37D00DE1_24F4_D361_419F_15D1436E1F22",
  "this.overlay_37B19AF9_24F5_5161_41AE_F3259D401C8B",
  "this.overlay_378E2B3B_24F5_70E1_41A9_D5E5FF830B0B",
  "this.overlay_379FC503_24F5_50A1_41B7_4E0CBC4FD669",
  "this.overlay_34CC602B_2757_50E0_41B0_93D67544E8AF",
  "this.overlay_3492C314_2755_30A0_41B3_3489DEE1776F",
  "this.overlay_34CBE41D_2755_70A1_41AE_68F14DBDEEF6",
  "this.overlay_3519CCB5_2755_51E0_41BC_FD825D2C844C",
  "this.overlay_355FB753_2755_D0A0_4199_EDEC3FEE9CE3",
  "this.overlay_34B8D13B_2755_30E1_412E_D1E9772FC20C",
  "this.overlay_34B71CF3_2753_7161_4196_725DB9CCBDBE",
  "this.overlay_34D91772_2753_DF63_41BE_C54D427B4512",
  "this.overlay_34CE6E52_2753_D0A0_41BA_F1661D70B719",
  "this.overlay_34F038B3_2753_F1E1_41A1_6B9B1B812B45",
  "this.overlay_34E3FFDA_2753_EFA0_41C1_2450F16AB665",
  "this.overlay_3517767A_2753_D160_41B6_9F0CB2F7C047",
  "this.overlay_35181E58_2753_D0AF_41AD_E8D0C7864B3E",
  "this.overlay_354EC093_2753_51A0_41BC_D6EC12A2D006",
  "this.overlay_35940D7A_2753_7360_41C1_C5725A2C423D",
  "this.overlay_358FA5AA_2753_53E0_41B7_2C892C37ECA2",
  "this.overlay_35A76DFA_2753_5360_41A1_F712D7EDEBC5",
  "this.overlay_34D8F732_275C_D0E0_41B6_0F74F2210936",
  "this.overlay_34CFB98C_275C_F3A0_41BD_F58DF6EC2CDD",
  "this.overlay_34FD709A_275C_D1A3_41BA_3921AE5F9482",
  "this.overlay_34E9286A_275C_D163_41B4_F3AF823C362A",
  "this.overlay_34E7F222_275D_30E0_41BD_705C9F85475E",
  "this.overlay_3525D1C1_275D_73A1_41C1_9F02FDA0BA3E",
  "this.overlay_35568C2A_275D_70E0_41B3_B33A8FDABCC1",
  "this.overlay_354755EA_275D_5363_419F_B3C2893E985A",
  "this.overlay_341CC9B5_275D_33E0_4160_43C37E999872",
  "this.overlay_34BBBC03_275D_D0A0_41B9_5F5C924F651B",
  "this.overlay_34ACCAAA_275D_F1E3_41C2_5C3A6B377F36",
  "this.overlay_34DDC8F9_275D_D160_4183_01511DBFF36B",
  "this.overlay_3260EC27_2773_50E0_4199_3BBE16456359",
  "this.overlay_328EDAB8_2773_D1E0_41AB_50E5F2C729AF",
  "this.overlay_329BE661_2773_F160_4198_E6AB3113742B",
  "this.overlay_332A73F9_2773_3760_41B2_B31E3342BC9B",
  "this.overlay_333033AF_2773_57E0_41C2_25381A70EE46",
  "this.overlay_3368F2A0_2773_71E0_41B7_423EA475F309",
  "this.overlay_334EABA7_2773_77E0_41A5_5796A6ABC089",
  "this.overlay_33BF9DDE_2773_53A3_4193_AEEE4E34B0CE",
  "this.overlay_33805B55_2773_30A1_41C1_71C4631F580B",
  "this.overlay_33E7C05F_276C_F0A0_419A_0C2F970EF928",
  "this.overlay_33C1F7ED_276C_FF61_41C1_67B0AEEA78BB",
  "this.overlay_30226535_276C_D0E0_41BC_8545B51DF9DF"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_44299303_4A6D_A577_41CE_03D412F5C50C_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_44299303_4A6D_A577_41CE_03D412F5C50C_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_44299303_4A6D_A577_41CE_03D412F5C50C_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_44299303_4A6D_A577_41CE_03D412F5C50C_playlist, 3, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_44299303_4A6D_A577_41CE_03D412F5C50C_playlist",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153",
   "camera": "this.panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_rotation"
},
{
 "hfovMax": 30,
 "hfovMin": "135%",
 "partial": true,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0/f/0/{row}_{column}.jpg",
      "rowCount": 38,
      "height": 19456,
      "tags": "ondemand",
      "width": 19456,
      "colCount": 38,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0/f/1/{row}_{column}.jpg",
      "rowCount": 19,
      "height": 9728,
      "tags": "ondemand",
      "width": 9728,
      "colCount": 19,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0/f/2/{row}_{column}.jpg",
      "rowCount": 10,
      "height": 5120,
      "tags": "ondemand",
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0/f/3/{row}_{column}.jpg",
      "rowCount": 5,
      "height": 2560,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0/f/4/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0/f/5/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0/f/6/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_t.jpg"
  }
 ],
 "vfov": 30,
 "hfov": 30,
 "label": "Pool",
 "id": "panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77",
 "thumbnailUrl": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "overlays": [
  "this.overlay_35AC2753_24ED_50A0_419A_62DBF188B9BA",
  "this.overlay_36ED56A3_24F4_D1E0_41A5_5C55256A2402",
  "this.overlay_34F6EB93_24F5_57A0_41A8_B0E9809812A5",
  "this.overlay_3599B40A_24F7_50A0_41B3_7E65A1BE451D",
  "this.overlay_36CA0DD2_24FF_53A3_41AE_D1B43A0A7F2F",
  "this.overlay_37E62F74_25D3_6F67_41AE_1E89D0BF42FB",
  "this.overlay_34CB1DFB_25D7_7360_41BC_AA0D8766736C",
  "this.overlay_342E83F3_25D5_3760_41AB_841145ED6835",
  "this.overlay_35827E73_25ED_D160_41A7_2EB5CC5C9CBE",
  "this.overlay_357FA2EB_25F3_7160_41B1_30D73EC7C0AB",
  "this.overlay_344DF2FA_25F3_3160_4137_CA624FC945BC",
  "this.overlay_34E2C293_25FD_31A1_41B7_B3E2C813AC8E",
  "this.overlay_361CE3C2_25FF_57A3_41B8_5060327889E8",
  "this.overlay_34187593_25FD_53A1_4190_091A1D35CA84",
  "this.overlay_37F36CE3_25F3_D160_41C1_05CF317B8E04",
  "this.overlay_35A813E2_25F4_D763_41BB_417EE74F5E03",
  "this.overlay_353B9922_25F7_50E0_41A5_6F38AB4E8954",
  "this.overlay_347F87C9_25F4_FFA0_41BA_C2226AF784A9",
  "this.overlay_352D90AA_25F5_51E3_41B8_031A2CF308F6",
  "this.overlay_346518E1_25F5_3161_413D_7375C8887416",
  "this.overlay_35A41689_25ED_71A0_41A6_3F8214B79C62",
  "this.overlay_3406DF78_25ED_2F60_41C0_0DB1ECB90380",
  "this.overlay_34EDA369_25EF_F760_41A7_C1453675C7F7",
  "this.overlay_358EEFC0_25EF_6FA0_41AC_E8EA24759BB9",
  "this.overlay_341AA5F1_25EC_F361_4192_017E77357C5F",
  "this.overlay_37929C04_24DF_70A0_41B1_485B36FE9513",
  "this.overlay_37E047E2_24DD_DF60_41C0_54B6345A0495",
  "this.overlay_3789753A_24DD_F0E3_4197_E402AD179D36",
  "this.overlay_375836C3_24DD_31A0_41BD_97D7E993738E",
  "this.overlay_348AEB13_24DD_30A1_41BA_BF2E5149C367",
  "this.overlay_346A6D52_24DC_D0A3_4184_DEEA28C8D27C",
  "this.overlay_3465D601_24DC_F0A0_41B3_2219AB74EE93",
  "this.overlay_34154EA2_24DC_F1E0_41BB_E83EE9501FD9",
  "this.overlay_3404F6C9_24DC_D1A0_41B1_5F130C7BD259",
  "this.overlay_37A202B2_24D3_D1E3_4199_B8EEAF92CED3",
  "this.overlay_373B526E_24D3_7160_4185_937B0989A510",
  "this.overlay_37258DD7_24D3_73A0_41BF_D79AE51C3400",
  "this.overlay_36C75A2F_24D3_50E0_41B2_EBCF0EC75D85",
  "this.overlay_36AC88EA_24D4_D163_419D_056E3E177564",
  "this.overlay_364D61C1_24D4_F3A0_4198_DD243AC80040",
  "this.overlay_366A1CE9_24D4_F160_41A5_7381B70E94A4",
  "this.overlay_363C3BA2_24D4_D7E0_4195_FCF5B579C246",
  "this.overlay_31DC847B_24D5_3160_418D_5C45E7055A1D",
  "this.overlay_34AEC29C_24D5_51A0_41C1_948183EB483F",
  "this.overlay_37D74EC9_24D5_F1A1_41C1_0B9D1D74314E",
  "this.overlay_37C16D72_24D5_D363_41C2_DC24BE5F337A",
  "this.overlay_37F169A2_24D5_33E3_41B3_851AAF018BA3",
  "this.overlay_37BF5C78_24D5_7160_41BE_7911E010A69C",
  "this.overlay_37A41550_24D5_50BF_4199_FC6FFA63B671",
  "this.overlay_37500D7E_24D5_5360_419F_A018D0FB6637",
  "this.overlay_377C25AE_24D5_33E0_4186_BA8FC7CBE949",
  "this.overlay_37644E9A_24D5_31A3_41B3_4E4E71667602",
  "this.overlay_37268ABA_24D4_D1E3_4189_FBC1A603D7F8",
  "this.overlay_3692604A_24D7_70A3_41AD_CA38DD3C0038",
  "this.overlay_36B3C82B_24D7_70E1_41B5_D9788D2EFE0C",
  "this.overlay_34C06EFD_24D7_7160_41A9_0A30F98FCBEB",
  "this.overlay_3405DE59_24D7_50A0_41B8_3FFF4D89F853",
  "this.overlay_3424875B_24D7_D0A1_41B9_F567F101C9D4",
  "this.overlay_37DA52E2_24D7_F163_41B3_5A84B6812375",
  "this.overlay_37F2C532_24D7_30E0_41C0_9A78D204E39B",
  "this.overlay_3794879F_24D7_5FA1_41C2_47C9791EFF09",
  "this.overlay_3778D709_24D7_30A0_41BF_139078A2C159",
  "this.overlay_37344AB1_24D4_F1E0_41BF_8A77BFA443ED",
  "this.overlay_34F4E934_24D4_D0E0_41B4_0FFD92653BA0",
  "this.overlay_34B586F2_24D5_3160_41B7_099B5DD646B1",
  "this.overlay_34A911C3_24D5_53A1_41BB_F1C461ADE1B7",
  "this.overlay_37C37232_24D5_50E3_41C0_85E2AB734FEC",
  "this.overlay_37F1D22B_24D5_30E1_41B4_6CC4FBB91C78",
  "this.overlay_37E13D99_24D5_33A1_41B5_974091EEAE99",
  "this.overlay_378ECA33_24D5_D0E0_41C0_728CDA28A19E",
  "this.overlay_37BE4378_24D5_F76F_41AB_70706525E91A",
  "this.overlay_37AA8B37_24D5_F0E1_4198_D99FEB682A1E",
  "this.overlay_375596A7_24D5_D1E1_4197_83C91293CB04",
  "this.overlay_37404DEA_24D5_D360_41BD_E99910694432",
  "this.overlay_376AD76A_24D5_3F63_41B8_E5CA0954AFEF",
  "this.overlay_329B4D6B_2774_D361_4183_39A7C7A22BFF",
  "this.overlay_332CCC6F_2775_3160_41BB_B15CC066CD4E",
  "this.overlay_333CF538_2775_50E0_41BD_0C15B5C4F6FE",
  "this.overlay_35832F91_2775_6FA1_41C0_1A4198EBFE8A",
  "this.overlay_35C26E28_2775_70EF_41A7_9476045EE9D7",
  "this.overlay_32734E88_2775_D1AF_41B9_4C4A1FE21747",
  "this.overlay_325A120F_2775_50A0_41AF_954A04A47F4D",
  "this.overlay_32B9F5C8_2775_73A0_41C0_21F4FA7BD319",
  "this.overlay_32CA5035_2775_30E1_41BE_7595E3CA10F7",
  "this.overlay_332497ED_2774_DF61_41C0_502E41D42547",
  "this.overlay_33025370_2774_D760_41A0_946E5F7CA214",
  "this.overlay_3377863F_2773_30E0_4146_16B034AD4F7F"
 ]
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "MainViewer",
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "progressBackgroundColorRatios": [
  0
 ],
 "minHeight": 50,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "height": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "itemThumbnailShadowHorizontalLength": 3,
 "id": "ThumbnailList_44299303_4A6D_A577_41CE_03D412F5C50C",
 "left": "0%",
 "paddingLeft": 20,
 "itemLabelHorizontalAlign": "center",
 "scrollBarWidth": 10,
 "itemMode": "normal",
 "itemLabelFontStyle": "normal",
 "width": 131,
 "rollOverItemBorderSize": 0,
 "borderRadius": 5,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "minHeight": 20,
 "itemLabelFontFamily": "Arial",
 "verticalAlign": "top",
 "itemBorderRadius": 0,
 "minWidth": 20,
 "itemThumbnailOpacity": 1,
 "itemThumbnailShadowOpacity": 0.54,
 "class": "ThumbnailList",
 "rollOverItemLabelFontSize": "14px",
 "itemLabelGap": 9,
 "itemLabelPosition": "bottom",
 "itemPaddingLeft": 3,
 "itemHorizontalAlign": "center",
 "height": "100%",
 "shadow": false,
 "itemThumbnailBorderRadius": 50,
 "itemThumbnailShadowSpread": 1,
 "rollOverItemThumbnailShadowBlurRadius": 14,
 "itemBackgroundColor": [],
 "itemPaddingRight": 3,
 "itemBackgroundColorRatios": [],
 "itemPaddingTop": 3,
 "horizontalAlign": "left",
 "selectedItemLabelFontColor": "#FFCC00",
 "rollOverItemLabelFontWeight": "normal",
 "rollOverItemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "rollOverItemThumbnailShadowOpacity": 0.45,
 "paddingRight": 20,
 "itemBackgroundOpacity": 0,
 "itemLabelTextDecoration": "none",
 "borderSize": 0,
 "itemLabelFontWeight": "normal",
 "propagateClick": false,
 "top": "0%",
 "playList": "this.ThumbnailList_44299303_4A6D_A577_41CE_03D412F5C50C_playlist",
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 14,
 "itemThumbnailShadowBlurRadius": 8,
 "scrollBarMargin": 2,
 "itemLabelFontColor": "#FFFFFF",
 "gap": 10,
 "itemThumbnailHeight": 75,
 "selectedItemLabelFontWeight": "bold",
 "paddingTop": 10,
 "layout": "vertical",
 "rollOverItemBackgroundColorRatios": [],
 "itemBackgroundColorDirection": "vertical",
 "itemOpacity": 1,
 "rollOverItemBackgroundColor": [],
 "paddingBottom": 10,
 "itemPaddingBottom": 3,
 "itemVerticalAlign": "middle",
 "itemThumbnailShadowVerticalLength": 3,
 "itemThumbnailWidth": 75,
 "itemThumbnailShadow": true,
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemThumbnailShadowColor": "#000000"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_169_0.png",
      "width": 349,
      "class": "ImageResourceLevel",
      "height": 190
     }
    ]
   },
   "pitch": 0,
   "roll": 0,
   "yaw": -0.46
  }
 ],
 "id": "overlay_36C68098_24D5_51AF_41C0_FB7CE00D37D6",
 "data": {
  "label": "102_4B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.1,
   "yaw": -0.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_169_1_0_map.gif",
      "width": 174,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_170_0.png",
      "width": 349,
      "class": "ImageResourceLevel",
      "height": 190
     }
    ]
   },
   "pitch": 0,
   "roll": 0,
   "yaw": -0.46
  }
 ],
 "id": "overlay_31F4624E_24D5_30A1_41AA_F112444EBB70",
 "data": {
  "label": "102_4B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.1,
   "yaw": -0.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_170_1_0_map.gif",
      "width": 174,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_171_0.png",
      "width": 192,
      "class": "ImageResourceLevel",
      "height": 145
     }
    ]
   },
   "pitch": 0.22,
   "roll": 0,
   "yaw": 1.08
  }
 ],
 "id": "overlay_3102CCB7_24D4_D1E1_41A5_AADC4C45FED3",
 "data": {
  "label": "103_3B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.15,
   "yaw": 1.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_171_1_0_map.gif",
      "width": 96,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_172_0.png",
      "width": 192,
      "class": "ImageResourceLevel",
      "height": 145
     }
    ]
   },
   "pitch": 0.22,
   "roll": 0,
   "yaw": 1.08
  }
 ],
 "id": "overlay_3772E88F_24D3_71A0_41B2_82E74C70B177",
 "data": {
  "label": "103_3B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.15,
   "yaw": 1.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_172_1_0_map.gif",
      "width": 96,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_173_0.png",
      "width": 121,
      "class": "ImageResourceLevel",
      "height": 122
     }
    ]
   },
   "pitch": 0.48,
   "roll": 0,
   "yaw": 1.95
  }
 ],
 "id": "overlay_37062A77_24D3_D160_41BB_CFC16449B1B1",
 "data": {
  "label": "104_2B-T7D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.73,
   "yaw": 1.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_173_1_0_map.gif",
      "width": 60,
      "class": "ImageResourceLevel",
      "height": 61
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_174_0.png",
      "width": 121,
      "class": "ImageResourceLevel",
      "height": 122
     }
    ]
   },
   "pitch": 0.48,
   "roll": 0,
   "yaw": 1.95
  }
 ],
 "id": "overlay_368995A6_24D3_33E3_41C1_ADA6DE500565",
 "data": {
  "label": "104_2B-T7D@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.73,
   "yaw": 1.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_174_1_0_map.gif",
      "width": 60,
      "class": "ImageResourceLevel",
      "height": 61
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_175_0.png",
      "width": 120,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   },
   "pitch": 0.1,
   "roll": 0,
   "yaw": 1.93
  }
 ],
 "id": "overlay_355E69FF_272F_5360_41A2_BCBBEE25471A",
 "data": {
  "label": "92_2B-T9"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.72,
   "yaw": 1.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_175_1_0_map.gif",
      "width": 60,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_176_0.png",
      "width": 120,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   },
   "pitch": 0.1,
   "roll": 0,
   "yaw": 1.93
  }
 ],
 "id": "overlay_35CA6520_272C_D0E0_41A0_1D9683C7FFD0",
 "data": {
  "label": "92_2B-T9@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.72,
   "yaw": 1.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_176_1_0_map.gif",
      "width": 60,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_177_0.png",
      "width": 353,
      "class": "ImageResourceLevel",
      "height": 140
     }
    ]
   },
   "pitch": -0.49,
   "roll": 0,
   "yaw": -0.81
  }
 ],
 "id": "overlay_349BF35F_272D_70A0_41C1_68A69C725B7D",
 "data": {
  "label": "89_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.12,
   "yaw": -0.81,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_177_1_0_map.gif",
      "width": 176,
      "class": "ImageResourceLevel",
      "height": 70
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_178_0.png",
      "width": 353,
      "class": "ImageResourceLevel",
      "height": 140
     }
    ]
   },
   "pitch": -0.49,
   "roll": 0,
   "yaw": -0.81
  }
 ],
 "id": "overlay_3500E9BF_272C_D3E0_41C0_C1B24D8B6F06",
 "data": {
  "label": "89_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.12,
   "yaw": -0.81,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_178_1_0_map.gif",
      "width": 176,
      "class": "ImageResourceLevel",
      "height": 70
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_179_0.png",
      "width": 123,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   },
   "pitch": -0.33,
   "roll": 0,
   "yaw": 0.55
  }
 ],
 "id": "overlay_356732A7_2733_71E0_41B3_23DFF728575D",
 "data": {
  "label": "90_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.74,
   "yaw": 0.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_179_1_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_180_0.png",
      "width": 123,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   },
   "pitch": -0.33,
   "roll": 0,
   "yaw": 0.55
  }
 ],
 "id": "overlay_35D6EB97_2733_D7A1_41B8_DA3EA325E21B",
 "data": {
  "label": "90_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.74,
   "yaw": 0.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_180_1_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_181_0.png",
      "width": 77,
      "class": "ImageResourceLevel",
      "height": 59
     }
    ]
   },
   "pitch": -0.17,
   "roll": 0,
   "yaw": 1.08
  }
 ],
 "id": "overlay_3426339F_2733_57A0_41C0_BEDD71D84D27",
 "data": {
  "label": "91_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.46,
   "yaw": 1.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_181_1_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 29
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_182_0.png",
      "width": 77,
      "class": "ImageResourceLevel",
      "height": 59
     }
    ]
   },
   "pitch": -0.17,
   "roll": 0,
   "yaw": 1.08
  }
 ],
 "id": "overlay_34DCA84E_2733_30A0_41B5_7A830B15717A",
 "data": {
  "label": "91_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.46,
   "yaw": 1.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_182_1_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 29
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_183_0.png",
      "width": 68,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   },
   "pitch": -0.05,
   "roll": 0,
   "yaw": 1.44
  }
 ],
 "id": "overlay_351F3B86_2734_D7A3_4198_1F16E77DEE9B",
 "data": {
  "label": "92_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.41,
   "yaw": 1.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_183_1_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_184_0.png",
      "width": 68,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   },
   "pitch": -0.05,
   "roll": 0,
   "yaw": 1.44
  }
 ],
 "id": "overlay_34CCE8BD_2734_D1E0_41BA_0B66086DA794",
 "data": {
  "label": "92_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.41,
   "yaw": 1.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_184_1_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_185_0.png",
      "width": 351,
      "class": "ImageResourceLevel",
      "height": 145
     }
    ]
   },
   "pitch": -0.84,
   "roll": 0,
   "yaw": -1.18
  }
 ],
 "id": "overlay_356E974E_2737_D0A0_41BA_56C7ACC1A8B8",
 "data": {
  "label": "70_3B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.11,
   "yaw": -1.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_185_1_0_map.gif",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_186_0.png",
      "width": 351,
      "class": "ImageResourceLevel",
      "height": 145
     }
    ]
   },
   "pitch": -0.84,
   "roll": 0,
   "yaw": -1.18
  }
 ],
 "id": "overlay_35C6EC1E_2737_D0A3_41B9_1BA286AADBE6",
 "data": {
  "label": "70_3B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.11,
   "yaw": -1.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_186_1_0_map.gif",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_187_0.png",
      "width": 134,
      "class": "ImageResourceLevel",
      "height": 77
     }
    ]
   },
   "pitch": -0.67,
   "roll": 0,
   "yaw": 0.21
  }
 ],
 "id": "overlay_34C4F4B7_2737_31E1_41B4_C8EC9EC43BC3",
 "data": {
  "label": "71_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.81,
   "yaw": 0.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_187_1_0_map.gif",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 38
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_188_0.png",
      "width": 134,
      "class": "ImageResourceLevel",
      "height": 77
     }
    ]
   },
   "pitch": -0.67,
   "roll": 0,
   "yaw": 0.21
  }
 ],
 "id": "overlay_351B64C3_2735_51A0_4195_C1A7681347E2",
 "data": {
  "label": "71_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.81,
   "yaw": 0.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_188_1_0_map.gif",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 38
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_189_0.png",
      "width": 74,
      "class": "ImageResourceLevel",
      "height": 56
     }
    ]
   },
   "pitch": -0.49,
   "roll": 0,
   "yaw": 0.75
  }
 ],
 "id": "overlay_34682CAF_2733_31E1_41B9_F5C40088E4A7",
 "data": {
  "label": "72_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.45,
   "yaw": 0.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_189_1_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_190_0.png",
      "width": 74,
      "class": "ImageResourceLevel",
      "height": 56
     }
    ]
   },
   "pitch": -0.49,
   "roll": 0,
   "yaw": 0.75
  }
 ],
 "id": "overlay_34D38135_2733_50E0_41C1_799D0790BAD9",
 "data": {
  "label": "72_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.45,
   "yaw": 0.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_190_1_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_191_0.png",
      "width": 66,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   },
   "pitch": -0.38,
   "roll": 0,
   "yaw": 1.1
  }
 ],
 "id": "overlay_351FCA1E_2733_F0A3_4163_AB3785C6C1B6",
 "data": {
  "label": "73_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.4,
   "yaw": 1.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_191_1_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_192_0.png",
      "width": 66,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   },
   "pitch": -0.38,
   "roll": 0,
   "yaw": 1.1
  }
 ],
 "id": "overlay_356902C4_2733_71A0_41C1_20942721B6BA",
 "data": {
  "label": "73_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.4,
   "yaw": 1.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_192_1_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_193_0.png",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   },
   "pitch": -0.28,
   "roll": 0,
   "yaw": 1.43
  }
 ],
 "id": "overlay_34044AE6_273C_D160_41BD_EC32509509A1",
 "data": {
  "label": "74_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.4,
   "yaw": 1.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_193_1_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_194_0.png",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   },
   "pitch": -0.28,
   "roll": 0,
   "yaw": 1.43
  }
 ],
 "id": "overlay_34DA573E_273D_50E0_41B9_FC23989E8CF7",
 "data": {
  "label": "74_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.4,
   "yaw": 1.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_194_1_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_195_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   },
   "pitch": -0.13,
   "roll": 0,
   "yaw": 1.91
  }
 ],
 "id": "overlay_357C7A0E_273C_D0A3_41BE_6FCAFFEC60FD",
 "data": {
  "label": "75_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.72,
   "yaw": 1.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_195_1_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_196_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   },
   "pitch": -0.13,
   "roll": 0,
   "yaw": 1.91
  }
 ],
 "id": "overlay_37F03F98_273F_2FA0_41A0_F8762692CE1E",
 "data": {
  "label": "75_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.72,
   "yaw": 1.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_196_1_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_197_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   },
   "pitch": -0.34,
   "roll": 0,
   "yaw": 1.91
  }
 ],
 "id": "overlay_34C6C7F6_273F_DF63_41BD_36A7CA296090",
 "data": {
  "label": "57_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.71,
   "yaw": 1.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_197_1_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_198_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   },
   "pitch": -0.34,
   "roll": 0,
   "yaw": 1.91
  }
 ],
 "id": "overlay_350BF626_273F_30E3_41A6_03498383F84B",
 "data": {
  "label": "57_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.71,
   "yaw": 1.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_198_1_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_199_0.png",
      "width": 66,
      "class": "ImageResourceLevel",
      "height": 54
     }
    ]
   },
   "pitch": -0.5,
   "roll": 0,
   "yaw": 1.42
  }
 ],
 "id": "overlay_356B103E_273C_D0E0_41B2_B4830F900BBE",
 "data": {
  "label": "56_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.4,
   "yaw": 1.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_199_1_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_200_0.png",
      "width": 66,
      "class": "ImageResourceLevel",
      "height": 54
     }
    ]
   },
   "pitch": -0.5,
   "roll": 0,
   "yaw": 1.42
  }
 ],
 "id": "overlay_35A05ABE_273C_D1E3_4146_76F56E6889CC",
 "data": {
  "label": "56_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.4,
   "yaw": 1.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_200_1_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_201_0.png",
      "width": 69,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   },
   "pitch": -0.61,
   "roll": 0,
   "yaw": 1.09
  }
 ],
 "id": "overlay_34C6EB15_273D_D0A0_41B3_1DD7949034B0",
 "data": {
  "label": "55_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 1.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_201_1_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_202_0.png",
      "width": 69,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   },
   "pitch": -0.61,
   "roll": 0,
   "yaw": 1.09
  }
 ],
 "id": "overlay_350FADF5_273D_D360_41B8_ED27D5BB4075",
 "data": {
  "label": "55_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 1.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_202_1_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_203_0.png",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 54
     }
    ]
   },
   "pitch": -0.71,
   "roll": 0,
   "yaw": 0.75
  }
 ],
 "id": "overlay_35B028FD_273C_D160_41BD_1739E1262857",
 "data": {
  "label": "54_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.41,
   "yaw": 0.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_203_1_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_204_0.png",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 54
     }
    ]
   },
   "pitch": -0.71,
   "roll": 0,
   "yaw": 0.75
  }
 ],
 "id": "overlay_3473385D_2733_50A1_41B7_5A411717D8E7",
 "data": {
  "label": "54_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.41,
   "yaw": 0.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_204_1_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_205_0.png",
      "width": 132,
      "class": "ImageResourceLevel",
      "height": 77
     }
    ]
   },
   "pitch": -0.88,
   "roll": 0,
   "yaw": 0.23
  }
 ],
 "id": "overlay_34F7E87E_2733_F163_41BA_10F857D8EC0C",
 "data": {
  "label": "53_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 0.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_205_1_0_map.gif",
      "width": 66,
      "class": "ImageResourceLevel",
      "height": 38
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_206_0.png",
      "width": 297,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   },
   "pitch": -1.19,
   "roll": 0,
   "yaw": -0.99
  }
 ],
 "id": "overlay_342D0E05_2734_D0A0_41C2_731E437FB4D9",
 "data": {
  "label": "52_2B-T2"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.79,
   "yaw": -0.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_206_1_0_map.gif",
      "width": 148,
      "class": "ImageResourceLevel",
      "height": 51
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_207_0.png",
      "width": 132,
      "class": "ImageResourceLevel",
      "height": 77
     }
    ]
   },
   "pitch": -0.88,
   "roll": 0,
   "yaw": 0.23
  }
 ],
 "id": "overlay_34FFCE45_2735_30A1_41B9_8CBB01FCD318",
 "data": {
  "label": "53_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 0.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_207_1_0_map.gif",
      "width": 66,
      "class": "ImageResourceLevel",
      "height": 38
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_208_0.png",
      "width": 300,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   },
   "pitch": -1.41,
   "roll": 0,
   "yaw": -1
  }
 ],
 "id": "overlay_34E745F6_2737_7360_41BA_F3F57D7FE289",
 "data": {
  "label": "33_2B-T2"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.8,
   "yaw": -1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_208_1_0_map.gif",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 51
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_209_0.png",
      "width": 128,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": -1.11,
   "roll": 0,
   "yaw": 0.21
  }
 ],
 "id": "overlay_35B2CF96_2737_2FA3_41B8_6264AB6967CE",
 "data": {
  "label": "34_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 0.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_209_1_0_map.gif",
      "width": 64,
      "class": "ImageResourceLevel",
      "height": 37
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_210_0.png",
      "width": 128,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": -1.11,
   "roll": 0,
   "yaw": 0.21
  }
 ],
 "id": "overlay_34665CD4_2734_D1A7_41AF_5B1CE4136016",
 "data": {
  "label": "34_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 0.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_210_1_0_map.gif",
      "width": 64,
      "class": "ImageResourceLevel",
      "height": 37
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_211_0.png",
      "width": 73,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   },
   "pitch": -0.94,
   "roll": 0,
   "yaw": 0.74
  }
 ],
 "id": "overlay_34E114F6_2735_7163_41B6_72A3E3A404FC",
 "data": {
  "label": "35_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.44,
   "yaw": 0.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_211_1_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 29
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_212_0.png",
      "width": 73,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   },
   "pitch": -0.94,
   "roll": 0,
   "yaw": 0.74
  }
 ],
 "id": "overlay_35191457_2735_30A0_41C0_9EBC0B008680",
 "data": {
  "label": "35_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.44,
   "yaw": 0.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_212_1_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 29
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_213_0.png",
      "width": 69,
      "class": "ImageResourceLevel",
      "height": 57
     }
    ]
   },
   "pitch": -0.82,
   "roll": 0,
   "yaw": 1.09
  }
 ],
 "id": "overlay_358AEE25_2735_30E1_41C0_B8A43B11A7CF",
 "data": {
  "label": "36_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 1.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_213_1_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_214_0.png",
      "width": 69,
      "class": "ImageResourceLevel",
      "height": 57
     }
    ]
   },
   "pitch": -0.82,
   "roll": 0,
   "yaw": 1.09
  }
 ],
 "id": "overlay_3462D885_2735_51A0_4184_708F5C5288C4",
 "data": {
  "label": "36_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 1.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_214_1_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_215_0.png",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 54
     }
    ]
   },
   "pitch": -0.71,
   "roll": 0,
   "yaw": 1.42
  }
 ],
 "id": "overlay_34D3CCB5_2734_D1E0_41A9_4DA7BA8DC384",
 "data": {
  "label": "37_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.39,
   "yaw": 1.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_215_1_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_216_0.png",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 54
     }
    ]
   },
   "pitch": -0.71,
   "roll": 0,
   "yaw": 1.42
  }
 ],
 "id": "overlay_350B1E04_2733_50A0_4193_854DBB822D27",
 "data": {
  "label": "37_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.39,
   "yaw": 1.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_216_1_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_217_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   },
   "pitch": -0.56,
   "roll": 0,
   "yaw": 1.9
  }
 ],
 "id": "overlay_35537D4C_2733_D0A0_41B3_81B11182BD1F",
 "data": {
  "label": "38_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.71,
   "yaw": 1.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_217_1_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_218_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   },
   "pitch": -0.56,
   "roll": 0,
   "yaw": 1.9
  }
 ],
 "id": "overlay_35A56E4D_2733_30A1_41C2_84A8D4787EFD",
 "data": {
  "label": "38_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.71,
   "yaw": 1.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_218_1_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_219_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   },
   "pitch": -0.78,
   "roll": 0,
   "yaw": 1.89
  }
 ],
 "id": "overlay_34D4400D_272C_D0A1_41B3_EFF7FC75EB3B",
 "data": {
  "label": "11_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.71,
   "yaw": 1.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_219_1_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_220_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   },
   "pitch": -0.78,
   "roll": 0,
   "yaw": 1.89
  }
 ],
 "id": "overlay_34E627DB_272D_3FA0_416C_8FB24E1B2ADA",
 "data": {
  "label": "11_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.71,
   "yaw": 1.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_220_1_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_221_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 77
     }
    ]
   },
   "pitch": -1,
   "roll": 0,
   "yaw": 1.22
  }
 ],
 "id": "overlay_35795124_272D_F0E0_41B5_7C22585952E3",
 "data": {
  "label": "12_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 1.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_221_1_0_map.gif",
      "width": 63,
      "class": "ImageResourceLevel",
      "height": 38
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_222_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 77
     }
    ]
   },
   "pitch": -1,
   "roll": 0,
   "yaw": 1.22
  }
 ],
 "id": "overlay_358869D5_272D_D3A1_419E_E97B5BA40608",
 "data": {
  "label": "12_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 1.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_222_1_0_map.gif",
      "width": 63,
      "class": "ImageResourceLevel",
      "height": 38
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_223_0.png",
      "width": 126,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": -1.23,
   "roll": 0,
   "yaw": 0.54
  }
 ],
 "id": "overlay_34A3F89C_272D_51A0_41B1_56FAD422400D",
 "data": {
  "label": "13_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.76,
   "yaw": 0.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_223_1_0_map.gif",
      "width": 63,
      "class": "ImageResourceLevel",
      "height": 37
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_224_0.png",
      "width": 130,
      "class": "ImageResourceLevel",
      "height": 79
     }
    ]
   },
   "pitch": -1.46,
   "roll": 0,
   "yaw": -0.15
  }
 ],
 "id": "overlay_359FEF5D_272F_D0A1_41C0_8262FB42C17C",
 "data": {
  "label": "14_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.78,
   "yaw": -0.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_224_1_0_map.gif",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 39
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_225_0.png",
      "width": 126,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": -1.23,
   "roll": 0,
   "yaw": 0.54
  }
 ],
 "id": "overlay_34FA5B24_272C_D0E0_41BD_B5B075D47342",
 "data": {
  "label": "13_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.76,
   "yaw": 0.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_225_1_0_map.gif",
      "width": 63,
      "class": "ImageResourceLevel",
      "height": 37
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_226_0.png",
      "width": 130,
      "class": "ImageResourceLevel",
      "height": 79
     }
    ]
   },
   "pitch": -1.46,
   "roll": 0,
   "yaw": -0.15
  }
 ],
 "id": "overlay_35D589FC_272F_D360_41C2_BE4028D6D4F9",
 "data": {
  "label": "14_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.78,
   "yaw": -0.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_226_1_0_map.gif",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 39
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_227_0.png",
      "width": 130,
      "class": "ImageResourceLevel",
      "height": 77
     }
    ]
   },
   "pitch": -1.64,
   "roll": 0,
   "yaw": -0.15
  }
 ],
 "id": "overlay_30CEDD3D_272D_D0E0_41B8_6BB9525E9A8B",
 "data": {
  "label": "04_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.78,
   "yaw": -0.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_227_1_0_map.gif",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 38
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_228_0.png",
      "width": 130,
      "class": "ImageResourceLevel",
      "height": 77
     }
    ]
   },
   "pitch": -1.64,
   "roll": 0,
   "yaw": -0.15
  }
 ],
 "id": "overlay_34F0740C_272D_50A0_41C2_BE7132346401",
 "data": {
  "label": "04_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.78,
   "yaw": -0.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_228_1_0_map.gif",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 38
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_229_0.png",
      "width": 124,
      "class": "ImageResourceLevel",
      "height": 85
     }
    ]
   },
   "pitch": -1.44,
   "roll": 0,
   "yaw": 0.54
  }
 ],
 "id": "overlay_3587996C_2753_5360_41BD_29F34CF68909",
 "data": {
  "label": "03_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.75,
   "yaw": 0.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_229_1_0_map.gif",
      "width": 62,
      "class": "ImageResourceLevel",
      "height": 42
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_230_0.png",
      "width": 124,
      "class": "ImageResourceLevel",
      "height": 85
     }
    ]
   },
   "pitch": -1.44,
   "roll": 0,
   "yaw": 0.54
  }
 ],
 "id": "overlay_32140661_2753_F160_41BC_80146029755D",
 "data": {
  "label": "03_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.75,
   "yaw": 0.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_230_1_0_map.gif",
      "width": 62,
      "class": "ImageResourceLevel",
      "height": 42
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_231_0.png",
      "width": 126,
      "class": "ImageResourceLevel",
      "height": 85
     }
    ]
   },
   "pitch": -1.21,
   "roll": 0,
   "yaw": 1.22
  }
 ],
 "id": "overlay_32AFC824_2753_70E0_41B8_FB359C2014D9",
 "data": {
  "label": "02_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.76,
   "yaw": 1.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_231_1_0_map.gif",
      "width": 63,
      "class": "ImageResourceLevel",
      "height": 42
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_232_0.png",
      "width": 126,
      "class": "ImageResourceLevel",
      "height": 85
     }
    ]
   },
   "pitch": -1.21,
   "roll": 0,
   "yaw": 1.22
  }
 ],
 "id": "overlay_331E694B_2753_30A0_41C1_F6BEE04BA3E0",
 "data": {
  "label": "02_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.76,
   "yaw": 1.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_232_1_0_map.gif",
      "width": 63,
      "class": "ImageResourceLevel",
      "height": 42
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_233_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 82
     }
    ]
   },
   "pitch": -0.99,
   "roll": 0,
   "yaw": 1.89
  }
 ],
 "id": "overlay_34DC2A65_2755_5161_41A3_3BDCAB5B5ADE",
 "data": {
  "label": "01_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.71,
   "yaw": 1.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_233_1_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_234_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 82
     }
    ]
   },
   "pitch": -0.99,
   "roll": 0,
   "yaw": 1.89
  }
 ],
 "id": "overlay_34FA5164_2755_5367_41B0_55266449CF4F",
 "data": {
  "label": "01_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.71,
   "yaw": 1.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_234_1_0_map.gif",
      "width": 59,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.54,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_235_0.png",
      "width": 89,
      "class": "ImageResourceLevel",
      "height": 63
     }
    ]
   },
   "pitch": 0.03,
   "yaw": -0.55,
   "distance": 50
  }
 ],
 "id": "overlay_34CDC9D4_275D_53A7_4197_E20F748E6E92",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.54,
   "yaw": -0.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_235_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.41,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_236_0.png",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   },
   "pitch": 0.03,
   "yaw": -1.15,
   "distance": 50
  }
 ],
 "id": "overlay_3544F85B_275F_30A1_41A1_2ABC2CD42746",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.41,
   "yaw": -1.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_236_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.54,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_237_0.png",
      "width": 89,
      "class": "ImageResourceLevel",
      "height": 63
     }
    ]
   },
   "pitch": 0.25,
   "yaw": -0.8,
   "distance": 50
  }
 ],
 "id": "overlay_35B4C947_275F_70A0_4188_EAAA65BA88A4",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.54,
   "yaw": -0.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_237_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.54,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_238_0.png",
      "width": 89,
      "class": "ImageResourceLevel",
      "height": 63
     }
    ]
   },
   "pitch": -0.03,
   "yaw": -1.08,
   "distance": 50
  }
 ],
 "id": "overlay_35D30690_275F_51BF_41B7_1C7A5D0741F0",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.54,
   "yaw": -1.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_238_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_239_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   },
   "pitch": -0.17,
   "yaw": -0.84,
   "distance": 50
  }
 ],
 "id": "overlay_35F78A07_275F_30A1_41C0_447EEC5BE080",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -0.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_239_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_240_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   },
   "pitch": -0.32,
   "yaw": -0.41,
   "distance": 50
  }
 ],
 "id": "overlay_322DCC4F_275F_F0A1_41B7_31AD5CCBB0DD",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -0.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_240_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_241_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   },
   "pitch": 0.32,
   "yaw": 1.11,
   "distance": 50
  }
 ],
 "id": "overlay_32799BEA_275F_D760_41B1_92A9191DF197",
 "data": {
  "label": "103"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 1.11,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_241_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_242_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   },
   "pitch": -0.01,
   "yaw": -0.16,
   "distance": 50
  }
 ],
 "id": "overlay_32973DDB_275F_33A1_41C0_3FEB889E83DB",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -0.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_242_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_243_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   },
   "pitch": -0.07,
   "yaw": 0.27,
   "distance": 50
  }
 ],
 "id": "overlay_332226C2_275F_51A1_4198_F9DB7FCBE3D0",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 0.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_243_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_244_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   },
   "pitch": 0.03,
   "yaw": 0.77,
   "distance": 50
  }
 ],
 "id": "overlay_339DE4D1_275C_D1A0_41BF_896948D47379",
 "data": {
  "label": "103"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 0.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_244_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_245_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   },
   "pitch": 0.42,
   "yaw": 1.43,
   "distance": 50
  }
 ],
 "id": "overlay_345223A2_275C_F7E3_4199_8DBF0CFBE619",
 "data": {
  "label": "103"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 1.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_245_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_246_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   },
   "pitch": 0.24,
   "yaw": 0.79,
   "distance": 50
  }
 ],
 "id": "overlay_34CB431A_275D_30A0_41C2_65AA8B9F9F31",
 "data": {
  "label": "103"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 0.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_246_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_247_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   },
   "pitch": 0.2,
   "yaw": 1.43,
   "distance": 50
  }
 ],
 "id": "overlay_352BF3EA_275D_3763_41B6_C5B66094BCD8",
 "data": {
  "label": "103"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 1.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_247_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_248_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": 0.6,
   "yaw": 2.06,
   "distance": 50
  }
 ],
 "id": "overlay_355C0912_275D_D0A0_41A2_9AD72745AB83",
 "data": {
  "label": "104"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.33,
   "yaw": 2.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_248_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.39,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_249_0.png",
      "width": 64,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   },
   "pitch": 0.11,
   "yaw": 1.09,
   "distance": 50
  }
 ],
 "id": "overlay_35AF2F4B_275D_30A0_417B_4B665FE9D367",
 "data": {
  "label": "103"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.39,
   "yaw": 1.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_249_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_250_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": 0.55,
   "yaw": 1.76,
   "distance": 50
  }
 ],
 "id": "overlay_320E12EF_275D_3160_4169_9D9DEEAB144E",
 "data": {
  "label": "104"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.33,
   "yaw": 1.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_250_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_251_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.25,
   "yaw": 0.76,
   "distance": 50
  }
 ],
 "id": "overlay_32307B47_275D_30A0_4180_F1978A896BC6",
 "data": {
  "label": "89"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_251_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_252_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": 0.41,
   "yaw": 2.08,
   "distance": 50
  }
 ],
 "id": "overlay_32672359_275C_F0A0_41C2_CD383CCE600F",
 "data": {
  "label": "104"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.33,
   "yaw": 2.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_252_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_253_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": 0.34,
   "yaw": 1.77,
   "distance": 50
  }
 ],
 "id": "overlay_32E3835A_2753_30A3_41BB_90E80DE454EF",
 "data": {
  "label": "104"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.33,
   "yaw": 1.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_253_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_254_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": 0.07,
   "yaw": 1.79,
   "distance": 50
  }
 ],
 "id": "overlay_34F20089_2753_31A0_41A5_5C1434CC7C94",
 "data": {
  "label": "92"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_254_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_255_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": 0.16,
   "yaw": 2.08,
   "distance": 50
  }
 ],
 "id": "overlay_35A6CC97_2754_D1A1_41BF_BBE07D2AA5D4",
 "data": {
  "label": "92"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_255_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_256_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.04,
   "yaw": 1.46,
   "distance": 50
  }
 ],
 "id": "overlay_35FD0877_2755_5160_41AD_51F65EB07FAC",
 "data": {
  "label": "91"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_256_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_257_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.14,
   "yaw": 1.1,
   "distance": 50
  }
 ],
 "id": "overlay_322BCE2A_2755_30E3_419A_F28F2BCB8D28",
 "data": {
  "label": "90"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_257_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_258_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.69,
   "yaw": -1.08,
   "distance": 50
  }
 ],
 "id": "overlay_32793514_2755_F0A7_41B5_08E637FA1862",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_258_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_259_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.35,
   "yaw": 0.42,
   "distance": 50
  }
 ],
 "id": "overlay_32B0AF11_2755_30A0_41A4_C9A7CC9617B9",
 "data": {
  "label": "89"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_259_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_260_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.46,
   "yaw": 0.08,
   "distance": 50
  }
 ],
 "id": "overlay_348FD682_2755_71A3_4192_813A2BD62740",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_260_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_261_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.56,
   "yaw": -0.26,
   "distance": 50
  }
 ],
 "id": "overlay_34AD4FCA_2755_6FA3_41B7_989175F4B111",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_261_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_262_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.53,
   "yaw": -1.76,
   "distance": 50
  }
 ],
 "id": "overlay_34A1A833_2755_50E1_41B5_260F819105A9",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_262_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_263_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.21,
   "yaw": -1.4,
   "distance": 50
  }
 ],
 "id": "overlay_34D6336C_2755_3767_41B0_EA3B9A582E81",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_263_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_264_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.35,
   "yaw": -1.54,
   "distance": 50
  }
 ],
 "id": "overlay_34C9AA92_2755_31A0_41B6_684DD5EB9EC6",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_264_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_265_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.34,
   "yaw": -1.23,
   "distance": 50
  }
 ],
 "id": "overlay_34FEE69A_2754_D1A3_418B_146DD7647AE6",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_265_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_266_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.53,
   "yaw": -0.96,
   "distance": 50
  }
 ],
 "id": "overlay_34EF7F1C_2754_D0A7_41B6_DF08477B2F64",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.96,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_266_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_267_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.5,
   "yaw": -1.32,
   "distance": 50
  }
 ],
 "id": "overlay_34E2C83A_2754_F0E0_417B_62D5E3308425",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_267_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_268_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.67,
   "yaw": -0.65,
   "distance": 50
  }
 ],
 "id": "overlay_354D54AB_2757_51E1_41A0_E86E028416C1",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_268_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_269_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.77,
   "yaw": -1.81,
   "distance": 50
  }
 ],
 "id": "overlay_3593D0B7_2757_31E1_41B9_A597DCBB6206",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.81,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_269_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_270_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.63,
   "yaw": -1.96,
   "distance": 50
  }
 ],
 "id": "overlay_35B4E0D6_2757_D1A0_41C0_6601E2736F33",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.96,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_270_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_271_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.7,
   "yaw": -1.59,
   "distance": 50
  }
 ],
 "id": "overlay_35A24A8E_2757_D1A3_41A3_BED107FA8A9E",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_271_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_272_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.38,
   "yaw": 1.09,
   "distance": 50
  }
 ],
 "id": "overlay_35FB8BD2_2757_F7A3_41B2_6CEFBEFA0D1F",
 "data": {
  "label": "73"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_272_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_273_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.84,
   "yaw": -1.41,
   "distance": 50
  }
 ],
 "id": "overlay_3216908A_2757_31A0_4184_B0D8EA4BBDED",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_273_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_274_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.91,
   "yaw": -1.64,
   "distance": 50
  }
 ],
 "id": "overlay_323B79A2_2757_33E3_415E_12F350197389",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_274_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_275_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -1.01,
   "yaw": -1.22,
   "distance": 50
  }
 ],
 "id": "overlay_325EB1EA_2757_5363_414A_2E5CEEADA4A0",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_275_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_276_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -1.05,
   "yaw": -1.45,
   "distance": 50
  }
 ],
 "id": "overlay_327D5A72_2757_5160_41BF_606D5C66A674",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_276_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_277_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -1.01,
   "yaw": -0.94,
   "distance": 50
  }
 ],
 "id": "overlay_344E427A_2757_5160_41B2_42878033654E",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_277_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_278_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.92,
   "yaw": -0.63,
   "distance": 50
  }
 ],
 "id": "overlay_3499ADE9_2757_5360_41C2_346D9DDFD21B",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_278_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_279_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.82,
   "yaw": -0.33,
   "distance": 50
  }
 ],
 "id": "overlay_3486D1CA_2754_D3A0_41B5_6ED2D63CB1C6",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_279_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_280_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.72,
   "yaw": 0.01,
   "distance": 50
  }
 ],
 "id": "overlay_353C5662_2755_5163_4154_025CB3921647",
 "data": {
  "label": "71"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_280_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_281_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.6,
   "yaw": 0.36,
   "distance": 50
  }
 ],
 "id": "overlay_35271C1A_2755_70A0_41B4_577ABCAB3913",
 "data": {
  "label": "71"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_281_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_282_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.49,
   "yaw": 0.75,
   "distance": 50
  }
 ],
 "id": "overlay_354F6C29_2755_50E0_4191_5CA114063456",
 "data": {
  "label": "72"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_282_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_283_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.18,
   "yaw": 1.74,
   "distance": 50
  }
 ],
 "id": "overlay_35798907_2755_30A1_41BB_BF0B874BC494",
 "data": {
  "label": "75"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_283_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_284_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.27,
   "yaw": 1.44,
   "distance": 50
  }
 ],
 "id": "overlay_35BF2A6A_2755_F163_41B2_56D3434E1ACD",
 "data": {
  "label": "74"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_284_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_285_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -1.34,
   "yaw": -1.24,
   "distance": 50
  }
 ],
 "id": "overlay_35A2C969_2755_D360_41AB_14E99AD10047",
 "data": {
  "label": "52"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_285_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_286_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.07,
   "yaw": 2.05,
   "distance": 50
  }
 ],
 "id": "overlay_35EB6099_2755_71A0_41B3_390E954C3B2B",
 "data": {
  "label": "75"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_286_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_287_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.28,
   "yaw": 2.05,
   "distance": 50
  }
 ],
 "id": "overlay_3424223D_2755_30E1_41A0_CAE07D3184B5",
 "data": {
  "label": "57"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_287_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_288_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.37,
   "yaw": 1.78,
   "distance": 50
  }
 ],
 "id": "overlay_348B212A_2754_D0E0_41A0_078A49084002",
 "data": {
  "label": "57"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_288_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_289_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.48,
   "yaw": 1.43,
   "distance": 50
  }
 ],
 "id": "overlay_34DD40A2_2754_F1E3_41AB_1EC9EA016BE2",
 "data": {
  "label": "56"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_289_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_290_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.59,
   "yaw": 1.11,
   "distance": 50
  }
 ],
 "id": "overlay_34C0117B_2754_D361_4180_20584F9C7104",
 "data": {
  "label": "55"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.11,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_290_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_291_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.7,
   "yaw": 0.75,
   "distance": 50
  }
 ],
 "id": "overlay_34E07E91_2753_31A1_41B9_43F805DBEAE4",
 "data": {
  "label": "54"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_291_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_292_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.81,
   "yaw": 0.41,
   "distance": 50
  }
 ],
 "id": "overlay_3555E029_2753_D0E1_41BC_B40D6D8F3414",
 "data": {
  "label": "53"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_292_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_293_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -0.92,
   "yaw": 0.08,
   "distance": 50
  }
 ],
 "id": "overlay_357F111C_2753_30A0_41C1_96B760585AF9",
 "data": {
  "label": "53"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_293_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_294_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -1.03,
   "yaw": -0.29,
   "distance": 50
  }
 ],
 "id": "overlay_359471E3_2753_7360_41BB_EAE5F998FDD4",
 "data": {
  "label": "52"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_294_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_295_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -1.13,
   "yaw": -0.59,
   "distance": 50
  }
 ],
 "id": "overlay_35802043_2753_50A0_41B8_CA0C8E49A369",
 "data": {
  "label": "52"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_295_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_296_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.4,
   "yaw": -1.65,
   "distance": 50
  }
 ],
 "id": "overlay_35AF89E2_2753_5363_417A_1DC63FB4FD25",
 "data": {
  "label": "33"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_296_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_297_0.png",
      "width": 297,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   },
   "pitch": -1.19,
   "roll": 0,
   "yaw": -0.99
  }
 ],
 "id": "overlay_3513FB3C_276D_50E0_41C1_6C9235CA1F1E",
 "data": {
  "label": "52_2B-T2@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.79,
   "yaw": -0.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_297_1_0_map.gif",
      "width": 148,
      "class": "ImageResourceLevel",
      "height": 51
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_298_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.22,
   "yaw": -0.88,
   "distance": 50
  }
 ],
 "id": "overlay_35F4E8E9_276D_F160_418D_244C8257AE98",
 "data": {
  "label": "52"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_298_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_299_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 74
     }
    ]
   },
   "pitch": -0.96,
   "roll": 0,
   "yaw": -2.01
  }
 ],
 "id": "overlay_34C55AB3_276D_51E0_418D_F43392E42E6D",
 "data": {
  "label": "51_2B-T2"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -2.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_299_1_0_map.gif",
      "width": 35,
      "class": "ImageResourceLevel",
      "height": 37
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_300_0.png",
      "width": 300,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   },
   "pitch": -1.41,
   "roll": 0,
   "yaw": -1
  }
 ],
 "id": "overlay_35AB79BD_276F_53E0_41B9_EBD7E62630A8",
 "data": {
  "label": "33_2B-T2@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.8,
   "yaw": -1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_300_1_0_map.gif",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 51
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_301_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.22,
   "yaw": -1.63,
   "distance": 50
  }
 ],
 "id": "overlay_35D7B479_276F_3161_41A3_E304B7A5D9C2",
 "data": {
  "label": "52"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_301_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_302_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.58,
   "yaw": -1.4,
   "distance": 50
  }
 ],
 "id": "overlay_3462367F_276F_F161_41B7_E7CB1E2926BA",
 "data": {
  "label": "33"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_302_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_303_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.53,
   "yaw": -1.1,
   "distance": 50
  }
 ],
 "id": "overlay_34EB2109_276F_D0A1_41A6_EBE45DD79D5C",
 "data": {
  "label": "33"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -1.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_303_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_304_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.45,
   "yaw": -0.86,
   "distance": 50
  }
 ],
 "id": "overlay_34FAAEF8_276F_D160_41B2_FC42529A665E",
 "data": {
  "label": "33"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_304_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_305_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -0.7,
   "yaw": 1.42,
   "distance": 50
  }
 ],
 "id": "overlay_34CAFC59_276F_30A1_41B4_4CC1E36BC816",
 "data": {
  "label": "37"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_305_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_306_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.36,
   "yaw": -0.58,
   "distance": 50
  }
 ],
 "id": "overlay_34DFAC39_276F_50E1_41B1_18057AB317DA",
 "data": {
  "label": "33"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_306_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_307_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.25,
   "yaw": -0.29,
   "distance": 50
  }
 ],
 "id": "overlay_353E24E1_276F_5160_41B3_8720042FAD77",
 "data": {
  "label": "33"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_307_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_308_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.05,
   "yaw": 1.04,
   "distance": 50
  }
 ],
 "id": "overlay_356D0881_276F_31A1_41BF_41F4F4D0D34E",
 "data": {
  "label": "12"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_308_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_309_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.05,
   "yaw": 0.37,
   "distance": 50
  }
 ],
 "id": "overlay_3545EF7F_276C_EF60_41BD_BF5E6097006C",
 "data": {
  "label": "34"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_309_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_310_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -0.91,
   "yaw": 0.75,
   "distance": 50
  }
 ],
 "id": "overlay_35A8D737_276C_D0E1_41C2_FB4A2E89D72F",
 "data": {
  "label": "35"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_310_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_311_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -0.81,
   "yaw": 1.1,
   "distance": 50
  }
 ],
 "id": "overlay_358A3699_276D_31A1_41AF_2C0F6B720B47",
 "data": {
  "label": "36"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_311_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_312_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -0.59,
   "yaw": 1.78,
   "distance": 50
  }
 ],
 "id": "overlay_35F614F1_276D_7160_41C0_C45C5E15D948",
 "data": {
  "label": "38"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_312_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_313_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -0.49,
   "yaw": 2.05,
   "distance": 50
  }
 ],
 "id": "overlay_34629BFD_276D_3761_41B8_0DAB1DE43889",
 "data": {
  "label": "38"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_313_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_314_0.png",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 71
     }
    ]
   },
   "pitch": -1.17,
   "roll": 0,
   "yaw": -2.02
  }
 ],
 "id": "overlay_34DCC2DB_276D_51A1_41A4_973AB4F7EC9E",
 "data": {
  "label": "32_2B-T2"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.39,
   "yaw": -2.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_314_1_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_315_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.15,
   "yaw": 0.06,
   "distance": 50
  }
 ],
 "id": "overlay_358E806C_2773_5167_41AD_6648BB41E618",
 "data": {
  "label": "34"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_315_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_316_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.5,
   "yaw": -0.33,
   "distance": 50
  }
 ],
 "id": "overlay_35C11BE0_2773_7760_41BE_E99D4D5EF50A",
 "data": {
  "label": "14"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_316_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_317_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.4,
   "yaw": -0.02,
   "distance": 50
  }
 ],
 "id": "overlay_35D77342_2773_50A3_41B3_C270ABEA1729",
 "data": {
  "label": "14"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_317_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_318_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.27,
   "yaw": 0.36,
   "distance": 50
  }
 ],
 "id": "overlay_346186ED_2773_3160_41C0_BE532A2A5F48",
 "data": {
  "label": "13"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_318_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_319_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.17,
   "yaw": 0.67,
   "distance": 50
  }
 ],
 "id": "overlay_345CCE69_2773_3161_419F_A2D1056C6CD0",
 "data": {
  "label": "13"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_319_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_320_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -0.93,
   "yaw": 2.03,
   "distance": 50
  }
 ],
 "id": "overlay_34EDFF9B_2773_EFA1_4191_A31E7F86BE6D",
 "data": {
  "label": "01"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.03,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_320_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_321_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -0.94,
   "yaw": 1.35,
   "distance": 50
  }
 ],
 "id": "overlay_34D92012_2773_D0A3_41AD_3D30A937C3E0",
 "data": {
  "label": "12"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_321_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_322_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -0.82,
   "yaw": 1.73,
   "distance": 50
  }
 ],
 "id": "overlay_3539D881_2773_31A1_41C2_62D7ADCEC7D1",
 "data": {
  "label": "11"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_322_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_323_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -0.73,
   "yaw": 2.01,
   "distance": 50
  }
 ],
 "id": "overlay_351693B3_2773_77E1_4180_49F961DC0448",
 "data": {
  "label": "11"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_323_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_324_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.37,
   "yaw": 0.7,
   "distance": 50
  }
 ],
 "id": "overlay_35408954_2773_30A0_41BD_5BC59C52552E",
 "data": {
  "label": "03"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_324_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_325_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1,
   "yaw": 1.77,
   "distance": 50
  }
 ],
 "id": "overlay_35AF724E_2774_F0A3_41B9_7397A2E38005",
 "data": {
  "label": "01"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_325_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_326_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.14,
   "yaw": 1.41,
   "distance": 50
  }
 ],
 "id": "overlay_358C3371_2774_D760_415C_71D6F7D01D6A",
 "data": {
  "label": "02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_326_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_327_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.24,
   "yaw": 1.11,
   "distance": 50
  }
 ],
 "id": "overlay_35987B51_2774_D0A1_41A2_B075DA5B0BF0",
 "data": {
  "label": "02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 1.11,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_327_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_328_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.58,
   "yaw": 0.04,
   "distance": 50
  }
 ],
 "id": "overlay_35FBAC79_2775_3160_416E_21CF89EA7349",
 "data": {
  "label": "04"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_328_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_329_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.47,
   "yaw": 0.39,
   "distance": 50
  }
 ],
 "id": "overlay_35DAB872_2775_5163_41A5_CE304C287ACE",
 "data": {
  "label": "03"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 0.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_329_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_330_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -1.7,
   "yaw": -0.27,
   "distance": 50
  }
 ],
 "id": "overlay_34FDF19A_2775_53A3_41AA_7E987797CC3C",
 "data": {
  "label": "04"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": -0.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_1_HS_330_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_331_0.png",
      "width": 154,
      "class": "ImageResourceLevel",
      "height": 50
     }
    ]
   },
   "pitch": -1.43,
   "roll": 0,
   "yaw": 3.61
  }
 ],
 "id": "overlay_32C07058_276D_50A0_41C0_7F626D57700F",
 "data": {
  "label": "22_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.93,
   "yaw": 3.61,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_331_1_0_map.gif",
      "width": 77,
      "class": "ImageResourceLevel",
      "height": 25
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_332_0.png",
      "width": 154,
      "class": "ImageResourceLevel",
      "height": 50
     }
    ]
   },
   "pitch": -1.43,
   "roll": 0,
   "yaw": 3.61
  }
 ],
 "id": "overlay_32A630F3_276D_3161_41BC_0850385B02A4",
 "data": {
  "label": "22_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.93,
   "yaw": 3.61,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_332_1_0_map.gif",
      "width": 77,
      "class": "ImageResourceLevel",
      "height": 25
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_333_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 57
     }
    ]
   },
   "pitch": -1.34,
   "roll": 0,
   "yaw": 2.77
  }
 ],
 "id": "overlay_330F3591_276F_F3A0_41A0_3CED4327AC5C",
 "data": {
  "label": "40_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.91,
   "yaw": 2.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_333_1_0_map.gif",
      "width": 75,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_334_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 57
     }
    ]
   },
   "pitch": -1.34,
   "roll": 0,
   "yaw": 2.77
  }
 ],
 "id": "overlay_33A59611_276F_50A1_41B4_4E18A390BF60",
 "data": {
  "label": "40_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.91,
   "yaw": 2.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_334_1_0_map.gif",
      "width": 75,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_335_0.png",
      "width": 155,
      "class": "ImageResourceLevel",
      "height": 50
     }
    ]
   },
   "pitch": -1.2,
   "roll": 0,
   "yaw": 3.62
  }
 ],
 "id": "overlay_32BDEA78_276C_F160_41B9_4DBFC3EDF584",
 "data": {
  "label": "41_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.94,
   "yaw": 3.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_335_1_0_map.gif",
      "width": 77,
      "class": "ImageResourceLevel",
      "height": 25
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_336_0.png",
      "width": 155,
      "class": "ImageResourceLevel",
      "height": 50
     }
    ]
   },
   "pitch": -1.2,
   "roll": 0,
   "yaw": 3.62
  }
 ],
 "id": "overlay_32DB0979_276D_7361_41B3_D76D6C91ABDA",
 "data": {
  "label": "41_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.94,
   "yaw": 3.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_336_1_0_map.gif",
      "width": 77,
      "class": "ImageResourceLevel",
      "height": 25
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_337_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 57
     }
    ]
   },
   "pitch": -1.12,
   "roll": 0,
   "yaw": 2.78
  }
 ],
 "id": "overlay_35DE6D91_276D_33A0_418F_4159E4361CD9",
 "data": {
  "label": "59_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.9,
   "yaw": 2.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_337_1_0_map.gif",
      "width": 75,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_338_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 57
     }
    ]
   },
   "pitch": -1.12,
   "roll": 0,
   "yaw": 2.78
  }
 ],
 "id": "overlay_32B3A600_276D_509F_41B2_965CDF3F22A4",
 "data": {
  "label": "59_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.9,
   "yaw": 2.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_338_1_0_map.gif",
      "width": 75,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_339_0.png",
      "width": 158,
      "class": "ImageResourceLevel",
      "height": 52
     }
    ]
   },
   "pitch": -0.98,
   "roll": 0,
   "yaw": 3.64
  }
 ],
 "id": "overlay_32C2ED68_2753_336F_41C1_27391AA2A301",
 "data": {
  "label": "60_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.95,
   "yaw": 3.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_339_1_0_map.gif",
      "width": 79,
      "class": "ImageResourceLevel",
      "height": 26
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_340_0.png",
      "width": 158,
      "class": "ImageResourceLevel",
      "height": 52
     }
    ]
   },
   "pitch": -0.98,
   "roll": 0,
   "yaw": 3.64
  }
 ],
 "id": "overlay_3309EA30_2753_50E0_41BF_6DE3A1F9B51C",
 "data": {
  "label": "60_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.95,
   "yaw": 3.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_340_1_0_map.gif",
      "width": 79,
      "class": "ImageResourceLevel",
      "height": 26
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_341_0.png",
      "width": 153,
      "class": "ImageResourceLevel",
      "height": 56
     }
    ]
   },
   "pitch": -0.89,
   "roll": 0,
   "yaw": 2.79
  }
 ],
 "id": "overlay_32540B28_2753_D0EF_41B5_52964F0DD523",
 "data": {
  "label": "77_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.92,
   "yaw": 2.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_341_1_0_map.gif",
      "width": 76,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_342_0.png",
      "width": 153,
      "class": "ImageResourceLevel",
      "height": 56
     }
    ]
   },
   "pitch": -0.89,
   "roll": 0,
   "yaw": 2.79
  }
 ],
 "id": "overlay_32A95131_2753_50E0_4162_186393F4E10E",
 "data": {
  "label": "77_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.92,
   "yaw": 2.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_342_1_0_map.gif",
      "width": 76,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_343_0.png",
      "width": 155,
      "class": "ImageResourceLevel",
      "height": 52
     }
    ]
   },
   "pitch": -0.75,
   "roll": 0,
   "yaw": 3.65
  }
 ],
 "id": "overlay_32C291A8_2754_D3EF_41A9_43E056436EF4",
 "data": {
  "label": "78_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.94,
   "yaw": 3.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_343_1_0_map.gif",
      "width": 77,
      "class": "ImageResourceLevel",
      "height": 26
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_344_0.png",
      "width": 155,
      "class": "ImageResourceLevel",
      "height": 52
     }
    ]
   },
   "pitch": -0.75,
   "roll": 0,
   "yaw": 3.65
  }
 ],
 "id": "overlay_32249FC0_2755_2F9F_419D_EB474F5F68C8",
 "data": {
  "label": "78_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.94,
   "yaw": 3.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_344_1_0_map.gif",
      "width": 77,
      "class": "ImageResourceLevel",
      "height": 26
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_345_0.png",
      "width": 152,
      "class": "ImageResourceLevel",
      "height": 57
     }
    ]
   },
   "pitch": -0.66,
   "roll": 0,
   "yaw": 2.8
  }
 ],
 "id": "overlay_32AEEFF8_2755_2F6F_41A7_5F57D1D10D77",
 "data": {
  "label": "94_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.92,
   "yaw": 2.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_345_1_0_map.gif",
      "width": 76,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_346_0.png",
      "width": 152,
      "class": "ImageResourceLevel",
      "height": 57
     }
    ]
   },
   "pitch": -0.66,
   "roll": 0,
   "yaw": 2.8
  }
 ],
 "id": "overlay_32FF9AD9_2755_D1A0_41B8_5ED6E6F7D60C",
 "data": {
  "label": "94_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.92,
   "yaw": 2.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_346_1_0_map.gif",
      "width": 76,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_347_0.png",
      "width": 167,
      "class": "ImageResourceLevel",
      "height": 130
     }
    ]
   },
   "pitch": -0.27,
   "roll": 0,
   "yaw": 3.7
  }
 ],
 "id": "overlay_35FC9561_2757_F361_41AF_EB14839AA9D3",
 "data": {
  "label": "95_3B-T3D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1,
   "yaw": 3.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_347_1_0_map.gif",
      "width": 83,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_348_0.png",
      "width": 159,
      "class": "ImageResourceLevel",
      "height": 145
     }
    ]
   },
   "pitch": -0.17,
   "roll": 0,
   "yaw": 2.81
  }
 ],
 "id": "overlay_35E9B768_2755_3F6F_41BC_F0A74B7E4E3B",
 "data": {
  "label": "106_3B-T3D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.96,
   "yaw": 2.81,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_348_1_0_map.gif",
      "width": 79,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_349_0.png",
      "width": 159,
      "class": "ImageResourceLevel",
      "height": 145
     }
    ]
   },
   "pitch": -0.17,
   "roll": 0,
   "yaw": 2.81
  }
 ],
 "id": "overlay_32BCB738_2755_D0EF_41B4_77A8683673E4",
 "data": {
  "label": "106_3B-T3D@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.96,
   "yaw": 2.81,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_349_1_0_map.gif",
      "width": 79,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_350_0.png",
      "width": 167,
      "class": "ImageResourceLevel",
      "height": 130
     }
    ]
   },
   "pitch": -0.27,
   "roll": 0,
   "yaw": 3.7
  }
 ],
 "id": "overlay_3263FB37_2754_F0E0_41C2_F58480B49188",
 "data": {
  "label": "95_3B-T3D@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1,
   "yaw": 3.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_350_1_0_map.gif",
      "width": 83,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_351_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.42,
   "yaw": 3.01,
   "distance": 50
  }
 ],
 "id": "overlay_32F36DF2_2753_5363_41C0_6C377FB9316D",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.33,
   "yaw": 3.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_351_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_352_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": 0.6,
   "yaw": 2.06,
   "distance": 50
  }
 ],
 "id": "overlay_3307284F_2753_F0A1_41B0_A6BF99AFC995",
 "data": {
  "label": "104"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.33,
   "yaw": 2.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_352_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_353_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.12,
   "yaw": 2.62,
   "distance": 50
  }
 ],
 "id": "overlay_3239B277_2753_3160_41B6_A6E14111516D",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.33,
   "yaw": 2.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_353_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_354_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.17,
   "yaw": 3.02,
   "distance": 50
  }
 ],
 "id": "overlay_3207CB96_2753_37A0_41B6_847DCB41B858",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.33,
   "yaw": 3.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_354_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_355_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.5,
   "yaw": 3.93,
   "distance": 50
  }
 ],
 "id": "overlay_32097517_2753_50A1_418B_D8F14F05BB48",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_355_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_356_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.37,
   "yaw": 2.65,
   "distance": 50
  }
 ],
 "id": "overlay_32A9AA3F_2753_70E0_41BF_F181F24891AC",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.33,
   "yaw": 2.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_356_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_357_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.22,
   "yaw": 3.44,
   "distance": 50
  }
 ],
 "id": "overlay_32F02C71_2753_3160_41B1_5577CEF4A97A",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_357_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_358_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.24,
   "yaw": 3.72,
   "distance": 50
  }
 ],
 "id": "overlay_32ED84C8_275C_D1A0_41BE_EE12AAB636E9",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.72,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_358_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_359_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.2,
   "yaw": 3.99,
   "distance": 50
  }
 ],
 "id": "overlay_32DD0D3E_275C_D0E0_41AA_E4CDEA215AC9",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_359_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_360_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.49,
   "yaw": 3.69,
   "distance": 50
  }
 ],
 "id": "overlay_32CEB856_275C_F0A0_41B1_4AD1894BD876",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_360_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_361_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.47,
   "yaw": 3.44,
   "distance": 50
  }
 ],
 "id": "overlay_332F3626_275C_D0E0_41A7_1A9DE701623E",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_361_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_362_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.71,
   "yaw": 3.4,
   "distance": 50
  }
 ],
 "id": "overlay_325F7067_275D_5160_41B8_33114EB24299",
 "data": {
  "label": "78"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_362_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_363_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.87,
   "yaw": 2.64,
   "distance": 50
  }
 ],
 "id": "overlay_32A6F307_275D_50A0_41C0_A900FB7E187B",
 "data": {
  "label": "77"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_363_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_364_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.75,
   "yaw": 3.78,
   "distance": 50
  }
 ],
 "id": "overlay_32F5C483_275D_F1A1_41B6_F5CA390A29FA",
 "data": {
  "label": "78"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_364_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_365_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.67,
   "yaw": 3.03,
   "distance": 50
  }
 ],
 "id": "overlay_32CAE192_275D_33A3_4156_9CBF8442A161",
 "data": {
  "label": "94"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.03,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_365_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_366_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.64,
   "yaw": 2.67,
   "distance": 50
  }
 ],
 "id": "overlay_3336F576_275D_5360_41A3_69DE0E08F43D",
 "data": {
  "label": "94"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_366_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_367_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.89,
   "yaw": 2.99,
   "distance": 50
  }
 ],
 "id": "overlay_3315BBFE_275D_7763_41BF_E54B2C9FE1FF",
 "data": {
  "label": "77"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_367_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_368_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.94,
   "yaw": 3.41,
   "distance": 50
  }
 ],
 "id": "overlay_337DDD17_275D_50A1_41B0_79F08B5B304A",
 "data": {
  "label": "60"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_368_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_369_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -1.22,
   "yaw": 3.75,
   "distance": 50
  }
 ],
 "id": "overlay_3214EBBE_275C_D7E0_41A2_6BE39B1C4ED0",
 "data": {
  "label": "41"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_369_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_370_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -0.97,
   "yaw": 3.74,
   "distance": 50
  }
 ],
 "id": "overlay_32B4F76F_275C_DF60_41A9_C1431839E352",
 "data": {
  "label": "60"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_370_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_371_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -1.33,
   "yaw": 2.6,
   "distance": 50
  }
 ],
 "id": "overlay_329E5A10_275F_30BF_41AF_2F3BF541ED3D",
 "data": {
  "label": "40"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_371_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_372_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -1.17,
   "yaw": 3.45,
   "distance": 50
  }
 ],
 "id": "overlay_32855B40_275F_50A0_41C2_697886A5380A",
 "data": {
  "label": "41"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_372_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_373_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -1.13,
   "yaw": 3.02,
   "distance": 50
  }
 ],
 "id": "overlay_32EC7F20_275F_70E0_4195_1A7F871303E9",
 "data": {
  "label": "59"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_373_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_374_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -1.08,
   "yaw": 2.65,
   "distance": 50
  }
 ],
 "id": "overlay_32D502EF_275F_3161_41BD_8E45EAD6EBB9",
 "data": {
  "label": "59"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_374_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_375_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -1.43,
   "yaw": 3.73,
   "distance": 50
  }
 ],
 "id": "overlay_333176EF_275F_D160_41C1_7EBFB0F5261F",
 "data": {
  "label": "22"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_375_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_376_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -1.36,
   "yaw": 2.96,
   "distance": 50
  }
 ],
 "id": "overlay_3319662F_275F_F0E0_4199_40D392F356DF",
 "data": {
  "label": "40"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 2.96,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_376_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_377_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -1.4,
   "yaw": 3.38,
   "distance": 50
  }
 ],
 "id": "overlay_3216868E_275F_D1A0_41BC_66C05B9449F8",
 "data": {
  "label": "22"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.25,
   "yaw": 3.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_37E0BD13_24D4_F0A1_41B5_3DA5917B74D6_0_HS_377_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_184_0.png",
      "width": 861,
      "class": "ImageResourceLevel",
      "height": 576
     }
    ]
   },
   "pitch": 1.41,
   "roll": 0,
   "yaw": 4.64
  }
 ],
 "id": "overlay_34E3D708_2555_30A0_4176_8EA672AE63FE",
 "data": {
  "label": "102_4B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.16,
   "yaw": 4.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_184_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 133
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_185_0.png",
      "width": 480,
      "class": "ImageResourceLevel",
      "height": 262
     }
    ]
   },
   "pitch": 0.48,
   "roll": 0,
   "yaw": -0.79
  }
 ],
 "id": "overlay_3423E1B9_255C_F3E1_41BE_6864CFC4E075",
 "data": {
  "label": "101_2B-T7D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.88,
   "yaw": -0.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_185_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 109
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_186_0.png",
      "width": 480,
      "class": "ImageResourceLevel",
      "height": 262
     }
    ]
   },
   "pitch": 0.48,
   "roll": 0,
   "yaw": -0.79
  }
 ],
 "id": "overlay_37B123FA_255D_7763_41BA_C3223D51D2A3",
 "data": {
  "label": "101_2B-T7D@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.88,
   "yaw": -0.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_186_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 109
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_187_0.png",
      "width": 561,
      "class": "ImageResourceLevel",
      "height": 262
     }
    ]
   },
   "pitch": 0.49,
   "roll": 0,
   "yaw": -3.36
  }
 ],
 "id": "overlay_3551AA70_255D_717F_41A0_4AB4A6A7A462",
 "data": {
  "label": "100_2B-T7D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.37,
   "yaw": -3.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_187_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_188_0.png",
      "width": 561,
      "class": "ImageResourceLevel",
      "height": 262
     }
    ]
   },
   "pitch": 0.49,
   "roll": 0,
   "yaw": -3.36
  }
 ],
 "id": "overlay_340FCAAA_255C_F1E0_41C0_498A1367D687",
 "data": {
  "label": "100_2B-T7D2"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.37,
   "yaw": -3.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_188_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_189_0.png",
      "width": 564,
      "class": "ImageResourceLevel",
      "height": 257
     }
    ]
   },
   "pitch": 0.5,
   "roll": 0,
   "yaw": -6.22
  }
 ],
 "id": "overlay_34F3D22F_255F_50E0_41A6_CABE338D5793",
 "data": {
  "label": "99_2B-T7D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.38,
   "yaw": -6.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_189_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 90
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_190_0.png",
      "width": 564,
      "class": "ImageResourceLevel",
      "height": 257
     }
    ]
   },
   "pitch": 0.5,
   "roll": 0,
   "yaw": -6.22
  }
 ],
 "id": "overlay_347DA9F9_255D_3360_41B9_9D62EB022CC8",
 "data": {
  "label": "99_2B-T7D@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.38,
   "yaw": -6.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_190_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 90
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_191_0.png",
      "width": 920,
      "class": "ImageResourceLevel",
      "height": 259
     }
    ]
   },
   "pitch": 0.58,
   "roll": 0,
   "yaw": -10.43
  }
 ],
 "id": "overlay_351756C9_255D_D1A1_41B0_AF04622764FD",
 "data": {
  "label": "98_3B-T2D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.52,
   "yaw": -10.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_191_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 56
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_192_0.png",
      "width": 920,
      "class": "ImageResourceLevel",
      "height": 259
     }
    ]
   },
   "pitch": 0.58,
   "roll": 0,
   "yaw": -10.43
  }
 ],
 "id": "overlay_34C611A9_255D_33E1_4199_3917292455FF",
 "data": {
  "label": "98_3B-T2D@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.52,
   "yaw": -10.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_192_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 56
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_193_0.png",
      "width": 867,
      "class": "ImageResourceLevel",
      "height": 84
     }
    ]
   },
   "pitch": -0.65,
   "roll": 0,
   "yaw": -10.2
  }
 ],
 "id": "overlay_37A41EE0_2553_719F_41C0_5990F7F944A0",
 "data": {
  "label": "82_2B-T5"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.2,
   "yaw": -10.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_193_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_194_0.png",
      "width": 867,
      "class": "ImageResourceLevel",
      "height": 84
     }
    ]
   },
   "pitch": -0.65,
   "roll": 0,
   "yaw": -10.2
  }
 ],
 "id": "overlay_3545BF78_2553_EF6F_41C2_8213A0C3010B",
 "data": {
  "label": "82_2B-T5@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.2,
   "yaw": -10.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_194_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_195_0.png",
      "width": 303,
      "class": "ImageResourceLevel",
      "height": 83
     }
    ]
   },
   "pitch": -0.68,
   "roll": 0,
   "yaw": -6.8
  }
 ],
 "id": "overlay_3479C727_2553_30E0_41A3_30A8D7F52191",
 "data": {
  "label": "83_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.82,
   "yaw": -6.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_195_1_0_map.gif",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_196_0.png",
      "width": 303,
      "class": "ImageResourceLevel",
      "height": 83
     }
    ]
   },
   "pitch": -0.68,
   "roll": 0,
   "yaw": -6.8
  }
 ],
 "id": "overlay_341BFF66_2555_2F60_41C0_D4154D608864",
 "data": {
  "label": "83_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.82,
   "yaw": -6.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_196_1_0_map.gif",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_197_0.png",
      "width": 296,
      "class": "ImageResourceLevel",
      "height": 88
     }
    ]
   },
   "pitch": -0.69,
   "roll": 0,
   "yaw": -5.36
  }
 ],
 "id": "overlay_37954DBF_2554_D3E1_41B2_32487168CBEF",
 "data": {
  "label": "84_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.78,
   "yaw": -5.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_197_1_0_map.gif",
      "width": 148,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_198_0.png",
      "width": 296,
      "class": "ImageResourceLevel",
      "height": 88
     }
    ]
   },
   "pitch": -0.69,
   "roll": 0,
   "yaw": -5.36
  }
 ],
 "id": "overlay_350AA338_2557_30EF_41B9_5C847752758A",
 "data": {
  "label": "84_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.78,
   "yaw": -5.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_198_1_0_map.gif",
      "width": 148,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_199_0.png",
      "width": 524,
      "class": "ImageResourceLevel",
      "height": 96
     }
    ]
   },
   "pitch": -0.72,
   "roll": 0,
   "yaw": -3.31
  }
 ],
 "id": "overlay_340B2388_2557_D7A0_41B0_3CE8EAAB6EE4",
 "data": {
  "label": "85_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.14,
   "yaw": -3.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_199_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_200_0.png",
      "width": 524,
      "class": "ImageResourceLevel",
      "height": 96
     }
    ]
   },
   "pitch": -0.72,
   "roll": 0,
   "yaw": -3.31
  }
 ],
 "id": "overlay_379511A7_2557_33E0_41B9_095843D8741A",
 "data": {
  "label": "85_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.14,
   "yaw": -3.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_200_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_201_0.png",
      "width": 526,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   },
   "pitch": -0.72,
   "roll": 0,
   "yaw": -0.58
  }
 ],
 "id": "overlay_34C7681F_2555_70A1_41B3_84766CF6556D",
 "data": {
  "label": "86_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.16,
   "yaw": -0.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_201_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_202_0.png",
      "width": 526,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   },
   "pitch": -0.72,
   "roll": 0,
   "yaw": -0.58
  }
 ],
 "id": "overlay_34715FAF_2555_EFE1_41A4_F1A878166697",
 "data": {
  "label": "86_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.16,
   "yaw": -0.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_202_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_203_0.png",
      "width": 320,
      "class": "ImageResourceLevel",
      "height": 96
     }
    ]
   },
   "pitch": -0.72,
   "roll": 0,
   "yaw": 2.99
  }
 ],
 "id": "overlay_37F43AD0_2555_51BF_41C0_CC4C39AC18C5",
 "data": {
  "label": "87_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.92,
   "yaw": 2.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_203_1_0_map.gif",
      "width": 160,
      "class": "ImageResourceLevel",
      "height": 48
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_204_0.png",
      "width": 320,
      "class": "ImageResourceLevel",
      "height": 96
     }
    ]
   },
   "pitch": -0.72,
   "roll": 0,
   "yaw": 2.99
  }
 ],
 "id": "overlay_34DE2BDF_2554_F7A0_41BA_572F9E6D1AF9",
 "data": {
  "label": "87_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.92,
   "yaw": 2.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_204_1_0_map.gif",
      "width": 160,
      "class": "ImageResourceLevel",
      "height": 48
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_205_0.png",
      "width": 850,
      "class": "ImageResourceLevel",
      "height": 474
     }
    ]
   },
   "pitch": 0.39,
   "roll": 0,
   "yaw": 5.95
  }
 ],
 "id": "overlay_37903A7F_2553_5160_4195_49CEC27757A9",
 "data": {
  "label": "88_3B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.1,
   "yaw": 5.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_205_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 111
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_206_0.png",
      "width": 851,
      "class": "ImageResourceLevel",
      "height": 480
     }
    ]
   },
   "pitch": -0.27,
   "roll": 0,
   "yaw": 7.2
  }
 ],
 "id": "overlay_37806228_252D_50EF_41BF_3F86DEAFE588",
 "data": {
  "label": "70_3B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.1,
   "yaw": 7.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_206_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 112
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_207_0.png",
      "width": 548,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   },
   "pitch": -1.41,
   "roll": 0,
   "yaw": 3.65
  }
 ],
 "id": "overlay_36B3B5FF_252D_3360_41A3_83D58D7027E8",
 "data": {
  "label": "69_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.29,
   "yaw": 3.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_207_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_208_0.png",
      "width": 548,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   },
   "pitch": -1.41,
   "roll": 0,
   "yaw": 3.65
  }
 ],
 "id": "overlay_31C2E64C_252C_D0A7_41C0_176342CDC9EF",
 "data": {
  "label": "69_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.29,
   "yaw": 3.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_208_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_209_0.png",
      "width": 532,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   },
   "pitch": -1.41,
   "roll": 0,
   "yaw": -0.55
  }
 ],
 "id": "overlay_3116A2AF_2533_D1E0_417E_8B829010ED22",
 "data": {
  "label": "68_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.19,
   "yaw": -0.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_209_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_210_0.png",
      "width": 532,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   },
   "pitch": -1.41,
   "roll": 0,
   "yaw": -0.55
  }
 ],
 "id": "overlay_30B6D296_2533_51A3_41C0_23ACA7B5CA73",
 "data": {
  "label": "68_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.19,
   "yaw": -0.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_210_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_211_0.png",
      "width": 529,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -1.41,
   "roll": 0,
   "yaw": -3.24
  }
 ],
 "id": "overlay_3446FEA7_2534_F1E0_41B5_6D510DBEBD80",
 "data": {
  "label": "67_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.17,
   "yaw": -3.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_211_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_212_0.png",
      "width": 529,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -1.41,
   "roll": 0,
   "yaw": -3.24
  }
 ],
 "id": "overlay_343AE1FF_2535_D360_41B3_B1C4D0123E33",
 "data": {
  "label": "67_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.17,
   "yaw": -3.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_212_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_213_0.png",
      "width": 893,
      "class": "ImageResourceLevel",
      "height": 84
     }
    ]
   },
   "pitch": -1.34,
   "roll": 0,
   "yaw": -9.95
  }
 ],
 "id": "overlay_36CF6466_2534_F163_41A2_F4AC5EA2CF4E",
 "data": {
  "label": "64_2B-T5"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.36,
   "yaw": -9.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_213_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_214_0.png",
      "width": 893,
      "class": "ImageResourceLevel",
      "height": 84
     }
    ]
   },
   "pitch": -1.34,
   "roll": 0,
   "yaw": -9.95
  }
 ],
 "id": "overlay_34FB4CFE_2537_7163_4192_E992ED87F13A",
 "data": {
  "label": "64_2B-T5@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.36,
   "yaw": -9.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_214_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_215_0.png",
      "width": 297,
      "class": "ImageResourceLevel",
      "height": 82
     }
    ]
   },
   "pitch": -1.37,
   "roll": 0,
   "yaw": -6.71
  }
 ],
 "id": "overlay_345BB717_2537_D0A1_41B0_87DCEEBF44A8",
 "data": {
  "label": "65_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.78,
   "yaw": -6.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_215_1_0_map.gif",
      "width": 148,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_216_0.png",
      "width": 297,
      "class": "ImageResourceLevel",
      "height": 82
     }
    ]
   },
   "pitch": -1.37,
   "roll": 0,
   "yaw": -6.71
  }
 ],
 "id": "overlay_3426EE66_2537_7163_41BB_71C4A59A2E7D",
 "data": {
  "label": "65_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.78,
   "yaw": -6.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_216_1_0_map.gif",
      "width": 148,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_217_0.png",
      "width": 291,
      "class": "ImageResourceLevel",
      "height": 84
     }
    ]
   },
   "pitch": -1.39,
   "roll": 0,
   "yaw": -5.3
  }
 ],
 "id": "overlay_3780A277_2534_D161_41B4_1725345826DF",
 "data": {
  "label": "66_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.75,
   "yaw": -5.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_217_1_0_map.gif",
      "width": 145,
      "class": "ImageResourceLevel",
      "height": 42
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_218_0.png",
      "width": 291,
      "class": "ImageResourceLevel",
      "height": 84
     }
    ]
   },
   "pitch": -1.39,
   "roll": 0,
   "yaw": -5.3
  }
 ],
 "id": "overlay_376D5D9E_2535_53A3_419C_FD1EE538116A",
 "data": {
  "label": "66_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.75,
   "yaw": -5.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_218_1_0_map.gif",
      "width": 145,
      "class": "ImageResourceLevel",
      "height": 42
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_219_0.png",
      "width": 884,
      "class": "ImageResourceLevel",
      "height": 83
     }
    ]
   },
   "pitch": -2.02,
   "roll": 0,
   "yaw": -9.82
  }
 ],
 "id": "overlay_350E6F0E_253D_30A3_41B8_FAF9A744FB67",
 "data": {
  "label": "45_2B-T5"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.3,
   "yaw": -9.82,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_219_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_220_0.png",
      "width": 884,
      "class": "ImageResourceLevel",
      "height": 83
     }
    ]
   },
   "pitch": -2.02,
   "roll": 0,
   "yaw": -9.82
  }
 ],
 "id": "overlay_34B7FCAE_253D_31E3_41A6_AE5D21EA8154",
 "data": {
  "label": "45_2B-T5@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.3,
   "yaw": -9.82,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_220_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_221_0.png",
      "width": 295,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ]
   },
   "pitch": -2.05,
   "roll": 0,
   "yaw": -6.62
  }
 ],
 "id": "overlay_3420056E_253C_F360_41B6_2C625B4CD328",
 "data": {
  "label": "46_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.77,
   "yaw": -6.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_221_1_0_map.gif",
      "width": 147,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_222_0.png",
      "width": 295,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ]
   },
   "pitch": -2.05,
   "roll": 0,
   "yaw": -6.62
  }
 ],
 "id": "overlay_378B8C4D_253F_30A0_4150_D6552A1AB4F0",
 "data": {
  "label": "46_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.77,
   "yaw": -6.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_222_1_0_map.gif",
      "width": 147,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_223_0.png",
      "width": 287,
      "class": "ImageResourceLevel",
      "height": 83
     }
    ]
   },
   "pitch": -2.05,
   "roll": 0,
   "yaw": -5.23
  }
 ],
 "id": "overlay_3496B6B6_253F_D1E0_41B6_C639145FAAC6",
 "data": {
  "label": "47_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.72,
   "yaw": -5.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_223_1_0_map.gif",
      "width": 143,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_224_0.png",
      "width": 287,
      "class": "ImageResourceLevel",
      "height": 83
     }
    ]
   },
   "pitch": -2.05,
   "roll": 0,
   "yaw": -5.23
  }
 ],
 "id": "overlay_34206C55_253F_D0A0_41A2_4A95E3FF7539",
 "data": {
  "label": "47_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.72,
   "yaw": -5.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_224_1_0_map.gif",
      "width": 143,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_225_0.png",
      "width": 526,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   },
   "pitch": -2.08,
   "roll": 0,
   "yaw": -3.18
  }
 ],
 "id": "overlay_3787BB8E_253F_37A0_41B7_18A23357C9E2",
 "data": {
  "label": "48_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.16,
   "yaw": -3.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_225_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_226_0.png",
      "width": 526,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   },
   "pitch": -2.08,
   "roll": 0,
   "yaw": -3.18
  }
 ],
 "id": "overlay_37057E4F_253D_30A1_41A5_A367B9E4DCBA",
 "data": {
  "label": "48_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.16,
   "yaw": -3.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_226_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_227_0.png",
      "width": 523,
      "class": "ImageResourceLevel",
      "height": 92
     }
    ]
   },
   "pitch": -2.08,
   "roll": 0,
   "yaw": -0.54
  }
 ],
 "id": "overlay_365C05A6_253D_F3E0_41C0_230BC7D19563",
 "data": {
  "label": "49_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.14,
   "yaw": -0.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_227_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_228_0.png",
      "width": 523,
      "class": "ImageResourceLevel",
      "height": 92
     }
    ]
   },
   "pitch": -2.08,
   "roll": 0,
   "yaw": -0.54
  }
 ],
 "id": "overlay_3140C805_253D_50A0_41B9_C1872415402B",
 "data": {
  "label": "49_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.14,
   "yaw": -0.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_228_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_229_0.png",
      "width": 531,
      "class": "ImageResourceLevel",
      "height": 92
     }
    ]
   },
   "pitch": -2.08,
   "roll": 0,
   "yaw": 3.57
  }
 ],
 "id": "overlay_3478831E_2533_50A3_4191_8CDA4F82BBA6",
 "data": {
  "label": "50_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.19,
   "yaw": 3.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_229_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_230_0.png",
      "width": 531,
      "class": "ImageResourceLevel",
      "height": 92
     }
    ]
   },
   "pitch": -2.08,
   "roll": 0,
   "yaw": 3.57
  }
 ],
 "id": "overlay_378D0CE4_2534_F160_41C0_6754469CD4A8",
 "data": {
  "label": "50_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.19,
   "yaw": 3.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_230_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_231_0.png",
      "width": 837,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": -2.06,
   "roll": 0,
   "yaw": 7.13
  }
 ],
 "id": "overlay_365EE12E_2535_50E0_419F_7C9103A9A36B",
 "data": {
  "label": "51_2B-T2"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.02,
   "yaw": 7.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_231_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_232_0.png",
      "width": 824,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": -2.71,
   "roll": 0,
   "yaw": 7.05
  }
 ],
 "id": "overlay_376263CE_2537_57A3_41B4_CFAFD703BCB4",
 "data": {
  "label": "32_2B-T2"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.95,
   "yaw": 7.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_232_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 24
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_233_0.png",
      "width": 520,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   },
   "pitch": -2.73,
   "roll": 0,
   "yaw": 3.52
  }
 ],
 "id": "overlay_348C57FD_2535_3F60_41BE_5886122107C7",
 "data": {
  "label": "31_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.12,
   "yaw": 3.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_233_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_234_0.png",
      "width": 520,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   },
   "pitch": -2.73,
   "roll": 0,
   "yaw": 3.52
  }
 ],
 "id": "overlay_3422DC5D_2535_30A1_4196_1268BC147D99",
 "data": {
  "label": "31_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.12,
   "yaw": 3.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_234_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_235_0.png",
      "width": 515,
      "class": "ImageResourceLevel",
      "height": 90
     }
    ]
   },
   "pitch": -2.73,
   "roll": 0,
   "yaw": -0.54
  }
 ],
 "id": "overlay_37B1FB26_2535_50E0_41B7_0A14DB9D75E3",
 "data": {
  "label": "30_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.09,
   "yaw": -0.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_235_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_236_0.png",
      "width": 515,
      "class": "ImageResourceLevel",
      "height": 90
     }
    ]
   },
   "pitch": -2.73,
   "roll": 0,
   "yaw": -0.54
  }
 ],
 "id": "overlay_349E75EC_2534_D360_41A6_56224E227020",
 "data": {
  "label": "30_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.09,
   "yaw": -0.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_236_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_237_0.png",
      "width": 518,
      "class": "ImageResourceLevel",
      "height": 88
     }
    ]
   },
   "pitch": -2.73,
   "roll": 0,
   "yaw": -3.19
  }
 ],
 "id": "overlay_343B6CCD_2533_D1A0_41A0_7723E07728C6",
 "data": {
  "label": "29_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.11,
   "yaw": -3.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_237_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 33
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_238_0.png",
      "width": 518,
      "class": "ImageResourceLevel",
      "height": 88
     }
    ]
   },
   "pitch": -2.73,
   "roll": 0,
   "yaw": -3.19
  }
 ],
 "id": "overlay_379EECFC_2533_3160_41C2_43CD0AE3D5C1",
 "data": {
  "label": "29_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.11,
   "yaw": -3.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_238_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 33
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_239_0.png",
      "width": 283,
      "class": "ImageResourceLevel",
      "height": 82
     }
    ]
   },
   "pitch": -2.71,
   "roll": 0,
   "yaw": -5.15
  }
 ],
 "id": "overlay_343E187D_252D_7161_41C0_44EEF201DC98",
 "data": {
  "label": "28_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.7,
   "yaw": -5.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_239_1_0_map.gif",
      "width": 141,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_240_0.png",
      "width": 283,
      "class": "ImageResourceLevel",
      "height": 82
     }
    ]
   },
   "pitch": -2.71,
   "roll": 0,
   "yaw": -5.15
  }
 ],
 "id": "overlay_34AFD424_252F_30E7_41C2_AE604D46A1EC",
 "data": {
  "label": "28_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.7,
   "yaw": -5.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_240_1_0_map.gif",
      "width": 141,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_241_0.png",
      "width": 291,
      "class": "ImageResourceLevel",
      "height": 78
     }
    ]
   },
   "pitch": -2.7,
   "roll": 0,
   "yaw": -6.53
  }
 ],
 "id": "overlay_34217B05_252F_50A0_41AB_3490A8DFDFDC",
 "data": {
  "label": "27_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.75,
   "yaw": -6.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_241_1_0_map.gif",
      "width": 145,
      "class": "ImageResourceLevel",
      "height": 39
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_242_0.png",
      "width": 291,
      "class": "ImageResourceLevel",
      "height": 78
     }
    ]
   },
   "pitch": -2.7,
   "roll": 0,
   "yaw": -6.53
  }
 ],
 "id": "overlay_37E963EC_252F_3767_41B4_27993E1175A5",
 "data": {
  "label": "27_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.75,
   "yaw": -6.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_242_1_0_map.gif",
      "width": 145,
      "class": "ImageResourceLevel",
      "height": 39
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_243_0.png",
      "width": 867,
      "class": "ImageResourceLevel",
      "height": 79
     }
    ]
   },
   "pitch": -2.66,
   "roll": 0,
   "yaw": -9.7
  }
 ],
 "id": "overlay_34CB5AF5_252D_5160_41BE_94434CE482DE",
 "data": {
  "label": "26_2B-T5"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.2,
   "yaw": -9.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_243_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_244_0.png",
      "width": 867,
      "class": "ImageResourceLevel",
      "height": 79
     }
    ]
   },
   "pitch": -2.66,
   "roll": 0,
   "yaw": -9.7
  }
 ],
 "id": "overlay_3418C344_252D_30A0_41B3_52318AA3B100",
 "data": {
  "label": "26_2B-T5@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.2,
   "yaw": -9.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_244_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_245_0.png",
      "width": 839,
      "class": "ImageResourceLevel",
      "height": 96
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": -9.34
  }
 ],
 "id": "overlay_371652AD_24D5_D1E1_419A_263D2B25E1C0",
 "data": {
  "label": "21_2B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.03,
   "yaw": -9.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_245_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_246_0.png",
      "width": 839,
      "class": "ImageResourceLevel",
      "height": 96
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": -9.34
  }
 ],
 "id": "overlay_36A431B9_24D5_73E0_4199_529F51E52867",
 "data": {
  "label": "21_2B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.03,
   "yaw": -9.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_246_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_247_0.png",
      "width": 306,
      "class": "ImageResourceLevel",
      "height": 92
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": -6.39
  }
 ],
 "id": "overlay_31F8F8CD_24D4_D1A1_41AA_5981931EC849",
 "data": {
  "label": "20_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.84,
   "yaw": -6.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_247_1_0_map.gif",
      "width": 153,
      "class": "ImageResourceLevel",
      "height": 46
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_248_0.png",
      "width": 306,
      "class": "ImageResourceLevel",
      "height": 92
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": -6.39
  }
 ],
 "id": "overlay_3118D54B_24D7_50A0_41C0_3C0636999D89",
 "data": {
  "label": "20_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.84,
   "yaw": -6.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_248_1_0_map.gif",
      "width": 153,
      "class": "ImageResourceLevel",
      "height": 46
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_249_0.png",
      "width": 288,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": -4.95
  }
 ],
 "id": "overlay_341385C5_24D7_33A1_41B3_0C84702C66EA",
 "data": {
  "label": "19_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.73,
   "yaw": -4.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_249_1_0_map.gif",
      "width": 144,
      "class": "ImageResourceLevel",
      "height": 46
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_250_0.png",
      "width": 288,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": -4.95
  }
 ],
 "id": "overlay_37C6104B_24D7_30A0_41B5_9815C2A58CCF",
 "data": {
  "label": "19_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.73,
   "yaw": -4.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_250_1_0_map.gif",
      "width": 144,
      "class": "ImageResourceLevel",
      "height": 46
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_251_0.png",
      "width": 522,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": -3.08
  }
 ],
 "id": "overlay_375BBB3C_24D5_50E0_419E_704D1814D894",
 "data": {
  "label": "18_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.13,
   "yaw": -3.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_251_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_252_0.png",
      "width": 522,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": -3.08
  }
 ],
 "id": "overlay_36D6C3EB_24D5_D761_41BB_688075D46EBC",
 "data": {
  "label": "18_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.13,
   "yaw": -3.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_252_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_253_0.png",
      "width": 513,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": -0.5
  }
 ],
 "id": "overlay_36529FCC_24D5_2FA7_41C2_AFA1D0E2455E",
 "data": {
  "label": "17_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.08,
   "yaw": -0.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_253_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_254_0.png",
      "width": 513,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": -0.5
  }
 ],
 "id": "overlay_3450D59C_24D5_53A7_41BC_FBFEE546FF92",
 "data": {
  "label": "17_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.08,
   "yaw": -0.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_254_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_255_0.png",
      "width": 308,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": 2.86
  }
 ],
 "id": "overlay_37D06C8C_24D3_51A7_41C2_0F6E86D65FCC",
 "data": {
  "label": "16_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.85,
   "yaw": 2.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_255_1_0_map.gif",
      "width": 154,
      "class": "ImageResourceLevel",
      "height": 46
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_256_0.png",
      "width": 308,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": 2.86
  }
 ],
 "id": "overlay_378027A2_24D3_DFE0_41AA_BE6CA8092D9C",
 "data": {
  "label": "16_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.85,
   "yaw": 2.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_256_1_0_map.gif",
      "width": 154,
      "class": "ImageResourceLevel",
      "height": 46
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_257_0.png",
      "width": 507,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": 4.75
  }
 ],
 "id": "overlay_372D040C_24D3_50A7_41BE_4D77F5FB1AD7",
 "data": {
  "label": "15_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.04,
   "yaw": 4.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_257_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_258_0.png",
      "width": 507,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ]
   },
   "pitch": -3.39,
   "roll": 0,
   "yaw": 4.75
  }
 ],
 "id": "overlay_347007EC_24DD_5F60_41BB_E8C2D9B84C82",
 "data": {
  "label": "15_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.04,
   "yaw": 4.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_258_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_259_0.png",
      "width": 250,
      "class": "ImageResourceLevel",
      "height": 107
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": -6.48
  }
 ],
 "id": "overlay_31ED1732_24F3_D0E0_41C0_E7405D11DE27",
 "data": {
  "label": "10_ST1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.5,
   "yaw": -6.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_259_1_0_map.gif",
      "width": 125,
      "class": "ImageResourceLevel",
      "height": 53
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_260_0.png",
      "width": 250,
      "class": "ImageResourceLevel",
      "height": 107
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": -6.48
  }
 ],
 "id": "overlay_3159C1DA_24F3_33A3_41A6_02FFEECBDD45",
 "data": {
  "label": "10_ST1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.5,
   "yaw": -6.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_260_1_0_map.gif",
      "width": 125,
      "class": "ImageResourceLevel",
      "height": 53
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_261_0.png",
      "width": 262,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": -5.06
  }
 ],
 "id": "overlay_37D099FA_24FD_5360_41BB_DC08475D8F2D",
 "data": {
  "label": "9_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.57,
   "yaw": -5.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_261_1_0_map.gif",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 53
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_262_0.png",
      "width": 262,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": -5.06
  }
 ],
 "id": "overlay_377679E2_24FD_D360_41BC_B18A491D2055",
 "data": {
  "label": "9_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.57,
   "yaw": -5.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_262_1_0_map.gif",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 53
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_263_0.png",
      "width": 473,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": -3.15
  }
 ],
 "id": "overlay_369EFE3A_24FC_D0E0_41A0_C19A1CB6E769",
 "data": {
  "label": "8_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.84,
   "yaw": -3.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_263_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_264_0.png",
      "width": 473,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": -3.15
  }
 ],
 "id": "overlay_360869A1_24FF_73E1_41BD_67B87C202C63",
 "data": {
  "label": "8_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.84,
   "yaw": -3.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_264_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 44
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_265_0.png",
      "width": 507,
      "class": "ImageResourceLevel",
      "height": 107
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": -0.49
  }
 ],
 "id": "overlay_37EAD68A_24FC_D1A0_417F_6FCD9A2FCE52",
 "data": {
  "label": "7_1B-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.05,
   "yaw": -0.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_265_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_266_0.png",
      "width": 507,
      "class": "ImageResourceLevel",
      "height": 107
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": -0.49
  }
 ],
 "id": "overlay_37616399_24FD_57A0_41BA_0B58138CBCBE",
 "data": {
  "label": "7_1B-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.05,
   "yaw": -0.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_266_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_267_0.png",
      "width": 298,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": 2.8
  }
 ],
 "id": "overlay_37141DEA_24FD_F363_41C2_1ACA181D927B",
 "data": {
  "label": "6_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.79,
   "yaw": 2.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_267_1_0_map.gif",
      "width": 149,
      "class": "ImageResourceLevel",
      "height": 53
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_268_0.png",
      "width": 298,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": 2.8
  }
 ],
 "id": "overlay_3699D67A_24FD_7163_4178_9173727B0416",
 "data": {
  "label": "6_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.79,
   "yaw": 2.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_268_1_0_map.gif",
      "width": 149,
      "class": "ImageResourceLevel",
      "height": 53
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_269_0.png",
      "width": 430,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": 4.5
  }
 ],
 "id": "overlay_342AF752_24FC_D0A3_41B3_F406D531EDAE",
 "data": {
  "label": "5_15-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.58,
   "yaw": 4.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_269_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 49
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_270_0.png",
      "width": 430,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -3.97,
   "roll": 0,
   "yaw": 4.5
  }
 ],
 "id": "overlay_37C97B09_24F4_D0A0_41BC_3DA98A1870C3",
 "data": {
  "label": "5_15-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.58,
   "yaw": 4.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_270_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 49
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_271_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.94,
   "yaw": -1.6,
   "distance": 50
  }
 ],
 "id": "overlay_36AEFF22_24F5_30E3_4168_779F380D91BD",
 "data": {
  "label": "101"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -1.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_271_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_272_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 1.41,
   "yaw": 5.37,
   "distance": 50
  }
 ],
 "id": "overlay_312A226F_24F7_5160_4198_7ED24620B9E7",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 5.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_272_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_273_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.1,
   "yaw": 0,
   "distance": 50
  }
 ],
 "id": "overlay_311D51DF_24F7_33A0_41C1_2705D4B85E05",
 "data": {
  "label": "101"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 0,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_273_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_274_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.92,
   "yaw": -0.8,
   "distance": 50
  }
 ],
 "id": "overlay_30D058D0_24F7_D1BF_4195_4B4F655FBA5E",
 "data": {
  "label": "101"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -0.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_274_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_275_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.09,
   "yaw": -0.86,
   "distance": 50
  }
 ],
 "id": "overlay_30B0D2B0_24F7_F1E0_4189_BA109155663E",
 "data": {
  "label": "101"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -0.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_275_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_276_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.08,
   "yaw": -1.57,
   "distance": 50
  }
 ],
 "id": "overlay_30963B48_24F7_F0A0_41AE_8E3F261FFEDD",
 "data": {
  "label": "101"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -1.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_276_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_277_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.93,
   "yaw": -5.49,
   "distance": 50
  }
 ],
 "id": "overlay_302242A8_24F7_51EF_41B7_BA6F682765EB",
 "data": {
  "label": "99"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_277_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_278_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.94,
   "yaw": -2.76,
   "distance": 50
  }
 ],
 "id": "overlay_343890FF_24F7_5161_41B5_E05B56D44A5E",
 "data": {
  "label": "100"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -2.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_278_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_279_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.94,
   "yaw": -3.6,
   "distance": 50
  }
 ],
 "id": "overlay_37E60960_24F7_509F_41B8_73E1E6EF203B",
 "data": {
  "label": "100"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -3.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_279_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_280_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.04,
   "yaw": -2.67,
   "distance": 50
  }
 ],
 "id": "overlay_37F40427_24F7_30E1_41B4_2023E5E8D307",
 "data": {
  "label": "100"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -2.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_280_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_281_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.06,
   "yaw": -4.29,
   "distance": 50
  }
 ],
 "id": "overlay_37B8C277_24F4_D161_41B1_8FAFFDB5C2E0",
 "data": {
  "label": "100"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -4.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_281_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_282_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.03,
   "yaw": -3.49,
   "distance": 50
  }
 ],
 "id": "overlay_378B4DAF_24F4_D3E0_41B1_116101402E60",
 "data": {
  "label": "100"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -3.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_282_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_283_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.93,
   "yaw": -4.41,
   "distance": 50
  }
 ],
 "id": "overlay_3766BAE7_24F4_D161_41B1_F51851C6BAF6",
 "data": {
  "label": "100"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -4.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_283_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_284_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.92,
   "yaw": -8.54,
   "distance": 50
  }
 ],
 "id": "overlay_37530C98_24F5_51AF_4195_60413AB55DE4",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -8.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_284_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_285_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.93,
   "yaw": -6.06,
   "distance": 50
  }
 ],
 "id": "overlay_37344CD7_24F5_71A1_416D_DFD10DDCE6B1",
 "data": {
  "label": "99"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_285_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_286_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.94,
   "yaw": -6.63,
   "distance": 50
  }
 ],
 "id": "overlay_3700C458_24F5_50AF_41BA_29414F89465B",
 "data": {
  "label": "99"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_286_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_287_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.92,
   "yaw": -7.3,
   "distance": 50
  }
 ],
 "id": "overlay_36EC8D27_24F5_50E1_41AC_F80BF62EBDD2",
 "data": {
  "label": "99"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -7.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_287_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_288_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.06,
   "yaw": -7.24,
   "distance": 50
  }
 ],
 "id": "overlay_36F625C0_24F5_339F_4185_5FFEFBE5687C",
 "data": {
  "label": "99"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -7.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_288_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_289_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.09,
   "yaw": -6.55,
   "distance": 50
  }
 ],
 "id": "overlay_36C2DC88_24F5_31AF_41BA_23418F93DD7E",
 "data": {
  "label": "99"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_289_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_290_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.08,
   "yaw": -5.93,
   "distance": 50
  }
 ],
 "id": "overlay_36AA2508_24F5_D0AF_41AA_8146E6F8130B",
 "data": {
  "label": "99"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_290_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_291_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.09,
   "yaw": -5.32,
   "distance": 50
  }
 ],
 "id": "overlay_368FF375_24F5_F760_419C_1DAE85DD1EE4",
 "data": {
  "label": "99"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_291_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_292_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.99,
   "yaw": -11.47,
   "distance": 50
  }
 ],
 "id": "overlay_36463474_24F5_3160_41A3_B29600C79C97",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -11.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_292_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_293_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.94,
   "yaw": -9.37,
   "distance": 50
  }
 ],
 "id": "overlay_31E34817_24F5_50A1_4192_0BF0B2A310DE",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -9.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_293_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_294_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.94,
   "yaw": -10.06,
   "distance": 50
  }
 ],
 "id": "overlay_31C71EB8_24F5_51EF_41B6_978E3FB869D1",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_294_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_295_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.95,
   "yaw": -10.77,
   "distance": 50
  }
 ],
 "id": "overlay_31A82598_24F5_73AF_41C1_8D00A61F2FC3",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_295_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_296_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.14,
   "yaw": -12.26,
   "distance": 50
  }
 ],
 "id": "overlay_318BECE7_24F5_7160_41C2_E71E8A596E93",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -12.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_296_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_297_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.93,
   "yaw": -12.3,
   "distance": 50
  }
 ],
 "id": "overlay_314A5B98_24F5_37AF_41C2_092502132627",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -12.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_297_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_298_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.12,
   "yaw": -11.32,
   "distance": 50
  }
 ],
 "id": "overlay_312B939F_24F4_D7A0_418D_7C1971F7B91C",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -11.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_298_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_299_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.63,
   "yaw": -9.8,
   "distance": 50
  }
 ],
 "id": "overlay_3420EFA0_24F4_EF9F_41B4_33D5506C620B",
 "data": {
  "label": "82"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -9.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_299_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_300_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.1,
   "yaw": -10.63,
   "distance": 50
  }
 ],
 "id": "overlay_37C01F78_24F4_EF6F_41C2_26914F16EA85",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_300_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_301_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.12,
   "yaw": -9.93,
   "distance": 50
  }
 ],
 "id": "overlay_37D457C7_24F4_DFA0_41AA_E17CAC65E7AC",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -9.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_301_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_302_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.1,
   "yaw": -9.24,
   "distance": 50
  }
 ],
 "id": "overlay_37A63267_24F3_3160_41B6_3806F5CA3D06",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -9.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_302_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_303_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.1,
   "yaw": -8.35,
   "distance": 50
  }
 ],
 "id": "overlay_37813727_24F3_70E0_4199_97FDD723D965",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -8.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_303_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_304_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.64,
   "yaw": -8.27,
   "distance": 50
  }
 ],
 "id": "overlay_375AD470_24F3_317F_41AD_0BD705BB3231",
 "data": {
  "label": "82"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -8.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_304_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_305_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.66,
   "yaw": -9.05,
   "distance": 50
  }
 ],
 "id": "overlay_372ACB97_24F3_37A0_4192_13C12945293D",
 "data": {
  "label": "82"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -9.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_305_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_306_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.63,
   "yaw": -10.47,
   "distance": 50
  }
 ],
 "id": "overlay_373D5117_24F3_D0A0_41B9_8DE00F4836A0",
 "data": {
  "label": "82"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_306_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_307_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.63,
   "yaw": -5.77,
   "distance": 50
  }
 ],
 "id": "overlay_37072CA8_24F3_D1EF_4172_FA4328D7B63C",
 "data": {
  "label": "84"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_307_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_308_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.61,
   "yaw": -11.19,
   "distance": 50
  }
 ],
 "id": "overlay_36ED29AA_24F3_F3E0_41AE_9DEA5F75CF72",
 "data": {
  "label": "82"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -11.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_308_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_309_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.6,
   "yaw": -12.15,
   "distance": 50
  }
 ],
 "id": "overlay_36C86FDD_24F3_2FA1_41B7_D445229EE671",
 "data": {
  "label": "82"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -12.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_309_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_310_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.65,
   "yaw": -7.15,
   "distance": 50
  }
 ],
 "id": "overlay_364B3C88_24EC_F1AF_41AA_DDFC1284D072",
 "data": {
  "label": "83"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -7.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_310_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_311_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.65,
   "yaw": -6.56,
   "distance": 50
  }
 ],
 "id": "overlay_362E2867_24EC_D160_41B6_E5D6E6BE4D45",
 "data": {
  "label": "83"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_311_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_312_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.65,
   "yaw": -3.49,
   "distance": 50
  }
 ],
 "id": "overlay_31EC012F_24ED_50E0_41C1_3A53FF7CF002",
 "data": {
  "label": "85"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -3.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_312_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_313_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.64,
   "yaw": -5.19,
   "distance": 50
  }
 ],
 "id": "overlay_3780DE37_24ED_70E0_41C0_69565AEEC2A6",
 "data": {
  "label": "84"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_313_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_314_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.65,
   "yaw": -4.23,
   "distance": 50
  }
 ],
 "id": "overlay_3767D417_24ED_30A1_41B3_345EE05BAC65",
 "data": {
  "label": "85"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -4.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_314_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_315_0.png",
      "width": 80,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.37,
   "yaw": 2.91,
   "distance": 50
  }
 ],
 "id": "overlay_37538C6E_24ED_3160_41C2_E8273D4A6373",
 "data": {
  "label": "69"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.49,
   "yaw": 2.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_315_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_316_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.67,
   "yaw": -2.59,
   "distance": 50
  }
 ],
 "id": "overlay_3738D26F_24ED_D160_41C1_28FC0FB5DC1A",
 "data": {
  "label": "85"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -2.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_316_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_317_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.66,
   "yaw": -1.56,
   "distance": 50
  }
 ],
 "id": "overlay_3716898F_24ED_33A1_41BA_2041C22AEDD2",
 "data": {
  "label": "86"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -1.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_317_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_318_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.68,
   "yaw": -0.86,
   "distance": 50
  }
 ],
 "id": "overlay_370461A0_24ED_53E0_41A4_651C94CF3567",
 "data": {
  "label": "86"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -0.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_318_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_319_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.65,
   "yaw": 0.06,
   "distance": 50
  }
 ],
 "id": "overlay_36F459E4_24ED_5360_41C2_BAC0ED827E53",
 "data": {
  "label": "86"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 0.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_319_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_320_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.66,
   "yaw": 7.09,
   "distance": 50
  }
 ],
 "id": "overlay_36C5AF0A_24ED_50A0_41C1_09C22A9A4391",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 7.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_320_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_321_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.38,
   "yaw": 0.1,
   "distance": 50
  }
 ],
 "id": "overlay_36A9054F_24EC_D0A0_41A6_CBA762498009",
 "data": {
  "label": "68"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 0.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_321_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.47,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_322_0.png",
      "width": 79,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.37,
   "yaw": 3.56,
   "distance": 50
  }
 ],
 "id": "overlay_3689B357_24EC_F0A0_41A5_4757F247B05A",
 "data": {
  "label": "69"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.47,
   "yaw": 3.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_322_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_323_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.38,
   "yaw": 5.5,
   "distance": 50
  }
 ],
 "id": "overlay_36646D7F_24EC_F361_41B1_EF5925F4169E",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 5.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_323_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_324_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.37,
   "yaw": -2.54,
   "distance": 50
  }
 ],
 "id": "overlay_37C0FDB8_24EF_33E0_419E_F5F63F1CBF2C",
 "data": {
  "label": "67"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -2.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_324_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_325_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.37,
   "yaw": -0.69,
   "distance": 50
  }
 ],
 "id": "overlay_37ADABB0_24EF_57FF_41B4_966DBD0AFF78",
 "data": {
  "label": "68"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -0.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_325_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_326_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.37,
   "yaw": -1.49,
   "distance": 50
  }
 ],
 "id": "overlay_379EE537_24EF_70E1_41C0_89984ABB8AD0",
 "data": {
  "label": "68"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -1.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_326_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_327_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.36,
   "yaw": -5.05,
   "distance": 50
  }
 ],
 "id": "overlay_377F0C77_24EF_5160_4178_705D9125AB11",
 "data": {
  "label": "66"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_327_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_328_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.36,
   "yaw": -3.32,
   "distance": 50
  }
 ],
 "id": "overlay_3751F969_24EF_3361_41AF_D85042E994BB",
 "data": {
  "label": "67"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -3.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_328_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_329_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.36,
   "yaw": -4.2,
   "distance": 50
  }
 ],
 "id": "overlay_374076E8_24EF_D16F_41A3_43378403E1CD",
 "data": {
  "label": "67"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -4.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_329_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_330_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.35,
   "yaw": -5.62,
   "distance": 50
  }
 ],
 "id": "overlay_373FA92B_24EF_F0E1_41A5_FFC3828639E3",
 "data": {
  "label": "66"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_330_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_331_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.32,
   "yaw": -8.89,
   "distance": 50
  }
 ],
 "id": "overlay_371A6125_24EF_30E0_419A_9DEF73D539A7",
 "data": {
  "label": "64"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -8.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_331_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_332_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.33,
   "yaw": -6.44,
   "distance": 50
  }
 ],
 "id": "overlay_36E0897F_24EF_5361_41BA_8758F44EB951",
 "data": {
  "label": "65"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_332_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_333_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.33,
   "yaw": -7.06,
   "distance": 50
  }
 ],
 "id": "overlay_36C435C7_24EF_53A1_41B6_812BDCD78AF3",
 "data": {
  "label": "65"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -7.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_333_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_334_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.32,
   "yaw": -8.06,
   "distance": 50
  }
 ],
 "id": "overlay_36AA18A7_24EF_31E0_41A4_55845FF51740",
 "data": {
  "label": "64"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -8.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_334_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_335_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.32,
   "yaw": -11.05,
   "distance": 50
  }
 ],
 "id": "overlay_368BE32F_24EC_D0E0_41B5_6D1EBF1689B1",
 "data": {
  "label": "64"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -11.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_335_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_336_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.32,
   "yaw": -9.6,
   "distance": 50
  }
 ],
 "id": "overlay_3447CF7A_24EC_EF63_41AF_03FC913C9EC0",
 "data": {
  "label": "64"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -9.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_336_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_337_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.3,
   "yaw": -10.33,
   "distance": 50
  }
 ],
 "id": "overlay_3400A71F_24EC_F0A0_41B6_63F799C49A87",
 "data": {
  "label": "64"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_337_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_338_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.98,
   "yaw": -10.31,
   "distance": 50
  }
 ],
 "id": "overlay_340D1E47_24EC_F0A0_41A4_6E36385ADF57",
 "data": {
  "label": "45"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_338_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_339_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.3,
   "yaw": -11.91,
   "distance": 50
  }
 ],
 "id": "overlay_37B11AC7_24ED_31A1_41B1_68F15157A8B2",
 "data": {
  "label": "64"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -11.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_339_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_340_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.98,
   "yaw": -11.89,
   "distance": 50
  }
 ],
 "id": "overlay_3764B57F_24ED_5361_41B6_60D458E63915",
 "data": {
  "label": "45"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -11.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_340_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_341_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.99,
   "yaw": -11.06,
   "distance": 50
  }
 ],
 "id": "overlay_37516CE7_24ED_5161_41BF_0352EE9D9349",
 "data": {
  "label": "45"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -11.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_341_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_342_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2,
   "yaw": -6.45,
   "distance": 50
  }
 ],
 "id": "overlay_374355F9_24ED_3360_41BA_275700C94B66",
 "data": {
  "label": "46"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_342_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_343_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2,
   "yaw": -9.58,
   "distance": 50
  }
 ],
 "id": "overlay_37375202_24ED_D0A0_4186_94B554D7B0BD",
 "data": {
  "label": "45"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -9.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_343_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_344_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.01,
   "yaw": -8.87,
   "distance": 50
  }
 ],
 "id": "overlay_3721E835_24ED_D0E1_41B0_DF8AD6EEFAAA",
 "data": {
  "label": "45"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -8.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_344_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_345_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.01,
   "yaw": -8.01,
   "distance": 50
  }
 ],
 "id": "overlay_37195289_24ED_F1A0_41B4_B896F5157DEA",
 "data": {
  "label": "45"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -8.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_345_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_346_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2,
   "yaw": -7.05,
   "distance": 50
  }
 ],
 "id": "overlay_36E63AB7_24ED_D1E1_41AF_9CD877E465A0",
 "data": {
  "label": "46"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -7.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_346_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_347_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.01,
   "yaw": -5.04,
   "distance": 50
  }
 ],
 "id": "overlay_36D9B5FF_24ED_3360_41B3_4101D19E92DE",
 "data": {
  "label": "47"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_347_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_348_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.98,
   "yaw": -5.6,
   "distance": 50
  }
 ],
 "id": "overlay_36ABBE77_24ED_5160_41B0_E6F650B20A0A",
 "data": {
  "label": "47"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_348_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_349_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.02,
   "yaw": -3.32,
   "distance": 50
  }
 ],
 "id": "overlay_3682461F_24ED_70A1_41BF_0ADB1203EC00",
 "data": {
  "label": "48"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -3.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_349_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_350_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.02,
   "yaw": -4.17,
   "distance": 50
  }
 ],
 "id": "overlay_37C36CF6_24ED_5160_41A4_D240FB10FC2F",
 "data": {
  "label": "48"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -4.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_350_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_351_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.02,
   "yaw": -2.56,
   "distance": 50
  }
 ],
 "id": "overlay_37B2140F_24ED_30A0_41A8_DF225459436A",
 "data": {
  "label": "48"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -2.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_351_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_352_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.05,
   "yaw": -1.49,
   "distance": 50
  }
 ],
 "id": "overlay_379DB63F_24EC_D0E0_41C0_E0CA503B846C",
 "data": {
  "label": "49"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -1.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_352_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_353_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.04,
   "yaw": 0.09,
   "distance": 50
  }
 ],
 "id": "overlay_374EB868_24EC_D16F_41AC_A786A06C5914",
 "data": {
  "label": "49"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 0.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_353_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_354_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.05,
   "yaw": -0.71,
   "distance": 50
  }
 ],
 "id": "overlay_373E74A3_24D3_31E0_41A0_D49432A3073D",
 "data": {
  "label": "49"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -0.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_354_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_355_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.04,
   "yaw": 4.25,
   "distance": 50
  }
 ],
 "id": "overlay_372CC3C3_24D3_57A0_41A4_BA406EB25395",
 "data": {
  "label": "50"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 4.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_355_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_356_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.05,
   "yaw": 2.85,
   "distance": 50
  }
 ],
 "id": "overlay_36FB3289_24D3_51A0_41A5_8C69140E3179",
 "data": {
  "label": "50"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 2.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_356_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_357_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.06,
   "yaw": 3.51,
   "distance": 50
  }
 ],
 "id": "overlay_36E41916_24D3_50A0_41B7_411B30D66747",
 "data": {
  "label": "50"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 3.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_357_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_358_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.72,
   "yaw": 4.24,
   "distance": 50
  }
 ],
 "id": "overlay_342FEC67_24D3_3161_41B1_8948CBE909E5",
 "data": {
  "label": "31"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 4.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_358_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_359_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.69,
   "yaw": -2.49,
   "distance": 50
  }
 ],
 "id": "overlay_37BC7EA7_24D4_D1E1_41BE_2738D0346DD7",
 "data": {
  "label": "29"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -2.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_359_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_360_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.69,
   "yaw": 3.5,
   "distance": 50
  }
 ],
 "id": "overlay_37ACABFF_24D4_F761_41AF_DB768096C412",
 "data": {
  "label": "31"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 3.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_360_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_361_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.7,
   "yaw": 2.73,
   "distance": 50
  }
 ],
 "id": "overlay_3780D05F_24D5_30A0_41A1_4ACECDD77503",
 "data": {
  "label": "31"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 2.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_361_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_362_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.69,
   "yaw": 0.18,
   "distance": 50
  }
 ],
 "id": "overlay_376F13CF_24D5_57A0_41BC_0B510E0C1281",
 "data": {
  "label": "30"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 0.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_362_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_363_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.69,
   "yaw": -0.63,
   "distance": 50
  }
 ],
 "id": "overlay_375DFE0F_24D5_50A1_41BA_2130E68D76AB",
 "data": {
  "label": "30"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -0.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_363_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_364_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.68,
   "yaw": -1.51,
   "distance": 50
  }
 ],
 "id": "overlay_374F17D0_24D5_7FA0_419B_E3A830240688",
 "data": {
  "label": "30"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -1.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_364_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_365_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.67,
   "yaw": -5.53,
   "distance": 50
  }
 ],
 "id": "overlay_372F8FC5_24D5_2FA1_41A3_15FCB1BEFCC1",
 "data": {
  "label": "28"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_365_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_366_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.69,
   "yaw": -3.24,
   "distance": 50
  }
 ],
 "id": "overlay_371ADAAA_24D5_31E3_41BF_5A8035519949",
 "data": {
  "label": "29"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -3.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_366_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_367_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.68,
   "yaw": -4.11,
   "distance": 50
  }
 ],
 "id": "overlay_36F0A69F_24D5_D1A1_41AA_367F14F5EB19",
 "data": {
  "label": "29"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -4.11,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_367_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_368_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.66,
   "yaw": -4.96,
   "distance": 50
  }
 ],
 "id": "overlay_36DE3D6F_24D5_F360_41AC_74D9B1F439FB",
 "data": {
  "label": "28"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -4.96,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_368_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_369_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.66,
   "yaw": -6.88,
   "distance": 50
  }
 ],
 "id": "overlay_36B7977E_24D5_DF60_41A9_C7C2B6B8C4B2",
 "data": {
  "label": "27"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_369_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_370_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.66,
   "yaw": -6.23,
   "distance": 50
  }
 ],
 "id": "overlay_37E36017_24D5_50A1_41B3_274CFDDF5C29",
 "data": {
  "label": "27"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_370_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_371_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.65,
   "yaw": -7.75,
   "distance": 50
  }
 ],
 "id": "overlay_37B54897_24D5_71A1_41BC_6C2CA42DD44E",
 "data": {
  "label": "26"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -7.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_371_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_372_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.64,
   "yaw": -8.7,
   "distance": 50
  }
 ],
 "id": "overlay_378A810F_24D5_30A0_41C0_A1685F6425FA",
 "data": {
  "label": "26"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -8.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_372_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_373_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.61,
   "yaw": -11.73,
   "distance": 50
  }
 ],
 "id": "overlay_377ACC4F_24D5_30A0_41C0_3971F70DD0A3",
 "data": {
  "label": "26"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -11.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_373_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_374_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.64,
   "yaw": -9.35,
   "distance": 50
  }
 ],
 "id": "overlay_376AE94E_24D4_D0A0_41A3_EAC36ACF9A1D",
 "data": {
  "label": "26"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -9.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_374_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_375_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.62,
   "yaw": -10.17,
   "distance": 50
  }
 ],
 "id": "overlay_3745472E_24D4_F0E0_418B_01D5892609A7",
 "data": {
  "label": "26"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_375_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_376_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.63,
   "yaw": -10.86,
   "distance": 50
  }
 ],
 "id": "overlay_374B0012_24D4_D0A3_41C2_1E33BEF7407C",
 "data": {
  "label": "26"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_376_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_377_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.63,
   "yaw": -10.86,
   "distance": 50
  }
 ],
 "id": "overlay_3718F5BC_24D7_73E7_41AF_087CA5AB7174",
 "data": {
  "label": "26"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_377_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_378_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.33,
   "yaw": -5.37,
   "distance": 50
  }
 ],
 "id": "overlay_370AEFE4_24D7_6F60_41B1_7683026A2DBA",
 "data": {
  "label": "19"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_378_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_379_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.38,
   "yaw": -11.34,
   "distance": 50
  }
 ],
 "id": "overlay_36C7B03F_24D7_D0E0_4162_EE66F657A177",
 "data": {
  "label": "21"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -11.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_379_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_380_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.35,
   "yaw": -10.78,
   "distance": 50
  }
 ],
 "id": "overlay_36B27620_24D7_D0E0_41C2_2369259C9C2E",
 "data": {
  "label": "21"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_380_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_381_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.35,
   "yaw": -10.08,
   "distance": 50
  }
 ],
 "id": "overlay_3694DDB1_24D7_D3E1_41C2_7B2103572135",
 "data": {
  "label": "21"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -10.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_381_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_382_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.37,
   "yaw": -9.31,
   "distance": 50
  }
 ],
 "id": "overlay_368F24F7_24D7_F161_41B0_CA7828EC2489",
 "data": {
  "label": "21"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -9.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_382_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_383_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.35,
   "yaw": -8.61,
   "distance": 50
  }
 ],
 "id": "overlay_34360DCF_24D7_F3A1_41B7_D719415A97A1",
 "data": {
  "label": "21"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -8.61,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_383_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_384_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.35,
   "yaw": -7.71,
   "distance": 50
  }
 ],
 "id": "overlay_340A9717_24D7_D0A1_41BF_83619931800A",
 "data": {
  "label": "21"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -7.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_384_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_385_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.36,
   "yaw": -6.77,
   "distance": 50
  }
 ],
 "id": "overlay_37733446_24D7_30A0_41A8_25792293FEA4",
 "data": {
  "label": "20"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_385_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_386_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.35,
   "yaw": -6.17,
   "distance": 50
  }
 ],
 "id": "overlay_37662C66_24D7_3160_41BB_CACBA4D684F4",
 "data": {
  "label": "20"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_386_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_387_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.34,
   "yaw": -4.9,
   "distance": 50
  }
 ],
 "id": "overlay_37581098_24D4_F1AF_4195_5C3EC2C452A0",
 "data": {
  "label": "19"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -4.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_387_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_388_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.33,
   "yaw": -4.1,
   "distance": 50
  }
 ],
 "id": "overlay_370DF5A4_24D4_D3E0_41B6_115E40236C7D",
 "data": {
  "label": "18"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -4.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_388_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_389_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.37,
   "yaw": -3.3,
   "distance": 50
  }
 ],
 "id": "overlay_36D0BFD7_24D5_2FA1_41C1_ED9A9E857266",
 "data": {
  "label": "18"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -3.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_389_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_390_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.35,
   "yaw": -2.49,
   "distance": 50
  }
 ],
 "id": "overlay_36B0A88F_24D5_71A1_41BC_88358564CEC6",
 "data": {
  "label": "18"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -2.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_390_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_391_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.36,
   "yaw": -1.43,
   "distance": 50
  }
 ],
 "id": "overlay_3694A6DF_24D5_51A1_41C0_07C3F36C84BB",
 "data": {
  "label": "17"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -1.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_391_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_392_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.34,
   "yaw": 2.44,
   "distance": 50
  }
 ],
 "id": "overlay_37758B68_24D5_D76F_4177_3F910956DA70",
 "data": {
  "label": "16"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 2.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_392_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_393_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.37,
   "yaw": -0.68,
   "distance": 50
  }
 ],
 "id": "overlay_3765E8A7_24D5_F1E1_41A5_B769DB0E0363",
 "data": {
  "label": "17"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -0.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_393_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_394_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.37,
   "yaw": -0.68,
   "distance": 50
  }
 ],
 "id": "overlay_372E53A6_24D4_D7E3_41B2_D30504BF7E74",
 "data": {
  "label": "17"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -0.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_394_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_395_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.35,
   "yaw": 0.17,
   "distance": 50
  }
 ],
 "id": "overlay_371F4ED4_24D4_D1A7_41BB_C49963C8BC9D",
 "data": {
  "label": "17"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 0.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_395_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_396_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.34,
   "yaw": 2.95,
   "distance": 50
  }
 ],
 "id": "overlay_36FBA8AD_24D4_D1E1_41AD_E3D9E89A3533",
 "data": {
  "label": "16"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 2.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_396_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_397_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.35,
   "yaw": 5.27,
   "distance": 50
  }
 ],
 "id": "overlay_36DBD1EE_24D3_5360_41B1_DB68A439BC00",
 "data": {
  "label": "15"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 5.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_397_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_398_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.33,
   "yaw": 3.83,
   "distance": 50
  }
 ],
 "id": "overlay_36B9C19F_24D3_73A1_41A0_470E8A1CC757",
 "data": {
  "label": "15"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 3.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_398_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_399_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.34,
   "yaw": 4.6,
   "distance": 50
  }
 ],
 "id": "overlay_3691CCEF_24D3_7160_41A6_F80D52190D55",
 "data": {
  "label": "15"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 4.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_399_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_400_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.92,
   "yaw": 5.28,
   "distance": 50
  }
 ],
 "id": "overlay_37934ED6_24D3_71A0_419E_D566AC880452",
 "data": {
  "label": "05"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 5.28,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_400_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_401_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.93,
   "yaw": 2.99,
   "distance": 50
  }
 ],
 "id": "overlay_37668B76_24D3_3760_4197_598D215AFF72",
 "data": {
  "label": "06"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 2.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_401_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_402_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.91,
   "yaw": 4.69,
   "distance": 50
  }
 ],
 "id": "overlay_375D7B06_24DC_D0A0_4192_3C8176FA89DC",
 "data": {
  "label": "05"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 4.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_402_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_403_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.91,
   "yaw": 4.02,
   "distance": 50
  }
 ],
 "id": "overlay_374AE38F_24DC_F7A1_41B1_AE741693EDEF",
 "data": {
  "label": "05"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 4.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_403_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_404_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.93,
   "yaw": 2.47,
   "distance": 50
  }
 ],
 "id": "overlay_371CEC61_24DC_D161_41C1_49B75907F775",
 "data": {
  "label": "06"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 2.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_404_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_405_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.9,
   "yaw": -0.5,
   "distance": 50
  }
 ],
 "id": "overlay_37052B2B_24DD_30E0_41C2_77EE7F8AEDB4",
 "data": {
  "label": "07"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -0.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_405_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_406_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.91,
   "yaw": 0.22,
   "distance": 50
  }
 ],
 "id": "overlay_36F5B4C6_24DD_51A0_41BD_C50097D4774D",
 "data": {
  "label": "07"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 0.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_406_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_407_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.93,
   "yaw": -1.27,
   "distance": 50
  }
 ],
 "id": "overlay_36AD7E66_24DD_5160_41B4_1095EBBA0A70",
 "data": {
  "label": "07"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -1.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_407_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_408_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.91,
   "yaw": -3.84,
   "distance": 50
  }
 ],
 "id": "overlay_3683966F_24DD_7161_41B6_A8EFF038F65C",
 "data": {
  "label": "08"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -3.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_408_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_409_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.91,
   "yaw": -2.33,
   "distance": 50
  }
 ],
 "id": "overlay_37AAAC5E_24DD_50A3_41AB_1C591722F7F5",
 "data": {
  "label": "08"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -2.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_409_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_410_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.9,
   "yaw": -3.02,
   "distance": 50
  }
 ],
 "id": "overlay_37A5968D_24DD_31A0_41AC_82045F03ED43",
 "data": {
  "label": "08"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -3.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_410_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_411_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.94,
   "yaw": -4.78,
   "distance": 50
  }
 ],
 "id": "overlay_379410DF_24DC_D1A1_41C0_FC7DCA8E506C",
 "data": {
  "label": "09"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -4.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_411_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_412_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.93,
   "yaw": -6.08,
   "distance": 50
  }
 ],
 "id": "overlay_3763C285_24DC_D1A0_41A3_DD51D2E42F32",
 "data": {
  "label": "10"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_412_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_413_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.93,
   "yaw": -5.36,
   "distance": 50
  }
 ],
 "id": "overlay_37529045_24D3_30A0_41C0_FA23D22F308C",
 "data": {
  "label": "09"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -5.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_413_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_414_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -3.95,
   "yaw": -6.67,
   "distance": 50
  }
 ],
 "id": "overlay_373CA80E_24D3_50A3_41B0_EF1AEA636F18",
 "data": {
  "label": "10"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": -6.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_414_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_415_0.png",
      "width": 824,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": -2.71,
   "roll": 0,
   "yaw": 7.05
  }
 ],
 "id": "overlay_359F583B_2775_70E1_41AF_FCB1C5E1ABF6",
 "data": {
  "label": "32_2B-T2@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.95,
   "yaw": 7.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_415_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 24
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_416_0.png",
      "width": 837,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": -2.06,
   "roll": 0,
   "yaw": 7.13
  }
 ],
 "id": "overlay_356A69A3_2774_D3E0_4196_6CBF169A7D9F",
 "data": {
  "label": "51_2B-T2@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.02,
   "yaw": 7.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_416_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_417_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.03,
   "yaw": 6.84,
   "distance": 50
  }
 ],
 "id": "overlay_35D345F9_2777_3361_4180_5809559DAF0B",
 "data": {
  "label": "51"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 6.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_417_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_418_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.05,
   "yaw": 5.38,
   "distance": 50
  }
 ],
 "id": "overlay_32765C79_2777_F161_4195_47014FC5B163",
 "data": {
  "label": "51"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 5.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_418_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_419_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.06,
   "yaw": 6.07,
   "distance": 50
  }
 ],
 "id": "overlay_34A2C638_2777_D0E0_417B_5421C1E171FF",
 "data": {
  "label": "51"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 6.07,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_419_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_420_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.03,
   "yaw": 8.35,
   "distance": 50
  }
 ],
 "id": "overlay_34998060_2777_3160_41C1_B1CAF1CECC25",
 "data": {
  "label": "51"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 8.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_420_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_421_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.03,
   "yaw": 7.58,
   "distance": 50
  }
 ],
 "id": "overlay_3534EF89_2777_2FA1_41C1_38198CA4B892",
 "data": {
  "label": "51"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 7.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_421_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_422_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.01,
   "yaw": 9.04,
   "distance": 50
  }
 ],
 "id": "overlay_353B6820_2777_50E0_41AD_8D6B8F138D88",
 "data": {
  "label": "51"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 9.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_422_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_423_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.68,
   "yaw": 6.08,
   "distance": 50
  }
 ],
 "id": "overlay_354D1111_2777_50A0_41BE_DFCCF97BE9F5",
 "data": {
  "label": "32"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 6.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_423_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_424_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.7,
   "yaw": 7.54,
   "distance": 50
  }
 ],
 "id": "overlay_355CCE91_2777_51A1_41B9_9E115EC72588",
 "data": {
  "label": "32"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 7.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_424_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_425_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.7,
   "yaw": 5.39,
   "distance": 50
  }
 ],
 "id": "overlay_358E726E_2774_F163_41B1_CA00C590CF13",
 "data": {
  "label": "32"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 5.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_425_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_426_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.68,
   "yaw": 6.76,
   "distance": 50
  }
 ],
 "id": "overlay_359109C1_2774_F3A0_41BA_FC2D1893DADF",
 "data": {
  "label": "32"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 6.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_426_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_427_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.68,
   "yaw": 9,
   "distance": 50
  }
 ],
 "id": "overlay_35E3916D_2774_D361_41A5_4A19139EF49F",
 "data": {
  "label": "32"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_427_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_428_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -2.67,
   "yaw": 8.29,
   "distance": 50
  }
 ],
 "id": "overlay_35FC6E23_2774_D0E1_41B9_E605F22D2081",
 "data": {
  "label": "32"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 8.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_428_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_429_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.92,
   "yaw": -0.05,
   "distance": 50
  }
 ],
 "id": "overlay_35079129_2775_D0E1_41C0_CDA809409AB6",
 "data": {
  "label": "101"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": -0.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_429_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_430_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.91,
   "yaw": 2.67,
   "distance": 50
  }
 ],
 "id": "overlay_35B26548_2775_70A0_41BD_6BC0887B6098",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 2.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_430_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_431_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.94,
   "yaw": 3.58,
   "distance": 50
  }
 ],
 "id": "overlay_3584BDC1_2775_73A1_419A_D991EEF39CC5",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 3.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_431_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_432_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.09,
   "yaw": 6.48,
   "distance": 50
  }
 ],
 "id": "overlay_358854E9_2775_5161_41A2_54699686F824",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 6.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_432_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_433_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 1.82,
   "yaw": 5.26,
   "distance": 50
  }
 ],
 "id": "overlay_35982E78_2775_5160_4198_16E0AE30D735",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 5.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_433_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_434_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 2.71,
   "yaw": 5.13,
   "distance": 50
  }
 ],
 "id": "overlay_35F0EE81_2775_31A0_4183_7E2FA3495AF1",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 5.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_434_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_435_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 2.25,
   "yaw": 5.22,
   "distance": 50
  }
 ],
 "id": "overlay_35C97E9E_2774_D1A3_41A4_76225F37499C",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 5.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_435_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_436_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.84,
   "yaw": 5.43,
   "distance": 50
  }
 ],
 "id": "overlay_32177AC6_2773_31A3_41AD_8A491BD1C4AD",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 5.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_436_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_437_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.96,
   "yaw": 4.5,
   "distance": 50
  }
 ],
 "id": "overlay_327BAFA0_2773_6FE0_41C0_7AEE1EC108A1",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 4.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_437_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_438_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.02,
   "yaw": 4.57,
   "distance": 50
  }
 ],
 "id": "overlay_3252D7E1_2773_7F61_41BC_4E3CB34DEDBD",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 4.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_438_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_439_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.05,
   "yaw": 3.69,
   "distance": 50
  }
 ],
 "id": "overlay_32B041FF_2773_5360_41B2_451896518074",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 3.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_439_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_440_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.06,
   "yaw": 2.8,
   "distance": 50
  }
 ],
 "id": "overlay_329F6B91_2773_57A1_41BB_1612AF5AEEA8",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 2.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_440_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_441_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.04,
   "yaw": 5.42,
   "distance": 50
  }
 ],
 "id": "overlay_32C58947_2773_30A0_41A5_CBD390324E52",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 5.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_441_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_442_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.6,
   "yaw": 6.46,
   "distance": 50
  }
 ],
 "id": "overlay_33276020_2773_D0E0_41AB_5D142E310A60",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 6.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_442_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_443_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 1.16,
   "yaw": 6.32,
   "distance": 50
  }
 ],
 "id": "overlay_336AA2B9_2773_F1E1_41B1_BA14B3BB66B0",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 6.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_443_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_444_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 1.79,
   "yaw": 6.18,
   "distance": 50
  }
 ],
 "id": "overlay_34AC3E61_2773_F160_41BE_03121E4CE2A4",
 "data": {
  "label": "102"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.66,
   "yaw": 6.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_444_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_445_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.7,
   "yaw": 2.85,
   "distance": 50
  }
 ],
 "id": "overlay_356CAB91_2773_77A0_41B9_6EBC0E795144",
 "data": {
  "label": "87"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 2.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_445_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_446_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.69,
   "yaw": 4.18,
   "distance": 50
  }
 ],
 "id": "overlay_35B03A63_277C_D161_419A_83B8FBCA0571",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.43,
   "yaw": 4.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_446_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_447_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.69,
   "yaw": 4.9,
   "distance": 50
  }
 ],
 "id": "overlay_358CC319_277C_F0A1_41BD_2F6CFA8A0C17",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 4.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_447_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_448_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.69,
   "yaw": 5.66,
   "distance": 50
  }
 ],
 "id": "overlay_35986A00_277C_F0A0_419F_70BDEAF67160",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 5.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_448_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_449_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.7,
   "yaw": 6.39,
   "distance": 50
  }
 ],
 "id": "overlay_35E92499_277C_D1A1_41B5_4D2E69F30316",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 6.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_449_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_450_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.61,
   "yaw": 7.46,
   "distance": 50
  }
 ],
 "id": "overlay_35F8EC6E_277C_D163_41C2_5AFEEAF0BFA6",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 7.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_450_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_451_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.39,
   "yaw": 7.69,
   "distance": 50
  }
 ],
 "id": "overlay_35DE0DFD_277D_3361_41A1_BC014B3E7BF5",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 7.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_451_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_452_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.12,
   "yaw": 7.62,
   "distance": 50
  }
 ],
 "id": "overlay_322CE541_277D_50A1_41B0_C135004AE50D",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 7.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_452_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_453_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 1.15,
   "yaw": 7.26,
   "distance": 50
  }
 ],
 "id": "overlay_32399B00_277D_509F_41B0_4B5795FC5F8E",
 "data": {
  "label": "88"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 7.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_453_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_454_0.png",
      "width": 75,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.36,
   "yaw": 4.3,
   "distance": 50
  }
 ],
 "id": "overlay_326A1888_277D_51A0_41B6_7E6405EE705B",
 "data": {
  "label": "69"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.45,
   "yaw": 4.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_454_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_455_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.38,
   "yaw": 7.04,
   "distance": 50
  }
 ],
 "id": "overlay_32BAE448_277D_D0A0_41A3_DB9F70854DA9",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 7.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_455_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_456_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.39,
   "yaw": 6.22,
   "distance": 50
  }
 ],
 "id": "overlay_34A9AF8E_277D_EFA3_4197_36A00F988113",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 6.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_456_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_457_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.3,
   "yaw": 8.57,
   "distance": 50
  }
 ],
 "id": "overlay_3494A6B9_277D_F1E1_418C_4A8F4CA7C069",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 8.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_457_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_458_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.39,
   "yaw": 7.73,
   "distance": 50
  }
 ],
 "id": "overlay_34DC5410_277D_D0A0_419B_5929F57846AA",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 7.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_458_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_459_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.37,
   "yaw": 8.41,
   "distance": 50
  }
 ],
 "id": "overlay_35283C80_277D_D1A0_41B2_80C9671E395A",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 8.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_459_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_460_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -1.15,
   "yaw": 9.03,
   "distance": 50
  }
 ],
 "id": "overlay_352353C8_277D_37A0_4155_0D30F5C975FC",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 9.03,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_460_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_461_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.6,
   "yaw": 8.9,
   "distance": 50
  }
 ],
 "id": "overlay_353F6D39_277D_30E1_41C0_EB29BD819AEA",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 8.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_461_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_462_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -0.14,
   "yaw": 8.73,
   "distance": 50
  }
 ],
 "id": "overlay_350CC468_277D_516F_41B0_BF5A953BCC1E",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 8.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_462_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_463_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": 0.8,
   "yaw": 8.37,
   "distance": 50
  }
 ],
 "id": "overlay_351CCEC9_277D_51A1_41B5_893DD2597EA1",
 "data": {
  "label": "70"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.42,
   "yaw": 8.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_348F7DB5_2554_D3E1_41A7_6F7DD4AB7153_1_HS_463_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_114_0.png",
      "width": 745,
      "class": "ImageResourceLevel",
      "height": 363
     }
    ]
   },
   "pitch": 2.8,
   "roll": 0,
   "yaw": -6.46
  }
 ],
 "id": "overlay_34A6AF3C_256D_50E7_4188_0CDCEE242F92",
 "data": {
  "label": "95_3B-T3D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.47,
   "yaw": -6.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_114_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 97
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_115_0.png",
      "width": 483,
      "class": "ImageResourceLevel",
      "height": 351
     }
    ]
   },
   "pitch": 2.28,
   "roll": 0,
   "yaw": -1.52
  }
 ],
 "id": "overlay_34B42562_256D_3360_4173_A781CA6E0290",
 "data": {
  "label": "96_2B-T7D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.9,
   "yaw": -1.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_115_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 145
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_116_0.png",
      "width": 483,
      "class": "ImageResourceLevel",
      "height": 351
     }
    ]
   },
   "pitch": 2.28,
   "roll": 0,
   "yaw": -1.52
  }
 ],
 "id": "overlay_341D76AA_256D_31E0_41B1_36D66D3ACACC",
 "data": {
  "label": "96_2B-T7D@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.9,
   "yaw": -1.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_116_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 145
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_117_0.png",
      "width": 1061,
      "class": "ImageResourceLevel",
      "height": 348
     }
    ]
   },
   "pitch": 2.02,
   "roll": 0,
   "yaw": 3.04
  }
 ],
 "id": "overlay_36B98063_2573_D161_41B4_66EC8C1A87C0",
 "data": {
  "label": "97_4B-T2"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.36,
   "yaw": 3.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_117_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_118_0.png",
      "width": 1061,
      "class": "ImageResourceLevel",
      "height": 348
     }
    ]
   },
   "pitch": 2.02,
   "roll": 0,
   "yaw": 3.04
  }
 ],
 "id": "overlay_34B78493_2573_31A0_41AB_C85FEAB04010",
 "data": {
  "label": "97_4B-T2@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.36,
   "yaw": 3.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_118_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_119_0.png",
      "width": 421,
      "class": "ImageResourceLevel",
      "height": 305
     }
    ]
   },
   "pitch": 2.28,
   "roll": 0,
   "yaw": 7.32
  }
 ],
 "id": "overlay_3733A95A_2575_30A0_419D_7AF447251EB3",
 "data": {
  "label": "98_3B-T2D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.53,
   "yaw": 7.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_119_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 144
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_120_0.png",
      "width": 722,
      "class": "ImageResourceLevel",
      "height": 196
     }
    ]
   },
   "pitch": 1.41,
   "roll": 0,
   "yaw": -6.32
  }
 ],
 "id": "overlay_345187EB_2577_7F61_41B8_5C95182400AE",
 "data": {
  "label": "78_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.33,
   "yaw": -6.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_120_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 54
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_121_0.png",
      "width": 244,
      "class": "ImageResourceLevel",
      "height": 142
     }
    ]
   },
   "pitch": 0.85,
   "roll": 0,
   "yaw": -2.2
  }
 ],
 "id": "overlay_34F38343_2575_D0A1_41B6_A575142E793F",
 "data": {
  "label": "79_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.46,
   "yaw": -2.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_121_1_0_map.gif",
      "width": 122,
      "class": "ImageResourceLevel",
      "height": 71
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_122_0.png",
      "width": 244,
      "class": "ImageResourceLevel",
      "height": 142
     }
    ]
   },
   "pitch": 0.85,
   "roll": 0,
   "yaw": -2.2
  }
 ],
 "id": "overlay_346FCC1E_2575_50A0_41BC_0BB50B19B413",
 "data": {
  "label": "79_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.46,
   "yaw": -2.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_122_1_0_map.gif",
      "width": 122,
      "class": "ImageResourceLevel",
      "height": 71
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_123_0.png",
      "width": 250,
      "class": "ImageResourceLevel",
      "height": 137
     }
    ]
   },
   "pitch": 0.67,
   "roll": 0,
   "yaw": -0.79
  }
 ],
 "id": "overlay_3542A773_2574_FF61_41BF_41FDD2455D9A",
 "data": {
  "label": "80_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.51,
   "yaw": -0.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_123_1_0_map.gif",
      "width": 125,
      "class": "ImageResourceLevel",
      "height": 68
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_124_0.png",
      "width": 250,
      "class": "ImageResourceLevel",
      "height": 137
     }
    ]
   },
   "pitch": 0.67,
   "roll": 0,
   "yaw": -0.79
  }
 ],
 "id": "overlay_34CD1F82_2573_6FA3_41B1_14B77C88EE66",
 "data": {
  "label": "80_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.51,
   "yaw": -0.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_124_1_0_map.gif",
      "width": 125,
      "class": "ImageResourceLevel",
      "height": 68
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_125_0.png",
      "width": 1037,
      "class": "ImageResourceLevel",
      "height": 154
     }
    ]
   },
   "pitch": 0.48,
   "roll": 0,
   "yaw": 3
  }
 ],
 "id": "overlay_37B7213A_2573_70E3_41BE_1863BAE7D818",
 "data": {
  "label": "81_2B-T10"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.22,
   "yaw": 3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_125_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 29
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_126_0.png",
      "width": 1037,
      "class": "ImageResourceLevel",
      "height": 154
     }
    ]
   },
   "pitch": 0.48,
   "roll": 0,
   "yaw": 3
  }
 ],
 "id": "overlay_34A294A9_257C_F1E0_41B9_DD010A80B473",
 "data": {
  "label": "81_2B-T10@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.22,
   "yaw": 3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_126_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 29
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_127_0.png",
      "width": 389,
      "class": "ImageResourceLevel",
      "height": 116
     }
    ]
   },
   "pitch": 0.78,
   "roll": 0,
   "yaw": 7.19
  }
 ],
 "id": "overlay_342AF9C1_257D_73A0_4186_6D7ED4E8F544",
 "data": {
  "label": "82_2B-T5"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.33,
   "yaw": 7.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_127_1_0_map.gif",
      "width": 194,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_128_0.png",
      "width": 717,
      "class": "ImageResourceLevel",
      "height": 201
     }
    ]
   },
   "pitch": 0.55,
   "roll": 0,
   "yaw": -6.27
  }
 ],
 "id": "overlay_31F42BB2_257C_F7E3_41B8_058438207916",
 "data": {
  "label": "60_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.3,
   "yaw": -6.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_128_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_129_0.png",
      "width": 238,
      "class": "ImageResourceLevel",
      "height": 144
     }
    ]
   },
   "pitch": -0.07,
   "roll": 0,
   "yaw": -2.17
  }
 ],
 "id": "overlay_30AF3BA9_257F_57E0_41BB_EB698E2249BC",
 "data": {
  "label": "61_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.43,
   "yaw": -2.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_129_1_0_map.gif",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_130_0.png",
      "width": 238,
      "class": "ImageResourceLevel",
      "height": 144
     }
    ]
   },
   "pitch": -0.07,
   "roll": 0,
   "yaw": -2.17
  }
 ],
 "id": "overlay_34F21FA2_257F_2FE3_41B9_729DCFBBA10D",
 "data": {
  "label": "61_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.43,
   "yaw": -2.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_130_1_0_map.gif",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_131_0.png",
      "width": 252,
      "class": "ImageResourceLevel",
      "height": 137
     }
    ]
   },
   "pitch": -0.25,
   "roll": 0,
   "yaw": -0.78
  }
 ],
 "id": "overlay_3411C5F2_257C_D360_4152_94FA17625F56",
 "data": {
  "label": "62_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.52,
   "yaw": -0.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_131_1_0_map.gif",
      "width": 126,
      "class": "ImageResourceLevel",
      "height": 68
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_132_0.png",
      "width": 252,
      "class": "ImageResourceLevel",
      "height": 137
     }
    ]
   },
   "pitch": -0.25,
   "roll": 0,
   "yaw": -0.78
  }
 ],
 "id": "overlay_3788080B_257D_30A0_41B7_285A7A01B394",
 "data": {
  "label": "62_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.52,
   "yaw": -0.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_132_1_0_map.gif",
      "width": 126,
      "class": "ImageResourceLevel",
      "height": 68
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_133_0.png",
      "width": 1028,
      "class": "ImageResourceLevel",
      "height": 160
     }
    ]
   },
   "pitch": -0.48,
   "roll": 0,
   "yaw": 2.97
  }
 ],
 "id": "overlay_34BC5CC2_257D_51A3_41A2_C9D4DCBFB182",
 "data": {
  "label": "93_2B-T10"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.17,
   "yaw": 2.97,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_133_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 31
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_134_0.png",
      "width": 1028,
      "class": "ImageResourceLevel",
      "height": 160
     }
    ]
   },
   "pitch": -0.48,
   "roll": 0,
   "yaw": 2.97
  }
 ],
 "id": "overlay_343A2379_2573_5761_4197_BB06B253669D",
 "data": {
  "label": "93_2B-T10@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.17,
   "yaw": 2.97,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_134_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 31
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_135_0.png",
      "width": 391,
      "class": "ImageResourceLevel",
      "height": 117
     }
    ]
   },
   "pitch": -0.15,
   "roll": 0,
   "yaw": 7.12
  }
 ],
 "id": "overlay_37B8611A_2573_F0A0_41A3_05B881D9A372",
 "data": {
  "label": "64_2B-T5"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.35,
   "yaw": 7.12,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_135_1_0_map.gif",
      "width": 195,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_136_0.png",
      "width": 712,
      "class": "ImageResourceLevel",
      "height": 208
     }
    ]
   },
   "pitch": -0.28,
   "roll": 0,
   "yaw": -6.21
  }
 ],
 "id": "overlay_34CA077A_2574_DF60_41A1_0F85D85BEF83",
 "data": {
  "label": "41_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.28,
   "yaw": -6.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_136_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_137_0.png",
      "width": 239,
      "class": "ImageResourceLevel",
      "height": 147
     }
    ]
   },
   "pitch": -0.97,
   "roll": 0,
   "yaw": -2.15
  }
 ],
 "id": "overlay_37AD7B4A_2575_D0A0_4140_EC6644A3F62C",
 "data": {
  "label": "42_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.43,
   "yaw": -2.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_137_1_0_map.gif",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_138_0.png",
      "width": 239,
      "class": "ImageResourceLevel",
      "height": 147
     }
    ]
   },
   "pitch": -0.97,
   "roll": 0,
   "yaw": -2.15
  }
 ],
 "id": "overlay_372F5731_2575_50E1_41AB_292CED44C693",
 "data": {
  "label": "42_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.43,
   "yaw": -2.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_138_1_0_map.gif",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_139_0.png",
      "width": 248,
      "class": "ImageResourceLevel",
      "height": 139
     }
    ]
   },
   "pitch": -1.17,
   "roll": 0,
   "yaw": -0.78
  }
 ],
 "id": "overlay_34E41059_2574_D0A0_4191_D54910850D3C",
 "data": {
  "label": "43_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.49,
   "yaw": -0.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_139_1_0_map.gif",
      "width": 124,
      "class": "ImageResourceLevel",
      "height": 69
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_140_0.png",
      "width": 248,
      "class": "ImageResourceLevel",
      "height": 139
     }
    ]
   },
   "pitch": -1.17,
   "roll": 0,
   "yaw": -0.78
  }
 ],
 "id": "overlay_3439A0B1_2577_71E1_4187_05E5E62C90F4",
 "data": {
  "label": "43_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.49,
   "yaw": -0.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_140_1_0_map.gif",
      "width": 124,
      "class": "ImageResourceLevel",
      "height": 69
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_141_0.png",
      "width": 1019,
      "class": "ImageResourceLevel",
      "height": 163
     }
    ]
   },
   "pitch": -1.41,
   "roll": 0,
   "yaw": 2.94
  }
 ],
 "id": "overlay_37E7BCA9_2577_31E1_41B4_87943BCB38CA",
 "data": {
  "label": "44_2B-T10"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.11,
   "yaw": 2.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_141_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 31
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_142_0.png",
      "width": 1019,
      "class": "ImageResourceLevel",
      "height": 163
     }
    ]
   },
   "pitch": -1.41,
   "roll": 0,
   "yaw": 2.94
  }
 ],
 "id": "overlay_34FCBCB9_2574_D1E1_41A8_D8808BAE41C8",
 "data": {
  "label": "44_2B-T10@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.11,
   "yaw": 2.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_142_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 31
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_143_0.png",
      "width": 383,
      "class": "ImageResourceLevel",
      "height": 122
     }
    ]
   },
   "pitch": -1.06,
   "roll": 0,
   "yaw": 7.07
  }
 ],
 "id": "overlay_3402B0F9_2575_7161_41B9_AA3AEE97DA64",
 "data": {
  "label": "45_2B-T5"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.3,
   "yaw": 7.07,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_143_1_0_map.gif",
      "width": 191,
      "class": "ImageResourceLevel",
      "height": 61
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_144_0.png",
      "width": 386,
      "class": "ImageResourceLevel",
      "height": 122
     }
    ]
   },
   "pitch": -1.95,
   "roll": 0,
   "yaw": 6.99
  }
 ],
 "id": "overlay_34EAC659_2575_50A1_4190_B02455889700",
 "data": {
  "label": "26_2B-T5"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.32,
   "yaw": 6.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_144_1_0_map.gif",
      "width": 193,
      "class": "ImageResourceLevel",
      "height": 61
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_145_0.png",
      "width": 1008,
      "class": "ImageResourceLevel",
      "height": 165
     }
    ]
   },
   "pitch": -2.33,
   "roll": 0,
   "yaw": 2.89
  }
 ],
 "id": "overlay_3483CFAA_2573_2FE3_4188_36D8189FA1F6",
 "data": {
  "label": "25_2B-T10"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.05,
   "yaw": 2.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_145_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 32
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_146_0.png",
      "width": 1008,
      "class": "ImageResourceLevel",
      "height": 165
     }
    ]
   },
   "pitch": -2.33,
   "roll": 0,
   "yaw": 2.89
  }
 ],
 "id": "overlay_342395AA_256C_D3E0_41B3_67C344129F56",
 "data": {
  "label": "25_2B-T10@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.05,
   "yaw": 2.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_146_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 32
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_147_0.png",
      "width": 240,
      "class": "ImageResourceLevel",
      "height": 140
     }
    ]
   },
   "pitch": -2.07,
   "roll": 0,
   "yaw": -0.78
  }
 ],
 "id": "overlay_343AD419_256F_D0A0_41C1_78471F229277",
 "data": {
  "label": "24_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.44,
   "yaw": -0.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_147_1_0_map.gif",
      "width": 120,
      "class": "ImageResourceLevel",
      "height": 70
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_148_0.png",
      "width": 240,
      "class": "ImageResourceLevel",
      "height": 140
     }
    ]
   },
   "pitch": -2.07,
   "roll": 0,
   "yaw": -0.78
  }
 ],
 "id": "overlay_37AF1E80_256F_51A0_41BC_CE7244D83BEF",
 "data": {
  "label": "24_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.44,
   "yaw": -0.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_148_1_0_map.gif",
      "width": 120,
      "class": "ImageResourceLevel",
      "height": 70
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_149_0.png",
      "width": 235,
      "class": "ImageResourceLevel",
      "height": 146
     }
    ]
   },
   "pitch": -1.84,
   "roll": 0,
   "yaw": -2.14
  }
 ],
 "id": "overlay_37B2CFF9_256C_EF60_41A7_B696533C9895",
 "data": {
  "label": "23_S-T1"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.41,
   "yaw": -2.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_149_1_0_map.gif",
      "width": 117,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_150_0.png",
      "width": 235,
      "class": "ImageResourceLevel",
      "height": 146
     }
    ]
   },
   "pitch": -1.84,
   "roll": 0,
   "yaw": -2.14
  }
 ],
 "id": "overlay_35214228_2553_70EF_41A4_6397C54E44AE",
 "data": {
  "label": "23_S-T1@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.41,
   "yaw": -2.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_150_1_0_map.gif",
      "width": 117,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_151_0.png",
      "width": 708,
      "class": "ImageResourceLevel",
      "height": 211
     }
    ]
   },
   "pitch": -1.11,
   "roll": 0,
   "yaw": -6.16
  }
 ],
 "id": "overlay_34CE3AA9_2553_31E0_41B2_DB694DDEE64A",
 "data": {
  "label": "22_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.25,
   "yaw": -6.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_151_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 59
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_152_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 107
     }
    ]
   },
   "pitch": 1.65,
   "yaw": -0.82,
   "distance": 50
  }
 ],
 "id": "overlay_37BC4DB4_24EC_D3E7_41BE_73A619557C40",
 "data": {
  "label": "96"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -0.82,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_152_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_153_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 3.14,
   "yaw": -4.95,
   "distance": 50
  }
 ],
 "id": "overlay_37CAD4D1_24ED_31A0_41BB_E4EB51E115EC",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": -4.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_153_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_154_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.54,
   "yaw": 0.72,
   "distance": 50
  }
 ],
 "id": "overlay_37DAD11B_24ED_D0A1_41A8_12B574EFF837",
 "data": {
  "label": "97"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 0.72,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_154_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_155_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 107
     }
    ]
   },
   "pitch": 1.77,
   "yaw": -2.23,
   "distance": 50
  }
 ],
 "id": "overlay_37A94AA1_24ED_D1E0_41BE_326D98FF62CE",
 "data": {
  "label": "96"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -2.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_155_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_156_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.73,
   "yaw": -0.84,
   "distance": 50
  }
 ],
 "id": "overlay_37996F60_24ED_2F60_41B5_912C0342691D",
 "data": {
  "label": "96"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -0.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_156_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_157_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.41,
   "yaw": 2.86,
   "distance": 50
  }
 ],
 "id": "overlay_374F63E6_24ED_7760_4199_7501E3726920",
 "data": {
  "label": "97"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 2.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_157_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_158_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.44,
   "yaw": 1.79,
   "distance": 50
  }
 ],
 "id": "overlay_36A26C79_24EC_D160_418D_4CA3876021A4",
 "data": {
  "label": "97"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 1.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_158_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_159_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.44,
   "yaw": 2.9,
   "distance": 50
  }
 ],
 "id": "overlay_36833571_24EC_F360_41A4_0F74550B68A2",
 "data": {
  "label": "97"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 2.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_159_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_160_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.52,
   "yaw": 4.14,
   "distance": 50
  }
 ],
 "id": "overlay_34B8F131_24EC_D0E0_41B5_3591764AA67E",
 "data": {
  "label": "97"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 4.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_160_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_161_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.63,
   "yaw": 5.39,
   "distance": 50
  }
 ],
 "id": "overlay_346F7AF0_24EC_D160_4191_774FD069F9E2",
 "data": {
  "label": "97"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 5.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_161_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_162_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.7,
   "yaw": 6.74,
   "distance": 50
  }
 ],
 "id": "overlay_347AE611_24EF_30A1_41C2_6B68DF8854C8",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 6.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_162_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_163_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.52,
   "yaw": 4.12,
   "distance": 50
  }
 ],
 "id": "overlay_34444BC9_24EF_37A0_4190_EA7B7D236DA8",
 "data": {
  "label": "97"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 4.12,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_163_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_164_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.83,
   "yaw": 7.51,
   "distance": 50
  }
 ],
 "id": "overlay_34502369_24EF_5761_4183_F2A1F7BED96E",
 "data": {
  "label": "82"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 7.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_164_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_165_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.44,
   "yaw": 1.78,
   "distance": 50
  }
 ],
 "id": "overlay_37E7FEC9_24EF_51A1_41A1_0AA9FC97D438",
 "data": {
  "label": "97"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 1.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_165_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_166_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.54,
   "yaw": 0.68,
   "distance": 50
  }
 ],
 "id": "overlay_37D3115A_24EF_D0A0_41B9_AF27A4304A04",
 "data": {
  "label": "97"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 0.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_166_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_167_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.52,
   "yaw": 0.62,
   "distance": 50
  }
 ],
 "id": "overlay_3719C091_24EC_D1A0_41A1_1E7265E21874",
 "data": {
  "label": "81"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 0.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_167_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_168_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.34,
   "yaw": 1.76,
   "distance": 50
  }
 ],
 "id": "overlay_36FB49D9_24EC_D3A0_41A7_A73A01FCDF5C",
 "data": {
  "label": "81"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 1.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_168_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_169_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.37,
   "yaw": 2.9,
   "distance": 50
  }
 ],
 "id": "overlay_36DE1931_24EC_F0E0_41BE_6740A9C6B49A",
 "data": {
  "label": "81"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 2.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_169_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_170_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.49,
   "yaw": 4.09,
   "distance": 50
  }
 ],
 "id": "overlay_36BA5162_24EC_D363_41C0_B4C526D8F762",
 "data": {
  "label": "81"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 4.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_170_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_171_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.62,
   "yaw": 2.9,
   "distance": 50
  }
 ],
 "id": "overlay_34245629_24ED_30E1_41AF_E4C5AB42A7DF",
 "data": {
  "label": "63"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 2.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_171_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_172_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.7,
   "yaw": -0.75,
   "distance": 50
  }
 ],
 "id": "overlay_37E6861A_24ED_70A0_418A_3041FB2E3490",
 "data": {
  "label": "80"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -0.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_172_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_173_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.84,
   "yaw": -2.18,
   "distance": 50
  }
 ],
 "id": "overlay_37D2F7B1_24ED_DFE1_41A1_FFD9023B0682",
 "data": {
  "label": "79"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -2.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_173_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_174_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.08,
   "yaw": -2.19,
   "distance": 50
  }
 ],
 "id": "overlay_37897B13_24ED_D0A0_41C2_8F8C73B69248",
 "data": {
  "label": "61"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -2.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_174_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_175_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.27,
   "yaw": -0.76,
   "distance": 50
  }
 ],
 "id": "overlay_376940F4_24ED_5167_4178_6CB000A48F32",
 "data": {
  "label": "62"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -0.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_175_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_176_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.44,
   "yaw": 0.56,
   "distance": 50
  }
 ],
 "id": "overlay_37564279_24ED_5160_41AF_CA1E842DACD5",
 "data": {
  "label": "63"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 0.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_176_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_177_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.62,
   "yaw": 1.73,
   "distance": 50
  }
 ],
 "id": "overlay_37245AD0_24ED_51A0_41B7_E5398D0DEC96",
 "data": {
  "label": "63"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 1.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_177_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_178_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.47,
   "yaw": 4.08,
   "distance": 50
  }
 ],
 "id": "overlay_3702B331_24ED_30E1_41C2_06D6E1A91C83",
 "data": {
  "label": "63"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 4.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_178_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_179_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.58,
   "yaw": 1.7,
   "distance": 50
  }
 ],
 "id": "overlay_36E38F30_24ED_30E1_41BD_0B3C4385052C",
 "data": {
  "label": "44"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 1.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_179_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_180_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.06,
   "yaw": 7.53,
   "distance": 50
  }
 ],
 "id": "overlay_37E581C2_24F3_53A3_4192_79DBB2DA9513",
 "data": {
  "label": "64"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 7.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_180_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_181_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.02,
   "yaw": 7.46,
   "distance": 50
  }
 ],
 "id": "overlay_37DFBA51_24F3_70A0_41AA_BAC70535A354",
 "data": {
  "label": "45"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 7.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_181_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_182_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.4,
   "yaw": 4.14,
   "distance": 50
  }
 ],
 "id": "overlay_37AA82F1_24F3_5161_4192_B1737A372D46",
 "data": {
  "label": "44"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 4.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_182_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_183_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.55,
   "yaw": 2.93,
   "distance": 50
  }
 ],
 "id": "overlay_37B47C89_24F3_51A1_41B5_B18FB55277D5",
 "data": {
  "label": "44"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 2.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_183_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_184_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.98,
   "yaw": -2.19,
   "distance": 50
  }
 ],
 "id": "overlay_378785EE_24F3_3363_419B_A982E11348E6",
 "data": {
  "label": "42"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -2.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_184_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_185_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.39,
   "yaw": 0.56,
   "distance": 50
  }
 ],
 "id": "overlay_3774B60E_24F3_F0A0_4197_985A9C037B70",
 "data": {
  "label": "44"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 0.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_185_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_186_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.19,
   "yaw": -0.82,
   "distance": 50
  }
 ],
 "id": "overlay_37596C41_24F3_D0A1_41B7_FE7DD1A84D18",
 "data": {
  "label": "43"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -0.82,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_186_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_187_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -2.07,
   "yaw": -0.82,
   "distance": 50
  }
 ],
 "id": "overlay_371C36A9_24F3_71E0_41BB_8EF5FBE4AC27",
 "data": {
  "label": "24"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": -0.82,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_187_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_188_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.85,
   "yaw": -2.15,
   "distance": 50
  }
 ],
 "id": "overlay_343B2E99_24F3_51A1_41BF_CAB80FA58FA9",
 "data": {
  "label": "23"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": -2.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_188_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_189_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -2.28,
   "yaw": 0.5,
   "distance": 50
  }
 ],
 "id": "overlay_3417FEA9_24F3_31E0_41BD_58C5F997D500",
 "data": {
  "label": "25"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 0.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_189_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_190_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -2.48,
   "yaw": 1.64,
   "distance": 50
  }
 ],
 "id": "overlay_37D00DE1_24F4_D361_419F_15D1436E1F22",
 "data": {
  "label": "25"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 1.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_190_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_191_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -2.29,
   "yaw": 4.17,
   "distance": 50
  }
 ],
 "id": "overlay_37B19AF9_24F5_5161_41AE_F3259D401C8B",
 "data": {
  "label": "25"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 4.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_191_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_192_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -2.47,
   "yaw": 2.94,
   "distance": 50
  }
 ],
 "id": "overlay_378E2B3B_24F5_70E1_41A9_D5E5FF830B0B",
 "data": {
  "label": "25"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 2.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_192_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_193_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.87,
   "yaw": 7.43,
   "distance": 50
  }
 ],
 "id": "overlay_379FC503_24F5_50A1_41B7_4E0CBC4FD669",
 "data": {
  "label": "26"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 7.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_193_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_194_0.png",
      "width": 708,
      "class": "ImageResourceLevel",
      "height": 211
     }
    ]
   },
   "pitch": -1.11,
   "roll": 0,
   "yaw": -6.16
  }
 ],
 "id": "overlay_34CC602B_2757_50E0_41B0_93D67544E8AF",
 "data": {
  "label": "22_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.25,
   "yaw": -6.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_194_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 59
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_195_0.png",
      "width": 712,
      "class": "ImageResourceLevel",
      "height": 208
     }
    ]
   },
   "pitch": -0.28,
   "roll": 0,
   "yaw": -6.21
  }
 ],
 "id": "overlay_3492C314_2755_30A0_41B3_3489DEE1776F",
 "data": {
  "label": "41_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.28,
   "yaw": -6.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_195_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_196_0.png",
      "width": 717,
      "class": "ImageResourceLevel",
      "height": 201
     }
    ]
   },
   "pitch": 0.55,
   "roll": 0,
   "yaw": -6.27
  }
 ],
 "id": "overlay_34CBE41D_2755_70A1_41AE_68F14DBDEEF6",
 "data": {
  "label": "60_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.3,
   "yaw": -6.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_196_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_197_0.png",
      "width": 722,
      "class": "ImageResourceLevel",
      "height": 196
     }
    ]
   },
   "pitch": 1.41,
   "roll": 0,
   "yaw": -6.32
  }
 ],
 "id": "overlay_3519CCB5_2755_51E0_41BC_FD825D2C844C",
 "data": {
  "label": "78_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.33,
   "yaw": -6.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_197_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 54
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_198_0.png",
      "width": 745,
      "class": "ImageResourceLevel",
      "height": 363
     }
    ]
   },
   "pitch": 2.8,
   "roll": 0,
   "yaw": -6.46
  }
 ],
 "id": "overlay_355FB753_2755_D0A0_4199_EDEC3FEE9CE3",
 "data": {
  "label": "95_3B-T3D@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.47,
   "yaw": -6.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_198_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 97
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_199_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 3.26,
   "yaw": -5.9,
   "distance": 50
  }
 ],
 "id": "overlay_34B8D13B_2755_30E1_412E_D1E9772FC20C",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": -5.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_199_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_200_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.86,
   "yaw": -2.25,
   "distance": 50
  }
 ],
 "id": "overlay_34B71CF3_2753_7161_4196_725DB9CCBDBE",
 "data": {
  "label": "96"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -2.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_200_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_201_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.19,
   "yaw": -5.08,
   "distance": 50
  }
 ],
 "id": "overlay_34D91772_2753_DF63_41BE_C54D427B4512",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -5.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_201_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_202_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.27,
   "yaw": -6.05,
   "distance": 50
  }
 ],
 "id": "overlay_34CE6E52_2753_D0A0_41BA_F1661D70B719",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -6.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_202_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_203_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.41,
   "yaw": -6.94,
   "distance": 50
  }
 ],
 "id": "overlay_34F038B3_2753_F1E1_41A1_6B9B1B812B45",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -6.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_203_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_204_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.5,
   "yaw": -7.81,
   "distance": 50
  }
 ],
 "id": "overlay_34E3FFDA_2753_EFA0_41C1_2450F16AB665",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -7.81,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_204_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_205_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 3.41,
   "yaw": -7.55,
   "distance": 50
  }
 ],
 "id": "overlay_3517767A_2753_D160_41B6_9F0CB2F7C047",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": -7.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_205_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_206_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 3.37,
   "yaw": -6.8,
   "distance": 50
  }
 ],
 "id": "overlay_35181E58_2753_D0AF_41AD_E8D0C7864B3E",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": -6.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_206_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_207_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.67,
   "yaw": -7.77,
   "distance": 50
  }
 ],
 "id": "overlay_354EC093_2753_51A0_41BC_D6EC12A2D006",
 "data": {
  "label": "78"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -7.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_207_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_208_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.43,
   "yaw": -6.05,
   "distance": 50
  }
 ],
 "id": "overlay_35940D7A_2753_7360_41C1_C5725A2C423D",
 "data": {
  "label": "78"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -6.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_208_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_209_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.28,
   "yaw": -5,
   "distance": 50
  }
 ],
 "id": "overlay_358FA5AA_2753_53E0_41B7_2C892C37ECA2",
 "data": {
  "label": "78"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_209_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_210_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.54,
   "yaw": -5.97,
   "distance": 50
  }
 ],
 "id": "overlay_35A76DFA_2753_5360_41A1_F712D7EDEBC5",
 "data": {
  "label": "60"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -5.97,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_210_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_211_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.52,
   "yaw": -6.86,
   "distance": 50
  }
 ],
 "id": "overlay_34D8F732_275C_D0E0_41B6_0F74F2210936",
 "data": {
  "label": "78"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -6.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_211_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_212_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.68,
   "yaw": -6.87,
   "distance": 50
  }
 ],
 "id": "overlay_34CFB98C_275C_F3A0_41BD_F58DF6EC2CDD",
 "data": {
  "label": "60"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -6.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_212_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_213_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.82,
   "yaw": -7.69,
   "distance": 50
  }
 ],
 "id": "overlay_34FD709A_275C_D1A3_41BA_3921AE5F9482",
 "data": {
  "label": "60"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -7.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_213_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_214_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.02,
   "yaw": -7.64,
   "distance": 50
  }
 ],
 "id": "overlay_34E9286A_275C_D163_41B4_F3AF823C362A",
 "data": {
  "label": "41"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -7.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_214_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_215_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.41,
   "yaw": -5.02,
   "distance": 50
  }
 ],
 "id": "overlay_34E7F222_275D_30E0_41BD_705C9F85475E",
 "data": {
  "label": "60"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -5.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_215_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_216_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.5,
   "yaw": -4.97,
   "distance": 50
  }
 ],
 "id": "overlay_3525D1C1_275D_73A1_41C1_9F02FDA0BA3E",
 "data": {
  "label": "41"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -4.97,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_216_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_217_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.3,
   "yaw": -5.88,
   "distance": 50
  }
 ],
 "id": "overlay_35568C2A_275D_70E0_41B3_B33A8FDABCC1",
 "data": {
  "label": "41"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -5.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_217_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_218_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.13,
   "yaw": -6.83,
   "distance": 50
  }
 ],
 "id": "overlay_354755EA_275D_5363_419F_B3C2893E985A",
 "data": {
  "label": "41"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -6.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_218_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_219_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.16,
   "yaw": -5.88,
   "distance": 50
  }
 ],
 "id": "overlay_341CC9B5_275D_33E0_4160_43C37E999872",
 "data": {
  "label": "22"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -5.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_219_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_220_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.32,
   "yaw": -5.02,
   "distance": 50
  }
 ],
 "id": "overlay_34BBBC03_275D_D0A0_41B9_5F5C924F651B",
 "data": {
  "label": "22"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -5.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_220_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_221_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.82,
   "yaw": -7.56,
   "distance": 50
  }
 ],
 "id": "overlay_34ACCAAA_275D_F1E3_41C2_5C3A6B377F36",
 "data": {
  "label": "22"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -7.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_221_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_222_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.05,
   "yaw": -6.63,
   "distance": 50
  }
 ],
 "id": "overlay_34DDC8F9_275D_D160_4183_01511DBFF36B",
 "data": {
  "label": "22"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": -6.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_1_HS_222_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_223_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -2.14,
   "yaw": 5.38,
   "distance": 50
  }
 ],
 "id": "overlay_3260EC27_2773_50E0_4199_3BBE16456359",
 "data": {
  "label": "25"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 5.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_223_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_224_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -2,
   "yaw": 6.32,
   "distance": 50
  }
 ],
 "id": "overlay_328EDAB8_2773_D1E0_41AB_50E5F2C729AF",
 "data": {
  "label": "26"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 6.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_224_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_225_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.23,
   "yaw": 5.39,
   "distance": 50
  }
 ],
 "id": "overlay_329BE661_2773_F160_4198_E6AB3113742B",
 "data": {
  "label": "44"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 5.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_225_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_226_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -1.11,
   "yaw": 6.44,
   "distance": 50
  }
 ],
 "id": "overlay_332A73F9_2773_3760_41B2_B31E3342BC9B",
 "data": {
  "label": "45"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 6.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_226_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_227_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.33,
   "yaw": 5.39,
   "distance": 50
  }
 ],
 "id": "overlay_333033AF_2773_57E0_41C2_25381A70EE46",
 "data": {
  "label": "63"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 5.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_227_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_228_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -0.21,
   "yaw": 6.45,
   "distance": 50
  }
 ],
 "id": "overlay_3368F2A0_2773_71E0_41B7_423EA475F309",
 "data": {
  "label": "64"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 6.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_228_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_229_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.62,
   "yaw": 5.44,
   "distance": 50
  }
 ],
 "id": "overlay_334EABA7_2773_77E0_41A5_5796A6ABC089",
 "data": {
  "label": "81"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 5.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_229_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_230_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 0.73,
   "yaw": 6.56,
   "distance": 50
  }
 ],
 "id": "overlay_33BF9DDE_2773_53A3_4193_AEEE4E34B0CE",
 "data": {
  "label": "82"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 6.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_230_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_231_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.59,
   "yaw": 5.35,
   "distance": 50
  }
 ],
 "id": "overlay_33805B55_2773_30A1_41C1_71C4631F580B",
 "data": {
  "label": "97"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.68,
   "yaw": 5.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_231_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_232_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.81,
   "yaw": 6.72,
   "distance": 50
  }
 ],
 "id": "overlay_33E7C05F_276C_F0A0_419A_0C2F970EF928",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 6.72,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_232_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_233_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 1.9,
   "yaw": 7.51,
   "distance": 50
  }
 ],
 "id": "overlay_33C1F7ED_276C_FF61_41C1_67B0AEEA78BB",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 7.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_233_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_234_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": 2.73,
   "yaw": 7.51,
   "distance": 50
  }
 ],
 "id": "overlay_30226535_276C_D0E0_41BC_8545B51DF9DF",
 "data": {
  "label": "98"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.67,
   "yaw": 7.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3533B6BB_2553_31E1_41AA_69AAE79D1810_0_HS_234_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_91_0.png",
      "width": 462,
      "class": "ImageResourceLevel",
      "height": 522
     }
    ]
   },
   "pitch": 0.86,
   "roll": 0,
   "yaw": 4.33
  }
 ],
 "id": "overlay_35AC2753_24ED_50A0_419A_62DBF188B9BA",
 "data": {
  "label": "95_3B-T3D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.77,
   "yaw": 4.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_91_1_0_map.gif",
      "width": 177,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_92_0.png",
      "width": 1287,
      "class": "ImageResourceLevel",
      "height": 591
     }
    ]
   },
   "pitch": 1.52,
   "roll": 0,
   "yaw": -0.84
  }
 ],
 "id": "overlay_36ED56A3_24F4_D1E0_41A5_5C55256A2402",
 "data": {
  "label": "106_3B-T3D"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.71,
   "yaw": -0.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_92_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_93_0.png",
      "width": 1287,
      "class": "ImageResourceLevel",
      "height": 591
     }
    ]
   },
   "pitch": 1.52,
   "roll": 0,
   "yaw": -0.84
  }
 ],
 "id": "overlay_34F6EB93_24F5_57A0_41A8_B0E9809812A5",
 "data": {
  "label": "106_3B-T3D@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.71,
   "yaw": -0.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_93_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_94_0.png",
      "width": 570,
      "class": "ImageResourceLevel",
      "height": 472
     }
    ]
   },
   "pitch": 0.74,
   "roll": 0,
   "yaw": -6.32
  }
 ],
 "id": "overlay_3599B40A_24F7_50A0_41B3_7E65A1BE451D",
 "data": {
  "label": "105_4B-T3"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.42,
   "yaw": -6.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_94_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 165
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_95_0.png",
      "width": 570,
      "class": "ImageResourceLevel",
      "height": 472
     }
    ]
   },
   "pitch": 0.74,
   "roll": 0,
   "yaw": -6.32
  }
 ],
 "id": "overlay_36CA0DD2_24FF_53A3_41AE_D1B43A0A7F2F",
 "data": {
  "label": "105_4B-T3@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.42,
   "yaw": -6.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_95_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 165
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_96_0.png",
      "width": 442,
      "class": "ImageResourceLevel",
      "height": 259
     }
    ]
   },
   "pitch": -1.23,
   "roll": 0,
   "yaw": 4.26
  }
 ],
 "id": "overlay_37E62F74_25D3_6F67_41AE_1E89D0BF42FB",
 "data": {
  "label": "78_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.65,
   "yaw": 4.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_96_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 116
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_97_0.png",
      "width": 1279,
      "class": "ImageResourceLevel",
      "height": 297
     }
    ]
   },
   "pitch": -0.72,
   "roll": 0,
   "yaw": -0.83
  }
 ],
 "id": "overlay_34CB1DFB_25D7_7360_41BC_AA0D8766736C",
 "data": {
  "label": "94_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.67,
   "yaw": -0.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_97_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 46
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_98_0.png",
      "width": 570,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -1.09,
   "roll": 0,
   "yaw": -6.3
  }
 ],
 "id": "overlay_342E83F3_25D5_3760_41AB_841145ED6835",
 "data": {
  "label": "93_2B-T9"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.42,
   "yaw": -6.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_98_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_99_0.png",
      "width": 418,
      "class": "ImageResourceLevel",
      "height": 238
     }
    ]
   },
   "pitch": -2.54,
   "roll": 0,
   "yaw": 4.15
  }
 ],
 "id": "overlay_35827E73_25ED_D160_41A7_2EB5CC5C9CBE",
 "data": {
  "label": "60_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.51,
   "yaw": 4.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_99_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 113
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_100_0.png",
      "width": 1275,
      "class": "ImageResourceLevel",
      "height": 279
     }
    ]
   },
   "pitch": -2.16,
   "roll": 0,
   "yaw": -0.86
  }
 ],
 "id": "overlay_357FA2EB_25F3_7160_41B1_30D73EC7C0AB",
 "data": {
  "label": "77_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.64,
   "yaw": -0.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_100_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 43
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_101_0.png",
      "width": 562,
      "class": "ImageResourceLevel",
      "height": 269
     }
    ]
   },
   "pitch": -2.47,
   "roll": 0,
   "yaw": -6.3
  }
 ],
 "id": "overlay_344DF2FA_25F3_3160_4137_CA624FC945BC",
 "data": {
  "label": "76_2B-T9"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.37,
   "yaw": -6.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_101_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_102_0.png",
      "width": 443,
      "class": "ImageResourceLevel",
      "height": 225
     }
    ]
   },
   "pitch": -3.9,
   "roll": 0,
   "yaw": 4.22
  }
 ],
 "id": "overlay_34E2C293_25FD_31A1_41B7_B3E2C813AC8E",
 "data": {
  "label": "41_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.66,
   "yaw": 4.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_102_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 101
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_103_0.png",
      "width": 1271,
      "class": "ImageResourceLevel",
      "height": 259
     }
    ]
   },
   "pitch": -3.6,
   "roll": 0,
   "yaw": -0.85
  }
 ],
 "id": "overlay_361CE3C2_25FF_57A3_41B8_5060327889E8",
 "data": {
  "label": "59_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.62,
   "yaw": -0.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_103_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_104_0.png",
      "width": 568,
      "class": "ImageResourceLevel",
      "height": 248
     }
    ]
   },
   "pitch": -3.83,
   "roll": 0,
   "yaw": -6.28
  }
 ],
 "id": "overlay_34187593_25FD_53A1_4190_091A1D35CA84",
 "data": {
  "label": "58_2B-T9"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.41,
   "yaw": -6.28,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_104_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 87
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_105_0.png",
      "width": 1271,
      "class": "ImageResourceLevel",
      "height": 259
     }
    ]
   },
   "pitch": -3.6,
   "roll": 0,
   "yaw": -0.85
  }
 ],
 "id": "overlay_37F36CE3_25F3_D160_41C1_05CF317B8E04",
 "data": {
  "label": "59_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.62,
   "yaw": -0.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_105_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_106_0.png",
      "width": 279,
      "class": "ImageResourceLevel",
      "height": 185
     }
    ]
   },
   "pitch": -5.15,
   "roll": 0,
   "yaw": 3.72
  }
 ],
 "id": "overlay_35A813E2_25F4_D763_41BB_417EE74F5E03",
 "data": {
  "label": "22_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.67,
   "yaw": 3.72,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_106_1_0_map.gif",
      "width": 139,
      "class": "ImageResourceLevel",
      "height": 92
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_107_0.png",
      "width": 1270,
      "class": "ImageResourceLevel",
      "height": 240
     }
    ]
   },
   "pitch": -5.04,
   "roll": 0,
   "yaw": -0.86
  }
 ],
 "id": "overlay_353B9922_25F7_50E0_41A5_6F38AB4E8954",
 "data": {
  "label": "40_2B-T4"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.61,
   "yaw": -0.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_107_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 37
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_108_0.png",
      "width": 1270,
      "class": "ImageResourceLevel",
      "height": 240
     }
    ]
   },
   "pitch": -5.04,
   "roll": 0,
   "yaw": -0.86
  }
 ],
 "id": "overlay_347F87C9_25F4_FFA0_41BA_C2226AF784A9",
 "data": {
  "label": "40_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.61,
   "yaw": -0.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_108_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 37
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_109_0.png",
      "width": 564,
      "class": "ImageResourceLevel",
      "height": 227
     }
    ]
   },
   "pitch": -5.19,
   "roll": 0,
   "yaw": -6.3
  }
 ],
 "id": "overlay_352D90AA_25F5_51E3_41B8_031A2CF308F6",
 "data": {
  "label": "39_2B-T9"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.38,
   "yaw": -6.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_109_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_110_0.png",
      "width": 564,
      "class": "ImageResourceLevel",
      "height": 227
     }
    ]
   },
   "pitch": -5.19,
   "roll": 0,
   "yaw": -6.3
  }
 ],
 "id": "overlay_346518E1_25F5_3161_413D_7375C8887416",
 "data": {
  "label": "39_2B-T9@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.38,
   "yaw": -6.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_110_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_111_0.png",
      "width": 1275,
      "class": "ImageResourceLevel",
      "height": 279
     }
    ]
   },
   "pitch": -2.16,
   "roll": 0,
   "yaw": -0.86
  }
 ],
 "id": "overlay_35A41689_25ED_71A0_41A6_3F8214B79C62",
 "data": {
  "label": "77_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.64,
   "yaw": -0.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_111_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 43
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_112_0.png",
      "width": 568,
      "class": "ImageResourceLevel",
      "height": 248
     }
    ]
   },
   "pitch": -3.83,
   "roll": 0,
   "yaw": -6.29
  }
 ],
 "id": "overlay_3406DF78_25ED_2F60_41C0_0DB1ECB90380",
 "data": {
  "label": "58_2B-T9@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.41,
   "yaw": -6.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_112_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 87
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_113_0.png",
      "width": 1279,
      "class": "ImageResourceLevel",
      "height": 297
     }
    ]
   },
   "pitch": -0.72,
   "roll": 0,
   "yaw": -0.83
  }
 ],
 "id": "overlay_34EDA369_25EF_F760_41A7_C1453675C7F7",
 "data": {
  "label": "94_2B-T4@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.67,
   "yaw": -0.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_113_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 46
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_114_0.png",
      "width": 570,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -1.09,
   "roll": 0,
   "yaw": -6.3
  }
 ],
 "id": "overlay_358EEFC0_25EF_6FA0_41AC_E8EA24759BB9",
 "data": {
  "label": "93_2B-T9@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.42,
   "yaw": -6.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_114_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_115_0.png",
      "width": 562,
      "class": "ImageResourceLevel",
      "height": 269
     }
    ]
   },
   "pitch": -2.47,
   "roll": 0,
   "yaw": -6.3
  }
 ],
 "id": "overlay_341AA5F1_25EC_F361_4192_017E77357C5F",
 "data": {
  "label": "76_2B-T9@"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.37,
   "yaw": -6.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_115_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_116_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -5.22,
   "yaw": -5.25,
   "distance": 50
  }
 ],
 "id": "overlay_37929C04_24DF_70A0_41B1_485B36FE9513",
 "data": {
  "label": "39"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.76,
   "yaw": -5.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_116_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_117_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -5.3,
   "yaw": -7.24,
   "distance": 50
  }
 ],
 "id": "overlay_37E047E2_24DD_DF60_41C0_54B6345A0495",
 "data": {
  "label": "39"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.76,
   "yaw": -7.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_117_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_118_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -5.16,
   "yaw": -3.79,
   "distance": 50
  }
 ],
 "id": "overlay_3789753A_24DD_F0E3_4197_E402AD179D36",
 "data": {
  "label": "40"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.76,
   "yaw": -3.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_118_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_119_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -5.28,
   "yaw": -6.36,
   "distance": 50
  }
 ],
 "id": "overlay_375836C3_24DD_31A0_41BD_97D7E993738E",
 "data": {
  "label": "39"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.76,
   "yaw": -6.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_119_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_120_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -4.97,
   "yaw": 2.28,
   "distance": 50
  }
 ],
 "id": "overlay_348AEB13_24DD_30A1_41BA_BF2E5149C367",
 "data": {
  "label": "40"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.76,
   "yaw": 2.28,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_120_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_121_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -5.06,
   "yaw": -2.57,
   "distance": 50
  }
 ],
 "id": "overlay_346A6D52_24DC_D0A3_4184_DEEA28C8D27C",
 "data": {
  "label": "40"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.76,
   "yaw": -2.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_121_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_122_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -4.96,
   "yaw": -1.37,
   "distance": 50
  }
 ],
 "id": "overlay_3465D601_24DC_F0A0_41B3_2219AB74EE93",
 "data": {
  "label": "40"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -1.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_122_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_123_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -4.9,
   "yaw": 0.01,
   "distance": 50
  }
 ],
 "id": "overlay_34154EA2_24DC_F1E0_41BB_E83EE9501FD9",
 "data": {
  "label": "40"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 0.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_123_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_124_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -4.9,
   "yaw": 1.27,
   "distance": 50
  }
 ],
 "id": "overlay_3404F6C9_24DC_D1A0_41B1_5F130C7BD259",
 "data": {
  "label": "40"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 1.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_124_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_125_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -3.84,
   "yaw": -5.3,
   "distance": 50
  }
 ],
 "id": "overlay_37A202B2_24D3_D1E3_4199_B8EEAF92CED3",
 "data": {
  "label": "58"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -5.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_125_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_126_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -3.97,
   "yaw": -7.26,
   "distance": 50
  }
 ],
 "id": "overlay_373B526E_24D3_7160_4185_937B0989A510",
 "data": {
  "label": "58"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -7.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_126_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_127_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -3.98,
   "yaw": -6.34,
   "distance": 50
  }
 ],
 "id": "overlay_37258DD7_24D3_73A0_41BF_D79AE51C3400",
 "data": {
  "label": "58"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -6.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_127_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_128_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -3.48,
   "yaw": -1.34,
   "distance": 50
  }
 ],
 "id": "overlay_36C75A2F_24D3_50E0_41B2_EBCF0EC75D85",
 "data": {
  "label": "59"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -1.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_128_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_129_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -3.75,
   "yaw": -3.81,
   "distance": 50
  }
 ],
 "id": "overlay_36AC88EA_24D4_D163_419D_056E3E177564",
 "data": {
  "label": "59"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -3.81,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_129_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_130_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -3.59,
   "yaw": -2.58,
   "distance": 50
  }
 ],
 "id": "overlay_364D61C1_24D4_F3A0_4198_DD243AC80040",
 "data": {
  "label": "59"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -2.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_130_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_131_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -3.35,
   "yaw": 1.21,
   "distance": 50
  }
 ],
 "id": "overlay_366A1CE9_24D4_F160_41A5_7381B70E94A4",
 "data": {
  "label": "59"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 1.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_131_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_132_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -3.4,
   "yaw": -0.09,
   "distance": 50
  }
 ],
 "id": "overlay_363C3BA2_24D4_D7E0_4195_FCF5B579C246",
 "data": {
  "label": "59"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -0.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_132_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_133_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -3.59,
   "yaw": 2.22,
   "distance": 50
  }
 ],
 "id": "overlay_31DC847B_24D5_3160_418D_5C45E7055A1D",
 "data": {
  "label": "59"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 2.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_133_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_134_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -2.69,
   "yaw": -7.18,
   "distance": 50
  }
 ],
 "id": "overlay_34AEC29C_24D5_51A0_41C1_948183EB483F",
 "data": {
  "label": "76"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -7.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_134_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_135_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -0.35,
   "yaw": 0.04,
   "distance": 50
  }
 ],
 "id": "overlay_37D74EC9_24D5_F1A1_41C1_0B9D1D74314E",
 "data": {
  "label": "94"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 0.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_135_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_136_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -2.67,
   "yaw": -6.26,
   "distance": 50
  }
 ],
 "id": "overlay_37C16D72_24D5_D363_41C2_DC24BE5F337A",
 "data": {
  "label": "76"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -6.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_136_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_137_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -2.56,
   "yaw": -5.29,
   "distance": 50
  }
 ],
 "id": "overlay_37F169A2_24D5_33E3_41B3_851AAF018BA3",
 "data": {
  "label": "76"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -5.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_137_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_138_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -2.37,
   "yaw": -3.91,
   "distance": 50
  }
 ],
 "id": "overlay_37BF5C78_24D5_7160_41BE_7911E010A69C",
 "data": {
  "label": "77"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -3.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_138_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_139_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -2.21,
   "yaw": -2.7,
   "distance": 50
  }
 ],
 "id": "overlay_37A41550_24D5_50BF_4199_FC6FFA63B671",
 "data": {
  "label": "77"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -2.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_139_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_140_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -2.06,
   "yaw": -1.51,
   "distance": 50
  }
 ],
 "id": "overlay_37500D7E_24D5_5360_419F_A018D0FB6637",
 "data": {
  "label": "77"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -1.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_140_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_141_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -1.86,
   "yaw": -0.26,
   "distance": 50
  }
 ],
 "id": "overlay_377C25AE_24D5_33E0_4186_BA8FC7CBE949",
 "data": {
  "label": "77"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -0.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_141_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_142_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -1.82,
   "yaw": 1.04,
   "distance": 50
  }
 ],
 "id": "overlay_37644E9A_24D5_31A3_41B3_4E4E71667602",
 "data": {
  "label": "77"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 1.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_142_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_143_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -2.06,
   "yaw": 2.2,
   "distance": 50
  }
 ],
 "id": "overlay_37268ABA_24D4_D1E3_4189_FBC1A603D7F8",
 "data": {
  "label": "77"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 2.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_143_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_144_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -0.61,
   "yaw": 2.31,
   "distance": 50
  }
 ],
 "id": "overlay_3692604A_24D7_70A3_41AD_CA38DD3C0038",
 "data": {
  "label": "94"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 2.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_144_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_145_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -0.31,
   "yaw": 1.2,
   "distance": 50
  }
 ],
 "id": "overlay_36B3C82B_24D7_70E1_41B5_D9788D2EFE0C",
 "data": {
  "label": "94"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": 1.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_145_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_146_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -0.53,
   "yaw": -1.6,
   "distance": 50
  }
 ],
 "id": "overlay_34C06EFD_24D7_7160_41A9_0A30F98FCBEB",
 "data": {
  "label": "94"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -1.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_146_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_147_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -1.22,
   "yaw": -5.27,
   "distance": 50
  }
 ],
 "id": "overlay_3405DE59_24D7_50A0_41B8_3FFF4D89F853",
 "data": {
  "label": "93"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -5.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_147_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_148_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -0.73,
   "yaw": -2.73,
   "distance": 50
  }
 ],
 "id": "overlay_3424875B_24D7_D0A1_41B9_F567F101C9D4",
 "data": {
  "label": "94"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -2.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_148_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_149_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -0.98,
   "yaw": -3.8,
   "distance": 50
  }
 ],
 "id": "overlay_37DA52E2_24D7_F163_41B3_5A84B6812375",
 "data": {
  "label": "94"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -3.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_149_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_150_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -1.38,
   "yaw": -6.27,
   "distance": 50
  }
 ],
 "id": "overlay_37F2C532_24D7_30E0_41C0_9A78D204E39B",
 "data": {
  "label": "93"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -6.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_150_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_151_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -0.13,
   "yaw": -6.91,
   "distance": 50
  }
 ],
 "id": "overlay_3794879F_24D7_5FA1_41C2_47C9791EFF09",
 "data": {
  "label": "105"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": -6.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_151_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_152_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -1.43,
   "yaw": -7.13,
   "distance": 50
  }
 ],
 "id": "overlay_3778D709_24D7_30A0_41BF_139078A2C159",
 "data": {
  "label": "93"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.77,
   "yaw": -7.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_152_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_153_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 2.62,
   "yaw": -0.35,
   "distance": 50
  }
 ],
 "id": "overlay_37344AB1_24D4_F1E0_41BF_8A77BFA443ED",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": -0.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_153_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_154_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 0.05,
   "yaw": -5.4,
   "distance": 50
  }
 ],
 "id": "overlay_34F4E934_24D4_D0E0_41B4_0FFD92653BA0",
 "data": {
  "label": "105"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": -5.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_154_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_155_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 1.27,
   "yaw": -5.43,
   "distance": 50
  }
 ],
 "id": "overlay_34B586F2_24D5_3160_41B7_099B5DD646B1",
 "data": {
  "label": "105"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": -5.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_155_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_156_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 0.99,
   "yaw": -6.94,
   "distance": 50
  }
 ],
 "id": "overlay_34A911C3_24D5_53A1_41BB_F1C461ADE1B7",
 "data": {
  "label": "105"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": -6.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_156_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_157_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 1.73,
   "yaw": -3.71,
   "distance": 50
  }
 ],
 "id": "overlay_37C37232_24D5_50E3_41C0_85E2AB734FEC",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": -3.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_157_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_158_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 2.14,
   "yaw": -2.1,
   "distance": 50
  }
 ],
 "id": "overlay_37F1D22B_24D5_30E1_41B4_6CC4FBB91C78",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": -2.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_158_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_159_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 0.4,
   "yaw": -3.61,
   "distance": 50
  }
 ],
 "id": "overlay_37E13D99_24D5_33A1_41B5_974091EEAE99",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": -3.61,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_159_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_160_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 2.69,
   "yaw": 1.16,
   "distance": 50
  }
 ],
 "id": "overlay_378ECA33_24D5_D0E0_41C0_728CDA28A19E",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": 1.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_160_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_161_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 2.28,
   "yaw": 2.32,
   "distance": 50
  }
 ],
 "id": "overlay_37BE4378_24D5_F76F_41AB_70706525E91A",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": 2.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_161_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_162_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 0.92,
   "yaw": 2.3,
   "distance": 50
  }
 ],
 "id": "overlay_37AA8B37_24D5_F0E1_4198_D99FEB682A1E",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": 2.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_162_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_163_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 1.25,
   "yaw": 1.06,
   "distance": 50
  }
 ],
 "id": "overlay_375596A7_24D5_D1E1_4197_83C91293CB04",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": 1.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_163_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_164_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 1.15,
   "yaw": -0.34,
   "distance": 50
  }
 ],
 "id": "overlay_37404DEA_24D5_D360_41BD_E99910694432",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": -0.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_164_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_165_0.png",
      "width": 175,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 0.75,
   "yaw": -1.98,
   "distance": 50
  }
 ],
 "id": "overlay_376AD76A_24D5_3F63_41B8_E5CA0954AFEF",
 "data": {
  "label": "106"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.05,
   "yaw": -1.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_165_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_166_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -2.37,
   "yaw": 3.45,
   "distance": 50
  }
 ],
 "id": "overlay_329B4D6B_2774_D361_4183_39A7C7A22BFF",
 "data": {
  "label": "60"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 3.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_166_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_167_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 1.74,
   "yaw": 3.62,
   "distance": 50
  }
 ],
 "id": "overlay_332CCC6F_2775_3160_41BB_B15CC066CD4E",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 3.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_167_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_168_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 1.16,
   "yaw": 4.26,
   "distance": 50
  }
 ],
 "id": "overlay_333CF538_2775_50E0_41BD_0C15B5C4F6FE",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 4.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_168_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_169_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 0.8,
   "yaw": 5.05,
   "distance": 50
  }
 ],
 "id": "overlay_35832F91_2775_6FA1_41C0_1A4198EBFE8A",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 5.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_169_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_170_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 0.57,
   "yaw": 3.54,
   "distance": 50
  }
 ],
 "id": "overlay_35C26E28_2775_70EF_41A7_9476045EE9D7",
 "data": {
  "label": "95"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 3.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_170_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_171_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -1,
   "yaw": 3.43,
   "distance": 50
  }
 ],
 "id": "overlay_32734E88_2775_D1AF_41B9_4C4A1FE21747",
 "data": {
  "label": "78"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 3.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_171_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_172_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -1.2,
   "yaw": 4.19,
   "distance": 50
  }
 ],
 "id": "overlay_325A120F_2775_50A0_41AF_954A04A47F4D",
 "data": {
  "label": "78"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 4.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_172_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_173_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -2.57,
   "yaw": 4.19,
   "distance": 50
  }
 ],
 "id": "overlay_32B9F5C8_2775_73A0_41C0_21F4FA7BD319",
 "data": {
  "label": "60"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 4.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_173_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_174_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "pitch": -5.13,
   "yaw": 3.42,
   "distance": 50
  }
 ],
 "id": "overlay_32CA5035_2775_30E1_41BE_7595E3CA10F7",
 "data": {
  "label": "22"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 3.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_174_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_175_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "pitch": -3.79,
   "yaw": 3.44,
   "distance": 50
  }
 ],
 "id": "overlay_332497ED_2774_DF61_41C0_502E41D42547",
 "data": {
  "label": "41"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 3.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_175_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_176_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "pitch": -3.9,
   "yaw": 4.21,
   "distance": 50
  }
 ],
 "id": "overlay_33025370_2774_D760_41A0_946E5F7CA214",
 "data": {
  "label": "41"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.79,
   "yaw": 4.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_176_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.78,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_177_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "pitch": -5.21,
   "yaw": 4.19,
   "distance": 50
  }
 ],
 "id": "overlay_3377863F_2773_30E0_4146_16B034AD4F7F",
 "data": {
  "label": "22"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 0.78,
   "yaw": 4.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2AAC8196_24D5_53CF_41B2_15DE08C4CC77_0_HS_177_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
}],
 "backgroundPreloadEnabled": true,
 "scrollBarMargin": 2,
 "class": "Player",
 "downloadEnabled": false,
 "paddingTop": 0,
 "layout": "absolute",
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "mouseWheelEnabled": true,
 "data": {
  "name": "Player485"
 },
 "contentOpaque": false,
 "desktopMipmappingEnabled": false,
 "height": "100%"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
