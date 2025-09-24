// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query" // 360安全DNS
];

// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query" // Mullvad(备)
];


// 代理提供商配置
const proxyProviders = {
  // "订阅1": {
  //   "type": "http",
  //   "url": "https://9SL6MJbgdu.solastme.cc/4678e53c3e82d5959282d28e0f06687f",
  //   "interval": 86400,
  //   "health-check": {
  //     "enable": true,
  //     "url": "https://www.gstatic.com/generate_204",
  //     "interval": 300
  //   },
  //   "override": {
  //     "additional-prefix": "[订阅1]"
  //   }
  // },
  "订阅2": {
    "type": "http",
    "url": "http://45.62.108.111:45231/myconfig/jtgX1P1I?format=clash",
    "interval": 86400,
    "health-check": {
      "enable": true,
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300
    },
    "override": {
      "additional-prefix": "[VPS节点]"
    }    
  }
};

// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    "+.lan",
    "+.local",
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
  "nameserver": [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
  }
};

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};


// 合并后的规则集配置（中文命名）
const ruleProviders = {
  // 基础规则
  "广告拦截": { ...ruleProviderCommon, "behavior": "domain", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt", "path": "./rules/basic/reject.yaml" },
  "直连域名": { ...ruleProviderCommon, "behavior": "domain", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt", "path": "./rules/basic/direct.yaml" },
  "代理域名": { ...ruleProviderCommon, "behavior": "domain", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt", "path": "./rules/basic/proxy.yaml" },
  "私有网络": { ...ruleProviderCommon, "behavior": "domain", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt", "path": "./rules/basic/private.yaml" },
  "防火墙": { ...ruleProviderCommon, "behavior": "domain", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt", "path": "./rules/basic/gfw.yaml" },
  "非中国域名": { ...ruleProviderCommon, "behavior": "domain", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt", "path": "./rules/basic/tld-not-cn.yaml" },
  "应用程序": { ...ruleProviderCommon, "behavior": "classical", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt", "path": "./rules/basic/applications.yaml" },
  "特殊需求": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Special.yaml", "path": "./rules/basic/special.yaml" },
  "代理服务": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Proxy.yaml", "path": "./rules/basic/proxy.yaml" },
  "国内网站": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Domestic.yaml", "path": "./rules/basic/domestic.yaml" },
  "局域网": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/LAN.yaml", "path": "./rules/basic/lan.yaml" },

  // IP地址规则
  "国内IP": { ...ruleProviderCommon, "behavior": "ipcidr", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt", "path": "./rules/ip/cncidr.yaml" },
  "国内IP段": { ...ruleProviderCommon, "behavior": "ipcidr", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Domestic%20IPs.yaml", "path": "./rules/ip/domestic-ips.yaml" },
  "局域网IP": { ...ruleProviderCommon, "behavior": "ipcidr", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt", "path": "./rules/ip/lancidr.yaml" },
  "电报IP": { ...ruleProviderCommon, "behavior": "ipcidr", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt", "path": "./rules/ip/telegramcidr.yaml" },

  // 应用服务
  "苹果服务": { ...ruleProviderCommon, "behavior": "domain", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt", "path": "./rules/services/apple.yaml" },
  "苹果云盘": { ...ruleProviderCommon, "behavior": "domain", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt", "path": "./rules/services/icloud.yaml" },
  "苹果音乐": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Apple%20Music.yaml", "path": "./rules/services/apple-music.yaml" },
  "苹果新闻": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Apple%20News.yaml", "path": "./rules/services/apple-news.yaml" },
  "苹果视频": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Apple%20TV.yaml", "path": "./rules/services/apple-tv.yaml" },

  "谷歌服务": { ...ruleProviderCommon, "behavior": "domain", "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt", "path": "./rules/services/google.yaml" },
  "谷歌FCM": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Google%20FCM.yaml", "path": "./rules/services/google-fcm.yaml" },

  "微软服务": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Microsoft.yaml", "path": "./rules/services/microsoft.yaml" },
  "电报服务": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Telegram.yaml", "path": "./rules/services/telegram.yaml" },
  "加密货币": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Crypto.yaml", "path": "./rules/services/crypto.yaml" },
  "学术网站": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Scholar.yaml", "path": "./rules/services/scholar.yaml" },
  "PayPal": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/PayPal.yaml", "path": "./rules/services/paypal.yaml" },
  "速度测试": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Speedtest.yaml", "path": "./rules/services/speedtest.yaml" },
  "聊天软件": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Discord.yaml", "path": "./rules/services/discord.yaml" },

  // AI服务
  "人工智能": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/refs/heads/main/Clash/Provider/AI%20Suite.yaml", "path": "./rules/ai/ai-suite.yaml" },

  // 游戏服务
  "游戏平台": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Steam.yaml", "path": "./rules/games/steam.yaml" },
  "米哈游": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/miHoYo.yaml", "path": "./rules/games/mihoyo.yaml" },

  // 国内流媒体
  "哔哩哔哩": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Bilibili.yaml", "path": "./rules/media/bilibili.yaml" },
  "爱奇艺": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/IQIYI.yaml", "path": "./rules/media/iqiyi.yaml" },
  "爱趣电影": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/IQ.yaml", "path": "./rules/media/iq.yaml" },
  "网易云音乐": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Netease%20Music.yaml", "path": "./rules/media/netease-music.yaml" },
  "腾讯视频": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Tencent%20Video.yaml", "path": "./rules/media/tencent-video.yaml" },
  "优酷视频": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Youku.yaml", "path": "./rules/media/youku.yaml" },
  "乐视视频": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Letv.yaml", "path": "./rules/media/letv.yaml" },

  // 国际流媒体
  "奈飞视频": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Netflix.yaml", "path": "./rules/media/netflix.yaml" },
  "油管视频": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/YouTube.yaml", "path": "./rules/media/youtube.yaml" },
  "迪士尼加": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Disney%20Plus.yaml", "path": "./rules/media/disney-plus.yaml" },
  "HBO视频": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Max.yaml", "path": "./rules/media/hbo-max.yaml" },
  "Spotify": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Spotify.yaml", "path": "./rules/media/spotify.yaml" },
  "WeTV": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/WeTV.yaml", "path": "./rules/media/wetv.yaml" },
  "亚马逊": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Amazon.yaml", "path": "./rules/media/amazon.yaml" },
  "巴哈姆特": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Bahamut.yaml", "path": "./rules/media/bahamut.yaml" },
  "BBC播放器": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/BBC%20iPlayer.yaml", "path": "./rules/media/bbc-iplayer.yaml" },
  "DAZN": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/DAZN.yaml", "path": "./rules/media/dazn.yaml" },
  "探索频道": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Discovery%20Plus.yaml", "path": "./rules/media/discovery-plus.yaml" },
  "F1电视": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/F1%20TV.yaml", "path": "./rules/media/f1-tv.yaml" },
  "福克斯": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Fox%20Now.yaml", "path": "./rules/media/fox-now.yaml" },
  "福克斯加": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Fox%2B.yaml", "path": "./rules/media/fox-plus.yaml" },
  "葫芦视频": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Hulu.yaml", "path": "./rules/media/hulu.yaml" },
  "日本葫芦": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Hulu%20Japan.yaml", "path": "./rules/media/hulu-japan.yaml" },


  // 其他流媒体
  "ABC": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/ABC.yaml", "path": "./rules/media/abc.yaml" },
  "Abema电视": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Abema%20TV.yaml", "path": "./rules/media/abema-tv.yaml" },
  "TVB剧集": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/encoreTVB.yaml", "path": "./rules/media/encoretvb.yaml" },
  "日本动画": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Japonx.yaml", "path": "./rules/media/japonx.yaml" },
  "JOOX音乐": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/JOOX.yaml", "path": "./rules/media/jOOX.yaml" },
  "KKBOX": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/KKBOX.yaml", "path": "./rules/media/kkbox.yaml" },
  "KKTV": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/KKTV.yaml", "path": "./rules/media/kktv.yaml" },
  "Line电视": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Line%20TV.yaml", "path": "./rules/media/line-tv.yaml" },
  "myTV": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/myTV%20SUPER.yaml", "path": "./rules/media/mytv-super.yaml" },
  "Niconico": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Niconico.yaml", "path": "./rules/media/niconico.yaml" },
  "潘多拉": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Pandora.yaml", "path": "./rules/media/pandora.yaml" },
  "PBS": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/PBS.yaml", "path": "./rules/media/pbs.yaml" },
  "成人网站": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Pornhub.yaml", "path": "./rules/media/pornhub.yaml" },
  "声云音乐": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/Soundcloud.yaml", "path": "./rules/media/soundcloud.yaml" },
  "ViuTV": { ...ruleProviderCommon, "behavior": "classical", "url": "https://ghp.ml1.one/https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Media/ViuTV.yaml", "path": "./rules/media/viutv.yaml" },
  "国际站点": { ...ruleProviderCommon, "behavior": "domain", "url": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Global.png", "path": "./rules/basic/global.yaml" }
};


// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

// 主函数
function main(config) {
  // 检查代理是否存在
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount = typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 创建代理组的函数
  function createProxyGroup(name, type, icon, proxies, additionalOptions = {}) {
    return {
      name,
      type,
      url: "http://www.gstatic.com/generate_204",
      icon,
      interval: 300,
      tolerance: type === "url-test" ? 20 : undefined,
      timeout: type === "url-test" ? 2000 : undefined,
      lazy: true,
      proxies: proxies.length > 0 ? proxies : ["DIRECT"],
      strategy: type === "load-balance" ? "consistent-hashing" : undefined,
      ...additionalOptions
    };
  }

  // 通过正则表达式获取代理的函数
  function getProxiesByRegex(proxies, regex) {
    return proxies
      .filter(e => regex.test(e.name))
      .map(e => e.name);
  }

  // 预定义代理组
  const predefinedGroups = [
    // 基础分流
    createProxyGroup("节点选择", "select", "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
      ["自动选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "其他节点", "DIRECT"],
      { "include-all": true }),
    createProxyGroup("自动选择", "url-test", "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
      [], { "include-all": true, "tolerance": 600 }),


    // 应用分流
    createProxyGroup("谷歌服务", "select", "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg",
      ["节点选择", "自动选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点", "DIRECT"]),
    createProxyGroup("微软服务", "select", "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg",
      ["DIRECT", "节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),
    createProxyGroup("苹果服务", "select", "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg",
      ["DIRECT", "节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),
    createProxyGroup("电报消息", "select", "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg",
      ["节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),
    createProxyGroup("加密货币", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Cryptocurrency_3.png",
      ["节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),
    createProxyGroup("学术网站", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Scholar.png",
      ["节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),
    createProxyGroup("PayPal", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/PayPal.png",
      ["节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),
    createProxyGroup("Adobe", "select", "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg",
      ["REJECT", "DIRECT", "节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),
    createProxyGroup("国际站点", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Global.png",
      ["节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),

    // 流媒体分流
    createProxyGroup("国际媒体", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ForeignMedia.png",
      ["节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点", "自动选择"]),
    createProxyGroup("油管视频", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png",
      ["国际媒体", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),

    createProxyGroup("国内媒体", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/DomesticMedia.png",
      ["DIRECT", "香港节点", "台湾节点", "VPS节点", "节点选择"]),

    // 游戏平台
    createProxyGroup("游戏平台", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Game.png",
      ["节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点", "DIRECT"]),

    // AI服务
    createProxyGroup("人工智能", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Copilot.png",
      ["美国节点", "日本节点", "香港节点", "台湾节点", "狮城节点", "VPS节点", "其他节点", "节点选择"]),

    // 地区分流
    createProxyGroup("中国大陆", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China.png",
      ["DIRECT", "节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),
    createProxyGroup("全局直连", "select", "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
      ["DIRECT", "节点选择", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),


    // 兜底规则
    createProxyGroup("广告拦截", "select", "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg",
      ["REJECT", "DIRECT"]),
    createProxyGroup("漏网之鱼", "select", "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
      ["节点选择", "DIRECT", "REJECT", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "VPS节点", "其他节点"]),


    // 节点类型（使用 include-all 和 filter 自动分类节点）
    createProxyGroup("香港节点", "url-test", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png",
      [], { "include-all": true, "filter": "香港|HK|Hong|🇭🇰", "exclude-filter": "DIRECT" }),
    createProxyGroup("台湾节点", "url-test", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Taiwan.png",
      [], { "include-all": true, "filter": "台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼", "exclude-filter": "DIRECT" }),
    createProxyGroup("狮城节点", "url-test", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png",
      [], { "include-all": true, "filter": "新加坡|狮城|SG|Singapore|🇸🇬", "exclude-filter": "DIRECT" }),
    createProxyGroup("日本节点", "url-test", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png",
      [], { "include-all": true, "filter": "日本|JP|Japan|🇯🇵", "exclude-filter": "DIRECT" }),
    createProxyGroup("美国节点", "url-test", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png",
      [], { "include-all": true, "filter": "美国|US|United States|America|🇺🇸", "exclude-filter": "DIRECT" }),
    createProxyGroup("VPS节点", "url-test", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Vimeo.png",
      [], { "include-all": true, "filter": "VPS节点" ,"exclude-filter": "DIRECT" }),
    createProxyGroup("其他节点", "select", "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/World_Map.png",
      [], { "include-all": true, "exclude-filter": "香港|HK|Hong|🇭🇰|台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼|新加坡|SG|Singapore|狮城|🇸🇬|日本|JP|Japan|🇯🇵|美国|US|States|America|🇺🇸|自动|故障|流量|官网|套餐|机场|订阅|年|月" })

  ];

  // 设置代理提供商
  config["proxy-providers"] = proxyProviders;

  // 合并所有代理组
  config["proxy-groups"] = predefinedGroups;

  // 设置DNS配置
  config["dns"] = dnsConfig;

  // 设置规则集
  config["rule-providers"] = ruleProviders;

  // 合并规则
  config["rules"] = [
    // 自定义规则
    "DOMAIN-SUFFIX,googleapis.cn,谷歌服务",
    "DOMAIN-SUFFIX,gstatic.com,谷歌服务",
    "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,谷歌服务",
    "DOMAIN-SUFFIX,github.io,国际站点",
    "DOMAIN,v2rayse.com,国际站点",
    "DOMAIN-SUFFIX,doc2x.com,中国大陆",
    "DOMAIN-SUFFIX,noedgeai.com,中国大陆",
    "DOMAIN-KEYWORD,cursor,人工智能",

    //adobe拦截    
    "DOMAIN-KEYWORD,adobe,Adobe",

    // 第二部分规则
    "AND,(AND,(DST-PORT,443),(NETWORK,UDP)),(NOT,((GEOIP,CN,no-resolve))),REJECT",
    "GEOSITE,Private,全局直连",
    "GEOSITE,Bing,人工智能",
    "GEOSITE,Openai,人工智能",
    "GEOSITE,Category-games@cn,中国大陆",
    "GEOSITE,Category-games,游戏平台",
    "GEOSITE,Github,国际站点",
    "GEOIP,Telegram,电报消息,no-resolve",
    "GEOSITE,Bilibili,国内媒体",
    "GEOSITE,Youtube,油管视频",
    "GEOSITE,Disney,国际媒体",
    "GEOSITE,Netflix,国际媒体",
    "GEOSITE,HBO,国际媒体",
    "GEOSITE,Primevideo,国际媒体",
    "GEOSITE,Google,谷歌服务",
    "GEOSITE,Microsoft@cn,中国大陆",
    "GEOSITE,Apple@cn,中国大陆",
    "GEOSITE,Geolocation-!cn,国际站点",
    "GEOSITE,CN,中国大陆",
    "GEOIP,CN,中国大陆,no-resolve",


    // 应用规则集
    "RULE-SET,人工智能,人工智能",
    "RULE-SET,应用程序,全局直连",
    "RULE-SET,私有网络,全局直连",
    "RULE-SET,广告拦截,广告拦截",
    "RULE-SET,苹果云盘,苹果服务",
    "RULE-SET,苹果服务,苹果服务",
    "RULE-SET,谷歌服务,谷歌服务",
    "RULE-SET,代理域名,国际站点",
    "RULE-SET,防火墙,国际站点",
    "RULE-SET,非中国域名,国际站点",
    "RULE-SET,直连域名,中国大陆",
    "RULE-SET,局域网IP,全局直连,no-resolve",
    "RULE-SET,国内IP,中国大陆,no-resolve",
    "RULE-SET,电报IP,电报消息,no-resolve",


    // 新增规则（基于新rule-providers）
    "RULE-SET,特殊需求,国际站点",
    "RULE-SET,代理服务,国际站点",
    "RULE-SET,国内网站,中国大陆",
    "RULE-SET,国内IP段,中国大陆,no-resolve",
    "RULE-SET,局域网,全局直连",
    "RULE-SET,奈飞视频,国际媒体",
    "RULE-SET,Spotify,国际媒体",
    "RULE-SET,油管视频,油管视频",
    "RULE-SET,哔哩哔哩,国内媒体",
    "RULE-SET,爱趣电影,国内媒体",
    "RULE-SET,爱奇艺,国内媒体",
    "RULE-SET,乐视视频,国内媒体",
    "RULE-SET,网易云音乐,国内媒体",
    "RULE-SET,腾讯视频,国内媒体",
    "RULE-SET,优酷视频,国内媒体",
    "RULE-SET,WeTV,国际媒体",
    "RULE-SET,ABC,国际媒体",
    "RULE-SET,Abema电视,国际媒体",
    "RULE-SET,亚马逊,国际媒体",
    "RULE-SET,苹果音乐,苹果服务",
    "RULE-SET,苹果新闻,苹果服务",
    "RULE-SET,苹果视频,苹果服务",
    "RULE-SET,巴哈姆特,国际媒体",
    "RULE-SET,BBC播放器,国际媒体",
    "RULE-SET,DAZN,国际媒体",
    "RULE-SET,探索频道,国际媒体",
    "RULE-SET,迪士尼加,国际媒体",
    "RULE-SET,TVB剧集,国际媒体",
    "RULE-SET,F1电视,国际媒体",
    "RULE-SET,福克斯,国际媒体",
    "RULE-SET,福克斯加,国际媒体",
    "RULE-SET,HBO视频,国际媒体",
    "RULE-SET,日本葫芦,国际媒体",
    "RULE-SET,葫芦视频,国际媒体",
    "RULE-SET,日本动画,国际媒体",
    "RULE-SET,JOOX音乐,国际媒体",
    "RULE-SET,KKBOX,国际媒体",
    "RULE-SET,KKTV,国际媒体",
    "RULE-SET,Line电视,国际媒体",
    "RULE-SET,myTV,国际媒体",
    "RULE-SET,Niconico,国际媒体",
    "RULE-SET,潘多拉,国际媒体",
    "RULE-SET,PBS,国际媒体",
    "RULE-SET,成人网站,国际媒体",
    "RULE-SET,声云音乐,国际媒体",
    "RULE-SET,ViuTV,国际媒体",
    "RULE-SET,电报服务,电报消息",
    "RULE-SET,加密货币,加密货币",
    "RULE-SET,聊天软件,国际站点",
    "RULE-SET,游戏平台,游戏平台",
    "RULE-SET,速度测试,国际站点",
    "RULE-SET,PayPal,PayPal",
    "RULE-SET,微软服务,微软服务",
    "RULE-SET,谷歌FCM,谷歌服务",
    "RULE-SET,学术网站,学术网站",
    "RULE-SET,米哈游,游戏平台",

    // 其他规则
    "GEOIP,LAN,全局直连,no-resolve",
    "GEOIP,CN,中国大陆,no-resolve",
    "MATCH,漏网之鱼"
  ];

  return config;
}