'use strict';
// Alarm Detail controller
app.controller('Alarm_detailController', ['$scope', '$http', '$stateParams', '$state', function ($scope, $http, $stateParams, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.detail_data = JSON.parse(unescape($stateParams.data));
        // console.log($scope.detail_data);
        $scope.alert_description_indicator = JSON.parse($scope.detail_data.alert_description)
        $scope.selected = 0;
        $scope.threat = {}; //威胁情报
        $scope.network_events = {}; //网络事件
        $scope.pages = {
            data: [],
            count: 0,
            maxPage: "...",
            pageNow: 1,
        };
        $scope.pages1 = {
            data: [],
            count: 0,
            maxPage: "...",
            pageNow: 1,
        };
        $scope.tab_data = [{name: '当前告警资产',content: '11111'}, {name: '历史告警资产',content: '22222'}];
        $scope.li_index = 0;
        $scope.get_data();
        $scope.time_type = [{
                time: '2018.08.12 23:22:12',
                type: '威胁情报'
            },
            {
                time: '2018.08.12 23:22:12',
                type: 'IPReputation'
            },
            {
                time: '2018.08.12 23:22:12',
                type: 'MobileMaliciousHash'
            },
            {
                time: '2018.08.12 23:22:12',
                type: 'SDK'
            },
            {
                time: '2018.08.12 23:22:12',
                type: 'MaliciousHash'
            },
            {
                time: '2018.08.12 23:22:12',
                type: '沙箱'
            },
            {
                time: '2018.08.12 23:22:12',
                type: 'SDK'
            },
            {
                time: '2018.08.12 23:22:12',
                type: '沙箱'
            },
            {
                time: '2018.08.12 23:22:12',
                type: 'YARA'
            },

            {
                time: '2018.08.12 23:22:12',
                type: 'IDS'
            },
            {
                time: '2018.08.12 23:22:12',
                type: 'IDS'
            }
        ];
        console.log($scope.time_type);
        console.log($scope.time_type.length);
        // 一 当告警来源是威胁情报的时候
        // 1
        $scope.threat.BotnetCAndCURL = [{
                key: 'URL',
                value: 'a232gh232a2323s23'
            },
            {
                key: '威胁类型',
                value: ' 僵尸网络'
            },
            {
                key: '威胁细分',
                value: 'threat'
            },
            {
                key: '全球首次发现时间',
                value: ' first_seen'
            },
            {
                key: '流行度',
                value: 'popularity'
            },
            {
                key: '主要受影响地区',
                value: 'geo'
            },
            {
                key: '僵尸样本信息',
                value: 'files'
            },
            {
                key: '僵尸样本下载URL',
                value: 'urls'
            },
            {
                key: 'Whois信息',
                value: 'whois'
            }
        ];
        $scope.detail_infos = $scope.threat.BotnetCAndCURL;
        // 2
        $scope.threat.IPReputation = [{
                key: 'IP',
                value: 'a232gh232a2323s23'
            },
            {
                key: '威胁类型',
                value: 'malware“恶意地址”, spam“垃圾邮件”、 tor_exit_node“Tor边界节点”'
            },
            {
                key: '全球首次发现时间',
                value: ' first_seen'
            },
            {
                key: '流行度',
                value: 'popularity'
            },
            {
                key: '主要受影响地区',
                value: 'geo'
            },
            {
                key: '相关联域名',
                value: 'domains'
            },
            {
                key: '相关联恶意文件',
                value: 'files'
            },
            {
                key: 'ip_whois信息',
                value: 'ip_whois'
            }
        ];
        // 3
        $scope.threat.MaliciousHash = [{
                key: 'MD5',
                value: 'MD5'
            },
            {
                key: 'SHA256',
                value: 'SHA256'
            },
            {
                key: '文件大小',
                value: 'file_size'
            },
            {
                key: '文件类型',
                value: 'file_type'
            },
            {
                key: '常见文件名',
                value: 'file_names'
            },
            {
                key: '威胁类型',
                value: '恶意程序'
            },
            {
                key: '威胁细分',
                value: 'threat'
            },
            {
                key: '全球首次发现时间',
                value: 'first_seen'
            },
            {
                key: '流行度',
                value: 'popularity'
            },
            {
                key: '主要受影响地区',
                value: 'geo'
            },
            {
                key: '样本下载IP地址',
                value: 'IP'
            },
            {
                key: '样本下载URL',
                value: 'urls'
            }
        ];
        // 4
        $scope.threat.MaliciousURL = [{
                key: 'URL',
                value: 'URL'
            },
            {
                key: '威胁类型',
                value: 'Malware“恶意地址”，Bot C&C“僵尸网络C&C”，'
            },
            {
                key: '全球首次发现时间',
                value: ' first_seen'
            },
            {
                key: '流行度',
                value: 'popularity'
            },
            {
                key: '主要受影响地区',
                value: 'geo'
            },
            {
                key: '相关联恶意文件',
                value: 'files'
            },
            {
                key: 'Whois信息',
                value: 'whois'
            }
        ];
        // 5
        $scope.threat.PhishingURL = [{
                key: 'URL',
                value: 'URL'
            },
            {
                key: '威胁类型',
                value: '钓鱼网站'
            },
            {
                key: '全球首次发现时间',
                value: ' first_seen'
            },
            {
                key: '流行度',
                value: 'popularity'
            },
            {
                key: '主要受影响地区',
                value: 'geo'
            },
            {
                key: '被钓鱼IP',
                value: 'IP'
            },
            {
                key: 'Whois信息',
                value: 'whois'
            }
        ];
        // 6
        $scope.threat.MobileMaliciousHash = [{
                key: 'MD5',
                value: 'MD5'
            },
            {
                key: 'SHA256',
                value: 'SHA256'
            },
            {
                key: '文件大小',
                value: 'file_size'
            },
            {
                key: '威胁类型',
                value: '移动恶意程序'
            },
            {
                key: '威胁细分',
                value: 'threat'
            },
            {
                key: '全球首次发现时间',
                value: ' first_seen'
            },
            {
                key: '流行度',
                value: 'popularity'
            },
            {
                key: '主要受影响地区',
                value: 'geo'
            }
        ];
        // 二当告警来源是SDK的时候
        $scope.threat.SDK = [{
                key: '文件名',
                value: '文件名'
            },
            {
                key: '文件大小',
                value: ' 文件大小'
            },
            {
                key: '文件哈希值',
                value: '文件哈希值'
            },
            {
                key: 'SDK检测出来的威胁名称',
                value: ' SDK检测出来的威胁名称'
            }
        ];
        // 三 当告警来源是沙箱的时候
        $scope.threat.sandbox = [{
            key: '沙箱运行信息',
            value: '沙箱运行信息'
        }];
        // 四 当告警来源是YARA的时候
        $scope.threat.yara = [{
            key: 'Yara规则名称',
            value: 'Yara规则名称'
        }];
        // 五 当告警来源是IDS的时候
        $scope.threat.ids = [{
                key: '告警类型',
                value: '告警类型'
            },
            {
                key: '告警描述',
                value: '告警描述'
            }
        ];
        // 网络事件
        //http
        $scope.network_events.http = [{
                key: '方法',
                value: 'GET'
            },
            {
                key: '源地址',
                value: '源地址'
            },
            {
                key: '目的地址',
                value: '目的地址'
            },
            {
                key: 'URL',
                value: 'URL'
            },
            {
                key: '用户代理',
                value: '用户代理'
            },
            {
                key: '推荐人',
                value: '推荐人'
            },
            {
                key: '应用',
                value: 'HTTP'
            },
        ];
        //dns
        $scope.network_events.dns = [{
                key: '时间',
                value: '时间'
            },
            {
                key: 'DNS服务器地址',
                value: 'DNS服务器地址'
            },
            {
                key: '主机地址',
                value: '主机地址'
            },
            {
                key: '类型',
                value: '类型'
            },
            {
                key: '域名',
                value: '域名'
            },
            {
                key: '解析地址',
                value: '解析地址'
            },
            {
                key: 'TTL',
                value: 'TTL'
            },
            {
                key: '解析结果',
                value: '解析结果'
            },
            {
                key: '应用',
                value: 'DNS'
            },
        ];
        //SMTP/IMAP/Pop3
        $scope.network_events.smtp = [{
                key: '时间',
                value: '时间'
            },
            {
                key: '源地址',
                value: '源地址'
            },
            {
                key: '目的地址',
                value: '目的地址'
            },
            {
                key: '发件人',
                value: '发件人'
            },
            {
                key: '收件人',
                value: '收件人'
            },
            {
                key: '主题',
                value: '主题'
            },
            {
                key: '应用',
                value: 'SMTP/IMAP/Pop3'
            }
        ];
        //Kerberos
        $scope.network_events.kerberos = [{
                key: '时间',
                value: '时间'
            },
            {
                key: '源地址',
                value: '源地址'
            },
            {
                key: '目的地址',
                value: '目的地址'
            },
            {
                key: '信息类型',
                value: '信息类型'
            },
            {
                key: 'cname',
                value: 'cname'
            },
            {
                key: '认证管理域',
                value: '认证管理域'
            },
            {
                key: 'sname',
                value: 'sname'
            },
            {
                key: '应用',
                value: 'Kerberos'
            }
        ];
        //FTP
        $scope.network_events.ftp = [{
                key: '时间',
                value: '时间'
            },
            {
                key: '源地址',
                value: '源地址'
            },
            {
                key: '目的地址',
                value: '目的地址'
            },
            {
                key: '用户',
                value: '用户'
            },
            {
                key: '应用',
                value: 'FTP'
            }
        ];
        //SMB
        $scope.network_events.smb = [{
                key: '时间',
                value: '时间'
            },
            {
                key: '源地址',
                value: '源地址'
            },
            {
                key: '目的地址',
                value: '目的地址'
            },
            {
                key: '域',
                value: '域'
            },
            {
                key: '用户',
                value: '用户'
            },
            {
                key: '应用',
                value: 'SMB'
            }
        ];
        //HTTPS
        $scope.network_events.ftp = [{
                key: '时间',
                value: '时间'
            },
            {
                key: '源地址',
                value: '源地址'
            },
            {
                key: '目的地址',
                value: '目的地址'
            },
            {
                key: 'URL',
                value: 'URL'
            },
            {
                key: '证书发布者',
                value: '证书发布者'
            },
            {
                key: '证书授权',
                value: '证书授权'
            },
            {
                key: '证书有效期',
                value: '证书有效期'
            },
            {
                key: '应用',
                value: 'HTTPS'
            }
        ];
        //SSH
        $scope.network_events.ftp = [{
                key: '时间',
                value: '时间'
            },
            {
                key: '源地址',
                value: '源地址'
            },
            {
                key: '目的地址',
                value: '目的地址'
            },
            {
                key: '工具',
                value: '工具'
            },
            {
                key: '应用',
                value: 'SSH'
            }
        ];
        //其它
        $scope.network_events.other = [{
            key: '信息',
            value: "这时候就把原始网络事件直接把json数据直接打印出来放到那儿"
        }];
    };
    //获取基础详细信息
    $scope.get_data = function () {
        var loading = zeroModal.loading(4);
        $http({
            method: 'get',
            url: './yiiapi/alert/alert-details',
            params: {
                'id': $scope.detail_data.id
            }
        }).success(function (data) {
            // console.log(data);
            zeroModal.close(loading);
            if (data.status == 0) {
                $scope.alert_details = data.data
                // console.log(JSON.parse($scope.alert_details.alert_description));
                $scope.alert_details.alert_raw = JSON.parse($scope.alert_details.alert_description).session.raw;
            }
        }).error(function (err) {
            zeroModal.close(loading);
            console.log(err);
        })
        $scope.getPage(); // 当前告警资产
        $scope.getPage1(); //历史告警资产
    };
    // 当前告警资产
    $scope.getPage = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        console.log($scope.detail_data.indicator);
        $http({
            method: 'get',
            url: './yiiapi/alert/get-same-indicator-alert',
            params: {
                // 'indicator': 'blog.csdn.net/qq_30753945/article/details/5e9',
                'indicator': $scope.detail_data.indicator,
                'is_deal': 0,
                'page': pageNow,
                'row': 10,
            }
        }).success(function (data) {
            console.log(data);
            if (data.status == 0) {
                $scope.pages = data.data;
            }
        }).error(function (err) {
            console.log(err);
        })
    };
    // 历史告警资产
    $scope.getPage1 = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        $http({
            method: 'get',
            url: './yiiapi/alert/get-same-indicator-alert',
            params: {
                // 'indicator': 'blog.csdn.net/qq_30753945/article/details/5e9',
                'indicator': $scope.detail_data.indicator,
                'is_deal': 2,
                'page': pageNow,
                'row': 10,
            }
        }).success(function (data) {
            console.log(data);
            if (data.status == 0) {
                $scope.pages1 = data.data;
            }
        }).error(function (err) {
            console.log(err);
        })
    };
    // 告警资产tab切换
    $scope.show = function (params) {
        $scope.selected = params;
        console.log(params);
    };
    //  检测时间轴点击切换
    $scope.isActive = function (item, index) {
        console.log(item);
        $scope.li_index = index;
        if (item.type == 'IPReputation') {
            $scope.detail_infos = $scope.threat.IPReputation;
        } else if (item.type == 'MaliciousHash') {
            $scope.detail_infos = $scope.threat.MaliciousHash;
        } else {
            $scope.detail_infos = $scope.threat.BotnetCAndCURL;

        }
    };
    // 获取时间轴详细数据
    $scope.get_time_data = function(){};
    $scope.init();
}, ]);