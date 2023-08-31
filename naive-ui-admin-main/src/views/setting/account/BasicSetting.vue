<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="昵称" path="name">
          <n-input v-model:value="formValue.name" placeholder="请输入昵称" />
        </n-form-item>

        <n-form-item label="备注" path="desc">
          <n-input placeholder="请输入邮箱" v-model:value="formValue.desc" />
        </n-form-item>

        <n-form-item label="联系电话" path="mobile">
          <n-input placeholder="请输入联系电话" v-model:value="formValue.mobile" />
        </n-form-item>

        <n-form-item label="联系地址" path="address">
          <n-input v-model:value="formValue.address" type="textarea" placeholder="请输入联系地址" />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">更新基本信息</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { useMessage } from 'naive-ui';
  import { uploadUserInfo } from '@/api/system/user';

  const rules = {
    name: {
      required: true,
      message: '请输入昵称',
      trigger: 'blur',
    },
    desc: {
      // required: true,
      message: '请输入备注',
      trigger: 'blur',
    },
    mobile: {
      // required: true,
      message: '请输入联系电话',
      trigger: 'input',
    },
  };
  const formRef: any = ref(null);
  const message = useMessage();

  const formValue = reactive({
    name: '',
    mobile: '',
    desc: '',
    address: '',
  });

  function formSubmit() {
    formRef.value.validate(async (errors) => {
      if (!errors) {
        let res = await uploadUserInfo(formValue);
        console.log(res);
        message.success('验证成功');
      } else {
        message.error('验证失败，请填写完整信息');
      }
    });
  }
  onMounted(() => {
    //获取用户信息以回显
  });
</script>
