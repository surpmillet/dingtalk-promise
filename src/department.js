/**
 * Created by michao on 16/7/19.
 */
import Base from './base';
class Department extends Base {
  getId(options) {
    if (options && options.name) {
      return this.getList()
        .then((data)=> {
          return this.assemble({
            id: data.department.filter((item)=> {
              return item.name == options.name;
            })[0].id
          });
        });
    }
    else {
      return this.assemble(null, '部门名称不能为空');
    }
  }

  getBranches(options) {
    if (options && options.id) {
      return this.getList()
        .then((data)=> {
          return this.assemble({
            department: data.department.filter((item)=> {
              return item.parentid = options.id;
            })
          })
        })
    }
  }
}
export default Department;
