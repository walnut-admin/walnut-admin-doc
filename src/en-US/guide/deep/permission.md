# 权限

## 介绍

权限模块我是根据了解过的一些框架自己做的开发，就是最基本的基于角色的权限管理。一个角色可以拥有多个角色，一个角色可以拥有多个菜单权限，而每条菜单权限里的 type 为 element 的（即元素类型的菜单）数据，都会指定一个 permission 字段。通过函数把当前登录用户的所有 permission 字符串权限存到全局的状态里，再通过一个[AppAuthorize](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/components/App/AppAuthorize/index.vue)的组件，判断包裹的内容是否符合通过 prop 传进来的字符串。即最简单的来说，就是一个 includes 的判断（后续如果增加多权限或者通过角色判断权限的功能逻辑可能会更复杂一些）。

### ts 类型

```ts
permissions: string[]
```

## 相关函数

具体查看[state](/guide/deep/state#user-permission)即可

## 相关组件

### AppAuthorize

暂时逻辑是十分简单清晰的，就是通过 hasPermission 判断是否显示 slot

```vue
<script lang="ts">
import { renderSlot } from 'vue'

export default defineComponent({
  name: 'AppAuthorize',

  props: {
    value: String as PropType<string>,
  },

  setup(props, { slots }) {
    const userPermission = useAppStoreUserPermission()

    const render = () => {
      if (userPermission.hasPermission(props.value!))
        return renderSlot(slots, 'default')

      return null
    }

    return () => render()
  },
})
</script>
```
