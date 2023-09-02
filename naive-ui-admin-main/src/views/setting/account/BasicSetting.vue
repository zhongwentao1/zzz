<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="昵称" path="username">
          <n-input v-model:value="formValue.username" placeholder="请输入昵称" />
        </n-form-item>

        <n-form-item label="备注" path="desc">
          <n-input placeholder="请输入备注" v-model:value="formValue.desc" />
        </n-form-item>

        <n-form-item label="手机号" path="mobile">
          <n-input placeholder="请输入手机号" v-model:value="formValue.mobile" />
        </n-form-item>

        <n-form-item label="头像" path="avater">
          <BasicUpload
            :action="`${uploadUrl}/v1.0/files`"
            :maxNumber="1"
            :default-upload="false"
            v-model:value="formValue.avatar"
            @change="flieChange"
          />
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
  import { ref, onBeforeMount } from 'vue';
  import { useMessage } from 'naive-ui';
  import { updateUserInfo } from '@/api/system/user';
  import { useGlobSetting } from '@/hooks/setting';
  import { useUser } from '@/store/modules/user';
  const userStore = useUser();
  const globSetting = useGlobSetting();
  const { uploadUrl } = globSetting;

  const rules = {
    username: {
      required: true,
      message: '请输入昵称',
      trigger: 'blur',
    },
    desc: {
      required: true,
      message: '请输入备注--之后会改成权限相关功能',
      trigger: 'blur',
    },
    mobile: {
      validator: (_rule, value: string) => {
        const phoneTest = /^1(3|4|7|5|8)([0-9]{9})/;
        return phoneTest.test(value);
      },
      required: true,
      trigger: ['input', 'blur'],
    },
  };

  const formRef: any = ref(null);
  const message = useMessage();
  type from = {
    username: string;
    mobile: String;
    desc: string;
    avatar: string[];
    file: any;
  };
  const formValue = ref<from>({
    username: '',
    mobile: '',
    desc: '',
    avatar: [],
    file: {},
  });
  //文件改变
  const flieChange = (flie: any, b, c) => {
    console.log(flie, b, c);

    formValue.value.avatar = flie.file.file.url;
    formValue.value.file = flie.file.file; //组件三层嵌套
  };
  function formSubmit() {
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const params = new FormData();
        for (const i in formValue.value) {
          params.append(i, formValue.value[i]);
        }
        console.log(params);
        let res = await updateUserInfo(params);
        console.log(res);
        message.success('验证成功');
      } else {
        message.error('验证失败，请填写完整信息');
      }
    });
  }
  onBeforeMount(() => {
    //获取用户信息以回显
    const { username, desc, avatar, mobile } = userStore.getUserInfo;
    formValue.value = {
      username,
      desc,
      avatar: ['http://localhost:3000' + avatar],
      mobile: mobile.toString(),
      file: {},
    };
    console.log(formValue.value.avatar);
  });
</script>
