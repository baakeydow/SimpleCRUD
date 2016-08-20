const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './board.routes';
import {myVideos} from './classes/video';

export class MainController {
	$http;
	socket;
	awesomeThings = [];
	newThing = '';
	newInfo = '';
	currentId = '';

	/*@ngInject*/
	isLoggedIn: Function;
	isAdmin: Function;
	getCurrentUser: Function;
	isCollapsed = true;

	videosList:Array<myVideos>;

	awesomeVids = [];
	newId = '';
	newTitle = '';
	newVideoCode = '';
	newDesc = '';

	incr = (function() {
	  	var id = 4;
			return function() { return id++; };
	})();

  getCode(url){
	 var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	 var match = url.match(regExp);
	 return (match&&match[7].length==11)? match[7] : false;
 };

	constructor(Auth, $http, $scope, socket) {
		'ngInject';
		this.isLoggedIn = Auth.isLoggedInSync;
		this.isAdmin = Auth.isAdminSync;
		this.getCurrentUser = Auth.getCurrentUserSync;
		this.$http = $http;
		this.socket = socket;
		this.videosList = [
			new myVideos(1, "PhantomJS for Web Automation", "OqEcn_6GBDI", " -  Ariya Hidayat"),
			new myVideos(2, "What the heck is the event loop ?", "8aGhZQkoFbQ", " - Philip Roberts at JSConf EU 2014"),
			new myVideos(3, "Async JS : Callbacks, Promises, Generators ", "obaSQBBWZLk", " - LearnCode.academy")
		]
		$scope.$on('$destroy', function() {
		  socket.unsyncUpdates('thing');
		});
	}

	$onInit() {
		this.$http.get('/api/things').then(response => {
			this.awesomeThings = response.data;
			this.socket.syncUpdates('thing', this.awesomeThings);
		});
		this.$http.get('/api/vids').then(response => {
			this.awesomeVids = response.data;
			this.socket.syncUpdates('vids', this.awesomeVids);
		});
	}
	updateThings() {
		if (this.newThing && this.newInfo && this.currentId) {
			this.$http.put('/api/things/' + this.currentId, { name: this.newThing, info: this.newInfo });
			this.$http.get('/api/things').then(response => {
			  this.awesomeThings = response.data;
			  this.socket.syncUpdates('thing', this.awesomeThings);
			});
			this.newThing = '';
			this.newInfo = '';
		}
	}
	addThing(){
		if (this.newThing && this.newInfo) {
			this.$http.post('/api/things', { name: this.newThing, info: this.newInfo });
			this.newThing = '';
			this.newInfo = '';
		}
	}
	editThing(thing) {
		console.log(thing._id);
		this.$http.get('/api/things/' + thing._id).then(response => {
			this.newThing = response.data.name;
			this.newInfo = response.data.info;
			this.currentId = response.data._id;
		});
	}
	deleteThing(thing) {
		this.$http.delete('/api/things/' + thing._id);
	}
	deselectThings(){
		this.newThing = '';
		this.newInfo = '';
	}
	//
	// Videos
	//
	addVid(){
		if (this.newTitle && this.newVideoCode && this.newDesc) {
			var code = this.getCode(this.newVideoCode);
			if (code) {
				this.$http.post('/api/vids', { title: this.newTitle,
												 videoCode: code,
												 desc: this.newDesc,
											 	 id: this.incr()});
			}
			this.newTitle = '';
			this.newVideoCode = '';
			this.newDesc = '';
			this.$http.get('/api/vids').then(response => {
				this.awesomeVids = response.data;
				this.socket.syncUpdates('vids', this.awesomeVids);
			});
		}
	}
	deleteVid(vid) {
		this.$http.delete('/api/vids/' + vid._id);
		this.$http.get('/api/vids').then(response => {
			this.awesomeVids = response.data;
			this.socket.syncUpdates('vids', this.awesomeVids);
		});
	}
	displayVids(vid:myVideos){
		var code = vid.videoCode;
		document.getElementById("youtube").innerHTML= `
		<iframe width=\"80%\" height=\"480px\"
		src=\"http://www.youtube.com/embed/${code}?autoplay=1\">
		</iframe>`
	}

	closeVid(){
		document.getElementById("youtube").innerHTML= ``
	}
}
export default angular.module('angularGeneratorApp.board', [
  uiRouter])
    .config(routing)
    .component('board', {
      template: require('./board.html'),
      controller: MainController
    })
    .name;
