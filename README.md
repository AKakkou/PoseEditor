# Pose Editor

(under construction...)

## How to install
```
bower install poseeditor
```

Please include these files.
```
#{bower_components}/poseeditor/build/poseeditor.js
#{bower_components}/poseeditor/ext/OrbitControls.js
#{bower_components}/poseeditor/ext/TransformControls.js
```
For detail to `index.html`.


## Requirement
+ bower
+ tsd (TypeScript Definition manager)
+ tsc (TypeScript Compiler)


## Testing

```
bower install
tsd update
tsc --noImplicitAny --out build/poseeditor.js src/*
./s.sh
```
Then, access `http://localhost:30000/`!


## Todo
prepare build tool...


## License
Pose Editor is licensed under the MIT License.

--

Files under `ext` directory(TransformControls.js, OrbitControls.js) are copied from examples of [Three.js](https://github.com/mrdoob/three.js).

These files are licensed under the [MIT license](https://raw.githubusercontent.com/mrdoob/three.js/master/LICENSE).
