import Vue from 'vue';
import {
  Aside,
  Button,
  Card,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Header,
  Input,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  MessageBox,
  Submenu,
  Table,
  TableColumn,
} from 'element-ui';

Vue.use(Aside);
Vue.use(Button);
Vue.use(Card);
Vue.use(Container);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Header);
Vue.use(Input);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Table);
Vue.use(TableColumn);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;