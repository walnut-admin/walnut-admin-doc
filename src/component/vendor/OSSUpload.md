# 前端文件直传阿里 OSS

基于阿里云的[oss](https://oss.console.aliyun.com/overview)和 naive 的 upload 组件的二次封装，在前端直接把文件上传到 oss 上再进行管理，不必把文件传到后台再传到 oss 上。比较适合于中小企业。

:::info
无需引入，可直接使用
:::

:::warning
目前做了阿里的 sts 支持，这个组件需要配合后台 sts 接口才能使用
:::

## Design

- 目前设计的是接口返回 accessKeyId、accessKeySecret、stsToken、region 和 bucket，然后实例化 oss。同时 sts 的刷新时间为 5 分钟，5 分钟后会重新调用接口返回新的 stsToken。

- 目前设计的是 oss client 的单例模式，但是感觉，不太行，后需要改。原因是组件在不同的地方可能需要将文件传到不同的 region 和 bucket，同时还有个 folder 的概念。从后台返回 region 和 bucket 或许不是一个好选择，同时这也意味着单例好像也不太行。

- 目前设计的是只把最后一层的值（即传的附件名）作为 v-model 的值，这个有利有弊。利是如果 oss 上的文件要做迁移，只需要修改拼接完整 url 的函数即可，不需要修改那些入库了的 url 数据；坏处是这样的值不够直观明确，无法确定文件是在哪个 region 哪个 bucket 哪个 folder 里，只能通过函数拼接才能看到完整的 url。

- 做了大文件的断点续传（通过 oss 的 api），实际使用中可能会有问题

## Usage

这个东西，有很强的可扩展性，可能每个人每个项目需求不一样，需要很多自定义的修改和配置。

这就意味着，这个东西的封装可能会带来很多 BUG，因为我还把这个组件放到实际业务开发中，所以目前的版本完全是我头脑风暴做出来的，许多细节的地方，到实际开发时可能会有问题。我会逐步优化的。

```vue
<template>
  <w-OSS-upload v-model:value="fileList"></w-OSS-upload>
</template>
```

## Props

| 名称          | 类型     | 默认值   | 说明                                                               |
| ------------- | -------- | -------- | ------------------------------------------------------------------ |
| value         | string[] | -        | 双向绑定的值                                                       |
| region        | string   | -        | oss 的 region                                                      |
| bucket        | string   | -        | oss 的 bucket                                                      |
| folder        | string   | -        | oss 的 folder，这个是可自定义的                                    |
| image         | boolean  | false    | 是否为图片上传                                                     |
| disabled      | boolean  | false    | 禁用                                                               |
| max           | number   | 10       | 最高可传文件数                                                     |
| accept        | string   | -        | 文件格式                                                           |
| size          | number   | 1024\*10 | 单个文件最大大小，单位 kb                                          |
| crossoverSize | number   | 1024\*30 | 采用大文件断点续传 api 的 borderline，单位 kb，默认大于 30M 就启用 |

## Type

暂无

## Form Usage

后续要加到表单里的，因为使用最多的场景，也就是表单了。

## TODO

- oss 实例：是一个组件一个实例，还是单例模式
- 配置：关于 region、bucket 和 folder，是统一后台配置然后接口返回，还是在前端写死在 prop 中
