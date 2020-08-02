/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "4b96a441a49430027da3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./app/js/index.js")(__webpack_require__.s = "./app/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/img/back/formSubBack.jpg":
/*!**************************************!*\
  !*** ./app/img/back/formSubBack.jpg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a1e9409434017460c66604466051febc.jpg";

/***/ }),

/***/ "./app/img/back/parallax_1.jpg":
/*!*************************************!*\
  !*** ./app/img/back/parallax_1.jpg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "61a5630875d03a179a778a5b285d376c.jpg";

/***/ }),

/***/ "./app/img/back/parallax_2.jpg":
/*!*************************************!*\
  !*** ./app/img/back/parallax_2.jpg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c9c37afe6fd3b7188527d5842b80f0a9.jpg";

/***/ }),

/***/ "./app/img/products/pr1.jpg":
/*!**********************************!*\
  !*** ./app/img/products/pr1.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9878b2948e497d013b17cf0bb988f60c.jpg";

/***/ }),

/***/ "./app/img/products/pr2.jpg":
/*!**********************************!*\
  !*** ./app/img/products/pr2.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "adf723254c333c079e3b6e0d6363f6c9.jpg";

/***/ }),

/***/ "./app/img/products/pr3.jpg":
/*!**********************************!*\
  !*** ./app/img/products/pr3.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "94e138c00596571d1f50f85a98fe73ba.jpg";

/***/ }),

/***/ "./app/img/products/pr4.jpg":
/*!**********************************!*\
  !*** ./app/img/products/pr4.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "60b2e392c5a6c86a2324a887368c49db.jpg";

/***/ }),

/***/ "./app/img/products/pr5.jpg":
/*!**********************************!*\
  !*** ./app/img/products/pr5.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1757f73a77dd4efc6c453eebe13ca227.jpg";

/***/ }),

/***/ "./app/img/products/pr6.jpg":
/*!**********************************!*\
  !*** ./app/img/products/pr6.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8fceab0c5a6d5450ed34e5b012f17f7f.jpg";

/***/ }),

/***/ "./app/img/products/pr7.jpg":
/*!**********************************!*\
  !*** ./app/img/products/pr7.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0041c28d7df978c110e8be62f5331ddf.jpg";

/***/ }),

/***/ "./app/img/products/pr8.jpg":
/*!**********************************!*\
  !*** ./app/img/products/pr8.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cf438a3bcfbd98c8b29db06140ef2312.jpg";

/***/ }),

/***/ "./app/img/team/team1.jpg":
/*!********************************!*\
  !*** ./app/img/team/team1.jpg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a537f16396367a4686b8f17791ada6d8.jpg";

/***/ }),

/***/ "./app/img/team/team2.jpg":
/*!********************************!*\
  !*** ./app/img/team/team2.jpg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "95c6a307339711847efb71c3deb35d42.jpg";

/***/ }),

/***/ "./app/img/team/team3.jpg":
/*!********************************!*\
  !*** ./app/img/team/team3.jpg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0ca8ca37f6f44788ca5775663e7f01e8.jpg";

/***/ }),

/***/ "./app/img/team/team4.jpg":
/*!********************************!*\
  !*** ./app/img/team/team4.jpg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f7971b1b0747213f2c3c73e131332252.jpg";

/***/ }),

/***/ "./app/img/team/team5.jpg":
/*!********************************!*\
  !*** ./app/img/team/team5.jpg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "091ba54d8f0087c1e8808bdf6650f337.jpg";

/***/ }),

/***/ "./app/index.temp.html":
/*!*****************************!*\
  !*** ./app/index.temp.html ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\t<head>\r\n\t\t<meta charset=\"UTF-8\">\r\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, shrink-to-fit=no\">\r\n\t\t<title>Agnecy</title>\r\n\t\t<link rel=\"stylesheet\" href=\"bootstrap-grid.min.css\" >\r\n\t</head>\r\n\t<body>\r\n\t\t<div class=\"parall\">\r\n\t\t<div class=\"parallax_1\"></div>\r\n\t\t\t<div class=\"parallax_2\"></div>\r\n\t\t\t<div class=\"header-wrap__inflow\">\r\n\t\t\t<div class=\"header-wrap\">\r\n\t\t\t\t<div class=\"nav__mobile\">\r\n\t\t\t\t\t<div class=\"link_block\">\r\n\t\t\t\t\t\t<a class=\"link__cap_mobile\" href=\"#\">\r\n\t\t\t\t\t\t\thome\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"link_block\">\r\n\t\t\t\t\t\t<a class=\"link__cap_mobile\" href=\"#\">\r\n\t\t\t\t\t\t\tportfolio\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"link_block\">\r\n\t\t\t\t\t\t<a class=\"link__cap_mobile\" href=\"#\">\r\n\t\t\t\t\t\t\tabout us\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"link_block\">\r\n\t\t\t\t\t\t<a class=\"link__cap_mobile\" href=\"#\">\r\n\t\t\t\t\t\t\tcontact\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t<header class=\"header header_\"> <!-- BLOCK -->\r\n\t\t\t<div class=\"wrap__flex-nav\">\r\n\t\t\t<ul class=\"nav nav_\">\r\n\t\t\t\t<li class=\"nav__item\">\r\n\t\t\t\t\t<a class=\"link link_1\" href=\"#\">\r\n\t\t\t\t\t\t<div class=\"link__cap\">\r\n\t\t\t\t\t\t\thome\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class=\"nav__item\">\r\n\t\t\t\t\t<a class=\"link link_2\" href=\"#\">\r\n\t\t\t\t\t\t<div class=\"link__cap\">\r\n\t\t\t\t\t\t\tportfolio\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class=\"nav__item\">\r\n\t\t\t\t\t<a class=\"link link_3\" href=\"#\">\r\n\t\t\t\t\t\t<div class=\"link__cap\">\r\n\t\t\t\t\t\t\tabout us\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class=\"nav__item\">\r\n\t\t\t\t\t<a class=\"link link_4\" href=\"#\">\r\n\t\t\t\t\t\t<div class=\"link__cap\">\r\n\t\t\t\t\t\t\tcontact\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t\t\t<div class=\"bigmac\">\r\n\t\t\t\t<div class=\"bigmac__inner\"></div>\r\n\t\t\t\t<div class=\"bigmac__inner\"></div>\r\n\t\t\t\t<div class=\"bigmac__inner\"></div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t</header> \r\n\t\t<section class=\"section-contacts\">\r\n\t\t\t<div class=\"sect sect__contacts\">\r\n\t\t\t<div class=\"contacts__text\">\r\n\t\t\t\t<div class=\"covers\">\r\n\t\t\t\t<h1 class=\"headBig contacts__headBig_1\">\r\n\t\t\t\t\tour strong\r\n\t\t\t\t</h1>\r\n\t\t\t\t</div>\r\n\t\t\t\t<h1 class=\"headBig contacts__headBig_2\">\r\n\t\t\t\t\torganization\r\n\t\t\t\t</h1>\r\n\t\t\t\t<p class=\"par contacts__par\"> \r\n\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Quod non pariatur nam facilis omnis quasi atque architecto, veritatis, ipsum nemo a! \r\n\t\t\t\t</p>\r\n\t\t\t\t<button type=\"button\" class=\"button contacts__button\">\r\n\t\t\t\t\tcontact us\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t\t<!-- <figure class=\"figure-flex contacts__figure\"> -->\r\n\t\t\t\t<iframe  class=\"contacts__video\" src=\"https://www.youtube.com/embed/IItzqfH8h_o\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n\t\t\t\t<!-- <figcaption class=\"fig-cap\">\r\n\t\t\t\t\t<p class=\"fig__cap\"> Description of the video available on video hosting service Youtube</p>\r\n\t\t\t\t</figcaption>\r\n\t\t\t\t\t\t\t</figure> -->\r\n\t\t\t</div>\r\n\r\n\t\t</section>\r\n\t</div>\r\n\t</div>\r\n\t</div>\r\n\t\t\t\r\n<div class=\"pageBackColor2\">\r\n\t<div style=\"height:1px;\"></div>\r\n\t\t\r\n\t<section class=\"section-offers\">\r\n\t\t<div class=\"sect section__offers container\">\t\t\t\r\n\t\t\t<div class=\"col-xl-5 col-lg-12 no-pad offers_media\">\r\n\t\t\t\t<h3 class=\"headMid offers__headMid\">\r\n\t\t\t\t\tdo you know what we can provide for you ?\r\n\t\t\t\t</h3>\r\n\t\t\t\t<p class=\"par offers__par\">\r\n\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum aspernatur natus fugiat eos, voluptates ducimus. Odit tempore rem iure. Accusamus, nisi dolor cupiditate recusandae. Labore provident ipsa est commodi nesciunt.\r\n\t\t\t\t</p>\r\n\t\t\t\t<button type=\"button\" class=\"button offers__button\">\r\n\t\t\t\t\tLearn More\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class=\"col-xl-6 col-lg-12 offset-xl-1 row offers__desc no-pad \">\r\n\t\t\t\t<div class=\"row mb-25 offers_wrap\">\r\n\t\t\t\t\t<div class=\"col-lg-6 col-md-12 __media\">\r\n\t\t\t\t\t\t<i class=\"fas fa-cog offers__icon\"></i>\r\n\t\t\t\t\t\t<h4 class=\"headLit offers__headLit\">\r\n\t\t\t\t\t\t\tManagement\r\n\t\t\t\t\t\t</h4>\r\n\t\t\t\t\t\t<p class=\"par par_transparent mr0 mt-6\">\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Optio deserunt repudiandae blanditiis doloribus voluptatem vitae porro facere, rem iste esse labore \r\n\t\t\t\t\t\t</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-lg-6 col-md-12 __media\">\r\n\t\t\t\t\t\t<i class=\"fas fa-pencil-alt offers__icon\"></i>\r\n\t\t\t \t\t\t<h4 class=\"headLit offers__headLit\">\r\n\t\t\t \t\t\t\tUI / UX design\r\n\t\t\t \t\t\t</h4>\r\n\t\t\t \t\t\t<p class=\"par par_transparent mr0 mt-6\">\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita voluptas quidem non quod ad mollitia excepturi quasi quos accusantium error quas, similique\r\n\t\t\t \t\t\t</p>\r\n\t\t\t \t\t</div>\r\n\t\t\t \t</div>\r\n\r\n\t\t\t<div class=\"row offers_wrap\">\r\n\t\t\t\t<div class=\"col-lg-6 col-md-12 pr-30 __media\">\r\n\t\t\t\t\t<i class=\"far fa-gem offers__icon\"></i>\r\n\t\t\t\t\t<h4 class=\"headLit offers__headLit\">Logo / Branding\r\n\t\t\t\t\t</h4>\r\n\t\t\t\t\t<p class=\"par par_transparent mr0 mt-6\">\r\n\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt sunt dolorum perspiciatis at consequatur, asperiores optio sint praesentium. Itaque expedita, dolor\r\n\t\t\t\t\t</p>\r\n\t\t\t \t</div>\r\n\t\t\t \t<div class=\"col-lg-6 col-md-12 __media\">\r\n\t\t\t \t\t<i class=\"fas fa-truck offers__icon\"></i>\r\n\t\t\t \t\t<h4 class=\"headLit offers__headLit\">\r\n\t\t\t \t\t\tAnimation\r\n\t\t\t \t\t</h4>\r\n\t\t\t \t\t<p class=\"par par_transparent mr0 mt-6\">\r\n\t\t\t \t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus cupiditate quam molestias debitis illo repellendus similique, possimus\r\n\t\t\t \t\t</p>\r\n\t\t\t\t</div> \r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</section>\r\n<section class=\"section-products\">\r\n\t<div class=\"sect section__products\">\r\n\t\t\t<h3 class=\"headMid products__headMid\">\r\n\t\t\t\tfeature products\r\n\t\t\t</h3>\r\n\t\t\t<p class=\"par products__par\">\r\n\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia illo delectus, vitae esse, maiores consequuntur quis voluptate autem!\r\n\t\t\t</p>\r\n\t\t\t<div class=\"horRow\"></div>\r\n\t\t\t<ul class=\"list-flex products__list\">\r\n\t\t\t\t<li class=\"list__item\">\r\n\t\t\t\t\t<a href=\"#\" class=\"category-link\">all</a>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class=\"list__item\">\r\n\t\t\t\t\t<a href=\"#\" class=\"category-link\">print template</a>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class=\"list__item\">\r\n\t\t\t\t\t<a href=\"#\" class=\"category-link\">web template</a>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class=\"list__item\">\r\n\t\t\t\t\t<a href=\"#\" class=\"category-link\">user interface</a>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class=\"list__item\">\r\n\t\t\t\t\t<a href=\"#\" class=\"category-link\">mock-up</a>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t\t<div class=\"img-const-array \">\r\n\t\t\t\t<figure class=\"fig products__figure\">\r\n\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/products/pr1.jpg */ "./app/img/products/pr1.jpg") + "\" alt=\"our products\">\r\n\t\t\t\t</figure>\r\n\t\t\t\t<figure class=\"fig products__figure\">\r\n\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/products/pr2.jpg */ "./app/img/products/pr2.jpg") + "\" alt=\"our products\">\r\n\t\t\t\t</figure>\r\n\t\t\t\t<figure class=\"fig products__figure\">\r\n\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/products/pr3.jpg */ "./app/img/products/pr3.jpg") + "\" alt=\"our products\">\r\n\t\t\t\t</figure>\r\n\t\t\t\t<figure class=\"fig products__figure\">\r\n\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/products/pr4.jpg */ "./app/img/products/pr4.jpg") + "\" alt=\"our products\">\r\n\t\t\t\t</figure>\r\n\t\t\t\t<figure class=\"fig products__figure\">\r\n\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/products/pr5.jpg */ "./app/img/products/pr5.jpg") + "\" alt=\"our products\">\r\n\t\t\t\t</figure>\r\n\t\t\t\t<figure class=\"fig products__figure\">\r\n\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/products/pr6.jpg */ "./app/img/products/pr6.jpg") + "\" alt=\"our products\">\r\n\t\t\t\t</figure>\r\n\t\t\t\t<figure class=\"fig products__figure\">\r\n\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/products/pr7.jpg */ "./app/img/products/pr7.jpg") + "\" alt=\"our products\">\r\n\t\t\t\t</figure>\r\n\t\t\t\t<figure class=\"fig products__figure\">\r\n\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/products/pr8.jpg */ "./app/img/products/pr8.jpg") + "\" alt=\"our products\">\r\n\t\t\t\t</figure>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</section>\r\n\t<section class=\"section-team\">\r\n\t\t<div class=\"sect section__team\">\r\n\t\t\t<div class=\"team__wrap\">\r\n\t\t\t\t<h4 class=\"headMid team__headMid\">\r\n\t\t\t\t\tmeet our team\r\n\t\t\t\t</h4>\r\n\t\t\t\t<p class=\"par team__par\">\r\n\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati tenetur facere veniam voluptate mollitia repellat neque quas vel autem, totam nam corporis reiciendis et. Sequi iste maxime dolore quos modi.\r\n\t\t\t\t</p>\r\n\t\t\t\t<div class=\"horRow team__horRow\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"members\">\r\n\t\t\t\t<figure class=\"fig member-figure__detailed\">\r\n\t\t\t\t\t\t<img class=\"img\"src=\"" + __webpack_require__(/*! ./img/team/team1.jpg */ "./app/img/team/team1.jpg") + "\" alt=\"our team member\">\r\n\t\t\t\t</figure>\r\n\t\t\t\t<div class=\"members-info\">\r\n\t\t\t\t\t<h4 class=\"headLit members__headLit\">\r\n\t\t\t\t\t\tmark wough\r\n\t\t\t\t\t</h4>\r\n\t\t\t\t\t<p class=\"par member__info\">\r\n\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ab aut inventore reiciendis iusto similique harum voluptatibus impedit assumenda ipsa fugit, voluptate ullam ex modi. Natus nisi, necessitatibus nulla alias.\r\n\t\t\t\t\t</p>\r\n\t\t\t\t\t<ul class=\"list-flex members__list\">\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\tFacebook\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\tDribble\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\tBehance\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\tTwitter\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t\t<div class=\"img-const-array\">\r\n\t\t\t\t\t\t<figure class=\"fig members__fig\">\r\n\t\t\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/team/team2.jpg */ "./app/img/team/team2.jpg") + "\" alt=\"our team member\">\r\n\t\t\t\t\t\t</figure>\r\n\t\t\t\t\t\t<figure class=\"fig members__fig\">\r\n\t\t\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/team/team3.jpg */ "./app/img/team/team3.jpg") + "\" alt=\"our team member\">\r\n\t\t\t\t\t\t</figure>\r\n\t\t\t\t\t\t<figure class=\"fig members__fig\">\r\n\t\t\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/team/team4.jpg */ "./app/img/team/team4.jpg") + "\" alt=\"our team member\">\r\n\t\t\t\t\t\t</figure>\r\n\t\t\t\t\t\t<figure class=\"fig members__fig\">\r\n\t\t\t\t\t\t\t<img class=\"img\" src=\"" + __webpack_require__(/*! ./img/team/team5.jpg */ "./app/img/team/team5.jpg") + "\" alt=\"our team member\">\r\n\t\t\t\t\t\t</figure>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</section>\r\n\t\t\t<section class=\"section-formSub\">\r\n\r\n\t\t\t\t<div style=\"height:1px;\"></div>\r\n\r\n\t\t\t\t<h1 class=\"headBig formSub__head\">\r\n\t\t\t\t\tDesign tips, tricks, and freebies. Delivered weekly.\r\n\t\t\t\t</h1>\r\n\t\t\t\t<p class=\"par formSub__par\">\r\n\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit.\r\n\t\t\t\t</p>\r\n\t\t\t\t<div class=\"formSub-wrap\">\r\n\t\t\t\t\t<div class=\"formSub__wrap-input-icon\">\r\n\t\t\t\t\t<input type=\"text\" name=\"email\" class=\"input formSub__input\" placeholder=\"Type your email\" required>\r\n\t\t\t\t\t<i class = \"fas fa-check icon__accept\"></i>\r\n\t\t\t\t\t<i class=\"fas fa-times icon__error\"></i>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<button type=\"submit\" name=\"submit\" class=\"button formSub__btn\" value=\"subQuery\">\r\n\t\t\t\t\t\tsubscribe\r\n\t\t\t\t\t</button>\r\n\t\t\t\t</div>\r\n\t\t\t</section>  \r\n\t\t</div>\r\n\t\t\t<!-- MAX WIDTH END -->\r\n<div class=\"pageBackColor2\">\r\n\t\t\t<div style=\"height:1px;\"></div>\t\r\n\t<section class=\"section-connect\">\r\n\t\t\t<div class=\"sect section__connect\">\t\r\n\t\t\t<div class=\"connect__wrap-header\">\r\n\t\t\t\t<h3 class=\"headMid connect__headMid\">\r\n\t\t\t\t\tget in touch\r\n\t\t\t\t</h3>\r\n\t\t\t\t<p class=\"par connect__par\">\r\n\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Autem molestiae, minus sed non iusto sapiente ipsam maxime architecto quos numquam temporibus eum nulla et voluptas deleniti reprehenderit obcaecati iure doloribus?\r\n\t\t\t\t</p>\r\n\t\t\t\t<div class=\"horRow connect__horRow\">\t\t\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"connect__wrap-footer\">\t\r\n\t\t\t\t<div class=\"connect__inner-wrap\">\r\n\t\t\t\t\t<form action=\"mailto:vlas.d78@gmail.com\" method=\"post\" id=\"formSendEmail\" action=\"./sendMsg.php\" enctype=\"multipart/form-data\">\r\n\t\t\t\t\t\t<div class=\"connect__inputs-user-info\">\r\n\t\t\t\t\t\t\t<div class=\"input-name\">\r\n\t\t\t\t\t\t\t\t<input type=\"text\" name=\"fname\" class=\"input connect__input connect__input-name\" placeholder=\"Type your first name\" form=\"formSendEmail\"required>\r\n\t\t\t\t\t\t\t\t<i class = \"fas fa-check icon__accept\r\n\t\t\t\t\t\t\ticon_accept-offset\"></i>\r\n\t\t\t\t\t\t\t\t<i class=\"fas fa-times icon__error\r\n\t\t\t\t\t\t\ticon_error-offset\"></i>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"input-mail\">\r\n\t\t\t\t\t\t\t\t<input type=\"text\" name=\"mail\" class=\"input connect__input connect__input-mail\" placeholder=\"Type your email\" form=\"formSendEmail\" form=\"formSendEmail\" required>\r\n\t\t\t\t\t\t\t\t<i class = \"fas fa-check icon__accept\"></i>\r\n\t\t\t\t\t\t\t\t<i class=\"fas fa-times icon__error\"></i>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<textarea name=\"msg\" class=\"input connect__input connect__input-msg\" placeholder=\"Type your message\" form=\"formSendEmail\"></textarea>\r\n\t\t\t\t\t\t<button type=\"button\" class=\"button connect__button\" form=\"formSendEmail\">\r\n\t\t\t\t\t\tsend message\r\n\t\t\t\t\t\t</button>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"contact-info connect__contact-info\">\r\n\t\t\t\t\t<div class=\"info__content\">\t\t\r\n\t\t\t\t\t\t<h4 class=\"headLit info__headLit\">\r\n\t\t\t\t\t\t\tcontact info\r\n\t\t\t\t\t\t</h4>\r\n\t\t\t\t\t\t<p class=\"par info__par\">\r\n\t\t\t\t\t\t\tUkraine, Kiev <br>\r\n\t\t\t\t\t\t\tVlas Dielov <br>\r\n\t\t\t\t\t\t\tmail: vlas.d78@gmail.com <br>\r\n\t\t\t\t\t\t\tgitHub: https://github.com/vlasJedi <br>\r\n\t\t\t\t\t\t\tmobile: +380951873509\t\r\n\t\t\t\t\t\t</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</section>\r\n\t\t<footer class=\"footer\">\r\n\t\t\t<div class=\"content__align\">\r\n\t\t\t\t<p class=\"footer__rights\">\r\n\t\t\t\t\t<code> &#169;</code>Copyright@2018. All rights reserved. \r\n\t\t\t\t</p>\r\n\t\t\t\t<p class=\"text-highlight\">\r\n\t\t\t\t\t\tYou can connect with me via\r\n\t\t\t\t</p>\r\n\t\t\t\t<ul class=\"list list-social\">\r\n\t\t\t\t\t<li class=\"list-hor-const__item\">\r\n\t\t\t\t\t\t<a href=\"skype:vlas.d78?chat\"  rel=\"nofollow\" target=\"_blank\">\r\n\t\t\t\t\t\t<i class=\"fab fa-skype fas__\"></i>\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li class=\"list-hor-const__item\">\r\n\t\t\t\t\t\t<a href=\"https://twitter.com/vlasdielov\"  rel=\"nofollow\" target=\"_blank\">\r\n\t\t\t\t\t\t<i class=\"fab fa-twitter fas__\"></i>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li class=\"list-hor-const__item\">\r\n\t\t\t\t\t\t<a href=\"https://www.facebook.com/vlasdielov\" rel=\"nofollow\" target=\"_blank\">\r\n\t\t\t\t\t\t<i class=\"fab fa-facebook-f fas__\"></i>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li class=\"list-hor-const__item\">\r\n\t\t\t\t\t\t<a href=\"https://github.com/vlasJedi\" rel=\"nofollow\" target=\"_blank\">\r\n\t\t\t\t\t\t<i class=\"fab fa-github fas__\"></i>\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</footer>\r\n\t<div style=\"height:1px;\"></div>\t\r\n\t</div>\t\r\n\r\n\t\t<script defer src=\"https://use.fontawesome.com/releases/v5.4.2/js/all.js\" integrity=\"sha384-wp96dIgDl5BLlOXb4VMinXPNiB32VYBSoXOoiARzSTXY+tsK8yDTYfvdTyqzdGGN\" crossorigin=\"anonymous\"></script>\r\n\t</body>\r\n\t</html>\r\n";

