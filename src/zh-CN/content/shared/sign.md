# <WPageTitle></WPageTitle>

:::warning
- 我个人是偶然间打开web端抖音然后F12发现有rsa密钥对才开始通过配合ai研究的这套防护流程
- 纯纯c端接口才会需要的东西，项目中加这个主要是感兴趣，实际项目中很少有接口需要这种程度的防护
- 最主要可能就是像抖音那种防止爬虫或者脚本去爬接口，不过会逆向的或者懂行的这种程度的也是防不住的，毕竟一个F12一打开，web端没有什么秘密，前端总要有个地方去拼接sign，这部分代码在客户端就是裸奔的
- 抖音实际的操作流程应该是比这个复杂很多，它们应该都自己的sdk封装，签名的部分应该会复杂很多很多，我这个只是一个很简单的复现，感兴趣的github上有[开源项目](https://github.com/tikvues/tiktok-api)
- 有很多细节下面流程图中体现不出来，前端代码是完全开源的，感兴趣的可以看一下
- 签名的部分内容可以有很多文章去做，我看了一下GitHub上的逆向开源项目后后续可能对签名的部分进行一些补充
:::

:::tabs
== 首次打开页面流程

```mermaid
flowchart TB
  OpenPage[用户首次打开页面]
  SetupSign[setupSign 初始化]
  CheckClientKey{是否存在 clientKey}
  GenClientKey[生成 clientKey 并写入 localStorage]
  GenRSA[生成 RSA 密钥对 私钥存储]
  SendPubKey[发送 RSA 公钥到后端]
  RequestAES[请求 AES Key]
  AESDecrypt[前端使用私钥解密 AES]
  AESOK[AES 获取成功 准备后续签名]

  API_RegisterPub[后端保存 RSA 公钥到 Redis]
  API_GetAes[后端检查 Redis 是否存在 AES]
  GenAES[后端生成 AES Key]
  EncryptAES[后端使用 RSA 公钥加密 AES]
  ReturnEncAES[后端返回加密后的 AES]

  RedisPub[Redis 存储 RSA 公钥]
  RedisAES[Redis 存储 AES Key]

  OpenPage --> SetupSign
  SetupSign --> CheckClientKey
  CheckClientKey -->|否| GenClientKey
  GenClientKey --> GenRSA
  CheckClientKey -->|是| GenRSA

  GenRSA --> SendPubKey
  SendPubKey --> API_RegisterPub
  API_RegisterPub --> RedisPub

  SendPubKey --> RequestAES
  RequestAES --> API_GetAes

  API_GetAes -->|无 AES| GenAES
  GenAES --> RedisAES
  RedisAES --> EncryptAES
  EncryptAES --> ReturnEncAES

  API_GetAes -->|有 AES| ReturnEncAES

  ReturnEncAES --> AESDecrypt
  AESDecrypt --> AESOK
```
== 刷新页面流程
```mermaid
flowchart TB
  RefreshPage[页面刷新]
  RequestAES2[请求 AES Key]
  AESDecrypt2[前端用私钥解密 AES]
  DecryptOK[解密成功]
  DecryptFail{解密是否成功}
  BuildSign[生成 sign 放入请求头]
  SendAPIRequest[发送业务请求]
  RespInterceptor[axios响应拦截器捕获 40113]
  SingletonFetchAes[单例 Promise 刷新 AES Key]
  RetryRequest[重试原请求]
  SingletonPubOutdated[单例 Promise 刷新后端redis 中 RSA 公钥]

  API_GetAes2[后端检查 Redis 中 AES]
  Return40113[返回 40113 表示 AES 失效]
  GenAES2[后端生成新的 AES]
  EncryptAES2[后端使用 RSA 公钥加密 AES]
  SaveAES2[后端写入 Redis]
  ReturnEncAES2[返回新的加密 AES]
  GuardVerifySign[后端校验 sign]

  RedisPub2[Redis 存储 RSA 公钥]
  RedisAES2[Redis 存储 AES Key]

  RefreshPage --> RequestAES2
  RequestAES2 --> API_GetAes2

  API_GetAes2 -->|无 AES| Return40113
  Return40113 --> RespInterceptor
  RespInterceptor --> SingletonFetchAes
  SingletonFetchAes --> GenAES2
  GenAES2 --> SaveAES2
  SaveAES2 --> EncryptAES2
  EncryptAES2 --> RedisAES2
  EncryptAES2 --> ReturnEncAES2

  API_GetAes2 -->|有并通过 client rsa公钥加密| ReturnEncAES2
  ReturnEncAES2 --> AESDecrypt2

  AESDecrypt2 --> DecryptFail
  DecryptFail -->|否，大概率是rsa公私密钥对不匹配| SingletonPubOutdated
  SingletonPubOutdated --> RedisPub2
  RedisPub2 --> RequestAES2

  DecryptFail -->|是| DecryptOK
  DecryptOK --> BuildSign
  BuildSign --> SendAPIRequest
  SendAPIRequest --> GuardVerifySign
```
:::
