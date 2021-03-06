// Type definitions for RequireJS 2.2.0
// Project: http://requirejs.org/
// Definitions by: Josh Baldwin <https://github.com/jbaldwin/>,
//                 Maxime LUCE <Josh Baldwin <https://github.com/SomaticIT/>
// Definitions: https://github.com/typed-contrib/require

/**
* CommonJS require call
* @param module - Module to load
* @return The loaded module
*/
declare function requirejs<T>(module: string): T;
/**
* CommonJS require call
* @param module - Module to load
* @return The loaded module
*/
declare function requirejs(module: string): any;

/**
* Loads specified modules.
* @param modules - Required modules to load.
**/
declare function requirejs(modules: string[]): void;
/**
* Loads specified modules.
* @param modules - Required modules to load.
* @param callback - Called when required modules are ready.
**/
declare function requirejs(modules: string[], callback: (...modules: any[]) => void): void;
/**
* Loads specified modules.
* @param modules - Required modules to load.
* @param callback - Called when required modules are ready.
* @param errback - Called when an error occuredy.
**/
declare function requirejs(modules: string[], callback: (...modules: any[]) => void, errback: (err: requirejs.RequireError) => void): void;

/** requirejs module. */
declare module requirejs {
    /**
	* Configure require.js
	* @param config - Require.js configuration
	**/
    export function config(config: Config): typeof requirejs;

    /**
	* Generate URLs from require module
	* @param module - Module to URL
	* @return URL string
	**/
	export function toUrl(module: string): string;

	/**
	* Returns true if the module has already been loaded and defined.
	* @param module Module to check
	**/
	export function defined(module: string): boolean;

	/**
	* Returns true if the module has already been requested or is in
    * the process of loading and should be available at some point.
	* @param module Module to check
	**/
	export function specified(module: string): boolean;

	/**
	* On Error override
	* @param err - Require.js specific Error.
	**/
	export function onError(err: RequireError, errback?: (err: RequireError) => void): void;

	/**
	* Undefine a module
	* @param module - Module to undefine.
	**/
	export function undef(module: string): void;

	/**
	* Semi-private function, overload in special instance of undef()
	**/
	export function onResourceLoad(context: Object, map: DependencyMap, depArray: DependencyMap[]): void;
    
    
    /** Internal Dictionary utility type. */
    export type Dictionary<T> = { [key: string]: T };
    
    /** Internal Shim utility type (used in Config). */
    export type Shim = ShimConfig | string[];
    /** Internal Path utility type (used in Config). */
    export type Path = string | string[];
    /** Internal Package utility type (used in Config). */
    export type Package = string | PackageConfig;
    
    /** Virtual module used for commonjs-style packages. */
    export interface Module {
        config(): any;
        id: string;
        uri: string;
    }
    
    /** Error throwed when require.js failed to load a module. */
    export interface RequireError extends Error {
        /** The error ID that maps to an ID on a web page. **/
        requireType: string;

        /** Required modules. **/
        requireModules: string[];

        /** The original error, if there is one (might be null). **/
        originalError: Error;
    }
    
    /** Shim configuration options. */
    export interface ShimConfig {
        /** List of dependencies. **/
        deps?: string[];

        /** Name the module will be exported as. **/
        exports?: string;

        /**
        * Initialize function with all dependcies passed in,
        * if the function returns a value then that value is used
        * as the module export value instead of the object
        * found via the 'exports' string.
        * @param dependencies - The loaded dependencies
        * @return The exported module
        **/
        init?: (...dependencies: any[]) => any;
    }
    
    /** Package configuration options. */
    export interface PackageConfig {
        /** Name of the package. */
        name: string;

        /** Name of the main module. */
        main: string;
    }
    
    /** Require.js configuration options (used in requirejs.config()). */
    export interface Config {
        /** The root path to use for all module lookups. */ 
        baseUrl?: string;

        /** Path mappings for module names not found directly under baseUrl. */
        paths?: Dictionary<Path>;