/***/ }),

/***/ "./app/js/checkSubscribtion.js":
/*!*************************************!*\
  !*** ./app/js/checkSubscribtion.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return checkSubscribtion; });
;
"use strict";

function checkSubscribtion(input) {
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  formData.append("email", input.value); // PHP FILE TO HANDLE SUBSCRIBTION

  xhr.open('POST', './subscribeUser.php', true);
  xhr.send(formData);
  xhr.timeout = 3000;

  xhr.ontimeout = function () {
    return false;
  };

  xhr.onload = function () {
    if (xhr.responseText) {
      alert("You succesfully subscribed !");
    } else {
      alert("You are already subscribed !");
    }
  };
}
;

/***/ }),

/***/ "./app/js/index.js":
/*!*************************!*\
  !*** ./app/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./app/scss/main.scss");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_temp_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.temp.html */ "./app/index.temp.html");
/* harmony import */ var _index_temp_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_temp_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _validateEmail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validateEmail */ "./app/js/validateEmail.js");
/* harmony import */ var _validateName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validateName */ "./app/js/validateName.js");
/* harmony import */ var _checkSubscribtion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./checkSubscribtion */ "./app/js/checkSubscribtion.js");
/* harmony import */ var _navCollapse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./navCollapse */ "./app/js/navCollapse.js");
/* harmony import */ var _showAcceptErrorIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./showAcceptErrorIcon */ "./app/js/showAcceptErrorIcon.js");
;
"use strict";






 // INVLUDES VALIDATE EMAIL



(function () {
  var mobileNav = document.querySelectorAll(".link_block");
  var classIn = "js-uncollapsed";
  var classOut = "js-collapsed";
  var burger = document.querySelector(".bigmac");
  var btnSubs = document.querySelector(".formSub__btn");
  var inpSubs = document.querySelector(".formSub__input");
  var inpName = document.querySelector(".connect__input-name");
  var inpMail = document.querySelector(".connect__input-mail");
  burger.addEventListener("click", function () {
    Object(_navCollapse__WEBPACK_IMPORTED_MODULE_5__["default"])(mobileNav, classIn, classOut);
  });
  btnSubs.addEventListener('click', function () {
    if (Object(_validateEmail__WEBPACK_IMPORTED_MODULE_2__["default"])(inpSubs)) {
      Object(_checkSubscribtion__WEBPACK_IMPORTED_MODULE_4__["default"])(inpSubs);
    }
  });
  inpSubs.addEventListener('change', function () {
    /* ICONS SHOULD BE SELECTED AT CALL TIME BECAUSE
      ICONS, AFTER LOAD, SWITCH TO SVG SO SELECTORS
      BECOME UNDEFINED */
    var iconAccept = document.querySelector(".formSub__wrap-input-icon > .icon__accept");
    var iconError = document.querySelector(".formSub__wrap-input-icon > .icon__error");
    Object(_showAcceptErrorIcon__WEBPACK_IMPORTED_MODULE_6__["default"])(inpSubs, iconAccept, iconError, "visible", _validateEmail__WEBPACK_IMPORTED_MODULE_2__["default"]);
  });
  inpName.addEventListener('change', function () {
    /* ICONS SHOULD BE SELECTED AT CALL TIME BECAUSE
      ICONS, AFTER LOAD, SWITCH TO SVG SO SELECTORS
      BECOME UNDEFINED */
    var iconAccept = document.querySelector(".input-name > .icon__accept");
    var iconError = document.querySelector(".input-name > .icon__error");
    Object(_showAcceptErrorIcon__WEBPACK_IMPORTED_MODULE_6__["default"])(inpName, iconAccept, iconError, "visible", _validateName__WEBPACK_IMPORTED_MODULE_3__["default"]);
  });
  inpMail.addEventListener('change', function () {
    /* ICONS SHOULD BE SELECTED AT CALL TIME BECAUSE
      ICONS, AFTER LOAD, SWITCH TO SVG SO SELECTORS
      BECOME UNDEFINED */
    var iconAccept = document.querySelector(".input-mail > .icon__accept");
    var iconError = document.querySelector(".input-mail > .icon__error");
    Object(_showAcceptErrorIcon__WEBPACK_IMPORTED_MODULE_6__["default"])(inpMail, iconAccept, iconError, "visible", _validateEmail__WEBPACK_IMPORTED_MODULE_2__["default"]);
  });
})();

/***/ }),

/***/ "./app/js/navCollapse.js":
/*!*******************************!*\
  !*** ./app/js/navCollapse.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return navCollapse; });
;
"use strict";

function navCollapse(nodeList, classIn, classOut) {
  var classToAdd;
  var classToRem;

  if (nodeList[0].classList.contains(classIn)) {
    classToAdd = classOut;
    classToRem = classIn;
  } else {
    classToAdd = classIn;
    classToRem = classOut;
  }

  for (var i = 0; i < nodeList.length; i++) {
    nodeList[i].classList.add(classToAdd);
    nodeList[i].classList.remove(classToRem);
  }
}
;

/***/ }),

/***/ "./app/js/showAcceptErrorIcon.js":
/*!***************************************!*\
  !*** ./app/js/showAcceptErrorIcon.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return showAcceptErrorIcon; });
;
"use strict";

function showAcceptErrorIcon(input, iconAccept, iconError, classVisible, funcCheck) {
  if (input.value == false) {
    iconAccept.classList.remove(classVisible);
    iconError.classList.remove(classVisible);
    return;
  }

  if (funcCheck(input)) {
    if (!iconAccept.classList.contains(classVisible)) {
      iconAccept.classList.add(classVisible);
    }

    iconError.classList.remove(classVisible);
  } else {
    if (!iconError.classList.contains(classVisible)) {
      iconError.classList.add(classVisible);
    }

    iconAccept.classList.remove(classVisible);
  }
}
;

/***/ }),

/***/ "./app/js/validateEmail.js":
/*!*********************************!*\
  !*** ./app/js/validateEmail.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return validateEmail; });
;
"use strict";

function validateEmail(emailForm) {
  // ALL TYPE OF SPACES EXCLUDED 
  emailForm.value = emailForm.value.replace(/\s/g, ""); // CHECK AMOUNT OF @, SHOULD BE ONLY 1

  if (/@/.test(emailForm.value) && emailForm.value.match(/@/g).length == 1 && // CHECK AFTER EACH DOT ALLOWED CHARS
  !/\.(?![\w!#$%&'*+/=?^`{|}~-])/.test(emailForm.value) && // CHECK DOT AT START OF EMAIL
  !(emailForm.value[0] === ".") && // CHECK TEMPLATE OF EMAIL
  /^[\w!#$%&'*+/=?^`{|}~.-]+?@\w+?\.\w{2,}?$/.test(emailForm.value)) {
    return true;
  } else {
    return false;
  }
}
;

/***/ }),

/***/ "./app/js/validateName.js":
/*!********************************!*\
  !*** ./app/js/validateName.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return validateName; });
;
"use strict";

function validateName(nameForm) {
  // ALL TYPE OF SPACES EXCLUDED 
  nameForm.value = nameForm.value.replace(/\s/g, "");

  if (/^[a-z]{2,16}$/i.test(nameForm.value)) {
    return true;
  } else {
    return false;
  }
}
;

/***/ }),

