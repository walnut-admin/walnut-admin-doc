# WithValue

:::info

1. 后续会支持更多相似组件
2. 以下提到的都是二次封装后的组件，主要目的是为了统一 props

:::

这个高阶组件是用来统一处理 v-model:value 的。在`select`、`checkbox`、`radio`组件中，经常会有一种情况，`options`里的 value 字段值是数字，但后台接口取回来的值是字符串，就会导致回显出问题；还有一种情况，在某些组件支持多选的状态下，需要把传出来的数组（因为是多选）拼接成字符串再传到接口。

为了简化以上讲到的两种情况，就设计了这个 HOC 组件。通过统一化 `props` 来实现相同的对 `value` 的劫持和传递。实现了无需再担心是数字还是字符串而导致的回显问题，同时实现了特定组件的多选状态下 v-model:value 的值格式化为拼接的字符串。

## Usage

在封装好的组件的入口处，使用`WithValue`函数将组件包裹一下，然后再默认导出即可。

> 下面这个是 select 的例子

```ts
import { WithValue } from '../../HOC/WithValue'
import WSelect from './src/index.vue'

const HOCSelect = WithValue(WSelect)

export * from './src/types'

export default HOCSelect
```

## Props

主要是针对`value`、`multiple`进行了劫持，同时新增了`valueType`和`valueSeparator`两个 props，一个用于定义组件的 value 类型，是 string/number/boolean 中的哪一种；另一个是多选状态定义拼接数组的符号，常见的就是 `,` 和 `|` 。

```ts
const WithValueProps = {
  value: [String, Number, Boolean, Array] as PropType<
    string | number | boolean | string[] | number[] | (string & number)[]
  >,

  multiple: Boolean as PropType<boolean>,

  valueType: {
    type: String as PropType<'string' | 'number' | 'boolean'>,
    default: 'string',
  },

  valueSeparator: String as PropType<string>,
}
```

## Types

```ts
type WithValueProp = Partial<ExtractPropTypes<typeof WithValueProps>>
```
