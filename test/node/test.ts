import * as requirejs from "requirejs";

requirejs.config({
	baseUrl: "../common",

	paths: {
		"jquery": "../common/jquery",
		"underscore": "../common/underscore",
		"backbone": "../common/backbone"
	},

	shim: {
		jquery: {
			exports: "$"
		},

		underscore: {
			exports: "_"
		},

		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

requirejs(["main"], (main: any) => {
	const app = main.AppMain();
	app.run();
});

const recOne = requirejs.config({ baseUrl: "js" });
recOne(["core"], (core: any) => {
    return core.someCode();
});

const config: requirejs.BuildConfig = {
    baseUrl: "../common",
    
	paths: {
		"jquery": "../common/jquery",
		"underscore": "../common/underscore",
		"backbone": "../common/backbone"
	},

	shim: {
		jquery: {
			exports: "$"
		},

		underscore: {
			exports: "_"
		},

		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	},
    
    include: ["main"],
    insertRequire: ["main"],
    
    out: "../out.js"
};

requirejs.optimize(config, (buildReponse) => {
    console.log(buildReponse);
});
