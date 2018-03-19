﻿<%@ Page Language="C#" AutoEventWireup="true" Inherits="DTcms.Web.UI.Page.index" ValidateRequest="false" %>
<%@ Import namespace="System.Collections.Generic" %>
<%@ Import namespace="System.Text" %>
<%@ Import namespace="System.Data" %>
<%@ Import namespace="DTcms.Common" %>

<script runat="server">
override protected void OnInit(EventArgs e)
{

	/* 
		This page was created by DTcms Template Engine at 2017/10/9 10:13:48.
		本页面代码由DTcms模板引擎生成于 2017/10/9 10:13:48. 
	*/

	base.OnInit(e);
	StringBuilder templateBuilder = new StringBuilder(220000);

	templateBuilder.Append("<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <meta charset=\"utf-8\" />\r\n    <title>汇票线_招贤纳士</title>\r\n    <meta name=\"viewport\" content=\"width=1200px, initial-scale=1.0, user-scalable=true\">\r\n    <meta name=\"keywords\" content=\"");
	templateBuilder.Append(Utils.ObjectToStr(site.seo_keyword));
	templateBuilder.Append("\" />\r\n    <meta name=\"description\" content=\"汇票线平台广纳人才，需要一个才华特别的你——对电票、纸票交易、票据承兑在行的你，并且与我们志同道合，我们期待你的加入。\" />\r\n    <meta name=\"viewport\" content=\"width=1200px, initial-scale=1.0, user-scalable=true\">\r\n    <meta name=”renderer” content=”webkit”>\r\n    <meta http-equiv=”X-UA-Compatible” content=”IE =Edge,chrome =1″>\r\n    <meta name=\"baidu-site-verification\" content=\"8wHB899l5W\" />\r\n    <meta name=\"sogou_site_verification\" content=\"QY1qSYeHpf\" />\r\n    <meta name=\"viewport\" content=\"width=1200px, user-scalable=true\" />\r\n    <meta name=\"keywords\" content=\"");
	templateBuilder.Append(Utils.ObjectToStr(site.seo_keyword));
	templateBuilder.Append("\" />\r\n    <meta name=\"description\" content=\"");
	templateBuilder.Append(Utils.ObjectToStr(site.seo_description));
	templateBuilder.Append("\" />\r\n    <script src=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/js/jquery.min.js\" type=\"text/javascript\"></");
	templateBuilder.Append("script>\r\n    <script src=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/js/jquery.cookie.js\" type=\"text/javascript\"></");
	templateBuilder.Append("script>\r\n    <script src=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/js/sweetalert.min.js\" type=\"text/javascript\"></");
	templateBuilder.Append("script>\r\n    <link href=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/css/bootstrap.min.css\" rel=\"stylesheet\" />\r\n    <link href=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/css/style.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n    <link href=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/css/all.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n    <link href=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/css/contenle.css\" rel=\"stylesheet\" />\r\n    <link href=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/css/sweetalert.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n\r\n</head>\r\n<body style=\"background:#f2f2f2\">\r\n    <!--Header-->\r\n    ");

	templateBuilder.Append("<script type=\"text/javascript\">\r\n    $(function () {\r\n        if ($.cookie('customer') && $.cookie('customer') != \"null\") {\r\n            var identity = JSON.parse($.cookie('customer'));\r\n            $(\"#userName\").html(identity.customer_name);\r\n            $(\"#divAnonymous\").hide();\r\n            $(\"#divLogin\").hide();\r\n            \r\n        }\r\n        else {\r\n            $(\"#divUser\").hide();\r\n            $('#link2').attr('href', 'javascript:window.location.href=\"/www/index.html#/app/loginInfo\"');\r\n            $('#link4').attr('href', 'javascript:window.location.href=\"/www/index.html#/app/loginInfo\"');\r\n            $(\"#divLogin\").show();\r\n        }\r\n    });\r\n\r\n    logout = function () {\r\n        if (confirm('确定要退出吗？')) {\r\n            $.cookie('customer', null);\r\n            window.location.href = window.location.href;\r\n        }\r\n    }\r\n    \r\n   \r\n</");
	templateBuilder.Append("script>\r\n\r\n<style>\r\n\r\n</style>\r\n<div class=\"container-fluid lkteheader\" >\r\n    <div class=\"container-fluid lktetop\">\r\n        <div class=\"row-fluid \">\r\n         <div class=\"htop\">\r\n          <div class=\"kf\"><div class=\"nmbph\"></div><span>客服热线：400-772-0575</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>客服时间：上午9：00---下午17：30 ( 工作日 ) </span></div>\r\n         <div class=\"kfs\">\r\n             <span id=\"divUser\" class=\"col-md-9 col-xs-9 contact text-right wez\">\r\n                 欢迎您！<span id=\"userName\" style=\"color:#fff;\"></span>\r\n                 <span style=\"color:#fff\">|</span>\r\n                 <a href=\"/www/index.html#/app/main/accountInfo\" style=\"color:#fff\">个人中心</a>\r\n                 <span style=\"color:#fff\">|</span>\r\n                 <a href=\"javascript:logout();\" style=\"color:#fff\">退出登录</a>\r\n             </span>\r\n             <span id=\"divAnonymous\" class=\"col-md-9 col-xs-8 contact text-right wez\">\r\n                 <a href=\"/aspx/main/insurance.aspx\" target=\"_blank\" style=\"color:#fff\">安全保障</a>\r\n                 &nbsp;&nbsp;&nbsp;\r\n                 <a href=\"/aspx/main/guide1.aspx\" target=\"_blank\" style=\"color:#fff\">新手引导</a>\r\n                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n                 <a href=\"/www/index.html#/app/loginInfo\"   style=\"color:#fff\">登录</a>\r\n                 <span>|</span>\r\n                 <a href=\"/www/index.html#/app/signup\" style=\"color:#fff\">注册</a>\r\n                 <!--&nbsp;&nbsp;\r\n        <a class=\"phone icontu\" href=\"javascript:;\"></a>\r\n        <a class=\"weixin icontu\" href=\"javascript:;\"></a>-->\r\n             </span>\r\n\r\n         </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"container-fluid lktebottom\">\r\n        <div class=\"bomp\">\r\n         <div class=\"bomp1\">\r\n             <img onclick=\"javascript: window.location.href = 'index.aspx'\"  src=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/images/logo1.png\" />\r\n<img style=\"margin: 20px 0 0 20px;width: 199px\" src=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/images/png.png\" />\r\n         </div>\r\n            <div class=\"bomp2\"> \r\n                <div class=\"nvmenu  eeee\">\r\n                    <ul>\r\n                        <li class=\"homeindex\"><a href=\"/index.aspx\" class=\"fav\">首页</a></li>\r\n                        <li><a id=\"link2\" href=\"/www/index.html#/app/main/publish\">我要出票</a></li>\r\n                        <li><a href=\"/www/index.html#/app/free/queryBill\">我要收票</a></li>\r\n                        <li><a id=\"link4\" href=\"/www/index.html#/app/main/editQuote\">机构报价</a></li>\r\n                        <li class=\"hpzs\"><a href=\"#\">汇票助手</a></li>\r\n                    </ul>\r\n                </div>\r\n\r\n            </div>\r\n           \r\n        </div>\r\n          \r\n\r\n </div>\r\n        <div class=\"container-fluid kbottom\">\r\n          \r\n               \r\n                    <ul>\r\n                        <li class=\"bv1\" onclick=\"javascript: window.location.href = '/www/index.html#/app/free/calculator'\">\r\n                            <div class=\"bv1s\"></div>\r\n\r\n                            <label class=\"lbtext\" style=\"color:#fff\">\r\n                                贴现计算器\r\n                            </label>\r\n\r\n                        </li>\r\n                        <li class=\"bv2\" onclick=\"javascript: window.location.href = '/www/index.html#/app/free/calendar'\">\r\n                            <div class=\"bv2s\"></div>\r\n                            <label class=\"lbtext\" style=\"color:#fff\">\r\n                                开票日历\r\n                            </label>\r\n                        </li>\r\n                        <li class=\"bv3\" onclick=\"javascript: window.location.href = '/www/index.html#/app/free/querypublic'\">\r\n                            <div class=\"bv3s\"></div>\r\n                            <label class=\"lbtext\" style=\"color:#fff\">\r\n                                挂失查询\r\n                            </label>\r\n                        </li>\r\n                        <li class=\"bv4\" onclick=\"javascript: window.location.href = '/www/index.html#/app/free/querybank'\">\r\n                            <div class=\"bv4s\"></div>\r\n                            <label class=\"lbtext\" style=\"color:#fff\">\r\n                                行号查询\r\n                            </label>\r\n                        </li>\r\n                        <li class=\"bv5\" onclick=\"javascript: window.location.href = '/www/index.html#/app/free/queryenterprise'\">\r\n                            <div class=\"bv5s\"></div>\r\n                            <label class=\"lbtext\" style=\"color:#fff\">\r\n                                工商查询\r\n                            </label>\r\n                        </li>\r\n                    </ul>\r\n               \r\n            \r\n        </div>\r\n\r\n</div>\r\n</div>\r\n\r\n\r\n<script>\r\n           \r\n\r\n                $(\".hpzs\").hover(function () {\r\n                    $(\".kbottom\").show();\r\n                }, function () {\r\n\r\n                    //$(\".kbottom\").hide();\r\n\r\n                });\r\n                $(\".kbottom\").hover(function () {\r\n                    $(\".kbottom\").show();\r\n                }, function () {\r\n\r\n                    $(\".kbottom\").hide();\r\n\r\n                });\r\n                $(\".lkteheader\").hover(function () {\r\n                    //$(\".kbottom\").show();\r\n                }, function () {\r\n\r\n                    $(\".kbottom\").hide();\r\n\r\n                });\r\n\r\n                $(\".bv1\").hover(function () {\r\n                    $(\".bv1 label\").css(\"color\", \"#ff5a14\");\r\n                    $(\".bv1s\").css(\"background-position\",\"601px -131px\");\r\n                }, function () {\r\n                    $(\".bv1 label\").css(\"color\", \"#fff\");\r\n                    $(\".bv1s\").css(\"background-position\", \"601px -70px\");\r\n\r\n                });\r\n                $(\".bv2\").hover(function () {\r\n                    $(\".bv2 label\").css(\"color\", \"#ff5a14\");\r\n                    $(\".bv2s\").css(\"background-position\", \"470px -131px\");\r\n                }, function () {\r\n                    $(\".bv2 label\").css(\"color\", \"#fff\");\r\n                    $(\".bv2s\").css(\"background-position\", \"470px -70px\");\r\n\r\n                });\r\n                $(\".bv3\").hover(function () {\r\n                    $(\".bv3 label\").css(\"color\", \"#ff5a14\");\r\n                    $(\".bv3s\").css(\"background-position\", \"340px -131px\");\r\n                }, function () {\r\n                    $(\".bv3 label\").css(\"color\", \"#fff\");\r\n                    $(\".bv3s\").css(\"background-position\", \"340px -70px\");\r\n\r\n                });\r\n                $(\".bv4\").hover(function () {\r\n                    $(\".bv4 label\").css(\"color\", \"#ff5a14\");\r\n                    $(\".bv4s\").css(\"background-position\", \"214px -131px\");\r\n                }, function () {\r\n                    $(\".bv4 label\").css(\"color\", \"#fff\");\r\n                    $(\".bv4s\").css(\"background-position\", \"214px -70px\");\r\n\r\n                });\r\n                $(\".bv5\").hover(function () {\r\n                    $(\".bv5 label\").css(\"color\", \"#ff5a14\");\r\n                    $(\".bv5s\").css(\"background-position\", \"82px -131px\");\r\n                }, function () {\r\n                    $(\".bv5 label\").css(\"color\", \"#fff\");\r\n                    $(\".bv5s\").css(\"background-position\", \"82px -70px\");\r\n\r\n                });\r\n                function showWeixin() {\r\n                    document.getElementById(\"weixin\").style.display = \"block\";\r\n                }\r\n                function hideWeixin() {\r\n                    document.getElementById(\"weixin\").style.display = \"none\";\r\n                }\r\n                $(\".nvmenu ul li\").hover(function () {\r\n                    $(\".homeindex\").removeClass(\"homeindex\");\r\n                    $(\".fav\").removeClass(\"fav\");\r\n\r\n                }, function () {\r\n                    //$(\".homeindex\").addClass(\"homeindex\");\r\n                    //$(\".fav\").addClass(\"fav\");\r\n                })\r\n     \r\n\r\n</");
	templateBuilder.Append("script>\r\n");


	templateBuilder.Append("\r\n    <!--/Header-->\r\n    <strong><em></em></strong>\r\n    <script>\r\n        window.onload = function () {\r\n            $(\".fter\").css('margin', '3% 0 0 0');\r\n            $(\".fter\").css('width', '100%')\r\n        }\r\n    </");
	templateBuilder.Append("script>\r\n    <div class=\"bg2\">\r\n        <div class=\"banner4\"></div>\r\n        <div class=\"nr\">\r\n            <div class=\"pt2\">\r\n                <div class=\"nav2\">\r\n                    <ul>\r\n                        <li><a href=\"/aspx/main/about.aspx\">关于我们</a></li>\r\n                        <li><a href=\"/list-54.html\">新闻公告</a></li>\r\n                        <li><a href=\"/aspx/main/announce.aspx\">网站声明</a></li>\r\n                        <li><a href=\"/aspx/main/platform.aspx\">平台优势</a></li>\r\n                        <li><a href=\"/aspx/main/business.aspx\">商务合作</a></li>\r\n                        <li><a href=\"/aspx/main/hr.aspx\" style=\"background-color: #f55a14;color: #fff;padding: 10px 24px;\">招纳贤士</a></li>\r\n                        <li><a href=\"/aspx/main/help.aspx\">帮助中心</a></li>\r\n                        <li><a href=\"/aspx/main/insurance.aspx\">安全保障</a></li>\r\n                    </ul>\r\n                </div>\r\n\r\n                <div class=\"zhao\">\r\n                    <div class=\"jieshao\">\r\n                        <div class=\"one\">\r\n                            <div class=\"dbx\"></div>\r\n                            <div class=\"jihui\">有这样的机会</div>\r\n                        </div>\r\n                        <p>\r\n                            在互联网大洪流之中，票据行业迎来了一个历史性的发展拐点：央行三年内取消纸票！<br /><br />\r\n\r\n                           作为票据改革的排头兵——央行，已然上阵！为搭建全国统一的票据交易二级市场，其牵头在上海建立的全国性票交所2016年12月8日已上线。票交所具体从纸票电子化作为开端，势必在全国范围内掀起一阵票据行业改革风潮。<br /><br />\r\n\r\n                            这一风潮，对于“传统票据”行业而言，势必面临着极大的挑战；当然，这对于“互联网+票据”的探索者们而言，将是一个难得的机会！<br /><br />\r\n\r\n                           显然，央行力推电票这一举措，意味着未来1-3年，票据在线交易平台将迎来爆发式的发展机会，从台湾票券市场（即大陆的票据市场）发展历史可以借鉴。<br /><br />\r\n\r\n                            身处几十万亿即将大爆发的行业风口，“互联网+票据”一定是你最性感的选择！\r\n                        </p>\r\n\r\n\r\n                        <div class=\"one\">\r\n                            <div class=\"dbx\"></div>\r\n                            <div class=\"jihui\">留给特别的你</div>\r\n                        </div>\r\n                        <p>\r\n                            因为这历史性的机遇，有这样一群志同道合、执着、努力、踏实的人，他们是来自票据、IT、银行、投资界，且拥有十年以上票据行业经验的浙大老兵。<br /><br />\r\n\r\n                            更因为梦想，“老兵”们重新出发，共同组成了一家互联网创新型企业的核心团队，志在打造行业领先的票据在线交易一站式服务平台“汇票线”！\r\n                            <br /><br />\r\n汇票线，作为一个快速成长的互联网创新型企业平台，这里有你学习成长的机会、这里有你职业晋升的路径、这里有你拿高薪获取股权激励的荣耀、这里更有改变你人生轨迹的机遇。\r\n                            <br /><br />\r\n                            如果你具有创业精神，勇于挑战、不甘平庸，汇票线等的就是你！\r\n                            <br /><br />\r\n                           这样一个绝佳的“掘金”机会，需要那个特别的你，赶紧加入我们！ \r\n                        </p>\r\n                        <div class=\"lx\">\r\n                            汇票线——票据在线交易一站式服务平台,欢迎你的加入！<br />\r\n                            欢迎来电咨询：021-68810653<br />\r\n                            E-mail：hr@huipiaoxian.com\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n  <div class=\"diwen\" style=\"height:610px;margin-top: 100px;\">\r\n        <!--<div class=\"zhiwei\" style=\"width:1058px\">\r\n            <ul style=\" position: relative;left: -13%;\">\r\n                <li onclick=\"$('.zw').removeClass('set'); $('#zw1').addClass('set'); $('.wa').hide(); $('#wa1').show()\" id=\"zw1\" class=\"lift zw set\">系统架构师</li>\r\n                <li onclick=\"$('.zw').removeClass('set'); $('#zw2').addClass('set'); $('.wa').hide(); $('#wa2').show()\" id=\"zw2\" class=\"zw\">客服经理</li>\r\n                <li onclick=\"$('.zw').removeClass('set'); $('#zw3').addClass('set'); $('.wa').hide(); $('#wa3').show()\" id=\"zw3\" class=\"zw\">渠道开发经理</li>\r\n                <li onclick=\"$('.zw').removeClass('set'); $('#zw4').addClass('set'); $('.wa').hide(); $('#wa4').show()\" id=\"zw4\" class=\"zw\">票据经纪人</li>\r\n            </ul>\r\n        </div>-->\r\n      <div class=\"container-fluid zna\">\r\n          <div class=\"row-fluid\">\r\n             <div class=\"container-fluid znas\">\r\n                 <div class=\"row-fluid\">\r\n                     <ul>\r\n                         <li onclick=\"$('.zw').removeClass('set'); $('#zw1').addClass('set'); $('.wa').hide(); $('#wa1').show()\" id=\"zw1\" class=\"lift zw set\">系统架构师</li>\r\n                         <li onclick=\"$('.zw').removeClass('set'); $('#zw2').addClass('set'); $('.wa').hide(); $('#wa2').show()\" id=\"zw2\" class=\"zw\">客服经理</li>\r\n                         <li onclick=\"$('.zw').removeClass('set'); $('#zw3').addClass('set'); $('.wa').hide(); $('#wa3').show()\" id=\"zw3\" class=\"zw\">渠道开发经理</li>\r\n                         <li onclick=\"$('.zw').removeClass('set'); $('#zw4').addClass('set'); $('.wa').hide(); $('#wa4').show()\" id=\"zw4\" class=\"zw\">票据经纪人</li>\r\n                     </ul>\r\n                 </div>\r\n             </div>\r\n          </div>\r\n      </div>\r\n        <div class=\"xianshi\">\r\n            <div id=\"wa1\" class=\"wa\">\r\n                <h1>岗位职责：</h1>\r\n                <h2>\r\n                 1、全面负责PC端平台、微信、移动APP的技术方向研究和总体规划，并负责整个技术团队的管理；<br/>\r\n2、负责完成整体技术架构搭建及产品开发。设计、指导关键技术模块，并对系统安全性、稳定性、正常运营负责；<br/>\r\n3、承担主要开发、管理工作，对代码质量及进度负责。根据项目任务计划按时完成高质量的功能模块开发。根据需求完成代码编写，调试，测试和维护；<br/>\r\n4、指导并参与核心代码的书写，组织解决项目开发过程中的重大技术问题。负责指导、处理、协调和解决公司软件研发中出现的技术问题；<br/>\r\n5、负责项目开发流程、项目质量和项目开发进度的规划、控制、监督和管理。<br/>\r\n                </h2>\r\n\r\n                <h1>任职资格：</h1>\r\n                <h2>\r\n           1、互联网思维和执行力：具备互联网运营思维维度及用户体验至上价值观，对互联网金融格局及其执行运营有深刻理解，大型电商平台技术高管优先；<br/>\r\n2、专业能力：精通Mysql,  Oracle等数据库，精通Java, C#, PHP,C++等语言的至少两种，精通各类项目管理工具。全面掌握Java J2EE框架，能把握其设计思想精髓，对 Spring、Struts、Hibernate等开源框架应用经验丰富。深刻理解软件研发过程和生命周期，具备良好的软件研发过程管理和控制的技能，包括进度安排和控制、风险控制、质量管理、配置管理和软件发布等；<br/>\r\n3、学习能力：动态把握互联网金融行业运营、用户、技术、产品等变化和发展趋势（含对竞争对手的分析了解）；<br/>\r\n4、本科以上学历，五年以上IT行业运营，团队管理经验丰富，擅长技术团队建设和培养，有较强的技术人脉资源，能通过人员重组完善团队技术、团队人员规划；<br/>\r\n5、我们期望你是：技术牛人、开放、完美主义、渴望成功。<br/>\r\n                </h2>\r\n            </div>\r\n            <div id=\"wa2\" class=\"wa\" style=\"display: none;\">\r\n                <h1>岗位职责：</h1>\r\n                <h2>\r\n                  1、规划及搭建客服平台和CRM系统，整合现有公司资源，满足近中期客服系统的需求，组建客服团队；<br/>\r\n2、负责规划、建立、完善客服中心实施方案、管理制度、业务标准及流程，根据公司发展实际情况，调整和完善项目内部的管理流程和规范；<br/>\r\n3、管理客服部整体业务运营，包含呼入呼出电话， 监督现场管理，监控运营质量，不断提升运营效率；<br/>\r\n4、辅助客户开发及日常维系。组织收集、整理客户资料，搭建和维护数据库。对重要客户进行定期回访，分析客户需求，提交分析报告；<br/>\r\n5、负责项目的团队建设和管理，客服中心的业务培训内容和绩效考核。负责客服培训工作，组织开展案例学习，不断提高员工业务技能和专业服务水平；<br/>\r\n6、负责监管客服部日常业务，培养客服人员增强自身代表整个公司形象的整体意识，贯彻落实并推广公司文化。<br/>\r\n                </h2>\r\n\r\n                <h1>任职要求：</h1>\r\n                <h2>\r\n               1、大专及以上学历，金融行业优先；<br/>\r\n2、3年以上呼叫中心管理或电话营销管理经验，熟悉呼叫中心运作流程；<br/>\r\n3、熟悉呼叫中心的各种考核评判指标，具有优秀的客户处理技巧和经验；<br/>\r\n4、具备优良的计算机基础知识和操作技能，能熟练使用Office办公软件；<br/>\r\n5、良好的领导能力、指导能力及监管管理能力，突出的沟通协调能力、组织管理能力、团队协作能力及良好的心理承受能力；<br/>\r\n6、良好的商业意识和战略意识，数据分析能力强，有较强的文字语言表达能力及分析判断能力，能够帮助团队成员分析业务及自身问题并提出改善方案；<br/>\r\n较强的服务意识和责任心，工作热情、耐心，有积极进取的精神及接受挑站。<br/>\r\n                </h2>\r\n            </div>\r\n            <div id=\"wa3\" class=\"wa\" style=\"display: none;\">\r\n                <h1>岗位职责：</h1>\r\n                <h2>\r\n                  1、负责拟定平台撮合渠道策略及计划，带领团队完成目标，协助公司进行相应的员工培训；<br/>\r\n2、负责主要行业性票源渠道开发、维护，招募整合合作伙伴，完成公司渠道目标，完善渠道布局；<br/>\r\n3、负责开发知名票据机构、银行等资金方及日常报价管理，促使在平台的报价真实有效；<br/>\r\n4、负责一线信息反馈，关注市场发展动向，根据竞争对手与市场情况及时为公司策略调整提供依据；<br/>\r\n5、参与各种形式线上与线下渠道开拓，为公司引流，定期参加票据与2B行业交流会。<br/>\r\n                </h2>\r\n\r\n                <h1>任职资格：</h1>\r\n                <h2>\r\n                    1、专科以上学历，营销、金融等专业，熟悉金融政策及行业政策；<br/>\r\n2、具有3年以上渠道管理工作经验，具有电商平台经验与票据资源、票据行业人际关系者优先考虑；<br/>\r\n3、具备良好的营销渠道开发与建设能力，热爱挑战，勇于开拓，有良好的市场判断力；<br/>\r\n4、优秀的口头及书面表达能力，较强的逻辑思维和分析能力，能够适应出差。<br/>\r\n                </h2>\r\n            </div>\r\n            <div id=\"wa4\" class=\"wa\" style=\"display: none;\">\r\n                <h1>岗位职责：</h1>\r\n                <h2>\r\n              1、负责开拓票据业务，了解相关报价；<br />\r\n2、负责对票据和相关的交易文件进行审查，控制风险；<br />\r\n3、负责办理银行间票据贴现、转贴现业务具体工作；<br />\r\n4、维护老客户及开发新客户，拓展资源，完成岗位业绩指标；<br />\r\n5、完成公司交办的其他工作；<br />\r\n                    6、负责监管客服部日常业务，培养客服人员增强自身代表整个公司形象的整体意识，贯彻落实并推广公司文化。<br />\r\n                </h2>\r\n                <h1>任职资格：</h1>\r\n                <h2>\r\n                    1、学历不限，专业不限，应届毕业生亦可，公司提供相关的指导培训； <br />\r\n2、能吃苦耐劳，有一定沟通能力，积极主动，执行力强；<br />\r\n3、为人正直善良，踏实勤奋，追求上进；<br />\r\n4、良好的职业操守，无不良从业记录；<br />\r\n5、有银行票据贴现业务工作经验，拥有相关客户资源者优先；<br />\r\n6、愿意从事票据行业，愿意挑战高薪，渴望成功的有志之士，我们欢迎您的加入！<br />\r\n                </h2>\r\n            </div>\r\n        </div>\r\n    </div>\r\n<div style=\"margin: -3% 0 0 0;\">\r\n    <!--Footer-->\r\n    ");

	templateBuilder.Append("\r\n<div class=\"container-fluid tlan\">\r\n    <div class=\"row-fluid\">\r\n        <div class=\"container-fluid fop\">\r\n            <div class=\"row-fluid\">\r\n                <div class=\"span12\">\r\n                    <div class=\"container-fluid\">\r\n                        <div class=\"fot\">\r\n                            <ul>\r\n                                <li><a href=\"/aspx/main/about.aspx\" target=\"_blank\">关于我们</a></li>\r\n                                <li class=\"line\">|</li>\r\n                                <li><a href=\"/list-54.html\">新闻公告</a></li>\r\n                                <li class=\"line\">|</li>\r\n                                <li><a href=\"/aspx/main/announce.aspx\" target=\"_blank\">网站声明</a></li>\r\n                                <li class=\"line\">|</li>\r\n                                <li><a href=\"/aspx/main/platform.aspx\" target=\"_blank\">平台优势</a></li>\r\n                                <li class=\"line\">|</li>\r\n                                <li><a href=\"/aspx/main/business.aspx\" target=\"_blank\">商务合作</a></li>\r\n                                <li class=\"line\">|</li>\r\n                                <li><a href=\"/aspx/main/hr.aspx\" target=\"_blank\">招贤纳士</a></li>\r\n                                <li class=\"line\">|</li>\r\n                                <li><a href=\"/aspx/main/help.aspx\" target=\"_blank\">帮助中心</a></li>\r\n                                <li class=\"line\">|</li>\r\n                                <li><a href=\"/aspx/main/insurance.aspx\" target=\"_blank\">安全保障</a></li>\r\n\r\n                            </ul>\r\n                        </div>\r\n                        <div class=\"ftjs\">\r\n                            <ul>\r\n                                <li style=\"width:41%\">\r\n                                    <div>\r\n                                        <div class=\"h_kefu\">\r\n                                            <!--<div class=\"customer-service\"><a href=\"../../aspx/main/Rease.aspx\">客服热线</a>：</div>-->\r\n                                            <div class=\"customer-service\"><a>客服热线</a>：</div>\r\n                                            <div class=\"customer-service-phone\">400-772-0575</div>\r\n                                            <div class=\"customer-service-time\">客服时间：上午9:00 - 下午17:30（工作日）</div>\r\n                                        </div>\r\n\r\n\r\n\r\n                                    </div>\r\n                                </li>\r\n                                <li>\r\n\r\n                                    <p class=\"h_email\" style=\"margin-top:68px\"><div class=\"yximg\"></div>邮箱：service@huipiaoxian.com</p>\r\n                                    <p class=\"h_address\" style=\"margin-top:10px\">\r\n                                        <div class=\"dizimg\"></div>地址：上海市浦东新区浦三路21弄55号604室\r\n                                        <span style=\"margin: 0 0 0 12%;\">（银亿滨江中心壹号）</span>\r\n                                    </p>\r\n                                </li>\r\n                                <li style=\"margin-left: 7%;margin-top: -1%;\">\r\n                                    <div class=\"bdes\">\r\n                                        <div class=\"xgo1\"><img src=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/images/qr-codes-1.png\" /><div class=\"dyh\">订阅号</div></div>\r\n                                        <div class=\"xgo2\"><img src=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/images/qr-codes-2.png\" /><div class=\"dyh\">App</div></div>\r\n                                    </div>\r\n                                    <div class=\"bcde\">\r\n                                        <ul>\r\n                                            <li>\r\n                                                <div class=\"kmk1\"><img class=\"wx3\" src=\"../../templates/main/images/wx3.png\" /></div>\r\n                                                <label>微信公众号</label>\r\n                                            </li>\r\n                                            <li>\r\n                                                <div class=\"kmk2\"><img class=\"wx2\" src=\"../../templates/main/images/wx2.png\" /></div>\r\n                                                <label>汇票线APP</label>\r\n                                            </li>\r\n                                            <li onclick=\"javascript: window.open('http://weibo.com/huipiaoxian')\">\r\n                                                <div class=\"kmk3\"><img class=\"wx1\" src=\"../../templates/main/images/wx1.png\" /></div>\r\n                                                <label>官方微博</label>\r\n                                            </li>\r\n                                        </ul>\r\n                                    </div>\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                        <div style=\"text-align:center\">\r\n                            <p>\r\n                                <img onclick=\"javascript: window.location.href = 'http://www.gsxt.gov.cn/corp-query-homepage.html'\" src=\"../../templates/main/images/renmin.png\" /> Copyright 2016  汇票线-上海票趣信息科技有限公司&nbsp; &nbsp; &nbsp; &nbsp;\r\n                                <img src=\"");
	templateBuilder.Append("/templates/main");
	templateBuilder.Append("/images/icp.jpg\">\r\n                                沪ICP备16031524号-1\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n\r\n<script>\r\n    $(\".kmk1\").hover(function () {\r\n     $(\".xgo1\").show();\r\n }, function () {\r\n     $(\".xgo1\").hide();\r\n });\r\n\r\n    $(\".kmk2\").hover(function () {\r\n        $(\".xgo2\").show();\r\n    }, function () {\r\n        $(\".xgo2\").hide();\r\n    });\r\n</");
	templateBuilder.Append("script>");


	templateBuilder.Append("\r\n    <!--/Footer-->\r\n</div>\r\n</body>\r\n</html>");
	Response.Write(templateBuilder.ToString());
}
</script>