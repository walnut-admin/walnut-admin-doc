# 表格

基于 naive-ui 的[data-table](https://www.naiveui.com/zh-CN/os-theme/components/data-table)二次封装。

内置了搜索条件表单、基本按钮组以及许多扩展功能。

## Usage

## Props

| 名称            | 类型                                                  | 默认值                         | 说明                                                      |
| --------------- | ----------------------------------------------------- | ------------------------------ | --------------------------------------------------------- |
| localeUniqueKey | string                                                | -                              | 表格的国际化唯一标识                                      |
| actionList      | WTable.HeaderActionType                               | ['create', 'update', 'delete'] | 内置的按钮组，默认提供增改删三个按钮                      |
| onAction        | ({ type }: { type: WTable.HeaderActionType }) => void | -                              | 按钮组事件                                                |
| queryFormProps  | WForm.Props                                           | -                              | 搜索表单 prop，具体查看[w-form](/component/UI/form#props) |
| apiProps        | object                                                | -                              | api 用法的 table，把基本逻辑都内置在了组件内部            |
| auths           | object                                                | -                              | 不同按钮的权限                                            |

## Type
