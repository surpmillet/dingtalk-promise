'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by michao on 16/7/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Department = function (_Base) {
  _inherits(Department, _Base);

  function Department() {
    _classCallCheck(this, Department);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Department).apply(this, arguments));
  }

  return Department;
}(_base2.default);
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


exports.default = Department;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlcGFydG1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7K2VBSEE7Ozs7O0lBSU0sVTs7Ozs7Ozs7Ozs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7a0JBQ2UsVSIsImZpbGUiOiJkZXBhcnRtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzE5LlxuICovXG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuY2xhc3MgRGVwYXJ0bWVudCBleHRlbmRzIEJhc2Uge1xufVxuLy8gY3JlYXRlIG9wdGlvbnNcbi8vIHtcbi8vICAgXCJuYW1lXCI6IFwi6ZKJ6ZKJ5LqL5Lia6YOoXCIsIC8vIOmDqOmXqOWQjeensOOAgumVv+W6pumZkOWItuS4ujF+NjTkuKrlrZfnrKZcbi8vICAgXCJwYXJlbnRpZFwiOiBcIjFcIiwgLy8g54i26YOo6ZeoaWTjgILmoLnpg6jpl6hpZOS4ujFcbi8vICAgXCJvcmRlclwiOiBcIjFcIiwgLy8g5Zyo54i26YOo6Zeo5Lit55qE5qyh5bqP5YC844CCb3JkZXLlgLzlsI/nmoTmjpLluo/pnaDliY1cbi8vICAgXCJjcmVhdGVEZXB0R3JvdXBcIjogdHJ1ZSwgLy8g5piv5ZCm5Yib5bu65LiA5Liq5YWz6IGU5q2k6YOo6Zeo55qE5LyB5Lia576k77yM6buY6K6k5Li6ZmFsc2Vcbi8vIH1cblxuLy8gdXBkYXRlIG9wdGlvbnNcbi8vIHtcbi8vICAgXCJuYW1lXCI6IFwi6ZKJ6ZKJ5LqL5Lia6YOoXCIsXG4vLyAgIFwicGFyZW50aWRcIjogXCIxXCIsXG4vLyAgIFwib3JkZXJcIjogXCIxXCIsXG4vLyAgIFwiaWRcIjogXCIxXCIsXG4vLyAgIFwiY3JlYXRlRGVwdEdyb3VwXCI6IHRydWUsXG4vLyAgIFwiYXV0b0FkZFVzZXJcIjogdHJ1ZSwgLy8g5aaC5p6c5pyJ5paw5Lq65Yqg5YWl6YOo6Zeo5piv5ZCm5Lya6Ieq5Yqo5Yqg5YWl6YOo6Zeo576kXG4vLyAgIFwiZGVwdE1hbmFnZXJVc2VyaWRMaXN0XCI6IFwibWFuYWdlcjExMTF8MjIyMlwiLCAvLyDpg6jpl6jnmoTkuLvnrqHliJfooags5Y+W5YC85Li655Sx5Li7566h55qEdXNlcmlk57uE5oiQ55qE5a2X56ym5Liy77yM5LiN5ZCM55qEdXNlcmlk5L2/55So4oCZfCDnrKblj7fov5vooYzliIblibJcbi8vICAgXCJkZXB0SGlkaW5nXCIgOiB0cnVlLFxuLy8gICBcImRlcHRQZXJpbWl0c1wiIDogXCIzfDRcIiwgLy8g5Y+v5Lul5p+l55yL5oyH5a6a6ZqQ6JeP6YOo6Zeo55qE5YW25LuW6YOo6Zeo5YiX6KGo77yM5aaC5p6c6YOo6Zeo6ZqQ6JeP77yM5YiZ5q2k5YC855Sf5pWI77yM5Y+W5YC85Li65YW25LuW55qE6YOo6ZeoaWTnu4TmiJDnmoTnmoTlrZfnrKbkuLLvvIzkvb/nlKggfCDnrKblj7fov5vooYzliIblibJcbi8vICAgXCJ1c2VyUGVyaW1pdHNcIiA6IFwidXNlcmlkMXx1c2VyaWQyXCIsIC8vIOWPr+S7peafpeeci+aMh+WumumakOiXj+mDqOmXqOeahOWFtuS7luS6uuWRmOWIl+ihqO+8jOWmguaenOmDqOmXqOmakOiXj++8jOWImeatpOWAvOeUn+aViO+8jOWPluWAvOS4uuWFtuS7lueahOS6uuWRmHVzZXJpZOe7hOaIkOeahOeahOWtl+espuS4su+8jOS9v+eUqHwg56ym5Y+36L+b6KGM5YiG5YmyXG4vLyAgIFwib3V0ZXJEZXB0XCIgOiB0cnVlLCAvLyDmmK/lkKbmnKzpg6jpl6jnmoTlkZjlt6Xku4Xlj6/op4HlkZjlt6Xoh6rlt7EsIOS4unRydWXml7bvvIzmnKzpg6jpl6jlkZjlt6Xpu5jorqTlj6rog73nnIvliLDlkZjlt6Xoh6rlt7Fcbi8vICAgXCJvdXRlclBlcm1pdERlcHRzXCIgOiBcIjF8MlwiLCAvLyDmnKzpg6jpl6jnmoTlkZjlt6Xku4Xlj6/op4HlkZjlt6Xoh6rlt7HkuLp0cnVl5pe277yM5Y+v5Lul6YWN572u6aKd5aSW5Y+v6KeB6YOo6Zeo77yM5YC85Li66YOo6ZeoaWTnu4TmiJDnmoTnmoTlrZfnrKbkuLLvvIzkvb/nlKh856ym5Y+36L+b6KGM5YiG5YmyXG4vLyAgIFwib3V0ZXJQZXJtaXRVc2Vyc1wiIDogXCJ1c2VyaWQzfHVzZXJpZDRcIiwgLy8g5pys6YOo6Zeo55qE5ZGY5bel5LuF5Y+v6KeB5ZGY5bel6Ieq5bex5Li6dHJ1ZeaXtu+8jOWPr+S7pemFjee9rumineWkluWPr+ingeS6uuWRmO+8jOWAvOS4unVzZXJpZOe7hOaIkOeahOeahOWtl+espuS4su+8jOS9v+eUqHznrKblj7fov5vooYzliIblibJcbi8vICAgXCJvcmdEZXB0T3duZXJcIjogXCJtYW5hZ2VyMTExMVwiIC8vIOS8geS4mue+pOe+pOS4u1xuLy8gfVxuZXhwb3J0IGRlZmF1bHQgRGVwYXJ0bWVudDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
