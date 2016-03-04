//Created by Sureshkumar Nagarajan.
'use strict';

const logger = require('./logger'),
  Request = require('./request');

/**
 * Constructor sets the options for the module
 * @param {object} options.url: the store url with no protocol or
 * trailing forward slash e.g. wordpressstore (required)
 * @param {object} options.ssl: true/false, is your api on https
 * or http (default: false)
 * @param {object} options.consumerKey: the consumer key generated
 * in the WC control panel (required)
 * @param {object} options.secret: the secret generated in the WC
 * control panel (required)
 * @param {object} options.apiPath: the path of the api (default: /wc-api/v2)
 * @param {object} options.logLevel: 0: error only, 1: error & info
 * @param {object} options.permalink: 1: active, 0: inactive (default: 1)
 */

class NPMWooCommerceAPI {
  constructor(options) {
    this.options = options || {};

    if (!this.options.consumerKey || !this.options.secret) {
      throw new Error('The consumer key and secret are required');
    }

    if (!this.options.url) {
      throw new Error('The URL is required');
    }
	
	this.options.fallbackURL = '?wc-api-version=2&wc-api-route=';

    // Set defaults
    this.options.logLevel = this.options.logLevel || 0;	
	this.options.permalink = this.options.permalink || 1;
		
	if(this.options.permalink) {
		this.options.apiPath = this.options.apiPath || '/wc-api/v2';		
	} else {
		this.options.apiPath = this.options.apiPath || this.options.fallbackURL;
	}

    // Automatically set ssl when not set
    this.options.ssl = this.options.ssl || /https/.test(options.url);

    logger.logLevel = this.options.logLevel;

    // Set request object
    this.request = new Request({
      hostname: this.options.url,
      ssl: this.options.ssl,
      port: this.options.port,
      consumerKey: this.options.consumerKey,
      secret: this.options.secret,
      logLevel: this.options.logLevel,
	  permalink: this.options.permalink
    });

    logger.info(require('util').inspect(this.options));
  }

  fullPath(path) {
    return this.options.apiPath + path;
  }

  get(path, cb) {
    return this.request.complete('get', this.fullPath(path), null, cb);
  }

  post(path, data, cb) {
    return this.request.complete('post', this.fullPath(path), data, cb);
  }

  delete(path, cb) {
    return this.request.complete('delete', this.fullPath(path), null, cb);
  }

  put(path, data, cb) {
    return this.request.complete('put', this.fullPath(path), data, cb);
  }
}


module.exports = NPMWooCommerceAPI;
