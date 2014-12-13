var editor = null;

function downloadImage() {
  if ( editor != null ) {
    var a = document.createElement("a");
    a.download = "poseeditor";
    a.title = "download snapshot";

    var radio = document.getElementsByName("format");
    var format = "";
    for(var i=0; i<radio.length; i++) {
      if (radio[i].checked) {
        format = radio[i].value
        break;
      }
    }
    console.log("format: ", format);

    a.href = editor.toDataUrl(format);
    a.click();

    delete a;
  }
}

function loadSceneDataFromEncodedData(json_string) {
  if ( editor != null ) {
    editor.loadSceneDataFromString(json_string);
  }
}

function generateEmbeddedCode() {
  if ( editor != null ) {
    var s = JSON.stringify(editor.getSceneInfo());

    var id = document.getElementById('ecode_id').value;
    var width = document.getElementById('ecode_width').value;
    var height = document.getElementById('ecode_height').value;

    var code = "";
    code += '<div id="' + id + '" style="width: ' + width + '; height: ' + height + '"></div>';
    code += "\n\n";

    code += "<script type=\"text/javascript\">\n";
    code += "(function (d, s, id) {";
    code += "var scene_json = '" + s + "';";

    code += "var load_scene = (function() {";
    code += "window.poseEditorE.queueScene( id, scene_json );";
    code += "});";
    code += "var script = d.getElementsByTagName(s)[0];";
    code += "var js = d.createElement(s);";
    code += "js.src = 'http://poseeditor.levelop.org/js/e.js';";
    code += "js.onload = load_scene;";
    code += "script.parentNode.insertBefore(js, script);";
    code += "})(document, 'script', '" + id +"');";
    code += "</script>";

    var dom = document.getElementById('ecode');
    dom.value = code;
  }
}

function toggleMarker() {
  if ( editor != null ) {
    editor.toggleMarker();
  }
}

function addModel() {
  if ( editor != null ) {
    editor.appendModel("sport_man", function(model, error) {
      if (error) {
        console.log("error: ", error);
      }
    });
  }
}

function removeModel() {
  if ( editor != null ) {
    editor.removeSelectedModel();
  }
}

function changeBGColorAndAlpha() {
  if ( editor != null ) {
    var color_dom = document.getElementById("bg_color");
    var alpha_dom = document.getElementById("bg_alpha");

    editor.setClearColor(parseInt(color_dom.value, 16), parseFloat(alpha_dom.value));
  }
}

function shareScene() {
  var address = 'http://yutopp.github.io/PoseEditor/';
  if ( editor != null ) {
    var target = address + '#' + encodeURIComponent(JSON.stringify(editor.getSceneInfo()));

    window.open("https://twitter.com/share?url=" + encodeURIComponent(target) + "&text=PoseEditor");
  }
}

function handleSceneFiles(files) {
  if ( files.length != 1 ) {
    return false;
  }
  var file = files[0];

  var reader = new FileReader();
  reader.onload = (function(e) {
                     loadSceneDataFromEncodedData(e.target.result);
                     console.log("Scene loaded.");
                   });
  reader.readAsText(file);

  return true;
}

$(function() {
  var config = new PoseEditor.Config();
  config.enableBackgroundAlpha = true;
  config.backgroundColorHex = 0x777777;
  config.backgroundAlpha = 1.0;
  config.loadingImagePath = "bower_components/poseeditor/images/loading.gif";

  sprite_paths = {
    normal: "bower_components/poseeditor/images/marker.png",
    special: "bower_components/poseeditor/images/square.png"
  };

  model_table = {
    "sport_man": {
      model_path: "bower_components/poseeditor/models/model/model.js",
      texture_dir: "bower_components/poseeditor/models/model/",
      ik_stop_joints: [32, 13, 1, 5, 9, 50, 12, 31, 22, 28, 25, 16, 19, 47, 41, 44, 38, 35]
    }
  };

  editor = new PoseEditor.Editor(
    "for_pose",
    model_table,
    sprite_paths,
    config
  );
  if ( location.hash !== "" ) {
    try {
      var encoded = location.hash.slice(1);
      var json_string = decodeURIComponent(encoded);

      editor.loadSceneDataFromString(json_string);

    } catch(e) {
      console.warn(e);
    }

  } else {
    // default
    editor.appendModel("sport_man");
  }
});