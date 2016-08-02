/**
 * Created by michao on 16/7/18.
 */
import request from 'superagent';
import url from'url';
import path from'path';
import fs from 'fs';
import Service from './service';
import _ from 'lodash';
class Base {
  constructor(config) {
    this.service = config.service;
    this.basePath = config.basePath;
  }

  getUrl(pathName) {
    var urlObj = url.format({
      'protocol': 'https',
      'host': 'oapi.dingtalk.com',
      'pathname': path.join(this.basePath, pathName)
    });
    return urlObj;
  }

  getQuery(query = {}) {
    Object.assign(query, {'access_token': this.service.getAccessToken()});
    return query;
  }

  getList(query = {}) {
    return request
      .get(this.getUrl('list'))
      .query(this.getQuery(query))
      .then(this.parse.bind(this));
  }

  getDetail(query) {
    return request
      .get(this.getUrl('get'))
      .query(this.getQuery(query))
      .then(this.parse.bind(this));
  }

  create(options) {
    return request
      .post(this.getUrl('create'))
      .query(this.getQuery())
      .send(options)
      .then(this.parse.bind(this));
  }

  update(options) {
    return request
      .post(this.getUrl('update'))
      .query(this.getQuery())
      .send(options)
      .then(this.parse.bind(this));
  }

  remove(query) {
    return request
      .get(this.getUrl('delete'))
      .query(this.getQuery(query))
      .then(this.parse.bind(this));
  }

  send(options) {
    return request
      .post(this.getUrl('send'))
      .query(this.getQuery())
      .send(options)
      .then(this.parse.bind(this));
  }

  upload(options) {
    let {header, query, buffer} = options;
    return request
      .post(this.getUrl('upload'))
      .type('form')
      .set(header)
      .query(this.getQuery(query))
      .send(buffer)
      .then(this.parse.bind(this));
  }

  download(query) {
    return request
      .get(this.getUrl('get'))
      .query(this.getQuery(query))
      .then(this.parse.bind(this));
  }

  parse(data) {
    var result = data.body;
    if (result.errcode == undefined) {
      return data;
    }
    if (result.errcode) {
      throw new Error(result.errmsg);
    }
    return result;
  }

  assemble(data, errmsg = null) {
    if (!errmsg) {
      Object.assign(data, {errcode: 0}, {errmsg: 'ok'});
    }
    else {
      Object.assign({errcode: -1}, {errmsg});
    }
    return data;
  }

  fromMedia(options) {
    let {filepath} = options;
    return new Promise((resolve, reject)=> {
      fs.readFile(filepath, function (err, fileBuffer) {
        if (err) {
          return reject(err);
        }
        return resolve(_(options).assign({fileBuffer}).value());
      });
    });
  }

  buildFormData(options) {
    let {fileBuffer, filepath, partition = {}} = options;
    var mime = {
      '.jpg': 'image',
      '.png': 'image',
      '.amr': 'voice'
    };
    var boundary = Service.getNonceSecurityString();
    var contentType = `multipart/form-data; boundary=${boundary}`;
    var contentDisposition = `form-data;name=\"media\";filename=\"${path.basename(filepath)}\"`;
    var header = `--${boundary}\r\nContent-Disposition:${contentDisposition}\r\nContent-Type:multipart/form-data;boundary=----${boundary}\r\n\r\n`;
    var headerBuffer = new Buffer(header, 'utf8');
    var endBuffer = new Buffer(`\r\n--${boundary}--\r\n`, 'utf8');
    var buffer = Buffer.concat([headerBuffer, fileBuffer, endBuffer]);
    return _(options).assign({
      query: {type: _.has(mime, path.extname(filepath)) ? mime[path.extname(filepath)] : 'file', 'media': header},
      header: Object.assign({'Content-Type': contentType}, partition),
      buffer
    }).value();
  }
}

export default Base;