        /**
        * Allows pointing multiple module IDs to a module ID that contains a bundle of modules.
        *
        * @example
        * requirejs.config({
        *	bundles: {
        *		'primary': ['main', 'util', 'text', 'text!template.html'],
        *		'secondary': ['text!secondary.html']
        *	}
        * });
        **/
        bundles?: Dictionary<string[]>;

        /**
        * Configure the dependencies, exports, and custom initialization for older, traditional 
        * "browser globals" scripts that do not use define() to declare the dependencies and set 
        * a module value.
        *
        * @example
        * requirejs.config({
        *   shim: {
        *       'backbone': {
        *           deps: ['underscore', 'jquery'],
        *           exports: 'Backbone'
        *       },
        *       'underscore': {
        *           exports: '_'
        *       },
        *       'foo': {
        *       deps: ['bar'],
        *           exports: 'Foo',
        *           init: function (bar) {
        *               return this.Foo.noConflict();
        *           }
        *       }
        *   }
        * });
        **/
        shim?: Dictionary<Shim>;

        /**
        * For the given module prefix, instead of loading the
        * module with the given ID, substitude a different
        * module ID.
        *
        * @example
        * requirejs.config({
        *	map: {
        *		'some/newmodule': {
        *			'foo': 'foo1.2'
        *		},
        *		'some/oldmodule': {
        *			'foo': 'foo1.0'
        *		}
        *	}
        * });
        **/
        map?: Dictionary<Dictionary<string>>;

        /**
        * AMD configurations, use module.config() to access in
        * define() functions
        **/
        config?: Dictionary<Dictionary<any>>;

        /**
        * Configures loading modules from CommonJS packages.
        **/
        packages?: Package[];
        
        /**
        * Node treats module ID example.js and example the same. 
        * By default these are two different IDs in RequireJS. 
        * If you end up using modules installed from npm, then you may 
        * need to set this config value to true to avoid resolution issues.
        **/
        nodeIdCompat?: Package[];

        /**
        * The number of seconds to wait before giving up on loading
        * a script.  The default is 7 seconds.
        **/
        waitSeconds?: number;

        /**
        * A name to give to a loading context.  This allows require.js
        * to load multiple versions of modules in a page, as long as
        * each top-level require call specifies a unique context string.
        **/
        context?: string;

        /**
        * An array of dependencies to load.
        **/
        deps?: string[];

        /**
        * A function to pass to require that should be require after
        * deps have been loaded.
        * @param modules
        **/
        callback?: (...modules: any[]) => void;

        /**
        * If set to true, an error will be thrown if a script loads
        * that does not call define() or have shim exports string
        * value that can be checked.
        **/
        enforceDefine?: boolean;

        /**
        * If set to true, document.createElementNS() will be used
        * to create script elements.
        **/
        xhtml?: boolean;

        /**
        * Extra query string arguments appended to URLs that RequireJS
        * uses to fetch resources.  Most useful to cache bust when
        * the browser or server is not configured correctly.
        *
        * @example
        * urlArgs: "bust= + (new Date()).getTime()
        * 
        * @example
        * requirejs.config({
        *   urlArgs: function(id, url) {
        *       var args = 'v=1';
        *       if (url.indexOf('view.html') !== -1) {
        *           args = 'v=2';
        *       }
        *
        *       return (url.indexOf('?') === -1 ? '?' : '&') + args;
        *   }
        * });
        **/
        urlArgs?: string | ((id: string, url: string) => string);

        /**
        * Specify the value for the type="" attribute used for script
        * tags inserted into the document by RequireJS.  Default is
        * "text/javascript".  To use Firefox's JavasScript 1.8
        * features, use "text/javascript;version=1.8".
        **/
        scriptType?: string;

        /**
        * If set to true, skips the data-main attribute scanning done
        * to start module loading. Useful if RequireJS is embedded in
        * a utility library that may interact with other RequireJS
        * library on the page, and the embedded version should not do
        * data-main loading.
        **/
        skipDataMain?: boolean;

