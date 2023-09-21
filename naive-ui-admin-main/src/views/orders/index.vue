<template>
  <n-card :bordered="false" class="proCard">
    <!-- <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm> -->

    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row:ListData) => row._id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新增
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>

    <n-modal
      v-model:show="showModal"
      :show-icon="false"
      preset="dialog"
      :title="title == 0 ? '新增' : '编辑'"
    >
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="120"
        class="py-4"
      >
        <n-form-item label="交易方" path="counterparties">
          <n-input placeholder="请输入交易方" v-model:value="formParams.counterparties" />
        </n-form-item>
        <n-form-item label="交易金额" path="amount">
          <n-input-number placeholder="请输入交易金额" v-model:value="formParams.amount" />
        </n-form-item>
        <n-form-item label="交易日期" path="cDate">
          <n-date-picker
            type="datetime"
            placeholder="请选择日期"
            v-model:value="formParams.cDate"
          />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { ordersList, addOrders, updateOrders, delOrders } from '@/api/orders/orders.ts';
  import { columns, ListData } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { type FormRules } from 'naive-ui';
  import { useUser } from '@/store/modules/user';
  const userStore = useUser();
  const userInfo = userStore.getUserInfo;

  const rules: FormRules = {
    counterparties: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入交易方',
    },
    amount: {
      type: 'number',
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入交易金额',
    },
    cDate: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择日期',
    },
  };

  const schemas: FormSchema[] = [
    {
      field: 'name',
      labelMessage: '这是一个提示',
      component: 'NInput',
      label: '姓名',
      componentProps: {
        placeholder: '请输入姓名',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
    },
    {
      field: 'mobile',
      component: 'NInputNumber',
      label: '手机',
      componentProps: {
        placeholder: '请输入手机号码',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'type',
      component: 'NSelect',
      label: '类型',
      componentProps: {
        placeholder: '请选择类型',
        options: [
          {
            label: '舒适性',
            value: 1,
          },
          {
            label: '经济性',
            value: 2,
          },
        ],
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeDate',
      component: 'NDatePicker',
      label: '预约时间',
      defaultValue: 1183135260000,
      componentProps: {
        type: 'date',
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeTime',
      component: 'NTimePicker',
      label: '停留时间',
      componentProps: {
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'status',
      label: '状态',
      //插槽
      slot: 'statusSlot',
    },
    {
      field: 'makeProject',
      component: 'NCheckbox',
      label: '预约项目',
      componentProps: {
        placeholder: '请选择预约项目',
        options: [
          {
            label: '种牙',
            value: 1,
          },
          {
            label: '补牙',
            value: 2,
          },
          {
            label: '根管',
            value: 3,
          },
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeSource',
      component: 'NRadioGroup',
      label: '来源',
      componentProps: {
        options: [
          {
            label: '网上',
            value: 1,
          },
          {
            label: '门店',
            value: 2,
          },
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
  ];

  const formRef: any = ref(null);
  const actionRef = ref();
  const title = ref(0); //0新增 1编辑

  const showModal = ref(false);
  const formBtnLoading = ref(false);
  type formType = {
    cName: string; //创建者
    counterparties: string; //交易方
    amount: number; //交易金额
    cDate: number; //创建时间
  };
  let formParams = reactive<formType>({
    cName: userInfo.username,
    counterparties: '',
    amount: 0,
    cDate: 0,
  });

  const actionColumn = reactive({
    width: 80,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            onClick: handleDelete.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['basic_list'],
          },
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
            ifShow: () => {
              return true;
            },
            auth: ['basic_list'],
          },
        ],
        // dropDownActions: [
        //   {
        //     label: '启用',
        //     key: 'enabled',
        //     // 根据业务控制是否显示: 非enable状态的不显示启用按钮
        //     ifShow: () => {
        //       return true;
        //     },
        //   },
        //   {
        //     label: '禁用',
        //     key: 'disabled',
        //     ifShow: () => {
        //       return true;
        //     },
        //   },
        // ],
        select: (key) => {
          window['$message'].info(`您点击了，${key} 按钮`);
        },
      });
    },
  });

  const [register, { getFieldsValue }] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  function addTable() {
    title.value = 0;
    formParams.cDate = new Date().getTime();
    showModal.value = true;
  }

  const loadDataTable = async (res) => {
    return await ordersList({ ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate(async (errors) => {
      if (!errors) {
        if (title.value === 0) {
          let res = await addOrders(formParams);
          console.log('res', res);
          window['$message'].success('新建成功');
        } else {
          let res = await updateOrders(formParams);
          console.log('res', res);
          window['$message'].success('编辑成功');
        }
        showModal.value = false;
        reloadTable();
      } else {
        window['$message'].error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }

  function handleEdit(record: Recordable) {
    formParams = Object.assign(formParams, record);
    console.log('点击了编辑', record);
    title.value = 1;
    showModal.value = true;
  }

  async function handleDelete(record: Recordable) {
    let result = await delOrders({ _id: record._id });
    result.code === 200 && window['$message'].info(result.msg);
  }
</script>

<style lang="less" scoped></style>
