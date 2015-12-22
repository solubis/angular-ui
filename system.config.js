System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "lib/github/*",
    "npm:*": "lib/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.8",
    "angular-animate": "github:angular/bower-angular-animate@1.4.8",
    "angular-loading-bar": "github:chieffancypants/angular-loading-bar@0.8.0",
    "angular-ui-bootstrap": "npm:angular-ui-bootstrap@0.14.3",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "animate.css": "npm:animate.css@3.4.0",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "bootstrap-growl": "npm:bootstrap-growl@3.1.3",
    "bootstrap-sweetalert": "npm:bootstrap-sweetalert@0.4.2",
    "easy-pie-chart": "github:rendro/easy-pie-chart@2.1.6",
    "jquery": "npm:jquery@2.1.4",
    "malihu-custom-scrollbar-plugin": "npm:malihu-custom-scrollbar-plugin@3.1.3",
    "material-design-iconic-font": "npm:material-design-iconic-font@2.2.0",
    "material-shadows": "github:mrmlnc/material-shadows@2.0.2",
    "ng-scrollbars": "npm:ng-scrollbars@0.0.5",
    "node-waves": "npm:node-waves@0.7.4",
    "typescript": "npm:typescript@1.7.5",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.8"
    },
    "github:angular/bower-angular-animate@1.4.8": {
      "angular": "github:angular/bower-angular@1.4.8"
    },
    "github:chieffancypants/angular-loading-bar@0.8.0": {
      "angular": "github:angular/bower-angular@1.4.8",
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:angular-ui-bootstrap@0.14.3": {
      "angular": "npm:angular@1.4.8"
    },
    "npm:angular@1.4.8": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jquery@2.1.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:malihu-custom-scrollbar-plugin@3.1.3": {
      "jquery-mousewheel": "npm:jquery-mousewheel@3.1.13"
    },
    "npm:ng-scrollbars@0.0.5": {
      "angular": "npm:angular@1.4.8",
      "malihu-custom-scrollbar-plugin": "npm:malihu-custom-scrollbar-plugin@3.1.3"
    },
    "npm:node-waves@0.7.4": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