        /**
        * Allow extending requirejs to support Subresource Integrity
        * (SRI).
        **/
        onNodeCreated?: (node: HTMLScriptElement, config: Config, moduleName: string, url: string) => void;
        
        /**
        * If configured – fires immediately before adding the nodes
        * to the DOM. It's very similar to the `onNodeCreated` that
        * already exists, but fires after all other attributes have
        * been added to the node.
        **/
        onBeforeNodeInserted?: (node: HTMLScriptElement, config: Config, moduleName: string, url: string) => void;
    }
    
    /** Semi-private type. Describe dependency map. (Used in requirejs.onResourceLoad() hook) */
    export interface DependencyMap {
        /**
        *
        **/
        prefix: string;

        /**
        *
        **/
        name: string;

        /**
        *
        **/
        parentMap: DependencyMap;

        /**
        *
        **/
        url: string;

        /**
        *
        **/
        originalName: string;

        /**
        *
        **/
        fullName: string;
    }
}

/**
* Define Simple Name/Value Pairs
* @param obj - Dictionary of Named/Value pairs for the config.
**/
declare function define(obj: requirejs.Dictionary<any>): void;

/**
* Define module with simplified CommonJS wrapper.
* @param definition - The module's definition function.
**/
declare function define<T>(definition: define.CommonJSDefinition<T>): void;
/**
* Define module with simplified CommonJS wrapper.
* @param definition - The module's definition function.
**/
declare function define(definition: define.CommonJSDefinition<any>): void;

/**
* Define module without dependencies.
* @param definition - The module's definition function.
**/
declare function define<T>(definition: () => T): void;
/**
* Define module without dependencies.
* @param definition - The module's definition function.
**/
declare function define(definition: () => any): void;

/**
* Define module with dependencies.
* @param deps - List of module's dependencies.
* @param definition - The module's definition function.
**/
declare function define<T>(deps: string[], definition: define.SimpleDefinition<T>): void;
/**
* Define module with dependencies.
* @param deps - List of module's dependencies.
* @param definition - The module's definition function.
**/
declare function define(deps: string[], definition: define.SimpleDefinition<any>): void;

/**
* Define a named module without dependencies.
* @param name - The module's name.
* @param definition - The module's definition function.
**/
declare function define<T>(name: string, definition: define.SimpleDefinition<T>): void;
/**
* Define a named module without dependencies.
* @param name - The module's name.
* @param definition - The module's definition function.
**/
declare function define(name: string, definition: define.SimpleDefinition<any>): void;

/**
* Define a named module with dependencies.
* @param name - The module's name.
* @param deps - List of module's dependencies.
* @param definition - The module's definition function.
**/
declare function define<T>(name: string, deps: string[], definition: define.SimpleDefinition<T>): void;
/**
* Define a named module with dependencies.
* @param name - The module's name.
* @param deps - List of module's dependencies.
* @param definition - The module's definition function.
**/
declare function define(name: string, deps: string[], definition: define.SimpleDefinition<any>): void;


declare module define {
	/**
	* Used to allow a clear indicator that a global define function (as needed for script src browser loading) conforms
	* to the AMD API, any global define function SHOULD have a property called "amd" whose value is an object.
	* This helps avoid conflict with any other existing JavaScript code that could have defined a define() function
	* that does not conform to the AMD API.
	* define.amd.jQuery is specific to jQuery and indicates that the loader is able to account for multiple version
	* of jQuery being loaded simultaneously.
	*/
	export const amd: any;
    
    export type SimpleDefinition<T> = (...modules: any[]) => T;
    export type CommonJSDefinition<T> = (require: typeof requirejs, exports: T, module: requirejs.Module) => T;
}

declare module "require" {
	const req: typeof requirejs;
	export = req;
}

declare module "exports" {
	const exp: any;
	export = exp;
}

declare module "module" {
	const mod: requirejs.Module
	export = mod;
}

declare const require: typeof requirejs;