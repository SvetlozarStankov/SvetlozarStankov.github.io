(function(){
    var script = {
 "verticalAlign": "top",
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_38CC77DE_2DFD_B98D_4193_74A438C3A09F_playlist,this.mainPlayList])",
 "overflow": "visible",
 "children": [
  "this.MainViewer",
  "this.ThumbnailList_38CC77DE_2DFD_B98D_4193_74A438C3A09F",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "id": "rootPlayer",
 "paddingLeft": 0,
 "mobileMipmappingEnabled": false,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "width": "100%",
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "minHeight": 20,
 "scripts": {
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "unregisterKey": function(key){  delete window[key]; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "existsKey": function(key){  return key in window; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "registerKey": function(key, value){  window[key] = value; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getKey": function(key){  return window[key]; }
 },
 "defaultVRPointer": "laser",
 "vrPolyfillScale": 0.5,
 "borderSize": 0,
 "minWidth": 20,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "definitions": [{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "hideDuration": 500,
 "autoplay": true,
 "id": "popup_38907EF0_2DFC_8B92_41B4_F53BE9443ED7",
 "rotationX": 0,
 "class": "PopupPanoramaOverlay",
 "showEasing": "cubic_in",
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "rotationZ": 0,
 "yaw": -4.89,
 "hfov": 1,
 "pitch": 3.23,
 "video": {
  "mp4Url": "media/video_39DDC866_2DFC_96B1_41BC_BC413ED0D51B.mp4",
  "width": 2560,
  "class": "VideoResource",
  "height": 1440
 }
},
{
 "items": [
  {
   "media": "this.video_387B4A9D_2DFC_8B89_41BB_809B3A1D79E4",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_3829F63D_2DD5_9AA6_41C0_8380B2FB75DF, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_3829F63D_2DD5_9AA6_41C0_8380B2FB75DF, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_3829F63D_2DD5_9AA6_41C0_8380B2FB75DF",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_3B6C53ED_2DFD_99B0_4185_A1C93D92E29B",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_3829863D_2DD5_9AA6_41A5_0A7C3E4B58A8, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_3829863D_2DD5_9AA6_41A5_0A7C3E4B58A8, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_3829863D_2DD5_9AA6_41A5_0A7C3E4B58A8",
 "class": "PlayList"
},
{
 "shadowBlurRadius": 6,
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "id": "window_39C1FFCA_2DFC_89F6_417A_1089C0AA0C34",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "titlePaddingLeft": 5,
 "borderRadius": 5,
 "shadowOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "bodyPaddingTop": 0,
 "scrollBarOpacity": 0.5,
 "minHeight": 20,
 "bodyPaddingLeft": 0,
 "bodyBackgroundOpacity": 0,
 "modal": true,
 "headerVerticalAlign": "middle",
 "bodyBackgroundColorDirection": "vertical",
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "backgroundColorRatios": [],
 "closeButtonPaddingTop": 5,
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "minWidth": 20,
 "horizontalAlign": "center",
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "bodyPaddingBottom": 0,
 "class": "Window",
 "backgroundColor": [],
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonRollOverIconLineWidth": 5,
 "closeButtonPressedIconLineWidth": 5,
 "closeButtonRollOverIconColor": "#666666",
 "bodyPaddingRight": 0,
 "closeButtonRollOverBorderColor": "#000000",
 "shadow": true,
 "titlePaddingTop": 5,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "footerBackgroundOpacity": 0,
 "shadowHorizontalLength": 3,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowSpread": 1,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "children": [
  "this.viewer_uid3829163C_2DD5_9AA6_41B9_23EE110B17B5"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "closeButtonRollOverBorderSize": 0,
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "backgroundOpacity": 1,
 "footerBackgroundColorDirection": "vertical",
 "shadowColor": "#000000",
 "footerHeight": 5,
 "paddingRight": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "closeButtonIconColor": "#000000",
 "propagateClick": false,
 "closeButtonPressedBackgroundOpacity": 0.3,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonBackgroundOpacity": 0.3,
 "borderSize": 0,
 "closeButtonPaddingRight": 5,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonPaddingLeft": 5,
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingTop": 10,
 "closeButtonBorderSize": 0,
 "closeButtonPaddingBottom": 5,
 "closeButtonPressedBorderColor": "#000000",
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "backgroundColorDirection": "vertical",
 "headerPaddingRight": 0,
 "closeButtonBorderRadius": 0,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "gap": 10,
 "headerBackgroundOpacity": 0,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "shadowVerticalLength": 0,
 "layout": "vertical",
 "closeButtonIconLineWidth": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "closeButtonPressedIconColor": "#888888",
 "paddingTop": 0,
 "data": {
  "name": "Window29551"
 },
 "closeButtonPressedBorderSize": 0,
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonIconWidth": 20
},
{
 "id": "ImageResource_38D7858F_2DD4_9E60_41B7_C64CDC0F678B",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_38D2B6CA_2DD4_9BE3_41B1_6D85383AB71A_0_0.jpg",
   "width": 5000,
   "class": "ImageResourceLevel",
   "height": 2500
  },
  {
   "url": "media/popup_38D2B6CA_2DD4_9BE3_41B1_6D85383AB71A_0_1.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_38D2B6CA_2DD4_9BE3_41B1_6D85383AB71A_0_2.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_38D2B6CA_2DD4_9BE3_41B1_6D85383AB71A_0_3.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/popup_38D2B6CA_2DD4_9BE3_41B1_6D85383AB71A_0_4.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "items": [
  {
   "media": "this.panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957",
   "camera": "this.panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_387B4A9D_2DFC_8B89_41BB_809B3A1D79E4",
   "start": "this.viewer_uid3826D63C_2DD5_9AA6_41AA_71E3D1C4E4E2VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_39045756_2DF3_7A93_41B8_98881995EF5A, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_39045756_2DF3_7A93_41B8_98881995EF5A, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid3826D63C_2DD5_9AA6_41AA_71E3D1C4E4E2VideoPlayer)",
   "player": "this.viewer_uid3826D63C_2DD5_9AA6_41AA_71E3D1C4E4E2VideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "PlayList_39045756_2DF3_7A93_41B8_98881995EF5A",
 "class": "PlayList"
},
{
 "label": "CAM04",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_38F5A9F7_2DF5_8993_41C0_F906B666C741_t.jpg",
 "width": 2560,
 "loop": false,
 "class": "Video",
 "id": "video_38F5A9F7_2DF5_8993_41C0_F906B666C741",
 "height": 1440,
 "video": {
  "mp4Url": "media/video_38F5A9F7_2DF5_8993_41C0_F906B666C741.mp4",
  "width": 2560,
  "class": "VideoResource",
  "height": 1440
 }
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "hideDuration": 500,
 "autoplay": true,
 "id": "popup_3BA0346D_2DD3_BEA3_41C3_51E5EE7CFAF5",
 "rotationX": 0,
 "class": "PopupPanoramaOverlay",
 "showEasing": "cubic_in",
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "rotationZ": 0,
 "yaw": -4.05,
 "hfov": 1.5,
 "pitch": 2.77,
 "video": {
  "mp4Url": "media/video_38756862_2DFD_76B5_41BC_416560B6C79B.mp4",
  "width": 2560,
  "class": "VideoResource",
  "height": 1440
 }
},
{
 "shadowBlurRadius": 6,
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "id": "window_38FB656B_2DD3_BEA7_41B0_974FDC04AD47",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "titlePaddingLeft": 5,
 "borderRadius": 5,
 "shadowOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "bodyPaddingTop": 0,
 "scrollBarOpacity": 0.5,
 "minHeight": 20,
 "bodyPaddingLeft": 0,
 "bodyBackgroundOpacity": 0,
 "modal": true,
 "headerVerticalAlign": "middle",
 "bodyBackgroundColorDirection": "vertical",
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "backgroundColorRatios": [],
 "closeButtonPaddingTop": 5,
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "minWidth": 20,
 "horizontalAlign": "center",
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "bodyPaddingBottom": 0,
 "class": "Window",
 "backgroundColor": [],
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonRollOverIconLineWidth": 5,
 "closeButtonPressedIconLineWidth": 5,
 "closeButtonRollOverIconColor": "#666666",
 "bodyPaddingRight": 0,
 "closeButtonRollOverBorderColor": "#000000",
 "shadow": true,
 "titlePaddingTop": 5,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "footerBackgroundOpacity": 0,
 "shadowHorizontalLength": 3,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowSpread": 1,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "children": [
  "this.viewer_uid3826A63C_2DD5_9AA6_41B0_AAF67EE7AC50"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "closeButtonRollOverBorderSize": 0,
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "backgroundOpacity": 1,
 "footerBackgroundColorDirection": "vertical",
 "shadowColor": "#000000",
 "footerHeight": 5,
 "paddingRight": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "closeButtonIconColor": "#000000",
 "propagateClick": false,
 "closeButtonPressedBackgroundOpacity": 0.3,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonBackgroundOpacity": 0.3,
 "borderSize": 0,
 "closeButtonPaddingRight": 5,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonPaddingLeft": 5,
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingTop": 10,
 "closeButtonBorderSize": 0,
 "closeButtonPaddingBottom": 5,
 "closeButtonPressedBorderColor": "#000000",
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "backgroundColorDirection": "vertical",
 "headerPaddingRight": 0,
 "closeButtonBorderRadius": 0,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "gap": 10,
 "headerBackgroundOpacity": 0,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "shadowVerticalLength": 0,
 "layout": "vertical",
 "closeButtonIconLineWidth": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "closeButtonPressedIconColor": "#888888",
 "paddingTop": 0,
 "data": {
  "name": "Window34676"
 },
 "closeButtonPressedBorderSize": 0,
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonIconWidth": 20
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
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
 "automaticZoomSpeed": 10,
 "id": "panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "rotationY": 0,
 "rotationX": 0,
 "yaw": -0.4,
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "popupMaxWidth": "75%",
 "class": "PopupPanoramaOverlay",
 "hideEasing": "cubic_out",
 "id": "popup_3B7D0C20_2DF4_8EB9_41AB_DD1D244BFD9C",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_3B7D0C20_2DF4_8EB9_41AB_DD1D244BFD9C_0_2.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 512
   }
  ]
 },
 "popupDistance": 100,
 "rotationZ": 0,
 "popupMaxHeight": "75%",
 "hfov": 0.72,
 "pitch": 0.44
},
{
 "label": "CAM05",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_3B6C53ED_2DFD_99B0_4185_A1C93D92E29B_t.jpg",
 "width": 2560,
 "loop": false,
 "class": "Video",
 "id": "video_3B6C53ED_2DFD_99B0_4185_A1C93D92E29B",
 "height": 1440,
 "video": {
  "mp4Url": "media/video_3B6C53ED_2DFD_99B0_4185_A1C93D92E29B.mp4",
  "width": 2560,
  "class": "VideoResource",
  "height": 1440
 }
},
{
 "items": [
  {
   "media": "this.video_38756862_2DFD_76B5_41BC_416560B6C79B",
   "start": "this.viewer_uid3826A63C_2DD5_9AA6_41B0_AAF67EE7AC50VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_38EF458D_2DD4_9E61_41B4_57290EB129CC, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_38EF458D_2DD4_9E61_41B4_57290EB129CC, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid3826A63C_2DD5_9AA6_41B0_AAF67EE7AC50VideoPlayer)",
   "player": "this.viewer_uid3826A63C_2DD5_9AA6_41B0_AAF67EE7AC50VideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "PlayList_38EF458D_2DD4_9E61_41B4_57290EB129CC",
 "class": "PlayList"
},
{
 "label": "CAM03",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_387B4A9D_2DFC_8B89_41BB_809B3A1D79E4_t.jpg",
 "width": 2560,
 "loop": false,
 "class": "Video",
 "id": "video_387B4A9D_2DFC_8B89_41BB_809B3A1D79E4",
 "height": 1440,
 "video": {
  "mp4Url": "media/video_387B4A9D_2DFC_8B89_41BB_809B3A1D79E4.mp4",
  "width": 2560,
  "class": "VideoResource",
  "height": 1440
 }
},
{
 "shadowBlurRadius": 6,
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "id": "window_38820F71_2DFD_8A93_41B1_E7DE16E3C90D",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "titlePaddingLeft": 5,
 "borderRadius": 5,
 "shadowOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "bodyPaddingTop": 0,
 "scrollBarOpacity": 0.5,
 "minHeight": 20,
 "bodyPaddingLeft": 0,
 "bodyBackgroundOpacity": 0,
 "modal": true,
 "headerVerticalAlign": "middle",
 "bodyBackgroundColorDirection": "vertical",
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "backgroundColorRatios": [],
 "closeButtonPaddingTop": 5,
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "minWidth": 20,
 "horizontalAlign": "center",
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "bodyPaddingBottom": 0,
 "class": "Window",
 "backgroundColor": [],
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonRollOverIconLineWidth": 5,
 "closeButtonPressedIconLineWidth": 5,
 "closeButtonRollOverIconColor": "#666666",
 "bodyPaddingRight": 0,
 "closeButtonRollOverBorderColor": "#000000",
 "shadow": true,
 "titlePaddingTop": 5,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "footerBackgroundOpacity": 0,
 "shadowHorizontalLength": 3,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowSpread": 1,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "children": [
  "this.viewer_uid3829C63D_2DD5_9AA6_4194_C2552432C31D"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "closeButtonRollOverBorderSize": 0,
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "backgroundOpacity": 1,
 "footerBackgroundColorDirection": "vertical",
 "shadowColor": "#000000",
 "footerHeight": 5,
 "paddingRight": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "closeButtonIconColor": "#000000",
 "propagateClick": false,
 "closeButtonPressedBackgroundOpacity": 0.3,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonBackgroundOpacity": 0.3,
 "borderSize": 0,
 "closeButtonPaddingRight": 5,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonPaddingLeft": 5,
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingTop": 10,
 "closeButtonBorderSize": 0,
 "closeButtonPaddingBottom": 5,
 "closeButtonPressedBorderColor": "#000000",
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "backgroundColorDirection": "vertical",
 "headerPaddingRight": 0,
 "closeButtonBorderRadius": 0,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "gap": 10,
 "headerBackgroundOpacity": 0,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "shadowVerticalLength": 0,
 "layout": "vertical",
 "closeButtonIconLineWidth": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "closeButtonPressedIconColor": "#888888",
 "paddingTop": 0,
 "data": {
  "name": "Window30184"
 },
 "closeButtonPressedBorderSize": 0,
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonIconWidth": 20
},
{
 "partial": true,
 "vfov": 22.5,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_0/f/0/{row}_{column}.jpg",
      "rowCount": 38,
      "height": 19456,
      "tags": "ondemand",
      "width": 19456,
      "colCount": 38,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_0/f/1/{row}_{column}.jpg",
      "rowCount": 19,
      "height": 9728,
      "tags": "ondemand",
      "width": 9728,
      "colCount": 19,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_0/f/2/{row}_{column}.jpg",
      "rowCount": 10,
      "height": 5120,
      "tags": "ondemand",
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_0/f/3/{row}_{column}.jpg",
      "rowCount": 5,
      "height": 2560,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_0/f/4/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_0/f/5/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_0/f/6/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_t.jpg"
  }
 ],
 "label": "TOP",
 "id": "panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957",
 "class": "Panorama",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_3879C45D_2DFC_9E92_41C2_FADA78D0201E",
  "this.popup_38907EF0_2DFC_8B92_41B4_F53BE9443ED7",
  "this.overlay_382B9268_2DFD_9AB1_41BD_A5930ABFAB3C",
  "this.popup_38EA0ED0_2DFD_8B91_41B2_008FDAD6F006"
 ],
 "hfov": 30,
 "hfovMax": 30
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "hideDuration": 500,
 "autoplay": true,
 "id": "popup_39D8A9E2_2DF3_89BB_41B4_942BDC20D0D0",
 "rotationX": 0,
 "class": "PopupPanoramaOverlay",
 "showEasing": "cubic_in",
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "rotationZ": 0,
 "yaw": -0.59,
 "hfov": 0.72,
 "pitch": -2.51,
 "video": {
  "mp4Url": "media/video_387B4A9D_2DFC_8B89_41BB_809B3A1D79E4.mp4",
  "width": 2560,
  "class": "VideoResource",
  "height": 1440
 }
},
{
 "items": [
  {
   "media": "this.video_38F5A9F7_2DF5_8993_41C0_F906B666C741",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_3829B63D_2DD5_9AA6_41BA_1E94B7C72967, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_3829B63D_2DD5_9AA6_41BA_1E94B7C72967, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_3829B63D_2DD5_9AA6_41BA_1E94B7C72967",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "partial": true,
 "vfov": 16.86,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_0/f/0/{row}_{column}.jpg",
      "rowCount": 38,
      "height": 19456,
      "tags": "ondemand",
      "width": 19456,
      "colCount": 38,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_0/f/1/{row}_{column}.jpg",
      "rowCount": 19,
      "height": 9728,
      "tags": "ondemand",
      "width": 9728,
      "colCount": 19,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_0/f/2/{row}_{column}.jpg",
      "rowCount": 10,
      "height": 5120,
      "tags": "ondemand",
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_0/f/3/{row}_{column}.jpg",
      "rowCount": 5,
      "height": 2560,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_0/f/4/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_0/f/5/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_0/f/6/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_t.jpg"
  }
 ],
 "label": "Aerial",
 "id": "panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48",
 "class": "Panorama",
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_38766DB4_2DF4_8999_4189_B69E06669F54",
  "this.popup_3B7D0C20_2DF4_8EB9_41AB_DD1D244BFD9C",
  "this.overlay_3B660EA9_2DF3_8B89_41A9_9C79F59DF630",
  "this.popup_39D8A9E2_2DF3_89BB_41B4_942BDC20D0D0"
 ],
 "hfov": 30,
 "hfovMax": 30
},
{
 "label": "CAM08",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_38756862_2DFD_76B5_41BC_416560B6C79B_t.jpg",
 "width": 2560,
 "loop": false,
 "class": "Video",
 "id": "video_38756862_2DFD_76B5_41BC_416560B6C79B",
 "height": 1440,
 "video": {
  "mp4Url": "media/video_38756862_2DFD_76B5_41BC_416560B6C79B.mp4",
  "width": 2560,
  "class": "VideoResource",
  "height": 1440
 }
},
{
 "shadowBlurRadius": 6,
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "id": "window_3875BA40_2DF3_8AF7_41B0_63F0A45B691F",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "titlePaddingLeft": 5,
 "borderRadius": 5,
 "shadowOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "bodyPaddingTop": 0,
 "scrollBarOpacity": 0.5,
 "minHeight": 20,
 "bodyPaddingLeft": 0,
 "bodyBackgroundOpacity": 0,
 "modal": true,
 "headerVerticalAlign": "middle",
 "bodyBackgroundColorDirection": "vertical",
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "backgroundColorRatios": [],
 "closeButtonPaddingTop": 5,
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "minWidth": 20,
 "horizontalAlign": "center",
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "bodyPaddingBottom": 0,
 "class": "Window",
 "backgroundColor": [],
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonRollOverIconLineWidth": 5,
 "closeButtonPressedIconLineWidth": 5,
 "closeButtonRollOverIconColor": "#666666",
 "bodyPaddingRight": 0,
 "closeButtonRollOverBorderColor": "#000000",
 "shadow": true,
 "titlePaddingTop": 5,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "footerBackgroundOpacity": 0,
 "shadowHorizontalLength": 3,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowSpread": 1,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "children": [
  "this.viewer_uid3826D63C_2DD5_9AA6_41AA_71E3D1C4E4E2"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "closeButtonRollOverBorderSize": 0,
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "backgroundOpacity": 1,
 "footerBackgroundColorDirection": "vertical",
 "shadowColor": "#000000",
 "footerHeight": 5,
 "paddingRight": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "closeButtonIconColor": "#000000",
 "propagateClick": false,
 "closeButtonPressedBackgroundOpacity": 0.3,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonBackgroundOpacity": 0.3,
 "borderSize": 0,
 "closeButtonPaddingRight": 5,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonPaddingLeft": 5,
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingTop": 10,
 "closeButtonBorderSize": 0,
 "closeButtonPaddingBottom": 5,
 "closeButtonPressedBorderColor": "#000000",
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "backgroundColorDirection": "vertical",
 "headerPaddingRight": 0,
 "closeButtonBorderRadius": 0,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "gap": 10,
 "headerBackgroundOpacity": 0,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "shadowVerticalLength": 0,
 "layout": "vertical",
 "closeButtonIconLineWidth": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "closeButtonPressedIconColor": "#888888",
 "paddingTop": 0,
 "data": {
  "name": "Window24822"
 },
 "closeButtonPressedBorderSize": 0,
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonIconWidth": 20
},
{
 "items": [
  {
   "media": "this.video_38756862_2DFD_76B5_41BC_416560B6C79B",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_3829E63D_2DD5_9AA6_41BE_3634308754E8, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_3829E63D_2DD5_9AA6_41BE_3634308754E8, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_3829E63D_2DD5_9AA6_41BE_3634308754E8",
 "class": "PlayList"
},
{
 "label": "CAM01",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_39DDC866_2DFC_96B1_41BC_BC413ED0D51B_t.jpg",
 "width": 2560,
 "loop": false,
 "class": "Video",
 "id": "video_39DDC866_2DFC_96B1_41BC_BC413ED0D51B",
 "height": 1440,
 "video": {
  "mp4Url": "media/video_39DDC866_2DFC_96B1_41BC_BC413ED0D51B.mp4",
  "width": 2560,
  "class": "VideoResource",
  "height": 1440
 }
},
{
 "items": [
  {
   "media": "this.video_39DDC866_2DFC_96B1_41BC_BC413ED0D51B",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_3829963D_2DD5_9AA6_41C0_FAE320613F92, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_3829963D_2DD5_9AA6_41C0_FAE320613F92, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_3829963D_2DD5_9AA6_41C0_FAE320613F92",
 "class": "PlayList"
},
{
 "partial": true,
 "vfov": 30,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0/f/0/{row}_{column}.jpg",
      "rowCount": 38,
      "height": 19456,
      "tags": "ondemand",
      "width": 19456,
      "colCount": 38,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0/f/1/{row}_{column}.jpg",
      "rowCount": 19,
      "height": 9728,
      "tags": "ondemand",
      "width": 9728,
      "colCount": 19,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0/f/2/{row}_{column}.jpg",
      "rowCount": 10,
      "height": 5120,
      "tags": "ondemand",
      "width": 5120,
      "colCount": 10,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0/f/3/{row}_{column}.jpg",
      "rowCount": 5,
      "height": 2560,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0/f/4/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0/f/5/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0/f/6/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_t.jpg"
  }
 ],
 "label": "SIDE",
 "id": "panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949",
 "class": "Panorama",
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_3B7633E8_2DD3_99A1_41BD_DE02D4C52EFF",
  "this.popup_3BA0346D_2DD3_BEA3_41C3_51E5EE7CFAF5",
  "this.overlay_3B8ED6C6_2DD4_BBE3_41B6_55BDF77B166B",
  "this.popup_38D2B6CA_2DD4_9BE3_41B1_6D85383AB71A"
 ],
 "hfov": 30,
 "hfovMax": 30
},
{
 "items": [
  {
   "media": "this.panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_38CC77DE_2DFD_B98D_4193_74A438C3A09F_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_38CC77DE_2DFD_B98D_4193_74A438C3A09F_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_38CC77DE_2DFD_B98D_4193_74A438C3A09F_playlist, 2, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_38CC77DE_2DFD_B98D_4193_74A438C3A09F_playlist",
 "class": "PlayList"
},
{
 "id": "ImageResource_39066759_2DF3_7A91_418A_A615EE70205D",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_3B7D0C20_2DF4_8EB9_41AB_DD1D244BFD9C_0_0.jpg",
   "width": 3000,
   "class": "ImageResourceLevel",
   "height": 1500
  },
  {
   "url": "media/popup_3B7D0C20_2DF4_8EB9_41AB_DD1D244BFD9C_0_1.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_3B7D0C20_2DF4_8EB9_41AB_DD1D244BFD9C_0_2.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/popup_3B7D0C20_2DF4_8EB9_41AB_DD1D244BFD9C_0_3.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "yaw": 12.45,
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "popupMaxWidth": "95%",
 "class": "PopupPanoramaOverlay",
 "hideEasing": "cubic_out",
 "id": "popup_38D2B6CA_2DD4_9BE3_41B1_6D85383AB71A",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_38D2B6CA_2DD4_9BE3_41B1_6D85383AB71A_0_3.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 512
   }
  ]
 },
 "popupDistance": 100,
 "rotationZ": 0,
 "popupMaxHeight": "95%",
 "hfov": 1.5,
 "pitch": 1.39
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "class": "VideoPlayer"
},
{
 "items": [
  {
   "media": "this.video_39DDC866_2DFC_96B1_41BC_BC413ED0D51B",
   "start": "this.viewer_uid3829163C_2DD5_9AA6_41B9_23EE110B17B5VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_3904C758_2DF3_7A9F_41AD_F9980A5C227C, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_3904C758_2DF3_7A9F_41AD_F9980A5C227C, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid3829163C_2DD5_9AA6_41B9_23EE110B17B5VideoPlayer)",
   "player": "this.viewer_uid3829163C_2DD5_9AA6_41B9_23EE110B17B5VideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "PlayList_3904C758_2DF3_7A9F_41AD_F9980A5C227C",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_3B6C53ED_2DFD_99B0_4185_A1C93D92E29B",
   "start": "this.viewer_uid3829C63D_2DD5_9AA6_4194_C2552432C31DVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_39050758_2DF3_7A9F_41C1_3AFB7CEBABBD, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_39050758_2DF3_7A9F_41C1_3AFB7CEBABBD, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid3829C63D_2DD5_9AA6_4194_C2552432C31DVideoPlayer)",
   "player": "this.viewer_uid3829C63D_2DD5_9AA6_4194_C2552432C31DVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "PlayList_39050758_2DF3_7A9F_41C1_3AFB7CEBABBD",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "hideDuration": 500,
 "autoplay": true,
 "id": "popup_38EA0ED0_2DFD_8B91_41B2_008FDAD6F006",
 "rotationX": 0,
 "class": "PopupPanoramaOverlay",
 "showEasing": "cubic_in",
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "rotationZ": 0,
 "yaw": 1.57,
 "hfov": 0.62,
 "pitch": -0.94,
 "video": {
  "mp4Url": "media/video_3B6C53ED_2DFD_99B0_4185_A1C93D92E29B.mp4",
  "width": 2560,
  "class": "VideoResource",
  "height": 1440
 }
},
{
 "transitionDuration": 500,
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
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
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
 "paddingBottom": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "borderSize": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "displayTooltipInTouchScreens": true,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "paddingTop": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "id": "ThumbnailList_38CC77DE_2DFD_B98D_4193_74A438C3A09F",
 "left": "0%",
 "paddingLeft": 20,
 "itemLabelHorizontalAlign": "center",
 "scrollBarWidth": 10,
 "itemMode": "normal",
 "itemLabelFontStyle": "normal",
 "borderRadius": 5,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "minHeight": 20,
 "itemLabelFontFamily": "Arial",
 "itemBorderRadius": 0,
 "horizontalAlign": "left",
 "minWidth": 20,
 "itemThumbnailOpacity": 1,
 "itemThumbnailShadowOpacity": 0.54,
 "class": "ThumbnailList",
 "height": "54.605%",
 "itemPaddingLeft": 3,
 "itemLabelPosition": "bottom",
 "itemHorizontalAlign": "center",
 "shadow": false,
 "itemThumbnailBorderRadius": 37,
 "itemThumbnailShadowSpread": 1,
 "itemPaddingTop": 3,
 "paddingBottom": 10,
 "itemBackgroundColor": [],
 "itemThumbnailShadowHorizontalLength": 3,
 "itemPaddingRight": 3,
 "itemBackgroundColorRatios": [],
 "verticalAlign": "top",
 "selectedItemLabelFontColor": "#FFCC00",
 "rollOverItemLabelFontWeight": "bold",
 "rollOverItemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "paddingRight": 20,
 "itemBackgroundOpacity": 0,
 "itemLabelTextDecoration": "none",
 "itemLabelFontWeight": "normal",
 "propagateClick": false,
 "top": "0%",
 "playList": "this.ThumbnailList_38CC77DE_2DFD_B98D_4193_74A438C3A09F_playlist",
 "borderSize": 0,
 "itemLabelFontSize": 14,
 "itemThumbnailScaleMode": "fit_outside",
 "scrollBarMargin": 2,
 "itemThumbnailShadowBlurRadius": 8,
 "itemLabelFontColor": "#FFFFFF",
 "itemThumbnailHeight": 75,
 "itemBackgroundColorDirection": "vertical",
 "layout": "vertical",
 "gap": 13,
 "itemThumbnailShadowVerticalLength": 3,
 "itemVerticalAlign": "middle",
 "itemOpacity": 1,
 "itemLabelGap": 8,
 "paddingTop": 10,
 "selectedItemLabelFontWeight": "bold",
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemThumbnailShadowColor": "#000000",
 "itemPaddingBottom": 3,
 "itemThumbnailShadow": true,
 "itemThumbnailWidth": 75
},
{
 "id": "veilPopupPanorama",
 "left": 0,
 "backgroundOpacity": 0.55,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "borderRadius": 0,
 "minHeight": 0,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "top": 0,
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "borderSize": 0,
 "minWidth": 0,
 "bottom": 0,
 "class": "UIComponent",
 "backgroundColorDirection": "vertical",
 "backgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "paddingTop": 0,
 "data": {
  "name": "UIComponent36828"
 }
},
{
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "borderRadius": 0,
 "minHeight": 0,
 "propagateClick": false,
 "backgroundColorRatios": [],
 "top": 0,
 "borderSize": 0,
 "minWidth": 0,
 "bottom": 0,
 "class": "ZoomImage",
 "backgroundColorDirection": "vertical",
 "backgroundColor": [],
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "paddingTop": 0,
 "data": {
  "name": "ZoomImage36829"
 },
 "scaleMode": "custom"
},
{
 "textDecoration": "none",
 "fontFamily": "Arial",
 "id": "closeButtonPopupPanorama",
 "rollOverIconColor": "#666666",
 "backgroundOpacity": 0.3,
 "paddingLeft": 5,
 "paddingRight": 5,
 "right": 10,
 "borderRadius": 0,
 "minHeight": 0,
 "iconWidth": 20,
 "propagateClick": false,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "iconHeight": 20,
 "top": 10,
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "borderSize": 0,
 "iconColor": "#000000",
 "minWidth": 0,
 "horizontalAlign": "center",
 "iconLineWidth": 5,
 "mode": "push",
 "fontSize": "1.29vmin",
 "iconBeforeLabel": true,
 "fontColor": "#FFFFFF",
 "class": "CloseButton",
 "shadowColor": "#000000",
 "backgroundColorDirection": "vertical",
 "label": "",
 "fontStyle": "normal",
 "gap": 5,
 "pressedIconColor": "#888888",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "layout": "horizontal",
 "shadow": false,
 "paddingBottom": 5,
 "visible": false,
 "paddingTop": 5,
 "data": {
  "name": "CloseButton36830"
 },
 "fontWeight": "normal",
 "verticalAlign": "middle",
 "cursor": "hand",
 "shadowBlurRadius": 6,
 "shadowSpread": 1
},
{
 "transitionDuration": 500,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "viewer_uid3829163C_2DD5_9AA6_41B9_23EE110B17B5",
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
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "playbackBarBottom": 0,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
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
 "paddingBottom": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "borderSize": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "displayTooltipInTouchScreens": true,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "paddingTop": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "data": {
  "name": "ViewerArea36826"
 }
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid3826D63C_2DD5_9AA6_41AA_71E3D1C4E4E2",
 "id": "viewer_uid3826D63C_2DD5_9AA6_41AA_71E3D1C4E4E2VideoPlayer",
 "class": "VideoPlayer"
},
{
 "transitionDuration": 500,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "viewer_uid3826A63C_2DD5_9AA6_41B0_AAF67EE7AC50",
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
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "playbackBarBottom": 0,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
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
 "paddingBottom": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "borderSize": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "displayTooltipInTouchScreens": true,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "paddingTop": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "data": {
  "name": "ViewerArea36825"
 }
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid3826A63C_2DD5_9AA6_41B0_AAF67EE7AC50",
 "id": "viewer_uid3826A63C_2DD5_9AA6_41B0_AAF67EE7AC50VideoPlayer",
 "class": "VideoPlayer"
},
{
 "transitionDuration": 500,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "viewer_uid3829C63D_2DD5_9AA6_4194_C2552432C31D",
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
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "playbackBarBottom": 0,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
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
 "paddingBottom": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "borderSize": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "displayTooltipInTouchScreens": true,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "paddingTop": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "data": {
  "name": "ViewerArea36827"
 }
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_38907EF0_2DFC_8B92_41B4_F53BE9443ED7, {'iconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedBackgroundColorDirection':'vertical','iconWidth':20,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedBorderColor':'#000000','rollOverBackgroundOpacity':0.3,'rollOverIconWidth':20,'rollOverBackgroundColorDirection':'vertical','pressedIconColor':'#888888','rollOverBorderColor':'#000000','pressedBorderSize':0,'pressedIconWidth':20,'pressedBackgroundOpacity':0.3,'rollOverIconHeight':20,'rollOverIconLineWidth':5,'iconHeight':20,'paddingBottom':5,'borderColor':'#000000','paddingTop':5,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'borderSize':0,'iconColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5}, true) } else { this.showPopupMedia(this.window_39C1FFCA_2DFC_89F6_417A_1089C0AA0C34, this.video_39DDC866_2DFC_96B1_41BC_BC413ED0D51B, this.PlayList_3904C758_2DF3_7A9F_41AD_F9980A5C227C, '95%', '95%', true, true) }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3901E754_2DF3_7A97_41C0_BE780DCDA8FC",
   "yaw": -4.89,
   "hfov": 1,
   "pitch": 3.23,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_3879C45D_2DFC_9E92_41C2_FADA78D0201E",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -4.89,
   "hfov": 1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_38EA0ED0_2DFD_8B91_41B2_008FDAD6F006, {'iconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedBackgroundColorDirection':'vertical','iconWidth':20,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedBorderColor':'#000000','rollOverBackgroundOpacity':0.3,'rollOverIconWidth':20,'rollOverBackgroundColorDirection':'vertical','pressedIconColor':'#888888','rollOverBorderColor':'#000000','pressedBorderSize':0,'pressedIconWidth':20,'pressedBackgroundOpacity':0.3,'rollOverIconHeight':20,'rollOverIconLineWidth':5,'iconHeight':20,'paddingBottom':5,'borderColor':'#000000','paddingTop':5,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'borderSize':0,'iconColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5}, true) } else { this.showPopupMedia(this.window_38820F71_2DFD_8A93_41B1_E7DE16E3C90D, this.video_3B6C53ED_2DFD_99B0_4185_A1C93D92E29B, this.PlayList_39050758_2DF3_7A9F_41C1_3AFB7CEBABBD, '95%', '95%', true, true) }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_1_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 124
     }
    ]
   },
   "pitch": -0.94,
   "roll": 0,
   "yaw": 1.57,
   "hfov": 0.7
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_382B9268_2DFD_9AB1_41BD_A5930ABFAB3C",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_1_HS_1_1_0_map.gif",
      "width": 58,
      "class": "ImageResourceLevel",
      "height": 62
     }
    ]
   },
   "yaw": 1.57,
   "hfov": 0.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_3B7D0C20_2DF4_8EB9_41AB_DD1D244BFD9C, {'iconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedBackgroundColorDirection':'vertical','iconWidth':20,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedBorderColor':'#000000','rollOverBackgroundOpacity':0.3,'rollOverIconWidth':20,'rollOverBackgroundColorDirection':'vertical','pressedIconColor':'#888888','rollOverBorderColor':'#000000','pressedBorderSize':0,'pressedIconWidth':20,'pressedBackgroundOpacity':0.3,'rollOverIconHeight':20,'rollOverIconLineWidth':5,'iconHeight':20,'paddingBottom':5,'borderColor':'#000000','paddingTop':5,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'borderSize':0,'iconColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5}, this.ImageResource_39066759_2DF3_7A91_418A_A615EE70205D, null, null, 10000, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_390FB751_2DF3_7A91_41AF_D7A005E16E40",
   "yaw": -0.4,
   "hfov": 0.72,
   "pitch": 0.44,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_38766DB4_2DF4_8999_4189_B69E06669F54",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -0.4,
   "hfov": 0.72,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_39D8A9E2_2DF3_89BB_41B4_942BDC20D0D0, {'iconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedBackgroundColorDirection':'vertical','iconWidth':20,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedBorderColor':'#000000','rollOverBackgroundOpacity':0.3,'rollOverIconWidth':20,'rollOverBackgroundColorDirection':'vertical','pressedIconColor':'#888888','rollOverBorderColor':'#000000','pressedBorderSize':0,'pressedIconWidth':20,'pressedBackgroundOpacity':0.3,'rollOverIconHeight':20,'rollOverIconLineWidth':5,'iconHeight':20,'paddingBottom':5,'borderColor':'#000000','paddingTop':5,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'borderSize':0,'iconColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5}, true) } else { this.showPopupMedia(this.window_3875BA40_2DF3_8AF7_41B0_63F0A45B691F, this.video_387B4A9D_2DFC_8B89_41BB_809B3A1D79E4, this.PlayList_39045756_2DF3_7A93_41B8_98881995EF5A, '95%', '95%', true, true) }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_3900D752_2DF3_7A93_41AE_F20F9136EFCE",
   "yaw": -0.59,
   "hfov": 0.72,
   "pitch": -2.51,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_3B660EA9_2DF3_8B89_41A9_9C79F59DF630",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -0.59,
   "hfov": 0.72,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.51
  }
 ]
},
{
 "transitionDuration": 500,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "viewer_uid3826D63C_2DD5_9AA6_41AA_71E3D1C4E4E2",
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
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "playbackBarBottom": 0,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
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
 "paddingBottom": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "borderSize": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "displayTooltipInTouchScreens": true,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "paddingTop": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "data": {
  "name": "ViewerArea36824"
 }
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_3BA0346D_2DD3_BEA3_41C3_51E5EE7CFAF5, {'iconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedBackgroundColorDirection':'vertical','iconWidth':20,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedBorderColor':'#000000','rollOverBackgroundOpacity':0.3,'rollOverIconWidth':20,'rollOverBackgroundColorDirection':'vertical','pressedIconColor':'#888888','rollOverBorderColor':'#000000','pressedBorderSize':0,'pressedIconWidth':20,'pressedBackgroundOpacity':0.3,'rollOverIconHeight':20,'rollOverIconLineWidth':5,'iconHeight':20,'paddingBottom':5,'borderColor':'#000000','paddingTop':5,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'borderSize':0,'iconColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5}, true) } else { this.showPopupMedia(this.window_38FB656B_2DD3_BEA7_41B0_974FDC04AD47, this.video_38756862_2DFD_76B5_41BC_416560B6C79B, this.PlayList_38EF458D_2DD4_9E61_41B4_57290EB129CC, '95%', '95%', true, true) }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_38E9058B_2DD4_9E60_41B3_D0EA069BD2E6",
   "yaw": -4.05,
   "hfov": 1.5,
   "pitch": 2.77,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_3B7633E8_2DD3_99A1_41BD_DE02D4C52EFF",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -4.05,
   "hfov": 1.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_38D2B6CA_2DD4_9BE3_41B1_6D85383AB71A, {'iconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedBackgroundColorDirection':'vertical','iconWidth':20,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedBorderColor':'#000000','rollOverBackgroundOpacity':0.3,'rollOverIconWidth':20,'rollOverBackgroundColorDirection':'vertical','pressedIconColor':'#888888','rollOverBorderColor':'#000000','pressedBorderSize':0,'pressedIconWidth':20,'pressedBackgroundOpacity':0.3,'rollOverIconHeight':20,'rollOverIconLineWidth':5,'iconHeight':20,'paddingBottom':5,'borderColor':'#000000','paddingTop':5,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'borderSize':0,'iconColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5}, this.ImageResource_38D7858F_2DD4_9E60_41B7_C64CDC0F678B, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_38EAA58C_2DD4_9E67_41AE_444864229717",
   "yaw": 12.45,
   "hfov": 1.5,
   "pitch": 1.39,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_3B8ED6C6_2DD4_BBE3_41B6_55BDF77B166B",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 12.45,
   "hfov": 1.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.39
  }
 ]
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid3829163C_2DD5_9AA6_41B9_23EE110B17B5",
 "id": "viewer_uid3829163C_2DD5_9AA6_41B9_23EE110B17B5VideoPlayer",
 "class": "VideoPlayer"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid3829C63D_2DD5_9AA6_4194_C2552432C31D",
 "id": "viewer_uid3829C63D_2DD5_9AA6_4194_C2552432C31DVideoPlayer",
 "class": "VideoPlayer"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_3901E754_2DF3_7A97_41C0_BE780DCDA8FC",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_396467A3_2DF5_79BD_41BC_BA450A3AB957_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_390FB751_2DF3_7A91_41AF_D7A005E16E40",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_3900D752_2DF3_7A93_41AE_F20F9136EFCE",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_38C25CAC_2DF4_8F8A_4183_566E3BCB3B48_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_38E9058B_2DD4_9E60_41B3_D0EA069BD2E6",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0_HS_2_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_38EAA58C_2DD4_9E67_41AE_444864229717",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_397A91EF_2DF5_7985_41A2_FDE074E6A949_0_HS_3_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ]
}],
 "class": "Player",
 "backgroundPreloadEnabled": true,
 "downloadEnabled": false,
 "layout": "absolute",
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Player22336"
 },
 "mouseWheelEnabled": true,
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