/***/ "./app/scss/main.scss":
/*!****************************!*\
  !*** ./app/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./main.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app/scss/main.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./main.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app/scss/main.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./main.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app/scss/main.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app/scss/main.scss":
/*!***********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./app/scss/main.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700,700i);", ""]);

// module
exports.push([module.i, ".list, .list-flex, .link, .link__cap_mobile, .nav {\n  text-decoration: none;\n  list-style-type: none; }\n\n.horRow, .list-flex, .header, .products__headMid, .products__par, .parallax_1, .parallax_2, .formSub__head, .formSub__par, .formSub-wrap, .content__align {\n  margin-left: auto;\n  margin-right: auto; }\n\nhtml {\n  font-size: 16px;\n  font-family: \"Open Sans\", sans-serif; }\n\nbody {\n  box-sizing: border-box;\n  color: #585858;\n  width: 100vw;\n  overflow-x: hidden;\n  line-height: 1.8;\n  background: #e0e0e0;\n  margin: 0 auto; }\n\n.contentWrapper {\n  max-width: 1250px;\n  margin: 0 auto; }\n\n.no-pad {\n  padding-left: 0;\n  padding-right: 0; }\n\n.no-mar {\n  margin-right: 0;\n  margin-left: 0; }\n\n.pr-30 {\n  padding-right: 30px; }\n\n.mb-25 {\n  margin-bottom: 25px; }\n\n.mt-6 {\n  margin-top: 6px; }\n\n.clear {\n  margin: 0;\n  padding: 0; }\n\n.pageBackColor2 {\n  background: #ffffff;\n  margin-bottom: 0;\n  /* height: auto; */ }\n\n.df {\n  display: flex; }\n\n.par_transparent {\n  color: #737373; }\n\n.mr0 {\n  margin-right: 0; }\n\n.horRow {\n  width: 135px;\n  background: #ff3f40;\n  height: 3px; }\n\n.figureWrap {\n  display: flex; }\n\n.ml-8 {\n  margin-left: 8px; }\n\n.mb-8 {\n  margin-bottom: 8px; }\n\n@keyframes shadowText {\n  0% {\n    text-shadow: 5px 0px 10px rgba(0, 0, 0, 0.5); }\n  25% {\n    text-shadow: 3px 0px 10px rgba(0, 0, 0, 0.5); }\n  50% {\n    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); }\n  75% {\n    text-shadow: -3px 0px 10px rgba(0, 0, 0, 0.5); }\n  100% {\n    text-shadow: -5px 0px 10px rgba(0, 0, 0, 0.5); } }\n\n@keyframes buttonJump {\n  0% {\n    transform: translateY(15px); }\n  10% {\n    transform: translateY(24px); }\n  20% {\n    transform: translateY(32px); }\n  100% {\n    transform: translateY(32px); } }\n\n@keyframes borders {\n  0% {\n    background-position: 0 0; }\n  100% {\n    background-position: 0 -180px; } }\n\n@keyframes parallax-switch {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n.headBig {\n  font-size: 3.75rem;\n  font-weight: 900;\n  font-stretch: ultra-condensed;\n  letter-spacing: 2px;\n  color: #000;\n  text-transform: uppercase;\n  line-height: 1.2;\n  animation: shadowText 2s ease-in 0s infinite alternate; }\n\n.headMid {\n  font-size: 2.6rem;\n  line-height: 1.3;\n  font-weight: bold;\n  text-transform: uppercase; }\n  @media (max-width: 580px) {\n    .headMid {\n      font-size: 2rem; } }\n\n.headLit {\n  font-size: 1.5rem;\n  font-weight: 600; }\n  @media (max-width: 580px) {\n    .headLit {\n      font-size: 1.2rem; } }\n\n.par {\n  color: #6f6d6d;\n  min-width: 280px; }\n\n.list-flex {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  width: 72%; }\n\n.button {\n  width: 226px;\n  height: 55px;\n  border-radius: 7px;\n  background: #ff3f40;\n  border-width: 0;\n  font-size: 1.13rem;\n  font-weight: bold;\n  color: white;\n  text-transform: capitalize;\n  border: 4px solid transparent;\n  animation: buttonJump 1.5s ease-out infinite alternate; }\n  .button:hover {\n    background-color: #ff0000;\n    transition: background-color 0.3s ease-out; }\n  .button:active {\n    border-color: #ff7070;\n    background-color: #ec0b4b; }\n  @media (max-width: 1002px) {\n    .button {\n      display: block;\n      margin-left: auto;\n      margin-right: auto; } }\n\n.input {\n  display: block;\n  min-width: 290px;\n  height: 80px;\n  border-radius: 7px;\n  border-width: 0;\n  font-size: 1.2rem;\n  text-indent: 8%;\n  font-family: \"Open Sans\", sans-serif;\n  padding-left: 10px;\n  padding-right: 10px; }\n  .input::placeholder {\n    font-size: 1.2rem;\n    text-indent: 50px;\n    color: #e0e0e0;\n    font-family: \"Open Sans\", sans-serif; }\n\n.figure-flex {\n  position: relative;\n  margin: 0;\n  flex-grow: 1;\n  flex-shrink: 1; }\n\n.img__bitcoin {\n  margin-top: auto;\n  margin-bottom: auto; }\n\n.img-const-array {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  align-items: center; }\n\n.img {\n  width: 100%;\n  display: block; }\n\n.fig {\n  position: relative;\n  margin: 0;\n  padding-left: 0;\n  padding-top: 0;\n  margin-bottom: 20px;\n  padding-right: 15px; }\n  @media (max-width: 1000px) {\n    .fig {\n      margin-left: auto;\n      margin-right: auto; } }\n  @media (max-width: 630px) {\n    .fig {\n      padding-right: 0; } }\n  @media (max-width: 430px) {\n    .fig {\n      /* max-width:290px !important; */ } }\n\n.list__item {\n  color: #737373;\n  font-size: 1.375rem;\n  font-weight: bolder;\n  text-transform: uppercase;\n  padding-right: 10px;\n  margin-bottom: 20px; }\n\n.category-link {\n  text-decoration: none;\n  color: inherit;\n  border-bottom: 2px solid transparent; }\n  .category-link:hover, .category-link:active {\n    color: #ff3f40;\n    border-bottom-color: rgba(0, 0, 0, 0.6);\n    transition: color 0.4s ease-out,border-bottom-color 0.4s ease-out; }\n\n.link {\n  display: flex;\n  align-items: center;\n  height: 100%;\n  color: #e0e0e0;\n  border: 2px solid transparent; }\n  .link:hover {\n    background: #ff3f40;\n    border-color: #c01213;\n    transition: background-color 0.4s ease-out,border 0.2s ease-out;\n    color: white; }\n  .link:active {\n    background: #ff3f40;\n    border-color: #c01213;\n    color: white;\n    box-shadow: inset 0 0 17px 3px rgba(0, 0, 0, 0.3); }\n\n.link_1 {\n  width: 90px; }\n\n.link_2 {\n  width: 165px; }\n\n.link_3 {\n  width: 120px; }\n\n.link_4 {\n  width: 165px; }\n\n.link_block {\n  overflow: hidden;\n  height: 0px;\n  margin-right: auto;\n  margin-left: auto;\n  width: 100%;\n  border: 0px solid black;\n  background: radial-gradient(ellipse at center, black, #505050 100%); }\n\n.link__cap {\n  text-align: center;\n  width: 100%;\n  text-transform: uppercase;\n  border-bottom: 2px solid transparent; }\n\n.link__cap_mobile {\n  font-size: .875rem;\n  font-weight: bold;\n  color: #e0e0e0;\n  margin-top: 23px;\n  text-align: center;\n  display: block;\n  width: 200px;\n  height: 20px;\n  margin-left: auto;\n  margin-right: auto;\n  text-transform: uppercase; }\n\n.nav {\n  display: flex;\n  padding-left: 15px;\n  padding-right: 15px; }\n\n.nav__item {\n  height: 100%; }\n\n.nav_ {\n  /* margin-left:0 */\n  /* 357/$maxW*100% */\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-left: auto;\n  margin-right: auto;\n  height: 100%;\n  width: 550px; }\n\n.header {\n  position: absolute;\n  background: #313030;\n  font-size: .875rem;\n  font-weight: bold;\n  z-index: 6; }\n\n.nav__mobile {\n  position: absolute;\n  z-index: 5;\n  width: 100%;\n  height: 0;\n  top: 70px; }\n  @media (max-width: 600px) {\n    .nav__mobile {\n      height: 300px; } }\n\n@keyframes slide-nav-mobile_width-in {\n  0% {\n    height: 0; }\n  80% {\n    height: 73px; }\n  100% {\n    height: 70px; } }\n\n@keyframes slide-nav-mobile_width-out {\n  0% {\n    height: 70px; }\n  100% {\n    height: 0; } }\n\n.js-uncollapsed {\n  border-width: 1px;\n  animation: slide-nav-mobile_width-in 0.6s ease-out 0s forwards; }\n\n.js-collapsed {\n  animation: slide-nav-mobile_width-out 0.6s ease-out 0s forwards;\n  border-width: 0px; }\n\n.bigmac {\n  margin-top: 21px;\n  float: right;\n  margin-right: 11px;\n  display: none;\n  background: white;\n  width: 54px;\n  height: 29px; }\n  @media (max-width: 600px) {\n    .bigmac {\n      display: inline-block; } }\n\n.bigmac__inner {\n  background: black;\n  height: 3px;\n  margin-top: 5px; }\n\n.wrap__flex-nav {\n  display: block;\n  height: 100%;\n  margin-left: auto;\n  margin-right: auto;\n  margin-left: 28.56%; }\n  @media (max-width: 1000px) {\n    .wrap__flex-nav {\n      margin-left: auto;\n      margin-right: auto; } }\n  @media (max-width: 830px) {\n    .wrap__flex-nav {\n      margin-right: auto;\n      margin-left: auto; } }\n  @media (max-width: 600px) {\n    .wrap__flex-nav {\n      display: none; } }\n\n.header_ {\n  margin-bottom: 80px;\n  height: 90px;\n  width: 100%;\n  max-width: 1250px; }\n  @media (max-width: 600px) {\n    .header_ {\n      height: 70px;\n      margin-bottom: 65px; } }\n\n.sect {\n  display: flex;\n  flex-wrap: wrap;\n  max-width: 1250px;\n  width: 100%;\n  margin: 0 auto; }\n  @media (max-width: 1250px) {\n    .sect {\n      padding-left: 15px;\n      padding-right: 15px; } }\n\n.section__offers {\n  margin-top: 100px;\n  margin-bottom: 85px; }\n  @media (max-width: 1136px) {\n    .section__offers {\n      margin-top: 400px; } }\n  @media (max-width: 580px) {\n    .section__offers {\n      margin-top: 400px; } }\n\n.offers_wrap {\n  margin-right: auto;\n  margin-left: auto; }\n\n.offers__headMid {\n  margin-bottom: 34px;\n  margin-top: 0; }\n  @media (max-width: 1235px) {\n    .offers__headMid {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n.offers__par {\n  width: 100%;\n  margin-bottom: 50px; }\n  @media (max-width: 1235px) {\n    .offers__par {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n.offers__button {\n  display: block;\n  background: white;\n  color: #ff3f40;\n  border-radius: 7px;\n  border: 2px solid #ff3f40;\n  margin-bottom: 100px; }\n  .offers__button:hover {\n    background-color: #ffefef;\n    transition: background-color 0.3s ease-out; }\n  .offers__button:active {\n    border-size: 4px;\n    background-color: white; }\n  @media (max-width: 1235px) {\n    .offers__button {\n      margin-left: auto;\n      margin-right: auto; } }\n\n.offers_media {\n  /* \t@media (max-width:1235px) {\r\n\tmargin-bottom: 60px;\r\n} */ }\n\n.offers__desc {\n  margin-top: 10px;\n  color: #737373; }\n  @media (max-width: 1000px) {\n    .offers__desc {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n.offers__headLit {\n  margin-top: 15px;\n  margin-bottom: 12px; }\n\n@media (max-width: 1000px) {\n  .__media {\n    padding: 0; } }\n\n.offers__icon {\n  font-size: 35px;\n  color: #ff3f40; }\n\n.section__products {\n  display: block;\n  padding-top: 88px;\n  border-top: 2px solid #ececec;\n  margin-bottom: 53px; }\n\n.products__headMid {\n  margin-top: 0;\n  margin-bottom: 20px;\n  text-align: center; }\n\n.products__par {\n  min-width: 280px;\n  width: 38%;\n  text-align: center; }\n\n.products__list {\n  padding-left: 0;\n  margin-top: 60px;\n  margin-bottom: 35px; }\n\n.products__figure {\n  max-width: 300px;\n  height: 300px; }\n  @media (max-width: 630px) {\n    .products__figure {\n      padding-right: 0;\n      width: 100%;\n      height: auto; } }\n\n.section__team {\n  display: block; }\n\n.team__wrap {\n  width: 58%;\n  min-width: 285px; }\n  @media (max-width: 1230px) {\n    .team__wrap {\n      margin-right: auto;\n      margin-left: auto; } }\n\n.team__headMid {\n  margin-bottom: 20px; }\n  @media (max-width: 1235px) {\n    .team__headMid {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n.team__par {\n  margin-bottom: 25px; }\n  @media (max-width: 1235px) {\n    .team__par {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n.team__horRow {\n  margin-left: 0;\n  margin-bottom: 70px; }\n  @media (max-width: 1235px) {\n    .team__horRow {\n      margin-left: auto;\n      margin-right: auto; } }\n\n.members {\n  display: flex; }\n  @media (max-width: 1250px) {\n    .members {\n      flex-flow: column; } }\n\n.members-info {\n  margin-left: 50px;\n  width: 65%; }\n  @media (max-width: 1250px) {\n    .members-info {\n      margin-left: auto;\n      margin-right: auto;\n      width: 100%; } }\n\n.members__fig {\n  width: 200px;\n  height: 200px; }\n  @media (max-width: 1250px) {\n    .members__fig {\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 20px; } }\n\n.members__headLit {\n  font-size: 1.6rem;\n  text-transform: uppercase; }\n  @media (max-width: 1250px) {\n    .members__headLit {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n@media (max-width: 1250px) {\n  .member__info {\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center; } }\n\n.member-figure__detailed {\n  max-width: 350px;\n  width: 340px; }\n  @media (max-width: 1250px) {\n    .member-figure__detailed {\n      margin-left: auto;\n      margin-right: auto; } }\n  @media (max-width: 375px) {\n    .member-figure__detailed {\n      width: 100%; } }\n\n.members__list {\n  margin-top: 11px;\n  width: 375px;\n  margin-left: 0;\n  padding-left: 0;\n  font-style: italic;\n  font-weight: normal;\n  font-size: 1.2rem;\n  margin-bottom: 45px; }\n  @media (max-width: 1250px) {\n    .members__list {\n      margin-left: auto;\n      margin-right: auto; } }\n  @media (max-width: 600px) {\n    .members__list {\n      margin-left: auto;\n      margin-right: auto;\n      width: 90%; } }\n\n.parall {\n  position: relative;\n  height: 650px; }\n\n.parallax_1 {\n  background-image: url(" + escape(__webpack_require__(/*! ../img/back/parallax_2.jpg */ "./app/img/back/parallax_2.jpg")) + ");\n  background-attachment: fixed;\n  background-repeat: none;\n  background-clip: padding-box;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  z-index: 2;\n  animation: parallax-switch 5s ease-in-out 0s infinite alternate; }\n\n.parallax_2 {\n  background-image: url(" + escape(__webpack_require__(/*! ../img/back/parallax_1.jpg */ "./app/img/back/parallax_1.jpg")) + ");\n  background-attachment: fixed;\n  background-repeat: none;\n  background-clip: border-box;\n  border: 1px solid transparent;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0; }\n\n.header-wrap__inflow {\n  position: relative;\n  max-width: 1250px;\n  top: 15px;\n  margin-left: auto;\n  margin-right: auto;\n  /* border:1px solid transparent; */ }\n  @media (max-width: 600px) {\n    .header-wrap__inflow {\n      top: 0; } }\n\n.header-wrap {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: transparent;\n  z-index: 4;\n  /* @media (max-width: 1250px) {\r\n\t\tpadding-left: 15px;\r\n\t\tpadding-right: 15px;\r\n\t} */ }\n\n.sect__contacts {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0px; }\n\n.contacts__text {\n  width: 609px;\n  display: inline-block; }\n  @media (max-width: 1136px) {\n    .contacts__text {\n      margin-bottom: 140px;\n      margin-left: 100px; } }\n  @media (max-width: 1002px) {\n    .contacts__text {\n      margin-bottom: 100px;\n      margin-left: auto;\n      margin-right: auto; } }\n  @media (max-width: 420px) {\n    .contacts__text {\n      margin-bottom: 50px;\n      width: 100%; } }\n\n.section-contacts {\n  border: 1px solid transparent;\n  margin-top: 160px; }\n\n.covers {\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-right: 20px;\n  position: relative;\n  background-clip: border-box;\n  background-image: linear-gradient(to top, white, red);\n  border: 5px solid transparent;\n  background-origin: border-box;\n  background-repeat: repeat-y;\n  background-position: 0 0;\n  height: 91px;\n  border-radius: 8px;\n  animation: borders 20s linear 0s infinite; }\n  @media (max-width: 1002px) {\n    .covers {\n      margin-left: auto;\n      margin-right: auto; } }\n  @media (max-width: 580px) {\n    .covers {\n      height: 60px; } }\n\n.contacts__headBig_1 {\n  margin-top: 0;\n  margin-bottom: 0;\n  position: absolute;\n  height: 90px;\n  left: -5px;\n  right: -5px;\n  top: -5px;\n  bottom: -5px;\n  border: 5px solid transparent;\n  background-color: white;\n  background-clip: padding-box;\n  border-radius: 8px;\n  /* border-image-source:linear-gradient(to top,black ,white);\r\n\tborder-image-slice:6;\r\n\tborder-radius:15px; */\n  /* &::before,&::after {\r\n\t\tcontent: linear-gradient(to top,black ,white);\r\n\t\tdisplay: inline-block;\r\n\t\twidth:20px;\r\n\t\theight:30px;\r\n\t} */\n  /* border-left-color: linear-gradient(to left,black ,white); */ }\n  @media (max-width: 1002px) {\n    .contacts__headBig_1 {\n      text-align: center; } }\n  @media (max-width: 580px) {\n    .contacts__headBig_1 {\n      font-size: 2.3rem;\n      height: 60px; } }\n  @media (max-width: 330px) {\n    .contacts__headBig_1 {\n      font-size: 2rem;\n      letter-spacing: 3px; } }\n\n.contacts__headBig_2 {\n  letter-spacing: 7px;\n  margin-bottom: 15px;\n  margin-top: 10px; }\n  @media (max-width: 1002px) {\n    .contacts__headBig_2 {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n  @media (max-width: 580px) {\n    .contacts__headBig_2 {\n      font-size: 2.2rem;\n      letter-spacing: 4px; } }\n  @media (max-width: 330px) {\n    .contacts__headBig_2 {\n      font-size: 1.7rem;\n      letter-spacing: 3px; } }\n\n.contacts__par {\n  width: 80%;\n  margin-top: 0;\n  margin-bottom: 10px;\n  color: rgba(0, 0, 0, 0.8);\n  font-weight: 600;\n  text-shadow: 5px -4px 20px #fff;\n  font-size: 1.2rem; }\n  @media (max-width: 1002px) {\n    .contacts__par {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n.contacts__video {\n  height: 315px;\n  margin-left: auto;\n  width: 44.8%;\n  max-width: 560px;\n  min-width: 290px;\n  margin-top: 0;\n  margin-bottom: 53px; }\n  @media (max-width: 1200px) {\n    .contacts__video {\n      height: 275px; } }\n  @media (max-width: 1136px) {\n    .contacts__video {\n      margin-left: auto;\n      margin-right: auto;\n      width: 100%; } }\n  @media (max-width: 1002px) {\n    .contacts__video {\n      margin-left: auto;\n      margin-right: auto; } }\n  @media (max-width: 1002px) {\n    .contacts__video {\n      height: 275px; } }\n  @media (max-width: 576px) {\n    .contacts__video {\n      height: 230px; } }\n\n.fig-cap {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  display: flex;\n  justify-content: center; }\n  .fig-cap:hover {\n    opacity: 1;\n    background-color: rgba(70, 70, 70, 0.6);\n    transition: opacity 0.5s ease-out; }\n\n.fig__cap {\n  align-self: flex-end;\n  text-align: center;\n  color: red;\n  font-size: 1.4rem;\n  font-weight: 700;\n  height: 80px;\n  text-shadow: 3px 3px 12px black; }\n  @media (max-width: 480px) {\n    .fig__cap {\n      font-size: 1rem; } }\n\n@media (max-width: 1002px) {\n  .contacts__button {\n    margin-bottom: 50px; } }\n\n@media (max-width: 580px) {\n  .contacts__button {\n    margin-bottom: 180px; } }\n\n@media (max-width: 497px) {\n  .contacts__button {\n    margin-bottom: 150px; } }\n\n@media (max-width: 394px) {\n  .contacts__button {\n    margin-bottom: 120px; } }\n\n.section-formSub {\n  background-image: url(" + escape(__webpack_require__(/*! ../img/back/formSubBack.jpg */ "./app/img/back/formSubBack.jpg")) + ");\n  height: 512px;\n  margin-top: 85px; }\n  @media (max-width: 860px) {\n    .section-formSub {\n      padding-left: 15px;\n      padding-right: 15px; } }\n\n.formSub__head {\n  color: #ffffff;\n  text-align: center;\n  margin-top: 130px;\n  font-size: 2.625rem;\n  margin-bottom: 25px; }\n  @media (max-width: 1040px) {\n    .formSub__head {\n      margin-top: 40px; } }\n  @media (max-width: 700px) {\n    .formSub__head {\n      font-size: 1.9rem; } }\n\n.formSub__par {\n  color: #ffffff;\n  text-align: center;\n  font-size: 1.625rem;\n  margin-bottom: 50px; }\n  @media (max-width: 1000px) {\n    .formSub__par {\n      margin-bottom: 20px;\n      font-size: 1.4rem; } }\n  @media (max-width: 400px) {\n    .formSub__par {\n      font-size: 1.2rem; } }\n\n.formSub-wrap {\n  max-width: 850px;\n  height: 250px;\n  display: flex;\n  flex-wrap: wrap;\n  position: relative;\n  align-items: center; }\n  @media (max-width: 1276px) {\n    .formSub-wrap {\n      height: 130px; } }\n  @media (max-width: 1000px) {\n    .formSub-wrap {\n      height: 250px;\n      flex-flow: column; } }\n\n.formSub__wrap-input-icon {\n  position: relative;\n  margin-right: 20px;\n  margin-left: auto;\n  max-width: 520px;\n  width: 69%; }\n  @media (max-width: 1000px) {\n    .formSub__wrap-input-icon {\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 10px;\n      height: 70px; } }\n  @media (max-width: 450px) {\n    .formSub__wrap-input-icon {\n      width: 80%;\n      height: 60px; } }\n\n.formSub__input {\n  width: 100%; }\n\n.icon__accept {\n  position: absolute;\n  top: 0;\n  right: 0;\n  font-size: 1.4rem;\n  color: green;\n  display: none; }\n\n.icon__error {\n  position: absolute;\n  top: 0;\n  right: 0;\n  font-size: 1.4rem;\n  color: red;\n  display: none; }\n\n.visible {\n  display: block; }\n\n.formSub__btn {\n  width: 215px;\n  height: 70px;\n  margin-bottom: 65px;\n  text-transform: uppercase;\n  margin-left: auto; }\n  @media (max-width: 450px) {\n    .formSub__btn {\n      height: 60px; } }\n\n.input-name {\n  position: relative;\n  padding-right: 15px; }\n  @media (max-width: 1200px) {\n    .input-name {\n      margin-left: auto;\n      margin-right: auto; } }\n  @media (max-width: 1172px) {\n    .input-name {\n      padding-right: 0; } }\n\n.input-mail {\n  position: relative; }\n  @media (max-width: 1200px) {\n    .input-mail {\n      margin-left: auto;\n      margin-right: auto; } }\n\n.icon_accept-offset {\n  right: 15px; }\n\n.icon_error-offset {\n  right: 15px; }\n\n.wrapper_w {\n  width: 58%; }\n  @media (max-width: 1235px) {\n    .wrapper_w {\n      margin-left: auto;\n      margin-right: auto; } }\n\n.connect__wrap-header {\n  width: 58%;\n  min-width: 300px; }\n  @media (max-width: 1230px) {\n    .connect__wrap-header {\n      margin-right: auto;\n      margin-left: auto;\n      padding-left: 15px;\n      padding-right: 15px; } }\n\n.connect__wrap-footer {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap; }\n\n.section__connect {\n  margin-top: 110px;\n  display: block;\n  margin-bottom: 150px;\n  padding-left: 0;\n  padding-right: 0; }\n  @media (max-width: 1050px) {\n    .section__connect {\n      margin-bottom: 0; } }\n\n.connect__wrap {\n  display: flex;\n  flex-wrap: wrap;\n  height: auto; }\n  @media (max-width: 1050px) {\n    .connect__wrap {\n      flex-flow: column; } }\n\n.connect__inner-wrap {\n  width: 58%;\n  height: 472px; }\n  @media (max-width: 1050px) {\n    .connect__inner-wrap {\n      height: 580px;\n      margin-left: auto;\n      margin-right: auto;\n      padding-left: 15px;\n      padding-right: 18px; } }\n  @media (max-width: 800px) {\n    .connect__inner-wrap {\n      width: 100%; } }\n\n.connect__headMid {\n  margin-top: 0;\n  margin-bottom: 20px; }\n  @media (max-width: 1235px) {\n    .connect__headMid {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n.connect__par {\n  margin-bottom: 25px; }\n  @media (max-width: 1235px) {\n    .connect__par {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n.connect__horRow {\n  margin-left: 0;\n  margin-bottom: 70px; }\n  @media (max-width: 1235px) {\n    .connect__horRow {\n      margin-left: auto;\n      margin-right: auto; } }\n\n.connect__inputs-user-info {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between; }\n\n.connect__input {\n  height: 70px;\n  width: 340px;\n  background-color: #e0e0e0;\n  text-indent: 12%; }\n  @media (max-width: 1240px) {\n    .connect__input {\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 20px; } }\n  .connect__input::placeholder {\n    font-size: 1.2rem;\n    text-indent: 50px;\n    color: #737373;\n    font-family: \"Open Sans\", sans-serif;\n    margin-top: 0; }\n\n.connect__input-msg {\n  margin-top: 50px;\n  width: 100%;\n  height: 243px;\n  text-indent: 5px; }\n  @media (max-width: 1050px) {\n    .connect__input-msg {\n      margin-top: 30px; } }\n\n.connect__button {\n  width: 100%;\n  height: 70px;\n  margin-top: 0;\n  text-transform: uppercase;\n  margin-bottom: 30px; }\n\n.contact-info {\n  width: 412px;\n  background: #2d2d2d; }\n\n.connect__contact-info {\n  margin-left: auto; }\n  @media (max-width: 1050px) {\n    .connect__contact-info {\n      margin-right: auto;\n      margin-left: auto;\n      width: 100%;\n      height: 350px;\n      margin-top: 40px; } }\n\n.info__content {\n  margin-left: 75px;\n  margin-top: 140px; }\n  @media (max-width: 1050px) {\n    .info__content {\n      margin-top: 50px; } }\n  @media (max-width: 700px) {\n    .info__content {\n      margin-left: auto;\n      margin-right: auto; } }\n\n.info__headLit {\n  font-size: 1.125rem;\n  color: #d7d7d7;\n  text-transform: uppercase; }\n  @media (max-width: 700px) {\n    .info__headLit {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n.info__par {\n  color: #e0e0e0; }\n  @media (max-width: 700px) {\n    .info__par {\n      margin-left: auto;\n      margin-right: auto;\n      text-align: center; } }\n\n.footer {\n  height: 80px;\n  background: #313030;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  z-index: 5;\n  width: 100%;\n  opacity: .9; }\n  @media (max-width: 870px) {\n    .footer {\n      height: 80px; } }\n\n.content__align {\n  height: 100%;\n  max-width: 1250px;\n  color: #b1b1b1;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  padding-left: 15px;\n  padding-right: 15px; }\n  @media (max-width: 870px) {\n    .content__align {\n      flex-flow: column;\n      justify-content: flex-start; } }\n\n.list-social {\n  padding-left: 0; }\n  @media (max-width: 870px) {\n    .list-social {\n      margin-left: auto;\n      margin-top: 0;\n      margin-bottom: 0;\n      margin-right: auto;\n      padding-left: 0;\n      margin-top: 0; } }\n\n@media (max-width: 870px) {\n  .footer__rights {\n    font-size: 0.6rem;\n    margin-left: auto;\n    margin-right: auto;\n    margin-bottom: 0;\n    margin-top: 0; } }\n\n.text-highlight {\n  margin-left: auto;\n  animation: textStretch 2s ease-in-out 0s infinite alternate,\r textBold 2s ease-in-out 0s infinite alternate; }\n  @media (max-width: 870px) {\n    .text-highlight {\n      display: block;\n      font-size: 0.7rem;\n      text-align: center;\n      margin-right: auto;\n      padding-top: 0;\n      padding-bottom: auto;\n      margin-top: 0;\n      margin-bottom: 0; } }\n\n@keyframes textStretch {\n  0% {\n    letter-spacing: 2px; }\n  100% {\n    letter-spacing: 4px; } }\n\n@keyframes textBold {\n  0% {\n    font-size: bold; }\n  100% {\n    font-size: normal; } }\n\n.list-hor-const__item {\n  display: inline-block;\n  margin-left: 10px; }\n\n.fas__ {\n  font-size: 2em;\n  color: white;\n  background: #313030; }\n  @media (max-width: 870px) {\n    .fas__ {\n      font-size: 1.6rem; } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ltZy9iYWNrL2Zvcm1TdWJCYWNrLmpwZyIsIndlYnBhY2s6Ly8vLi9hcHAvaW1nL2JhY2svcGFyYWxsYXhfMS5qcGciLCJ3ZWJwYWNrOi8vLy4vYXBwL2ltZy9iYWNrL3BhcmFsbGF4XzIuanBnIiwid2VicGFjazovLy8uL2FwcC9pbWcvcHJvZHVjdHMvcHIxLmpwZyIsIndlYnBhY2s6Ly8vLi9hcHAvaW1nL3Byb2R1Y3RzL3ByMi5qcGciLCJ3ZWJwYWNrOi8vLy4vYXBwL2ltZy9wcm9kdWN0cy9wcjMuanBnIiwid2VicGFjazovLy8uL2FwcC9pbWcvcHJvZHVjdHMvcHI0LmpwZyIsIndlYnBhY2s6Ly8vLi9hcHAvaW1nL3Byb2R1Y3RzL3ByNS5qcGciLCJ3ZWJwYWNrOi8vLy4vYXBwL2ltZy9wcm9kdWN0cy9wcjYuanBnIiwid2VicGFjazovLy8uL2FwcC9pbWcvcHJvZHVjdHMvcHI3LmpwZyIsIndlYnBhY2s6Ly8vLi9hcHAvaW1nL3Byb2R1Y3RzL3ByOC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXBwL2ltZy90ZWFtL3RlYW0xLmpwZyIsIndlYnBhY2s6Ly8vLi9hcHAvaW1nL3RlYW0vdGVhbTIuanBnIiwid2VicGFjazovLy8uL2FwcC9pbWcvdGVhbS90ZWFtMy5qcGciLCJ3ZWJwYWNrOi8vLy4vYXBwL2ltZy90ZWFtL3RlYW00LmpwZyIsIndlYnBhY2s6Ly8vLi9hcHAvaW1nL3RlYW0vdGVhbTUuanBnIiwid2VicGFjazovLy8uL2FwcC9pbmRleC50ZW1wLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL2NoZWNrU3Vic2NyaWJ0aW9uLmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvbmF2Q29sbGFwc2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL3Nob3dBY2NlcHRFcnJvckljb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL3ZhbGlkYXRlRW1haWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL3ZhbGlkYXRlTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2Nzcy9tYWluLnNjc3M/MTA2NCIsIndlYnBhY2s6Ly8vLi9hcHAvc2Nzcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbImNoZWNrU3Vic2NyaWJ0aW9uIiwiaW5wdXQiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJ2YWx1ZSIsIm9wZW4iLCJzZW5kIiwidGltZW91dCIsIm9udGltZW91dCIsIm9ubG9hZCIsInJlc3BvbnNlVGV4dCIsImFsZXJ0IiwibW9iaWxlTmF2IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xhc3NJbiIsImNsYXNzT3V0IiwiYnVyZ2VyIiwicXVlcnlTZWxlY3RvciIsImJ0blN1YnMiLCJpbnBTdWJzIiwiaW5wTmFtZSIsImlucE1haWwiLCJhZGRFdmVudExpc3RlbmVyIiwibmF2Q29sbGFwc2UiLCJ2YWxpZGF0ZUVtYWlsIiwiaWNvbkFjY2VwdCIsImljb25FcnJvciIsInNob3dBY2NlcHRFcnJvckljb24iLCJ2YWxpZGF0ZU5hbWUiLCJub2RlTGlzdCIsImNsYXNzVG9BZGQiLCJjbGFzc1RvUmVtIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJpIiwibGVuZ3RoIiwiYWRkIiwicmVtb3ZlIiwiY2xhc3NWaXNpYmxlIiwiZnVuY0NoZWNrIiwiZW1haWxGb3JtIiwicmVwbGFj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QTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGNBQWMsNEJBQTRCO1FBQzFDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTs7UUFFSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsc0JBQXNCO1FBQ3ZDO1FBQ0E7UUFDQTtRQUNBLFFBQVE7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQsa0RBQWtELHNCQUFzQjtBQUN4RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBLEtBQUssS0FBd0MsRUFBRSxFQUU3Qzs7QUFFRixRQUFRLHNCQUFpQjtBQUN6Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI0Yjk2YTQ0MWE0OTQzMDAyN2RhM1wiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkludmFsaWRhdGVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG4gXHRcdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHR0aGlzLl9zZWxmSW52YWxpZGF0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0c3dpdGNoIChob3RTdGF0dXMpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcImlkbGVcIjpcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuIFx0XHRcdFx0XHRcdGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuIFx0XHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG4gXHRcdFx0XHRcdFx0KGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9XG4gXHRcdFx0XHRcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgfHwgW10pLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdC8vIGlnbm9yZSByZXF1ZXN0cyBpbiBlcnJvciBzdGF0ZXNcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdH1cbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaCwgaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkgPyBcInJlYWR5XCIgOiBcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gXHRcdHJldHVybiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpIHtcbiBcdFx0aG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHQhbW9kdWxlIHx8XG4gXHRcdFx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgJiYgIW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZClcbiBcdFx0XHRcdClcbiBcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuIFx0XHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcbiBcdFx0XHRcdCFpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZJbnZhbGlkYXRlZFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRwYXJlbnRzOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5wYXJlbnRzLnNsaWNlKCksXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGlmIChob3RVcGRhdGVOZXdIYXNoICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVuZGVmaW5lZDtcbiBcdFx0fVxuIFx0XHRob3RVcGRhdGUgPSB1bmRlZmluZWQ7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IGl0ZW0ucGFyZW50cztcbiBcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSBtb2R1bGVJZDtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aWYgKGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuIFx0XHRcdHJldHVybiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24obGlzdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obW9kdWxlSWQpIHtcbiBcdFx0XHRcdFx0aWYgKGxpc3QuaW5kZXhPZihtb2R1bGVJZCkgPCAwKSBsaXN0LnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRyZXR1cm4gbGlzdDtcbiBcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSB7XG4gXHRcdGlmIChob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoIWhvdFVwZGF0ZSkgaG90VXBkYXRlID0ge307XG4gXHRcdFx0aG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzLmZvckVhY2goaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZSk7XG4gXHRcdFx0aG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gdW5kZWZpbmVkO1xuIFx0XHRcdHJldHVybiB0cnVlO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0aWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBtb2R1bGVJZCkpXG4gXHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9hcHAvanMvaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC9qcy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImExZTk0MDk0MzQwMTc0NjBjNjY2MDQ0NjYwNTFmZWJjLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjYxYTU2MzA4NzVkMDNhMTc5YTc3OGE1YjI4NWQzNzZjLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImM5YzM3YWZlNmZkM2I3MTg4NTI3ZDU4NDJiODBmMGE5LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjk4NzhiMjk0OGU0OTdkMDEzYjE3Y2YwYmI5ODhmNjBjLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImFkZjcyMzI1NGMzMzNjMDc5ZTNiNmUwZDYzNjNmNmM5LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjk0ZTEzOGMwMDU5NjU3MWQxZjUwZjg1YTk4ZmU3M2JhLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjYwYjJlMzkyYzVhNmM4NmEyMzI0YTg4NzM2OGM0OWRiLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjE3NTdmNzNhNzdkZDRlZmM2YzQ1M2VlYmUxM2NhMjI3LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjhmY2VhYjBjNWE2ZDU0NTBlZDM0ZTViMDEyZjE3ZjdmLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjAwNDFjMjhkN2RmOTc4YzExMGU4YmU2MmY1MzMxZGRmLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImNmNDM4YTNiY2ZiZDk4YzhiMjlkYjA2MTQwZWYyMzEyLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImE1MzdmMTYzOTYzNjdhNDY4NmI4ZjE3NzkxYWRhNmQ4LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjk1YzZhMzA3MzM5NzExODQ3ZWZiNzFjM2RlYjM1ZDQyLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjBjYThjYTM3ZjZmNDQ3ODhjYTU3NzU2NjNlN2YwMWU4LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImY3OTcxYjFiMDc0NzIxM2YyYzNjNzNlMTMxMzMyMjUyLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjA5MWJhNTRkOGYwMDg3YzFlODgwOGJkZjY2NTBmMzM3LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8IURPQ1RZUEUgaHRtbD5cXHJcXG48aHRtbCBsYW5nPVxcXCJlblxcXCI+XFxyXFxuXFx0PGhlYWQ+XFxyXFxuXFx0XFx0PG1ldGEgY2hhcnNldD1cXFwiVVRGLThcXFwiPlxcclxcblxcdFxcdDxtZXRhIG5hbWU9XFxcInZpZXdwb3J0XFxcIiBjb250ZW50PVxcXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBzaHJpbmstdG8tZml0PW5vXFxcIj5cXHJcXG5cXHRcXHQ8dGl0bGU+QWduZWN5PC90aXRsZT5cXHJcXG5cXHRcXHQ8bGluayByZWw9XFxcInN0eWxlc2hlZXRcXFwiIGhyZWY9XFxcImJvb3RzdHJhcC1ncmlkLm1pbi5jc3NcXFwiID5cXHJcXG5cXHQ8L2hlYWQ+XFxyXFxuXFx0PGJvZHk+XFxyXFxuXFx0XFx0PGRpdiBjbGFzcz1cXFwicGFyYWxsXFxcIj5cXHJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYXJhbGxheF8xXFxcIj48L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYXJhbGxheF8yXFxcIj48L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJoZWFkZXItd3JhcF9faW5mbG93XFxcIj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJoZWFkZXItd3JhcFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibmF2X19tb2JpbGVcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImxpbmtfYmxvY2tcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxhIGNsYXNzPVxcXCJsaW5rX19jYXBfbW9iaWxlXFxcIiBocmVmPVxcXCIjXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRob21lXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9hPlxcclxcblxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImxpbmtfYmxvY2tcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxhIGNsYXNzPVxcXCJsaW5rX19jYXBfbW9iaWxlXFxcIiBocmVmPVxcXCIjXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRwb3J0Zm9saW9cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2E+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibGlua19ibG9ja1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGEgY2xhc3M9XFxcImxpbmtfX2NhcF9tb2JpbGVcXFwiIGhyZWY9XFxcIiNcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdGFib3V0IHVzXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9hPlxcclxcblxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImxpbmtfYmxvY2tcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxhIGNsYXNzPVxcXCJsaW5rX19jYXBfbW9iaWxlXFxcIiBocmVmPVxcXCIjXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRjb250YWN0XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9hPlxcclxcblxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcclxcblxcdFxcdDxoZWFkZXIgY2xhc3M9XFxcImhlYWRlciBoZWFkZXJfXFxcIj4gPCEtLSBCTE9DSyAtLT5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cmFwX19mbGV4LW5hdlxcXCI+XFxyXFxuXFx0XFx0XFx0PHVsIGNsYXNzPVxcXCJuYXYgbmF2X1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGxpIGNsYXNzPVxcXCJuYXZfX2l0ZW1cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxhIGNsYXNzPVxcXCJsaW5rIGxpbmtfMVxcXCIgaHJlZj1cXFwiI1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibGlua19fY2FwXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRob21lXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9hPlxcclxcblxcdFxcdFxcdFxcdDwvbGk+XFxyXFxuXFx0XFx0XFx0XFx0PGxpIGNsYXNzPVxcXCJuYXZfX2l0ZW1cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxhIGNsYXNzPVxcXCJsaW5rIGxpbmtfMlxcXCIgaHJlZj1cXFwiI1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibGlua19fY2FwXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRwb3J0Zm9saW9cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L2E+XFxyXFxuXFx0XFx0XFx0XFx0PC9saT5cXHJcXG5cXHRcXHRcXHRcXHQ8bGkgY2xhc3M9XFxcIm5hdl9faXRlbVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGEgY2xhc3M9XFxcImxpbmsgbGlua18zXFxcIiBocmVmPVxcXCIjXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJsaW5rX19jYXBcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdGFib3V0IHVzXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9hPlxcclxcblxcdFxcdFxcdFxcdDwvbGk+XFxyXFxuXFx0XFx0XFx0XFx0PGxpIGNsYXNzPVxcXCJuYXZfX2l0ZW1cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxhIGNsYXNzPVxcXCJsaW5rIGxpbmtfNFxcXCIgaHJlZj1cXFwiI1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibGlua19fY2FwXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRjb250YWN0XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9hPlxcclxcblxcdFxcdFxcdFxcdDwvbGk+XFxyXFxuXFx0XFx0XFx0PC91bD5cXHJcXG5cXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJiaWdtYWNcXFwiPlxcclxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImJpZ21hY19faW5uZXJcXFwiPjwvZGl2PlxcclxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImJpZ21hY19faW5uZXJcXFwiPjwvZGl2PlxcclxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImJpZ21hY19faW5uZXJcXFwiPjwvZGl2PlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdFxcclxcblxcdFxcdDwvaGVhZGVyPiBcXHJcXG5cXHRcXHQ8c2VjdGlvbiBjbGFzcz1cXFwic2VjdGlvbi1jb250YWN0c1xcXCI+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwic2VjdCBzZWN0X19jb250YWN0c1xcXCI+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiY29udGFjdHNfX3RleHRcXFwiPlxcclxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImNvdmVyc1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGgxIGNsYXNzPVxcXCJoZWFkQmlnIGNvbnRhY3RzX19oZWFkQmlnXzFcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdG91ciBzdHJvbmdcXHJcXG5cXHRcXHRcXHRcXHQ8L2gxPlxcclxcblxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdFxcdDxoMSBjbGFzcz1cXFwiaGVhZEJpZyBjb250YWN0c19faGVhZEJpZ18yXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRvcmdhbml6YXRpb25cXHJcXG5cXHRcXHRcXHRcXHQ8L2gxPlxcclxcblxcdFxcdFxcdFxcdDxwIGNsYXNzPVxcXCJwYXIgY29udGFjdHNfX3BhclxcXCI+IFxcclxcblxcdFxcdFxcdFxcdFxcdExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBRdW9kIG5vbiBwYXJpYXR1ciBuYW0gZmFjaWxpcyBvbW5pcyBxdWFzaSBhdHF1ZSBhcmNoaXRlY3RvLCB2ZXJpdGF0aXMsIGlwc3VtIG5lbW8gYSEgXFxyXFxuXFx0XFx0XFx0XFx0PC9wPlxcclxcblxcdFxcdFxcdFxcdDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnV0dG9uIGNvbnRhY3RzX19idXR0b25cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdGNvbnRhY3QgdXNcXHJcXG5cXHRcXHRcXHRcXHQ8L2J1dHRvbj5cXHJcXG5cXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8IS0tIDxmaWd1cmUgY2xhc3M9XFxcImZpZ3VyZS1mbGV4IGNvbnRhY3RzX19maWd1cmVcXFwiPiAtLT5cXHJcXG5cXHRcXHRcXHRcXHQ8aWZyYW1lICBjbGFzcz1cXFwiY29udGFjdHNfX3ZpZGVvXFxcIiBzcmM9XFxcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL0lJdHpxZkg4aF9vXFxcIiBmcmFtZWJvcmRlcj1cXFwiMFxcXCIgYWxsb3c9XFxcImFjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlXFxcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+XFxyXFxuXFx0XFx0XFx0XFx0PCEtLSA8ZmlnY2FwdGlvbiBjbGFzcz1cXFwiZmlnLWNhcFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHAgY2xhc3M9XFxcImZpZ19fY2FwXFxcIj4gRGVzY3JpcHRpb24gb2YgdGhlIHZpZGVvIGF2YWlsYWJsZSBvbiB2aWRlbyBob3N0aW5nIHNlcnZpY2UgWW91dHViZTwvcD5cXHJcXG5cXHRcXHRcXHRcXHQ8L2ZpZ2NhcHRpb24+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PC9maWd1cmU+IC0tPlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcclxcblxcdFxcdDwvc2VjdGlvbj5cXHJcXG5cXHQ8L2Rpdj5cXHJcXG5cXHQ8L2Rpdj5cXHJcXG5cXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHRcXHJcXG48ZGl2IGNsYXNzPVxcXCJwYWdlQmFja0NvbG9yMlxcXCI+XFxyXFxuXFx0PGRpdiBzdHlsZT1cXFwiaGVpZ2h0OjFweDtcXFwiPjwvZGl2PlxcclxcblxcdFxcdFxcclxcblxcdDxzZWN0aW9uIGNsYXNzPVxcXCJzZWN0aW9uLW9mZmVyc1xcXCI+XFxyXFxuXFx0XFx0PGRpdiBjbGFzcz1cXFwic2VjdCBzZWN0aW9uX19vZmZlcnMgY29udGFpbmVyXFxcIj5cXHRcXHRcXHRcXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb2wteGwtNSBjb2wtbGctMTIgbm8tcGFkIG9mZmVyc19tZWRpYVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGgzIGNsYXNzPVxcXCJoZWFkTWlkIG9mZmVyc19faGVhZE1pZFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0ZG8geW91IGtub3cgd2hhdCB3ZSBjYW4gcHJvdmlkZSBmb3IgeW91ID9cXHJcXG5cXHRcXHRcXHRcXHQ8L2gzPlxcclxcblxcdFxcdFxcdFxcdDxwIGNsYXNzPVxcXCJwYXIgb2ZmZXJzX19wYXJcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBWb2x1cHRhdHVtIGFzcGVybmF0dXIgbmF0dXMgZnVnaWF0IGVvcywgdm9sdXB0YXRlcyBkdWNpbXVzLiBPZGl0IHRlbXBvcmUgcmVtIGl1cmUuIEFjY3VzYW11cywgbmlzaSBkb2xvciBjdXBpZGl0YXRlIHJlY3VzYW5kYWUuIExhYm9yZSBwcm92aWRlbnQgaXBzYSBlc3QgY29tbW9kaSBuZXNjaXVudC5cXHJcXG5cXHRcXHRcXHRcXHQ8L3A+XFxyXFxuXFx0XFx0XFx0XFx0PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidXR0b24gb2ZmZXJzX19idXR0b25cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdExlYXJuIE1vcmVcXHJcXG5cXHRcXHRcXHRcXHQ8L2J1dHRvbj5cXHJcXG5cXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb2wteGwtNiBjb2wtbGctMTIgb2Zmc2V0LXhsLTEgcm93IG9mZmVyc19fZGVzYyBuby1wYWQgXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJyb3cgbWItMjUgb2ZmZXJzX3dyYXBcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImNvbC1sZy02IGNvbC1tZC0xMiBfX21lZGlhXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8aSBjbGFzcz1cXFwiZmFzIGZhLWNvZyBvZmZlcnNfX2ljb25cXFwiPjwvaT5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8aDQgY2xhc3M9XFxcImhlYWRMaXQgb2ZmZXJzX19oZWFkTGl0XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRNYW5hZ2VtZW50XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9oND5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8cCBjbGFzcz1cXFwicGFyIHBhcl90cmFuc3BhcmVudCBtcjAgbXQtNlxcXCI+XFx0TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIE9wdGlvIGRlc2VydW50IHJlcHVkaWFuZGFlIGJsYW5kaXRpaXMgZG9sb3JpYnVzIHZvbHVwdGF0ZW0gdml0YWUgcG9ycm8gZmFjZXJlLCByZW0gaXN0ZSBlc3NlIGxhYm9yZSBcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L3A+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiY29sLWxnLTYgY29sLW1kLTEyIF9fbWVkaWFcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxpIGNsYXNzPVxcXCJmYXMgZmEtcGVuY2lsLWFsdCBvZmZlcnNfX2ljb25cXFwiPjwvaT5cXHJcXG5cXHRcXHRcXHQgXFx0XFx0XFx0PGg0IGNsYXNzPVxcXCJoZWFkTGl0IG9mZmVyc19faGVhZExpdFxcXCI+XFxyXFxuXFx0XFx0XFx0IFxcdFxcdFxcdFxcdFVJIC8gVVggZGVzaWduXFxyXFxuXFx0XFx0XFx0IFxcdFxcdFxcdDwvaDQ+XFxyXFxuXFx0XFx0XFx0IFxcdFxcdFxcdDxwIGNsYXNzPVxcXCJwYXIgcGFyX3RyYW5zcGFyZW50IG1yMCBtdC02XFxcIj5cXHRMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXhwZWRpdGEgdm9sdXB0YXMgcXVpZGVtIG5vbiBxdW9kIGFkIG1vbGxpdGlhIGV4Y2VwdHVyaSBxdWFzaSBxdW9zIGFjY3VzYW50aXVtIGVycm9yIHF1YXMsIHNpbWlsaXF1ZVxcclxcblxcdFxcdFxcdCBcXHRcXHRcXHQ8L3A+XFxyXFxuXFx0XFx0XFx0IFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdCBcXHQ8L2Rpdj5cXHJcXG5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJyb3cgb2ZmZXJzX3dyYXBcXFwiPlxcclxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImNvbC1sZy02IGNvbC1tZC0xMiBwci0zMCBfX21lZGlhXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8aSBjbGFzcz1cXFwiZmFyIGZhLWdlbSBvZmZlcnNfX2ljb25cXFwiPjwvaT5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8aDQgY2xhc3M9XFxcImhlYWRMaXQgb2ZmZXJzX19oZWFkTGl0XFxcIj5Mb2dvIC8gQnJhbmRpbmdcXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L2g0PlxcclxcblxcdFxcdFxcdFxcdFxcdDxwIGNsYXNzPVxcXCJwYXIgcGFyX3RyYW5zcGFyZW50IG1yMCBtdC02XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSW5jaWR1bnQgc3VudCBkb2xvcnVtIHBlcnNwaWNpYXRpcyBhdCBjb25zZXF1YXR1ciwgYXNwZXJpb3JlcyBvcHRpbyBzaW50IHByYWVzZW50aXVtLiBJdGFxdWUgZXhwZWRpdGEsIGRvbG9yXFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9wPlxcclxcblxcdFxcdFxcdCBcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHQgXFx0PGRpdiBjbGFzcz1cXFwiY29sLWxnLTYgY29sLW1kLTEyIF9fbWVkaWFcXFwiPlxcclxcblxcdFxcdFxcdCBcXHRcXHQ8aSBjbGFzcz1cXFwiZmFzIGZhLXRydWNrIG9mZmVyc19faWNvblxcXCI+PC9pPlxcclxcblxcdFxcdFxcdCBcXHRcXHQ8aDQgY2xhc3M9XFxcImhlYWRMaXQgb2ZmZXJzX19oZWFkTGl0XFxcIj5cXHJcXG5cXHRcXHRcXHQgXFx0XFx0XFx0QW5pbWF0aW9uXFxyXFxuXFx0XFx0XFx0IFxcdFxcdDwvaDQ+XFxyXFxuXFx0XFx0XFx0IFxcdFxcdDxwIGNsYXNzPVxcXCJwYXIgcGFyX3RyYW5zcGFyZW50IG1yMCBtdC02XFxcIj5cXHJcXG5cXHRcXHRcXHQgXFx0XFx0TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIFZvbHVwdGF0aWJ1cyBjdXBpZGl0YXRlIHF1YW0gbW9sZXN0aWFzIGRlYml0aXMgaWxsbyByZXBlbGxlbmR1cyBzaW1pbGlxdWUsIHBvc3NpbXVzXFxyXFxuXFx0XFx0XFx0IFxcdFxcdDwvcD5cXHJcXG5cXHRcXHRcXHRcXHQ8L2Rpdj4gXFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0PC9kaXY+XFxyXFxuXFx0PC9kaXY+XFxyXFxuPC9zZWN0aW9uPlxcclxcbjxzZWN0aW9uIGNsYXNzPVxcXCJzZWN0aW9uLXByb2R1Y3RzXFxcIj5cXHJcXG5cXHQ8ZGl2IGNsYXNzPVxcXCJzZWN0IHNlY3Rpb25fX3Byb2R1Y3RzXFxcIj5cXHJcXG5cXHRcXHRcXHQ8aDMgY2xhc3M9XFxcImhlYWRNaWQgcHJvZHVjdHNfX2hlYWRNaWRcXFwiPlxcclxcblxcdFxcdFxcdFxcdGZlYXR1cmUgcHJvZHVjdHNcXHJcXG5cXHRcXHRcXHQ8L2gzPlxcclxcblxcdFxcdFxcdDxwIGNsYXNzPVxcXCJwYXIgcHJvZHVjdHNfX3BhclxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIE1vbGxpdGlhIGlsbG8gZGVsZWN0dXMsIHZpdGFlIGVzc2UsIG1haW9yZXMgY29uc2VxdXVudHVyIHF1aXMgdm9sdXB0YXRlIGF1dGVtIVxcclxcblxcdFxcdFxcdDwvcD5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJob3JSb3dcXFwiPjwvZGl2PlxcclxcblxcdFxcdFxcdDx1bCBjbGFzcz1cXFwibGlzdC1mbGV4IHByb2R1Y3RzX19saXN0XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8bGkgY2xhc3M9XFxcImxpc3RfX2l0ZW1cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjYXRlZ29yeS1saW5rXFxcIj5hbGw8L2E+XFxyXFxuXFx0XFx0XFx0XFx0PC9saT5cXHJcXG5cXHRcXHRcXHRcXHQ8bGkgY2xhc3M9XFxcImxpc3RfX2l0ZW1cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjYXRlZ29yeS1saW5rXFxcIj5wcmludCB0ZW1wbGF0ZTwvYT5cXHJcXG5cXHRcXHRcXHRcXHQ8L2xpPlxcclxcblxcdFxcdFxcdFxcdDxsaSBjbGFzcz1cXFwibGlzdF9faXRlbVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImNhdGVnb3J5LWxpbmtcXFwiPndlYiB0ZW1wbGF0ZTwvYT5cXHJcXG5cXHRcXHRcXHRcXHQ8L2xpPlxcclxcblxcdFxcdFxcdFxcdDxsaSBjbGFzcz1cXFwibGlzdF9faXRlbVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImNhdGVnb3J5LWxpbmtcXFwiPnVzZXIgaW50ZXJmYWNlPC9hPlxcclxcblxcdFxcdFxcdFxcdDwvbGk+XFxyXFxuXFx0XFx0XFx0XFx0PGxpIGNsYXNzPVxcXCJsaXN0X19pdGVtXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiY2F0ZWdvcnktbGlua1xcXCI+bW9jay11cDwvYT5cXHJcXG5cXHRcXHRcXHRcXHQ8L2xpPlxcclxcblxcdFxcdFxcdDwvdWw+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiaW1nLWNvbnN0LWFycmF5IFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGZpZ3VyZSBjbGFzcz1cXFwiZmlnIHByb2R1Y3RzX19maWd1cmVcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxpbWcgY2xhc3M9XFxcImltZ1xcXCIgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9wcm9kdWN0cy9wcjEuanBnXCIpICsgXCJcXFwiIGFsdD1cXFwib3VyIHByb2R1Y3RzXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8L2ZpZ3VyZT5cXHJcXG5cXHRcXHRcXHRcXHQ8ZmlndXJlIGNsYXNzPVxcXCJmaWcgcHJvZHVjdHNfX2ZpZ3VyZVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGltZyBjbGFzcz1cXFwiaW1nXFxcIiBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL3Byb2R1Y3RzL3ByMi5qcGdcIikgKyBcIlxcXCIgYWx0PVxcXCJvdXIgcHJvZHVjdHNcXFwiPlxcclxcblxcdFxcdFxcdFxcdDwvZmlndXJlPlxcclxcblxcdFxcdFxcdFxcdDxmaWd1cmUgY2xhc3M9XFxcImZpZyBwcm9kdWN0c19fZmlndXJlXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8aW1nIGNsYXNzPVxcXCJpbWdcXFwiIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvcHJvZHVjdHMvcHIzLmpwZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIm91ciBwcm9kdWN0c1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PC9maWd1cmU+XFxyXFxuXFx0XFx0XFx0XFx0PGZpZ3VyZSBjbGFzcz1cXFwiZmlnIHByb2R1Y3RzX19maWd1cmVcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxpbWcgY2xhc3M9XFxcImltZ1xcXCIgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9wcm9kdWN0cy9wcjQuanBnXCIpICsgXCJcXFwiIGFsdD1cXFwib3VyIHByb2R1Y3RzXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8L2ZpZ3VyZT5cXHJcXG5cXHRcXHRcXHRcXHQ8ZmlndXJlIGNsYXNzPVxcXCJmaWcgcHJvZHVjdHNfX2ZpZ3VyZVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGltZyBjbGFzcz1cXFwiaW1nXFxcIiBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL3Byb2R1Y3RzL3ByNS5qcGdcIikgKyBcIlxcXCIgYWx0PVxcXCJvdXIgcHJvZHVjdHNcXFwiPlxcclxcblxcdFxcdFxcdFxcdDwvZmlndXJlPlxcclxcblxcdFxcdFxcdFxcdDxmaWd1cmUgY2xhc3M9XFxcImZpZyBwcm9kdWN0c19fZmlndXJlXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8aW1nIGNsYXNzPVxcXCJpbWdcXFwiIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvcHJvZHVjdHMvcHI2LmpwZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIm91ciBwcm9kdWN0c1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PC9maWd1cmU+XFxyXFxuXFx0XFx0XFx0XFx0PGZpZ3VyZSBjbGFzcz1cXFwiZmlnIHByb2R1Y3RzX19maWd1cmVcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxpbWcgY2xhc3M9XFxcImltZ1xcXCIgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9wcm9kdWN0cy9wcjcuanBnXCIpICsgXCJcXFwiIGFsdD1cXFwib3VyIHByb2R1Y3RzXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8L2ZpZ3VyZT5cXHJcXG5cXHRcXHRcXHRcXHQ8ZmlndXJlIGNsYXNzPVxcXCJmaWcgcHJvZHVjdHNfX2ZpZ3VyZVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGltZyBjbGFzcz1cXFwiaW1nXFxcIiBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL3Byb2R1Y3RzL3ByOC5qcGdcIikgKyBcIlxcXCIgYWx0PVxcXCJvdXIgcHJvZHVjdHNcXFwiPlxcclxcblxcdFxcdFxcdFxcdDwvZmlndXJlPlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdDwvZGl2PlxcclxcblxcdDwvc2VjdGlvbj5cXHJcXG5cXHQ8c2VjdGlvbiBjbGFzcz1cXFwic2VjdGlvbi10ZWFtXFxcIj5cXHJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJzZWN0IHNlY3Rpb25fX3RlYW1cXFwiPlxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInRlYW1fX3dyYXBcXFwiPlxcclxcblxcdFxcdFxcdFxcdDxoNCBjbGFzcz1cXFwiaGVhZE1pZCB0ZWFtX19oZWFkTWlkXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRtZWV0IG91ciB0ZWFtXFxyXFxuXFx0XFx0XFx0XFx0PC9oND5cXHJcXG5cXHRcXHRcXHRcXHQ8cCBjbGFzcz1cXFwicGFyIHRlYW1fX3BhclxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIE9iY2FlY2F0aSB0ZW5ldHVyIGZhY2VyZSB2ZW5pYW0gdm9sdXB0YXRlIG1vbGxpdGlhIHJlcGVsbGF0IG5lcXVlIHF1YXMgdmVsIGF1dGVtLCB0b3RhbSBuYW0gY29ycG9yaXMgcmVpY2llbmRpcyBldC4gU2VxdWkgaXN0ZSBtYXhpbWUgZG9sb3JlIHF1b3MgbW9kaS5cXHJcXG5cXHRcXHRcXHRcXHQ8L3A+XFxyXFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiaG9yUm93IHRlYW1fX2hvclJvd1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibWVtYmVyc1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGZpZ3VyZSBjbGFzcz1cXFwiZmlnIG1lbWJlci1maWd1cmVfX2RldGFpbGVkXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8aW1nIGNsYXNzPVxcXCJpbWdcXFwic3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy90ZWFtL3RlYW0xLmpwZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIm91ciB0ZWFtIG1lbWJlclxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PC9maWd1cmU+XFxyXFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibWVtYmVycy1pbmZvXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8aDQgY2xhc3M9XFxcImhlYWRMaXQgbWVtYmVyc19faGVhZExpdFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0bWFyayB3b3VnaFxcclxcblxcdFxcdFxcdFxcdFxcdDwvaDQ+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHAgY2xhc3M9XFxcInBhciBtZW1iZXJfX2luZm9cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBOb2JpcyBhYiBhdXQgaW52ZW50b3JlIHJlaWNpZW5kaXMgaXVzdG8gc2ltaWxpcXVlIGhhcnVtIHZvbHVwdGF0aWJ1cyBpbXBlZGl0IGFzc3VtZW5kYSBpcHNhIGZ1Z2l0LCB2b2x1cHRhdGUgdWxsYW0gZXggbW9kaS4gTmF0dXMgbmlzaSwgbmVjZXNzaXRhdGlidXMgbnVsbGEgYWxpYXMuXFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9wPlxcclxcblxcdFxcdFxcdFxcdFxcdDx1bCBjbGFzcz1cXFwibGlzdC1mbGV4IG1lbWJlcnNfX2xpc3RcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxsaT5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRGYWNlYm9va1xcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvbGk+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGxpPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdERyaWJibGVcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2xpPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxsaT5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRCZWhhbmNlXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9saT5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8bGk+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0VHdpdHRlclxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvbGk+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC91bD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJpbWctY29uc3QtYXJyYXlcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxmaWd1cmUgY2xhc3M9XFxcImZpZyBtZW1iZXJzX19maWdcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxpbWcgY2xhc3M9XFxcImltZ1xcXCIgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy90ZWFtL3RlYW0yLmpwZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIm91ciB0ZWFtIG1lbWJlclxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9maWd1cmU+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGZpZ3VyZSBjbGFzcz1cXFwiZmlnIG1lbWJlcnNfX2ZpZ1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGltZyBjbGFzcz1cXFwiaW1nXFxcIiBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL3RlYW0vdGVhbTMuanBnXCIpICsgXCJcXFwiIGFsdD1cXFwib3VyIHRlYW0gbWVtYmVyXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2ZpZ3VyZT5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZmlndXJlIGNsYXNzPVxcXCJmaWcgbWVtYmVyc19fZmlnXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aW1nIGNsYXNzPVxcXCJpbWdcXFwiIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvdGVhbS90ZWFtNC5qcGdcIikgKyBcIlxcXCIgYWx0PVxcXCJvdXIgdGVhbSBtZW1iZXJcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvZmlndXJlPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxmaWd1cmUgY2xhc3M9XFxcImZpZyBtZW1iZXJzX19maWdcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxpbWcgY2xhc3M9XFxcImltZ1xcXCIgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy90ZWFtL3RlYW01LmpwZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIm91ciB0ZWFtIG1lbWJlclxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9maWd1cmU+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0PC9kaXY+XFxyXFxuXFx0PC9zZWN0aW9uPlxcclxcblxcdFxcdFxcdDxzZWN0aW9uIGNsYXNzPVxcXCJzZWN0aW9uLWZvcm1TdWJcXFwiPlxcclxcblxcclxcblxcdFxcdFxcdFxcdDxkaXYgc3R5bGU9XFxcImhlaWdodDoxcHg7XFxcIj48L2Rpdj5cXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHQ8aDEgY2xhc3M9XFxcImhlYWRCaWcgZm9ybVN1Yl9faGVhZFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0RGVzaWduIHRpcHMsIHRyaWNrcywgYW5kIGZyZWViaWVzLiBEZWxpdmVyZWQgd2Vla2x5LlxcclxcblxcdFxcdFxcdFxcdDwvaDE+XFxyXFxuXFx0XFx0XFx0XFx0PHAgY2xhc3M9XFxcInBhciBmb3JtU3ViX19wYXJcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LlxcclxcblxcdFxcdFxcdFxcdDwvcD5cXHJcXG5cXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJmb3JtU3ViLXdyYXBcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImZvcm1TdWJfX3dyYXAtaW5wdXQtaWNvblxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcImVtYWlsXFxcIiBjbGFzcz1cXFwiaW5wdXQgZm9ybVN1Yl9faW5wdXRcXFwiIHBsYWNlaG9sZGVyPVxcXCJUeXBlIHlvdXIgZW1haWxcXFwiIHJlcXVpcmVkPlxcclxcblxcdFxcdFxcdFxcdFxcdDxpIGNsYXNzID0gXFxcImZhcyBmYS1jaGVjayBpY29uX19hY2NlcHRcXFwiPjwvaT5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8aSBjbGFzcz1cXFwiZmFzIGZhLXRpbWVzIGljb25fX2Vycm9yXFxcIj48L2k+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIG5hbWU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ1dHRvbiBmb3JtU3ViX19idG5cXFwiIHZhbHVlPVxcXCJzdWJRdWVyeVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0c3Vic2NyaWJlXFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9idXR0b24+XFxyXFxuXFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0PC9zZWN0aW9uPiAgXFxyXFxuXFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0PCEtLSBNQVggV0lEVEggRU5EIC0tPlxcclxcbjxkaXYgY2xhc3M9XFxcInBhZ2VCYWNrQ29sb3IyXFxcIj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IHN0eWxlPVxcXCJoZWlnaHQ6MXB4O1xcXCI+PC9kaXY+XFx0XFxyXFxuXFx0PHNlY3Rpb24gY2xhc3M9XFxcInNlY3Rpb24tY29ubmVjdFxcXCI+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwic2VjdCBzZWN0aW9uX19jb25uZWN0XFxcIj5cXHRcXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb25uZWN0X193cmFwLWhlYWRlclxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGgzIGNsYXNzPVxcXCJoZWFkTWlkIGNvbm5lY3RfX2hlYWRNaWRcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdGdldCBpbiB0b3VjaFxcclxcblxcdFxcdFxcdFxcdDwvaDM+XFxyXFxuXFx0XFx0XFx0XFx0PHAgY2xhc3M9XFxcInBhciBjb25uZWN0X19wYXJcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBdXRlbSBtb2xlc3RpYWUsIG1pbnVzIHNlZCBub24gaXVzdG8gc2FwaWVudGUgaXBzYW0gbWF4aW1lIGFyY2hpdGVjdG8gcXVvcyBudW1xdWFtIHRlbXBvcmlidXMgZXVtIG51bGxhIGV0IHZvbHVwdGFzIGRlbGVuaXRpIHJlcHJlaGVuZGVyaXQgb2JjYWVjYXRpIGl1cmUgZG9sb3JpYnVzP1xcclxcblxcdFxcdFxcdFxcdDwvcD5cXHJcXG5cXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJob3JSb3cgY29ubmVjdF9faG9yUm93XFxcIj5cXHRcXHRcXHJcXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb25uZWN0X193cmFwLWZvb3RlclxcXCI+XFx0XFxyXFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiY29ubmVjdF9faW5uZXItd3JhcFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGZvcm0gYWN0aW9uPVxcXCJtYWlsdG86dmxhcy5kNzhAZ21haWwuY29tXFxcIiBtZXRob2Q9XFxcInBvc3RcXFwiIGlkPVxcXCJmb3JtU2VuZEVtYWlsXFxcIiBhY3Rpb249XFxcIi4vc2VuZE1zZy5waHBcXFwiIGVuY3R5cGU9XFxcIm11bHRpcGFydC9mb3JtLWRhdGFcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImNvbm5lY3RfX2lucHV0cy11c2VyLWluZm9cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImlucHV0LW5hbWVcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJmbmFtZVxcXCIgY2xhc3M9XFxcImlucHV0IGNvbm5lY3RfX2lucHV0IGNvbm5lY3RfX2lucHV0LW5hbWVcXFwiIHBsYWNlaG9sZGVyPVxcXCJUeXBlIHlvdXIgZmlyc3QgbmFtZVxcXCIgZm9ybT1cXFwiZm9ybVNlbmRFbWFpbFxcXCJyZXF1aXJlZD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aSBjbGFzcyA9IFxcXCJmYXMgZmEtY2hlY2sgaWNvbl9fYWNjZXB0XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0aWNvbl9hY2NlcHQtb2Zmc2V0XFxcIj48L2k+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0PGkgY2xhc3M9XFxcImZhcyBmYS10aW1lcyBpY29uX19lcnJvclxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdGljb25fZXJyb3Itb2Zmc2V0XFxcIj48L2k+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiaW5wdXQtbWFpbFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcIm1haWxcXFwiIGNsYXNzPVxcXCJpbnB1dCBjb25uZWN0X19pbnB1dCBjb25uZWN0X19pbnB1dC1tYWlsXFxcIiBwbGFjZWhvbGRlcj1cXFwiVHlwZSB5b3VyIGVtYWlsXFxcIiBmb3JtPVxcXCJmb3JtU2VuZEVtYWlsXFxcIiBmb3JtPVxcXCJmb3JtU2VuZEVtYWlsXFxcIiByZXF1aXJlZD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aSBjbGFzcyA9IFxcXCJmYXMgZmEtY2hlY2sgaWNvbl9fYWNjZXB0XFxcIj48L2k+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0PGkgY2xhc3M9XFxcImZhcyBmYS10aW1lcyBpY29uX19lcnJvclxcXCI+PC9pPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDx0ZXh0YXJlYSBuYW1lPVxcXCJtc2dcXFwiIGNsYXNzPVxcXCJpbnB1dCBjb25uZWN0X19pbnB1dCBjb25uZWN0X19pbnB1dC1tc2dcXFwiIHBsYWNlaG9sZGVyPVxcXCJUeXBlIHlvdXIgbWVzc2FnZVxcXCIgZm9ybT1cXFwiZm9ybVNlbmRFbWFpbFxcXCI+PC90ZXh0YXJlYT5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ1dHRvbiBjb25uZWN0X19idXR0b25cXFwiIGZvcm09XFxcImZvcm1TZW5kRW1haWxcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdHNlbmQgbWVzc2FnZVxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvYnV0dG9uPlxcclxcblxcdFxcdFxcdFxcdFxcdDwvZm9ybT5cXHJcXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb250YWN0LWluZm8gY29ubmVjdF9fY29udGFjdC1pbmZvXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJpbmZvX19jb250ZW50XFxcIj5cXHRcXHRcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8aDQgY2xhc3M9XFxcImhlYWRMaXQgaW5mb19faGVhZExpdFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0Y29udGFjdCBpbmZvXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9oND5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8cCBjbGFzcz1cXFwicGFyIGluZm9fX3BhclxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0VWtyYWluZSwgS2lldiA8YnI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0VmxhcyBEaWVsb3YgPGJyPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdG1haWw6IHZsYXMuZDc4QGdtYWlsLmNvbSA8YnI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0Z2l0SHViOiBodHRwczovL2dpdGh1Yi5jb20vdmxhc0plZGkgPGJyPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdG1vYmlsZTogKzM4MDk1MTg3MzUwOVxcdFxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvcD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHQ8L2Rpdj5cXHJcXG5cXHQ8L3NlY3Rpb24+XFxyXFxuXFx0XFx0PGZvb3RlciBjbGFzcz1cXFwiZm9vdGVyXFxcIj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb250ZW50X19hbGlnblxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PHAgY2xhc3M9XFxcImZvb3Rlcl9fcmlnaHRzXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8Y29kZT4gJiMxNjk7PC9jb2RlPkNvcHlyaWdodEAyMDE4LiBBbGwgcmlnaHRzIHJlc2VydmVkLiBcXHJcXG5cXHRcXHRcXHRcXHQ8L3A+XFxyXFxuXFx0XFx0XFx0XFx0PHAgY2xhc3M9XFxcInRleHQtaGlnaGxpZ2h0XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRZb3UgY2FuIGNvbm5lY3Qgd2l0aCBtZSB2aWFcXHJcXG5cXHRcXHRcXHRcXHQ8L3A+XFxyXFxuXFx0XFx0XFx0XFx0PHVsIGNsYXNzPVxcXCJsaXN0IGxpc3Qtc29jaWFsXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8bGkgY2xhc3M9XFxcImxpc3QtaG9yLWNvbnN0X19pdGVtXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8YSBocmVmPVxcXCJza3lwZTp2bGFzLmQ3OD9jaGF0XFxcIiAgcmVsPVxcXCJub2ZvbGxvd1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxpIGNsYXNzPVxcXCJmYWIgZmEtc2t5cGUgZmFzX19cXFwiPjwvaT5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2E+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9saT5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8bGkgY2xhc3M9XFxcImxpc3QtaG9yLWNvbnN0X19pdGVtXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8YSBocmVmPVxcXCJodHRwczovL3R3aXR0ZXIuY29tL3ZsYXNkaWVsb3ZcXFwiICByZWw9XFxcIm5vZm9sbG93XFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGkgY2xhc3M9XFxcImZhYiBmYS10d2l0dGVyIGZhc19fXFxcIj48L2k+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9hPlxcclxcblxcdFxcdFxcdFxcdFxcdDwvbGk+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGxpIGNsYXNzPVxcXCJsaXN0LWhvci1jb25zdF9faXRlbVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3ZsYXNkaWVsb3ZcXFwiIHJlbD1cXFwibm9mb2xsb3dcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8aSBjbGFzcz1cXFwiZmFiIGZhLWZhY2Vib29rLWYgZmFzX19cXFwiPjwvaT5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L2E+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9saT5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8bGkgY2xhc3M9XFxcImxpc3QtaG9yLWNvbnN0X19pdGVtXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vdmxhc0plZGlcXFwiIHJlbD1cXFwibm9mb2xsb3dcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8aSBjbGFzcz1cXFwiZmFiIGZhLWdpdGh1YiBmYXNfX1xcXCI+PC9pPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvYT5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L2xpPlxcclxcblxcdFxcdFxcdFxcdDwvdWw+XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0PC9mb290ZXI+XFxyXFxuXFx0PGRpdiBzdHlsZT1cXFwiaGVpZ2h0OjFweDtcXFwiPjwvZGl2PlxcdFxcclxcblxcdDwvZGl2PlxcdFxcclxcblxcclxcblxcdFxcdDxzY3JpcHQgZGVmZXIgc3JjPVxcXCJodHRwczovL3VzZS5mb250YXdlc29tZS5jb20vcmVsZWFzZXMvdjUuNC4yL2pzL2FsbC5qc1xcXCIgaW50ZWdyaXR5PVxcXCJzaGEzODQtd3A5NmRJZ0RsNUJMbE9YYjRWTWluWFBOaUIzMlZZQlNvWE9vaUFSelNUWFkrdHNLOHlEVFlmdmRUeXF6ZEdHTlxcXCIgY3Jvc3NvcmlnaW49XFxcImFub255bW91c1xcXCI+PC9zY3JpcHQ+XFxyXFxuXFx0PC9ib2R5PlxcclxcblxcdDwvaHRtbD5cXHJcXG5cIjsiLCI7XHJcblwidXNlIHN0cmljdFwiXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU3Vic2NyaWJ0aW9uKCBpbnB1dCApIHtcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiZW1haWxcIixpbnB1dC52YWx1ZSlcclxuICAgICAgICAvLyBQSFAgRklMRSBUTyBIQU5ETEUgU1VCU0NSSUJUSU9OXHJcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnLi9zdWJzY3JpYmVVc2VyLnBocCcsIHRydWUpO1xyXG4gICAgICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcclxuICAgICAgICB4aHIudGltZW91dCA9IDMwMDA7XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgICAgICBhbGVydChcIllvdSBzdWNjZXNmdWxseSBzdWJzY3JpYmVkICFcIik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIllvdSBhcmUgYWxyZWFkeSBzdWJzY3JpYmVkICFcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTsiLCI7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCAnLi4vc2Nzcy9tYWluLnNjc3MnO1xyXG5pbXBvcnQgJy4uL2luZGV4LnRlbXAuaHRtbCc7XHJcbmltcG9ydCB2YWxpZGF0ZUVtYWlsIGZyb20gJy4vdmFsaWRhdGVFbWFpbCc7XHJcbmltcG9ydCB2YWxpZGF0ZU5hbWUgZnJvbSAnLi92YWxpZGF0ZU5hbWUnO1xyXG5pbXBvcnQgY2hlY2tTdWJzY3JpYnRpb24gZnJvbSAnLi9jaGVja1N1YnNjcmlidGlvbic7XHJcbmltcG9ydCBuYXZDb2xsYXBzZSBmcm9tICcuL25hdkNvbGxhcHNlJztcclxuLy8gSU5WTFVERVMgVkFMSURBVEUgRU1BSUxcclxuaW1wb3J0IHNob3dBY2NlcHRFcnJvckljb24gZnJvbSAnLi9zaG93QWNjZXB0RXJyb3JJY29uJztcclxuXHJcblxyXG4gKGZ1bmN0aW9uICgpIHtcclxuXHJcblxyXG5cdGxldCBtb2JpbGVOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpbmtfYmxvY2tcIik7XHJcblx0bGV0IGNsYXNzSW4gPSBcImpzLXVuY29sbGFwc2VkXCI7XHJcblx0bGV0IGNsYXNzT3V0ID0gXCJqcy1jb2xsYXBzZWRcIjtcclxuXHRsZXQgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iaWdtYWNcIik7XHJcblx0bGV0IGJ0blN1YnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1TdWJfX2J0blwiKTtcclxuICBsZXQgaW5wU3VicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVN1Yl9faW5wdXRcIik7XHJcbiAgbGV0IGlucE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbm5lY3RfX2lucHV0LW5hbWVcIik7XHJcbiAgbGV0IGlucE1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbm5lY3RfX2lucHV0LW1haWxcIik7XHJcbiAgXHJcblx0YnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKVxyXG5cdFx0e1xyXG5cdFx0XHRuYXZDb2xsYXBzZShtb2JpbGVOYXYsY2xhc3NJbixjbGFzc091dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRidG5TdWJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICh2YWxpZGF0ZUVtYWlsKGlucFN1YnMpKSB7XHJcbiAgICAgICAgY2hlY2tTdWJzY3JpYnRpb24oaW5wU3Vicyk7XHJcbiAgICAgIH19KTsgXHJcblxyXG4gIGlucFN1YnMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAvKiBJQ09OUyBTSE9VTEQgQkUgU0VMRUNURUQgQVQgQ0FMTCBUSU1FIEJFQ0FVU0VcclxuICAgICAgICBJQ09OUywgQUZURVIgTE9BRCwgU1dJVENIIFRPIFNWRyBTTyBTRUxFQ1RPUlNcclxuICAgICAgICBCRUNPTUUgVU5ERUZJTkVEICovIFxyXG4gICAgICBsZXQgaWNvbkFjY2VwdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVN1Yl9fd3JhcC1pbnB1dC1pY29uID4gLmljb25fX2FjY2VwdFwiKTtcclxuICAgICAgbGV0IGljb25FcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVN1Yl9fd3JhcC1pbnB1dC1pY29uID4gLmljb25fX2Vycm9yXCIpO1xyXG4gICAgICBzaG93QWNjZXB0RXJyb3JJY29uKCBpbnBTdWJzLCBpY29uQWNjZXB0LCBpY29uRXJyb3IsIFwidmlzaWJsZVwiLCB2YWxpZGF0ZUVtYWlsICk7XHJcbiAgfSk7XHJcblxyXG4gIGlucE5hbWUuYWRkRXZlbnRMaXN0ZW5lciggJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgLyogSUNPTlMgU0hPVUxEIEJFIFNFTEVDVEVEIEFUIENBTEwgVElNRSBCRUNBVVNFXHJcbiAgICAgICAgSUNPTlMsIEFGVEVSIExPQUQsIFNXSVRDSCBUTyBTVkcgU08gU0VMRUNUT1JTXHJcbiAgICAgICAgQkVDT01FIFVOREVGSU5FRCAqLyBcclxuICAgICAgbGV0IGljb25BY2NlcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlucHV0LW5hbWUgPiAuaWNvbl9fYWNjZXB0XCIpO1xyXG4gICAgICBsZXQgaWNvbkVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC1uYW1lID4gLmljb25fX2Vycm9yXCIpO1xyXG4gICAgICBzaG93QWNjZXB0RXJyb3JJY29uKCBpbnBOYW1lLCBpY29uQWNjZXB0LCBpY29uRXJyb3IsIFwidmlzaWJsZVwiLCB2YWxpZGF0ZU5hbWUgKTtcclxuICB9KTtcclxuICBpbnBNYWlsLmFkZEV2ZW50TGlzdGVuZXIoICdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8qIElDT05TIFNIT1VMRCBCRSBTRUxFQ1RFRCBBVCBDQUxMIFRJTUUgQkVDQVVTRVxyXG4gICAgICAgIElDT05TLCBBRlRFUiBMT0FELCBTV0lUQ0ggVE8gU1ZHIFNPIFNFTEVDVE9SU1xyXG4gICAgICAgIEJFQ09NRSBVTkRFRklORUQgKi8gXHJcbiAgICAgIGxldCBpY29uQWNjZXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC1tYWlsID4gLmljb25fX2FjY2VwdFwiKTtcclxuICAgICAgbGV0IGljb25FcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXQtbWFpbCA+IC5pY29uX19lcnJvclwiKTtcclxuICAgICAgc2hvd0FjY2VwdEVycm9ySWNvbiggaW5wTWFpbCwgaWNvbkFjY2VwdCwgaWNvbkVycm9yLCBcInZpc2libGVcIiwgdmFsaWRhdGVFbWFpbCApO1xyXG4gIH0pO1xyXG59KCkpOyIsIjtcclxuXCJ1c2Ugc3RyaWN0XCJcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmF2Q29sbGFwc2Uobm9kZUxpc3QsY2xhc3NJbixjbGFzc091dCkge1xyXG4gICAgbGV0IGNsYXNzVG9BZGQ7XHJcbiAgICBsZXQgY2xhc3NUb1JlbTtcclxuICAgIGlmIChub2RlTGlzdFswXS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NJbikpIHtcclxuICAgICAgY2xhc3NUb0FkZCA9IGNsYXNzT3V0O1xyXG4gICAgICBjbGFzc1RvUmVtID0gY2xhc3NJbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsYXNzVG9BZGQgPSBjbGFzc0luO1xyXG4gICAgICBjbGFzc1RvUmVtID0gY2xhc3NPdXQ7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpPTA7IGk8bm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbm9kZUxpc3RbaV0uY2xhc3NMaXN0LmFkZChjbGFzc1RvQWRkKTtcclxuICAgICAgbm9kZUxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc1RvUmVtKTtcclxuICAgIH1cclxuICB9OyIsIjtcclxuXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNob3dBY2NlcHRFcnJvckljb24oIGlucHV0LCBpY29uQWNjZXB0LCBcclxuICBpY29uRXJyb3IsIGNsYXNzVmlzaWJsZSwgZnVuY0NoZWNrICkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgaWNvbkFjY2VwdC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzVmlzaWJsZSk7XHJcbiAgICAgICAgICBpY29uRXJyb3IuY2xhc3NMaXN0LnJlbW92ZShjbGFzc1Zpc2libGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICAgIGlmIChmdW5jQ2hlY2soaW5wdXQpKSB7XHJcbiAgICAgICAgICBpZiAoIWljb25BY2NlcHQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzVmlzaWJsZSkpIHtcclxuICAgICAgICAgICAgaWNvbkFjY2VwdC5jbGFzc0xpc3QuYWRkKGNsYXNzVmlzaWJsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpY29uRXJyb3IuY2xhc3NMaXN0LnJlbW92ZShjbGFzc1Zpc2libGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghaWNvbkVycm9yLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc1Zpc2libGUpKSB7XHJcbiAgICAgICAgICAgICAgaWNvbkVycm9yLmNsYXNzTGlzdC5hZGQoY2xhc3NWaXNpYmxlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGljb25BY2NlcHQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc1Zpc2libGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTsiLCI7XHJcblwidXNlIHN0cmljdFwiXHJcbiAgICBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKCBlbWFpbEZvcm0gKSB7XHJcbiAgICAgIC8vIEFMTCBUWVBFIE9GIFNQQUNFUyBFWENMVURFRCBcclxuICAgICAgICBlbWFpbEZvcm0udmFsdWUgPSBlbWFpbEZvcm0udmFsdWUucmVwbGFjZSggL1xccy9nLFwiXCIgKTtcclxuXHJcbiAgICAgICAgIC8vIENIRUNLIEFNT1VOVCBPRiBALCBTSE9VTEQgQkUgT05MWSAxXHJcbiAgICAgICAgaWYgKCAoIC9ALy50ZXN0KGVtYWlsRm9ybS52YWx1ZSkgJiZcclxuICAgICAgICAgICAgZW1haWxGb3JtLnZhbHVlLm1hdGNoKCAvQC9nICkubGVuZ3RoID09IDEpICYmXHJcbiAgICAgICAgICAvLyBDSEVDSyBBRlRFUiBFQUNIIERPVCBBTExPV0VEIENIQVJTXHJcbiAgICAgICAgICAgIS9cXC4oPyFbXFx3ISMkJSYnKisvPT9eYHt8fX4tXSkvLnRlc3QoIGVtYWlsRm9ybS52YWx1ZSApICYmXHJcbiAgICAgICAgICAvLyBDSEVDSyBET1QgQVQgU1RBUlQgT0YgRU1BSUxcclxuICAgICAgICAgICAhKCBlbWFpbEZvcm0udmFsdWVbMF09PT1cIi5cIiApICYmXHJcbiAgICAgICAgICAvLyBDSEVDSyBURU1QTEFURSBPRiBFTUFJTFxyXG4gICAgICAgICAgIC9eW1xcdyEjJCUmJyorLz0/XmB7fH1+Li1dKz9AXFx3Kz9cXC5cXHd7Mix9PyQvLnRlc3QoIGVtYWlsRm9ybS52YWx1ZSApXHJcbiAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4iLCI7XHJcblwidXNlIHN0cmljdFwiXHJcbiAgICBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWxpZGF0ZU5hbWUoIG5hbWVGb3JtICkge1xyXG4gICAgICAvLyBBTEwgVFlQRSBPRiBTUEFDRVMgRVhDTFVERUQgXHJcbiAgICAgICAgbmFtZUZvcm0udmFsdWUgPSBuYW1lRm9ybS52YWx1ZS5yZXBsYWNlKCAvXFxzL2csXCJcIiApO1xyXG4gICAgICAgIGlmICggL15bYS16XXsyLDE2fSQvaS50ZXN0KCBuYW1lRm9ybS52YWx1ZSApICkgIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH07IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWFpbi5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL21haW4uc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWFpbi5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuczo0MDAsNzAwLDcwMGkpO1wiLCBcIlwiXSk7XG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmxpc3QsIC5saXN0LWZsZXgsIC5saW5rLCAubGlua19fY2FwX21vYmlsZSwgLm5hdiB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IH1cXG5cXG4uaG9yUm93LCAubGlzdC1mbGV4LCAuaGVhZGVyLCAucHJvZHVjdHNfX2hlYWRNaWQsIC5wcm9kdWN0c19fcGFyLCAucGFyYWxsYXhfMSwgLnBhcmFsbGF4XzIsIC5mb3JtU3ViX19oZWFkLCAuZm9ybVN1Yl9fcGFyLCAuZm9ybVN1Yi13cmFwLCAuY29udGVudF9fYWxpZ24ge1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87IH1cXG5cXG5odG1sIHtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIiwgc2Fucy1zZXJpZjsgfVxcblxcbmJvZHkge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGNvbG9yOiAjNTg1ODU4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbiAgbGluZS1oZWlnaHQ6IDEuODtcXG4gIGJhY2tncm91bmQ6ICNlMGUwZTA7XFxuICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5jb250ZW50V3JhcHBlciB7XFxuICBtYXgtd2lkdGg6IDEyNTBweDtcXG4gIG1hcmdpbjogMCBhdXRvOyB9XFxuXFxuLm5vLXBhZCB7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBwYWRkaW5nLXJpZ2h0OiAwOyB9XFxuXFxuLm5vLW1hciB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxuICBtYXJnaW4tbGVmdDogMDsgfVxcblxcbi5wci0zMCB7XFxuICBwYWRkaW5nLXJpZ2h0OiAzMHB4OyB9XFxuXFxuLm1iLTI1IHtcXG4gIG1hcmdpbi1ib3R0b206IDI1cHg7IH1cXG5cXG4ubXQtNiB7XFxuICBtYXJnaW4tdG9wOiA2cHg7IH1cXG5cXG4uY2xlYXIge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDsgfVxcblxcbi5wYWdlQmFja0NvbG9yMiB7XFxuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIC8qIGhlaWdodDogYXV0bzsgKi8gfVxcblxcbi5kZiB7XFxuICBkaXNwbGF5OiBmbGV4OyB9XFxuXFxuLnBhcl90cmFuc3BhcmVudCB7XFxuICBjb2xvcjogIzczNzM3MzsgfVxcblxcbi5tcjAge1xcbiAgbWFyZ2luLXJpZ2h0OiAwOyB9XFxuXFxuLmhvclJvdyB7XFxuICB3aWR0aDogMTM1cHg7XFxuICBiYWNrZ3JvdW5kOiAjZmYzZjQwO1xcbiAgaGVpZ2h0OiAzcHg7IH1cXG5cXG4uZmlndXJlV3JhcCB7XFxuICBkaXNwbGF5OiBmbGV4OyB9XFxuXFxuLm1sLTgge1xcbiAgbWFyZ2luLWxlZnQ6IDhweDsgfVxcblxcbi5tYi04IHtcXG4gIG1hcmdpbi1ib3R0b206IDhweDsgfVxcblxcbkBrZXlmcmFtZXMgc2hhZG93VGV4dCB7XFxuICAwJSB7XFxuICAgIHRleHQtc2hhZG93OiA1cHggMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjUpOyB9XFxuICAyNSUge1xcbiAgICB0ZXh0LXNoYWRvdzogM3B4IDBweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC41KTsgfVxcbiAgNTAlIHtcXG4gICAgdGV4dC1zaGFkb3c6IDBweCAwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuNSk7IH1cXG4gIDc1JSB7XFxuICAgIHRleHQtc2hhZG93OiAtM3B4IDBweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC41KTsgfVxcbiAgMTAwJSB7XFxuICAgIHRleHQtc2hhZG93OiAtNXB4IDBweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC41KTsgfSB9XFxuXFxuQGtleWZyYW1lcyBidXR0b25KdW1wIHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDE1cHgpOyB9XFxuICAxMCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjRweCk7IH1cXG4gIDIwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzMnB4KTsgfVxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzMnB4KTsgfSB9XFxuXFxuQGtleWZyYW1lcyBib3JkZXJzIHtcXG4gIDAlIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwOyB9XFxuICAxMDAlIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAtMTgwcHg7IH0gfVxcblxcbkBrZXlmcmFtZXMgcGFyYWxsYXgtc3dpdGNoIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5oZWFkQmlnIHtcXG4gIGZvbnQtc2l6ZTogMy43NXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBmb250LXN0cmV0Y2g6IHVsdHJhLWNvbmRlbnNlZDtcXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XFxuICBjb2xvcjogIzAwMDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBsaW5lLWhlaWdodDogMS4yO1xcbiAgYW5pbWF0aW9uOiBzaGFkb3dUZXh0IDJzIGVhc2UtaW4gMHMgaW5maW5pdGUgYWx0ZXJuYXRlOyB9XFxuXFxuLmhlYWRNaWQge1xcbiAgZm9udC1zaXplOiAyLjZyZW07XFxuICBsaW5lLWhlaWdodDogMS4zO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTgwcHgpIHtcXG4gICAgLmhlYWRNaWQge1xcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTsgfSB9XFxuXFxuLmhlYWRMaXQge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBmb250LXdlaWdodDogNjAwOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTgwcHgpIHtcXG4gICAgLmhlYWRMaXQge1xcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtOyB9IH1cXG5cXG4ucGFyIHtcXG4gIGNvbG9yOiAjNmY2ZDZkO1xcbiAgbWluLXdpZHRoOiAyODBweDsgfVxcblxcbi5saXN0LWZsZXgge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgd2lkdGg6IDcyJTsgfVxcblxcbi5idXR0b24ge1xcbiAgd2lkdGg6IDIyNnB4O1xcbiAgaGVpZ2h0OiA1NXB4O1xcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgYmFja2dyb3VuZDogI2ZmM2Y0MDtcXG4gIGJvcmRlci13aWR0aDogMDtcXG4gIGZvbnQtc2l6ZTogMS4xM3JlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxuICBib3JkZXI6IDRweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGFuaW1hdGlvbjogYnV0dG9uSnVtcCAxLjVzIGVhc2Utb3V0IGluZmluaXRlIGFsdGVybmF0ZTsgfVxcbiAgLmJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjAwMDA7XFxuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlLW91dDsgfVxcbiAgLmJ1dHRvbjphY3RpdmUge1xcbiAgICBib3JkZXItY29sb3I6ICNmZjcwNzA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlYzBiNGI7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMDAycHgpIHtcXG4gICAgLmJ1dHRvbiB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvOyB9IH1cXG5cXG4uaW5wdXQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtaW4td2lkdGg6IDI5MHB4O1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgYm9yZGVyLXdpZHRoOiAwO1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICB0ZXh0LWluZGVudDogOCU7XFxuICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAxMHB4OyB9XFxuICAuaW5wdXQ6OnBsYWNlaG9sZGVyIHtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIHRleHQtaW5kZW50OiA1MHB4O1xcbiAgICBjb2xvcjogI2UwZTBlMDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLCBzYW5zLXNlcmlmOyB9XFxuXFxuLmZpZ3VyZS1mbGV4IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbjogMDtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGZsZXgtc2hyaW5rOiAxOyB9XFxuXFxuLmltZ19fYml0Y29pbiB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgbWFyZ2luLWJvdHRvbTogYXV0bzsgfVxcblxcbi5pbWctY29uc3QtYXJyYXkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcblxcbi5pbWcge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5maWcge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgcGFkZGluZy10b3A6IDA7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xcbiAgICAuZmlnIHtcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDYzMHB4KSB7XFxuICAgIC5maWcge1xcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDA7IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQzMHB4KSB7XFxuICAgIC5maWcge1xcbiAgICAgIC8qIG1heC13aWR0aDoyOTBweCAhaW1wb3J0YW50OyAqLyB9IH1cXG5cXG4ubGlzdF9faXRlbSB7XFxuICBjb2xvcjogIzczNzM3MztcXG4gIGZvbnQtc2l6ZTogMS4zNzVyZW07XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4OyB9XFxuXFxuLmNhdGVnb3J5LWxpbmsge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgdHJhbnNwYXJlbnQ7IH1cXG4gIC5jYXRlZ29yeS1saW5rOmhvdmVyLCAuY2F0ZWdvcnktbGluazphY3RpdmUge1xcbiAgICBjb2xvcjogI2ZmM2Y0MDtcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjRzIGVhc2Utb3V0LGJvcmRlci1ib3R0b20tY29sb3IgMC40cyBlYXNlLW91dDsgfVxcblxcbi5saW5rIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgY29sb3I6ICNlMGUwZTA7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDsgfVxcbiAgLmxpbms6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAjZmYzZjQwO1xcbiAgICBib3JkZXItY29sb3I6ICNjMDEyMTM7XFxuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC40cyBlYXNlLW91dCxib3JkZXIgMC4ycyBlYXNlLW91dDtcXG4gICAgY29sb3I6IHdoaXRlOyB9XFxuICAubGluazphY3RpdmUge1xcbiAgICBiYWNrZ3JvdW5kOiAjZmYzZjQwO1xcbiAgICBib3JkZXItY29sb3I6ICNjMDEyMTM7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDE3cHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTsgfVxcblxcbi5saW5rXzEge1xcbiAgd2lkdGg6IDkwcHg7IH1cXG5cXG4ubGlua18yIHtcXG4gIHdpZHRoOiAxNjVweDsgfVxcblxcbi5saW5rXzMge1xcbiAgd2lkdGg6IDEyMHB4OyB9XFxuXFxuLmxpbmtfNCB7XFxuICB3aWR0aDogMTY1cHg7IH1cXG5cXG4ubGlua19ibG9jayB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgaGVpZ2h0OiAwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyOiAwcHggc29saWQgYmxhY2s7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSBhdCBjZW50ZXIsIGJsYWNrLCAjNTA1MDUwIDEwMCUpOyB9XFxuXFxuLmxpbmtfX2NhcCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgdHJhbnNwYXJlbnQ7IH1cXG5cXG4ubGlua19fY2FwX21vYmlsZSB7XFxuICBmb250LXNpemU6IC44NzVyZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGNvbG9yOiAjZTBlMGUwO1xcbiAgbWFyZ2luLXRvcDogMjNweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyB9XFxuXFxuLm5hdiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDsgfVxcblxcbi5uYXZfX2l0ZW0ge1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLm5hdl8ge1xcbiAgLyogbWFyZ2luLWxlZnQ6MCAqL1xcbiAgLyogMzU3LyRtYXhXKjEwMCUgKi9cXG4gIG1hcmdpbi10b3A6IDA7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogNTUwcHg7IH1cXG5cXG4uaGVhZGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQ6ICMzMTMwMzA7XFxuICBmb250LXNpemU6IC44NzVyZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIHotaW5kZXg6IDY7IH1cXG5cXG4ubmF2X19tb2JpbGUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogNTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAwO1xcbiAgdG9wOiA3MHB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgLm5hdl9fbW9iaWxlIHtcXG4gICAgICBoZWlnaHQ6IDMwMHB4OyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlLW5hdi1tb2JpbGVfd2lkdGgtaW4ge1xcbiAgMCUge1xcbiAgICBoZWlnaHQ6IDA7IH1cXG4gIDgwJSB7XFxuICAgIGhlaWdodDogNzNweDsgfVxcbiAgMTAwJSB7XFxuICAgIGhlaWdodDogNzBweDsgfSB9XFxuXFxuQGtleWZyYW1lcyBzbGlkZS1uYXYtbW9iaWxlX3dpZHRoLW91dCB7XFxuICAwJSB7XFxuICAgIGhlaWdodDogNzBweDsgfVxcbiAgMTAwJSB7XFxuICAgIGhlaWdodDogMDsgfSB9XFxuXFxuLmpzLXVuY29sbGFwc2VkIHtcXG4gIGJvcmRlci13aWR0aDogMXB4O1xcbiAgYW5pbWF0aW9uOiBzbGlkZS1uYXYtbW9iaWxlX3dpZHRoLWluIDAuNnMgZWFzZS1vdXQgMHMgZm9yd2FyZHM7IH1cXG5cXG4uanMtY29sbGFwc2VkIHtcXG4gIGFuaW1hdGlvbjogc2xpZGUtbmF2LW1vYmlsZV93aWR0aC1vdXQgMC42cyBlYXNlLW91dCAwcyBmb3J3YXJkcztcXG4gIGJvcmRlci13aWR0aDogMHB4OyB9XFxuXFxuLmJpZ21hYyB7XFxuICBtYXJnaW4tdG9wOiAyMXB4O1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLXJpZ2h0OiAxMXB4O1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgd2lkdGg6IDU0cHg7XFxuICBoZWlnaHQ6IDI5cHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAuYmlnbWFjIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH0gfVxcblxcbi5iaWdtYWNfX2lubmVyIHtcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgaGVpZ2h0OiAzcHg7XFxuICBtYXJnaW4tdG9wOiA1cHg7IH1cXG5cXG4ud3JhcF9fZmxleC1uYXYge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIG1hcmdpbi1sZWZ0OiAyOC41NiU7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLndyYXBfX2ZsZXgtbmF2IHtcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDgzMHB4KSB7XFxuICAgIC53cmFwX19mbGV4LW5hdiB7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvOyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAud3JhcF9fZmxleC1uYXYge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7IH0gfVxcblxcbi5oZWFkZXJfIHtcXG4gIG1hcmdpbi1ib3R0b206IDgwcHg7XFxuICBoZWlnaHQ6IDkwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC13aWR0aDogMTI1MHB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgLmhlYWRlcl8ge1xcbiAgICAgIGhlaWdodDogNzBweDtcXG4gICAgICBtYXJnaW4tYm90dG9tOiA2NXB4OyB9IH1cXG5cXG4uc2VjdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgbWF4LXdpZHRoOiAxMjUwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbjogMCBhdXRvOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTI1MHB4KSB7XFxuICAgIC5zZWN0IHtcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XFxuICAgICAgcGFkZGluZy1yaWdodDogMTVweDsgfSB9XFxuXFxuLnNlY3Rpb25fX29mZmVycyB7XFxuICBtYXJnaW4tdG9wOiAxMDBweDtcXG4gIG1hcmdpbi1ib3R0b206IDg1cHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMTM2cHgpIHtcXG4gICAgLnNlY3Rpb25fX29mZmVycyB7XFxuICAgICAgbWFyZ2luLXRvcDogNDAwcHg7IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDU4MHB4KSB7XFxuICAgIC5zZWN0aW9uX19vZmZlcnMge1xcbiAgICAgIG1hcmdpbi10b3A6IDQwMHB4OyB9IH1cXG5cXG4ub2ZmZXJzX3dyYXAge1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87IH1cXG5cXG4ub2ZmZXJzX19oZWFkTWlkIHtcXG4gIG1hcmdpbi1ib3R0b206IDM0cHg7XFxuICBtYXJnaW4tdG9wOiAwOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTIzNXB4KSB7XFxuICAgIC5vZmZlcnNfX2hlYWRNaWQge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gfVxcblxcbi5vZmZlcnNfX3BhciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi1ib3R0b206IDUwcHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMjM1cHgpIHtcXG4gICAgLm9mZmVyc19fcGFyIHtcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9IH1cXG5cXG4ub2ZmZXJzX19idXR0b24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGNvbG9yOiAjZmYzZjQwO1xcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgYm9yZGVyOiAycHggc29saWQgI2ZmM2Y0MDtcXG4gIG1hcmdpbi1ib3R0b206IDEwMHB4OyB9XFxuICAub2ZmZXJzX19idXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlZmVmO1xcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZS1vdXQ7IH1cXG4gIC5vZmZlcnNfX2J1dHRvbjphY3RpdmUge1xcbiAgICBib3JkZXItc2l6ZTogNHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyMzVweCkge1xcbiAgICAub2ZmZXJzX19idXR0b24ge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bzsgfSB9XFxuXFxuLm9mZmVyc19tZWRpYSB7XFxuICAvKiBcXHRAbWVkaWEgKG1heC13aWR0aDoxMjM1cHgpIHtcXHJcXG5cXHRtYXJnaW4tYm90dG9tOiA2MHB4O1xcclxcbn0gKi8gfVxcblxcbi5vZmZlcnNfX2Rlc2Mge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIGNvbG9yOiAjNzM3MzczOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTAwMHB4KSB7XFxuICAgIC5vZmZlcnNfX2Rlc2Mge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gfVxcblxcbi5vZmZlcnNfX2hlYWRMaXQge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IDEycHg7IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTAwMHB4KSB7XFxuICAuX19tZWRpYSB7XFxuICAgIHBhZGRpbmc6IDA7IH0gfVxcblxcbi5vZmZlcnNfX2ljb24ge1xcbiAgZm9udC1zaXplOiAzNXB4O1xcbiAgY29sb3I6ICNmZjNmNDA7IH1cXG5cXG4uc2VjdGlvbl9fcHJvZHVjdHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nLXRvcDogODhweDtcXG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCAjZWNlY2VjO1xcbiAgbWFyZ2luLWJvdHRvbTogNTNweDsgfVxcblxcbi5wcm9kdWN0c19faGVhZE1pZCB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblxcbi5wcm9kdWN0c19fcGFyIHtcXG4gIG1pbi13aWR0aDogMjgwcHg7XFxuICB3aWR0aDogMzglO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLnByb2R1Y3RzX19saXN0IHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIG1hcmdpbi10b3A6IDYwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAzNXB4OyB9XFxuXFxuLnByb2R1Y3RzX19maWd1cmUge1xcbiAgbWF4LXdpZHRoOiAzMDBweDtcXG4gIGhlaWdodDogMzAwcHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA2MzBweCkge1xcbiAgICAucHJvZHVjdHNfX2ZpZ3VyZSB7XFxuICAgICAgcGFkZGluZy1yaWdodDogMDtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBoZWlnaHQ6IGF1dG87IH0gfVxcblxcbi5zZWN0aW9uX190ZWFtIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLnRlYW1fX3dyYXAge1xcbiAgd2lkdGg6IDU4JTtcXG4gIG1pbi13aWR0aDogMjg1cHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMjMwcHgpIHtcXG4gICAgLnRlYW1fX3dyYXAge1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bzsgfSB9XFxuXFxuLnRlYW1fX2hlYWRNaWQge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyMzVweCkge1xcbiAgICAudGVhbV9faGVhZE1pZCB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfSB9XFxuXFxuLnRlYW1fX3BhciB7XFxuICBtYXJnaW4tYm90dG9tOiAyNXB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTIzNXB4KSB7XFxuICAgIC50ZWFtX19wYXIge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gfVxcblxcbi50ZWFtX19ob3JSb3cge1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxuICBtYXJnaW4tYm90dG9tOiA3MHB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTIzNXB4KSB7XFxuICAgIC50ZWFtX19ob3JSb3cge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bzsgfSB9XFxuXFxuLm1lbWJlcnMge1xcbiAgZGlzcGxheTogZmxleDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyNTBweCkge1xcbiAgICAubWVtYmVycyB7XFxuICAgICAgZmxleC1mbG93OiBjb2x1bW47IH0gfVxcblxcbi5tZW1iZXJzLWluZm8ge1xcbiAgbWFyZ2luLWxlZnQ6IDUwcHg7XFxuICB3aWR0aDogNjUlOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTI1MHB4KSB7XFxuICAgIC5tZW1iZXJzLWluZm8ge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICB3aWR0aDogMTAwJTsgfSB9XFxuXFxuLm1lbWJlcnNfX2ZpZyB7XFxuICB3aWR0aDogMjAwcHg7XFxuICBoZWlnaHQ6IDIwMHB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTI1MHB4KSB7XFxuICAgIC5tZW1iZXJzX19maWcge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4OyB9IH1cXG5cXG4ubWVtYmVyc19faGVhZExpdCB7XFxuICBmb250LXNpemU6IDEuNnJlbTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMjUwcHgpIHtcXG4gICAgLm1lbWJlcnNfX2hlYWRMaXQge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gfVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjUwcHgpIHtcXG4gIC5tZW1iZXJfX2luZm8ge1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gfVxcblxcbi5tZW1iZXItZmlndXJlX19kZXRhaWxlZCB7XFxuICBtYXgtd2lkdGg6IDM1MHB4O1xcbiAgd2lkdGg6IDM0MHB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTI1MHB4KSB7XFxuICAgIC5tZW1iZXItZmlndXJlX19kZXRhaWxlZCB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvOyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAzNzVweCkge1xcbiAgICAubWVtYmVyLWZpZ3VyZV9fZGV0YWlsZWQge1xcbiAgICAgIHdpZHRoOiAxMDAlOyB9IH1cXG5cXG4ubWVtYmVyc19fbGlzdCB7XFxuICBtYXJnaW4tdG9wOiAxMXB4O1xcbiAgd2lkdGg6IDM3NXB4O1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBtYXJnaW4tYm90dG9tOiA0NXB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTI1MHB4KSB7XFxuICAgIC5tZW1iZXJzX19saXN0IHtcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgIC5tZW1iZXJzX19saXN0IHtcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICAgICAgd2lkdGg6IDkwJTsgfSB9XFxuXFxuLnBhcmFsbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBoZWlnaHQ6IDY1MHB4OyB9XFxuXFxuLnBhcmFsbGF4XzEge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWcvYmFjay9wYXJhbGxheF8yLmpwZ1wiKSkgKyBcIik7XFxuICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgb3BhY2l0eTogMDtcXG4gIHotaW5kZXg6IDI7XFxuICBhbmltYXRpb246IHBhcmFsbGF4LXN3aXRjaCA1cyBlYXNlLWluLW91dCAwcyBpbmZpbml0ZSBhbHRlcm5hdGU7IH1cXG5cXG4ucGFyYWxsYXhfMiB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltZy9iYWNrL3BhcmFsbGF4XzEuanBnXCIpKSArIFwiKTtcXG4gIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm9uZTtcXG4gIGJhY2tncm91bmQtY2xpcDogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwOyB9XFxuXFxuLmhlYWRlci13cmFwX19pbmZsb3cge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWF4LXdpZHRoOiAxMjUwcHg7XFxuICB0b3A6IDE1cHg7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIC8qIGJvcmRlcjoxcHggc29saWQgdHJhbnNwYXJlbnQ7ICovIH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAuaGVhZGVyLXdyYXBfX2luZmxvdyB7XFxuICAgICAgdG9wOiAwOyB9IH1cXG5cXG4uaGVhZGVyLXdyYXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB6LWluZGV4OiA0O1xcbiAgLyogQG1lZGlhIChtYXgtd2lkdGg6IDEyNTBweCkge1xcclxcblxcdFxcdHBhZGRpbmctbGVmdDogMTVweDtcXHJcXG5cXHRcXHRwYWRkaW5nLXJpZ2h0OiAxNXB4O1xcclxcblxcdH0gKi8gfVxcblxcbi5zZWN0X19jb250YWN0cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgbWFyZ2luLWJvdHRvbTogMHB4OyB9XFxuXFxuLmNvbnRhY3RzX190ZXh0IHtcXG4gIHdpZHRoOiA2MDlweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDExMzZweCkge1xcbiAgICAuY29udGFjdHNfX3RleHQge1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDE0MHB4O1xcbiAgICAgIG1hcmdpbi1sZWZ0OiAxMDBweDsgfSB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTAwMnB4KSB7XFxuICAgIC5jb250YWN0c19fdGV4dCB7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMTAwcHg7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvOyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA0MjBweCkge1xcbiAgICAuY29udGFjdHNfX3RleHQge1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XFxuICAgICAgd2lkdGg6IDEwMCU7IH0gfVxcblxcbi5zZWN0aW9uLWNvbnRhY3RzIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgbWFyZ2luLXRvcDogMTYwcHg7IH1cXG5cXG4uY292ZXJzIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZC1jbGlwOiBib3JkZXItYm94O1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgd2hpdGUsIHJlZCk7XFxuICBib3JkZXI6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtb3JpZ2luOiBib3JkZXItYm94O1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC15O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgaGVpZ2h0OiA5MXB4O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgYW5pbWF0aW9uOiBib3JkZXJzIDIwcyBsaW5lYXIgMHMgaW5maW5pdGU7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMDAycHgpIHtcXG4gICAgLmNvdmVycyB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvOyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1ODBweCkge1xcbiAgICAuY292ZXJzIHtcXG4gICAgICBoZWlnaHQ6IDYwcHg7IH0gfVxcblxcbi5jb250YWN0c19faGVhZEJpZ18xIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiA5MHB4O1xcbiAgbGVmdDogLTVweDtcXG4gIHJpZ2h0OiAtNXB4O1xcbiAgdG9wOiAtNXB4O1xcbiAgYm90dG9tOiAtNXB4O1xcbiAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAvKiBib3JkZXItaW1hZ2Utc291cmNlOmxpbmVhci1ncmFkaWVudCh0byB0b3AsYmxhY2sgLHdoaXRlKTtcXHJcXG5cXHRib3JkZXItaW1hZ2Utc2xpY2U6NjtcXHJcXG5cXHRib3JkZXItcmFkaXVzOjE1cHg7ICovXFxuICAvKiAmOjpiZWZvcmUsJjo6YWZ0ZXIge1xcclxcblxcdFxcdGNvbnRlbnQ6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsYmxhY2sgLHdoaXRlKTtcXHJcXG5cXHRcXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuXFx0XFx0d2lkdGg6MjBweDtcXHJcXG5cXHRcXHRoZWlnaHQ6MzBweDtcXHJcXG5cXHR9ICovXFxuICAvKiBib3JkZXItbGVmdC1jb2xvcjogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQsYmxhY2sgLHdoaXRlKTsgKi8gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMDJweCkge1xcbiAgICAuY29udGFjdHNfX2hlYWRCaWdfMSB7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1ODBweCkge1xcbiAgICAuY29udGFjdHNfX2hlYWRCaWdfMSB7XFxuICAgICAgZm9udC1zaXplOiAyLjNyZW07XFxuICAgICAgaGVpZ2h0OiA2MHB4OyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAzMzBweCkge1xcbiAgICAuY29udGFjdHNfX2hlYWRCaWdfMSB7XFxuICAgICAgZm9udC1zaXplOiAycmVtO1xcbiAgICAgIGxldHRlci1zcGFjaW5nOiAzcHg7IH0gfVxcblxcbi5jb250YWN0c19faGVhZEJpZ18yIHtcXG4gIGxldHRlci1zcGFjaW5nOiA3cHg7XFxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcbiAgbWFyZ2luLXRvcDogMTBweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMDJweCkge1xcbiAgICAuY29udGFjdHNfX2hlYWRCaWdfMiB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfSB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTgwcHgpIHtcXG4gICAgLmNvbnRhY3RzX19oZWFkQmlnXzIge1xcbiAgICAgIGZvbnQtc2l6ZTogMi4ycmVtO1xcbiAgICAgIGxldHRlci1zcGFjaW5nOiA0cHg7IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDMzMHB4KSB7XFxuICAgIC5jb250YWN0c19faGVhZEJpZ18yIHtcXG4gICAgICBmb250LXNpemU6IDEuN3JlbTtcXG4gICAgICBsZXR0ZXItc3BhY2luZzogM3B4OyB9IH1cXG5cXG4uY29udGFjdHNfX3BhciB7XFxuICB3aWR0aDogODAlO1xcbiAgbWFyZ2luLXRvcDogMDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIHRleHQtc2hhZG93OiA1cHggLTRweCAyMHB4ICNmZmY7XFxuICBmb250LXNpemU6IDEuMnJlbTsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMDJweCkge1xcbiAgICAuY29udGFjdHNfX3BhciB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfSB9XFxuXFxuLmNvbnRhY3RzX192aWRlbyB7XFxuICBoZWlnaHQ6IDMxNXB4O1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICB3aWR0aDogNDQuOCU7XFxuICBtYXgtd2lkdGg6IDU2MHB4O1xcbiAgbWluLXdpZHRoOiAyOTBweDtcXG4gIG1hcmdpbi10b3A6IDA7XFxuICBtYXJnaW4tYm90dG9tOiA1M3B4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5jb250YWN0c19fdmlkZW8ge1xcbiAgICAgIGhlaWdodDogMjc1cHg7IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDExMzZweCkge1xcbiAgICAuY29udGFjdHNfX3ZpZGVvIHtcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICAgICAgd2lkdGg6IDEwMCU7IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMDJweCkge1xcbiAgICAuY29udGFjdHNfX3ZpZGVvIHtcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMDJweCkge1xcbiAgICAuY29udGFjdHNfX3ZpZGVvIHtcXG4gICAgICBoZWlnaHQ6IDI3NXB4OyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xcbiAgICAuY29udGFjdHNfX3ZpZGVvIHtcXG4gICAgICBoZWlnaHQ6IDIzMHB4OyB9IH1cXG5cXG4uZmlnLWNhcCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG9wYWNpdHk6IDA7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG4gIC5maWctY2FwOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3MCwgNzAsIDcwLCAwLjYpO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZS1vdXQ7IH1cXG5cXG4uZmlnX19jYXAge1xcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogcmVkO1xcbiAgZm9udC1zaXplOiAxLjRyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgdGV4dC1zaGFkb3c6IDNweCAzcHggMTJweCBibGFjazsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XFxuICAgIC5maWdfX2NhcCB7XFxuICAgICAgZm9udC1zaXplOiAxcmVtOyB9IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTAwMnB4KSB7XFxuICAuY29udGFjdHNfX2J1dHRvbiB7XFxuICAgIG1hcmdpbi1ib3R0b206IDUwcHg7IH0gfVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA1ODBweCkge1xcbiAgLmNvbnRhY3RzX19idXR0b24ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAxODBweDsgfSB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDQ5N3B4KSB7XFxuICAuY29udGFjdHNfX2J1dHRvbiB7XFxuICAgIG1hcmdpbi1ib3R0b206IDE1MHB4OyB9IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMzk0cHgpIHtcXG4gIC5jb250YWN0c19fYnV0dG9uIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTIwcHg7IH0gfVxcblxcbi5zZWN0aW9uLWZvcm1TdWIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWcvYmFjay9mb3JtU3ViQmFjay5qcGdcIikpICsgXCIpO1xcbiAgaGVpZ2h0OiA1MTJweDtcXG4gIG1hcmdpbi10b3A6IDg1cHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA4NjBweCkge1xcbiAgICAuc2VjdGlvbi1mb3JtU3ViIHtcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XFxuICAgICAgcGFkZGluZy1yaWdodDogMTVweDsgfSB9XFxuXFxuLmZvcm1TdWJfX2hlYWQge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAxMzBweDtcXG4gIGZvbnQtc2l6ZTogMi42MjVyZW07XFxuICBtYXJnaW4tYm90dG9tOiAyNXB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTA0MHB4KSB7XFxuICAgIC5mb3JtU3ViX19oZWFkIHtcXG4gICAgICBtYXJnaW4tdG9wOiA0MHB4OyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgICAuZm9ybVN1Yl9faGVhZCB7XFxuICAgICAgZm9udC1zaXplOiAxLjlyZW07IH0gfVxcblxcbi5mb3JtU3ViX19wYXIge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuNjI1cmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogNTBweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xcbiAgICAuZm9ybVN1Yl9fcGFyIHtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMS40cmVtOyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA0MDBweCkge1xcbiAgICAuZm9ybVN1Yl9fcGFyIHtcXG4gICAgICBmb250LXNpemU6IDEuMnJlbTsgfSB9XFxuXFxuLmZvcm1TdWItd3JhcCB7XFxuICBtYXgtd2lkdGg6IDg1MHB4O1xcbiAgaGVpZ2h0OiAyNTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTI3NnB4KSB7XFxuICAgIC5mb3JtU3ViLXdyYXAge1xcbiAgICAgIGhlaWdodDogMTMwcHg7IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xcbiAgICAuZm9ybVN1Yi13cmFwIHtcXG4gICAgICBoZWlnaHQ6IDI1MHB4O1xcbiAgICAgIGZsZXgtZmxvdzogY29sdW1uOyB9IH1cXG5cXG4uZm9ybVN1Yl9fd3JhcC1pbnB1dC1pY29uIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWF4LXdpZHRoOiA1MjBweDtcXG4gIHdpZHRoOiA2OSU7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLmZvcm1TdWJfX3dyYXAtaW5wdXQtaWNvbiB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgICAgaGVpZ2h0OiA3MHB4OyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA0NTBweCkge1xcbiAgICAuZm9ybVN1Yl9fd3JhcC1pbnB1dC1pY29uIHtcXG4gICAgICB3aWR0aDogODAlO1xcbiAgICAgIGhlaWdodDogNjBweDsgfSB9XFxuXFxuLmZvcm1TdWJfX2lucHV0IHtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLmljb25fX2FjY2VwdCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xcbiAgY29sb3I6IGdyZWVuO1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5pY29uX19lcnJvciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xcbiAgY29sb3I6IHJlZDtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4udmlzaWJsZSB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5mb3JtU3ViX19idG4ge1xcbiAgd2lkdGg6IDIxNXB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNjVweDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBtYXJnaW4tbGVmdDogYXV0bzsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQ1MHB4KSB7XFxuICAgIC5mb3JtU3ViX19idG4ge1xcbiAgICAgIGhlaWdodDogNjBweDsgfSB9XFxuXFxuLmlucHV0LW5hbWUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZy1yaWdodDogMTVweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgICAuaW5wdXQtbmFtZSB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvOyB9IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMTcycHgpIHtcXG4gICAgLmlucHV0LW5hbWUge1xcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDA7IH0gfVxcblxcbi5pbnB1dC1tYWlsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgICAuaW5wdXQtbWFpbCB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvOyB9IH1cXG5cXG4uaWNvbl9hY2NlcHQtb2Zmc2V0IHtcXG4gIHJpZ2h0OiAxNXB4OyB9XFxuXFxuLmljb25fZXJyb3Itb2Zmc2V0IHtcXG4gIHJpZ2h0OiAxNXB4OyB9XFxuXFxuLndyYXBwZXJfdyB7XFxuICB3aWR0aDogNTglOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTIzNXB4KSB7XFxuICAgIC53cmFwcGVyX3cge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bzsgfSB9XFxuXFxuLmNvbm5lY3RfX3dyYXAtaGVhZGVyIHtcXG4gIHdpZHRoOiA1OCU7XFxuICBtaW4td2lkdGg6IDMwMHB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTIzMHB4KSB7XFxuICAgIC5jb25uZWN0X193cmFwLWhlYWRlciB7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIHBhZGRpbmctbGVmdDogMTVweDtcXG4gICAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4OyB9IH1cXG5cXG4uY29ubmVjdF9fd3JhcC1mb290ZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwOyB9XFxuXFxuLnNlY3Rpb25fX2Nvbm5lY3Qge1xcbiAgbWFyZ2luLXRvcDogMTEwcHg7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi1ib3R0b206IDE1MHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgcGFkZGluZy1yaWdodDogMDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwNTBweCkge1xcbiAgICAuc2VjdGlvbl9fY29ubmVjdCB7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMDsgfSB9XFxuXFxuLmNvbm5lY3RfX3dyYXAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGhlaWdodDogYXV0bzsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwNTBweCkge1xcbiAgICAuY29ubmVjdF9fd3JhcCB7XFxuICAgICAgZmxleC1mbG93OiBjb2x1bW47IH0gfVxcblxcbi5jb25uZWN0X19pbm5lci13cmFwIHtcXG4gIHdpZHRoOiA1OCU7XFxuICBoZWlnaHQ6IDQ3MnB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTA1MHB4KSB7XFxuICAgIC5jb25uZWN0X19pbm5lci13cmFwIHtcXG4gICAgICBoZWlnaHQ6IDU4MHB4O1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XFxuICAgICAgcGFkZGluZy1yaWdodDogMThweDsgfSB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gICAgLmNvbm5lY3RfX2lubmVyLXdyYXAge1xcbiAgICAgIHdpZHRoOiAxMDAlOyB9IH1cXG5cXG4uY29ubmVjdF9faGVhZE1pZCB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyMzVweCkge1xcbiAgICAuY29ubmVjdF9faGVhZE1pZCB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfSB9XFxuXFxuLmNvbm5lY3RfX3BhciB7XFxuICBtYXJnaW4tYm90dG9tOiAyNXB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTIzNXB4KSB7XFxuICAgIC5jb25uZWN0X19wYXIge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gfVxcblxcbi5jb25uZWN0X19ob3JSb3cge1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxuICBtYXJnaW4tYm90dG9tOiA3MHB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTIzNXB4KSB7XFxuICAgIC5jb25uZWN0X19ob3JSb3cge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bzsgfSB9XFxuXFxuLmNvbm5lY3RfX2lucHV0cy11c2VyLWluZm8ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxcblxcbi5jb25uZWN0X19pbnB1dCB7XFxuICBoZWlnaHQ6IDcwcHg7XFxuICB3aWR0aDogMzQwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGUwO1xcbiAgdGV4dC1pbmRlbnQ6IDEyJTsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyNDBweCkge1xcbiAgICAuY29ubmVjdF9faW5wdXQge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4OyB9IH1cXG4gIC5jb25uZWN0X19pbnB1dDo6cGxhY2Vob2xkZXIge1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgdGV4dC1pbmRlbnQ6IDUwcHg7XFxuICAgIGNvbG9yOiAjNzM3MzczO1xcbiAgICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICAgIG1hcmdpbi10b3A6IDA7IH1cXG5cXG4uY29ubmVjdF9faW5wdXQtbXNnIHtcXG4gIG1hcmdpbi10b3A6IDUwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMjQzcHg7XFxuICB0ZXh0LWluZGVudDogNXB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTA1MHB4KSB7XFxuICAgIC5jb25uZWN0X19pbnB1dC1tc2cge1xcbiAgICAgIG1hcmdpbi10b3A6IDMwcHg7IH0gfVxcblxcbi5jb25uZWN0X19idXR0b24ge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDcwcHg7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7IH1cXG5cXG4uY29udGFjdC1pbmZvIHtcXG4gIHdpZHRoOiA0MTJweDtcXG4gIGJhY2tncm91bmQ6ICMyZDJkMmQ7IH1cXG5cXG4uY29ubmVjdF9fY29udGFjdC1pbmZvIHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogMTA1MHB4KSB7XFxuICAgIC5jb25uZWN0X19jb250YWN0LWluZm8ge1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBoZWlnaHQ6IDM1MHB4O1xcbiAgICAgIG1hcmdpbi10b3A6IDQwcHg7IH0gfVxcblxcbi5pbmZvX19jb250ZW50IHtcXG4gIG1hcmdpbi1sZWZ0OiA3NXB4O1xcbiAgbWFyZ2luLXRvcDogMTQwcHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMDUwcHgpIHtcXG4gICAgLmluZm9fX2NvbnRlbnQge1xcbiAgICAgIG1hcmdpbi10b3A6IDUwcHg7IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAgIC5pbmZvX19jb250ZW50IHtcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87IH0gfVxcblxcbi5pbmZvX19oZWFkTGl0IHtcXG4gIGZvbnQtc2l6ZTogMS4xMjVyZW07XFxuICBjb2xvcjogI2Q3ZDdkNztcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgICAuaW5mb19faGVhZExpdCB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfSB9XFxuXFxuLmluZm9fX3BhciB7XFxuICBjb2xvcjogI2UwZTBlMDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAgIC5pbmZvX19wYXIge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gfVxcblxcbi5mb290ZXIge1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYmFja2dyb3VuZDogIzMxMzAzMDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICB6LWluZGV4OiA1O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBvcGFjaXR5OiAuOTsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDg3MHB4KSB7XFxuICAgIC5mb290ZXIge1xcbiAgICAgIGhlaWdodDogODBweDsgfSB9XFxuXFxuLmNvbnRlbnRfX2FsaWduIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1heC13aWR0aDogMTI1MHB4O1xcbiAgY29sb3I6ICNiMWIxYjE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA4NzBweCkge1xcbiAgICAuY29udGVudF9fYWxpZ24ge1xcbiAgICAgIGZsZXgtZmxvdzogY29sdW1uO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDsgfSB9XFxuXFxuLmxpc3Qtc29jaWFsIHtcXG4gIHBhZGRpbmctbGVmdDogMDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDg3MHB4KSB7XFxuICAgIC5saXN0LXNvY2lhbCB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXRvcDogMDtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDA7XFxuICAgICAgbWFyZ2luLXRvcDogMDsgfSB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDg3MHB4KSB7XFxuICAuZm9vdGVyX19yaWdodHMge1xcbiAgICBmb250LXNpemU6IDAuNnJlbTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gICAgbWFyZ2luLXRvcDogMDsgfSB9XFxuXFxuLnRleHQtaGlnaGxpZ2h0IHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgYW5pbWF0aW9uOiB0ZXh0U3RyZXRjaCAycyBlYXNlLWluLW91dCAwcyBpbmZpbml0ZSBhbHRlcm5hdGUsXFxyIHRleHRCb2xkIDJzIGVhc2UtaW4tb3V0IDBzIGluZmluaXRlIGFsdGVybmF0ZTsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDg3MHB4KSB7XFxuICAgIC50ZXh0LWhpZ2hsaWdodCB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgZm9udC1zaXplOiAwLjdyZW07XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgICBwYWRkaW5nLXRvcDogMDtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogYXV0bztcXG4gICAgICBtYXJnaW4tdG9wOiAwO1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7IH0gfVxcblxcbkBrZXlmcmFtZXMgdGV4dFN0cmV0Y2gge1xcbiAgMCUge1xcbiAgICBsZXR0ZXItc3BhY2luZzogMnB4OyB9XFxuICAxMDAlIHtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDRweDsgfSB9XFxuXFxuQGtleWZyYW1lcyB0ZXh0Qm9sZCB7XFxuICAwJSB7XFxuICAgIGZvbnQtc2l6ZTogYm9sZDsgfVxcbiAgMTAwJSB7XFxuICAgIGZvbnQtc2l6ZTogbm9ybWFsOyB9IH1cXG5cXG4ubGlzdC1ob3ItY29uc3RfX2l0ZW0ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7IH1cXG5cXG4uZmFzX18ge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBjb2xvcjogd2hpdGU7XFxuICBiYWNrZ3JvdW5kOiAjMzEzMDMwOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogODcwcHgpIHtcXG4gICAgLmZhc19fIHtcXG4gICAgICBmb250LXNpemU6IDEuNnJlbTsgfSB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICB9XG4gICAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gICAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gICAgfVxuICAgIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICAgIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gJ1wiJyArIHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpICsgJ1wiJ1xuICAgIH1cblxuICAgIHJldHVybiB1cmxcbn1cbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCBwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCl7XG4gICAgcmV0dXJuIHBhcmVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbn07XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQsIHBhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0LCBwYXJlbnQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEF0LmJlZm9yZSwgdGFyZ2V0KTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblxuXHRpZihvcHRpb25zLmF0dHJzLm5vbmNlID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuXHRcdGlmIChub25jZSkge1xuXHRcdFx0b3B0aW9ucy5hdHRycy5ub25jZSA9IG5vbmNlO1xuXHRcdH1cblx0fVxuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGdldE5vbmNlKCkge1xuXHRpZiAodHlwZW9mIF9fd2VicGFja19ub25jZV9fID09PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIF9fd2VicGFja19ub25jZV9fO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCA/IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpIFxuXHRcdCA6IG9wdGlvbnMudHJhbnNmb3JtLmRlZmF1bHQob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=