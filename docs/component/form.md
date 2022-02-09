# 表单

基于 naive-ui 的[form](https://www.naiveui.com/zh-CN/os-theme/components/form)二次封装。

内置了布局，查看[grid](https://www.naiveui.com/zh-CN/os-theme/components/grid)。

## Props

| 名称                   | 类型                | 默认值    | 说明                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| schemas                | WForm.Schema.Item[] | []        | 表单模式数组                                                                                                                                                                                                                                                                                                |
| cols                   | number              | 24        | 表单整体显示的栅格数量                                                                                                                                                                                                                                                                                      |
| span                   | number              | 24        | 表单项栅格占据的列数，为 0 的时候会隐藏                                                                                                                                                                                                                                                                     |
| xGap                   | number              | 20        | 表单项横向的间距                                                                                                                                                                                                                                                                                            |
| yGap                   | number              | 0         | 表单项横向的间距                                                                                                                                                                                                                                                                                            |
| preset                 | WForm.preset        | undefined | 表单预设，内置了 modal 和 drawer 两种常见的弹出表单形式                                                                                                                                                                                                                                                     |
| baseRules              | boolean             | false     | 是否开启默认表单校验，对于基本的表单项校验格式或内容基本相似，所以内置了一个函数来通过 schemas 生成最最最基本的校验规则，同时也内置了相应的校验信息。暂时只有 type 在`defaultTriggerPool`中的表单项填充了默认规则的逻辑。如其他类型的表单项也需要默认规则，需要把 formProp 中的 baseRuleApplied 设置为 true |
| advancedProps          | object              | undefined | preset 的属性传递                                                                                                                                                                                                                                                                                           |
| formItemClass          | string              | undefined | 表单中单项的样式，包括 label 和 component 部分                                                                                                                                                                                                                                                              |
| formItemComponentClass | string              | undefined | 表单中 component 部分的样式                                                                                                                                                                                                                                                                                 |
| localeUniqueKey        | string              | undefined | 表单的国际化唯一标识                                                                                                                                                                                                                                                                                        |
| localeWithTable        | boolean             | false     | 设置为 true，国际化 key 的开头的`form`会被替代为`table`，此设计是为了 table 列的表头国际化和 form 的 label 在绝大数情况下是相同的内容，只要添加过 table 列部分的国际化信息，form 的 label 就无需重复设置了                                                                                                  |

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

### Prop

| 名称           | 类型             | 说明                                                          |
| -------------- | ---------------- | ------------------------------------------------------------- |
| type           | string           | 必填，渲染表单项的类型，可做扩展。下面 Schema Type 中有介绍。 |
| componentProp  | object           | 对应 type 的组件 prop，具体查看对应 type 的 prop 即可         |
| formProp       | object           | 扩展 naive 的 formItemProps，下面会有具体介绍                 |
| gridProp       | object           | 扩展 naive 的 GridItemProps                                   |
| transitionProp | WTransitionProps | transition 相关属性，具体查看其他组件中的 transition          |
| extraProp      | object           | 其他扩展属性，下面会有具体介绍                                |

### Schema Type

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

### Schema Form Prop

| 名称             | 类型                    | 默认值    | 说明                                                                                                                                              |
| ---------------- | ----------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| rule             | object/boolean          | undefined | 扩展 naive 的 rule 字段，添加了 boolean 类型，目的是配合 baseRules 为 true 时部分项目不需要验证                                                   |
| baseRuleApplied  | boolean                 | false     | 不在`defaultTriggerPool`中的表单项如果也想要默认规则，可以设置此项为 true                                                                         |
| labelHelpMessage | string/string[]/boolean | undefined | 通常是字符串或字符串数组，具体可查看其他组件的 WMessage。但在国际化的加持下，同时也可以是个布尔值，true 即会从国际化实例中根据 key 值读取帮助消息 |
| locale           | boolean                 | true      | 用于某一项的 label 无需国际化翻译的情景，优先级高于下面的 localeWithTable                                                                         |
| localeWithTable  | boolean                 | false     | 用于在整个表单设置了 localeWithTable 为 true 的时候某一项不想和整体同步国际化的情景                                                               |

## Component

### Divider

- Prop

| 名称           | 类型    | 默认值    | 说明                                                                |
| -------------- | ------- | --------- | ------------------------------------------------------------------- |
| prefix         | string  | undefined | naive 的 h3 组件的 prefix                                           |
| type           | string  | undefined | naive 的 h3 组件的 type                                             |
| titlePlacement | string  | false     | naive 的 divider 组件的 titlePlacement                              |
| dashed         | boolean | false     | naive 的 divider 组件的 dashed                                      |
| title          | string  | undefined | 分割线标题                                                          |
| helpMessage    | string  | undefined | 标题旁边的帮助信息，基于 WTitle 的，具体可以查看其他组件中的 WTitle |
| foldable       | boolean | false     | 是否可折叠                                                          |
| startIndex     | number  | 0         | 可选从第几项开始折叠                                                |
| endIndex       | number  | 0         | 可选第几项结束折叠，默认推荐填入此 divider 下的所有想涵盖的项目总数 |

### Query

- Prop

| 名称        | 类型    | 默认值 | 说明                  |
| ----------- | ------- | ------ | --------------------- |
| foldable    | boolean | false  | 是否显示展开\折叠按钮 |
| countToFold | number  | 0      | 跳过几个开始折叠项目  |
