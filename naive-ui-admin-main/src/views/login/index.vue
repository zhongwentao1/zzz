<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <!-- 登录页和首页logo -->
          <img :src="websiteConfig.loginImage" alt="" />
        </div>
        <!-- 登录页logo下详细信息 -->
        <div class="view-account-top-desc">{{ websiteConfig.loginDesc }}</div>
      </div>
      <!-- 登录表单 -->
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              showPasswordOn="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
              </div>
              <div class="flex-initial">
                <a href="javascript:">忘记密码</a>
              </div>
              <div class="flex-initial order-last" style="margin-left: 20px">
                <n-button text @click="showModal">注册账号</n-button>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              登录
            </n-button>
          </n-form-item>
          <!-- <n-form-item class="default-color">
            <div class="flex view-account-other">
              <div class="flex-initial">
                <span>其它登录方式</span>
              </div>
              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <LogoGithub />
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <LogoFacebook />
                  </n-icon>
                </a>
              </div>

            </div>
          </n-form-item> -->
        </n-form>
        <basicModal @register="modalRegister" ref="modalRef" class="basicModal" @on-ok="okModal">
          <template #default>
            <n-form ref="cRef" label-placement="left" size="large" :model="cUser" :rules="rules">
              <n-form-item path="username" label="用户名" label-width="80">
                <n-input v-model:value="cUser.username" placeholder="请输入用户名" label-width="80">
                  <template #prefix>
                    <n-icon size="18" color="#808695">
                      <PersonOutline />
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password" label="密码 " label-width="80">
                <n-input
                  v-model:value="cUser.password"
                  type="password"
                  showPasswordOn="click"
                  placeholder="请输入密码"
                >
                  <template #prefix>
                    <n-icon size="18" color="#808695">
                      <LockClosedOutline />
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="mobile" label="手机号" label-width="80">
                <n-input v-model:value="cUser.mobile" type="text" placeholder="请输入手机号">
                  <template #prefix>
                    <n-icon size="18" color="#808695">
                      <LockClosedOutline />
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="desc" label="备注" label-width="80">
                <n-input v-model:value="cUser.desc" type="text">
                  <template #prefix>
                    <n-icon size="18" color="#808695">
                      <LockClosedOutline />
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="avatar" label="头像" label-width="80">
                <BasicUpload
                  :action="`${uploadUrl}/v1.0/files`"
                  :maxNumber="1"
                  :default-upload="false"
                  v-model:value="cUser.avatar"
                  @change="flieChange"
                />
              </n-form-item>
            </n-form>
          </template>
        </basicModal>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'; //LogoGithub, LogoFacebook其他登录方式 暂时不需要
  import { PageEnum } from '@/enums/pageEnum';
  import { websiteConfig } from '@/config/website.config';
  import { isEnroll, createUser } from '@/api/system/user';
  import { useGlobSetting } from '@/hooks/setting';
  import { basicModal, useModal } from '@/components/Modal';
  const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
    title: '用户注册',
  });
  async function okModal() {
    onPositiveClick();
  }
  function showModal() {
    openModal();
  }
  const globSetting = useGlobSetting();
  const { uploadUrl } = globSetting;
  interface FormState {
    username: string;
    password: string;
  }

  const formRef = ref();
  const cRef = ref();
  const message = useMessage();
  const loading = ref(false);
  const autoLogin = ref(true);
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

  const formInline = reactive({
    username: 'admin',
    password: '123456',
    isCaptcha: true,
  });

  const rules = {
    username: { required: true, message: '用户名不能为空', trigger: 'blur' },
    password: { required: true, message: '密码不能为空', trigger: 'blur' },
    mobile: {
      message: '手机号格式不正确',
      validator: (_rule, value: string) => {
        const phoneTest = /^1(3|4|7|5|8)([0-9]{9})/;
        return phoneTest.test(value);
      },
      required: true,
      trigger: ['input', 'blur'],
    },
    // desc: { required: true, message: '请输入备注', trigger: 'blur' },
    // avatar: { required: true, message: '请选择头像', trigger: 'blur' },
  };

  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  //用户注册
  type cUserType = {
    username: string;
    password: string;
    mobile: string;
    desc: string;
    avatar: string[];
    file: any;
  };
  const cUser = ref<cUserType>({
    username: '',
    password: '',
    mobile: '',
    desc: '',
    avatar: [],
    file: {},
  });
  const flieChange = (file: any) => {
    console.log('file', file);
    cUser.value.file = file.file.file; //组件三层嵌套
    const url = URL.createObjectURL(file.file.file);
    cUser.value.avatar = [url];
  };
  const onPositiveClick = () => {
    cRef.value.validate(async (errors: any) => {
      if (!errors) {
        const { username } = cUser.value;
        let result = await isEnroll({ username });
        const params = new FormData();
        for (const i in cUser.value) {
          params.append(i, cUser.value[i]);
        }
        console.log('params', params.get('file'));
        if (result.code === -1) {
          const result = await createUser(params);
          console.log('result', result);
          closeModal();
        } else {
          message.error('用户已存在');
        }
      } else {
        message.error('请填写完整信息');
      }
      setSubLoading(false);
    });
  };

  //用户登录
  const handleSubmit = () => {
    formRef.value.validate(async (errors: any) => {
      if (!errors) {
        const { username, password } = formInline;
        message.loading('登录中...');
        loading.value = true;
        const params: FormState = {
          username,
          password,
        };
        let result = await isEnroll({ username });
        if (result.code === -1) {
          message.destroyAll();
          message.error(`${result.msg},请检查用户名是否正确`);
          loading.value = false;
          return;
        }
        try {
          const { code, message: msg } = await userStore.login(params);
          message.destroyAll();
          if (code == ResultEnum.SUCCESS) {
            const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
            message.success('登录成功，即将进入系统');
            if (route.name === LOGIN_NAME) {
              //校验完毕 前往首页
              router.push('/');
            } else router.replace(toPath);
          } else {
            message.info(msg || '登录失败');
          }
        } finally {
          loading.value = false;
        }
      } else {
        message.error('请填写完整信息');
      }
    });
  };
</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
      flex: 1;
      padding: 32px 12px;
      max-width: 384px;
      min-width: 320px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
