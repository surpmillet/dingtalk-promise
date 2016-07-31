/**
 * Created by michao on 16/7/19.
 */
import Base from './base';
class Department extends Base {
}
// create options
// {
//   "name": "钉钉事业部", // 部门名称。长度限制为1~64个字符
//   "parentid": "1", // 父部门id。根部门id为1
//   "order": "1", // 在父部门中的次序值。order值小的排序靠前
//   "createDeptGroup": true, // 是否创建一个关联此部门的企业群，默认为false
// }

// update options
// {
//   "name": "钉钉事业部",
//   "parentid": "1",
//   "order": "1",
//   "id": "1",
//   "createDeptGroup": true,
//   "autoAddUser": true, // 如果有新人加入部门是否会自动加入部门群
//   "deptManagerUseridList": "manager1111|2222", // 部门的主管列表,取值为由主管的userid组成的字符串，不同的userid使用’| 符号进行分割
//   "deptHiding" : true,
//   "deptPerimits" : "3|4", // 可以查看指定隐藏部门的其他部门列表，如果部门隐藏，则此值生效，取值为其他的部门id组成的的字符串，使用 | 符号进行分割
//   "userPerimits" : "userid1|userid2", // 可以查看指定隐藏部门的其他人员列表，如果部门隐藏，则此值生效，取值为其他的人员userid组成的的字符串，使用| 符号进行分割
//   "outerDept" : true, // 是否本部门的员工仅可见员工自己, 为true时，本部门员工默认只能看到员工自己
//   "outerPermitDepts" : "1|2", // 本部门的员工仅可见员工自己为true时，可以配置额外可见部门，值为部门id组成的的字符串，使用|符号进行分割
//   "outerPermitUsers" : "userid3|userid4", // 本部门的员工仅可见员工自己为true时，可以配置额外可见人员，值为userid组成的的字符串，使用|符号进行分割
//   "orgDeptOwner": "manager1111" // 企业群群主
// }
export default Department;
