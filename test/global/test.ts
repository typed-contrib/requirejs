require.config({
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

require(["main"], (main: any) => {
	const app = main.AppMain();
	app.run();
});

const recOne = require.config({ baseUrl: "js" });
recOne(["core"], (core: any) => {
    return core.someCode();
});

// Tests for "module", "exports" and "require" magic module typings
import * as module from "module";
import * as exp from "exports";
import * as req from "require";

const moduleConfig: any = module.config();
const moduleId: string = module.id;
const moduleUri: string = module.uri;

exp.test = "test";
exp.num = 55;

const mod = req("core");
