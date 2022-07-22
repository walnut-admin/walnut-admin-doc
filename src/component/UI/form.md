# 表单

基于 naive-ui 的[form](https://www.naiveui.com/zh-CN/os-theme/components/form)二次封装。

## Props

:::info
下面展示的均是二封时设计的 props。需要注意的是 xGap 默认给了 20，在一个 item 就占一行的表单中，需要手动把 xGap 设置为 0。
:::

| 名称                   | 类型                | 默认值 | 说明                                                                                                                                                                                                                                                         |
| ---------------------- | ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| schemas                | WForm.Schema.Item[] | []     | 表单模式数组                                                                                                                                                                                                                                                 |
| cols                   | number              | 24     | 表单整体显示的栅格数量                                                                                                                                                                                                                                       |
| span                   | number              | 24     | 表单项栅格占据的列数，为 0 的时候会隐藏                                                                                                                                                                                                                      |
| xGap                   | number              | 20     | 表单项横向的间距                                                                                                                                                                                                                                             |
| yGap                   | number              | 0      | 表单项横向的间距                                                                                                                                                                                                                                             |
| preset                 | WForm.preset        | -      | 表单预设，内置了 modal 和 drawer 两种常见的弹出表单形式                                                                                                                                                                                                      |
| baseRules              | boolean             | false  | 是否开启默认表单校验。基于 schemas 的加持上内置了一套默认规则，同时也内置了相应的校验信息。暂时只有 `schema type` 在`defaultTriggerPool`中的表单项填充了默认规则的逻辑。如其他类型的表单项也需要默认规则，需要把 formProp 中的 `baseRuleApplied` 设置为 true |
| advancedProps          | advancedProps       | -      | preset 的属性传递，下方有具体介绍                                                                                                                                                                                                                            |
| formItemClass          | string              | -      | 表单中单项的样式，包括 label 和 component 部分                                                                                                                                                                                                               |
| formItemComponentClass | string              | -      | 表单中 component 部分的样式                                                                                                                                                                                                                                  |
| localeUniqueKey        | string              | -      | 表单的国际化唯一标识                                                                                                                                                                                                                                         |
| localeWithTable        | boolean             | false  | 设置为 true，国际化 key 的开头的`form`会被替代为`table`，此设计是为了 table 列的表头国际化和 form 的 label 在绝大数情况下是相同的内容，只要添加过 table 列部分的国际化信息，form 的 label 就无需重复设置了                                                   |

## Type

:::info
为了提供更好的类型支持，naive 的 form props 我是直接复制粘贴了出来到下面的 props 中，同时把 labelAlign 默认值修改为了 right，labelPlacement 默认值修改为了 left
:::

```ts
export const extendProps = {
  // 上方自定义的props
};

export const props = {
  // naive的form Props

  ...extendProps,
} as const;

export type WFormPropType = ExtractPropTypes<typeof props>;
```

## Schema

### Basic Schema Item

:::info
下面是 schema item 的最基本结构，更多详细的类型说明可以查看`Form/src/types.ts`
:::

| 名称           | 类型             | 说明                                                          |
| -------------- | ---------------- | ------------------------------------------------------------- |
| type           | string           | 必填，渲染表单项的类型，可做扩展。下面 Schema Type 中有介绍。 |
| componentProp  | object           | 对应 type 的组件 prop，具体查看对应 type 的 prop 即可         |
| formProp       | object           | 扩展 naive 的 formItemProps，下面会有具体介绍                 |
| gridProp       | object           | 扩展 naive 的 GridItemProps                                   |
| transitionProp | WTransitionProps | transition 相关属性，具体查看其他组件中的 transition          |
| extraProp      | object           | 其他扩展属性，下面会有具体介绍                                |

### Type

:::info
下方以`Base`开头的多是 UI 组件中的二次封装组件。以`Extend`开头的多以一些非 UI 类的或扩展类的组件。
:::

| 值                             | 说明                                                                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Base:Button                    | 按钮，使用频率不高                                                                                                                        |
| Base:ButtonGroup               | 按钮组，使用频率不高                                                                                                                      |
| Base:Input                     | 输入框                                                                                                                                    |
| Base:InputNumber               | 数字输入框                                                                                                                                |
| Base:Select                    | 下拉框                                                                                                                                    |
| Base:Radio                     | 单选框                                                                                                                                    |
| Base:Checkbox                  | 多选框                                                                                                                                    |
| Base:Switch                    | 开关                                                                                                                                      |
| Base:TimePicker                | 时间选择器                                                                                                                                |
| Base:DatePicker                | 日期选择器                                                                                                                                |
| Base:DynamicTags               | 动态标签                                                                                                                                  |
| Base:Slider                    | 滑动块（无封装）                                                                                                                          |
| Base:TreeSelect                | 下拉树（无封装）                                                                                                                          |
| Base:Tree                      | 树（无封装）                                                                                                                              |
| Base:DynamicInput              | 动态录入（无封装）                                                                                                                        |
| Base:Slot                      | 插槽形式，不推荐使用，可以的话就用下面的 render 写 tsx                                                                                    |
| Base:Render                    | 渲染函数，即 tsx 写法，十分方便。推荐使用此方法插入自定义项目                                                                             |
| Extend:Divider                 | 分割线，表单项目过多需要按功能分割的话可以使用，下面扩展组件中有介绍                                                                      |
| Extend:Query                   | 内置的搜索表单按钮组，内置搜索/重置/展开/收起 ，下面扩展组件中有介绍                                                                      |
| Extend:IconPicker              | 框架的图标选择器，在其他组件中有介绍                                                                                                      |
| Extend:RoleSelect              | 高度二次封装的角色选择器，算是业务级别的组件了。同时可以看作为一个示例，以此可以扩展出很多类似的选择器，如用户选择器，部门/岗位选择器等等 |
| Extend:LocationCascader（WIP） | 常见的省地市级联面板                                                                                                                      |
| Extend:Editor（WIP）           | 基于 tinymce 的富文本编辑器的二次封装                                                                                                     |
| Extend:Map（WIP）              | 基于高德（？暂不确定）的地图组件二次封装                                                                                                  |

### Form Prop

:::info
下方介绍的是扩展的一些配置项目，naive 的默认 `formItemProps` 查看文档即可。
:::

| 名称             | 类型                    | 默认值 | 说明                                                                                                                                              |
| ---------------- | ----------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| rule             | object/boolean          | -      | 扩展 naive 的 rule 字段，添加了 boolean 类型，目的是配合 baseRules 为 true 时部分项目不需要验证                                                   |
| baseRuleApplied  | boolean                 | false  | 不在`defaultTriggerPool`中的表单项如果也想要默认规则，可以设置此项为 true                                                                         |
| labelHelpMessage | string/string[]/boolean | -      | 通常是字符串或字符串数组，具体可查看其他组件的 WMessage。但在国际化的加持下，同时也可以是个布尔值，true 即会从国际化实例中根据 key 值读取帮助消息 |
| locale           | boolean                 | true   | 用于某一项的 label 无需国际化翻译的情景，优先级高于下面的 localeWithTable                                                                         |
| localeWithTable  | boolean                 | false  | 用于在整个表单设置了 localeWithTable 为 true 的时候某一项不想和整体同步国际化的情景                                                               |

### Grid Prop

具体查看 naive 的[grid-item-props](https://www.naiveui.com/zh-CN/os-theme/components/grid#GridItem-Props)即可。并无扩展配置项。

### Transition Prop

具体查看其他组件中[w-transition](/component/Extra/transition#props)即可。

### Extra Prop

字面意思，是一些其余的配置项。

| 名称  | 类型                              | 默认值 | 说明                     |
| ----- | --------------------------------- | ------ | ------------------------ |
| vIf   | boolean/({ formData }) => boolean | true   | 用 v-if 控制表单项显隐   |
| vShow | boolean/({ formData }) => boolean | true   | 用 v-show 控制表单项显隐 |

:::info
这里通过 ts 泛型的支持做了不同表单项可单独配置不同`extraProps`的功能。类似于定制化 props 的概念。
下面分割线的表单项就是示例。
:::

- Divider Extra Prop

| 名称    | 类型    | 默认值 | 说明                                                             |
| ------- | ------- | ------ | ---------------------------------------------------------------- |
| sticky  | boolean | false  | 实现 position: 'sticky'，在表单内容过多出现滚动条时体验更好      |
| bgColor | string  | -      | 在 sticky 时同时需要设置一个背景颜色，否则会有透视图层错乱的效果 |

## Component

### Divider

- Prop

| 名称           | 类型    | 默认值 | 说明                                                                |
| -------------- | ------- | ------ | ------------------------------------------------------------------- |
| prefix         | string  | -      | naive 的 h3 组件的 prefix                                           |
| type           | string  | -      | naive 的 h3 组件的 type                                             |
| titlePlacement | string  | false  | naive 的 divider 组件的 titlePlacement                              |
| dashed         | boolean | false  | naive 的 divider 组件的 dashed                                      |
| title          | string  | -      | 分割线标题                                                          |
| helpMessage    | string  | -      | 标题旁边的帮助信息，基于 WTitle 的，具体可以查看其他组件中的 WTitle |
| foldable       | boolean | false  | 是否可折叠                                                          |
| startIndex     | number  | 0      | 可选从第几项开始折叠                                                |
| endIndex       | number  | 0      | 可选第几项结束折叠，默认推荐填入此 divider 下的所有想涵盖的项目总数 |

### Query

- Prop

| 名称        | 类型    | 默认值 | 说明                  |
| ----------- | ------- | ------ | --------------------- |
| foldable    | boolean | false  | 是否显示展开\折叠按钮 |
| countToFold | number  | 0      | 跳过几个开始折叠项目  |

## Hook 用法

hook 的用法第一次是在 vben 那边看到，元素上只会有一个`hook`的事件，其他配置项都是在`useForm`的参数中实现。最大的有点就是 ts 支持很好。参数类型穿错了 ide 会直接飘红。而且像调用 form 的一些方法再也不用写 ref 然后还要手动引入类型
的去使用。同时是在提供了表单内容的泛型支持后，在类似于`render`函数的回调参数中，也可以很好的获取到智能提示。

- 基本用法示例

```vue
<template>
  <w-form @hook="register" :model="formData"></w-form>
</template>

<script lang="ts" setup>
const formData = ref<{
  field1: string;
  field2: number;
}>({
  field1: "",
  field2: 0,
});

// useForm 通过auto-import插件支持下无需引入即可使用
// <w-form /> 通过components插件支持下也是可直接使用
// formData 是需要开发者手动管理的部分
const [register] = useForm<typeof formData.value>({
  span: 8,
  xGap: 20,
  labelWidth: 120,
  schemas: [
    {
      type: "Base:Input",
      formProp: {
        path: "field1",
        label: "Field 1",
      },
      componentProp: {
        clearable: true,
      },
    },

    {
      type: "Base:Switch",
      formProp: {
        path: "field2",
        label: "Field 2",
      },
    },
  ],
});
</script>
```

- 方法使用

```ts
const [register, { validate, restoreValidation, onOpen }] = useForm();
```

- 返回的第二个参数即使表单的一些方法，可直接解构，同时有着很好的 ts 支持。

- validate 即校验方法，restoreValidation 是清空校验方法。onOpen 是在提供了 preset 时打开弹出层的方法，具体用法如下

```ts
// 在新建打开时可直接执行回调
onOpen((done) => done());

// 在编辑打开时可调用接口，把返回赋到formData上
onOpen(async (done) => {
  try {
    const res = await someApi(someId);
    // 这里注意一定要用Object.assign赋值，直接把formData.value = res是不生效的
    formData.value = Object.assign(formData.value, res);
  } finally {
    done();
  }
});
```

### advancedProps

此配置最主要的是传递 naive 的`ModalProps`和`DrawerProps`，其次扩展了弹出层的确定和取消按钮的 click 函数以及打开类型（默认分为 create 和 update）。下面细讲一下扩展的 props

- onYes

函数内提前写好了一些基本的 validate 和 loading 的逻辑。具体如下

```ts
const onYes = async () => {
  // 第一步就是校验
  await formRef.value!.validate();

  // 开启loading
  loading.value = true;

  // 下面的函数是一个回调函数，第一个参数就是api的方法，具体使用下面我会在贴一个例子
  // 第二个参数即为要提交的参数（一般来说就是formData）
  const apiHandler = async (apiFn: Fn, params: AnyObject) => {
    try {
      const ret = await apiFn(params);

      if (ret) {
        // 在成功的情况下关闭弹出层，并且弹出成功消息
        // （这里是预设了如果接口报错，在axios一层就会resolve -，ret就会为空。项目中的axios封装就是这么做的）
        onClose();
        AppSuccess();
      } else {
        // 这是接口报错的情况，需要reject一下，防止用户写的后续代码会执行（例如重置表单数据为初始状态/刷新table数据）
        return Promise.reject();
      }
    } finally {
      // 通过一个try/finally确保loading会关闭
      done();
    }
  };

  // 执行回调
  // 第一个参数即为api用法
  // 第二个参数是成功后的回调，即开发者想自己维护相关逻辑处理（此情况就不需要穿第一个参数了）
  props.value.advancedProps?.onYes(apiHandler, () => {
    done();
    onClose();
  });
};
```

- onNo

一般取消按钮需要执行清空校验并关闭弹层的操作

```ts
const onNo = () => {
  // 清空校验
  formRef.value!.restoreValidation();

  // 执行回调，参数为关闭弹层（由于表单的状态管理是交给开发者自己维护的，所以在回调中可能还需重置表单为初始值）
  props.value.advancedProps?.onNo(onClose);
};
```

- actionType

值为 create 或 update。用处有 2，一是弹出层标题的区分（国际化加持下），二是动态调用 api（因为新建和编辑的接口函数默认名称就是 create 和 update），这个具体在 api 的封装中会细说。
