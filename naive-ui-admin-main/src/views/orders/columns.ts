import { BasicColumn } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';
export interface ListData {
  _id: string;
  cName: string; //创建者
  counterparties: string; //交易方
  amount: number; //交易金额
  cDate: number; //创建时间
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
    key: 'counterparties',
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
    render(row) {
      return formatToDateTime(row.cDate);
    },
  },
];
