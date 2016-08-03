/**
 * Created by michao on 16/7/19.
 */
import Base from './base';
import request from 'superagent';
import _ from 'lodash';
import Promise from 'bluebird';

class User extends Base {
  getSimpleList(query = {}) {
    return request
      .get(this.getUrl('simplelist'))
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

  getHandler(id) {
    return this.getSimpleList({department_id: id})
      .then((data)=> {
        return data.userlist.filter((user)=> {
          return user.name == name;
        })[0];
      })
      .then(this.getDetail({userid: data.userid}).bind(this))
  }

  getDetail(query) {
    let {name, userid} = query;
    if (userid) {
      return super.getDetail({userid});
    }
    if (name) {
      let dept = this.service.createDepartment();
      return Promise.resolve()
        .then(dept.getList.bind(dept))
        .then((data)=> {
          return Promise.reduce(data.department, (total, item)=> {
            return this.getList({department_id: item.id}).then((data)=> {
              return _.concat(total, data.userlist.filter((user)=> {
                if (user.name == name) {
                  return true;
                }
              }));
            });
          }, []).then((data)=> {
            return this.assemble(_.uniqBy(data, 'userid'));
          })
        });
    }
  }
}
export default User;
