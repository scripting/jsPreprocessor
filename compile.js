var myVersion = "0.4.0", myProductName = "jsPreprocessor";

const fs = require ("fs");
const utils = require ("daveutils");
const acorn = require ("acorn");
const escodegen = require ("escodegen");

const specialFunctionNames = {
	alabama: {
		},
	georgia: {
		},
	texas: {
		},
	minnesota: {
		},
	florida: {
		},
	utah: {
		}
	};

function isSpecial (name) {
	for (var x in specialFunctionNames) {
		if (x == name) {
			return (true);
			}
		}
	return (false);
	}
function visitCodeTree (theTree, visit) {
	var stack = new Array ();
	function doVisit (node) { //depth-first traversal
		for (var x in node) {
			if (typeof node [x] == "object") {
				stack.push (node);
				doVisit (node [x], visit);
				stack.pop ();
				}
			}
		if (node != null) {
			visit (node, stack);
			}
		}
	doVisit (theTree);
	}
function fixSpecialFunctionCalls (theTree) {
	visitCodeTree (theTree, function (node, stack) {
		if (node.type == "CallExpression") {
			if (node.callee !== undefined) {
				if (isSpecial (node.callee.name)) {
					var nodecopy = new Object ();
					for (var x in node) {
						nodecopy [x] = node [x];
						}
					for (var x in node) {
						delete node [x];
						}
					node.type = "AwaitExpression";
					node.argument = nodecopy;
					}
				}
			}
		});
	}

console.log ("\n" + myProductName + " v" + myVersion);
fs.readFile ("test.js", function (err, jstext) {
	if (err) {
		console.log ("err.message == " + err.message);
		}
	else {
		console.log ("\nsource text == \n" + jstext + "\n");
		var code = acorn.parse (jstext, {ecmaVersion: 2020});
		fixSpecialFunctionCalls (code);
		var jstext2 = escodegen.generate (code);
		console.log ("\ngenerated text == \n" + jstext2 + "\n");
		}
	});
