/**
 * Created by michao on 16/7/18.
 */
import request from 'superagent';
import url from'url';
import path from'path';
class Base {
  constructor(config) {
    this.service = config.service;
    this.basePath = config.name;
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

  getSimpleList(query = {}) {
    return request
      .get(this.getUrl('simplelist'))
      .query(this.getQuery(query))
      .then(this.parse.bind(this));
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

  removeAll(options) {
    return request
      .post(this.getUrl('batchdelete'))
      .query(this.getQuery())
      .send(options)
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
    return request
      .post(this.getUrl('upload'))
      .query(this.getQuery())
      .send(options)
      .then(this.parse.bind(this));
  }

  parse(data) {
    data = data.body;
    if (data.errcode != 0) {
      throw new Error(data.errmsg);
    }
    return data;
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
}

export default Base;
