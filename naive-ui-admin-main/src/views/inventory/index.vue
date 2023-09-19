<template>
  <n-card :bordered="false" class="proCard">
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
        :label-width="100"
        class="py-4"
      >
        <n-form-item label="商品名" path="trade">
          <n-input placeholder="请输入名称" v-model:value="formParams.trade" />
        </n-form-item>
        <n-form-item label="商品图" path="fig">
          <n-input placeholder="请选择商品图" v-model:value="formParams.fig" />
        </n-form-item>
        <n-form-item label="规格" path="specification">
          <n-input placeholder="请输入规格" v-model:value="formParams.specification" />
        </n-form-item>
        <n-form-item label="进货价" path="Supply">
          <n-input-number :min="0" v-model:value="formParams.Supply" placeholder="请输入进货价" />
        </n-form-item>
        <n-form-item label="建议零售价" path="suggestion">
          <n-input-number
            :min="0"
            placeholder="请输入建议零售价"
            v-model:value="formParams.suggestion"
          />
        </n-form-item>
        <n-form-item label="库存" path="quantity">
          <n-input-number :min="0" placeholder="请选择库存" v-model:value="formParams.quantity" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="closeModel">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import {
    inventoryList,
    addInventory,
    getInventory,
    delInventory,
    updateInventory,
  } from '@/api/inventory/inventory.ts';
  import { columns, ListData } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { type FormRules } from 'naive-ui';

  const rules: FormRules = {
    trade: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入商品名',
    },
    // fig: {
    //   required: true,
    //   trigger: ['blur', 'input'],
    //   message: '请选择商品名',
    // },
    Supply: {
      type: 'number',
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入进货价',
    },
    suggestion: {
      type: 'number',
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入建议零售价',
    },
    quantity: {
      type: 'number',
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入库存',
    },
    // specification: {
    //   required: true,
    //   trigger: ['blur', 'input'],
    //   message: '请输入规格',
    // },
  };
  const formRef: any = ref(null);
  const actionRef = ref();
  const title = ref(0); //0新增 1编辑
  const showModal = ref(false);
  const formBtnLoading = ref(false);
  type formTpye = {
    trade: string; //商品名
    fig: string; //商品图片
    Supply: number; //进货价
    suggestion: number; //建议零售价
    quantity: number; //库存
    specification: string; //规格
    cTime: number; //创建时间
    _id?: number;
  };
  let formParams = reactive<formTpye>({
    trade: '',
    fig: '',
    Supply: 0,
    suggestion: 0,
    quantity: 0,
    specification: '18*24',
    cTime: 0,
  });

  const actionColumn = reactive({
    width: 120,
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
  //重置表单
  function reset() {
    formParams.trade = '';
    formParams.fig = '';
    formParams.Supply = 0;
    formParams.suggestion = 0;
    formParams.quantity = 0;
    formParams.specification = '18*24';
    formParams.cTime = 0;
  }
  function addTable() {
    title.value = 0;
    showModal.value = true;
  }
  const loadDataTable = async (res) => {
    return await inventoryList({ ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }
  function closeModel() {
    showModal.value = false;
    reset();
  }
  //编辑 新增
  function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate(async (errors) => {
      if (!errors) {
        let res = await getInventory({ trade: formParams.trade });
        //更新时 商品名存在 并且更新商品名 是 查询到的商品名 才允许更改
        if (title.value === 1 && res.code === 200 && res.msg[0]._id === formParams._id) {
          let result = await updateInventory(formParams);
          window['$message'].success(result.msg);
          if (result.code === 200) {
            reloadTable();
            showModal.value = false;
          }
        } else if (title.value === 0 && res.code === -1) {
          formParams.cTime = new Date().getTime();
          let result = await addInventory(formParams);
          result.code === 200 && window['$message'].success(result.msg);
          reloadTable();
          showModal.value = false;
          reset();
        } else {
          window['$message'].info('商品已存在,请确认商品名');
        }
      } else {
        window['$message'].error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }

  function handleEdit(record: formTpye) {
    formParams = Object.assign(formParams, record);
    title.value = 1;
    showModal.value = true;
  }

  async function handleDelete(record: Recordable) {
    let params = {
      _id: record._id,
    };
    let result = await delInventory(params);
    window['$message'].info(result.msg);
    result.code === 200 && reloadTable();
  }
</script>

<style lang="less" scoped></style>
