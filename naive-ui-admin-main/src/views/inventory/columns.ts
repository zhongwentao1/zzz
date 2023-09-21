import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  fig: string;
  suggestion: string;
  _id: string;
  trade: String; //商品名
  Supply: number; //进货价
  quantity: number; //库存
  specification: string; //规格
}
export const columns: BasicColumn<ListData>[] = [
  {
    title: 'id',
    key: '_id',
    width: 100,
  },
  {
    title: '商品名',
    key: 'trade',
    width: 100,
  },
  {
    title: '商品图',
    key: 'fig',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.fig,
      });
    },
  },
  {
    title: '单价',
    key: 'Supply',
    auth: ['basic_list'], // 同时根据权限控制是否显示
    ifShow: (_column) => {
      return true; // 根据业务控制是否显示
    },
    render(row) {
      return row.Supply + '元';
    },
    width: 150,
  },
  {
    title: '建议零售价',
    key: 'suggestion',
    width: 160,
    render(row) {
      return row.suggestion + '元';
    },
  },
  {
    title: '库存',
    key: 'quantity',
    width: 160,
    render(row) {
      return row.quantity + '件';
    },
  },
  {
    title: '规格',
    key: 'specification',
    width: 100,
    render(row) {
      return row.specification + '箱';
    },
  },
];
