# jsPreprocessor

A simple JavaScript pre-processor to help get your project started.

### What it does

We scan the source text of a JavaScript program in the file test.js looking for calls to a one of our special functions, indicated by its name appearing in the <i>specialFunctionNames</i> object, adding the keyword await in front of the call. Any calls to functions not in this list are left alone. 

We use the <a href="https://www.npmjs.com/package/acorn">acorn</a> parser to turn the original code into an AST. Then we do a depth-first traversal of the tree, looking for function calls and process them as described above

Finally we turn the AST into JS text, using <a href="https://www.npmjs.com/package/escodegen">escodegen</a>. It should be ready to run. 

### Notes

The internal routine, visitCodeTree maintains a stack and passes it to the visit routine, but it isn't needed. 

