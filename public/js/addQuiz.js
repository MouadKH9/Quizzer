/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/addQuiz.js":
/*!*********************************!*\
  !*** ./resources/js/addQuiz.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(function () {
  $("input[type='text']").focusout(function () {
    if ($(this).val() != '') $(this).removeClass("is-invalid");
  });
  $("input[type='checkbox']").click(function () {
    if ($(this).is(":checked")) $(this).parents(".question").find(".no-answer").hide();
  });
});

function tryToSubmit() {
  if (!validate()) return;
  var data = getData();
  $.ajax({
    type: "POST",
    url: "/add",
    data: {
      data: data
    },
    success: function success(res, status) {
      if (status != "success") return showError();
      showSuccess(res);
      console.log("Data: ");
      console.log(data);
      console.log("Response: ");
      console.log(res);
    },
    error: function error(msg) {
      console.log(msg.responseText);
      showError();
    }
  });
}

function getData() {
  var results = [];
  $(".question").each(function (index, question) {
    var questionVal = $(question).find(".value").val();
    var answers = [];
    $(question).find(".answer").each(function (i, answer) {
      answers.push({
        answer: $(answer).find(".answerVal").val(),
        correct: $(answer).find(".answerCheck").is(":checked")
      });
    });
    results.push({
      question: questionVal,
      answers: answers
    });
  });
  return {
    name: $("#name").val(),
    description: $("#desc").val(),
    questions: results
  };
}

function validate() {
  var texts = $("input[type='text']").toArray();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = texts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var text = _step.value;

      if ($(text).val() == '') {
        $(text).addClass("is-invalid");
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var questions = $(".question").toArray();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = questions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var question = _step2.value;
      var okay = false;
      $(question).find("input[type='checkbox']").each(function (i, check) {
        if ($(check).is(":checked")) {
          okay = true;
        }

        ;
      });

      if (!okay) {
        $(question).find(".no-answer").show();
        return false;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return true;
}

function expand(el) {
  var previous = $(el).parent().prev();
  var lastID = $(previous).data('id');
  $(makeAnswerInput(lastID + 1)).insertAfter(previous);
}

function makeAnswerInput(id) {
  var str = "<div class=\"col-md-6 answer\" data-id=\"".concat(id, "\"> <div class=\"input-group mb-3\"> <div class=\"input-group-prepend\"> <div class=\"input-group-text\"> <input type=\"checkbox\" class=\"answerCheck\"> </div></div><input type=\"text\" class=\"form-control answerVal\" placeholder=\"Answer\"><div class=\"input-group-append\"><span class=\"input-group-text delete\" onclick=\"remove(this)\"><i class=\"fa fa-trash\"></i></span></div></div></div>");
  return $(str);
}

function expandQuestion(el) {
  var previous = $(el).parent().prev();
  var lastID = $(previous).data('id');
  $(makeQuestionInput(lastID + 1)).insertAfter(previous);
}

function makeQuestionInput(id) {
  var str = "<div class=\"question\" data-id=\"".concat(id, "\"> <div class=\"form-group input-group\"> <input type=\"text\" class=\"form-control value\" placeholder=\"Question\"><div class=\"input-group-append\"> <span class=\"input-group-text delete\" onclick=\"removeQuestion(this)\"><i class=\"fa fa-trash\"></i></span> </div></div><div class=\"no-answer text-danger\">Should have at least one correct answer!</div><div class=\"row\"> <div class=\"col-md-6 answer\" data-id=\"1\"> <div class=\"input-group mb-3\"> <div class=\"input-group-prepend\"> <div class=\"input-group-text\"> <input type=\"checkbox\" class=\"answerCheck\"> </div></div><input type=\"text\" class=\"form-control answerVal\" placeholder=\"Answer\"><div class=\"input-group-append\"><span class=\"input-group-text delete\" onclick=\"remove(this)\"><i class=\"fa fa-trash\"></i></span></div></div></div><div class=\"col-md-6 answer\" data-id=\"2\"> <div class=\"input-group mb-3\"> <div class=\"input-group-prepend\"> <div class=\"input-group-text\"> <input type=\"checkbox\" class=\"answerCheck\"> </div></div><input type=\"text\" class=\"form-control answerVal\" placeholder=\"Answer\"><div class=\"input-group-append\"><span class=\"input-group-text delete\" onclick=\"remove(this)\"><i class=\"fa fa-trash\"></i></span></div></div></div><div class=\"col-md-6\"> <a onclick=\"expand(this)\"><h4><i class=\"fa fa-plus-circle\"></i> Add</h4></a> </div></div><hr> </div>");
  return $(str);
}

function showError() {
  console.log("ERROR");
}

function showSuccess(id) {
  console.log("HALLELUJAH " + id);
}

function remove(el) {
  var numberAns = $(el).parents(".question").find(".answer").toArray().length;
  if (numberAns < 3) return;
  $(el).parents(".answer").remove();
}

function removeQuestion(el) {
  var numberQ = $(".question").toArray().length;
  if (numberQ < 2) return;
  $(el).parents(".question").remove();
}

/***/ }),

/***/ 2:
/*!***************************************!*\
  !*** multi ./resources/js/addQuiz.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Dev\Quiz\resources\js\addQuiz.js */"./resources/js/addQuiz.js");


/***/ })

/******/ });