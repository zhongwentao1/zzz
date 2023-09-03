import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  _id: string;
  cName: String; //创建者
  Counterparties: String; //交易方
  amount: Number; //交易金额
  cDate: String; //创建时间
}
export const columns: BasicColumn<ListData>[] = [
  {
    title: 'id',
    key: '_id',
    width: 100,
  },
  {
    title: '创建人',
    key: 'cName',
    width: 100,
  },
  {
    title: '交易方',
    key: 'Counterparties',
    width: 100,
  },
  {
    title: '交易金额',
    key: 'amount',
    width: 80,
  },
  {
    title: '创建时间',
    key: 'cDate',
    width: 120,
  },
];
